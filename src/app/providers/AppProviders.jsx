import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { TooltipProvider } from "@/shared/ui";
import { ThemeSync } from "@/features/theme";

import { store } from "../store.js";
import { queryClient } from "../queryClient.js";

/**
 * 앱 전역에서 필요한 Provider 4개를 한 곳에 모은 컴포넌트.
 *
 * 순서가 중요:
 * - ReduxProvider  : 가장 바깥. ThemeSync가 useSelector를 쓰므로.
 * - QueryClient    : Redux와 무관하지만 트리 전체에서 useQuery 가능해야 함.
 * - BrowserRouter  : Link/useParams 등 라우터 hook을 쓰는 모든 컴포넌트의 부모.
 * - TooltipProvider: Radix Tooltip의 글로벌 컨텍스트.
 * - ThemeSync      : 가장 안쪽. Redux 값을 읽어 <html class>를 갱신.
 */
export function AppProviders({ children }) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider delayDuration={0}>
            <ThemeSync>{children}</ThemeSync>
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
