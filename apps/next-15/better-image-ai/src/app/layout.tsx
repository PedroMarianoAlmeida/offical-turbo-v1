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
  openGraph: {
    title: "Better Image AI",
    description: "Craft a better image, think in the details",
    url: "https://better-image-ai.vercel.app/",
    type: "website",
    images: [
      {
        url: "meta-image.png",
        width: 414,
        height: 220,
        alt: "I image mixing before and after the image",
      },
    ],
  },
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon_io/favicon-16x16.png"
        />
        <link rel="manifest" href="favicon_io/site.webmanifest" />
      </head>
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
