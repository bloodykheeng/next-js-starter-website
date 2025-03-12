"use client"; // Required for useRouter in App Router
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
    const router = useRouter();

    return (

        <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-6">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 md:p-12">
                {/* Logo */}
                <Image
                    src="/ppda/ppda_white-removebg-preview.png"
                    alt="PPDA Logo"
                    width={140}
                    height={30}
                    style={{ height: "40px", width: "auto" }}
                    className="w-full dark:hidden"
                />
                <Image
                    src="/ppda/ppda_fb-removebg-preview.png"
                    alt="PPDA Logo"
                    width={140}
                    height={30}
                    style={{ height: "40px", width: "auto" }}
                    className="hidden w-full dark:block"
                />

                {/* Error Code */}
                <span className="text-blue-500 text-4xl font-extrabold">404</span>
                <h1 className="text-gray-900 text-3xl md:text-5xl font-bold mt-2">
                    Page Not Found
                </h1>
                <p className="text-gray-600 mt-2 text-lg text-center">
                    The requested resource is not available.
                </p>

                {/* Home Button */}
                <Link
                    href="/"
                    className="mt-6 flex w-full max-w-sm items-center space-x-4 rounded-lg border border-gray-300 bg-gray-100 p-4 transition hover:bg-gray-200"
                >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-400">
                        <i className="pi pi-home text-white text-2xl"></i>
                    </div>
                    <div>
                        <p className="text-gray-900 font-medium text-lg">Home</p>
                        <p className="text-gray-600 text-sm">Go back to the homepage</p>
                    </div>
                </Link>

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="mt-4 flex w-full max-w-sm items-center space-x-4 rounded-lg border border-gray-300 bg-gray-100 p-4 transition hover:bg-gray-200 cursor-pointer"
                >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-400">
                        <i className="pi pi-angle-double-left text-white text-2xl"></i>
                    </div>
                    <div>
                        <p className="text-gray-900 font-medium text-lg">Go Back</p>
                        <p className="text-gray-600 text-sm">Return to the previous page</p>
                    </div>
                </button>
            </div>
        </div>

    );
};

export default NotFound;
