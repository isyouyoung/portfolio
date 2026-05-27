import { cn } from "@/shared/lib";

/**
 * 모든 페이지가 공통으로 쓰는 가운데 정렬 컨테이너.
 * 좁은 max-width로 한국 포트폴리오 특유의 단정한 레이아웃 유지.
 */
export function PageContainer({ children, className }) {
  return (
    <div
      className={cn(
        "relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-20 px-6",
        className
      )}
    >
      {children}
    </div>
  );
}
