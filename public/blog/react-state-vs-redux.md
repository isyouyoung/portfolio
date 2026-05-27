# useState · useReducer · Redux 언제 뭘 쓸까

수업에서 `useState` → `useReducer` → `Redux Toolkit` 순서로 배웠는데,
어떤 걸 골라야 할지 매번 헷갈렸습니다. 학과 과제와 캡스톤 프로젝트에서
직접 써본 기준을 정리합니다.

## 한 줄 결론

| 상황 | 추천 |
| --- | --- |
| 컴포넌트 하나 안에서 끝남 | `useState` |
| 액션이 여러 개고 다음 상태가 복잡 | `useReducer` |
| 화면 여러 곳에서 같은 상태를 읽고 바꿈 | Redux Toolkit |

## useState

가장 단순한 방법. 토글, 입력값, 모달 열림 여부처럼 컴포넌트 안에서만
필요한 상태에 쓰면 됩니다.

```javascript
const [count, setCount] = useState(0);
```

## useReducer

상태가 객체이거나 액션 타입이 여러 가지일 때 깔끔합니다.
수업에서 배운 투두 앱이 좋은 예시였어요.

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "CREATE": return [...state, action.payload];
    case "DELETE": return state.filter((t) => t.id !== action.payload);
    default: return state;
  }
}

const [todos, dispatch] = useReducer(reducer, []);
```

## Redux Toolkit

여러 페이지(예: `/blog`, `/blog/:slug`)에서 **같은 상태**를 읽거나 바꿔야 할 때.
이 포트폴리오의 **테마(다크모드)** 와 **북마크**가 그런 케이스입니다.

```javascript
// slices/themeSlice.js
const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});
```

## 정리

- **컴포넌트 하나면 useState**
- **상태 모양이 복잡하면 useReducer**
- **여러 화면에서 공유하면 Redux**

처음부터 Redux로 가지 말고, 필요해질 때 옮기는 게 학습에도 좋습니다.
