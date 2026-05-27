import { BlurFade } from "@/shared/motion";

import { DATA } from "../data/resume.js";
import { SectionHeader } from "./SectionHeader.jsx";

const BLUR_FADE_DELAY = 0.04;

export function SkillsSection() {
  return (
    <section id="skills" className="flex flex-col gap-4">
      <BlurFade delay={BLUR_FADE_DELAY * 9}>
        <SectionHeader kicker="Skills" title="기술 스택" />
      </BlurFade>
      <div className="flex flex-wrap gap-2">
        {DATA.skills.map((skill, id) => {
          // resume.js에 담은 lucide 컴포넌트(icon)를 변수에 받아서
          // 첫 글자가 대문자인 변수 이름으로 JSX 태그처럼 렌더링한다.
          // JSX 규칙: 소문자 시작 → HTML 태그, 대문자 시작 → React 컴포넌트.
          const Icon = skill.icon;
          return (
            <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
              <div className="border bg-card border-border rounded-lg h-9 w-fit px-3.5 flex items-center gap-2 hover:border-foreground/30 transition-colors">
                {Icon && <Icon className="size-3.5 text-muted-foreground" />}
                <span className="text-foreground text-[13px] font-medium">
                  {skill.name}
                </span>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
