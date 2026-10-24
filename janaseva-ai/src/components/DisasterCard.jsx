import React from 'react';
import {
  MapPin, Activity, Users, AlertTriangle, Shield,
  ArrowUpRight, Info
} from 'lucide-react';
import { SEVERITY_LEVELS, HAZARD_CATEGORIES } from '../data/pralayaData';

export default function DisasterCard({
  hazard,
  onSelect,
  onOpenMap
}) {
  const severityInfo = SEVERITY_LEVELS[hazard.severity] || SEVERITY_LEVELS.HIGH;
  const categoryInfo = HAZARD_CATEGORIES[hazard.category] || HAZARD_CATEGORIES.FLOOD;

  return (
    <div
      onClick={() => onSelect(hazard)}
      className="group flex-shrink-0 w-72 sm:w-80 bg-slate-900/90 hover:bg-slate-800/95 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer flex flex-col relative"
    >
      {/* Top Banner Image (Netflix Poster Style) */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-950">
        <img
          src={categoryInfo.bannerImg}
          alt={hazard.title}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

        {/* Severity Badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border shadow-md ${severityInfo.bgClass}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
            {hazard.severity}
          </span>
        </div>

        {/* Risk Score Pill */}
        <div className="absolute top-2.5 right-2.5">
          <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold">
            Risk: {hazard.riskScore}%
          </span>
        </div>

        {/* Hazard Category Tag */}
        <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 text-xs text-white font-bold">
          <span className="text-base">{categoryInfo.icon}</span>
          <span className="text-cyan-300 text-[11px] uppercase tracking-wide">
            {categoryInfo.name}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1">
            {hazard.title}
          </h3>

          <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2">
            <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
            <span className="truncate">{hazard.state} · {hazard.location}</span>
          </div>

          <p className="text-[11px] text-slate-400 line-clamp-2 mb-3 leading-relaxed">
            {hazard.overviewText}
          </p>
        </div>

        {/* Telemetry / Impact Mini-Grid */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1">
              <Users className="w-3 h-3 text-cyan-400" /> Exposed:
            </span>
            <span className="font-mono font-bold text-slate-200">
              {(hazard.exposure?.population / 100000).toFixed(1)} L
            </span>
          </div>

          {/* Progress bar for risk score */}
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${hazard.riskScore}%`,
                backgroundColor: severityInfo.color
              }}
            ></div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 font-mono">
            <span className="truncate max-w-[170px]">{hazard.districts?.length || 1} Districts</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenMap(hazard);
              }}
              className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-0.5 hover:underline"
            >
              GIS MAP <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
