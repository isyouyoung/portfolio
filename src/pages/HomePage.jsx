import {
  HeroSection,
  AboutSection,
  WorkSection,
  EducationSection,
  SkillsSection,
  ProjectsSection,
  HackathonsSection,
  ContactSection,
} from "@/features/portfolio";

/**
 * 홈 = 포트폴리오 섹션 순서 조립.
 * 각 섹션은 자기 데이터·애니메이션·타이틀을 스스로 책임진다.
 */
export function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col gap-20">
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <HackathonsSection />
      <ContactSection />
    </main>
  );
}
