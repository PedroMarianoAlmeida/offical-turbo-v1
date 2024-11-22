import { useSession } from "next-auth/react";
import { Session, getServerSession } from "next-auth";

import { CoreSession } from "@repo/core-main/types";
import { urlSafeBase64Encode } from "@repo/core-main/utils";

const sessionAdapter = (session: Session | null): CoreSession => {
  if (session) {
    const { user } = session;
    if (user) {
      const { email, image, name } = user;

      if (!email) return { hasUser: false, userData: null };

      return {
        hasUser: true,
        userData: {
          id: urlSafeBase64Encode(email),
          email: email ?? null,
          photoUrl: image ?? null,
          name: name ?? null,
          roles: [],
        },
      };
    }
  }

  return { hasUser: false, userData: null };
};

export const useCoreSession = () => {
  const { data: session } = useSession();
  return sessionAdapter(session);
};

export const getCoreServerSession = async (): Promise<CoreSession> => {
  const session = await getServerSession();
  return sessionAdapter(session);
};
