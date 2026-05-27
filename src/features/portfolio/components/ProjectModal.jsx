import { Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Badge,
} from "@/shared/ui";
import { isRealLink } from "@/shared/lib";

import { useBookmark } from "@/features/bookmarks";
import { BlogPostBody } from "@/features/blog";

import { useProjectDoc } from "../hooks/useProjectDoc.js";

/**
 * 프로젝트 카드 클릭 시 열리는 마크다운 모달.
 * 블로그와 동일한 prose 스타일로 본문을 렌더링한다.
 *
 * @param {object|null} project - 열릴 프로젝트 객체. null이면 닫힘.
 * @param {() => void} onClose
 */
export function ProjectModal({ project, onClose }) {
  const open = Boolean(project);
  const slug = project?.slug || null;
  const { data: markdown, isLoading, isError, error } = useProjectDoc(slug);
  const { isBookmarked, toggle } = useBookmark(project?.title || "__none__");

  const linkable = project && isRealLink(project.href);

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent>
        {isLoading && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            <DialogTitle className="sr-only">프로젝트 상세 불러오는 중</DialogTitle>
            <DialogDescription className="sr-only">
              프로젝트 본문을 불러오고 있습니다.
            </DialogDescription>
            불러오는 중...
          </div>
        )}

        {isError && (
          <div className="py-12 text-center">
            <DialogTitle className="text-lg">상세를 불러오지 못했습니다</DialogTitle>
            <DialogDescription className="mt-2">
              {error?.message || "잠시 후 다시 시도해주세요."}
            </DialogDescription>
          </div>
        )}

        {project && markdown && (
          <>
            <DialogDescription className="sr-only">
              {project.description?.replace(/[*_`#\n]/g, " ").slice(0, 120) || `${project.title} 상세 보기`}
            </DialogDescription>
            <header className="flex flex-col gap-3 pr-8">
              <DialogTitle
                className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
                style={{ wordBreak: "keep-all" }}
              >
                {project.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground tabular-nums">
                <span>{project.dates}</span>
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
                {linkable && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 border border-border rounded-md px-2 py-1 hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="size-3" />
                    <span>사이트</span>
                  </a>
                )}
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-[11px] font-medium border border-border h-6 w-fit px-2 bg-background text-muted-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            <div className="h-px bg-border" />

            <BlogPostBody markdown={markdown} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
