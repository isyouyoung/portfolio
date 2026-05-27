import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui";
import { BlurFade } from "@/shared/motion";
import { cn } from "@/shared/lib";

import { DATA } from "../data/resume.js";
import { SectionHeader } from "./SectionHeader.jsx";

const BLUR_FADE_DELAY = 0.04;

function LogoImage({ src, alt }) {
  const [error, setError] = useState(false);
  if (!src || error) {
    return (
      <div className="size-10 md:size-12 p-1 border rounded-xl bg-muted flex-none" />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="size-10 md:size-12 p-1 border rounded-xl bg-card object-contain flex-none"
      onError={() => setError(true)}
    />
  );
}

function WorkItem({ work }) {
  return (
    <AccordionItem
      value={work.company}
      className="w-full border-b-0 grid gap-2"
    >
      <AccordionTrigger className="hover:no-underline p-0 cursor-pointer rounded-none group">
        <div className="flex items-center gap-x-4 justify-between w-full text-left">
          <div className="flex items-center gap-x-4 flex-1 min-w-0">
            <LogoImage src={work.logoUrl} alt={work.company} />
            <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
              <div className="font-semibold leading-tight flex items-center gap-2">
                <span style={{ wordBreak: "keep-all" }}>{work.company}</span>
                <span className="relative inline-flex items-center w-3.5 h-3.5 shrink-0">
                  <ChevronRight
                    className={cn(
                      "absolute h-3.5 w-3.5 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                      "translate-x-0 opacity-0",
                      "group-hover:translate-x-1 group-hover:opacity-100",
                      "group-data-[state=open]:opacity-0"
                    )}
                  />
                  <ChevronDown
                    className={cn(
                      "absolute h-3.5 w-3.5 text-muted-foreground stroke-2 transition-all duration-200",
                      "opacity-0",
                      "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                    )}
                  />
                </span>
              </div>
              <div className="font-sans text-sm text-muted-foreground">
                {work.title}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
            <span>
              {work.start} - {work.end ?? "진행 중"}
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-0 ml-14 text-sm text-muted-foreground">
        <p style={{ whiteSpace: "pre-line", wordBreak: "keep-all" }}>
          {work.description}
        </p>
      </AccordionContent>
    </AccordionItem>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="flex flex-col gap-6">
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <SectionHeader
          kicker="Experience"
          title="활동 · 경험"
          description={"학과 캡스톤·교내 활동·교내 근로 등\n직접 참여한 일들"}
        />
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 6}>
        <Accordion type="single" collapsible className="w-full grid gap-6">
          {DATA.work.map((work) => (
            <WorkItem key={work.company} work={work} />
          ))}
        </Accordion>
      </BlurFade>
    </section>
  );
}
