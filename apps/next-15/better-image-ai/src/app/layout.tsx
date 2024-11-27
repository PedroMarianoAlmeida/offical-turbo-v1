import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { ThemeProvider } from "@/components/layout-related/theme-provider";
import { AuthProvider } from "@/components/layout-related/auth-provider";
import { QueryProvider } from "@/components/layout-related/QueryProvider";

import localFont from "next/font/local";

import "@repo/shadcn/styles.css";
import "./globals.css";

import LayoutClient from "@/components/layout-related/LayoutClient";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Better Image AI",
  description: "Craft a better image, think in the details",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <LayoutClient>{children}</LayoutClient>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
