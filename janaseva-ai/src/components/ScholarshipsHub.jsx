import React, { useState } from 'react';
import {
  GraduationCap, Award, BookOpen, Sparkles, ArrowRight,
  CheckCircle2, Users, IndianRupee, ExternalLink, ShieldCheck
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../data/schemesData';

export default function ScholarshipsHub({ onSelectScheme }) {
  const [levelFilter, setLevelFilter] = useState('All');

  const scholarships = SCHEMES_DATABASE.filter(s => s.category === 'Scholarships');

  const levels = ['All', 'College & University', 'Higher Education', 'Technical Degree / Diploma', 'School & College', 'Ph.D. & Research'];

  const filtered = scholarships.filter(s => {
    if (levelFilter === 'All') return true;
    return s.type === levelFilter;
  });

  return (
    <section id="scholarships-hub" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              National Scholarship Portal & Higher Education Hub
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Central & State <span className="text-indigo-600">Student Scholarships</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Full tuition fee waivers, monthly research stipends, and collateral-free education loans for meritorious students, girls in STEM, and disadvantaged categories.
            </p>
          </div>

          <a
            href="https://scholarships.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow-sm self-start md:self-end"
          >
            <span>Open NSP scholarships.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Level Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {levels.map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                levelFilter === lvl
                  ? 'bg-indigo-600 text-white shadow-sm font-black'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectScheme(item)}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-500 transition-all cursor-pointer group flex flex-col justify-between shadow-sm hover:shadow-xl hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-indigo-600 mb-3">
                  {item.teluguTitle}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.tagline}
                </p>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Grant Value</span>
                    <span className="text-base font-black text-emerald-700">{item.benefit}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Coverage</span>
                    <span className="text-base font-black text-slate-800">{item.beneficiaries}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                <span>View Full Criteria & Documents</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
