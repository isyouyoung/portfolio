# 임시 — 디버깅용 카드

> ⚠️ 이 카드는 **BUG #1을 보기 위한 임시 항목**입니다.
> 2교시 디버깅이 끝나면 `resume.js`에서 이 항목을 지워도 됩니다.

## 왜 이 카드가 있나요?

원래 포트폴리오에는 본인이 만든 프로젝트만 들어갑니다.
그런데 본인 카드만 추가하면 **BUG #1이 잘 안 보일 수 있습니다.**

| 조건 | 어떻게 보이나 |
| --- | --- |
| `video` 필드 있음 (예: dashboard 카드) | 영상이 떠서 BUG #1 무관 |
| `image` 있고 `video` 없음 → `ProjectImage` 함수 거침 | **여기서 BUG #1 발생** |

`ProjectImage` 컴포넌트는 `useState`의 초기값이 잘못되어 있어서,
이미지가 멀쩡해도 무조건 회색 박스만 보입니다.

## BUG #1 시연 순서

1. **지금** — 첫 카드(`debug-temp`)가 회색 박스로 보임
2. 카드를 눌러보면 — 이 마크다운(지금 보고 있는 화면)이 모달로 뜸
3. `ProjectCard.jsx` → `ProjectImage` 함수에서 `useState(true)` → `useState(false)` 로 수정
4. 새로고침 — 회색 박스가 사라지고 `dashboard.svg` 가 보임

## BUG #1을 고친 뒤에 할 일

- `resume.js` 의 `projects` 배열에서 이 항목(`debug-temp`)을 지운다.
- 본인이 만든 프로젝트들로 채운다 (4개 권장).
- 본인 프로젝트마다 `public/projects/{slug}.md` 도 함께 만든다.

## 참고 — 5개 버그 위치 요약

| # | 위치 | 증상 |
| --- | --- | --- |
| 1 | `ProjectCard.jsx` → `ProjectImage` | 이미지 자리가 회색 박스 |
| 2 | `ThemeSync.jsx` | 다크모드 토글이 동작 안 함 |
| 3 | `bookmarksSlice.js` `load()` | 새 브라우저에서 흰 화면 + 콘솔 에러 |
| 4 | `ProjectsSection.jsx` / `ProjectCard.jsx` | 리스트 순서 바뀌면 북마크가 엉뚱한 카드에 |
| 5 | `App.jsx` `<Route path="/Blog">` | Navbar 블로그 클릭 시 404 |

각 버그는 슬라이드 순서대로 차근차근 잡습니다.
