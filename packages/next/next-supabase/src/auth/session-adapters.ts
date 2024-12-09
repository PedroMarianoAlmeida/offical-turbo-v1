import { CoreSession } from "@repo/core-main/types";
import { SupabaseClient } from "@supabase/supabase-js";

export const sessionAdapter = async (
  supabase: SupabaseClient | null
): Promise<CoreSession> => {
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { id, user_metadata } = user;
      const { avatar_url, email, full_name } = user_metadata;

      return {
        hasUser: true,
        userData: {
          email,
          id,
          name: full_name,
          photoUrl: avatar_url,
          roles: [],
        },
      };
    }
  }
  return { hasUser: false, userData: null };
};
