/**
 * public/blog/{slug}.md 마크다운 본문을 받아온다.
 * - 정적 파일이므로 동일 출처(same-origin)
 * - 실패 시 throw → React Query가 isError로 잡아준다
 */
export async function fetchBlogPostBody(slug) {
  const res = await fetch(`/blog/${slug}.md`);
  if (!res.ok) {
    throw new Error(`블로그 본문을 불러오지 못했습니다 (${res.status}): ${slug}`);
  }
  return res.text();
}
