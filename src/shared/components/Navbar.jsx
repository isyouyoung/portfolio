import { Home, NotebookText } from "lucide-react";
import { Link } from "react-router-dom";

import { Dock, DockIcon } from "@/shared/motion";
import {
  Separator,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui";
import { isRealLink } from "@/shared/lib";

import { ModeToggle } from "@/features/theme";
import { DATA } from "@/features/portfolio/data/resume.js";

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "홈" },
  { href: "/blog", icon: NotebookText, label: "블로그" },
];

function NavIconLink({ item }) {
  const Icon = item.icon;
  const isExternal = isRealLink(item.href) && item.href.startsWith("http");

  const dock = (
    <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors">
      <Icon className="size-full rounded-sm" />
    </DockIcon>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {isExternal ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            {dock}
          </a>
        ) : (
          <Link to={item.href}>{dock}</Link>
        )}
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm"
      >
        <p>{item.label}</p>
        <TooltipArrow className="fill-primary" />
      </TooltipContent>
    </Tooltip>
  );
}

function SocialIconLink({ name, social }) {
  const Icon = social.icon;
  if (!isRealLink(social.url)) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a href={social.url} target="_blank" rel="noopener noreferrer">
          <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors">
            <Icon className="size-full rounded-sm" />
          </DockIcon>
        </a>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm"
      >
        <p>{social.name || name}</p>
        <TooltipArrow className="fill-primary" />
      </TooltipContent>
    </Tooltip>
  );
}

export function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      <Dock className="z-50 pointer-events-auto relative h-14 p-2 w-fit mx-auto flex gap-2 border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5">
        {NAV_ITEMS.map((item) => (
          <NavIconLink key={item.href} item={item} />
        ))}

        <Separator orientation="vertical" className="h-2/3 m-auto w-px bg-border" />

        {/* DATA.contact.social 중 navbar:true 인 항목만 Dock에 표시.
            resume.js에서 navbar 플래그만 바꿔도 자동으로 추가/제거된다 — 데이터가 UI를 제어. */}
        {Object.entries(DATA.contact.social)
          .filter(([, social]) => social.navbar)
          .map(([name, social]) => (
            <SocialIconLink key={name} name={name} social={social} />
          ))}

        <Separator orientation="vertical" className="h-2/3 m-auto w-px bg-border" />

        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors">
              <ModeToggle className="size-full cursor-pointer" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm"
          >
            <p>테마</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}
