import { cn } from "@/shared/lib";

/**
 * 세로 타임라인 컨테이너.
 * <Timeline>
 *   <TimelineItem>...</TimelineItem>
 * </Timeline>
 */
export function Timeline({ children, className }) {
  return (
    <div className={cn("relative flex flex-col gap-4 p-4 w-full [--timeline-gap:2rem]", className)}>
      <div className="relative [&>*:last-child_[data-timeline-line]]:hidden space-y-8 w-full">
        {children}
      </div>
    </div>
  );
}

export function TimelineItem({ children, className }) {
  return <div className={cn("relative", className)}>{children}</div>;
}

export function TimelineConnectItem({ children, className }) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 justify-center items-center self-stretch",
        className
      )}
    >
      <div
        data-timeline-line
        className="absolute bg-border left-1/2 -translate-x-1/2 top-0 h-[calc(50%+var(--timeline-gap)+50%)] w-px"
      />
      <div className="relative z-20 shrink-0">{children}</div>
    </div>
  );
}
