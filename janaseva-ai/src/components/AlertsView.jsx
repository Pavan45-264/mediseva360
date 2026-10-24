import React, { useState } from 'react';
import {
  Bell, AlertTriangle, ShieldAlert, Phone, MapPin,
  CheckCircle, XCircle, Volume2, Info, Users,
  HeartPulse, Shield, Flame, Home
} from 'lucide-react';
import { SEVERITY_LEVELS } from '../data/pralayaData';

export default function AlertsView({
  hazards = [],
  onSelectHazard = () => {},
  onPlayAlarm = () => {},
  onOpenEmergency = () => {}
}) {
  const [activeAlertId, setActiveAlertId] = useState(hazards[0]?.id || '');
  const selectedAlert = hazards.find((h) => h.id === activeAlertId) || hazards[0];
  const severityInfo = selectedAlert ? (SEVERITY_LEVELS[selectedAlert.severity] || SEVERITY_LEVELS.HIGH) : null;

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1920px] mx-auto">
      
      {/* Top Banner: Emergency Directives */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 rounded-2xl p-6 lg:p-8 border-2 border-red-500 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/40 animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-600 text-white">
                  IMPORTANT SAFETY WARNING
                </span>
                <span className="text-xs text-red-400 font-bold">Official Government Instructions</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                Emergency Actions: What You Must Do Right Now
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                If flood water is rising or cyclone winds are strong in your area, please follow these safety steps immediately to protect yourself and your family.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onPlayAlarm}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-red-600/30 transition-all"
            >
              <Volume2 className="w-4 h-4 animate-bounce" />
              Test Warning Sound
            </button>
            <a
              href="tel:112"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call 112 (National SOS)
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid: Alerts list on left, Step-by-step guide on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Disaster Alerts List */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Bell className="w-4 h-4 text-red-400" />
            Active Warning Areas ({hazards.length})
          </h3>

          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {hazards.map((hazard) => {
              const sev = SEVERITY_LEVELS[hazard.severity] || SEVERITY_LEVELS.HIGH;
              const isSelected = activeAlertId === hazard.id;

              return (
                <div
                  key={hazard.id}
                  onClick={() => {
                    setActiveAlertId(hazard.id);
                    onSelectHazard(hazard);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-red-500/80 shadow-lg shadow-red-500/10 ring-1 ring-red-500'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${sev.bgClass}`}>
                      {sev.badge}
                    </span>
                    <span className="text-[10px] font-bold text-amber-400 font-mono">
                      Danger: {hazard.riskScore}/100
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {hazard.title}
                  </h4>

                  <p className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
                    {hazard.state} · {hazard.districts?.join(', ')}
                  </p>

                  <p className="text-xs text-cyan-300 font-medium">
                    {sev.simpleAdvice}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Step-by-Step Action Guide */}
        {selectedAlert && (
          <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-6 lg:p-8 border border-slate-800 shadow-xl space-y-6">
            
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-cyan-400">
                  SAFETY CHECKLIST & EMERGENCY CONTACTS
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${severityInfo.bgClass}`}>
                  {selectedAlert.severity}
                </span>
              </div>
              <h3 className="text-xl font-black text-white font-display mb-1">
                {selectedAlert.title}
              </h3>
              <p className="text-xs text-slate-400">
                Instructions for families living in {selectedAlert.state}
              </p>
            </div>

            {/* Big Action Callout */}
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40 text-xs sm:text-sm text-red-200 leading-relaxed">
              <div className="font-bold text-red-400 uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                WHAT YOU MUST DO IMMEDIATELY:
              </div>
              {selectedAlert.ndrfResponse?.immediateAction}
            </div>

            {/* Quick Button to View Nearby Hospitals & Police */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-emerald-400">
                  🏥 Need Nearest Hospital or Police Station?
                </h4>
                <p className="text-xs text-slate-300">
                  See the closest emergency doctors, ambulances, and police contacts near this area.
                </p>
              </div>
              <button
                onClick={() => onOpenEmergency(selectedAlert)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide whitespace-nowrap shadow-md transition-all"
              >
                Find Hospitals & Police
              </button>
            </div>

            {/* Simple DO'S & DON'TS (Everyday Language) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* DO's */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> DO'S (Safe Things to Do)
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li>✅ <strong>Keep a small bag ready:</strong> Pack water bottle, biscuits, torch, medicines, and Aadhaar card.</li>
                  <li>✅ <strong>Switch off electricity:</strong> Turn off main power switch before water enters the house.</li>
                  <li>✅ <strong>Drink clean water:</strong> Boil water before drinking to avoid stomach sickness.</li>
                  <li>✅ <strong>Charge your mobile phone:</strong> Keep phone battery full and keep emergency numbers saved.</li>
                </ul>
              </div>

              {/* DON'TS */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> DON'TS (Things NOT to Do)
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li>❌ <strong>Never walk in flood water:</strong> Fast-moving water even 6 inches deep can knock you down.</li>
                  <li>❌ <strong>Do not touch electric wires:</strong> Broken or hanging wires in water can cause severe shocks.</li>
                  <li>❌ <strong>Do not drive through flooded roads:</strong> Water can hide big holes and wash away cars.</li>
                  <li>❌ <strong>Do not believe rumors:</strong> Only listen to police and official government news.</li>
                </ul>
              </div>

            </div>

            {/* Emergency Hotline Telephone Numbers (Ordered by Priority) */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> Important Emergency Phone Numbers:
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                <a href="tel:112" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500 text-center block">
                  <div className="text-red-400 font-bold text-sm">112</div>
                  <div className="text-[10px] text-slate-400">National SOS</div>
                </a>
                <a href="tel:108" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500 text-center block">
                  <div className="text-emerald-400 font-bold text-sm">108</div>
                  <div className="text-[10px] text-slate-400">Ambulance</div>
                </a>
                <a href="tel:100" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500 text-center block">
                  <div className="text-blue-400 font-bold text-sm">100</div>
                  <div className="text-[10px] text-slate-400">Police Help</div>
                </a>
                <a href="tel:101" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-orange-500 text-center block">
                  <div className="text-orange-400 font-bold text-sm">101</div>
                  <div className="text-[10px] text-slate-400">Fire & Boats</div>
                </a>
                <a href="tel:1070" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500 text-center block">
                  <div className="text-purple-400 font-bold text-sm">1070</div>
                  <div className="text-[10px] text-slate-400">State Disaster</div>
                </a>
                <a href="tel:1077" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-yellow-500 text-center block">
                  <div className="text-yellow-400 font-bold text-sm">1077</div>
                  <div className="text-[10px] text-slate-400">District Office</div>
                </a>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
