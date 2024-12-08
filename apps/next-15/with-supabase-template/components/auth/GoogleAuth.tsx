"use client";

import { signInWithGoogle } from "@/lib/auth-actions";

export const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
    }
  };

  return (
    <button onClick={handleGoogleSignIn} type="button">
      Sign in with Google
    </button>
  );
};
