import { useQuery } from "@tanstack/react-query";

import { fetchBlogPostBody } from "../api/fetchBlogPost.js";
import { findPostBySlug } from "../data/blogIndex.js";

/**
 * 단일 글의 메타 + 마크다운 본문.
 * slug가 비어있을 땐(`/blog`처럼 모달 닫힌 상태) 요청 자체를 안 함.
 */
export function useBlogPost(slug) {
  return useQuery({
    queryKey: ["blog", "post", slug],
    queryFn: async () => {
      const meta = findPostBySlug(slug);
      if (!meta) {
        throw new Error(`존재하지 않는 글: ${slug}`);
      }
      const body = await fetchBlogPostBody(slug);
      return { ...meta, body };
    },
    enabled: Boolean(slug),
  });
}
