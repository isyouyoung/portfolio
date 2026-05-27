/**
 * YYYY-MM-DD 또는 Date → "2026년 5월 25일" 식 한글 포맷.
 */
export function formatDate(date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
