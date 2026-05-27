# 강서구 골목상권 대시보드

> 학과 캡스톤 산학프로젝트 · 2026.03 ~ 진행 중
> **역할**: 프론트엔드 (팀 4명)

## 한 줄 요약

공공데이터포털 상권분석 데이터를 받아 동·업종별 매출 추이를 보여주는 대시보드.
정책 담당자가 어느 동의 어떤 업종이 성장/쇠퇴하는지 한눈에 보도록 만드는 게 목표.

## 사용한 기술

| 영역 | 도구 |
| --- | --- |
| 프론트 | React 19, Vite, Tailwind CSS |
| 상태 관리 | Redux Toolkit (필터·UI 상태) |
| 서버 데이터 | TanStack React Query |
| 백엔드 | Python · FastAPI (팀원 담당) |

## 구현 포인트

### 1. 필터는 Redux, 서버 데이터는 React Query

여러 화면에서 동시에 접근하는 **필터(지역·업종·기간)** 는 Redux로 관리.
서버에서 받는 매출 데이터는 React Query에 맡겨서 5분 캐싱.

```javascript
// store/slices/filtersSlice.js
const filtersSlice = createSlice({
  name: "filters",
  initialState: { region: "all", category: "all", period: "1y" },
  reducers: {
    setRegion: (s, a) => { s.region = a.payload; },
    setCategory: (s, a) => { s.category = a.payload; },
    setPeriod: (s, a) => { s.period = a.payload; },
  },
});
```

```javascript
// hooks/useSalesData.js
export function useSalesData() {
  const filters = useSelector(selectFilters);
  return useQuery({
    queryKey: ["sales", filters],
    queryFn: () => api.fetchSales(filters),
    staleTime: 5 * 60 * 1000,
  });
}
```

### 2. 차트는 가벼운 것부터 시작

처음엔 Recharts를 썼다가, 카드 위주 화면이라 Chart.js로 옮겨서 번들 크기 절약.

## 회고

- **잘된 것**: 1주차에 디자인 시안을 픽스한 게 컸음
- **아쉬운 것**: 백엔드 API 스키마가 두 번 바뀌면서 프론트도 따라 수정
- **다음**: 모바일 반응형, Cloudflare Pages 배포
