import React from 'react';
import { Server, Database, Layout, Wrench } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

const categoryIcons = {
  0: Server,
  1: Database,
  2: Layout,
  3: Wrench,
};

// Authentic official tech icons with independent tile background colors (Linux removed)
const techLogos = [
  { name: "HTML5", icon: "/icons/html.svg" },
  { name: "CSS3", icon: "/icons/css.svg" },
  { name: "JavaScript", icon: "/icons/js.svg" },
  { name: "React.js", icon: "/icons/react.svg" },
  { name: "Spring Boot", icon: "/icons/spring.svg" },
  { name: "Java", icon: "/icons/java.svg" },
  { name: "PostgreSQL", icon: "/icons/postgres.svg" },
  { name: "Docker", icon: "/icons/docker.svg" },
  { name: "AWS", icon: "/icons/aws.svg" },
  { name: "Postman", icon: "/icons/postman.svg" },
  { name: "GitHub", icon: "/icons/github.svg" },
  { name: "Git", icon: "/icons/git.svg" },
  { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
];

export default function Skills() {
  // 3 sets per track to comfortably span across 4K displays (>3,000px)
  const trackLogos = [...techLogos, ...techLogos, ...techLogos];

  return (
    <section id="skills" className="py-20 md:py-24 border-t overflow-hidden" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <h2 
            className="text-3xl sm:text-4xl font-semibold tracking-tight"
            style={{ color: 'var(--text-main)' }}
          >
            Technical Stack &amp; Architectural Tooling
          </h2>
        </div>
      </div>

      {/* Infinite Seamless Scrolling Marquee Ticker */}
      <div className="relative w-full py-4 mb-10 overflow-hidden select-none group-marquee">
        {/* Gradient edge masks for smooth fade */}
        <div 
          className="absolute left-0 inset-y-0 w-16 sm:w-28 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--bg-canvas), transparent)',
          }}
        />
        <div 
          className="absolute right-0 inset-y-0 w-16 sm:w-28 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, var(--bg-canvas), transparent)',
          }}
        />

        {/* Dual Seamless Synchronized Tracks */}
        <div className="flex overflow-hidden w-full">
          {/* Primary Track */}
          <div className="flex shrink-0 animate-marquee-track items-center gap-4 sm:gap-6 pr-4 sm:pr-6 py-2">
            {trackLogos.map((item, idx) => (
              <div
                key={`track1-${idx}`}
                className="transition-all duration-300 hover:scale-125 hover:-translate-y-1 shrink-0 flex items-center justify-center cursor-pointer group"
                title={item.name}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-md transition-all duration-300 group-hover:shadow-2xl"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Secondary Duplicate Track (seamlessly follows behind without any gap) */}
          <div className="flex shrink-0 animate-marquee-track items-center gap-4 sm:gap-6 pr-4 sm:pr-6 py-2" aria-hidden="true">
            {trackLogos.map((item, idx) => (
              <div
                key={`track2-${idx}`}
                className="transition-all duration-300 hover:scale-125 hover:-translate-y-1 shrink-0 flex items-center justify-center cursor-pointer group"
                title={item.name}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-md transition-all duration-300 group-hover:shadow-2xl"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The 4 Grid Boxes */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((category, idx) => {
            const Icon = categoryIcons[idx] || Server;
            return (
              <div
                key={category.title}
                className="rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-4 pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <h3 className="text-xs font-bold tracking-wider uppercase" style={{ color: 'var(--text-main)' }}>
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold shadow-xs"
                        style={{
                          backgroundColor: 'var(--bg-subtle)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--text-main)',
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
