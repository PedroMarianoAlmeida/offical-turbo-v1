"use server";
import { initializeSupabase } from "@repo/next-supabase/serverAuth";
import { SupabaseClient } from "@supabase/supabase-js";

// I cannot return firebase directly, because this used cookies and need to be call inside a component
export async function getSupabase(): Promise<SupabaseClient> {
  return initializeSupabase({
    projectName: process.env.NEXT_PUBLIC_PROJECT_NAME ?? "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  });
}
