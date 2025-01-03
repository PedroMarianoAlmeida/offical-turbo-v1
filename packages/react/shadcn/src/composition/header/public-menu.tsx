import { Menu } from "lucide-react";

import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  // Menubar -> See auth-menu
} from "../../native-shadcn/menubar";

import { HeaderProps } from "./index";

export const PublicMenu = ({ items }: Pick<HeaderProps, "items">) => {
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
          <MenubarItem key={id} asChild>
            {element}
          </MenubarItem>
        ))}
      </MenubarContent>
    </MenubarMenu>
  );
};
