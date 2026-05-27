import { useState } from "react";
import { ArrowUpRight, Bookmark, BookmarkCheck } from "lucide-react";
import Markdown from "react-markdown";

import { Badge } from "@/shared/ui";
import { cn, isRealLink } from "@/shared/lib";

import { useBookmark } from "@/features/bookmarks";

function ProjectImage({ src, alt }) {
  // ★ BUG #1: useState 초기값이 잘못되어 모든 이미지가 처음부터 회색 박스로 보임
  // 힌트: 처음에는 "에러 없음" 상태여야 함
  const [imageError, setImageError] = useState(false);
  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

function ProjectMedia({ title, image, video }) {
  if (video) {
    return (
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-48 object-cover"
      />
    );
  }
  return <ProjectImage src={image} alt={title} />;
}

/**
 * 프로젝트 카드.
 *
 * 카드 본문(미디어 + 텍스트)을 누르면 부모(ProjectsSection)가 모달을 연다.
 * 우측 상단 ArrowUpRight 아이콘만 외부 사이트로 새 창 이동.
 */
export function ProjectCard({ project, index, onOpen, className }) {
  const { title, href, description, dates, technologies, image, video, links } = project;
  const linkable = isRealLink(href);

  // ★ BUG #4: 북마크 키를 카드의 고유 값(title 또는 slug)이 아닌 배열 인덱스로 잡고 있다.
  //   → resume.js에서 카드 순서를 바꾸면 같은 index에 다른 project가 들어와
  //     북마크가 엉뚱한 카드에 따라간다.
  const { isBookmarked, toggle } = useBookmark(title);

  const media = <ProjectMedia title={title} image={image} video={video} />;
  const handleOpen = () => onOpen(project);

  return (
    <div
      className={cn(
        "group relative flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card",
        "hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5",
        "transition-all duration-200",
        className
      )}
    >
      {/* 미디어 영역 — 클릭 시 모달 */}
      <button
        type="button"
        onClick={handleOpen}
        className="relative block shrink-0 text-left cursor-pointer"
        aria-label={`${title} 상세 보기`}
      >
        {media}
      </button>

      {/* 북마크 버튼 (절대 위치, 미디어 위) */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle();
        }}
        className="absolute top-2 left-2 rounded-full bg-background/85 backdrop-blur p-1.5 border border-border hover:bg-background transition-colors"
        aria-label={isBookmarked ? "북마크 해제" : "북마크"}
      >
        {isBookmarked ? (
          <BookmarkCheck className="size-4 text-amber-500" />
        ) : (
          <Bookmark className="size-4 text-muted-foreground" />
        )}
      </button>

      {links && links.length > 0 && (
        <div className="absolute top-2 right-2 flex flex-wrap gap-2 z-10">
          {links
            .filter((link) => isRealLink(link.href))
            .map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black/85 text-white hover:bg-black"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </a>
            ))}
        </div>
      )}

      {/* 본문 영역 — 클릭 시 모달 */}
      <button
        type="button"
        onClick={handleOpen}
        className="p-5 flex flex-col gap-3 flex-1 text-left cursor-pointer"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="font-semibold text-foreground/95" style={{ wordBreak: "keep-all" }}>
              {title}
            </h3>
            <time className="text-xs text-muted-foreground tabular-nums">{dates}</time>
          </div>
          {linkable && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-foreground transition-colors rounded-sm shrink-0"
              aria-label={`${title} 외부 사이트 열기`}
            >
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>

        <div
          className="text-[13px] flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert"
          style={{ wordBreak: "keep-all" }}
        >
          <Markdown>{description}</Markdown>
        </div>

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-1">
            {technologies.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2 bg-background text-muted-foreground"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </button>
    </div>
  );
}
