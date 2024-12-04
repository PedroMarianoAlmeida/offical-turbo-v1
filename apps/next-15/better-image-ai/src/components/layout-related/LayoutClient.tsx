"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signIn, signOut } from "next-auth/react";

import { Header } from "@repo/shadcn/header";
import { Toaster } from "@repo/shadcn/toaster";
import { WithChildren } from "@repo/core-main/types";
import { useCoreSession } from "@repo/next-auth/session-adapters";

import { DailyUsage } from "@/components/DailyUsage";

export interface DailyUsageProps {
  currentUsage: number | null;
  totalCredits: number;
}
interface LayoutClientProps extends WithChildren, DailyUsageProps {}
const LayoutClient = ({
  children,
  currentUsage,
  totalCredits,
}: LayoutClientProps) => {
  const { setTheme } = useTheme();
  const session = useCoreSession();

  return (
    <>
      <Header
        logo={
          <Link href="/" className="font-mono font-bold">
            Better Image AI
          </Link>
        }
        setTheme={setTheme}
        auth={{ session, signIn, signOut }}
        items={{
          publicItems: [
            { id: "home", element: <Link href="/">Home</Link> },
            { id: "about", element: <Link href="/about">About</Link> },
          ],
          authenticatedItems: [
            {
              id: "dashboard",
              element: <Link href="/dashboard">Dashboard</Link>,
            },
          ],
        }}
      >
        <DailyUsage currentUsage={currentUsage} totalCredits={totalCredits} />
      </Header>
      <Toaster />
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
};

export default LayoutClient;
