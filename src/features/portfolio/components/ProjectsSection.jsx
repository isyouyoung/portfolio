import { useState } from "react";
import { useDispatch } from "react-redux";
import { BlurFade } from "@/shared/motion";
import { pushRecent } from "@/features/recentProjects/index.js";
import { DATA } from "../data/resume.js";
import { ProjectCard } from "./ProjectCard.jsx";
import { ProjectModal } from "./ProjectModal.jsx";
import { SectionHeader } from "./SectionHeader.jsx";

const BLUR_FADE_DELAY = 0.04;

export function ProjectsSection() {
  // 현재 모달에 표시할 프로젝트 객체. null이면 닫힘.
  const [activeProject, setActiveProject] = useState(null);
  const dispatch = useDispatch();

  const handleOpen = (project) => {
    setActiveProject(project);
    dispatch(pushRecent(project));
  };
  return (
    <section id="projects" className="flex flex-col gap-8">
      <BlurFade delay={BLUR_FADE_DELAY * 11}>
        <SectionHeader
          kicker="Projects"
          title="프로젝트"
          description={"학과 수업·캡스톤·사이드 프로젝트로 진행한 것들.\n카드를 클릭하면 상세 글이 모달로 열립니다."}
        />
      </BlurFade>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 auto-rows-fr">
        {DATA.projects.map((project, id) => (
          // ★ BUG #4 (1/2): key 속성에 배열 인덱스(id)를 사용함.
          // ★ BUG #4 (2/2): ProjectCard에 index prop을 그대로 흘려보낸다 — 카드 내부에서
          //   이 index로 북마크 키를 잡고 있어 정렬 시 북마크가 다른 카드로 따라간다.
          //   힌트: BlurFade key는 project.slug || project.title, ProjectCard는 index prop 없이.
          <BlurFade
            key={project.slug || project.title}
            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
            className="h-full"
          >
            <ProjectCard project={project}
            // index={id}
            onOpen={handleOpen} />
          </BlurFade>
        ))}
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
