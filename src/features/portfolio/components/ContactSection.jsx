import { BlurFade } from "@/shared/motion";

import { DATA } from "../data/resume.js";

const BLUR_FADE_DELAY = 0.04;

export function ContactSection() {
  return (
    <BlurFade delay={BLUR_FADE_DELAY * 16}>
      <section id="contact" className="border rounded-2xl p-8 sm:p-10 relative bg-muted/20">
        <div className="absolute -top-3.5 border bg-primary z-10 rounded-xl px-3.5 py-1 left-1/2 -translate-x-1/2">
          <span className="text-primary-foreground text-xs font-semibold tracking-wider uppercase">
            Contact
          </span>
        </div>
        <div className="relative flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">연락하기</h2>
          <p
            className="mx-auto max-w-lg text-sm sm:text-base text-muted-foreground"
            style={{ whiteSpace: "pre-line", wordBreak: "keep-all" }}
          >
            {"학과 프로젝트·스터디·협업 제안이 있다면\n편하게 보내주세요. 시간 날 때 답장합니다."}
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            <a
              href={`mailto:${DATA.contact.email}`}
              className="text-xs px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            >
              {DATA.contact.email}
            </a>
            <a
              href={DATA.contact.social.KakaoOpenChat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              카카오 오픈채팅
            </a>
          </div>
        </div>
      </section>
    </BlurFade>
  );
}
