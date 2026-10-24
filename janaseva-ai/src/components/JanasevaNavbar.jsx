import React, { useState } from 'react';
import {
  Sprout, Globe, Mic, Search, ShieldCheck,
  Menu, X, Sparkles, ChevronDown, GraduationCap, Tractor, Briefcase
} from 'lucide-react';

export default function JanasevaNavbar({ onOpenEligibility, onSelectCategory }) {
  const [language, setLanguage] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'te' : prev === 'te' ? 'hi' : 'en');
  };

  const getLangLabel = () => {
    if (language === 'te') return 'తెలుగు';
    if (language === 'hi') return 'हिन्दी';
    return 'English';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Emblem */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/20">
              <Sprout className="w-6 h-6 stroke-[2.6]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-sans">
                  JANASEVA <span className="text-emerald-600">AI</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hidden sm:inline-block">
                  NATIONAL DBT
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                {language === 'te'
                  ? 'కేంద్ర & రాష్ట్ర ప్రభుత్వ పథకాల వేదిక'
                  : 'Central & State Government Benefits Platform'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-600">
            <a
              href="#schemes-catalogue"
              className="hover:text-emerald-600 transition-colors"
            >
              All Schemes (2,500+)
            </a>
            <a
              href="#govt-jobs-hub"
              className="hover:text-emerald-600 transition-colors flex items-center gap-1.5 text-emerald-700 font-extrabold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100"
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              <span>Govt Jobs & Vacancies</span>
            </a>
            <a
              href="#scholarships-hub"
              className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
              <span>Scholarships</span>
            </a>
            <a
              href="#farmer-hub"
              className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
            >
              <Tractor className="w-3.5 h-3.5 text-emerald-600" />
              <span>Farmer Loans</span>
            </a>
            <button
              onClick={() => onSelectCategory && onSelectCategory('Healthcare')}
              className="hover:text-rose-600 transition-colors"
            >
              Ayushman PM-JAY
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Voice Assistant */}
            <button
              onClick={() => alert(language === 'te' ? 'వాయిస్ అసిస్టెంట్ సిద్ధంగా ఉంది! దయచేసి మాట్లాడండి...' : 'Voice Assistant Ready! Ask questions in Telugu, Hindi or English.')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 text-slate-700 text-xs font-bold transition-all shadow-sm"
              title="Voice Assistant (Telugu / English / Hindi)"
            >
              <Mic className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span className="hidden md:inline">Voice Help</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-bold transition-all shadow-sm"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{getLangLabel()}</span>
            </button>

            {/* Check Eligibility */}
            <button
              onClick={onOpenEligibility}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
            >
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Check Eligibility</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 lg:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-2 animate-fadeIn bg-white">
            <a
              href="#schemes-catalogue"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600"
            >
              All Government Schemes
            </a>
            <a
              href="#govt-jobs-hub"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 rounded-lg"
            >
              💼 Govt Jobs & Vacancies (Active Drives)
            </a>
            <a
              href="#scholarships-hub"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600"
            >
              Student Scholarships
            </a>
            <a
              href="#farmer-hub"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600"
            >
              Farmer Loans & MSP Ticker
            </a>
            <button
              onClick={() => { onOpenEligibility(); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs text-center block shadow-md"
            >
              Check My Eligibility
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
