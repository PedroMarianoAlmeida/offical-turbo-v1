"use client";
import { ModeToggle } from "@repo/shadcn/mode-toggle";
import { useTheme } from "next-themes";
import { WithChildren } from "@repo/core-main/types";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
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

  return (
    <>
      <ModeToggle setTheme={setTheme} />
      <AuthButton />
      {children}
    </>
  );
};

export default LayoutClient;
