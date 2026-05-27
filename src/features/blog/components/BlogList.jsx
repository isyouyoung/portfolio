import { ChevronRight } from "lucide-react";

import { BlurFade } from "@/shared/motion";

import { useBookmarkList } from "@/features/bookmarks";

const BLUR_FADE_DELAY = 0.04;

/**
 * 블로그 글 목록.
 * 각 항목 클릭은 부모(BlogPage)가 라우터 쿼리로 모달을 열도록 onSelect로 위임.
 */
export function BlogList({ posts, page, pageSize, onSelect }) {
  const bookmarked = useBookmarkList();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
        <p className="text-muted-foreground text-center" style={{ whiteSpace: "pre-line" }}>
          {"아직 작성된 글이 없습니다."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {posts.map((post, id) => {
        const indexNumber = (page - 1) * pageSize + id + 1;
        const isBookmarked = bookmarked.includes(post.slug);
        return (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <button
              type="button"
              onClick={() => onSelect(post.slug)}
              className="w-full text-left flex items-start gap-x-2 group cursor-pointer"
            >
              <span className="text-xs font-mono tabular-nums font-medium mt-[5px] text-muted-foreground">
                {String(indexNumber).padStart(2, "0")}.
              </span>
              <div className="flex flex-col gap-y-1.5 flex-1 min-w-0">
                <p className="text-base sm:text-lg font-semibold tracking-tight leading-snug">
                  <span
                    className="group-hover:text-foreground transition-colors"
                    style={{ whiteSpace: "pre-line", wordBreak: "keep-all" }}
                  >
                    {post.title}
                  </span>
                  {isBookmarked && (
                    <span className="ml-2 text-xs text-amber-500" aria-label="북마크됨">
                      ★
                    </span>
                  )}
                  <ChevronRight
                    className="ml-1 inline-block size-4 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                    aria-hidden
                  />
                </p>
                {post.summary && (
                  <p
                    className="text-sm text-muted-foreground leading-relaxed"
                    style={{ whiteSpace: "pre-line", wordBreak: "keep-all" }}
                  >
                    {post.summary}
                  </p>
                )}
                <p className="text-xs text-muted-foreground tabular-nums">
                  {post.publishedAt}
                </p>
              </div>
            </button>
          </BlurFade>
        );
      })}
    </div>
  );
}
