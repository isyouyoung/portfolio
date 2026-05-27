import { Home } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/shared/ui";

export function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center text-center max-w-md">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl tracking-tight font-semibold text-foreground mb-2">
            페이지를 찾을 수 없습니다
          </h2>
          <p
            className="text-muted-foreground mb-8"
            style={{ whiteSpace: "pre-line", wordBreak: "keep-all" }}
          >
            {"주소를 다시 확인하거나\n홈으로 돌아가세요."}
          </p>
          <Link to="/">
            <Button variant="outline" className="gap-2 cursor-pointer">
              <Home className="h-4 w-4" />
              홈으로
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
