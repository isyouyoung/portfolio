/**
 * 블로그 글 메타데이터 인덱스.
 *
 * 실제 본문은 public/blog/{slug}.md 정적 파일에 두고
 * React Query + fetch로 가져온다 (useBlogPost 참조).
 *
 * 새 글 추가:
 * 1) public/blog/my-post.md 작성
 * 2) 이 배열에 한 줄 추가:
 *    { slug: "my-post", title: "...", publishedAt: "YYYY-MM-DD", summary: "..." }
 */
export const blogIndex = [
  {
    slug: "react-state-vs-redux",
    title: "useState · useReducer · Redux\n언제 뭘 쓸까",
    publishedAt: "2026-05-20",
    summary: "수업에서 배운 세 가지 상태관리 방법을\n표 한 장으로 비교했습니다.",
  },
  {
    slug: "react-query-basics",
    title: "React Query를 처음 써본 후기",
    publishedAt: "2026-05-10",
    summary: "fetch로 직접 처리하던 로딩·에러 상태가\nReact Query로 얼마나 줄어드는지 정리.",
  },
  {
    slug: "react-router-quick-tips",
    title: "React Router 라우팅\n처음 잡을 때 헷갈리던 것들",
    publishedAt: "2026-04-28",
    summary: "Link/useNavigate, 동적 라우트,\nuseParams를 한꺼번에 정리.",
  },
  {
    slug: "useeffect-cleanup",
    title: "useEffect 정리(cleanup)\n함수가 필요한 순간",
    publishedAt: "2026-04-10",
    summary: "타이머·이벤트 리스너·구독 패턴에서\ncleanup을 잊으면 생기는 버그.",
  },
  {
    slug: "campus-capstone-retrospective",
    title: "캠퍼스 캡스톤 회고\n— 빅데이터 + React",
    publishedAt: "2026-03-15",
    summary: "학과 캡스톤에서 Python 백엔드와\nReact 프론트를 붙이며 배운 것.",
  },
];

/**
 * 발행일 내림차순으로 정렬.
 */
export function sortByPublishedAtDesc(posts) {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
}

/**
 * slug 하나로 해당 글 메타 찾기.
 */
export function findPostBySlug(slug) {
  return blogIndex.find((p) => p.slug === slug) || null;
}
