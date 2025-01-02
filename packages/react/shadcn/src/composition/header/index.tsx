import { ReactNode } from "react";
import { CoreSession, WithChildren } from "@repo/core-main/types";

import { PublicMenu } from "./public-menu";
import { AuthMenu } from "./auth-menu";
import { Menubar } from "../../native-shadcn/menubar";
import { ModeToggle, ModeToggleProps } from "../mode-toggle-lite";

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

interface BaseHeaderProps extends Partial<WithChildren> {
  logo?: ReactNode;
  theme?: ModeToggleProps;
  items?: MenuItemsByRole;
}

interface AuthenticatedHeaderProps extends BaseHeaderProps {
  items?: MenuItemsByRole & { authenticatedItems?: never };
  auth?: undefined;
}

interface AuthenticatedWithAuthHeaderProps extends BaseHeaderProps {
  auth: Auth;
}

export type HeaderProps =
  | AuthenticatedHeaderProps
  | AuthenticatedWithAuthHeaderProps;

export function Header({
  logo = "Logo",
  theme,
  items,
  auth,
  children,
}: HeaderProps) {
  return (
    <Menubar className="justify-between h-15 px-3">
      {logo}
      <div className="flex items-center gap-2">
        {children}
        {theme && (
          <ModeToggle
            setTheme={theme.setTheme}
            currentTheme={theme.currentTheme}
          />
        )}
        {auth ? (
          <AuthMenu auth={auth} items={items} />
        ) : (
          <PublicMenu items={items} />
        )}
      </div>
    </Menubar>
  );
}
