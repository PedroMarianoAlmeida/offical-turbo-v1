import { Menu, CircleUserRound } from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../native-shadcn/menubar";
import { ModeToggle, SetTheme } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../native-shadcn/avatar";
import { ReactNode } from "react";
import { CoreSession } from "@repo/core-main/types";

interface Auth {
  session: CoreSession;
  signIn(): void;
  signOut(): void;
}

interface item {
  id: string | number;
  element: ReactNode;
}

interface MenuItemsByRole {
  publicItems?: item[];
  authenticatedItems?: item[];
}
interface HeaderProps {
  logo?: ReactNode;
  setTheme?: SetTheme;
  items?: MenuItemsByRole;
  auth?: Auth;
}

// const AuthUi = ({ auth }: { auth: Auth }) => {
//   const { authResponse, signIn, signOut } = auth;

//   return (
//     <MenubarMenu>
//       <MenubarTrigger>
//         <Avatar>
//           <AvatarImage
//             src={authResponse.hasUser ? authResponse.image || "" : ""}
//             alt={authResponse.hasUser ? authResponse.name || "" : "Visitor"}
//           />
//           <AvatarFallback>
//             <CircleUserRound />
//           </AvatarFallback>
//         </Avatar>
//       </MenubarTrigger>
//       <MenubarContent>
//         {authResponse.hasUser ? (
//           <MenubarItem onClick={signOut}>Logout</MenubarItem>
//         ) : (
//           <MenubarItem onClick={signIn}>Login</MenubarItem>
//         )}
//       </MenubarContent>
//     </MenubarMenu>
//   );
// };

const PublicMenu = ({ items }: { items: HeaderProps["items"] }) => {
  if (!items || !items.publicItems || items.publicItems.length == 0)
    return null;

  const { publicItems } = items;
  return (
    <MenubarMenu>
      <MenubarTrigger>
        <Menu />
      </MenubarTrigger>
      <MenubarContent>
        {publicItems.map(({ element, id }) => (
          <MenubarItem key={id}>{element}</MenubarItem>
        ))}
      </MenubarContent>
    </MenubarMenu>
  );
};

export function Header({ logo = "Logo", setTheme, items, auth }: HeaderProps) {
  return (
    <Menubar className="justify-between">
      {logo}
      <div className="flex">
        {setTheme ? <ModeToggle setTheme={setTheme} /> : null}
        {auth ? null : <PublicMenu items={items} />}
      </div>
    </Menubar>
  );
}
