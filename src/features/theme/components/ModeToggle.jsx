import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib";

import { selectThemeMode, toggleTheme } from "../model/themeSlice.js";

/**
 * 라이트/다크 전환 버튼.
 * Navbar 안의 Dock 아이콘으로 들어간다.
 */
export function ModeToggle({ className }) {
  const mode = useSelector(selectThemeMode);
  const dispatch = useDispatch();

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      className={cn(className)}
      onClick={() => dispatch(toggleTheme())}
      aria-label={mode === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {mode === "dark" ? (
        <Moon className="h-full w-full" />
      ) : (
        <Sun className="h-full w-full" />
      )}
    </Button>
  );
}
