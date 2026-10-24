import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Calendar,
  QrCode,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  FileText,
  MapPin,
  ArrowRight
} from 'lucide-react';

export default function AppointmentsView() {
  const {
    t,
    activeToken,
    appointments,
    cancelAppointment,
    openHospitalDetail
  } = useApp();

  const [activeTab, setActiveTab] = useState('token'); // 'token' | 'upcoming' | 'history' | 'cancelled'
  const [showQrModal, setShowQrModal] = useState(false);

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
                    ~{activeToken.estimatedWaitMins}m wait ({activeToken.tokensAhead} ahead)
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

              {/* Action Buttons: QR Pass & Cancel */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => setShowQrModal(true)}
                  className="py-2.5 rounded-xl bg-[#EEF0FF] dark:bg-indigo-950/70 text-[#5367FF] font-semibold text-xs flex items-center justify-center space-x-1.5 border border-[#5367FF]/20 hover:bg-[#5367FF] hover:text-white transition-all"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View Digital Pass</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to cancel this token? ₹450 will be refunded to your MediQueue Wallet.")) {
                      cancelAppointment(activeToken.id);
                    }
                  }}
                  className="py-2.5 rounded-xl border border-[#EB5B3C]/30 text-[#EB5B3C] font-semibold text-xs hover:bg-[#FDEEEA] transition-all"
                >
                  Cancel Token
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

            {/* Simulated QR Code Canvas */}
            <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-[#00D09C] inline-block shadow-sm">
              <div className="w-44 h-44 bg-slate-900 rounded-lg p-2.5 flex flex-col justify-between items-center text-white font-mono text-[9px] relative overflow-hidden">
                <div className="w-full flex justify-between">
                  <div className="w-8 h-8 border-2 border-white flex items-center justify-center"><div className="w-4 h-4 bg-white" /></div>
                  <div className="w-8 h-8 border-2 border-white flex items-center justify-center"><div className="w-4 h-4 bg-white" /></div>
                </div>
                <div className="text-center font-bold tracking-widest text-emerald-400">
                  TOKEN {activeToken.tokenNumber}
                </div>
                <div className="w-full flex justify-between">
                  <div className="w-8 h-8 border-2 border-white flex items-center justify-center"><div className="w-4 h-4 bg-white" /></div>
                  <div className="text-[8px] text-slate-300">ABDM VERIFIED</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#44475B] dark:text-white">{activeToken.patientName}</h3>
              <p className="text-xs text-[#7C7E8C]">{activeToken.hospitalName}</p>
              <p className="text-xs font-semibold text-[#5367FF] mt-1">{activeToken.department} • {activeToken.doctorName}</p>
            </div>

            <button
              onClick={() => {
                alert("OPD Pass PDF saved to device downloads!");
                setShowQrModal(false);
              }}
              className="w-full py-3 rounded-xl bg-[#00D09C] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download OPD Pass PDF</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
