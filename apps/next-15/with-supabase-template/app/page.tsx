import { SignInWithGoogleButton } from "@/components/auth/SignInWithGoogleButton";
import { UserGreetText } from "@/components/auth/UserGreetText";
import { add } from "@repo/next-supabase/add";
import { initializeSupabase } from "@repo/next-supabase/serverAuth";

export default async function Index() {
  const supabase = initializeSupabase({
    projectName: process.env.NEXT_PUBLIC_PROJECT_NAME ?? "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  });

  const { data: { user },} = await supabase.auth.getUser();
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
