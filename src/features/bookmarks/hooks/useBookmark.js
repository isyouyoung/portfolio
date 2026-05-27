import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectBookmarkSlugs, toggleBookmark } from "../model/bookmarksSlice.js";

/**
 * 특정 slug 하나에 대한 북마크 상태 + 토글 함수.
 *
 * @example
 * const { isBookmarked, toggle } = useBookmark("react-state-vs-redux");
 */
export function useBookmark(slug) {
  const dispatch = useDispatch();
  const isBookmarked = useSelector((state) =>
    state.bookmarks.slugs.includes(slug)
  );

  const toggle = useCallback(() => {
    dispatch(toggleBookmark(slug));
  }, [dispatch, slug]);

  return { isBookmarked, toggle };
}

/**
 * 전체 북마크 슬러그 목록.
 */
export function useBookmarkList() {
  return useSelector(selectBookmarkSlugs);
}
