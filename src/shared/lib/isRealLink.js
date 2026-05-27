/**
 * "", "#", undefined은 진짜 외부 링크가 아니라고 판단.
 * 이런 값을 <a href>에 넣으면 같은 페이지로 새 창이 열려서
 * 사용자가 보기엔 "localhost가 끝없이 반복" 되는 것처럼 보임.
 */
export function isRealLink(href) {
  if (!href) return false;
  const trimmed = String(href).trim();
  return trimmed !== "" && trimmed !== "#";
}
