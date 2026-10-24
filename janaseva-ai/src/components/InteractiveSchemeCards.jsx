import React, { useRef, useState, useCallback } from 'react';
import {
  Tractor, IndianRupee, GraduationCap, Heart, FileText,
  Users, Droplets, ArrowRight, CheckCircle2, Search,
  Sparkles, ExternalLink, ShieldCheck, ChevronRight, Zap
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../data/schemesData';

function JewelSchemeCard({ scheme, onSelect }) {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrame = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !canvasRef.current) return;

    if (animFrame.current) cancelAnimationFrame(animFrame.current);

    animFrame.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotX = (y - 0.5) * -5.0;
      const rotY = (x - 0.5) * 5.0;

      canvasRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
      canvasRef.current.style.boxShadow = `${rotY * 2.5}px ${-rotX * 2.5}px 30px rgba(0, 0, 0, 0.08), 0 10px 25px rgba(0, 0, 0, 0.05)`;

      canvasRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
      canvasRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    if (!canvasRef.current) return;

    canvasRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    canvasRef.current.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.04)';
  }, []);

  return (
    <div
      ref={cardRef}
      className="scheme-card-3d-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={canvasRef}
        onClick={() => onSelect(scheme)}
        className="scheme-card-3d-canvas bg-white border border-slate-200/90 hover:border-emerald-500 p-6 cursor-pointer group flex flex-col justify-between h-full shadow-sm hover:shadow-xl transition-all"
      >
        <div>
          {/* Top Row: Type & Badge */}
          <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {scheme.category} · {scheme.type}
            </span>

            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
              {scheme.badge}
            </span>
          </div>

          {/* Scheme Title & Telugu */}
          <div className="relative z-10 mb-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
              {scheme.title}
            </h3>
            <p className="text-xs font-semibold text-emerald-600 mt-0.5">
              {scheme.teluguTitle}
            </p>
          </div>

          {/* Tagline */}
          <p className="text-xs text-slate-600 leading-relaxed mb-5 relative z-10">
            {scheme.tagline}
          </p>

          {/* Benefit Matrix */}
          <div className="grid grid-cols-2 gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 relative z-10 mb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Benefit</span>
              <span className="text-sm sm:text-base font-black text-emerald-700">{scheme.benefit}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Beneficiaries</span>
              <span className="text-sm sm:text-base font-black text-slate-800">{scheme.beneficiaries}</span>
            </div>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between relative z-10">
          <span className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Check Details & Apply</span>
          </span>

          <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InteractiveSchemeCards({ onSelectScheme }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Agriculture', 'Scholarships', 'Healthcare', 'Citizen Services'];

  const filtered = SCHEMES_DATABASE.filter(s => {
    const matchesCat = activeCategory === 'All' || s.category === activeCategory;
    const matchesQuery = !searchQuery.trim() ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.teluguTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <section id="schemes-catalogue" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              Direct Benefits Transfer (DBT) Scheme Directory
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Central & State <span className="text-emerald-600">Government Schemes</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
              Explore 2,500+ verified central and state welfare benefits with real-time 3D cursor depth and instant eligibility matching.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scheme by name or benefit..."
              className="w-full h-12 pl-10 pr-4 text-xs sm:text-sm bg-white text-slate-900 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                activeCategory === c
                  ? 'bg-emerald-600 text-white font-black shadow-sm'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Scheme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(scheme => (
            <JewelSchemeCard
              key={scheme.id}
              scheme={scheme}
              onSelect={onSelectScheme}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No government schemes matched "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-3 text-xs text-emerald-600 font-bold underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
