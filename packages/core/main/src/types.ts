import { type ReactNode } from "react";

export interface WithChildren {
  children: ReactNode;
}

type roleOptions = "admin" | "self"; // No need of authenticated role, if have userData means that it is authenticated
export interface UserData {
  id: number | string;
  email: string | null;
  name: string | null;
  photoUrl: string | null;
  roles: roleOptions[];
}

interface SessionWithUser {
  hasUser: true;
  userData: UserData;
}

interface SessionWithoutUser {
  hasUser: false;
  userData: null;
}
export type CoreSession = SessionWithUser | SessionWithoutUser;
