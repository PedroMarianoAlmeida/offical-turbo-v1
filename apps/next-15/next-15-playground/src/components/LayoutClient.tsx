"use client";
import { ModeToggle } from "@repo/shadcn/mode-toggle";

const LayoutClient = () => {
  return (
    <>
      <ModeToggle setTheme={() => console.log("test")} />
    </>
  );
};

export default LayoutClient;
