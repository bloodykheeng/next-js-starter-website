"use client";

import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useRouter } from 'nextjs-toploader/app';
import { Dialog } from "primereact/dialog";

import Link from "next/link";




// ✅ Validation Schema
const formSchema = z
  .object({
    email: z.string().email("Invalid email format"),
  })


// ✅ TypeScript Type for Form Fields
type FormData = z.infer<typeof formSchema>;

const RowForm: React.FC<{ handleFormSubmit: (FormData: FormData | null) => any, formMutation: any }> = ({ handleFormSubmit, formMutation }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors }

  } = useForm<FormData>({ resolver: zodResolver(formSchema), defaultValues: { email: "" }, })

  const router = useRouter();

  console.log("🚀Form ~ errors:", errors)





  // ===================================  ✅ Handle Form Submission =============================
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingData, setPendingData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setPendingData(data)
    setShowConfirmDialog(true);
  };

  //======================= Confirm Submit ================================


  const onConfirmSubmit = (e: any) => {
    e.preventDefault();
    handleFormSubmit(pendingData);
    setShowConfirmDialog(false);
  };

  const onCancelSubmit = (e?: any) => {
    e.preventDefault();
    setShowConfirmDialog(false);
  };





  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 p-6"
    >
      {/* Email */}
      <div className="w-full flex justify-center">
        <div className="w-full">
          <label className="block text-gray-900 font-medium mb-1">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                type="email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? "p-invalid" : ""}`}
              />
            )}
          />
          {errors.email && <small className="text-red-500">{errors.email.message}</small>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3">
          <Button
            type="submit"
            label="Submit"
            icon={formMutation?.isPending ? "pi pi-spin pi-spinner" : "pi pi-save"}
            className="w-full p-3 text-xl"
            disabled={formMutation?.isPending}
          />
        </div>
      </div>

      {/* Links */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 mt-4 px-2">
        <Link href="/login" className="text-blue-500 hover:underline font-medium">
          Back to Login
        </Link>
        <Link href="/" className="text-blue-500 hover:underline font-medium">
          Back to Home
        </Link>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        header="Confirm Submission"
        visible={showConfirmDialog}
        maximizable
        onHide={onCancelSubmit}
        footer={
          <div className="flex gap-2">
            <Button label="Yes" onClick={onConfirmSubmit} />
            <Button label="No" onClick={onCancelSubmit} className="p-button-secondary" />
          </div>
        }
      >
        Are you sure you want to Submit this data?
      </Dialog>
    </form>

  );
};

export default RowForm;
