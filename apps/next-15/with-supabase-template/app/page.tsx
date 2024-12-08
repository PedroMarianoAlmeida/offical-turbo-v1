import { SignInWithGoogleButton } from "@/components/auth/SignInWithGoogleButton";
import { UserGreetText } from "@/components/auth/UserGreetText";
import { add } from "@repo/next-supabase/add";

export default async function Index() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        <p>{add(1, 2)}</p>
        <SignInWithGoogleButton />
        <UserGreetText />
      </main>
    </>
  );
}
