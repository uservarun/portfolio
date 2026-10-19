import React from 'react';
import { metrics } from '../data/portfolioData';

export default function Metrics() {
  return (
    <section className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 font-mono mb-1">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-800 mb-1">
                {item.label}
              </div>
              <div className="text-[12px] text-slate-500 leading-normal">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
