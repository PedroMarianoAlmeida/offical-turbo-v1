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


interface PublicMenuItems {
  publicItems?: Item[];
}

export interface AuthenticatedMenuItems extends PublicMenuItems {
  authenticatedItems: Item[];
}

export type HeaderProps =
  | {
      logo?: ReactNode;
      setTheme?: SetTheme;
      items?: MenuItemsByRole & { authenticatedItems?: never };
      auth?: undefined;
    }
  | {
      logo?: ReactNode;
      setTheme?: SetTheme;
      items?: MenuItemsByRole;
      auth: Auth;
    };

    export function Header({ logo = "Logo", setTheme, items, auth }: HeaderProps) {
      return (
        <Menubar className="justify-between">
          {logo}
          <div className="flex">
            {setTheme && <ModeToggle setTheme={setTheme} />}
            {auth ? (
              <AuthMenu auth={auth} items={items} />
            ) : (
              <PublicMenu items={items} />
            )}
          </div>
        </Menubar>
      );
    }
    
    
