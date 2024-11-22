"use client";
import { ModeToggle } from "@repo/shadcn/mode-toggle";
import { useTheme } from "next-themes";
import { WithChildren } from "@repo/core-main/types";

const LayoutClient = ({ children }: WithChildren) => {
  const { setTheme } = useTheme();
  return (
    <>
      <ModeToggle setTheme={setTheme} />
      {children}
    </>
  );
};

export default LayoutClient;
