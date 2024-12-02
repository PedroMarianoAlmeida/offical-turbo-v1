import Link from "next/link";

import { getCoreServerSession } from "@repo/next-auth/session-adapters";
import { Button } from "@repo/shadcn/button";

import { ClientHome } from "@/components/page/client-home";

export default async function Home() {
  const { userData } = await getCoreServerSession();
  return (
    <main className="flex flex-col gap-4 items-center">
      <h1 className="font-mono font-bold">Better Image</h1>
      <h2>Real Example</h2>
      <ClientHome />
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
        <p className="semi-bold">Sign in to give it a try</p>
      )}
    </main>
  );
}
