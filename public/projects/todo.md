# 할 일 관리 앱 (Todo with Filters)

> 학습용 사이드 프로젝트 · 2026.04
> **목표**: useReducer/Context vs Redux Toolkit을 직접 비교

## 왜 만들었나

수업에서 `useReducer + Context`로 만든 투두 앱을, 같은 기능을
**Redux Toolkit**으로 다시 구현해보면서 차이를 정리하고 싶었음.

## 비교 결과

| 항목 | useReducer + Context | Redux Toolkit |
| --- | --- | --- |
| 보일러플레이트 | 적음 | 조금 더 많음 (slice 정의) |
| Devtools | 별도 도구 없음 | Redux DevTools 강력 |
| 리렌더 최적화 | 직접 신경 써야 함 | `useSelector` 가 알아서 |
| 비동기 처리 | 직접 구현 | `createAsyncThunk` 제공 |

## 핵심 코드

```javascript
// features/todos/todosSlice.js
const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: {
      prepare: (text) => ({ payload: { id: nanoid(), text, done: false } }),
      reducer: (state, action) => { state.push(action.payload); },
    },
    toggleTodo: (state, action) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) todo.done = !todo.done;
    },
    deleteTodo: (state, action) =>
      state.filter((t) => t.id !== action.payload),
  },
});
```

## 결론

> **컴포넌트 1\~2개 안에서 끝나면 useReducer로 충분.
> 여러 페이지에서 같은 상태를 본다면 Redux로 옮긴다.**

이 포트폴리오 자체도 같은 기준을 따라서, 테마와 북마크는 Redux,
이미지 에러 같은 컴포넌트 내부 상태는 useState를 쓴다.
