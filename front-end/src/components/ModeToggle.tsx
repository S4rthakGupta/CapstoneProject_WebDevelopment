"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { FaMoon, FaSun } from "react-icons/fa";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle Theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
    </Button>
  );
}
