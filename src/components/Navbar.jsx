import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Tech Stack', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.04)] border-b'
          : 'py-5 bg-transparent'
      }`}
      style={{
        backgroundColor: isScrolled ? 'color-mix(in srgb, var(--bg-canvas) 85%, transparent)' : 'transparent',
        borderColor: isScrolled ? 'var(--border-subtle)' : 'transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand & Avatar / Monogram */}
          <a href="#" className="flex items-center gap-3 group">
            <div 
              className="w-9 h-9 rounded-lg font-semibold flex items-center justify-center text-sm shadow-sm overflow-hidden transition-colors"
              style={{
                backgroundColor: 'var(--text-main)',
                color: 'var(--bg-canvas)',
              }}
            >
              {personalInfo.avatar ? (
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{personalInfo.initials || 'VS'}</span>
              )}
            </div>
            <div>
              <div className="font-semibold text-sm tracking-tight flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                {personalInfo.name}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{personalInfo.status || 'Online'}</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full border shadow-inner"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:opacity-100"
                style={{
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-main)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Theme switcher & CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              className="inline-flex items-center justify-center text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:opacity-90"
              style={{
                backgroundColor: 'var(--text-main)',
                color: 'var(--bg-canvas)',
              }}
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border focus:outline-none"
              style={{
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div 
            className="sm:hidden mt-3 p-4 rounded-2xl border shadow-xl space-y-2 animate-in fade-in duration-150"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: 'var(--text-main)' }}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t flex flex-col gap-2" style={{ borderColor: 'var(--border-subtle)' }}>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-sm font-medium py-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--text-main)',
                  color: 'var(--bg-canvas)',
                }}
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
