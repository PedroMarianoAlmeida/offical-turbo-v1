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
import { HeaderProps, Auth } from "./index";

const WithItems = () => {
  return <p>With Items</p>;
};

const WithoutItems = ({ auth }: { auth: Auth }) => {
  const {
    session: { hasUser, userData },
    signIn,
    signOut,
  } = auth;

  if (hasUser) {
    return (
      <>
        <p>{userData?.name}</p> {/** Why do I need the "?"" here? - Fix that */}
        <CircleUserRound onClick={signOut} />
      </>
    );
  }

  return (
    <Avatar>
      <CircleUserRound onClick={signIn} />
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
