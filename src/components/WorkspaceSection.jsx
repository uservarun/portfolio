import React, { useState } from 'react';
import { Monitor, Cpu, Terminal, Compass, Sparkles, Maximize2, X } from 'lucide-react';
import { workspaceSpecs } from '../data/portfolioData';

export default function WorkspaceSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="workspace" className="py-20 md:py-28 bg-[#fbfbfd] border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium uppercase tracking-wider mb-3">
            The Build Environment
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
            Craft, Focus &amp; Engineering Space
          </h2>
        </div>

        {/* Studio Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Framed Hardware / Workspace Visual */}
          <div className="lg:col-span-7">
            <div className="relative group rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.09)]">
              {/* Studio Window Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Setup !!!!
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors"
                  title="Expand image"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Workstation Image with sleek overlay */}
              <div 
                className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => setModalOpen(true)}
              >
                <img
                  src="/workspace.jpg"
                  alt="Engineering Workstation & Deep Focus Setup"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />
                
                {/* Subtle bottom gradient banner */}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/80 via-slate-950/30 to-transparent p-4 sm:p-5 flex items-end justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white/20 text-white backdrop-blur-md mb-1">
                      <Sparkles className="w-3 h-3 text-cyan-300" />
                      Late night session??
                    </span>
                    <p className="text-white text-xs sm:text-sm font-medium">
                      the place where i actually do something of my own 
                    </p>
                  </div>
                  <span className="text-[11px] text-white/70 font-mono hidden sm:inline-block">
                    Click to enlarge
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Setup Architecture & Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-semibold text-slate-950 mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                Developer Rig &amp; Environment 
              </h3>
              <div className="space-y-3">
                {workspaceSpecs.map((spec) => (
                  <div key={spec.label} className="border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      {spec.label}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-800">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-semibold text-slate-950 mb-2 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                Work Ethic &amp; Philosophy
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether diagnosing subtle concurrency race conditions with thread dumps or constructing clean 
                modular React components, I value deliberate focus, clean commits, and comprehensive unit tests.
              </p>
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                <span className="text-xs font-mono text-slate-600">Workstation Image Preview</span>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <img
                src="/workspace.jpg"
                alt="Engineering Workstation Expanded"
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
