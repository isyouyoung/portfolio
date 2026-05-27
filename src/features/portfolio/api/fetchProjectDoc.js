/**
 * public/projects/{slug}.md 프로젝트 상세 마크다운을 받아온다.
 */
export async function fetchProjectDoc(slug) {
  const res = await fetch(`/projects/${slug}.md`);
  if (!res.ok) {
    throw new Error(`프로젝트 상세를 불러오지 못했습니다 (${res.status}): ${slug}`);
  }
  return res.text();
}
