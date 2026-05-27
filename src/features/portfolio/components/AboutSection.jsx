import { BlurFade } from "@/shared/motion";

import { DATA } from "../data/resume.js";
import { SectionHeader } from "./SectionHeader.jsx";

const BLUR_FADE_DELAY = 0.04;

export function AboutSection() {
  return (
    <section id="about" className="flex flex-col gap-4">
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <SectionHeader kicker="About" title="소개" />
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <p
          className="text-pretty font-sans leading-[1.85] text-muted-foreground text-[15px]"
          style={{ whiteSpace: "pre-line", wordBreak: "keep-all" }}
        >
          {DATA.summary}
        </p>
      </BlurFade>
    </section>
  );
}
