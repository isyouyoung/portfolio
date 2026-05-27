# React Router 라우팅 처음 잡을 때 헷갈리던 것들

수업에서 `react-router-dom`을 배우고 직접 써보면서 여러 번 막혔던 부분을
정리합니다. 이 포트폴리오도 React Router로 만들었습니다.

## 1. Link vs useNavigate

```jsx
import { Link, useNavigate } from "react-router-dom";

// 사용자가 누르는 링크 → Link
<Link to="/blog">블로그</Link>;

// 코드 안에서 이동 → useNavigate
const navigate = useNavigate();
navigate("/blog");
```

`Link`는 그냥 a 태그처럼 쓰면 되고, 폼 제출 후 이동 같은
**조건부 이동**일 때 `useNavigate`를 씁니다.

## 2. 동적 경로와 useParams

```jsx
<Route path="/blog/:slug" element={<BlogPostPage />} />
```

이 경로의 컴포넌트 안에서:

```jsx
import { useParams } from "react-router-dom";

function BlogPostPage() {
  const { slug } = useParams();
  // slug = URL의 :slug 부분 값
}
```

## 3. 쿼리스트링은 useSearchParams

`/blog?page=2`처럼 `?` 뒤에 붙는 값은 `useSearchParams`로 읽습니다.

```jsx
import { useSearchParams } from "react-router-dom";

const [searchParams, setSearchParams] = useSearchParams();
const page = searchParams.get("page"); // "2" (문자열)
setSearchParams({ page: "3" }); // URL을 ?page=3 으로 바꿈
```

이 포트폴리오 블로그 페이지네이션이 그 패턴입니다.

## 4. 자주 막혔던 실수들

- `path="/blog"`로 정의하고 `Link to="/blog/"`로 하면 404가 나는 경우가 있음 → 슬래시 통일
- 부모 라우트에 `*`(catch-all)를 안 만들면 잘못된 URL이 빈 화면이 됨 → `<Route path="*" element={<NotFound />} />` 꼭 추가

## 마무리

라우팅은 한 번 익히면 어디서나 같습니다. 처음만 잘 잡아두면
화면이 많아져도 코드가 깔끔하게 유지됩니다.
