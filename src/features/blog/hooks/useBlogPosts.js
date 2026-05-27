import { useQuery } from "@tanstack/react-query";

import { blogIndex, sortByPublishedAtDesc } from "../data/blogIndex.js";

/**
 * 전체 블로그 글 목록 (발행일 내림차순).
 * 정적 데이터지만 React Query에 태워서 다른 hook과 인터페이스를 통일한다.
 */
export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog", "list"],
    queryFn: () => sortByPublishedAtDesc(blogIndex),
  });
}
