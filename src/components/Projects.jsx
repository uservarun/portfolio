import React from 'react';
import { Route, Sparkles, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/portfolioData';

export default function Projects() {
  const project = projects[0]; // RoadSaathi

  return (
    <section id="projects" className="py-20 md:py-28 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <h2 
            className="text-3xl sm:text-4xl font-semibold tracking-tight"
            style={{ color: 'var(--text-main)' }}
          >
            Featured Projects
          </h2>
        </div>

        {/* Left-to-Right Showcase Card */}
        {project && (
          <div 
            className="rounded-3xl border p-6 sm:p-10 shadow-sm transition-all duration-300 hover:shadow-xl"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Project Overview, Tech Stack & Action Links */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  {/* Title & Subtitle */}
                  <h3 
                    className="text-2xl sm:text-3xl font-bold tracking-tight mb-1.5"
                    style={{ color: 'var(--text-main)' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold mb-4 text-blue-600 dark:text-blue-400">
                    {project.subtitle}
                  </p>

                  {/* Summary */}
                  <p className="text-sm leading-relaxed mb-6 font-normal" style={{ color: 'var(--text-muted)' }}>
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg border shadow-xs"
                        style={{
                          backgroundColor: 'var(--bg-subtle)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--text-main)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md hover:opacity-90"
                      style={{
                        backgroundColor: 'var(--text-main)',
                        color: 'var(--bg-canvas)',
                      }}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      Source Code
                    </a>

                    {project.liveDemo && project.liveDemo !== '#' && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl border transition-all shadow-xs hover:opacity-80"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--text-main)',
                        }}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Application
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: System Architecture & Engineering Specifications (Explained ONCE) */}
              <div className="lg:col-span-7">
                <div 
                  className="rounded-2xl border p-5 sm:p-6 shadow-xs"
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center justify-between pb-3.5 border-b mb-4" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div className="flex items-center gap-2">
                      <Route className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                        System Architecture &amp; Specifications
                      </span>
                    </div>
                  </div>

                  {/* Architecture Points */}
                  <div className="space-y-3">
                    {project.highlights.map((point, i) => (
                      <div 
                        key={i}
                        className="p-3.5 rounded-xl border shadow-xs transition-all hover:translate-x-0.5"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          borderColor: 'var(--border-subtle)',
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span 
                            className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border"
                            style={{
                              backgroundColor: 'var(--bg-subtle)',
                              borderColor: 'var(--border-subtle)',
                              color: 'var(--text-muted)',
                            }}
                          >
                            0{i + 1}
                          </span>
                          <span className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>
                            {point.title}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          {point.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Benchmark Callout */}
                  <div 
                    className="p-3.5 rounded-xl border mt-4 flex items-center gap-3 shadow-xs"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                        Core Benchmark
                      </div>
                      <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                        {project.metrics}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
