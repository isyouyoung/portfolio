import { MapPin } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { BlurFade, BlurFadeText } from "@/shared/motion";
import { isRealLink } from "@/shared/lib";

import { DATA } from "../data/resume.js";

const BLUR_FADE_DELAY = 0.04;

/**
 * 메인 페이지 최상단 — 자기 소개.
 * Pretendard + 큰 타이포 + 우측 아바타의 한국형 포트폴리오 패턴.
 */
export function HeroSection() {
  const showLocationLink = isRealLink(DATA.locationLink);

  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="gap-6 flex flex-col md:flex-row justify-between items-start">
          <div className="gap-3 flex flex-col order-2 md:order-1 flex-1 min-w-0">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              yOffset={8}
              text="안녕하세요,"
            />
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 2}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              yOffset={8}
              text={`${DATA.name}입니다.`}
            />

            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <p
                className="text-muted-foreground text-base md:text-lg leading-relaxed mt-2 max-w-[520px]"
                style={{ whiteSpace: "pre-line", wordBreak: "keep-all" }}
              >
                {DATA.description}
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              {showLocationLink ? (
                <a
                  href={DATA.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
                >
                  <MapPin className="size-3" />
                  <span>{DATA.location}</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="size-3" />
                  <span>{DATA.location}</span>
                </span>
              )}
            </BlurFade>
          </div>

          <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
            <Avatar className="size-24 md:size-28 border-2 border-border rounded-2xl shadow-md ring-4 ring-muted/40">
              <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="rounded-2xl" />
              <AvatarFallback className="rounded-2xl text-lg font-semibold">
                {DATA.initials}
              </AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
