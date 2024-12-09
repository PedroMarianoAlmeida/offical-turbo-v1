import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type SupabaseClient } from "@supabase/supabase-js";

import { CoreSession } from "@repo/core-main/types";
import { sessionAdapter } from "../adapters/session-adapters";

export const useCoreSessionUpdatedOnServerAndClient = ({
  supabase,
}: {
  supabase: SupabaseClient;
}) => {
  const [user, setUser] = useState<CoreSession | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await sessionAdapter(supabase);
        setUser(session);
      } catch (err) {
        console.error("Error fetching session:", err);
        setUser({ hasUser: false, userData: null }); // Fallback to no user
      }
    };

    fetchUser();
  }, [supabase]);

  useEffect(() => {
    if (user?.hasUser) {
      router.refresh(); // Refresh only when a valid user exists
    }
  }, [user, router]);

  return { user };
};
