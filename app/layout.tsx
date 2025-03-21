import type React from "react";
// import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { Navbar } from "@/components/custom/navbar";
import { AuthProvider } from "@/components/custom/auth-provider";
import "@/app/globals.css";
import { Suspense } from "react";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Akieni Blog",
  description: "A tech akieni blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense>
            <AuthProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Toaster />
              </div>
            </AuthProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
