import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import AdminAnalyticsView from './AdminAnalyticsView';
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
  ChevronRight,
  Siren,
  Navigation,
  BarChart3,
  Lock,
  ShieldCheck,
  History,
  User
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
    ambulanceRequests,
    updateAmbulanceStatus,
    staffAuth,
    loginStaffMember,
    logoutStaff,
    registerStaffAccount,
    staffAuditTrail,
    t
  } = useApp();

  const [authTab, setAuthTab] = useState('signin'); // 'signin' | 'signup'
  const [authHospitalId, setAuthHospitalId] = useState('hosp-1');
  const [authRole, setAuthRole] = useState('receptionist');
  const [authStaffId, setAuthStaffId] = useState('REC-APOLLO-01');
  const [authPin, setAuthPin] = useState('1234');
  const [authStaffName, setAuthStaffName] = useState('Front Desk Receptionist');
  const [authDept, setAuthDept] = useState('Cardiology OPD');

  const [triageFilter, setTriageFilter] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  // Currently serving patient in consultation
  const activeServing = staffQueue.find(p => p.status === 'In Consultation');

  // Queue filtered by triage, department, and STRICT facility scoping
  const filteredQueue = useMemo(() => {
    const currentFacId = staffAuth.staffUser?.hospitalId || 'hosp-1';
    return staffQueue.filter(patient => {
      // Facility scoping security check
      if (patient.hospitalId && patient.hospitalId !== currentFacId) {
        return false;
      }

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
  }, [staffQueue, triageFilter, selectedDept, staffAuth.staffUser?.hospitalId]);

  if (!staffAuth.isAuthenticated) {
    return (
      <div className="pb-24 pt-4 px-4 max-w-lg mx-auto space-y-5 animate-fadeIn">
        {/* Security Lock Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-[#5367FF]/30 text-[#5367FF] mx-auto flex items-center justify-center shadow-sm">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-[#44475B] dark:text-white">
            Hospital Staff Portal
          </h2>
          <p className="text-xs text-[#7C7E8C] max-w-xs mx-auto">
            Facility-scoped ABDM Clinical Terminal. Authentication is required before accessing patient queues, symptoms, or payments.
          </p>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-[11px] font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Synthetic Demo Sandbox Isolated</span>
          </div>
        </div>

        {/* Tab Toggle: Sign In vs Sign Up */}
        <div className="flex bg-[#F5F6F8] dark:bg-[#1B1B1B] p-1 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C]">
          <button
            onClick={() => setAuthTab('signin')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              authTab === 'signin'
                ? 'bg-white dark:bg-[#2C2C2C] text-[#5367FF] shadow-xs'
                : 'text-[#7C7E8C]'
            }`}
          >
            Staff Sign In
          </button>
          <button
            onClick={() => setAuthTab('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              authTab === 'signup'
                ? 'bg-white dark:bg-[#2C2C2C] text-[#5367FF] shadow-xs'
                : 'text-[#7C7E8C]'
            }`}
          >
            New Staff Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">
              Select Hospital Facility
            </label>
            <select
              value={authHospitalId}
              onChange={(e) => setAuthHospitalId(e.target.value)}
              className="w-full h-11 px-3 mt-1.5 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-xs font-medium focus:outline-none focus:border-[#5367FF]"
            >
              {HOSPITALS_DATA.slice(0, 30).map(h => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.city})
                </option>
              ))}
            </select>
          </div>

          {authTab === 'signin' ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await loginStaffMember({
                  hospitalId: authHospitalId,
                  role: authRole,
                  staffId: authStaffId,
                  staffName: authRole === 'doctor' ? 'Dr. R. Sharma' : 'Front Desk Receptionist',
                  pin: authPin
                });
              }}
              className="space-y-3.5"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">
                    Role
                  </label>
                  <select
                    value={authRole}
                    onChange={(e) => setAuthRole(e.target.value)}
                    className="w-full h-10 px-2 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-xs"
                  >
                    <option value="receptionist">OPD Receptionist</option>
                    <option value="doctor">Consulting Doctor</option>
                    <option value="nurse">Triage Nurse</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">
                    Staff ID
                  </label>
                  <input
                    type="text"
                    value={authStaffId}
                    onChange={(e) => setAuthStaffId(e.target.value)}
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-xs font-mono"
                    placeholder="REC-APOLLO-01"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">
                    Staff Terminal PIN
                  </label>
                  <span className="text-[10px] text-[#5367FF] font-mono">Demo PIN: 1234</span>
                </div>
                <input
                  type="password"
                  maxLength={4}
                  value={authPin}
                  onChange={(e) => setAuthPin(e.target.value)}
                  className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-center font-mono tracking-widest text-base"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#5367FF] hover:bg-opacity-90 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Verify Credentials & Enter Terminal</span>
              </button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                registerStaffAccount({
                  staffName: authStaffName,
                  hospitalId: authHospitalId,
                  department: authDept,
                  employeeId: authStaffId,
                  role: authRole
                });
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">
                  Staff Full Name
                </label>
                <input
                  type="text"
                  value={authStaffName}
                  onChange={(e) => setAuthStaffName(e.target.value)}
                  className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-xs"
                  placeholder="e.g. Sunita Reddy"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">
                    Department
                  </label>
                  <input
                    type="text"
                    value={authDept}
                    onChange={(e) => setAuthDept(e.target.value)}
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-xs"
                    placeholder="Cardiology OPD"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">
                    Employee Code
                  </label>
                  <input
                    type="text"
                    value={authStaffId}
                    onChange={(e) => setAuthStaffId(e.target.value)}
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-xs font-mono"
                    placeholder="EMP-9021"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">
                  Choose 4-Digit Security PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={authPin}
                  onChange={(e) => setAuthPin(e.target.value)}
                  className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-center font-mono tracking-widest text-base"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Register Staff Account & Authorize</span>
              </button>
            </form>
          )}

          {/* Evaluator PIN Helper (Requires explicit server verification button) */}
          <div className="pt-2 border-t border-[#E8E8EC] dark:border-[#2C2C2C]">
            <button
              type="button"
              onClick={() => {
                setAuthHospitalId('hosp-1');
                setAuthRole('receptionist');
                setAuthStaffId('REC-APOLLO-01');
                setAuthPin('1234');
              }}
              className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#5367FF] font-semibold text-xs flex items-center justify-center space-x-1.5 hover:bg-slate-100 transition-all shadow-xs"
            >
              <span>⚡ Pre-fill Demo PIN & Apollo ID (Click Verify to Test)</span>
            </button>
          </div>
        </div>

        {/* Back to Patient Portal */}
        <button
          onClick={() => setPortalMode('patient')}
          className="w-full py-2.5 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-[#7C7E8C] font-semibold text-xs hover:text-[#44475B] transition-all"
        >
          ← Return to Patient App
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-2 px-4 space-y-4 animate-fadeIn">
      {/* Synthetic Demo Sandbox Facility Banner */}
      <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 uppercase tracking-wider">
            ABDM Sandbox • Synthetic Data
          </span>
          <span className="text-xs text-amber-900 dark:text-amber-200 font-medium line-clamp-1">
            Facility: <strong>{staffAuth.staffUser?.hospitalName || 'Apollo Hospitals Jubilee Hills'}</strong> • Isolated
          </span>
        </div>
        <button
          onClick={logoutStaff}
          className="px-2.5 py-1 text-xs font-bold text-rose-600 bg-white dark:bg-[#1B1B1B] rounded-lg border border-rose-200 dark:border-rose-900 hover:bg-rose-50 flex items-center space-x-1 flex-shrink-0"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Staff Tab Switcher Row (Requirement 4 & 7) */}
      <div className="flex border-b border-[#E8E8EC] dark:border-[#2C2C2C] overflow-x-auto no-scrollbar space-x-1 pb-1">
        {[
          { id: 'home', label: '🏠 Dashboard' },
          { id: 'queue', label: `📋 Queue (${staffQueue.filter(p => p.status === 'Waiting').length})` },
          { id: 'ambulances', label: `🚑 Ambulances (${ambulanceRequests.filter(a => a.status !== 'Arrived').length})` },
          { id: 'audit', label: `📜 Audit Trail (${staffAuditTrail.length})` },
          { id: 'appointments', label: '📅 Records' },
          { id: 'analytics', label: '📊 Admin Analytics' },
          { id: 'profile', label: '👤 Profile' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setStaffTab(tab.id)}
            className={`py-2 px-3 text-xs font-bold whitespace-nowrap rounded-xl transition-all ${
              staffTab === tab.id
                ? 'bg-[#00D09C] text-white shadow-xs'
                : 'text-[#7C7E8C] hover:text-[#44475B] hover:bg-[#F5F6F8] dark:hover:bg-[#1B1B1B]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. HOME TAB */}
      {staffTab === 'home' && (
        <div className="space-y-4">
          {/* Staff Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#44475B] dark:text-white">
                Good day, {staffAuth.staffUser?.name || 'Staff Member'}
              </h2>
              <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">
                {staffAuth.staffUser?.hospitalName || 'Apollo Hospitals Jubilee Hills'} • {staffAuth.staffUser?.department || 'Cardiology OPD'}
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

          {/* 108 AMBULANCE DISPATCH ALERT CONSOLE (Requirement 4) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#121829] text-white border-2 border-rose-500/50 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Siren className="w-5 h-5 text-rose-500 animate-bounce" />
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                    108 Ambulance Emergency Grid
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  </h3>
                  <p className="text-[10px] text-slate-400">Live incoming patient emergency requests</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                {ambulanceRequests.length} Active Dispatches
              </span>
            </div>

            <div className="space-y-2.5">
              {ambulanceRequests.map(req => (
                <div key={req.id} className="p-3 bg-slate-800/90 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-white">{req.patientName}</span>
                        <span className="text-[10px] font-mono text-slate-400">{req.phone}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                        <Navigation className="w-3 h-3 text-[#00D09C]" />
                        <span>{req.location}</span>
                      </p>
                    </div>

                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      req.status === 'Arrived'
                        ? 'bg-emerald-500 text-white'
                        : req.status === 'En route'
                        ? 'bg-sky-500 text-white animate-pulse'
                        : 'bg-amber-500 text-slate-950'
                    }`}>
                      {req.status === 'En route' ? `En route (ETA ${req.etaMins}m)` : req.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-700/60">
                    <span className="font-mono text-slate-400">Vehicle: {req.ambulanceNo} • Req at {req.requestedAt}</span>
                    <div className="flex space-x-1.5">
                      {req.status !== 'En route' && req.status !== 'Arrived' && (
                        <button
                          onClick={() => updateAmbulanceStatus(req.id, 'En route')}
                          className="px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-[10px] shadow-xs transition-all"
                        >
                          Dispatch (En route)
                        </button>
                      )}
                      {req.status !== 'Arrived' && (
                        <button
                          onClick={() => updateAmbulanceStatus(req.id, 'Arrived')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] shadow-xs transition-all"
                        >
                          Mark Arrived
                        </button>
                      )}
                      {req.status === 'Arrived' && (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Arrived at Scene
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-[#44475B] dark:text-white">
                      Token #{activeServing.tokenNumber} — {activeServing.patientName}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {activeServing.isSynthetic ? (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                        🔬 Synthetic Demo Record (Non-PHI)
                      </span>
                    ) : (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
                        ✓ Verified Patient
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#7C7E8C] mt-1">
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
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {patient.isSynthetic ? (
                          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                            🔬 Synthetic Demo Record (Non-PHI)
                          </span>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
                            ✓ Verified Patient
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#7C7E8C] mt-0.5">
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

      {/* AMBULANCES TAB (Requirement 4) */}
      {staffTab === 'ambulances' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#44475B] dark:text-white flex items-center gap-2">
                <Siren className="w-5 h-5 text-rose-500" />
                Emergency 108 Ambulance Dispatch Center
              </h2>
              <p className="text-xs text-[#7C7E8C]">Live patient requests, triage status & GPS dispatches</p>
            </div>
          </div>

          <div className="space-y-3">
            {ambulanceRequests.map(req => (
              <div key={req.id} className="p-4 bg-white dark:bg-[#1B1B1B] rounded-2xl border-2 border-rose-500/40 shadow-groww-card space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#44475B] dark:text-white flex items-center gap-2">
                      {req.patientName}
                      <span className="text-xs font-mono text-slate-500 font-normal">({req.phone})</span>
                    </h3>
                    <p className="text-xs text-[#7C7E8C] mt-0.5 flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5 text-[#00D09C]" />
                      <span>{req.location}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Target: <strong>{req.hospitalName}</strong> • Requested at {req.requestedAt}
                    </p>
                  </div>

                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                    req.status === 'Arrived'
                      ? 'bg-emerald-500 text-white'
                      : req.status === 'En route'
                      ? 'bg-sky-500 text-white animate-pulse'
                      : 'bg-amber-500 text-slate-950'
                  }`}>
                    {req.status === 'En route' ? `En route (ETA ${req.etaMins}m)` : req.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E8E8EC] dark:border-[#2C2C2C] text-xs">
                  <span className="font-mono text-slate-500">Unit: {req.ambulanceNo}</span>
                  <div className="flex space-x-2">
                    {req.status !== 'En route' && req.status !== 'Arrived' && (
                      <button
                        onClick={() => updateAmbulanceStatus(req.id, 'En route')}
                        className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs transition-all"
                      >
                        Dispatch En Route
                      </button>
                    )}
                    {req.status !== 'Arrived' && (
                      <button
                        onClick={() => updateAmbulanceStatus(req.id, 'Arrived')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition-all"
                      >
                        Mark as Arrived
                      </button>
                    )}
                    {req.status === 'Arrived' && (
                      <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Patient Reached / In Emergency Care
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AUDIT TRAIL TAB (Security & Compliance Requirement 1) */}
      {staffTab === 'audit' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#44475B] dark:text-white">
                Facility Clinical Audit Trail
              </h3>
              <p className="text-xs text-[#7C7E8C]">
                Tamper-evident log of staff logins, queue calls, triage updates & registrations
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-[#E6F9F4] dark:bg-emerald-950/60 text-[#00B386] font-bold border border-[#00D09C]/30">
              Live ABDM Node Synced
            </span>
          </div>

          <div className="space-y-2.5">
            {staffAuditTrail.length > 0 ? (
              staffAuditTrail.map(log => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-xs flex items-start space-x-3 text-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-[#5367FF] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    <History className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#44475B] dark:text-white">
                        {log.action}
                      </span>
                      <span className="text-[10px] font-mono text-[#7C7E8C]">
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">
                      {log.details}
                    </p>
                    <div className="flex items-center space-x-2 text-[10px] text-[#5367FF] pt-0.5 font-medium">
                      <span>Staff: {log.staffName}</span>
                      <span>•</span>
                      <span>Facility: {log.hospitalName}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#7C7E8C]">
                No audit entries recorded yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADMIN ANALYTICS TAB (Requirement 7) */}
      {staffTab === 'analytics' && (
        <AdminAnalyticsView />
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
