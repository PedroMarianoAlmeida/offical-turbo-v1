"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signIn, signOut } from "next-auth/react";

import { Header } from "@repo/shadcn/header";
import { Toaster } from "@repo/shadcn/toaster";
import { WithChildren } from "@repo/core-main/types";
import { useCoreSession } from "@repo/next-auth/session-adapters";

import { DailyUsage } from "@/components/DailyUsage";

interface LayoutClientProps extends WithChildren {
  totalCredits: number;
}
const LayoutClient = ({ children, totalCredits }: LayoutClientProps) => {
  const { setTheme } = useTheme();
  const session = useCoreSession();

  return (
    <>
      <Header
        logo={
          <Link href="/" className="font-mono font-bold text-xs sm:text-base">
            Better Image AI
          </Link>
        }
        setTheme={setTheme}
        auth={{ session, signIn, signOut }}
        items={{
          publicItems: [
            {
              id: "home",
              element: (
                <Link href="/" className="w-full">
                  Home
                </Link>
              ),
            },
            {
              id: "tutorial",
              element: (
                <Link href="/tutorial" className="w-full">
                  Tutorial
                </Link>
              ),
            },
            {
              id: "about",
              element: (
                <Link href="/about" className="w-full">
                  About
                </Link>
              ),
            },
          ],
          authenticatedItems: [
            {
              id: "dashboard",
              element: (
                <Link href="/dashboard" className="w-full">
                  Dashboard
                </Link>
              ),
            },
          ],
        }}
      >
        <DailyUsage totalCredits={totalCredits} hasUser={session.hasUser} />
      </Header>
      <Toaster />
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
};

export default LayoutClient;
