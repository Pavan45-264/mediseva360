import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  UserPlus,
  Play,
  RotateCcw,
  Building2,
  ShieldAlert,
  ArrowRight,
  Filter,
  CreditCard,
  Banknote,
  FileText,
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function StaffPortalView() {
  const {
    staffTab,
    setStaffTab,
    staffQueue,
    staffStats,
    staffCallNext,
    simulateQueueAdvancement,
    setIsWalkInModalOpen,
    setPortalMode,
    t
  } = useApp();

  const [triageFilter, setTriageFilter] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  // Currently serving patient in consultation
  const activeServing = staffQueue.find(p => p.status === 'In Consultation');

  // Queue filtered by triage and department
  const filteredQueue = useMemo(() => {
    return staffQueue.filter(patient => {
      if (triageFilter !== 'All') {
        if (triageFilter === 'Waiting' && patient.status !== 'Waiting') return false;
        if (triageFilter === 'In Consultation' && patient.status !== 'In Consultation') return false;
        if (triageFilter === 'Completed' && patient.status !== 'Completed') return false;
        if (['Emergency', 'High', 'Moderate', 'Low', 'Unclassified'].includes(triageFilter)) {
          if (patient.triageLevel !== triageFilter) return false;
        }
      }

      if (selectedDept !== 'All Departments' && patient.department !== selectedDept) {
        return false;
      }

      return true;
    });
  }, [staffQueue, triageFilter, selectedDept]);

  return (
    <div className="pb-24 pt-2 px-4 space-y-4 animate-fadeIn">
      {/* 1. HOME TAB */}
      {staffTab === 'home' && (
        <div className="space-y-4">
          {/* Staff Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#44475B] dark:text-white">
                Good morning, Dr. R. Sharma
              </h2>
              <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">
                Apollo Hospitals Jubilee Hills • Cardiology OPD Block B
              </p>
            </div>
            <button
              onClick={() => setIsWalkInModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center space-x-1 shadow-sm active:scale-95 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t('registerWalkIn')}</span>
            </button>
          </div>

          {/* GROWW-STYLE TODAY'S COLLECTION CARD */}
          <div className="rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] p-4 shadow-groww-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#7C7E8C] dark:text-[#9A9A9A]">
                Today's Collection (Hospital OPD)
              </span>
              <span className="text-[11px] font-bold text-[#00B386] flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                ▲ ₹{staffStats.collectionDelta.toLocaleString()} (+{staffStats.percentDelta}%)
              </span>
            </div>

            <div className="text-3xl font-extrabold text-[#44475B] dark:text-white tracking-tight">
              ₹ {staffStats.todayCollection.toLocaleString('en-IN')}
            </div>

            {/* Split breakdown: UPI, Cash, Card */}
            <div className="pt-2.5 border-t border-[#E8E8EC] dark:border-[#2C2C2C] grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-[#F5F6F8] dark:bg-[#222222]">
                <span className="text-[10px] text-[#7C7E8C]">UPI / QR</span>
                <p className="font-bold text-[#00B386] mt-0.5">₹{staffStats.upiAmount.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-xl bg-[#F5F6F8] dark:bg-[#222222]">
                <span className="text-[10px] text-[#7C7E8C]">Cash</span>
                <p className="font-bold text-[#44475B] dark:text-white mt-0.5">₹{staffStats.cashAmount.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-xl bg-[#F5F6F8] dark:bg-[#222222]">
                <span className="text-[10px] text-[#7C7E8C]">Cards / Online</span>
                <p className="font-bold text-[#5367FF] mt-0.5">₹{staffStats.cardAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Horizontally Scrolling Stat Cards */}
          <div className="flex space-x-2.5 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
            {[
              { label: 'Total Tokens', value: staffStats.totalTokensToday, color: 'text-[#44475B] dark:text-white' },
              { label: 'Waiting', value: staffStats.waitingCount, color: 'text-[#FFA24C]' },
              { label: 'In Consultation', value: staffStats.inConsultationCount, color: 'text-[#00B386]' },
              { label: 'Completed', value: staffStats.completedCount, color: 'text-[#5367FF]' },
              { label: 'Emergency', value: staffStats.emergencyCount, color: 'text-[#EB5B3C]' },
              { label: 'Cancelled', value: staffStats.cancelledCount, color: 'text-[#7C7E8C]' }
            ].map((stat, i) => (
              <div
                key={i}
                className="min-w-[110px] p-3 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] text-center shadow-groww-card flex-shrink-0"
              >
                <span className="text-[10px] text-[#7C7E8C] line-clamp-1">{stat.label}</span>
                <div className={`text-xl font-bold mt-1 ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Currently Serving Patient Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#00D09C] shadow-groww-card space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
              <span className="text-xs font-bold text-[#00B386] flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#00D09C] mr-1.5 animate-pulse" />
                NOW IN CONSULTATION
              </span>
              <span className="text-xs font-bold text-[#5367FF]">Room 204</span>
            </div>

            {activeServing ? (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#44475B] dark:text-white">
                    Token #{activeServing.tokenNumber} — {activeServing.patientName}
                  </h3>
                  <p className="text-xs text-[#7C7E8C]">
                    {activeServing.patientAge}y, {activeServing.patientGender} • {activeServing.bookingType}
                  </p>
                  <p className="text-xs text-[#44475B] dark:text-slate-300 mt-1">
                    Symptoms: {activeServing.symptoms}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeServing.triageLevel === 'Emergency'
                      ? 'bg-[#FDEEEA] text-[#EB5B3C]'
                      : activeServing.triageLevel === 'High'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-[#E6F9F4] text-[#00B386]'
                  }`}>
                    {activeServing.triageLevel}
                  </span>
                  <p className="text-[10px] text-[#7C7E8C] mt-1">{activeServing.paymentStatus}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-[#7C7E8C]">
                No patient in consultation right now. Click "Call next" to call the first waiting token.
              </div>
            )}

            {/* Sticky/Primary Green Button: CALL NEXT */}
            <button
              onClick={staffCallNext}
              className="w-full h-11 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-md active:scale-[0.99] transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t('callNext')} (Advance Queue)</span>
            </button>
          </div>

          {/* Quick Queue Preview Link */}
          <div
            onClick={() => setStaffTab('queue')}
            className="p-3 bg-[#F5F6F8] dark:bg-[#1B1B1B] rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-between cursor-pointer hover:border-[#5367FF]"
          >
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#5367FF]" />
              <span className="text-xs font-semibold text-[#44475B] dark:text-white">
                View Full Patient Queue ({staffQueue.filter(p => p.status === 'Waiting').length} waiting)
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7C7E8C]" />
          </div>
        </div>
      )}

      {/* 2. QUEUE TAB (Full Live OPD Management) */}
      {staffTab === 'queue' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#44475B] dark:text-white">
                OPD Live Queue
              </h2>
              <p className="text-[11px] text-[#7C7E8C]">Real-time clinical triage order</p>
            </div>
            <button
              onClick={() => setIsWalkInModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-[#00D09C] text-white font-bold text-xs flex items-center space-x-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Walk-in</span>
            </button>
          </div>

          {/* Pill Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
            {[
              'All',
              'Waiting',
              'In Consultation',
              'Completed',
              'Emergency',
              'High',
              'Moderate',
              'Low',
              'Unclassified'
            ].map(filter => (
              <button
                key={filter}
                onClick={() => setTriageFilter(filter)}
                className={`px-3 py-1 text-xs font-semibold rounded-full flex-shrink-0 transition-all ${
                  triageFilter === filter
                    ? 'bg-[#00D09C] text-white shadow-xs'
                    : 'bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#7C7E8C] hover:text-[#44475B]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Clinical Operational Aid Disclaimer (Required by Prompt!) */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 flex items-start space-x-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Clinical Notice:</strong> This queue is an operational aid and does not replace professional medical assessment. Emergency triage overrides take immediate clinical priority.
            </div>
          </div>

          {/* Queue List */}
          <div className="space-y-2.5">
            {filteredQueue.map(patient => (
              <div
                key={patient.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  patient.status === 'In Consultation'
                    ? 'border-[#00D09C] bg-[#E6F9F4]/40 dark:bg-emerald-950/30'
                    : patient.triageLevel === 'Emergency'
                    ? 'border-[#EB5B3C] bg-[#FDEEEA]/40 dark:bg-rose-950/30'
                    : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-white dark:bg-[#1B1B1B]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-base font-extrabold text-[#44475B] dark:text-white">
                      #{patient.tokenNumber}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#44475B] dark:text-white">
                        {patient.patientName}
                      </h4>
                      <p className="text-[11px] text-[#7C7E8C]">
                        {patient.patientAge}y, {patient.patientGender} • {patient.bookingType} ({patient.checkInTime})
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    patient.triageLevel === 'Emergency'
                      ? 'bg-[#FDEEEA] text-[#EB5B3C]'
                      : patient.triageLevel === 'High'
                      ? 'bg-amber-100 text-amber-800'
                      : patient.triageLevel === 'Moderate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-[#E6F9F4] text-[#00B386]'
                  }`}>
                    {patient.triageLevel}
                  </span>
                </div>

                <p className="text-xs text-[#44475B] dark:text-slate-300 mt-2 bg-[#F5F6F8] dark:bg-[#222222] p-2 rounded-lg">
                  <strong>Notes:</strong> {patient.symptoms}
                </p>

                <div className="mt-2.5 pt-2 border-t border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-between text-xs">
                  <span className={`font-semibold ${
                    patient.status === 'Completed'
                      ? 'text-[#7C7E8C]'
                      : patient.status === 'In Consultation'
                      ? 'text-[#00B386]'
                      : 'text-[#FFA24C]'
                  }`}>
                    Status: {patient.status}
                  </span>

                  {patient.status === 'Waiting' && (
                    <button
                      onClick={staffCallNext}
                      className="px-3 py-1 rounded-lg bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs shadow-xs"
                    >
                      Call Patient
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Bottom Call Next Button */}
          <div className="sticky bottom-16 left-0 right-0 pt-2">
            <button
              onClick={staffCallNext}
              className="w-full h-12 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center space-x-2 active:scale-98 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t('callNext')} Patient Token</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. APPOINTMENTS TAB */}
      {staffTab === 'appointments' && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#44475B] dark:text-white">
            Appointment Records
          </h2>
          <p className="text-xs text-[#7C7E8C]">All online and walk-in OPD registrations for today</p>
          <div className="space-y-2">
            {staffQueue.map(p => (
              <div key={p.id} className="p-3 bg-white dark:bg-[#1B1B1B] rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold">Token #{p.tokenNumber}</span> — {p.patientName}
                  <p className="text-[11px] text-[#7C7E8C]">{p.department} • {p.phone}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#00B386]">₹{p.fee}</span>
                  <p className="text-[10px] text-[#7C7E8C]">{p.paymentStatus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PROFILE TAB (Staff Account & Financial Terminal) */}
      {staffTab === 'profile' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-[#E6F9F4] text-[#00B386] flex items-center justify-center font-bold text-base border border-[#00D09C]">
                RS
              </div>
              <div>
                <h3 className="font-bold text-base text-[#44475B] dark:text-white">Dr. R. Sharma</h3>
                <p className="text-xs text-[#7C7E8C]">Staff ID: MED-APOLLO-9821</p>
              </div>
            </div>
          </div>

          {/* Rows: Today's Payments, Reports, Staff & Permissions */}
          <div className="divide-y divide-[#E8E8EC] dark:divide-[#2C2C2C] bg-white dark:bg-[#1B1B1B] rounded-2xl border border-[#E8E8EC] dark:border-[#2C2C2C] overflow-hidden">
            {[
              { label: "Today's Payments Breakdown", sub: `₹${staffStats.todayCollection.toLocaleString()}` },
              { label: "UPI & QR Reconciliation", sub: "32 transactions" },
              { label: "Reports & OPD Analytics", sub: "Daily summary PDF" },
              { label: "Doctors & Department Rosters", sub: "Cardiology, General, Ped" },
              { label: "Staff & Role Permissions", sub: "ABDM Role: Clinician / Admin" },
              { label: "Hospital ABDM HFR Node", sub: "IN-TG-004812-APOLLO" }
            ].map((row, idx) => (
              <div key={idx} className="p-3.5 flex items-center justify-between text-xs hover:bg-[#F5F6F8] dark:hover:bg-[#222222] cursor-pointer">
                <div>
                  <h4 className="font-semibold text-[#44475B] dark:text-white">{row.label}</h4>
                  <p className="text-[11px] text-[#7C7E8C]">{row.sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#7C7E8C]" />
              </div>
            ))}
          </div>

          <button
            onClick={() => setPortalMode('patient')}
            className="w-full py-3 rounded-xl border border-[#5367FF] text-[#5367FF] font-bold text-xs hover:bg-[#EEF0FF] transition-all"
          >
            Exit Staff Portal → Return to Patient Mode
          </button>
        </div>
      )}
    </div>
  );
}
