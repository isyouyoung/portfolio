import { createSlice } from '@reduxjs/toolkit';

// 로컬스토리지 저장/불러오기 함수 (기존에 정의하신 대로 유지)
const MAX_RECENT = 5;
const load = () => { /* 기존 코드 */ return []; };
const save = (items) => { /* 기존 코드 */ };

const recentProjectsSlice = createSlice({
  name: "recentProjects",
  initialState: { items: load() },
  reducers: {
    pushRecent(state, action) {
      const project = action.payload;
      if (!project || !project.title) return;

      const minimal = {
        title: project.title,
        slug: project.slug || project.title,
        dates: project.dates || "",
      };

      // 1. 같은 slug 이미 있으면 제거 (괄호와 조건문 정리)
      state.items = state.items.filter(p => p.slug !== minimal.slug);
      
      // 2. 맨 앞에 추가
      state.items.unshift(minimal);
      
      // 3. 5개 초과면 잘라내기
      if (state.items.length > MAX_RECENT) {
        state.items = state.items.slice(0, MAX_RECENT);
      }
      
      save(state.items);
    }, // <-- pushRecent 끝나는 중괄호 꼭 확인!

    clearRecent(state) {
      state.items = [];
      save(state.items);
    } // <-- clearRecent 끝나는 중괄호 꼭 확인!
  }
});

// 하단 export 부분 (작성하신 것 맞습니다!)
export const { pushRecent, clearRecent } = recentProjectsSlice.actions;
export const selectRecentProjects = (state) => state.recentProjects.items;
export default recentProjectsSlice.reducer;