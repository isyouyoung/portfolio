// 아이콘 라이브러리 — 새 아이콘이 필요하면 https://lucide.dev/icons 에서 검색해 이름을 추가
import {
  Home,
  NotebookText,
  Code2,
  Database,
  Server,
  BarChart3,
  Brain,
  Cpu,
  GitBranch,
  Palette,
} from "lucide-react";

import { Icons } from "@/shared/components/icons.jsx";

/**
 * 포트폴리오 데이터 — 한 파일에서 모두 관리.
 *
 * 한국폴리텍대학 서울강서캠퍼스 빅데이터소프트웨어학과 2학년 학생 모범 예시.
 * 본인 정보로 자유롭게 수정해서 사용하세요.
 *
 * 줄바꿈을 정확히 제어하고 싶은 텍스트는 "\n"을 직접 넣으면 됩니다.
 * (렌더링 측에서 whitespace-pre-line으로 그대로 살려둡니다.)
 */
export const DATA = {
  name: "유영상",
  initials: "YS",
  url: "https://example.com",
  location: "서울 강서구",
  locationLink: "https://www.google.com/maps/place/한국폴리텍대학+서울강서캠퍼스",
  description:
    "한국폴리텍대학 서울강서캠퍼스\n빅데이터소프트웨어학과 2학년.\n데이터로 문제를 풀고 React로 결과를 보여줍니다.",
  summary:
    "빅데이터소프트웨어학과에서 Python·SQL로 데이터를 다루고,\nReact로 사용자가 만질 수 있는 결과물로 만드는 학생입니다.\n\n학과 캡스톤과 사이드 프로젝트를 통해\n데이터 수집부터 시각화·배포까지\n한 사이클을 직접 돌려보고 있습니다.",
  avatarUrl: "/me.png",

  skills: [
    { name: "React", icon: Code2 },
    { name: "JavaScript", icon: Code2 },
    { name: "Redux Toolkit", icon: GitBranch },
    { name: "React Query", icon: GitBranch },
    { name: "Python", icon: Brain },
    { name: "SQL", icon: Database },
    { name: "Pandas", icon: BarChart3 },
    { name: "Node.js", icon: Server },
    { name: "Tailwind CSS", icon: Palette },
    { name: "Git/GitHub", icon: GitBranch },
    { name: "Linux", icon: Cpu },
  ],

  navbar: [
    { href: "/", icon: Home, label: "홈" },
    { href: "/blog", icon: NotebookText, label: "블로그" },
  ],

  contact: {
    email: "student@example.ac.kr",
    tel: "010-2222-6892",
    social: {
      GitHub: {
        name: "GitHubYS",
        url: "https://YSgithub.com/",
        icon: Icons.github,
        navbar: true,
      },
      Email: {
        name: "이메일",
        url: "mailto:student@example.ac.kr",
        icon: Icons.email,
        navbar: true,
      },
      KakaoOpenChat: {
        name: "오픈채팅",
        url: "https://open.kakao.com/",
        icon: Icons.kakao,
        navbar: true,
      },
    },
  },

  // 활동/경험 — logoUrl은 데모 이미지. 본인 활동 로고로 교체하세요.
  work: [
    {
      company: "학과 캡스톤 산학프로젝트",
      href: "#",
      location: "한국폴리텍대학 서울강서캠퍼스",
      title: "프론트엔드 담당",
      logoUrl: "/atomic.png",
      start: "2026.03",
      end: "진행 중",
      description:
        "지역 소상공인 매출 데이터 시각화 대시보드를 팀 4명으로 개발 중.\nPython으로 데이터 전처리 후 REST API로 제공받아\nReact + Redux로 화면을 구성합니다.",
    },
    {
      company: "교내 빅데이터 학습동아리",
      href: "#",
      location: "서울강서캠퍼스",
      title: "스터디 운영진",
      logoUrl: "/shopify.svg",
      start: "2025.09",
      end: "진행 중",
      description:
        "Pandas·SQL 기초 스터디를 매주 운영.\n이번 학기에는 React로 데이터 시각화 결과물을\n웹에 올리는 미니 프로젝트를 함께 진행합니다.",
    },
    {
      company: "교내 근로 (학습지원실 조교)",
      href: "#",
      location: "서울강서캠퍼스",
      title: "프로그래밍 튜터",
      logoUrl: "/nvidia.png",
      start: "2025.03",
      end: "2025.08",
      description:
        "1학년 학생들의 Python·자료구조 과제를 도와주는 튜터로 활동.\n매주 10명 내외의 학생들에게 개념을 다시 설명하면서\n본인의 기초도 단단해졌습니다.",
    },
  ],

  education: [
    {
      school: "한국폴리텍대학 서울강서캠퍼스",
      href: "https://www.kopo.ac.kr/",
      degree: "빅데이터소프트웨어학과\n2학년 재학 중",
      logoUrl: "/buildspace.jpg",
      start: "2025",
      end: "재학",
    },
    {
      school: "ㅇㅇ고등학교",
      href: "#",
      degree: "졸업",
      logoUrl: "/ib.png",
      start: "2022",
      end: "2025",
    },
  ],

  // slug는 public/projects/{slug}.md 파일과 매칭. 모달 클릭 시 본문 fetch.
  projects: [
    // ─────────────────────────────────────────────────────────────
    // ★ 디버깅용 임시 항목 — 2교시 BUG #1을 시각적으로 확인하기 위한 더미.
    //   video 필드가 없어 ProjectImage 함수를 거치므로 회색 박스가 나타납니다.
    //   BUG #1을 고치고 본인 프로젝트로 교체하기 전까지는 제거하지 마세요.
    // ─────────────────────────────────────────────────────────────

    {
      slug: "dashboard",
      title: "강서구 골목상권 대시보드",
      href: "#",
      dates: "2026.03 - 진행 중",
      active: true,
      description:
        "공공데이터포털 상권분석 데이터를 가공해서\n동·업종별 매출 추이를 보여주는 대시보드.\n\n학과 캡스톤 프로젝트로 진행 중이며,\n**React + Redux Toolkit**으로 필터 상태를 관리하고\n**React Query**로 API 데이터를 캐싱합니다.",
      technologies: ["React", "Redux Toolkit", "React Query", "Python", "FastAPI", "Tailwind CSS"],
      links: [{ type: "GitHub", href: "https://github.com/", icon: null }],
      image: "/projects/dashboard.svg",
      video: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      slug: "todo",
      title: "할 일 관리 앱 (Todo with Filters)",
      href: "#",
      dates: "2026.04",
      active: true,
      description:
        "수업에서 배운 `useReducer`와 `Context API`로 만든 투두 앱을\nRedux Toolkit으로 마이그레이션하면서\n상태관리 라이브러리 차이를 정리한 학습용 프로젝트.",
      technologies: ["React", "Redux Toolkit", "localStorage", "Vite"],
      links: [{ type: "GitHub", href: "https://github.com/", icon: null }],
      image: "/projects/todo.svg",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      slug: "airquality",
      title: "전국 미세먼지 시각화",
      href: "#",
      dates: "2025.11",
      active: true,
      description:
        "에어코리아 공개 API를 호출해\n시도별 미세먼지 농도를 카드와 차트로 보여주는\n1인 사이드 프로젝트.\n\n**fetch + React Query**로 5분 캐싱 적용.",
      technologies: ["React", "React Query", "Chart.js", "Tailwind CSS"],
      links: [{ type: "GitHub", href: "https://github.com/", icon: null }],
      image: "/projects/airquality.svg",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      slug: "attendance",
      title: "학과 스터디 출석 체크 봇",
      href: "#",
      dates: "2025.09",
      active: true,
      description:
        "학과 스터디원 출석을 구글 시트와 카카오톡 봇으로 자동화.\nPython 백엔드 + 간단한 React 관리 페이지로 직접 운영 중.",
      technologies: ["Python", "Google Sheets API", "React", "Node.js"],
      links: [],
      image: "/projects/attendance.svg",
      video: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
    {
      slug: "debug-temp",
      title: "임시 — 디버깅용",
      href: "#",
      dates: "2026.05",
      active: true,
      description: "BUG #1을 시각적으로 확인하기 위한 임시 항목.",
      technologies: ["React"],
      links: [],
      image: "/projects/dashboard.svg", // 샘플 이미지로 임시 지정 (BUG #1 fix 후엔 정상 표시)
      // video 필드는 일부러 두지 않음 → ProjectImage 함수를 거치게 됨
    },
  ],

  // 학과 활동/공모전 — image는 본인 활동 사진으로 교체하세요.
  hackathons: [
    {
      title: "폴리텍 빅데이터 경진대회",
      dates: "2025.10",
      location: "한국폴리텍대학",
      description:
        "전국 폴리텍 학생 대상 빅데이터 경진대회 본선 진출.\n공공 교통데이터로 정류장별 혼잡도를 예측하는 모델을 발표했습니다.",
      image: "/hackathons/bigdata-contest.svg",
      links: [],
    },
    {
      title: "서울강서캠퍼스 학과 해커톤",
      dates: "2025.06",
      location: "서울강서캠퍼스",
      description:
        "24시간 동안 팀 3명으로 캠퍼스 길찾기 미니 앱을 개발.\nReact Router로 화면 전환, localStorage로 즐겨찾기 저장을 구현했습니다.",
      image: "/hackathons/campus-hackathon.svg",
      links: [],
    },
    {
      title: "교내 알고리즘 스터디 발표",
      dates: "2025.04",
      location: "서울강서캠퍼스",
      description:
        "백준 단계별 풀이 100문제 회고 발표.\n학생들이 자주 막히는 자료구조 5가지를 시각화 자료와 함께 정리했습니다.",
      image: "/hackathons/algorithm-study.svg",
      links: [],
    },
  ],
};
