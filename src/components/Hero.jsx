import React from 'react';
import { ArrowRight, Mail, MapPin, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon, CodeforcesIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Intro & Value Proposition */}
          <div className="lg:col-span-7">
            {/* Box-Like Badge Pills (Status, College, Location) */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border shadow-xs"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)',
                }}
              >
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Open for Opportunities</span>
              </div>

              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border shadow-xs"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)',
                }}
              >
                <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>B.Tech CSE (AIML) • GL Bajaj, Mathura</span>
              </div>

              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border shadow-xs"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)',
                }}
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Bareilly, UP, India</span>
              </div>
            </div>

            {/* Headline */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-5xl font-semibold tracking-tight leading-[1.15] mb-6"
              style={{ color: 'var(--text-main)' }}
            >
              Full-Stack Developer building{' '}
              <span className="underline decoration-slate-300 dark:decoration-zinc-700 underline-offset-8">
                fast, dependable
              </span>{' '}
              software.
            </h1>

            {/* Bio Description */}
            <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              Hi, I&apos;m <span className="font-semibold" style={{ color: 'var(--text-main)' }}>{personalInfo.name}</span>. 
              Currently in my 2nd year studying B.Tech CSE (AIML) at GL Bajaj, Mathura, I build robust backend architectures and full-stack web applications using{' '}
              <span className="font-medium" style={{ color: 'var(--text-main)' }}>Java, Spring Boot, PostgreSQL, and React</span>
              —focusing on clean code, and reliable system design.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm hover:opacity-90"
                style={{
                  backgroundColor: 'var(--text-main)',
                  color: 'var(--bg-canvas)',
                }}
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all hover:opacity-80"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)',
                }}
              >
                <Mail className="w-4 h-4 text-slate-400" />
                Contact
              </a>

              <div className="flex items-center gap-2 ml-1">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border transition-all hover:opacity-80"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)',
                  }}
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border transition-all hover:opacity-80"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)',
                  }}
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border transition-all hover:opacity-80"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)',
                  }}
                  title="LeetCode (@uservarun)"
                >
                  <LeetcodeIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.codeforces}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border transition-all hover:opacity-80"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)',
                  }}
                  title="Codeforces (@uservarun)"
                >
                  <CodeforcesIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Framed Portrait (No full-screen click, No old text overlay) */}
          <div className="lg:col-span-5" id="about">
            <div 
              className="relative rounded-3xl border p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-xl"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              {/* Studio Window Bar */}
              <div 
                className="flex items-center justify-between px-3 py-2 border-b mb-3"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700"></div>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Varun Sharma
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              {/* Portrait Frame */}
              <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden shadow-inner">
                <img
                  src={personalInfo.profileImage || "/profile.jpg"}
                  alt={`${personalInfo.name} - Full-Stack Developer`}
                  width="400"
                  height="450"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
