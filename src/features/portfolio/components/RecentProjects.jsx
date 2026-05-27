import { useSelector, useDispatch } from "react-redux";
import { Clock, X } from "lucide-react";

import { DATA } from "../data/resume.js";
import {
  selectRecentProjects,
  clearRecent,
} from "@/features/recentProjects";

export function RecentProjects({ onOpen }) {
  const items = useSelector(selectRecentProjects);
  const dispatch = useDispatch();

  if (!items || items.length === 0) return null;
    return (
    <div className="rounded-xl border border-border bg-card/40 px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs">
          <Clock className="size-3.5" /> 최근 본 프로젝트
        </div>
        <button
          type="button"
          onClick={() => dispatch(clearRecent())}
        >
          <X className="size-3" /> 초기화
        </button>
      </div> 
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const full = DATA.projects.find(
            (p) => (p.slug || p.title) === item.slug
          );
          return (
            <button
              key={item.slug}
              onClick={() => full && onOpen(full)}
              className="rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:border-foreground/30 hover:bg-card"
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}