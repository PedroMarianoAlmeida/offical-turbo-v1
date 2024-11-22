# Custom next-auth

A few components and adapters to use next-auth integrate with the @repo/core-main auth types.
And here is a good place to put all steps to make next-auth work in an app

## Initial setup

- Run `npm i next-auth` in your app folder
- Add those variables in you `.env` file (or create a new one - and there is a `.env.example` available in `src` with facilitate the copy pasta)
  - `NEXTAUTH_URL="http://localhost:30XX/"` -> For local development, in prod update for the real url - **And replace the XX for the real port of your app**
  - `NEXTAUTH_SECRET=""` -> TIP: Run "openssl rand -base64 12" on terminal to generate a random string
  - `GOOGLE_ID=""` ([Check docs if necessary for those ones](https://next-auth.js.org/providers/google))
  - `GOOGLE_SECRET=""`
  - Copy this code on `src/app/api/auth/[...nextauth]/route.ts`

```
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

- Check your `localhost:30XX/api/auth/providers` to confirm that it is working as expected

- Create this component

```
"use client";
export { SessionProvider as AuthProvider } from "next-auth/react";
```

- Add it (among other boilerplate on layout)

```
import { getServerSession } from "next-auth";
import { AuthProvider } from "COMPONENT PATH";

--- Inside component---

const session = await getServerSession(); //This is server site, so the component should be an async function

--- Inside return ---
<AuthProvider session={session}>
{children}
</AuthProvider>

```

- SignIn and signOut in the project with `import { signIn, signOut } from "next-auth/react";`

- Get the session already sanitized: `import { useCoreSession, getCoreServerSession } from "@repo/next-auth/session-adapters";`

## Sources

- - https://www.youtube.com/watch?v=md65iBX5Gxg (but I used Google Authenticator instead of the github Github)
