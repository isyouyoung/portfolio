import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "kopo-portfolio-recent-projects";
const MAX_RECENT = 5;

function load() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

function save(items) {
  if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

const recentProjectsSlice = createSlice({
    name: "rencentProjects",
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

            state.items = state.items.filter(
                p => p.slug !== minimal.slug
            );

            state.items.unshift(minimal);

            if (state.items.length > MAX_RECENT) {
                state.items = state.items.slice(0, MAX_RECENT);
            }
            save(state.items);
        },
        clearRecent(state) {
            state.items = [];
            save(state.items);
        },
    },
});