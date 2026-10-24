import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import {
  Clock,
  Calendar,
  QrCode,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  MapPin,
  ArrowRight,
  Printer,
  Bell,
  RefreshCw,
  X
} from 'lucide-react';
import {
  calculateArrivalTime,
  getLastUpdatedText,
  getAvailableBookingDates,
  getAvailableTimeSlots
} from '../utils/dateUtils';

export default function AppointmentsView() {
  const {
    t,
    activeToken,
    appointments,
    cancelAppointment,
    rescheduleAppointment,
    openHospitalDetail
  } = useApp();

  const [activeTab, setActiveTab] = useState('token'); // 'token' | 'upcoming' | 'history' | 'cancelled'
  const [showQrModal, setShowQrModal] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [targetAppToReschedule, setTargetAppToReschedule] = useState(null);
  const [selectedNewDate, setSelectedNewDate] = useState(() => getAvailableBookingDates()[1]);
  const [selectedNewSlot, setSelectedNewSlot] = useState("11:30 AM");

  const upcomingList = appointments.filter(a => a.category === 'upcoming');
  const historyList = appointments.filter(a => a.category === 'history');
  const cancelledList = appointments.filter(a => a.category === 'cancelled');

  return (
    <div className="pb-24 pt-2 px-4 space-y-4 animate-fadeIn">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-[#44475B] dark:text-white">
          {t('appointments')}
        </h2>
        <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">
          Live OPD queue tokens, upcoming orders & past visits
        </p>
      </div>

      {/* Tabs Row (Groww Positions · Orders · Holdings pattern) */}
      <div className="flex border-b border-[#E8E8EC] dark:border-[#2C2C2C] overflow-x-auto no-scrollbar">
        {[
          { id: 'token', label: t('todaysToken') },
          { id: 'upcoming', label: `Upcoming (${upcomingList.length})` },
          { id: 'history', label: t('myVisits') },
          { id: 'cancelled', label: `Cancelled (${cancelledList.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-3 text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-[#00D09C] text-[#00B386] dark:text-[#00D09C]'
                : 'border-transparent text-[#7C7E8C] hover:text-[#44475B]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. TODAY'S TOKEN (Positions equivalent) */}
      {activeTab === 'token' && (
        <div className="space-y-4">
          {activeToken ? (
            <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#00D09C]/40 shadow-groww-card space-y-4">
              {/* Header Status */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D09C] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00D09C]"></span>
                  </span>
                  <span className="text-xs font-bold text-[#00B386] dark:text-[#00D09C]">
                    LIVE OPD STATUS • {activeToken.status}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#5367FF] bg-[#EEF0FF] dark:bg-indigo-950/70 px-2 py-0.5 rounded-full">
                  Slot: {activeToken.slotTime}
                </span>
              </div>

              {/* Realtime Queue Telemetry Banner with realistic wait range & arrival time */}
              {(() => {
                const waitMins = activeToken.estimatedWaitMins || 15;
                const minWait = Math.max(3, waitMins - 3);
                const maxWait = waitMins + 4;
                const arrivalTime = calculateArrivalTime(waitMins);
                return (
                  <div className="space-y-2.5">
                    <div className="p-3 bg-gradient-to-r from-[#E6F9F4] to-[#EEF0FF] dark:from-emerald-950/40 dark:to-indigo-950/40 rounded-xl border border-[#00D09C]/40 text-center space-y-1">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#00B386] block">
                        Realtime Queue Telemetry • {getLastUpdatedText()}
                      </span>
                      <div className="text-base font-black text-[#1E3A8A] dark:text-emerald-300">
                        Token #{activeToken.tokenNumber} • Wait Range: {minWait} - {maxWait} mins
                      </div>
                      <div className="text-[11px] font-semibold text-[#5367FF] bg-white/70 dark:bg-black/30 py-0.5 px-2.5 rounded-full inline-block">
                        Recommended Arrival: Arrive by {arrivalTime}
                      </div>
                    </div>

                    {/* Turn Approaching Alert Banner */}
                    {activeToken.tokensAhead <= 2 ? (
                      <div className="p-3 bg-gradient-to-r from-amber-500/20 to-rose-500/20 border-2 border-amber-500 dark:border-amber-400 rounded-xl flex items-start space-x-2.5 animate-pulse">
                        <Bell className="w-5 h-5 text-amber-600 dark:text-amber-300 flex-shrink-0 mt-0.5 fill-current" />
                        <div>
                          <h4 className="text-xs font-black text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                            🔔 Turn Approaching!
                          </h4>
                          <p className="text-xs text-amber-950 dark:text-amber-100 font-bold mt-0.5">
                            Only {activeToken.tokensAhead} patient{activeToken.tokensAhead === 1 ? '' : 's'} ahead of you.
                          </p>
                          <p className="text-[10px] text-amber-800 dark:text-amber-300">
                            Please wait directly near {activeToken.roomNo}.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 bg-[#F5F6F8] dark:bg-[#222222] rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2 text-[#7C7E8C]">
                          <Clock className="w-4 h-4 text-[#00D09C]" />
                          <span>Arrive 10m before turn: <strong>{arrivalTime}</strong></span>
                        </div>
                        <span className="text-[10px] text-[#00B386] font-bold">ABDM Fast-Track</span>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Big Token Display */}
              <div className="grid grid-cols-2 gap-3 text-center bg-[#F5F6F8] dark:bg-[#222222] p-4 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C]">
                <div className="border-r border-[#E8E8EC] dark:border-[#2C2C2C] pr-2">
                  <span className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">Your Token</span>
                  <div className="text-3xl font-black text-[#44475B] dark:text-white mt-1">
                    {activeToken.tokenNumber}
                  </div>
                  <span className="text-[10px] text-[#7C7E8C]">{activeToken.patientName}</span>
                </div>

                <div className="pl-2">
                  <span className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">Now Serving</span>
                  <div className="text-3xl font-black text-[#00B386] dark:text-[#00D09C] mt-1">
                    {activeToken.currentServingToken}
                  </div>
                  <span className="text-[10px] text-[#FFA24C] font-semibold">
                    ~{Math.max(3, activeToken.estimatedWaitMins - 3)}-{activeToken.estimatedWaitMins + 4}m wait ({activeToken.tokensAhead} ahead)
                  </span>
                </div>
              </div>

              {/* Clinic and Room details */}
              <div className="space-y-1.5 text-xs text-[#44475B] dark:text-white">
                <div className="flex justify-between">
                  <span className="text-[#7C7E8C]">Hospital:</span>
                  <span className="font-semibold">{activeToken.hospitalName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7C7E8C]">Department:</span>
                  <span className="font-semibold">{activeToken.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7C7E8C]">Doctor:</span>
                  <span className="font-semibold">{activeToken.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7C7E8C]">Consultation Room:</span>
                  <span className="font-semibold text-[#5367FF]">{activeToken.roomNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7C7E8C]">Triage Level:</span>
                  <span className="font-semibold text-[#FFA24C]">{activeToken.triageLevel}</span>
                </div>
              </div>

              {/* Action Buttons: Pass, Reschedule & Cancel */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => setShowQrModal(true)}
                  className="py-2.5 rounded-xl bg-[#EEF0FF] dark:bg-indigo-950/70 text-[#5367FF] font-semibold text-xs flex items-center justify-center space-x-1 border border-[#5367FF]/20 hover:bg-[#5367FF] hover:text-white transition-all"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QR Pass</span>
                </button>

                <button
                  onClick={() => {
                    setTargetAppToReschedule(activeToken);
                    setSelectedNewDate(getAvailableBookingDates()[1]);
                    setRescheduleModalOpen(true);
                  }}
                  className="py-2.5 rounded-xl bg-[#E6F9F4] dark:bg-emerald-950/60 text-[#00B386] font-semibold text-xs flex items-center justify-center space-x-1 border border-[#00D09C]/30 hover:bg-[#00D09C] hover:text-white transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reschedule</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to cancel this token? ₹450 will be refunded to your MediQueue Wallet.")) {
                      cancelAppointment(activeToken.id);
                    }
                  }}
                  className="py-2.5 rounded-xl border border-[#EB5B3C]/30 text-[#EB5B3C] font-semibold text-xs hover:bg-[#FDEEEA] transition-all text-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-[#1B1B1B] rounded-2xl border border-[#E8E8EC] dark:border-[#2C2C2C] space-y-3">
              <Clock className="w-10 h-10 text-[#7C7E8C] mx-auto opacity-50" />
              <h4 className="text-sm font-bold text-[#44475B] dark:text-white">No active token for today</h4>
              <p className="text-xs text-[#7C7E8C] max-w-xs mx-auto">
                Explore nearby hospitals or book a confirmed digital OPD appointment to get your live queue number.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 2. UPCOMING APPOINTMENTS */}
      {activeTab === 'upcoming' && (
        <div className="space-y-3">
          {upcomingList.length > 0 ? (
            upcomingList.map(app => (
              <div
                key={app.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card space-y-2"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
                  <span className="text-xs font-bold text-[#5367FF]">{app.date} at {app.timeSlot}</span>
                  <span className="text-[10px] font-semibold text-[#00B386] bg-[#E6F9F4] px-2 py-0.5 rounded-full">
                    Confirmed
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#44475B] dark:text-white">{app.doctorName}</h4>
                <p className="text-xs text-[#7C7E8C]">{app.department} • {app.hospitalName}</p>
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-[#7C7E8C]">Patient: <strong className="text-[#44475B] dark:text-white">{app.patientName}</strong></span>
                  <span className="font-bold text-[#44475B] dark:text-white">Fee: ₹{app.fee}</span>
                </div>
                <div className="pt-2 border-t border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-end space-x-2">
                  <button
                    onClick={() => {
                      setTargetAppToReschedule(app);
                      setSelectedNewDate(getAvailableBookingDates()[1]);
                      setRescheduleModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#E6F9F4] text-[#00B386] font-semibold text-[11px] hover:bg-[#00D09C] hover:text-white transition-all"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to cancel appointment with ${app.doctorName}?`)) {
                        cancelAppointment(app.id);
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg border border-[#EB5B3C]/30 text-[#EB5B3C] font-semibold text-[11px] hover:bg-[#FDEEEA] transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-[#7C7E8C]">No upcoming scheduled appointments.</div>
          )}
        </div>
      )}

      {/* 3. MY VISITS / HISTORY (Holdings equivalent) */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {historyList.map(app => (
            <div
              key={app.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card space-y-2"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
                <span className="text-xs text-[#7C7E8C]">{app.date}</span>
                <span className="text-[10px] font-semibold text-[#00B386] bg-[#E6F9F4] px-2 py-0.5 rounded-full flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Completed
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#44475B] dark:text-white">{app.doctorName}</h4>
              <p className="text-[11px] text-[#7C7E8C]">{app.department} • {app.hospitalName}</p>
              <div className="pt-2 flex justify-between items-center text-xs">
                <button
                  onClick={() => alert(`Prescription for ${app.doctorName} downloaded!`)}
                  className="text-xs font-semibold text-[#5367FF] flex items-center hover:underline"
                >
                  <FileText className="w-3.5 h-3.5 mr-1" />
                  Download Prescription
                </button>
                <span className="text-xs font-bold text-[#7C7E8C]">Paid: ₹{app.fee}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. CANCELLED VISITS */}
      {activeTab === 'cancelled' && (
        <div className="space-y-3">
          {cancelledList.map(app => (
            <div
              key={app.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] space-y-2"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
                <span className="text-xs text-[#7C7E8C]">{app.date}</span>
                <span className="text-[10px] font-semibold text-[#EB5B3C] bg-[#FDEEEA] px-2 py-0.5 rounded-full flex items-center">
                  <XCircle className="w-3 h-3 mr-1" />
                  Cancelled
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#44475B] dark:text-white">{app.doctorName}</h4>
              <p className="text-[11px] text-[#7C7E8C]">{app.hospitalName}</p>
              <p className="text-[11px] text-[#00B386] font-semibold pt-1">
                ✓ Full refund of ₹{app.fee} credited to MediQueue Wallet
              </p>
            </div>
          ))}
        </div>
      )}

      {/* DIGITAL OPD QR PASS MODAL */}
      {showQrModal && activeToken && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-[#1B1B1B] rounded-3xl p-5 border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal space-y-4 text-center">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00B386]">Official OPD Pass</span>
              <button onClick={() => setShowQrModal(false)} className="text-[#7C7E8C] p-1">✕</button>
            </div>

            {/* Realtime QR Code Pass (Requirement 2) */}
            <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-[#00D09C] inline-block shadow-sm">
              <QRCodeSVG
                value={activeToken.qrCodeData || `MEDIQ-${activeToken.tokenNumber}`}
                size={160}
                level="H"
                includeMargin={true}
              />
              <span className="text-[10px] font-mono font-bold text-slate-500 mt-2 block">
                TOKEN #{activeToken.tokenNumber} • ABDM VERIFIED
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#44475B] dark:text-white">{activeToken.patientName}</h3>
              <p className="text-xs text-[#7C7E8C]">{activeToken.hospitalName}</p>
              <p className="text-xs font-semibold text-[#5367FF] mt-1">{activeToken.department} • {activeToken.doctorName}</p>
              <div className="mt-2 p-2 bg-[#E6F9F4] dark:bg-emerald-950/40 rounded-xl text-xs font-bold text-[#00B386]">
                Your token is #{activeToken.tokenNumber}, about {activeToken.estimatedWaitMins} min wait
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  const printContent = `
                    <html>
                      <head>
                        <title>OPD Pass - ${activeToken.tokenNumber}</title>
                        <style>
                          body { font-family: sans-serif; text-align: center; padding: 25px; color: #1E293B; }
                          .card { border: 2px dashed #00D09C; border-radius: 16px; padding: 20px; max-width: 380px; margin: 0 auto; }
                          .token { font-size: 42px; font-weight: 900; color: #00B386; margin: 10px 0; }
                          .hospital { font-size: 18px; font-weight: bold; color: #1E3A8A; }
                          .wait { background: #E6F9F4; color: #00B386; padding: 8px; border-radius: 8px; font-weight: bold; }
                        </style>
                      </head>
                      <body>
                        <div class="card">
                          <div class="hospital">${activeToken.hospitalName}</div>
                          <div style="font-size:12px;color:#64748B;">ABDM Health Facility Registry Verified OPD Pass</div>
                          <div class="token">Token #${activeToken.tokenNumber}</div>
                          <div class="wait">Your token is #${activeToken.tokenNumber}, about ${activeToken.estimatedWaitMins} min wait</div>
                          <p><strong>Patient:</strong> ${activeToken.patientName}</p>
                          <p><strong>Department:</strong> ${activeToken.department}</p>
                          <p><strong>Doctor:</strong> ${activeToken.doctorName}</p>
                          <p><strong>Slot:</strong> ${activeToken.slotTime} (${activeToken.date})</p>
                          <p><strong>Room:</strong> ${activeToken.roomNo}</p>
                        </div>
                      </body>
                    </html>
                  `;
                  const win = window.open('', '_blank');
                  if (win) {
                    win.document.write(printContent);
                    win.document.close();
                    win.focus();
                    setTimeout(() => win.print(), 250);
                  } else {
                    window.print();
                  }
                }}
                className="py-3 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Token</span>
              </button>

              <button
                onClick={() => {
                  alert("OPD Pass digital copy saved to downloads!");
                  setShowQrModal(false);
                }}
                className="py-3 rounded-xl border border-[#5367FF] text-[#5367FF] font-bold text-xs flex items-center justify-center space-x-1.5 hover:bg-[#EEF0FF] dark:hover:bg-indigo-950/50 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Pass</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModalOpen && targetAppToReschedule && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-[#121212] rounded-t-3xl sm:rounded-3xl border border-[#E8E8EC] dark:border-[#2C2C2C] p-5 space-y-4 shadow-groww-modal animate-slideUp">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-[#00B386]" />
                <h3 className="font-bold text-sm text-[#44475B] dark:text-white">
                  Reschedule Appointment
                </h3>
              </div>
              <button
                onClick={() => {
                  setRescheduleModalOpen(false);
                  setTargetAppToReschedule(null);
                }}
                className="text-[#7C7E8C] hover:text-[#44475B] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-1">
              <p className="font-bold text-[#44475B] dark:text-white">{targetAppToReschedule.doctorName}</p>
              <p className="text-[#7C7E8C]">{targetAppToReschedule.department} • {targetAppToReschedule.hospitalName}</p>
              <p className="text-[11px] text-[#5367FF] font-medium">Currently booked for: {targetAppToReschedule.date} at {targetAppToReschedule.timeSlot || targetAppToReschedule.slotTime}</p>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Select New Date</label>
              <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                {getAvailableBookingDates(6).map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedNewDate(d)}
                    className={`py-1.5 px-1 rounded-xl border text-[11px] text-center font-medium transition-all ${
                      selectedNewDate === d
                        ? 'border-[#00D09C] bg-[#00D09C] text-white font-bold'
                        : 'border-[#E8E8EC] dark:border-[#2C2C2C] text-[#7C7E8C] hover:border-[#00D09C]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Select New Time Window</label>
              <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                {getAvailableTimeSlots(selectedNewDate).map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedNewSlot(slot)}
                    className={`py-1.5 rounded-xl border text-[11px] text-center font-medium transition-all ${
                      selectedNewSlot === slot
                        ? 'border-[#5367FF] bg-[#EEF0FF] dark:bg-indigo-950/70 text-[#5367FF] font-bold'
                        : 'border-[#E8E8EC] dark:border-[#2C2C2C] text-[#44475B] dark:text-white hover:border-[#5367FF]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                rescheduleAppointment(targetAppToReschedule.id, selectedNewDate, selectedNewSlot);
                setRescheduleModalOpen(false);
                setTargetAppToReschedule(null);
              }}
              className="w-full h-11 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98"
            >
              Confirm Reschedule to {selectedNewDate}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
