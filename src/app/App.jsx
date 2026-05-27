import { Routes, Route } from "react-router-dom";

import { Navbar } from "@/shared/components/Navbar.jsx";
import { PageContainer } from "@/shared/components/PageContainer.jsx";

import { HomePage } from "@/pages/HomePage.jsx";
import { BlogPage } from "@/pages/BlogPage.jsx";
import { NotFoundPage } from "@/pages/NotFoundPage.jsx";

/**
 * 앱의 라우트 정의.
 * Provider는 AppProviders가 담당하고 여기는 화면 구조만.
 */
export default function App() {
  return (
    <div className="relative min-h-screen bg-background font-sans antialiased">
      <PageContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* ★ BUG #5: 경로가 대문자 "/Blog"로 잘못 설정되었고
              caseSensitive prop까지 켜져 있어 대소문자가 구분된다.
              → React Router는 기본적으로 case-insensitive이지만, 이 한 줄 때문에
                Navbar의 "/blog" 요청이 매칭되지 않고 NotFoundPage로 떨어진다.
              힌트: URL 경로는 일반적으로 소문자를 사용한다 */}
          <Route caseSensitive path="/blog" element={<BlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageContainer>
      <Navbar />
    </div>
  );
}
