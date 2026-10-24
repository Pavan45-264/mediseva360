import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTORS_DATA } from '../data/doctorsData';
import {
  X,
  Star,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Bookmark,
  Share2,
  Navigation,
  ChevronRight,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export default function HospitalDetailModal() {
  const {
    selectedHospital,
    isHospitalDetailOpen,
    closeHospitalDetail,
    openBookingModal,
    savedHospitals,
    toggleSaveHospital,
    t
  } = useApp();

  const [activeTimeframe, setActiveTimeframe] = useState('today'); // 'today' | '7d' | '1m' | '1y'
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'doctors' | 'departments' | 'location'

  if (!isHospitalDetailOpen || !selectedHospital) return null;

  const isSaved = savedHospitals.includes(selectedHospital.id);

  // Doctors affiliated with this hospital
  const hospitalDoctors = DOCTORS_DATA.filter(doc => doc.hospitalId === selectedHospital.id);

  // Chart data according to selected timeframe chip
  const chartData = selectedHospital.waitHistory
    ? selectedHospital.waitHistory[activeTimeframe] || selectedHospital.waitHistory.today
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg max-h-[92vh] bg-white dark:bg-[#121212] rounded-t-3xl sm:rounded-3xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal flex flex-col overflow-hidden animate-slideUp">
        
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-between">
          <button
            onClick={closeHospitalDetail}
            className="p-1.5 rounded-full hover:bg-[#F5F6F8] dark:hover:bg-[#1B1B1B] text-[#7C7E8C]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleSaveHospital(selectedHospital.id)}
              className={`p-2 rounded-full border transition-all ${
                isSaved
                  ? 'border-[#00D09C] bg-[#E6F9F4] text-[#00B386]'
                  : 'border-[#E8E8EC] dark:border-[#2C2C2C] text-[#7C7E8C]'
              }`}
              title="Save to Watchlist"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: selectedHospital.name, url: window.location.href });
                } else {
                  alert("Link copied to clipboard!");
                }
              }}
              className="p-2 rounded-full border border-[#E8E8EC] dark:border-[#2C2C2C] text-[#7C7E8C] hover:bg-[#F5F6F8]"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          
          {/* Hospital Header (Groww Stock Header style) */}
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              {selectedHospital.isGovt && (
                <span className="text-[11px] font-bold text-[#00897B] bg-[#E0F2F1] dark:bg-teal-950/60 px-2 py-0.5 rounded-full flex items-center">
                  🏛️ Govt Healthcare Facility
                </span>
              )}
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B386] bg-[#E6F9F4] dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                {selectedHospital.type}
              </span>
              {selectedHospital.abhaCompliant && (
                <span className="text-[11px] font-medium text-[#5367FF] bg-[#EEF0FF] dark:bg-indigo-950/60 px-2 py-0.5 rounded-full flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  {selectedHospital.abdmId}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#44475B] dark:text-white mt-1.5 leading-snug">
              {selectedHospital.name}
            </h1>
            
            <p className="text-xs text-[#7C7E8C] dark:text-[#9A9A9A] mt-0.5">
              {selectedHospital.address}, {selectedHospital.city} - {selectedHospital.pin}
            </p>

            <div className="flex items-center space-x-3 mt-2">
              <span className="flex items-center text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-current mr-1" />
                {selectedHospital.rating}
              </span>
              <span className="text-xs text-[#7C7E8C]">
                {selectedHospital.reviewCount.toLocaleString()} ratings
              </span>
              {selectedHospital.emergency24x7 && (
                <span className="text-xs font-bold text-[#EB5B3C] bg-[#FDEEEA] dark:bg-rose-950/50 px-2 py-0.5 rounded-full">
                  24x7 Emergency Trauma
                </span>
              )}
            </div>
          </div>

          {/* GROWW-STYLE LIVE WAIT TIME CHART (Replaces Stock Price Chart!) */}
          <div className="p-3.5 rounded-2xl bg-[#F5F6F8] dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C]">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">Current Avg Wait Time</span>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-2xl font-bold text-[#44475B] dark:text-white">
                    {selectedHospital.waitTimeMins} mins
                  </span>
                  <span className={`text-xs font-semibold flex items-center ${
                    selectedHospital.waitTrend === 'down' ? 'text-[#00B386]' : 'text-[#EB5B3C]'
                  }`}>
                    {selectedHospital.waitTrend === 'down' ? '▼' : '▲'} {selectedHospital.deltaMins}m vs avg
                  </span>
                </div>
              </div>

              {/* Timeframe Chips: Today, 7D, 1M, 1Y */}
              <div className="flex items-center space-x-1 bg-white dark:bg-[#121212] p-1 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C]">
                {[
                  { id: 'today', label: 'Today' },
                  { id: '7d', label: '7D' },
                  { id: '1m', label: '1M' },
                  { id: '1y', label: '1Y' }
                ].map(chip => (
                  <button
                    key={chip.id}
                    onClick={() => setActiveTimeframe(chip.id)}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-lg transition-all ${
                      activeTimeframe === chip.id
                        ? 'bg-[#00D09C] text-white shadow-xs'
                        : 'text-[#7C7E8C] hover:text-[#44475B]'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-36 w-full pt-2">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="waitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00D09C" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#00D09C" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey={activeTimeframe === 'today' ? 'time' : activeTimeframe === '7d' ? 'day' : activeTimeframe === '1m' ? 'week' : 'month'}
                      tick={{ fontSize: 9, fill: '#7C7E8C' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis tick={{ fontSize: 9, fill: '#7C7E8C' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="p-2 bg-white dark:bg-[#121212] border border-[#00D09C] rounded-lg shadow-md text-xs">
                              <p className="font-bold text-[#00B386]">{payload[0].value} mins wait</p>
                              {payload[0].payload.footfall && (
                                <p className="text-[10px] text-[#7C7E8C]">{payload[0].payload.footfall} patients</p>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="wait"
                      stroke="#00D09C"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#waitGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-[#7C7E8C]">
                  Live queue telemetry available for onboarded facilities
                </div>
              )}
            </div>
          </div>

          {/* Sub Navigation Chips (Overview, Doctors, Departments, Reviews, Location) */}
          <div className="flex space-x-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C] pb-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'doctors', label: `Doctors (${hospitalDoctors.length})` },
              { id: 'departments', label: 'Departments' },
              { id: 'location', label: 'Location & Contact' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-full flex-shrink-0 transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#EEF0FF] dark:bg-indigo-950/80 text-[#5367FF]'
                    : 'text-[#7C7E8C] hover:text-[#44475B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Specialities</h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedHospital.specialities.map(s => (
                    <span
                      key={s}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#F5F6F8] dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] text-[#44475B] dark:text-white"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#E6F9F4] dark:bg-emerald-950/40 rounded-xl border border-[#00D09C]/20 flex items-start space-x-2.5">
                <Info className="w-4 h-4 text-[#00B386] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[#44475B] dark:text-[#E8E8EC]">
                  <span className="font-bold">ABDM Fast-Track OPD Access:</span> Show your MediQueue digital token at the express entrance counter for instant triage vitals check without standing in physical registration queues.
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: Doctors */}
          {activeTab === 'doctors' && (
            <div className="space-y-2.5">
              {hospitalDoctors.length > 0 ? (
                hospitalDoctors.map(doc => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B] flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#44475B] dark:text-white">{doc.name}</h4>
                      <p className="text-[11px] text-[#7C7E8C]">{doc.speciality} • {doc.qualification}</p>
                      <div className="flex items-center space-x-2 mt-1 text-[10px]">
                        <span className="text-amber-500 font-bold">★ {doc.rating}</span>
                        <span className="text-[#00B386] font-semibold">₹{doc.fee} fee</span>
                        <span className="text-[#5367FF] font-medium">{doc.nextSlot}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => openBookingModal(selectedHospital, doc)}
                      className="px-3 py-1.5 rounded-lg bg-[#00D09C] hover:bg-[#00B386] text-white text-xs font-semibold shadow-xs"
                    >
                      Book
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-[#7C7E8C]">
                  All general OPD physicians are on-duty. Click "Book now" to reserve with the next available specialist.
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: Departments */}
          {activeTab === 'departments' && (
            <div className="space-y-2">
              {selectedHospital.departments.length > 0 ? (
                selectedHospital.departments.map(dept => (
                  <div
                    key={dept.id}
                    className="p-3 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] bg-white dark:bg-[#1B1B1B] flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#5367FF] bg-[#EEF0FF] dark:bg-indigo-950/70 px-1.5 py-0.5 rounded">
                        {dept.code}
                      </span>
                      <h4 className="text-xs font-bold text-[#44475B] dark:text-white mt-1">{dept.name}</h4>
                      <p className="text-[11px] text-[#7C7E8C]">{dept.doctor}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#00B386]">Now Serving: {dept.servingToken}</span>
                      <p className="text-[10px] text-[#7C7E8C]">{dept.waitingCount} waiting • ~{dept.avgWait}m wait</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-[#7C7E8C]">
                  Listed facility. Full department queue integration pending.
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: Location & Contact */}
          {activeTab === 'location' && (
            <div className="space-y-3">
              <div className="p-3 bg-[#F5F6F8] dark:bg-[#1B1B1B] rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] space-y-2">
                <div className="flex items-center space-x-2 text-xs text-[#44475B] dark:text-white">
                  <MapPin className="w-4 h-4 text-[#5367FF]" />
                  <span>{selectedHospital.address}, {selectedHospital.city}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-[#44475B] dark:text-white">
                  <Phone className="w-4 h-4 text-[#00B386]" />
                  <a href={`tel:${selectedHospital.phone}`} className="hover:underline">{selectedHospital.phone}</a>
                </div>
                {selectedHospital.emergencyPhone && (
                  <div className="flex items-center space-x-2 text-xs text-[#EB5B3C] font-semibold">
                    <Phone className="w-4 h-4 text-[#EB5B3C]" />
                    <a href={`tel:${selectedHospital.emergencyPhone}`} className="hover:underline">
                      Emergency: {selectedHospital.emergencyPhone}
                    </a>
                  </div>
                )}
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedHospital.name + ' ' + selectedHospital.city)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl border border-[#5367FF] text-[#5367FF] font-semibold text-xs flex items-center justify-center space-x-1.5 hover:bg-[#EEF0FF] transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          )}
        </div>

        {/* STICKY BOTTOM BUTTON (Groww-Style Full-Width Green Button: #00D09C, 48-52px, bold white) */}
        <div className="p-4 border-t border-[#E8E8EC] dark:border-[#2C2C2C] bg-white dark:bg-[#121212]">
          {selectedHospital.onboarded ? (
            <button
              onClick={() => {
                closeHospitalDetail();
                openBookingModal(selectedHospital);
              }}
              className="w-full h-12 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center space-x-2"
            >
              <span>{t('bookNow')}</span>
              <span>•</span>
              <span>{selectedHospital.consultationFee === 0 ? 'FREE OPD Token' : `₹${selectedHospital.consultationFee}`}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                alert(`Invitation sent to ${selectedHospital.name} administration! We will notify you once onboarded.`);
              }}
              className="w-full h-12 bg-[#5367FF] hover:bg-opacity-90 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.99]"
            >
              {t('inviteHospital')} to MediQueue
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
