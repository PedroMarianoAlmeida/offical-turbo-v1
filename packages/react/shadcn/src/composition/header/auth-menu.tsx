import { Menu, CircleUserRound } from "lucide-react";

import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../../native-shadcn/menubar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../native-shadcn/avatar";
import { Button } from "./../../native-shadcn/button";
import { Auth, MenuItemsByRole } from "./index";

const AuthAvatar = ({ session }: Pick<Auth, "session">) => {
  const { hasUser } = session;
  if (hasUser) {
    const {
      userData: { photoUrl, name },
    } = session;
    return (
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={photoUrl ?? ""}
          alt={name ?? "Visitor"}
          className="w-full h-full"
        />
        <AvatarFallback>
          <CircleUserRound className="!w-full !h-full" />
        </AvatarFallback>
      </Avatar>
    );
  }
  return (
    <Avatar className="w-10 h-10">
      <CircleUserRound className="!w-full !h-full" />
    </Avatar>
  );
};

const WithItems = ({ auth, items }: { auth: Auth; items: MenuItemsByRole }) => {
  const { session, signIn, signOut } = auth;
  const { authenticatedItems, publicItems } = items;
  return (
    <MenubarMenu>
      <MenubarTrigger>
        <Menu />
        <AuthAvatar session={session} />
      </MenubarTrigger>
      <MenubarContent>
        {session.hasUser ? (
          <>
            <MenubarItem onClick={signOut}>Sign out</MenubarItem>
            {authenticatedItems &&
              authenticatedItems.map(({ id, element }) => (
                <MenubarItem key={id}>{element}</MenubarItem>
              ))}
            {publicItems &&
              publicItems.map(({ id, element }) => (
                <MenubarItem key={id}>{element}</MenubarItem>
              ))}
          </>
        ) : (
          <>
            <MenubarItem onClick={signIn}>Sign in</MenubarItem>
            {publicItems &&
              publicItems.map(({ id, element }) => (
                <MenubarItem key={id}>{element}</MenubarItem>
              ))}
          </>
        )}
      </MenubarContent>
    </MenubarMenu>
  );
};

const WithoutItems = ({ auth }: { auth: Auth }) => {
  const { session, signIn, signOut } = auth;

  const handleClick = session.hasUser ? signOut : signIn;

  return (
    <Button variant="ghost" onClick={handleClick}>
      <AuthAvatar session={session} />
    </Button>
  );
};

export const AuthMenu = ({
  auth,
  items,
}: {
  auth: Auth;
  items?: MenuItemsByRole;
}) => {
  return (
    <>
      {items ? (
        <WithItems auth={auth} items={items} />
      ) : (
        <WithoutItems auth={auth} />
      )}
    </>
  );
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
};
