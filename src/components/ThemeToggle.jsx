import React, { useState, useRef, useEffect } from 'react';
import { Palette, Sun, Check } from 'lucide-react';
import { useTheme, themes } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getThemeIcon = () => {
    switch (theme) {
      case 'warm':
      case 'sage':
        return <Palette className="w-3.5 h-3.5" />;
      default:
        return <Sun className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors shadow-xs"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-main)',
        }}
        title="Change Website Theme"
      >
        {getThemeIcon()}
        <span className="capitalize hidden sm:inline-block">{theme}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-44 rounded-xl border shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 text-slate-400">
            Select Palette
          </div>
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left"
              style={{
                backgroundColor: theme === t.id ? 'var(--bg-subtle)' : 'transparent',
                color: 'var(--text-main)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${t.dot} border border-slate-300/40`} />
                <span>{t.name}</span>
              </div>
              {theme === t.id && <Check className="w-3.5 h-3.5 text-blue-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
