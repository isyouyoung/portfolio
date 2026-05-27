import { ArrowUpRight } from "lucide-react";

import { BlurFade } from "@/shared/motion";
import { isRealLink } from "@/shared/lib";

import { DATA } from "../data/resume.js";
import { SectionHeader } from "./SectionHeader.jsx";

const BLUR_FADE_DELAY = 0.04;

function LogoFallback({ school }) {
  return (
    <div className="size-10 md:size-12 rounded-xl bg-muted border border-border flex items-center justify-center text-sm font-bold text-foreground flex-none">
      {school.slice(0, 2)}
    </div>
  );
}

function EducationItem({ education }) {
  const linkable = isRealLink(education.href);

  const inner = (
    <div className="flex items-center gap-x-4 justify-between group">
      <div className="flex items-center gap-x-4 flex-1 min-w-0">
        {education.logoUrl ? (
          <img
            src={education.logoUrl}
            alt={education.school}
            className="size-10 md:size-12 p-1 border rounded-xl bg-card object-contain flex-none"
          />
        ) : (
          <LogoFallback school={education.school} />
        )}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <div className="font-semibold leading-tight flex items-center gap-2">
            <span style={{ wordBreak: "keep-all" }}>{education.school}</span>
            {linkable && (
              <ArrowUpRight
                className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                aria-hidden
              />
            )}
          </div>
          <div
            className="font-sans text-sm text-muted-foreground"
            style={{ whiteSpace: "pre-line", wordBreak: "keep-all" }}
          >
            {education.degree}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
        <span>
          {education.start} - {education.end}
        </span>
      </div>
    </div>
  );

  if (linkable) {
    return (
      <a
        href={education.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {inner}
      </a>
    );
  }
  return <div className="block">{inner}</div>;
}

export function EducationSection() {
  return (
    <section id="education" className="flex flex-col gap-6">
      <BlurFade delay={BLUR_FADE_DELAY * 7}>
        <SectionHeader kicker="Education" title="학력" />
      </BlurFade>
      <div className="flex flex-col gap-6">
        {/* DATA.education 배열 → map → BlurFade로 감싼 EducationItem 반복 렌더링.
            key는 학교명(고유) — index 대신 사용해 정렬/추가 시에도 state가 따라간다. */}
        {DATA.education.map((education, index) => (
          <BlurFade
            key={education.school}
            delay={BLUR_FADE_DELAY * 8 + index * 0.05}
          >
            <EducationItem education={education} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
