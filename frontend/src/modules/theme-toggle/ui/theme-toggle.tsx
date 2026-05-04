"use client";

import { useTheme } from "next-themes";
import { cn } from "@/shared/lib/utils";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/shared/ui/button";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, systemTheme } = useTheme();
  const Icon = theme === "light" || (theme === "system" && systemTheme === "light") ? Sun : Moon;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost" size="icon" className={cn("size-7")} onClick={toggleTheme}>
      <Icon />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
