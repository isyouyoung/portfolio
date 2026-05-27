import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectThemeMode } from "../model/themeSlice.js";

/**
 * Redux의 theme.mode → <html class="dark"> 동기화.
 * 자식을 그대로 통과시키는 invisible Provider 패턴.
 */
export function ThemeSync({ children }) {
  const mode = useSelector(selectThemeMode);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // ★ BUG #2: useEffect 의존성 배열이 비어있어 mode 변경 시 재실행되지 않음
    // → 다크모드 토글 버튼을 눌러도 화면이 변경되지 않는다
  }, [mode]);

  return children;
}
