/**
 * 블로그 목록 페이지네이션.
 * 페이지 번호 자체는 부모가 관리(URL 쿼리)하고 콜백만 받음.
 */
export function BlogPagination({ pagination, onPageChange }) {
  if (pagination.totalPages <= 1) return null;

  return (
    <div className="flex gap-3 flex-row items-center justify-between mt-8">
      <div className="text-sm text-muted-foreground tabular-nums">
        {pagination.page} / {pagination.totalPages} 페이지
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!pagination.hasPreviousPage}
          onClick={() => onPageChange(pagination.page - 1)}
          className="h-8 px-3 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          이전
        </button>
        <button
          type="button"
          disabled={!pagination.hasNextPage}
          onClick={() => onPageChange(pagination.page + 1)}
          className="h-8 px-3 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </div>
    </div>
  );
}
