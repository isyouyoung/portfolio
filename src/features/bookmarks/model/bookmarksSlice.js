import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "kopo-portfolio-bookmarks";

function load() {
  if (typeof window === "undefined") return [];
  // ★ BUG #3: localStorage.getItem이 null을 반환하는 경우(첫 방문) 처리가 누락됨
  // 힌트: JSON.parse(null)은 null을 반환하고, 그 다음 .includes() 호출에서 에러 발생
  try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(slugs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
}

/**
 * 즐겨찾기 모음.
 * 슬러그(또는 프로젝트 제목) 문자열 배열로 단순하게 관리.
 * 블로그 글·프로젝트 카드 어디서든 같은 슬러그를 toggle 하면 됨.
 */
const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    slugs: load(),
  },
  reducers: {
    toggleBookmark(state, action) {
      const slug = action.payload;
      const idx = state.slugs.indexOf(slug);
      if (idx >= 0) {
        state.slugs.splice(idx, 1);
      } else {
        state.slugs.push(slug);
      }
      save(state.slugs);
    },
    clearBookmarks(state) {
      state.slugs = [];
      save(state.slugs);
    },
  },
});

export const { toggleBookmark, clearBookmarks } = bookmarksSlice.actions;

export const selectBookmarkSlugs = (state) => state.bookmarks.slugs;

export default bookmarksSlice.reducer;
