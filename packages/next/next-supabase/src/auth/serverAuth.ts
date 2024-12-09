import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

type SupabaseClient = ReturnType<typeof createServerClient>;

interface InitializeSupabaseProps {
  projectName: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}
// Store instances mapped by project name
const supabaseInstances: Map<string, SupabaseClient> = new Map();

export async function initializeSupabase({
  projectName,
  supabaseAnonKey,
  supabaseUrl,
}: InitializeSupabaseProps): Promise<SupabaseClient> {
  // Use the project name to uniquely identify instances
  if (!supabaseInstances.has(projectName)) {
    const cookieStore = await cookies();

    const newClient = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Ignore errors from Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // Ignore errors from Server Components
          }
        },
      },
    });

    supabaseInstances.set(projectName, newClient);
  }

  return supabaseInstances.get(projectName)!;
}
