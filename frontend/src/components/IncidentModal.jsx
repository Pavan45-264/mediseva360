import React from 'react';
import {
  X, MapPin, ShieldAlert, Users, Phone, Compass,
  HeartPulse, Shield, Home, AlertTriangle
} from 'lucide-react';
import { SEVERITY_LEVELS, HAZARD_CATEGORIES } from '../data/pralayaData';

export default function IncidentModal({
  hazard,
  onClose,
  onOpenMap,
  onOpenSOP,
  onOpenEmergency
}) {
  if (!hazard) return null;

  const severityInfo = SEVERITY_LEVELS[hazard.severity] || SEVERITY_LEVELS.HIGH;
  const categoryInfo = HAZARD_CATEGORIES[hazard.category] || HAZARD_CATEGORIES.FLOOD;
  const services = hazard.emergencyServices;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-scaleUp">
        
        {/* Header Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden flex-shrink-0 bg-slate-900">
          <img
            src={categoryInfo.bannerImg}
            alt={hazard.title}
            className="w-full h-full object-cover object-center filter brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors border border-slate-700/80 shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${severityInfo.bgClass}`}>
                {severityInfo.badge}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/90 text-amber-300 border border-amber-500/30">
                Danger Score: {hazard.riskScore}/100
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              {hazard.title}
            </h2>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              {hazard.state} · {hazard.location}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-xs sm:text-sm">
          
          {/* Simple summary */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 leading-relaxed text-slate-200">
            <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1">
              WHAT IS HAPPENING:
            </div>
            {hazard.overviewText}
          </div>

          {/* NEARBY EMERGENCY HELP (Hospitals, Police, Shelters) */}
          {services && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-emerald-400" />
                Emergency Help Near This Area (Hospitals & Police):
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Hospital */}
                {services.hospitals?.[0] && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-emerald-400 font-mono">
                        🏥 NEAREST HOSPITAL
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {services.hospitals[0].distance}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      {services.hospitals[0].name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {services.hospitals[0].bedsAvailable}
                    </div>
                    <a
                      href={`tel:${services.hospitals[0].phone.replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call {services.hospitals[0].phone}
                    </a>
                  </div>
                )}

                {/* Police */}
                {services.policeStations?.[0] && (
                  <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-800/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-blue-400 font-mono">
                        🚓 NEAREST POLICE
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {services.policeStations[0].distance}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      {services.policeStations[0].name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {services.policeStations[0].address}
                    </div>
                    <a
                      href={`tel:${services.policeStations[0].phone.replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call {services.policeStations[0].phone}
                    </a>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Simple Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                PEOPLE IN DANGER
              </span>
              <div className="text-sm font-bold text-white">
                {((hazard.exposure?.population || 0) / 100000).toFixed(1)} Lakh People
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                RESCUE TEAMS
              </span>
              <div className="text-sm font-bold text-emerald-400">
                {hazard.ndrfResponse?.teamsDeployed || 0} Teams on Site
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                SAFE RELIEF CAMPS
              </span>
              <div className="text-sm font-bold text-purple-300">
                {hazard.exposure?.evacuationSheltersActive || 24} Shelters Open
              </div>
            </div>
          </div>

          {/* NDRF Emergency Action */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-xs text-red-200 leading-relaxed">
            <strong className="text-red-400 block mb-1">CRITICAL SAFETY INSTRUCTION:</strong>
            {hazard.ndrfResponse?.immediateAction}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="text-[11px] text-slate-400">
            Helpline: <strong>112 / 1070</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenEmergency(hazard);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
            >
              See All Nearby Hospitals
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenMap(hazard);
              }}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              See on Danger Map
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
