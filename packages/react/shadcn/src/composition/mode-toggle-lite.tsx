import { Moon, Sun } from "lucide-react";

import { Button } from "../native-shadcn/button";

type PossibleThemes = "light" | "dark";
export const possibleThemesSanitizer = (theme: string): PossibleThemes =>
  theme === "dark" ? "dark" : "light";

type SetTheme = (newTheme: PossibleThemes) => void;

export interface ModeToggleProps {
  setTheme: SetTheme;
  currentTheme?: PossibleThemes;
}

export function ModeToggle({ setTheme, currentTheme }: ModeToggleProps) {
  if (currentTheme === "light")
    return (
      <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
      <Sun className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
