# Next Supabase

## Installation

### Server Side:
On `/src/config/supabaseSsr`

```
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

```

### Client side
- No need to install something for this package, use directly the @supabase/ssr

```
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

```

## Usage

### Get session: 
```
import { sessionAdapter } from "@repo/next-supabase/session-adapters";
import { getSupabase } from "@/config/supabaseAuth";

---component---
  const supabase = await getSupabase(); // Or the client supabase
  const { hasUser, userData } = await sessionAdapter(supabase);
```
