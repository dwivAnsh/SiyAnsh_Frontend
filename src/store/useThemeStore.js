import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("siyansh-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("siyansh-theme", theme);
    set({ theme });
  },
}));