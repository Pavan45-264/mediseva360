import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  CreditCard,
  Bookmark,
  Users,
  FileText,
  Bell,
  Globe,
  Settings,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRight,
  Plus,
  ArrowDownLeft,
  Moon,
  Sun,
  Building2,
  CheckCircle2,
  Copy,
  Smartphone
} from 'lucide-react';

export default function ProfileView() {
  const {
    user,
    theme,
    toggleTheme,
    language,
    setLanguage,
    setPortalMode,
    setPatientTab,
    setIsAddMoneyOpen,
    setIsRefundOpen,
    savedHospitals,
    walletTransactions,
    openAuthModal,
    openPublishModal,
    t
  } = useApp();

  const [copiedAbha, setCopiedAbha] = useState(false);
  const [activeSubModal, setActiveSubModal] = useState(null); // 'family' | 'transactions' | 'privacy'

  const copyAbha = () => {
    navigator.clipboard?.writeText(user.abhaId);
    setCopiedAbha(true);
    setTimeout(() => setCopiedAbha(false), 2000);
  };

  return (
    <div className="pb-24 pt-2 px-4 space-y-4 animate-fadeIn">
      {/* 1. User Header (Avatar, Name, Contact, ABHA) */}
      <div className="flex items-center space-x-3.5 pt-1">
        <div className="w-14 h-14 rounded-full bg-[#E6F9F4] dark:bg-emerald-950/60 border-2 border-[#00D09C] flex items-center justify-center text-lg font-bold text-[#00B386] shadow-sm">
          {user.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-[#44475B] dark:text-white leading-tight">
            {user.name}
          </h2>
          <p className="text-xs text-[#7C7E8C] dark:text-[#9A9A9A]">{user.phone} • {user.email}</p>
          
          {/* ABHA Ayushman Bharat ID Pill */}
          <div
            onClick={copyAbha}
            className="inline-flex items-center space-x-1 mt-1 px-2 py-0.5 rounded-md bg-[#EEF0FF] dark:bg-indigo-950/70 text-[#5367FF] text-[10px] font-semibold cursor-pointer hover:bg-opacity-80 transition-colors"
            title="Click to copy ABHA ID"
          >
            <span>ABHA: {user.abhaId}</span>
            {copiedAbha ? <CheckCircle2 className="w-3 h-3 text-[#00B386]" /> : <Copy className="w-3 h-3" />}
          </div>
        </div>
      </div>

      {/* 2. GROWW-STYLE WALLET / BALANCE CARD (Add money & Refund to bank) */}
      <div className="rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] p-4 shadow-groww-card space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#7C7E8C] dark:text-[#9A9A9A]">
            {t('walletBalance')}
          </span>
          <span className="text-[10px] font-bold text-[#00B386] bg-[#E6F9F4] dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
            Active
          </span>
        </div>

        <div className="text-2xl sm:text-3xl font-extrabold text-[#44475B] dark:text-white tracking-tight">
          ₹ {user.walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>

        {/* Buttons: Add money & Refund to bank (Groww exact wording!) */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={() => setIsAddMoneyOpen(true)}
            className="py-2.5 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addMoney')}</span>
          </button>

          <button
            onClick={() => setIsRefundOpen(true)}
            className="py-2.5 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white font-semibold text-xs flex items-center justify-center space-x-1.5 hover:border-[#5367FF] transition-all active:scale-95"
          >
            <ArrowDownLeft className="w-4 h-4 text-[#5367FF]" />
            <span>{t('refundToBank')}</span>
          </button>
        </div>
      </div>

      {/* 3. Theme & Language Controls */}
      <div className="p-3 bg-[#F5F6F8] dark:bg-[#1B1B1B] rounded-2xl border border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          <span className="text-xs font-semibold text-[#44475B] dark:text-white">
            Theme: {theme === 'light' ? 'Light (Groww Default)' : 'Dark Mode'}
          </span>
        </div>

        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-full bg-white dark:bg-[#2C2C2C] border border-[#E8E8EC] dark:border-[#3C3C3C] text-xs font-semibold text-[#44475B] dark:text-white shadow-xs"
        >
          {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        </button>
      </div>

      {/* 4. Full-Width Menu Rows (Groww Account List style) */}
      <div className="divide-y divide-[#E8E8EC] dark:divide-[#2C2C2C] bg-white dark:bg-[#1B1B1B] rounded-2xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card overflow-hidden">
        
        {/* Appointments (Orders) */}
        <div
          onClick={() => setPatientTab('appointments')}
          className="p-3.5 hover:bg-[#F5F6F8] dark:hover:bg-[#222222] transition-colors cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-[#5367FF]" />
            <span className="text-xs font-semibold text-[#44475B] dark:text-white">{t('appointments')} (Orders)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#7C7E8C]" />
        </div>

        {/* My Visits (Holdings) */}
        <div
          onClick={() => setPatientTab('appointments')}
          className="p-3.5 hover:bg-[#F5F6F8] dark:hover:bg-[#222222] transition-colors cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Clock className="w-4 h-4 text-[#00B386]" />
            <span className="text-xs font-semibold text-[#44475B] dark:text-white">{t('myVisits')} (Holdings)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#7C7E8C]" />
        </div>

        {/* Payments & Transactions */}
        <div
          onClick={() => setActiveSubModal('transactions')}
          className="p-3.5 hover:bg-[#F5F6F8] dark:hover:bg-[#222222] transition-colors cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <CreditCard className="w-4 h-4 text-[#00B386]" />
            <span className="text-xs font-semibold text-[#44475B] dark:text-white">Payments & UPI Transactions</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-[10px] text-[#7C7E8C]">{walletTransactions.length} items</span>
            <ChevronRight className="w-4 h-4 text-[#7C7E8C]" />
          </div>
        </div>

        {/* Saved Hospitals (Watchlist) */}
        <div
          onClick={() => setPatientTab('hospitals')}
          className="p-3.5 hover:bg-[#F5F6F8] dark:hover:bg-[#222222] transition-colors cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Bookmark className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-[#44475B] dark:text-white">{t('savedHospitals')} (Watchlist)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-[10px] text-[#7C7E8C]">{savedHospitals.length} saved</span>
            <ChevronRight className="w-4 h-4 text-[#7C7E8C]" />
          </div>
        </div>

        {/* Family Members (ABHA Linked) */}
        <div
          onClick={() => setActiveSubModal('family')}
          className="p-3.5 hover:bg-[#F5F6F8] dark:hover:bg-[#222222] transition-colors cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Users className="w-4 h-4 text-[#5367FF]" />
            <span className="text-xs font-semibold text-[#44475B] dark:text-white">Family Members (ABHA Linked)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-[10px] text-[#00B386] font-semibold">{user.familyMembers.length} profiles</span>
            <ChevronRight className="w-4 h-4 text-[#7C7E8C]" />
          </div>
        </div>

        {/* Privacy & Security (DPDP Act 2023) */}
        <div
          onClick={() => setActiveSubModal('privacy')}
          className="p-3.5 hover:bg-[#F5F6F8] dark:hover:bg-[#222222] transition-colors cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Shield className="w-4 h-4 text-[#00B386]" />
            <span className="text-xs font-semibold text-[#44475B] dark:text-white">Privacy & Security (DPDP Act 2023)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#7C7E8C]" />
        </div>

        {/* Hospital Staff Portal Switch */}
        <div
          onClick={() => setPortalMode('staff')}
          className="p-3.5 bg-[#EEF0FF]/50 dark:bg-indigo-950/30 hover:bg-[#EEF0FF] dark:hover:bg-indigo-950/60 transition-colors cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Building2 className="w-4 h-4 text-[#5367FF]" />
            <div>
              <span className="text-xs font-bold text-[#5367FF]">Switch to Hospital Staff Portal</span>
              <p className="text-[10px] text-[#7C7E8C]">Access live doctor queue & today's collection</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#5367FF]" />
        </div>

        {/* Publish & Open on Mobile (QR Code & PWA Link) */}
        <div
          onClick={openPublishModal}
          className="p-3.5 bg-[#EEF0FF]/80 dark:bg-indigo-950/50 hover:bg-[#EEF0FF] transition-colors cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Smartphone className="w-4 h-4 text-[#5367FF]" />
            <div>
              <span className="text-xs font-bold text-[#5367FF]">Publish & Open on Mobile Phone</span>
              <p className="text-[10px] text-[#7C7E8C]">Scan QR code with your phone or copy live link</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#5367FF]" />
        </div>

        {/* Sign In / Switch Account (Patient or Receptionist) */}
        <div
          onClick={openAuthModal}
          className="p-3.5 bg-[#E6F9F4]/60 dark:bg-emerald-950/40 hover:bg-[#E6F9F4] transition-colors cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <User className="w-4 h-4 text-[#00B386]" />
            <div>
              <span className="text-xs font-bold text-[#00B386]">Sign In / Switch User Role</span>
              <p className="text-[10px] text-[#7C7E8C]">Log in as Patient (Mobile OTP) or Hospital Receptionist</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#00B386]" />
        </div>

        {/* Log out */}
        <div
          onClick={openAuthModal}
          className="p-3.5 hover:bg-[#FDEEEA] transition-colors cursor-pointer flex items-center justify-between text-[#EB5B3C]"
        >
          <div className="flex items-center space-x-3">
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-semibold">Log out & Switch Account</span>
          </div>
        </div>
      </div>

      {/* SUB-MODAL: Family Members */}
      {activeSubModal === 'family' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-[#1B1B1B] rounded-3xl p-5 border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
              <h3 className="font-bold text-sm text-[#44475B] dark:text-white">Family Health Profiles</h3>
              <button onClick={() => setActiveSubModal(null)} className="text-[#7C7E8C]">✕</button>
            </div>
            <div className="space-y-2.5">
              {user.familyMembers.map(m => (
                <div key={m.id} className="p-3 bg-[#F5F6F8] dark:bg-[#222222] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#44475B] dark:text-white">{m.name} ({m.relation})</h4>
                    <p className="text-[11px] text-[#7C7E8C]">{m.age} yrs • {m.gender}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    m.abhaLinked ? 'bg-[#E6F9F4] text-[#00B386]' : 'bg-[#F5F6F8] text-[#7C7E8C]'
                  }`}>
                    {m.abhaLinked ? 'ABHA Linked' : 'Link ABHA'}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => alert("Add family member form opened")}
              className="w-full py-2.5 rounded-xl border border-[#00D09C] text-[#00B386] font-bold text-xs"
            >
              + Add Family Member
            </button>
          </div>
        </div>
      )}

      {/* SUB-MODAL: Privacy & DPDP Act */}
      {activeSubModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-[#1B1B1B] rounded-3xl p-5 border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
              <h3 className="font-bold text-sm text-[#44475B] dark:text-white">DPDP Act 2023 Compliance</h3>
              <button onClick={() => setActiveSubModal(null)} className="text-[#7C7E8C]">✕</button>
            </div>
            <div className="space-y-2 text-xs text-[#7C7E8C] leading-relaxed">
              <p>✓ <strong>Zero Data Retention of Sensitive Vitals:</strong> Patient medical history is encrypted end-to-end via ABDM M1/M2/M3 standards.</p>
              <p>✓ <strong>Consent Manager:</strong> You maintain full authority to revoke hospital access to your OPD slips at any moment.</p>
              <p>✓ <strong>Payment Security:</strong> Token fees are handled via RBI-authorized payment aggregators. No card or UPI PINs are ever stored.</p>
            </div>
            <button
              onClick={() => setActiveSubModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#00D09C] text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
