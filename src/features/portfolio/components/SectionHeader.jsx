/**
 * 한국 포트폴리오 스타일 섹션 헤더.
 * - kicker: 영문 라벨 (브랜드색)
 * - title: 큰 한글 제목
 * - description: 보조 설명 (선택)
 *
 * 모든 텍스트에 whitespace-pre-line 적용 → 데이터에 \n을 넣으면 그대로 줄바꿈.
 */
export function SectionHeader({ kicker, title, description }) {
  return (
    <div className="flex flex-col gap-1.5">
      {kicker && (
        <span className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
          {kicker}
        </span>
      )}
      <h2
        className="text-2xl font-bold tracking-tight text-foreground"
        style={{ whiteSpace: "pre-line", wordBreak: "keep-all" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="text-sm text-muted-foreground leading-relaxed mt-1"
          style={{ whiteSpace: "pre-line", wordBreak: "keep-all" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
