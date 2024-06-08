
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PlanEase",
  description: "Task Manager",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
    <html lang="en">
      <body className={inter.className}>{children}<Toaster /></body>
    </html>
    </SessionWrapper>
  );
}
