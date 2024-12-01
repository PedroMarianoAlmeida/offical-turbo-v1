"use client";
import Link from "next/link";
import { Header } from "@repo/shadcn/header";
import { useTheme } from "next-themes";
import { WithChildren } from "@repo/core-main/types";
import { signIn, signOut } from "next-auth/react";
import { useCoreSession } from "@repo/next-auth/session-adapters";

const LayoutClient = ({ children }: WithChildren) => {
  const { setTheme } = useTheme();
  const session = useCoreSession();

  return (
    <>
      <Header
        setTheme={setTheme}
        auth={{ session, signIn, signOut }}
        items={{
          publicItems: [{ id: "home", element: <Link href="/">Home</Link> }],
          authenticatedItems: [
            {
              id: "dashboard",
              element: <Link href="/dashboard">Dashboard</Link>,
            },
          ],
        }}
      />
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
};

export default LayoutClient;
