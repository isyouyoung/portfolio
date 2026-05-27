import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "kopo-portfolio-theme";

/**
 * 페이지 첫 로드 시 localStorage에서 테마를 가져온다.
 * (서버사이드 렌더링이 아니므로 window는 항상 있다고 가정해도 되지만,
 *  학생들이 SSR로 옮길 때 헷갈리지 않도록 가드를 둠.)
 */
function loadInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

function persist(mode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, mode);
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: loadInitialTheme(),
  },
  reducers: {
    setTheme(state, action) {
      state.mode = action.payload;
      persist(state.mode);
    },
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
      persist(state.mode);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const selectThemeMode = (state) => state.theme.mode;

export default themeSlice.reducer;
