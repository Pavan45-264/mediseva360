import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import {
  X,
  PhoneCall,
  Navigation,
  AlertTriangle,
  ShieldAlert,
  Clock,
  MapPin,
  CheckCircle
} from 'lucide-react';

export default function EmergencyModal() {
  const {
    isEmergencyModalOpen,
    setIsEmergencyModalOpen,
    activeAmbulanceRequest,
    requestAmbulance,
    t
  } = useApp();

  if (!isEmergencyModalOpen) return null;

  // 3 nearest 24x7 emergency facilities
  const emergencyHospitals = HOSPITALS_DATA.filter(h => h.emergency24x7).slice(0, 3);

  const handleDispatch108 = (targetHospital = null) => {
    requestAmbulance({
      hospitalId: targetHospital?.id || emergencyHospitals[0].id,
      hospitalName: targetHospital?.name || emergencyHospitals[0].name,
      location: "Current GPS Location (Hyderabad Jubilee Hills)",
      notes: "Emergency 108 trauma request from patient app"
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md max-h-[90vh] bg-white dark:bg-[#121212] rounded-t-3xl sm:rounded-3xl border border-[#EB5B3C]/50 shadow-groww-modal flex flex-col overflow-hidden animate-slideUp">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#EB5B3C] to-[#E04825] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PhoneCall className="w-5 h-5 animate-bounce" />
            <h3 className="font-bold text-base">Emergency SOS 108</h3>
          </div>
          <button
            onClick={() => setIsEmergencyModalOpen(false)}
            className="p-1 rounded-full hover:bg-black/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 no-scrollbar">
          {/* Active Ambulance Tracking Card (Requirement 4) */}
          {activeAmbulanceRequest && (
            <div className="p-4 rounded-2xl bg-slate-900 text-white border-2 border-emerald-400/60 shadow-xl space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  LIVE 108 AMBULANCE DISPATCH
                </span>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                  activeAmbulanceRequest.status === 'Arrived'
                    ? 'bg-emerald-500 text-white'
                    : activeAmbulanceRequest.status === 'En route'
                    ? 'bg-sky-500 text-white animate-pulse'
                    : 'bg-amber-500 text-slate-950'
                }`}>
                  {activeAmbulanceRequest.status === 'En route' ? 'En Route (ETA ' + activeAmbulanceRequest.etaMins + 'm)' : activeAmbulanceRequest.status}
                </span>
              </div>

              <div className="text-sm font-bold">
                Vehicle: {activeAmbulanceRequest.ambulanceNo}
              </div>
              <p className="text-xs text-slate-300">
                Hospital: {activeAmbulanceRequest.hospitalName}
              </p>
              <div className="p-2 bg-slate-800 rounded-xl text-[11px] text-slate-300">
                <strong>Status Update:</strong> {
                  activeAmbulanceRequest.status === 'Arrived'
                    ? 'Ambulance has arrived at patient location! Paramedics are on scene.'
                    : activeAmbulanceRequest.status === 'En route'
                    ? `Ambulance is en route with sirens on. ETA ~${activeAmbulanceRequest.etaMins} minutes.`
                    : 'Dispatch requested. Staff counter is assigning nearest paramedic unit.'
                }
              </div>
            </div>
          )}

          {/* Main 108 Dial Banner */}
          <div className="p-4 rounded-2xl bg-[#FDEEEA] dark:bg-rose-950/40 border border-[#EB5B3C]/40 text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EB5B3C]">
              National Ambulance Service
            </span>
            <div className="text-3xl font-black text-[#EB5B3C]">
              Call 108 (Toll Free)
            </div>
            <p className="text-xs text-[#7C7E8C] dark:text-[#9A9A9A]">
              Free 24x7 medical assistance & emergency ambulance dispatch across all states in India.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:108"
                className="py-3 rounded-xl bg-[#EB5B3C] hover:bg-[#d64b2d] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 108 Now</span>
              </a>

              <button
                onClick={() => handleDispatch108()}
                className="py-3 rounded-xl border border-[#EB5B3C] bg-white dark:bg-slate-900 text-[#EB5B3C] font-bold text-xs hover:bg-[#EB5B3C] hover:text-white transition-all shadow-xs"
              >
                Request 108 Dispatch
              </button>
            </div>
          </div>

          {/* 3 Nearest 24x7 Trauma Hospitals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#44475B] dark:text-white mb-2">
              3 Nearest 24x7 Trauma Units
            </h4>

            <div className="space-y-2.5">
              {emergencyHospitals.map(hosp => (
                <div
                  key={hosp.id}
                  className="p-3 bg-white dark:bg-[#1B1B1B] rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-sm flex items-center justify-between"
                >
                  <div className="max-w-[65%]">
                    <h5 className="font-bold text-xs text-[#44475B] dark:text-white line-clamp-1">{hosp.name}</h5>
                    <p className="text-[11px] text-[#7C7E8C]">{hosp.city} • 24x7 Emergency</p>
                    <span className="text-[10px] text-[#00B386] font-semibold">Avg ER Wait: {hosp.waitTimeMins}m</span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <a
                      href={`tel:${hosp.emergencyPhone || hosp.phone}`}
                      className="p-2 rounded-xl bg-[#FDEEEA] text-[#EB5B3C] hover:bg-[#EB5B3C] hover:text-white transition-colors"
                      title="Direct Emergency Call"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hosp.name + ' ' + hosp.city)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-[#EEF0FF] text-[#5367FF] hover:bg-[#5367FF] hover:text-white transition-colors"
                      title="Google Maps Navigation"
                    >
                      <Navigation className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
