import { type CoreSession } from "@repo/core-main/types";
import { type SupabaseClient } from "@supabase/supabase-js";

export const sessionAdapter = async (
  supabase: SupabaseClient | null
): Promise<CoreSession> => {
  if (!supabase) return { hasUser: false, userData: null };

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return { hasUser: false, userData: null };

    const { id, user_metadata } = user;
    const { avatar_url, email, full_name } = user_metadata;

    return {
      hasUser: true,
      userData: {
        email,
        id,
        name: full_name,
        photoUrl: avatar_url,
        roles: [], // Add roles as necessary
      },
    };
  } catch (err) {
    console.error("Error in sessionAdapter:", err);
    return { hasUser: false, userData: null };
  }
};
