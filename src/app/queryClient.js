import { QueryClient } from "@tanstack/react-query";

/**
 * React Query 클라이언트 단일 인스턴스.
 * 컴포넌트 트리 어디서든 같은 캐시를 공유한다.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      refetchOnWindowFocus: false,
    },
  },
});
