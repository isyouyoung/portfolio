# useEffect 정리(cleanup) 함수가 필요한 순간

`useEffect`의 return 함수, 처음에는 왜 쓰는지 잘 몰랐습니다.
실제로 버그를 한 번 만나고 나니까 이해가 됐어요.

## cleanup이 없으면 생기는 버그

타이머 예시입니다.

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);
  // cleanup 없음
}, []);
```

컴포넌트가 다시 렌더링되거나 화면을 빠져나가도 타이머는 계속 돕니다.
페이지를 왔다 갔다 하면 콘솔에 `tick`이 **여러 번** 찍힙니다.

## 해결

return으로 정리 함수를 돌려주면 됩니다.

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);
  return () => clearInterval(id);
}, []);
```

## 정리가 필요한 패턴들

- `setInterval` / `setTimeout` → `clearInterval` / `clearTimeout`
- `addEventListener` → `removeEventListener`
- 웹소켓·옵저버 구독 → 구독 해제
- AbortController로 fetch 취소

## React 18 이후 StrictMode 주의

개발 모드에서 `useEffect`가 **두 번 실행**됩니다.
이게 버그가 아니라, cleanup이 제대로 동작하는지 확인하라고
일부러 그렇게 한 것입니다. 정리만 잘 해두면 문제없어요.

## 한 줄 요약

> `useEffect` 안에서 **외부 자원**(타이머, 리스너, 구독, 네트워크)을
> 만들었으면 **꼭 정리 함수**를 같이 작성한다.
