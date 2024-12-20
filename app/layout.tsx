import "./globals.css";

import { auth } from "@/auth";
import TanstackProvider from "@/components/layout/TanstackProvider";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn("min-h-screen bg-background font-sans antialiased")}
        >
          <TanstackProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <ToastContainer theme="dark" />
          </TanstackProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
