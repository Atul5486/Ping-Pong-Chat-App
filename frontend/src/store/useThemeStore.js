import { create } from "zustand";

const intializeTheme = () => {
  const savedTheme = localStorage.getItem("ping-theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  return savedTheme;
};
export const useThemeStore = create((set) => ({
  theme: intializeTheme(),
  setTheme: (theme)=>{
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem('ping-theme',theme);
  set({theme})
  },
}));
