import { SignInWithGoogleButton } from "@/components/auth/SignInWithGoogleButton";
import { UserGreetText } from "@/components/auth/UserGreetText";
import { sessionAdapter } from "@repo/next-supabase/session-adapters";
import { getSupabase } from "@/config/supabaseAuth";

export default async function Index() {
  const supabase = await getSupabase();
  const { hasUser, userData } = await sessionAdapter(supabase);
  console.log({ userData });
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        <SignInWithGoogleButton />
        <UserGreetText />
      </main>
    </>
  );
}
