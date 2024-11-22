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
import { HeaderProps, Auth } from "./index";

const WithItems = () => {
  return <p>With Items</p>;
};

const WithoutItems = ({ auth }: { auth: Auth }) => {
  const { session, signIn, signOut } = auth;

  if (session.hasUser) {
    const {
      userData: { name, photoUrl },
    } = session;
    return (
      <Button variant="ghost">
        <Avatar onClick={signOut}>
          {/* Maybe keep only one return and a ternary around here to reuse the wrappers */}
          <AvatarImage src={photoUrl ?? ""} alt={name ?? "Visitor"} />
          <AvatarFallback>
            <CircleUserRound size={40} />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <Avatar>
      <CircleUserRound onClick={signIn} size={40} />
    </Avatar>
  );
};
interface AuthMenuProps extends Pick<HeaderProps, "items"> {
  auth: Auth; // I cannot put auth in the Pick because it is mandatory in this component
}
export const AuthMenu = ({ items, auth }: AuthMenuProps) => {
  const {
    session: { hasUser, userData },
    signIn,
    signOut,
  } = auth;

  return <>{items ? <WithItems /> : <WithoutItems auth={auth} />}</>;

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
};
