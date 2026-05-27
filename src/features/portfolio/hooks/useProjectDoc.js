import { useQuery } from "@tanstack/react-query";

import { fetchProjectDoc } from "../api/fetchProjectDoc.js";

/**
 * 프로젝트 상세 마크다운 본문.
 * slug가 없을 땐 (모달 닫힌 상태) 요청 자체를 안 한다.
 */
export function useProjectDoc(slug) {
  return useQuery({
    queryKey: ["project-doc", slug],
    queryFn: () => fetchProjectDoc(slug),
    enabled: Boolean(slug),
  });
}
