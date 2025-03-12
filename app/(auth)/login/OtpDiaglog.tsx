'use client'

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'nextjs-toploader/app';
import { useForm, Controller, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toast as PrimeReactToast } from "primereact/toast";


import { Howl } from "howler";

import { postToValidateWebOtp } from "@/services/auth/auth-service"; // Adjust import as per project structure
import useHandleMutationError from "@/hooks/useHandleMutationError";

import { usePrimeReactToast } from "@/providers/PrimeReactToastProvider";

import { InputText } from "primereact/inputtext";



interface LoginDetails {
    email?: string;
    password?: string;
    rememberMe?: boolean;
}

interface OtpPageProps {
    showOTPDialog: boolean;
    setShowOTPDialog: (value: boolean) => void;
    loginDetails: LoginDetails | null;
    setLoginDetails: (value: any) => void;
}

// Define Zod validation schema
const otpSchema = z.object({
    otp: z
        .number()
        .min(1000, "OTP must be at least 4 digits")
        .max(999999, "OTP must be at most 6 digits"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

const OtpDiaglog: React.FC<OtpPageProps> = ({
    showOTPDialog,
    setShowOTPDialog,
    loginDetails,
    setLoginDetails,
}) => {


    const primeReactToast = usePrimeReactToast();


    const router = useRouter();
    const queryClient = useQueryClient();
    const primeReactToastRef = useRef<PrimeReactToast>(null);
    const [countdown, setCountdown] = useState<number>(120);
    const [timerExpired, setTimerExpired] = useState<boolean>(false);

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        reset,
        formState: { errors, isSubmitting },

    } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: undefined },
    });



    console.log("🚀otp ~ errors:", errors)
    interface UserData {
        data?: {
            name?: string;
        };
    }

    const otpValue = watch("otp")
    console.log("🚀 ~ otpValue:", otpValue)

    // Mutation for OTP verification
    const otpVerificationMutation = useMutation({
        mutationFn: (variables: { email?: string; otp: number }) =>
            postToValidateWebOtp(variables),
        onSuccess: (data: UserData) => {
            setLoginDetails({});
            // queryClient.invalidateQueries();
            // toast.success("OTP verified successfully!");

            primeReactToast.success("OTP verified successfully!")

            queryClient.invalidateQueries({ queryKey: ["logged-in-user"] });


            // const userName = data?.data?.name || "User";
            // // const userDetails = data?.data;

            // router.push(`/dashboard?message=Hello ${userName}, welcome!`);

            router.push(`/`);
        },
    });

    // Handle mutation error
    useHandleMutationError(otpVerificationMutation?.error);

    // Timer function
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showOTPDialog && !timerExpired) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setTimerExpired(true);
                        setShowOTPDialog(false);
                        setLoginDetails({ email: "", password: "" })
                        return 0;
                    }
                    sound.play(); // Play sound every second
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [showOTPDialog, timerExpired]);

    // Separate effect to update login details AFTER the component updates
    useEffect(() => {
        if (timerExpired) {
            setLoginDetails({}); // ✅ Now runs *after* the component updates
        }
    }, [timerExpired]);

    // Sound effect
    const sound = new Howl({ src: ["/media/bell.mp3"] });

    const onSubmit = (data: OtpFormValues) => {
        otpVerificationMutation.mutate({ email: loginDetails?.email, otp: data.otp });
    };

    return (
        <Dialog
            header="OTP Verification"
            visible={showOTPDialog}
            maximizable
            onHide={() => {
                setShowOTPDialog(false);
                setCountdown(120);
                setTimerExpired(false);
                setLoginDetails({ email: "", password: "" });
                reset();
            }}
        >
            <PrimeReactToast ref={primeReactToastRef} />
            <div className="flex flex-col items-center justify-center">
                <div
                    className="rounded-[56px] p-[0.3rem] bg-gradient-to-b from-primary to-transparent"
                >
                    <div className="w-full bg-white py-8 px-5 sm:px-8 rounded-[53px] shadow-lg">
                        <div className="text-center mb-5">
                            <h3 className="text-gray-900 font-medium text-xl">OTP Verification</h3>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                            <div className="text-center mt-3">
                                {!timerExpired ? (
                                    <span>
                                        Time remaining: {Math.floor(countdown / 60)}:{countdown % 60}
                                    </span>
                                ) : (
                                    <span className="text-red-500 font-semibold">OTP Expired</span>
                                )}
                            </div>

                            <div className="mb-5">
                                <label htmlFor="otp" className="block text-gray-900 text-xl font-medium mb-2">
                                    Enter OTP
                                </label>

                                <Controller
                                    name="otp"
                                    control={control}
                                    defaultValue={undefined}
                                    render={({ field }) => (
                                        <InputNumber
                                            id="otp"
                                            value={field.value || undefined}
                                            onChange={(e) => field.onChange(Number(e.value) ?? undefined)}
                                            min={0}
                                            maxLength={6}
                                            className={`w-full md:w-[30rem] p-3 border rounded-md ${errors.otp ? "border-red-500" : "border-gray-300"}`}
                                            showButtons={false}
                                            format={false}
                                        />
                                    )}
                                />

                                {errors.otp && <small className="block text-red-500">{errors.otp.message}</small>}
                            </div>

                            <div className="flex justify-center">
                                {otpVerificationMutation.isPending ? (
                                    <div className="w-12 h-12 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <Button
                                        label="Verify OTP"
                                        className="w-full md:w-[30rem] p-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                                        type="submit"
                                        disabled={otpVerificationMutation.isPending}
                                    />
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Dialog>
    );
};

export default OtpDiaglog;
