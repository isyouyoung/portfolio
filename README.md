# KOPO 빅데이터소프트웨어학과 포트폴리오 템플릿

한국폴리텍대학 서울강서캠퍼스 **빅데이터소프트웨어학과** 학생들이
수업에서 배운 내용만으로 자기 포트폴리오로 확장할 수 있도록 만든 학습용 템플릿입니다.

## 스택 (수업에서 학습한 것)

- **Vite + React 19** (Next.js 미사용)
- **JavaScript** (TypeScript 미사용)
- **React Router v7** — 페이지 라우팅 + URL 쿼리 기반 모달
- **Redux Toolkit + React Redux** — 전역 상태 (테마 · 북마크)
- **TanStack React Query** — 서버 상태 (블로그 마크다운 fetch + 캐싱)
- **react-markdown + remark-gfm** — 블로그 본문 렌더링
- **Tailwind CSS v4** — Pretendard 한글 폰트, OKLCH 색공간
- **Radix UI + Motion** — Dialog/Tooltip/Accordion + 페이드 애니메이션

## 시작하기

```bash
npm install      # 의존성 설치
npm run dev      # http://localhost:3000
npm run build    # dist/ 로 정적 빌드
npm run preview  # 빌드 결과 미리보기
```

Node.js 18 이상 필요.

## 프로젝트 구조 (Feature-Sliced Design lite)

실무에서 자주 쓰는 4계층 구조를 단순화한 형태입니다.

```
src/
├── main.jsx                  # 진입점 — AppProviders + App
├── app/                      # 앱 설정 계층
│   ├── App.jsx               # 라우터 정의
│   ├── store.js              # Redux store (feature reducer 모음)
│   ├── queryClient.js        # React Query 클라이언트
│   └── providers/
│       └── AppProviders.jsx  # Redux + Query + Router + Theme 4개 Provider
│
├── pages/                    # URL = 1 파일
│   ├── HomePage.jsx          # 포트폴리오 섹션 조립
│   ├── BlogPage.jsx          # 블로그 목록 + 모달
│   └── NotFoundPage.jsx
│
├── features/                 # 도메인 기능 — 각자 자기 모듈로 캡슐화
│   ├── theme/                # 라이트/다크 모드
│   │   ├── model/themeSlice.js
│   │   ├── components/ThemeSync.jsx · ModeToggle.jsx
│   │   └── index.js          # 공개 API barrel
│   ├── bookmarks/            # 북마크 (글/프로젝트 공통)
│   │   ├── model/bookmarksSlice.js
│   │   ├── hooks/useBookmark.js
│   │   └── index.js
│   ├── blog/                 # 블로그 (목록·모달·마크다운)
│   │   ├── api/fetchBlogPost.js
│   │   ├── data/blogIndex.js
│   │   ├── hooks/useBlogPosts.js · useBlogPost.js
│   │   ├── components/BlogList · BlogPagination · BlogPostModal · BlogPostBody
│   │   └── index.js
│   └── portfolio/            # 포트폴리오 데이터·섹션
│       ├── data/resume.js    # ⭐ 본인 정보 수정 단일 파일
│       ├── components/Hero · About · Work · Education · Skills · Projects · Hackathons · Contact · ProjectCard · SectionHeader
│       └── index.js
│
├── shared/                   # 도메인 무관 공통
│   ├── ui/                   # Button · Card · Dialog · Tooltip · ...
│   ├── lib/                  # cn · formatDate · isRealLink · pagination
│   ├── motion/               # BlurFade · BlurFadeText · Dock
│   └── components/           # Navbar · PageContainer · Timeline · icons
│
└── styles/
    └── globals.css           # Tailwind v4 + Pretendard + 테마 변수
```

**계층 규칙**:
- `pages` → `features` → `shared` 방향으로만 import
- 같은 계층끼리는 직접 참조하지 않고 `index.js` barrel을 통해서만
- `shared`는 어느 누구도 모름. `app`도 마찬가지로 가장 바깥

## 본인 포트폴리오로 만드는 법

### 1) 개인 정보 수정
`src/features/portfolio/data/resume.js` 한 파일만 바꾸면 홈 전체가 바뀝니다.

```javascript
export const DATA = {
  name: "내 이름",
  description: "한 줄 자기 소개",  // \n 으로 줄바꿈
  ...
};
```

### 2) 블로그 글 추가
1. `public/blog/my-post.md` 파일 작성
2. `src/features/blog/data/blogIndex.js`의 `blogIndex` 배열에 한 줄 추가

```javascript
{
  slug: "my-post",
  title: "내가 쓴 글",     // \n 으로 줄바꿈 가능
  publishedAt: "2026-05-25",
  summary: "한 줄 요약",
}
```

### 3) 프로젝트 카드 추가
`src/features/portfolio/data/resume.js`의 `projects` 배열에 추가.
북마크 아이콘은 Redux로 상태가 저장되며 새로고침해도 유지됩니다 (localStorage).

## 블로그 모달

블로그 상세 페이지는 별도 라우트가 아니라 **모달**로 동작합니다.

| URL | 동작 |
| --- | --- |
| `/blog` | 목록 1페이지 |
| `/blog?page=2` | 목록 2페이지 |
| `/blog?post=react-state-vs-redux` | 목록 위에 상세 모달 열림 |

URL이 곧 상태이므로 모달이 열린 상태 그대로 **공유**할 수 있습니다.

## 학습 포인트

| 수업 회차 | 실제 적용 위치 |
| --- | --- |
| 컴포넌트 · Props | `features/portfolio/components/**` |
| State / useState | `ProjectCard.jsx`의 이미지 에러 처리 |
| useEffect | `features/theme/components/ThemeSync.jsx` |
| Custom Hook | `features/bookmarks/hooks/useBookmark.js`, `features/blog/hooks/*` |
| Context API | `app/providers/AppProviders.jsx` (Provider 4종 조합) |
| React Router | `app/App.jsx` + `pages/BlogPage.jsx`의 `useSearchParams` |
| ajax / fetch | `features/blog/api/fetchBlogPost.js` |
| Redux Toolkit | `features/theme`, `features/bookmarks` 의 slice |
| React Query | `features/blog/hooks/*` |
| localStorage | `themeSlice` · `bookmarksSlice` 에서 영속화 |
| 모달 (Dialog) | `features/blog/components/BlogPostModal.jsx` + Radix |

## 한글 줄바꿈 정책

- 전역: `word-break: keep-all` 로 한국어 단어 단위 끊김 방지
- 데이터에 `\n` 을 넣으면 그 위치에서 줄바꿈 (렌더 측 `whitespace-pre-line`)
- 자동 줄바꿈에 맡기지 않고 데이터로 줄바꿈을 통제할 수 있음

## 라이선스

MIT
