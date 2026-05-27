import { useState } from "react";

import { BlurFade } from "@/shared/motion";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/shared/components/Timeline.jsx";

import { DATA } from "../data/resume.js";
import { SectionHeader } from "./SectionHeader.jsx";

const BLUR_FADE_DELAY = 0.04;

function HackathonImage({ src, alt }) {
  const [error, setError] = useState(false);
  if (!src || error) {
    return (
      <div className="size-10 bg-card border rounded-full shadow ring-2 ring-border flex-none" />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="size-10 bg-card overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-cover flex-none"
      onError={() => setError(true)}
    />
  );
}

export function HackathonsSection() {
  return (
    <section id="hackathons" className="flex flex-col gap-8 overflow-hidden">
      <BlurFade delay={BLUR_FADE_DELAY * 13}>
        <SectionHeader
          kicker="Activities"
          title="학과 활동"
          description={"교내 해커톤·공모전·스터디 발표 등\n빅데이터소프트웨어학과 학생으로 직접 참여한 활동들."}
        />
      </BlurFade>
      <Timeline>
        {DATA.hackathons.map((hackathon) => (
          <TimelineItem
            key={hackathon.title + hackathon.dates}
            className="w-full flex items-start justify-between gap-6"
          >
            <TimelineConnectItem className="flex items-start justify-center">
              <HackathonImage src={hackathon.image} alt={hackathon.title} />
            </TimelineConnectItem>
            <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
              {hackathon.dates && (
                <time className="text-xs text-muted-foreground tabular-nums">
                  {hackathon.dates}
                </time>
              )}
              {hackathon.title && (
                <h3 className="font-semibold leading-tight" style={{ wordBreak: "keep-all" }}>
                  {hackathon.title}
                </h3>
              )}
              {hackathon.location && (
                <p className="text-sm text-muted-foreground">{hackathon.location}</p>
              )}
              {hackathon.description && (
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  style={{ whiteSpace: "pre-line", wordBreak: "keep-all" }}
                >
                  {hackathon.description}
                </p>
              )}
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </section>
  );
}
