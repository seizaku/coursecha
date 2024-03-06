import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import type { Viewport } from "next";
const inter = Inter({ subsets: ["latin"] });
import { FirebaseAuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "Coursecha",
  description: "Kids Who Farm",
};

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <FirebaseAuthProvider>
          {children}
          <Toaster />
        </FirebaseAuthProvider>
      </body>
    </html>
  );
}
