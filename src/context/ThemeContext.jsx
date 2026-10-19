import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { id: 'light', name: 'Clean Light', dot: 'bg-slate-300' },
  { id: 'warm', name: 'Warm Paper', dot: 'bg-amber-200' },
  { id: 'sage', name: 'Nordic Sage', dot: 'bg-emerald-200' },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark' || !saved) return 'light';
    return saved;
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-warm', 'theme-sage', 'dark');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
