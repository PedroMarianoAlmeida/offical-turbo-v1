import Link from "next/link";

import { getCoreServerSession } from "@repo/next-auth/session-adapters";
import { Button } from "@repo/shadcn/button";

import { SignInButton } from "@/components/LoginButton";
import { Feed } from "@/components/feed";

export default async function Home() {
  const { userData } = await getCoreServerSession();

  return (
    <main className="flex flex-col gap-4 items-center">
      <h1 className="font-mono">Better Image</h1>
      <p>
        Generic prompts lead to predictable AI-generated images. Use Better
        Image to craft more detailed and creative prompts, unlocking unique and
        compelling visuals every time!
      </p>
      {userData ? (
        <Link href="/dashboard">
          <Button>Give it a try</Button>
        </Link>
      ) : (
        <div className="flex gap-2 items-center">
          <SignInButton />
          <p className="semi-bold">to give it a try</p>
        </div>
      )}
      <Feed />
    </main>
  );
}
