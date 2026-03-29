import React, { createContext, useContext, useEffect, useState } from 'react';
interface ThemeContextType { isDark: boolean; toggleTheme: () => void; }
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('audioclass-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) { root.classList.add('dark'); root.classList.remove('light'); }
    else { root.classList.remove('dark'); root.classList.add('light'); }
    localStorage.setItem('audioclass-theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(v => !v) }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
