import { SignInWithGoogleButton } from "@/components/auth/SignInWithGoogleButton";
import { UserGreetText } from "@/components/auth/UserGreetText";
import { add } from "@repo/next-supabase/add";
import { getSupabase } from "@/config/supabaseAuth";

export default async function Index() {
  const supabase = await getSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log({ user });
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
