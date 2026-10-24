import React from 'react';
import {
  MapPin, ShieldAlert, ArrowRight, Play, Eye,
  Activity, Users, AlertTriangle, Radio, HeartPulse,
  Compass, ChevronRight, Phone
} from 'lucide-react';
import { SEVERITY_LEVELS, HAZARD_CATEGORIES } from '../data/pralayaData';

export default function HeroBanner({
  scenario,
  primaryHazard,
  onOpenMap,
  onOpenSOP,
  onOpenEmergency,
  onInspectHazard
}) {
  if (!primaryHazard) return null;

  const severityInfo = SEVERITY_LEVELS[primaryHazard.severity] || SEVERITY_LEVELS.HIGH;
  const categoryInfo = HAZARD_CATEGORIES[primaryHazard.category] || HAZARD_CATEGORIES.FLOOD;

  return (
    <section className="relative w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-8 group">
      
      {/* Background Image with Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={categoryInfo.bannerImg}
          alt={primaryHazard.title}
          className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out opacity-40 filter brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/70 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-10 lg:p-12 max-w-5xl">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-lg shadow-red-600/40 animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            {severityInfo.badge}
          </span>

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 text-cyan-300 border border-cyan-500/30">
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            {primaryHazard.state} · {primaryHazard.location}
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-900/80 text-amber-300 border border-amber-500/30">
            SIMULATION DEMO
          </span>
        </div>

        {/* Clear Big Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-2 font-display">
          {primaryHazard.title}
        </h1>

        <p className="text-sm sm:text-base text-cyan-300 font-semibold mb-3">
          {severityInfo.simpleAdvice}
        </p>

        {/* Simple Plain Description */}
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed mb-6 font-normal">
          {primaryHazard.overviewText}
        </p>

        {/* 4 Simple Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mb-8">
          <div className="bg-slate-950/85 backdrop-blur-md rounded-xl p-3 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              👥 People in Danger
            </div>
            <div className="text-base sm:text-lg font-black text-white font-mono">
              {((primaryHazard.exposure?.population || 0) / 100000).toFixed(1)} Lakh People
            </div>
          </div>

          <div className="bg-slate-950/85 backdrop-blur-md rounded-xl p-3 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              ⚠️ Danger Score
            </div>
            <div className="text-base sm:text-lg font-black text-amber-400 font-mono">
              {primaryHazard.riskScore} out of 100
            </div>
          </div>

          <div className="bg-slate-950/85 backdrop-blur-md rounded-xl p-3 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              🛡️ Rescue Teams
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">
              {primaryHazard.ndrfResponse?.teamsDeployed || 12} Teams Active
            </div>
          </div>

          <div className="bg-slate-950/85 backdrop-blur-md rounded-xl p-3 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              🏥 Hospitals Near Here
            </div>
            <div className="text-base sm:text-lg font-black text-cyan-300 font-mono">
              {primaryHazard.exposure?.hospitals || 4} Open
            </div>
          </div>
        </div>

        {/* Action Buttons (Clear Simple English) */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* 1. Nearest Hospitals & Police (Green Highlight) */}
          <button
            onClick={() => onOpenEmergency(primaryHazard)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
          >
            <HeartPulse className="w-4 h-4" />
            Find Hospitals & Police Stations
          </button>

          {/* 2. Open Live Map */}
          <button
            onClick={() => onOpenMap(primaryHazard)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02]"
          >
            <MapPin className="w-4 h-4" />
            See on Live Danger Map
          </button>

          {/* 3. Evacuation Rules */}
          <button
            onClick={() => onOpenSOP(primaryHazard)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            What You Should Do (Safety Steps)
          </button>

        </div>

      </div>

    </section>
  );
}
