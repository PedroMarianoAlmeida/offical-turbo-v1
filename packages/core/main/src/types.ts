import { type ReactNode } from "react";

export interface WithChildren {
  children: ReactNode;
}

type roleOptions = "admin" | "self" | "authenticated";
interface UserData {
  id: number | string;
  email: string;
  name: string;
  photoUrl: string;
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
