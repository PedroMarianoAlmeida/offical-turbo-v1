"use client";
import { Header } from "@repo/shadcn/header";
import { useTheme } from "next-themes";
import { WithChildren } from "@repo/core-main/types";
import { signIn, signOut } from "next-auth/react";
import { useCoreSession } from "@repo/next-auth/session-adapters";

function AuthButton() {
  const { hasUser, userData } = useCoreSession();

  if (hasUser) {
    const { name } = userData;
    return (
      <>
        {name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

const LayoutClient = ({ children }: WithChildren) => {
  const { setTheme } = useTheme();
  const session = useCoreSession();

  return (
    <>
      <Header
        setTheme={setTheme}
        auth={{ session, signIn, signOut }}
        items={{
          publicItems: [
            { id: "home", element: <p>Home</p> },
            { id: "about", element: <p>About</p> },
          ],
          authenticatedItems: [{ id: "dashboard", element: <p>Dashboard</p> }],
        }}
      />
      <AuthButton />
      {children}
    </>
  );
};

export default LayoutClient;
