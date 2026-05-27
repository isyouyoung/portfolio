# React Query를 처음 써본 후기

`fetch` + `useEffect` + `useState` 조합으로 API를 부르던 코드를
**React Query**(`@tanstack/react-query`)로 바꿔봤습니다.

## fetch만 쓸 때 코드

```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch("/api/posts")
    .then((res) => res.json())
    .then((json) => setData(json))
    .catch((err) => setError(err))
    .finally(() => setLoading(false));
}, []);
```

세 가지 state를 직접 관리해야 하고, 다른 컴포넌트에서 같은 데이터를
또 부르면 캐시도 없습니다.

## React Query로 바꾸면

```javascript
import { useQuery } from "@tanstack/react-query";

const { data, isLoading, isError } = useQuery({
  queryKey: ["posts"],
  queryFn: () => fetch("/api/posts").then((r) => r.json()),
});
```

세 줄로 끝납니다. 게다가:

- 같은 `queryKey`로 다른 컴포넌트에서 불러도 **캐시 공유**
- 창을 다시 포커스하면 자동 새로고침 (옵션으로 끌 수 있음)
- `staleTime`을 주면 그 시간 동안은 다시 요청 안 함

## 이 포트폴리오에서

블로그 글 목록과 본문을 React Query로 가져옵니다.
`src/hooks/useBlogPosts.js`를 보면 패턴이 보입니다.

```javascript
export function useBlogPost(slug) {
  return useQuery({
    queryKey: ["blog", "post", slug],
    queryFn: async () => {
      const res = await fetch(`/blog/${slug}.md`);
      return res.text();
    },
    enabled: Boolean(slug),
  });
}
```

`enabled: Boolean(slug)`로 slug가 없으면 요청 자체를 안 합니다.

## 언제 쓰면 좋을까

- 서버에서 받아오는 데이터 → React Query
- 클라이언트 안에서만 쓰는 상태(테마, 모달 열림) → useState / Redux

처음부터 모든 fetch를 바꿀 필요는 없지만, 캡스톤처럼 페이지가 많아지면
빨리 옮기는 게 정신건강에 좋습니다.
