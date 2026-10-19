import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 border-t mt-12" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--text-main)' }}>
            {personalInfo.name}
          </span>

          <div className="flex items-center gap-5 sm:gap-6">
            <a
              href="#projects"
              className="text-xs transition-colors hover:opacity-80"
              style={{ color: 'var(--text-muted)' }}
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-xs transition-colors hover:opacity-80"
              style={{ color: 'var(--text-muted)' }}
            >
              Stack
            </a>
            <a
              href="#about"
              className="text-xs transition-colors hover:opacity-80"
              style={{ color: 'var(--text-muted)' }}
            >
              About
            </a>
            <a
              href="#contact"
              className="text-xs transition-colors hover:opacity-80"
              style={{ color: 'var(--text-muted)' }}
            >
              Contact
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg border transition-all hover:opacity-80 ml-2"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
