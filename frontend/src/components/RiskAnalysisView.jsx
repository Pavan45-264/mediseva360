import React, { useState } from 'react';
import {
  Activity, AlertTriangle, ArrowRight, CheckCircle2,
  HelpCircle, Users, ShieldAlert, HeartPulse
} from 'lucide-react';
import { calculateSimpleRisk, SEVERITY_LEVELS } from '../data/pralayaData';

export default function RiskAnalysisView({
  hazards = [],
  selectedHazard = null,
  onSelectHazard = () => {},
  onOpenEmergency = () => {}
}) {
  const [activeHazardId, setActiveHazardId] = useState(
    selectedHazard?.id || (hazards[0]?.id || '')
  );

  const currentHazard = hazards.find((h) => h.id === activeHazardId) || hazards[0];
  const riskInfo = currentHazard ? calculateSimpleRisk(currentHazard) : null;
  const severityInfo = currentHazard ? (SEVERITY_LEVELS[currentHazard.severity] || SEVERITY_LEVELS.HIGH) : null;

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1920px] mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-purple-950/40 rounded-2xl p-6 lg:p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30">
                EASY DANGER SCORE GUIDE
              </span>
              <span className="text-xs font-mono text-slate-400">Simple English Explanation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              How Dangerous is This Disaster? (Score from 0 to 100)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              We look at the rain, wind speed, how many families live in the area, and hospitals nearby to calculate a simple number showing how dangerous the situation is.
            </p>
          </div>

          {/* Quick Location Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-md p-1.5 bg-slate-950 rounded-xl border border-slate-800">
            {hazards.map((h) => (
              <button
                key={h.id}
                onClick={() => {
                  setActiveHazardId(h.id);
                  onSelectHazard(h);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeHazardId === h.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {h.category} ({h.state})
              </button>
            ))}
          </div>
        </div>
      </div>

      {currentHazard && riskInfo && (
        <>
          {/* Big Score Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Score Big Card */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-6 lg:p-8 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    DANGER METER
                  </span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${severityInfo.bgClass}`}>
                    {severityInfo.badge}
                  </span>
                </div>

                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-6xl sm:text-7xl font-black text-white font-mono tracking-tight">
                    {currentHazard.riskScore}
                  </span>
                  <span className="text-2xl font-bold text-slate-500 font-mono">/ 100</span>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${currentHazard.riskScore}%`,
                      backgroundColor: severityInfo.color
                    }}
                  ></div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white mb-4">
                  📢 {riskInfo.ratingText}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  This score is for <strong className="text-white">{currentHazard.title}</strong> in {currentHazard.state}.
                </p>
              </div>

              <button
                onClick={() => onOpenEmergency(currentHazard)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <HeartPulse className="w-4 h-4" />
                Find Nearest Hospitals & Police for This Area
              </button>
            </div>

            {/* How We Calculate It in 3 Simple Points */}
            <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-6 lg:p-8 border border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  How This Score is Calculated (3 Simple Things):
                </h3>
                <p className="text-xs text-slate-400">
                  No complicated formulas. Here is exactly why the danger is high or low:
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* 1 */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-600/20 text-red-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-0.5">How Strong the Weather Is (40% Weight)</h4>
                    <p className="text-slate-400 text-xs">
                      We check rainfall in mm, wind speed in km/h, and if river waters are above the red danger line.
                    </p>
                  </div>
                </div>

                {/* 2 */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-600/20 text-cyan-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-0.5">How Many People Live in This Danger Area (35% Weight)</h4>
                    <p className="text-slate-400 text-xs">
                      If more people, small children, and elderly people live in low-lying flooded streets, the score goes up.
                    </p>
                  </div>
                </div>

                {/* 3 */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-600/20 text-purple-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-0.5">What Could Happen Next (25% Weight)</h4>
                    <p className="text-slate-400 text-xs">
                      For example: heavy rain might cause mud to slide down hills or sea waves to flood beach houses.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Simple Chain of Events */}
          <div className="bg-slate-900/90 rounded-2xl p-6 lg:p-8 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              What Disasters Could Follow Next? (Chain Reaction)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              
              <div className="p-4 rounded-xl bg-slate-950 border border-red-500/50">
                <span className="text-[10px] font-bold uppercase text-red-400 block mb-1">
                  FIRST EVENT (HAPPENING NOW)
                </span>
                <h4 className="text-sm font-bold text-white mb-1">
                  {currentHazard.title}
                </h4>
                <p className="text-xs text-slate-400">
                  Heavy rain and high water levels in low areas.
                </p>
              </div>

              {currentHazard.cascadingRisks?.[0] ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/50">
                  <span className="text-[10px] font-bold uppercase text-purple-400 block mb-1">
                    NEXT DANGER TO WATCH FOR
                  </span>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {currentHazard.cascadingRisks[0].targetTitle}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {currentHazard.cascadingRisks[0].impact}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  No other major disaster is expected to trigger right now.
                </div>
              )}

            </div>
          </div>
        </>
      )}

    </div>
  );
}
