"use client";
import { ModeToggle } from "@repo/shadcn/mode-toggle";
import { useTheme } from "next-themes";

const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const { setTheme } = useTheme();
  return (
    <>
      <ModeToggle setTheme={setTheme} />
      {children}
    </>
  );
};

export default LayoutClient;
