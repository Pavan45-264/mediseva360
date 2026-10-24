import React, { useState } from 'react';
import {
  Phone, MapPin, ShieldAlert, HeartPulse, Shield,
  Flame, Home, AlertTriangle, CheckCircle, Navigation,
  ExternalLink, Search
} from 'lucide-react';

export default function NearbyEmergencyHelp({
  hazards = [],
  selectedHazard = null,
  onSelectHazard = () => {}
}) {
  const [activeHazardId, setActiveHazardId] = useState(
    selectedHazard?.id || (hazards[0]?.id || '')
  );

  const currentHazard = hazards.find((h) => h.id === activeHazardId) || hazards[0];
  const services = currentHazard?.emergencyServices;

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1920px] mx-auto">
      
      {/* Top Banner: Big Quick Call Buttons */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 rounded-2xl p-6 lg:p-8 border-2 border-red-500 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-red-600 text-white">
                EMERGENCY NUMBERS (ALL OVER INDIA)
              </span>
              <span className="text-xs text-red-400 font-bold">Free Toll-Free Calls (No Balance Needed)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              Need Help Right Now? Call These Numbers Immediately
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              If you or your family are in danger, tap any of the buttons below to call immediately from your phone.
            </p>
          </div>
        </div>

        {/* 4 Big Emergency Dialers (Ordered correctly by priority) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          
          {/* 1. All-in-One Emergency */}
          <a
            href="tel:112"
            className="p-4 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all shadow-lg shadow-red-600/30 flex flex-col items-center text-center group"
          >
            <ShieldAlert className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
            <div className="text-xs uppercase font-extrabold tracking-wider">ALL EMERGENCIES</div>
            <div className="text-2xl sm:text-3xl font-black font-mono">112</div>
            <div className="text-[10px] text-red-100 mt-0.5">National Emergency Helpline</div>
          </a>

          {/* 2. Ambulance & Hospital */}
          <a
            href="tel:108"
            className="p-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/30 flex flex-col items-center text-center group"
          >
            <HeartPulse className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
            <div className="text-xs uppercase font-extrabold tracking-wider">AMBULANCE & HOSPITAL</div>
            <div className="text-2xl sm:text-3xl font-black font-mono">108</div>
            <div className="text-[10px] text-emerald-100 mt-0.5">Medical & Doctor Help</div>
          </a>

          {/* 3. Police Station */}
          <a
            href="tel:100"
            className="p-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/30 flex flex-col items-center text-center group"
          >
            <Shield className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
            <div className="text-xs uppercase font-extrabold tracking-wider">POLICE CONTROL</div>
            <div className="text-2xl sm:text-3xl font-black font-mono">100</div>
            <div className="text-[10px] text-blue-100 mt-0.5">Police & Security Protection</div>
          </a>

          {/* 4. Fire & Flood Rescue */}
          <a
            href="tel:101"
            className="p-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-lg shadow-orange-600/30 flex flex-col items-center text-center group"
          >
            <Flame className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
            <div className="text-xs uppercase font-extrabold tracking-wider">FIRE & RESCUE BOATS</div>
            <div className="text-2xl sm:text-3xl font-black font-mono">101</div>
            <div className="text-[10px] text-orange-100 mt-0.5">Fire Brigade & Boats</div>
          </a>

        </div>
      </div>

      {/* Location Selector: Choose which disaster area to see services for */}
      <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-500" />
              Showing Emergency Help for Disaster Area:
            </h3>
            <p className="text-xs text-slate-400">
              Select your region below to see the closest hospitals, police stations, and safe shelters.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {hazards.map((h) => (
              <button
                key={h.id}
                onClick={() => {
                  setActiveHazardId(h.id);
                  onSelectHazard(h);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeHazardId === h.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {h.state} ({h.location.split(',')[0]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {currentHazard && services ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: 1. Nearest Hospitals & 2. Nearest Police Stations */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Nearest Hospitals & Clinics */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      1. Nearest Hospitals & Emergency Clinics
                    </h3>
                    <p className="text-xs text-slate-400">
                      Doctors and 24-hour emergency beds available here
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  24x7 OPEN
                </span>
              </div>

              <div className="space-y-3">
                {services.hospitals?.map((hosp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-emerald-400 font-mono">
                          📍 {hosp.distance}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {hosp.bedsAvailable}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-0.5">
                        {hosp.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {hosp.type} · {hosp.address}
                      </p>
                    </div>

                    <a
                      href={`tel:${hosp.phone.replace(/[^0-9]/g, '')}`}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-md transition-all whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4" />
                      Call {hosp.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Nearest Police Stations */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      2. Nearest Police Stations
                    </h3>
                    <p className="text-xs text-slate-400">
                      Contact for security, rescue coordination, and road safety
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                  POLICE DISPATCH
                </span>
              </div>

              <div className="space-y-3">
                {services.policeStations?.map((pol, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-blue-400 font-mono">
                          📍 {pol.distance}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-0.5">
                        {pol.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {pol.address}
                      </p>
                    </div>

                    <a
                      href={`tel:${pol.phone.replace(/[^0-9]/g, '')}`}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide shadow-md transition-all whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4" />
                      Call {pol.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: 3. Safe Relief Camps & 4. Fire/Rescue Squad */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 3. Nearest Safe Shelters & Relief Camps */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      3. Nearest Safe Shelters (Relief Camps)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Concrete safe buildings with clean water and food
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {services.safeShelters?.map((shelter, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">
                        {shelter.name}
                      </h4>
                      <span className="text-xs font-mono font-bold text-purple-400">
                        {shelter.distance}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">
                      Capacity: <strong className="text-white">{shelter.capacity}</strong>
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-mono">
                        Contact: {shelter.phone}
                      </span>
                      <a
                        href={`tel:${shelter.phone.replace(/[^0-9]/g, '')}`}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
                      >
                        Call Shelter
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Fire & Rescue Boats */}
            {services.fireStations && services.fireStations.length > 0 && (
              <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      4. Fire Brigade & Flood Rescue Boats
                    </h3>
                    <p className="text-xs text-slate-400">
                      For boat rescues, fallen trees, and fire incidents
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {services.fireStations.map((fire, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5">
                          {fire.name}
                        </h4>
                        <div className="text-xs text-slate-400 font-mono">
                          📍 {fire.distance} · {fire.boatsReady}
                        </div>
                      </div>

                      <a
                        href="tel:101"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-wide shadow-md transition-all whitespace-nowrap"
                      >
                        <Phone className="w-4 h-4" />
                        Call 101
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Simple Step-by-Step Guide When Calling */}
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> What to Say When You Call for Help:
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>1. <strong>Your Exact Location:</strong> Tell the officer your house address or landmark.</li>
                <li>2. <strong>Who is With You:</strong> Tell them if children or elderly people need help.</li>
                <li>3. <strong>Your Phone Number:</strong> Keep your line free so the rescue team can call back.</li>
              </ul>
            </div>

          </div>

        </div>
      ) : (
        <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-sm">
          Please select an active disaster from above to see nearby emergency hospitals and police stations.
        </div>
      )}

    </div>
  );
}
