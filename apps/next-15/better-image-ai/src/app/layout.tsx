import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { getUserCountUsageForToday } from "@repo/firebase/userCount";
import { sessionAdapter } from "@repo/next-auth/session-adapters";

import { ThemeProvider } from "@/components/layout-related/theme-provider";
import { AuthProvider } from "@/components/layout-related/auth-provider";
import { QueryProvider } from "@/components/layout-related/QueryProvider";
import "@repo/shadcn/styles.css";
import "./globals.css";
import LayoutClient from "@/components/layout-related/LayoutClient";
import { database } from "@/configs/firebaseConfig";

export const metadata: Metadata = {
  title: "Better Image AI",
  description: "Craft a better image, think in the details",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let usage: number | null = null;

  const session = await getServerSession();
  const sessionTreated = sessionAdapter(session);

  if (sessionTreated.hasUser) {
    const usageCount = process.env.DAILY_COUNT_DEV_ONLY
      ? { success: true, result: Number(process.env.DAILY_COUNT_DEV_ONLY) }
      : await getUserCountUsageForToday({
          userId: sessionTreated.userData.id.toString(),
          database,
          project: process.env.PROJECT_NAME,
        });
    if (usageCount.success) {
      usage = usageCount.result;
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <AuthProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <LayoutClient
                currentUsage={usage}
                totalCredits={Number(process.env.DAILY_LIMIT)}
              >
                {children}
              </LayoutClient>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
