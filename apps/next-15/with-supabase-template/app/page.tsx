import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { SignInWithGoogleButton } from "@/components/auth/SignInWithGoogleButton";
import { UserGreetText } from "@/components/auth/UserGreetText";

export default async function Index() {
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
