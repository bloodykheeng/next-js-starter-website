import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from '@/providers/ThemeProvider'
import { cookies } from "next/headers";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "PPDA Contract Monitoring System | %s",
  description:
    "The PPDA Contract Monitoring System (CMS) is a digital platform that enables Civil Society Organizations (CSOs) to track and report on government projects in real-time, ensuring transparency and accountability in public procurement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const getCookie = async () => {
    const cookieStore = await cookies()
    return cookieStore.get("theme")
  }

  const defaultTheme = getCookie();

  return (
    <html lang="en">
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <ThemeProvider defaultTheme={defaultTheme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
