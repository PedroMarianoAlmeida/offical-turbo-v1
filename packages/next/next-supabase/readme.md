# Next Supabase

## Configs

### `/src/config/supabase/server.ts`

```
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

import { cookies } from "next/headers";

export async function createClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

```

### `/src/config/supabase/client.ts`

- No need to install something for this package, use directly the @supabase/ssr

```
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

```

### Middleware

- Optional: Check later

## Usage

### Server component:

```
import { sessionAdapter } from "@repo/next-supabase/session-adapters";
import { createClient } from "@/config/supabase/server";

---component---
  const supabase = await createClient();
  const { hasUser, userData } = await sessionAdapter(supabase);
```

### Client component

```
"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

---component---
const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);
```

### Layout client (maybe not all this)

```
"use client"
import { useCoreSessionUpdatedOnServerAndClient } from "@repo/next-supabase/useCoreSessionUpdatedOnServerAndClient";
import { createClient } from "@/utils/supabase/client";

const LayoutClient = () => {
  const supabase = createClient();
  const { user } = useCoreSessionUpdatedOnServerAndClient({ supabase });

  if (!user) return <div>Loading...</div>;
  if (!user.hasUser) return <div>Please log in.</div>;

  return (
    <div>
      Welcome, {user.userData.name || "User"}!
      <img src={user.userData.photoUrl || ""} alt="Profile" />
    </div>
  );
};

```
