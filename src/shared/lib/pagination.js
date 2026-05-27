/**
 * 배열을 페이지 단위로 잘라서 메타정보와 함께 반환.
 */
export function paginate(items, { page, pageSize }) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    items: items.slice(startIndex, endIndex),
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

/**
 * URL 쿼리에서 받은 page 값을 1 ~ maxPage 범위로 클램프.
 */
export function normalizePage(page, maxPage) {
  const parsed = typeof page === "string" ? parseInt(page, 10) : page;
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.min(parsed, Math.max(1, maxPage));
}
