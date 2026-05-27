import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { blogQuery: "" },
  reducers: {
    setBlogQuery(state, action) {
      state.blogQuery = action.payload;
    },
    clearBlogQuery(state) {
      state.blogQuery = "";
    },
  },
});

export const { setBlogQuery, clearBlogQuery } = uiSlice.actions;
export const selectBlogQuery = (state) => state.ui.blogQuery;
export default uiSlice.reducer;