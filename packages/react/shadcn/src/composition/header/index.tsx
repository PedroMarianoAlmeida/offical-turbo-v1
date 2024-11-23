import { ReactNode } from "react";
import { CoreSession } from "@repo/core-main/types";

import { PublicMenu } from "./public-menu";
import { AuthMenu } from "./auth-menu";
import { Menubar } from "../../native-shadcn/menubar";
import { ModeToggle, SetTheme } from "../mode-toggle";

export interface Auth {
  session: CoreSession;
  signIn(): void;
  signOut(): void;
}

interface Item {
  id: string | number;
  element: ReactNode;
}

export interface MenuItemsByRole {
  publicItems?: Item[];
  authenticatedItems?: Item[];
}
export interface HeaderProps {
  logo?: ReactNode;
  setTheme?: SetTheme;
  items?: MenuItemsByRole;
  auth?: Auth;
}

export function Header({ logo = "Logo", setTheme, items, auth }: HeaderProps) {
  return (
    <Menubar className="justify-between">
      {logo}
      <div className="flex">
        {setTheme ? <ModeToggle setTheme={setTheme} /> : null}
        {auth ? (
          <AuthMenu auth={auth} items={items} />
        ) : (
          <PublicMenu items={items} />
        )}
      </div>
    </Menubar>
  );
}
