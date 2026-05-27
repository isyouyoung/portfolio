import { Bookmark, BookmarkCheck, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui";
import { formatDate } from "@/shared/lib";

import { useBookmark } from "@/features/bookmarks";

import { useBlogPost } from "../hooks/useBlogPost.js";
import { BlogPostBody } from "./BlogPostBody.jsx";

/**
 * 블로그 글 상세 모달.
 *
 * @param {string|null} slug - 열릴 글의 slug. null이면 닫힘.
 * @param {() => void} onClose - 모달 닫을 때 콜백 (보통 라우터 쿼리 제거)
 * @param {{previous: object|null, next: object|null}} navigation - 이전/다음 글
 * @param {(slug: string) => void} onNavigate - prev/next 선택 시 콜백
 */
export function BlogPostModal({ slug, onClose, navigation, onNavigate }) {
  const open = Boolean(slug);
  const { data: post, isLoading, isError, error } = useBlogPost(slug);
  const { isBookmarked, toggle } = useBookmark(slug || "__none__");

  const handleOpenChange = (next) => {
    if (!next) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        {isLoading && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            <DialogTitle className="sr-only">글 불러오는 중</DialogTitle>
            <DialogDescription className="sr-only">
              블로그 글 본문을 불러오고 있습니다.
            </DialogDescription>
            불러오는 중...
          </div>
        )}

        {isError && (
          <div className="py-12 text-center">
            <DialogTitle className="text-lg">글을 불러오지 못했습니다</DialogTitle>
            <DialogDescription className="mt-2">
              {error?.message || "잠시 후 다시 시도해주세요."}
            </DialogDescription>
          </div>
        )}

        {post && (
          <>
            <DialogDescription className="sr-only">
              {post.summary || `${post.title} 본문 보기`}
            </DialogDescription>
            <header className="flex flex-col gap-3 pr-8">
              <DialogTitle
                className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
                style={{ whiteSpace: "pre-line", wordBreak: "keep-all" }}
              >
                {post.title}
              </DialogTitle>
              <div className="flex items-center gap-3 text-xs text-muted-foreground tabular-nums">
                <span>{formatDate(post.publishedAt)}</span>
                <button
                  type="button"
                  onClick={toggle}
                  className="inline-flex items-center gap-1 border border-border rounded-md px-2 py-1 hover:bg-accent transition-colors"
                  aria-label={isBookmarked ? "북마크 해제" : "북마크"}
                >
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck className="size-3 text-amber-500" />
                      <span>북마크됨</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="size-3" />
                      <span>북마크</span>
                    </>
                  )}
                </button>
              </div>
            </header>

            <div className="h-px bg-border" />

            <BlogPostBody markdown={post.body} />

            {(navigation.previous || navigation.next) && (
              <nav className="mt-6 pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  {navigation.previous ? (
                    <button
                      type="button"
                      onClick={() => onNavigate(navigation.previous.slug)}
                      className="group flex-1 flex flex-col gap-1 p-3 rounded-lg border border-border hover:bg-accent transition-colors text-left min-w-0"
                    >
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ChevronLeft className="size-3" />
                        이전 글
                      </span>
                      <span
                        className="text-sm font-medium group-hover:text-foreground transition-colors truncate"
                        style={{ wordBreak: "keep-all" }}
                      >
                        {navigation.previous.title.replace(/\n/g, " ")}
                      </span>
                    </button>
                  ) : (
                    <div className="hidden sm:block flex-1" />
                  )}

                  {navigation.next ? (
                    <button
                      type="button"
                      onClick={() => onNavigate(navigation.next.slug)}
                      className="group flex-1 flex flex-col gap-1 p-3 rounded-lg border border-border hover:bg-accent transition-colors text-right min-w-0"
                    >
                      <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                        다음 글
                        <ChevronRight className="size-3" />
                      </span>
                      <span
                        className="text-sm font-medium group-hover:text-foreground transition-colors truncate"
                        style={{ wordBreak: "keep-all" }}
                      >
                        {navigation.next.title.replace(/\n/g, " ")}
                      </span>
                    </button>
                  ) : (
                    <div className="hidden sm:block flex-1" />
                  )}
                </div>
              </nav>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
