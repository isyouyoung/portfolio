import { configureStore } from "@reduxjs/toolkit";

import { themeReducer } from "@/features/theme";
import { bookmarksReducer } from "@/features/bookmarks";
import { uiReducer } from "@/features/ui";
import { recentProjectsReducer } from "@/features/recentProjects";

/**
 * Redux store는 각 feature가 노출한 reducer를 한 곳에 모은다.
 * 새 feature를 추가할 때는:
 *   1) src/features/xxx/model/xxxSlice.js 작성
 *   2) src/features/xxx/index.js 에서 reducer를 export
 *   3) 여기 reducer 맵에 한 줄 추가
 */
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    bookmarks: bookmarksReducer,
    ui: uiReducer,
    recentProjects: recentProjectsReducer,
  },
});
