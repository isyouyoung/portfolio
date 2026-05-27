import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * 마크다운 본문 렌더링.
 * - remark-gfm: 표/체크리스트/취소선 등 GFM 문법
 * - prose 클래스로 한글 타이포 적용 (globals.css의 .prose 룰)
 */
export function BlogPostBody({ markdown }) {
  return (
    <article
      className="prose max-w-full text-pretty font-sans leading-relaxed text-foreground dark:prose-invert"
      style={{ wordBreak: "keep-all" }}
    >
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </article>
  );
}
