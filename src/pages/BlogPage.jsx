import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectBlogQuery, setBlogQuery } from "@/features/ui";

import { BlurFade } from "@/shared/motion";
import { normalizePage, paginate } from "@/shared/lib";

import { useBookmarkList } from "@/features/bookmarks";
import {
  BlogList,
  BlogPagination,
  BlogPostModal,
  useBlogPosts,
} from "@/features/blog";

const PAGE_SIZE = 5;
const BLUR_FADE_DELAY = 0.04;

// ★ REFACTOR #1: 검색어가 로컬 useState로 관리되고 있다.
// 같은 검색어를 다른 컴포넌트(예: Navbar 검색 아이콘)에서도 보고 싶다면
// 전역 상태(Redux)로 옮겨야 한다.
// → 오늘 수업에서 ui slice를 만들어 Redux로 이전한다.

/**
 * 블로그 목록 + 글 모달.
 *
 * URL 규약:
 *   /blog            → 목록 1페이지
 *   /blog?page=2     → 목록 2페이지
 *   /blog?post=slug  → 목록 위에 모달이 열린 상태 (URL 공유 가능)
 */
export function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: posts, isLoading, isError } = useBlogPosts();
  const bookmarks = useBookmarkList();

  // ★ REFACTOR #1 (계속): 이 useState를 Redux로 옮기는 것이 오늘의 미션
  // const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const query = useSelector(selectBlogQuery);

  const pageParam = searchParams.get("page");
  const selectedSlug = searchParams.get("post");

  // 검색어로 글 목록 필터링
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.summary ?? "").toLowerCase().includes(q)
    );
  }, [posts, query]);

  const totalPages = filteredPosts.length
    ? Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE))
    : 1;
  const currentPage = normalizePage(pageParam, totalPages);

  const { items: pagePosts, pagination } = useMemo(() => {
    return paginate(filteredPosts, { page: currentPage, pageSize: PAGE_SIZE });
  }, [filteredPosts, currentPage]);

  /** 모달 열기 — page 쿼리는 유지, post 쿼리만 추가/교체 */
  const openPost = useCallback(
    (slug) => {
      const next = new URLSearchParams(searchParams);
      next.set("post", slug);
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  /** 모달 닫기 — post 쿼리만 제거 */
  const closePost = useCallback(() => {
    const next = new URLSearchParams(searchParams);
    next.delete("post");
    setSearchParams(next);
  }, [searchParams, setSearchParams]);

  /** 페이지 변경 — post 쿼리는 닫고 page만 갱신 */
  const goPage = useCallback(
    (next) => {
      const params = new URLSearchParams();
      params.set("page", String(next));
      setSearchParams(params);
    },
    [setSearchParams]
  );

  /** 모달 안 이전/다음 글 계산 */
  const navigation = useMemo(() => {
    if (!selectedSlug || !posts) return { previous: null, next: null };
    const idx = posts.findIndex((p) => p.slug === selectedSlug);
    if (idx < 0) return { previous: null, next: null };
    return {
      previous: idx > 0 ? posts[idx - 1] : null,
      next: idx < posts.length - 1 ? posts[idx + 1] : null,
    };
  }, [posts, selectedSlug]);

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          블로그{" "}
          <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-xs tabular-nums">
            {posts?.length ?? 0} posts
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          수업에서 배운 React·Redux·React Query를 정리한 학습 노트입니다.
          {bookmarks.length > 0 && (
            <span className="ml-2 text-amber-500">
              ★ 북마크 {bookmarks.length}개
            </span>
          )}
        </p>
        <input
          type="search"
          value={query}
          // onChange={(e) => setQuery(e.target.value)}
          onChange={(e) => dispatch(setBlogQuery(e.target.value))}
          placeholder="제목 또는 요약에서 검색"
          className="mb-8 w-full max-w-sm rounded-md border border-border bg-card px-3 py-2 text-sm"
        />
      </BlurFade>

      {isLoading && (
        <p className="text-sm text-muted-foreground">불러오는 중...</p>
      )}

      {isError && (
        <p className="text-sm text-destructive">
          블로그 목록을 불러오지 못했습니다.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <BlogList
            posts={pagePosts}
            page={pagination.page}
            pageSize={PAGE_SIZE}
            onSelect={openPost}
          />
          <BlogPagination pagination={pagination} onPageChange={goPage} />
        </>
      )}

      <BlogPostModal
        slug={selectedSlug}
        onClose={closePost}
        navigation={navigation}
        onNavigate={openPost}
      />
    </section>
  );
}
