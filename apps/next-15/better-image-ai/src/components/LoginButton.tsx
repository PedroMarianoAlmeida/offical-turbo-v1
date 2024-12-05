"use client";
import { Button } from "@repo/shadcn/button";
import { signIn } from "next-auth/react";

export const SignInButton = () => {
  return (
    <Button onClick={() => signIn()} variant="outline">
      Sign in
    </Button>
  );
};
