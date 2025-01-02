"use client";
import { Header } from "@repo/shadcn/header";
import { WithChildren } from "@repo/core-main/types";
import { signIn, signOut } from "next-auth/react";
import { useCoreSession } from "@repo/next-auth/session-adapters";

const LayoutClient = ({ children }: WithChildren) => {
  const session = useCoreSession();

  return (
    <>
      <Header
        auth={{ session, signIn, signOut }}
        items={{
          publicItems: [
            { id: "home", element: <p>Home</p> },
            { id: "about", element: <p>About</p> },
          ],
          authenticatedItems: [{ id: "dashboard", element: <p>Dashboard</p> }],
        }}
      />
      {children}
    </>
  );
};

export default LayoutClient;
