# 전국 미세먼지 시각화

> 1인 사이드 프로젝트 · 2025.11
> **목표**: 공공 API + React Query로 만드는 가장 작은 대시보드

## 무엇

에어코리아 공개 API를 받아 **시도별 미세먼지(PM2.5/PM10) 농도**를
카드와 라인 차트로 보여주는 단일 페이지.

## 데이터 소스

- 에어코리아 시도별 평균정보 조회 API (공공데이터포털)
- 1시간 단위 갱신

## React Query 사용 패턴

처음엔 `fetch + useEffect + useState 3개`로 구현했다가
React Query로 옮겨서 코드가 1/3로 줄었음.

```javascript
function useAirQuality(sido) {
  return useQuery({
    queryKey: ["air", sido],
    queryFn: async () => {
      const res = await fetch(`/api/air?sido=${sido}`);
      if (!res.ok) throw new Error("fail");
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시 사용
    refetchOnWindowFocus: true,
  });
}
```

## 배운 점

- **`staleTime`을 5분으로 두면** 탭 전환마다 새로 요청하지 않음 → API 호출 비용 절약
- **`isLoading` vs `isFetching`** 의 차이: 첫 로드인지, 재요청인지
- 차트는 SVG로 직접 그리는 것도 충분 (`<polyline>`만으로 OK)

## 한계

- 시도 단위까지만. 시·군·구 단위는 API 키 부족
- 모바일 일부 기기에서 차트 옆 스크롤 잘림 — 다음 버전에서 수정 예정
