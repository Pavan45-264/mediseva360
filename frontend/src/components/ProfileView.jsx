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
  Smartphone,
  User,
  ShieldCheck,
  UserCheck,
  Edit3,
  MapPin,
  Navigation
} from 'lucide-react';

export default function ProfileView() {
  const {
    user: rawUser,
    setUser,
    updateUserProfile,
    userLocation,
    requestDeviceLocation,
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
    showToast,
    t
  } = useApp();

  // Bulletproof fallbacks to ensure zero crashes on reload or state rehydration
  const user = rawUser || {
    name: "Pavan Kumar",
    phone: "+91 98765 43210",
    email: "pavan.kumar@gmail.com",
    abhaId: "91-4820-1928-4410",
    abhaAddress: "pavan91@abdm",
    walletBalance: 1450.00,
    familyMembers: [
      { id: "fam-1", name: "Pavan Kumar", relation: "Self", age: 34, gender: "Male", abhaLinked: true },
      { id: "fam-2", name: "Sunitha K.", relation: "Spouse", age: 32, gender: "Female", abhaLinked: true },
      { id: "fam-3", name: "Aarav K.", relation: "Son", age: 6, gender: "Male", abhaLinked: false },
      { id: "fam-4", name: "Venkat Ramaiah", relation: "Father", age: 68, gender: "Male", abhaLinked: true },
    ]
  };

  const userName = user?.name || "Pavan Kumar";
  const userInitials = userName.split(' ').filter(Boolean).map(n => n[0]).join('') || 'PK';
  const userPhone = user?.phone || "+91 98765 43210";
  const userEmail = user?.email || "pavan.kumar@gmail.com";
  const userAbhaId = user?.abhaId || "91-4820-1928-4410";
  const walletBalance = typeof user?.walletBalance === 'number' ? user.walletBalance : Number(user?.walletBalance) || 0;
  const familyMembers = Array.isArray(user?.familyMembers) ? user.familyMembers : [];
  const safeSavedHospitals = Array.isArray(savedHospitals) ? savedHospitals : [];
  const safeTransactions = Array.isArray(walletTransactions) ? walletTransactions : [];

  const [copiedAbha, setCopiedAbha] = useState(false);
  const [activeSubModal, setActiveSubModal] = useState(null); // 'family' | 'transactions' | 'privacy' | 'addFamily'

  // New family member form state
  const [newFamName, setNewFamName] = useState('');
  const [newFamRelation, setNewFamRelation] = useState('Spouse');
  const [newFamAge, setNewFamAge] = useState('');
  const [newFamGender, setNewFamGender] = useState('Female');

  // Edit Profile modal state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editName, setEditName] = useState(userName);
  const [editPhone, setEditPhone] = useState(userPhone);
  const [editEmail, setEditEmail] = useState(userEmail);
  const [editAbha, setEditAbha] = useState(user?.abhaAddress || '');
  const [editAge, setEditAge] = useState(user?.familyMembers?.[0]?.age || 30);
  const [editGender, setEditGender] = useState(user?.familyMembers?.[0]?.gender || 'Male');

  const openEditProfile = () => {
    setEditName(user.name);
    setEditPhone(user.phone);
    setEditEmail(user.email);
    setEditAbha(user.abhaAddress || '');
    setEditAge(user.familyMembers?.[0]?.age || 30);
    setEditGender(user.familyMembers?.[0]?.gender || 'Male');
    setIsEditProfileOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      if (showToast) showToast('Full name cannot be empty', 'error', 'Invalid Name');
      return;
    }
    if (updateUserProfile) {
      updateUserProfile({
        name: editName.trim(),
        phone: editPhone.trim(),
        email: editEmail.trim(),
        abhaAddress: editAbha.trim(),
        age: editAge,
        gender: editGender
      });
    }
    setIsEditProfileOpen(false);
  };

  const copyAbha = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(userAbhaId);
      }
      setCopiedAbha(true);
      if (showToast) showToast(`Copied ABHA ID: ${userAbhaId}`, 'success', 'ABHA Copied');
      setTimeout(() => setCopiedAbha(false), 2000);
    } catch {
      setCopiedAbha(true);
      setTimeout(() => setCopiedAbha(false), 2000);
    }
  };

  const handleAddFamilyMember = (e) => {
    e.preventDefault();
    if (!newFamName.trim()) return;
    const newMember = {
      id: `fam-${Date.now()}`,
      name: newFamName.trim(),
      relation: newFamRelation,
      age: Number(newFamAge) || 30,
      gender: newFamGender,
      abhaLinked: true
    };
    if (setUser) {
      setUser(prev => ({
        ...prev,
        familyMembers: [...(prev.familyMembers || []), newMember]
      }));
    }
    if (showToast) showToast(`Added ${newMember.name} to Family Health Profiles!`, 'success', 'Family Profile Added');
    setNewFamName('');
    setNewFamAge('');
    setActiveSubModal('family');
  };

  return (
    <div className="pb-24 pt-2 px-4 space-y-4 animate-fadeIn">
      {/* 1. User Header (Avatar, Name, Contact, ABHA & Edit Profile Action) */}
      <div className="flex items-center space-x-3.5 pt-1">
        <div className="w-14 h-14 rounded-full bg-[#E6F9F4] dark:bg-emerald-950/60 border-2 border-[#00D09C] flex items-center justify-center text-lg font-bold text-[#00B386] shadow-sm flex-shrink-0">
          {userInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#44475B] dark:text-white leading-tight truncate">
              {userName}
            </h2>
            <button
              onClick={openEditProfile}
              className="px-2.5 py-1 rounded-lg bg-[#EEF0FF] dark:bg-indigo-950/80 text-[#5367FF] text-xs font-bold hover:bg-[#5367FF] hover:text-white transition-all flex items-center space-x-1 flex-shrink-0"
              title="Edit Profile Name and Details"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <p className="text-xs text-[#7C7E8C] dark:text-[#9A9A9A] truncate">{userPhone} • {userEmail}</p>
          
          {/* ABHA Ayushman Bharat ID Pill */}
          <div
            onClick={copyAbha}
            className="inline-flex items-center space-x-1 mt-1 px-2 py-0.5 rounded-md bg-[#EEF0FF] dark:bg-indigo-950/70 text-[#5367FF] text-[10px] font-semibold cursor-pointer hover:bg-opacity-80 transition-colors"
            title="Click to copy ABHA ID"
          >
            <span>ABHA: {userAbhaId}</span>
            {copiedAbha ? <CheckCircle2 className="w-3 h-3 text-[#00B386]" /> : <Copy className="w-3 h-3" />}
          </div>
        </div>
      </div>

      {/* Live Device Geolocation Status Card */}
      <div className="rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] p-3.5 shadow-groww-card flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#EEF0FF] dark:bg-indigo-950/70 flex items-center justify-center text-[#5367FF] flex-shrink-0">
            <Navigation className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-[#44475B] dark:text-white text-xs">Device Location</span>
              {userLocation?.isLiveGPS ? (
                <span className="px-1.5 py-0.5 rounded-full bg-[#E6F9F4] text-[#00B386] font-extrabold text-[9px] uppercase tracking-wider">
                  ● Live GPS
                </span>
              ) : (
                <span className="px-1.5 py-0.5 rounded-full bg-[#F5F6F8] dark:bg-[#2A2A2A] text-[#7C7E8C] font-semibold text-[9px]">
                  Default Ref
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A] truncate mt-0.5">
              {userLocation?.address || "Hyderabad, Telangana"}
            </p>
          </div>
        </div>

        <button
          onClick={() => requestDeviceLocation && requestDeviceLocation(false)}
          disabled={userLocation?.loading}
          className="ml-2 px-3 py-1.5 rounded-xl border border-[#00D09C] bg-[#E6F9F4] dark:bg-emerald-950/60 text-[#00B386] font-bold text-xs hover:bg-[#00D09C] hover:text-white transition-all flex items-center space-x-1 flex-shrink-0"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>{userLocation?.loading ? "Locating..." : "Update GPS"}</span>
        </button>
      </div>

      {/* 2. GROWW-STYLE WALLET / BALANCE CARD (Add money & Refund to bank) */}
      <div className="rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] p-4 shadow-groww-card space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#7C7E8C] dark:text-[#9A9A9A]">
            {t('walletBalance')}
          </span>
          <span className="text-[10px] font-bold text-[#00B386] bg-[#E6F9F4] dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
            Active • ABDM Linked
          </span>
        </div>

        <div className="text-2xl sm:text-3xl font-extrabold text-[#44475B] dark:text-white tracking-tight">
          ₹ {walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>

        {/* Buttons: Add money & Refund to bank (Groww exact wording!) */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={() => setIsAddMoneyOpen && setIsAddMoneyOpen(true)}
            className="py-2.5 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addMoney')}</span>
          </button>

          <button
            onClick={() => setIsRefundOpen && setIsRefundOpen(true)}
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
            <span className="text-[10px] text-[#7C7E8C]">{safeTransactions.length} items</span>
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
            <span className="text-[10px] text-[#7C7E8C]">{safeSavedHospitals.length} saved</span>
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
            <span className="text-[10px] text-[#00B386] font-semibold">{familyMembers.length} profiles</span>
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

        {/* Hospital Staff Portal Switch (Protected) */}
        <div
          onClick={() => setPortalMode('staff')}
          className="p-3.5 bg-[#EEF0FF]/50 dark:bg-indigo-950/30 hover:bg-[#EEF0FF] dark:hover:bg-indigo-950/60 transition-colors cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Building2 className="w-4 h-4 text-[#5367FF]" />
            <div>
              <span className="text-xs font-bold text-[#5367FF]">Switch to Hospital Staff Portal</span>
              <p className="text-[10px] text-[#7C7E8C]">Access facility-scoped terminal (Staff login required)</p>
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

        {/* Sign In / Switch Account */}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-[#1B1B1B] rounded-3xl p-5 border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#5367FF]" />
                <h3 className="font-bold text-sm text-[#44475B] dark:text-white">Family Health Profiles</h3>
              </div>
              <button onClick={() => setActiveSubModal(null)} className="text-[#7C7E8C] hover:text-[#44475B] p-1">✕</button>
            </div>
            <div className="space-y-2.5 max-h-60 overflow-y-auto no-scrollbar">
              {familyMembers.map(m => (
                <div key={m.id} className="p-3 bg-[#F5F6F8] dark:bg-[#222222] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#44475B] dark:text-white">{m.name} ({m.relation})</h4>
                    <p className="text-[11px] text-[#7C7E8C]">{m.age} yrs • {m.gender}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    m.abhaLinked ? 'bg-[#E6F9F4] text-[#00B386]' : 'bg-[#F5F6F8] text-[#7C7E8C]'
                  }`}>
                    {m.abhaLinked ? '✓ ABHA Linked' : 'Link ABHA'}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveSubModal('addFamily')}
              className="w-full py-2.5 rounded-xl border border-[#00D09C] bg-[#E6F9F4] dark:bg-emerald-950/60 text-[#00B386] font-bold text-xs hover:bg-[#00D09C] hover:text-white transition-all flex items-center justify-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Dependent / Family Member</span>
            </button>
          </div>
        </div>
      )}

      {/* SUB-MODAL: Add Family Member Form */}
      {activeSubModal === 'addFamily' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-[#1B1B1B] rounded-3xl p-5 border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
              <h3 className="font-bold text-sm text-[#44475B] dark:text-white">Add Family Member</h3>
              <button onClick={() => setActiveSubModal('family')} className="text-[#7C7E8C] p-1">✕</button>
            </div>
            <form onSubmit={handleAddFamilyMember} className="space-y-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Full Name</label>
                <input
                  type="text"
                  required
                  value={newFamName}
                  onChange={(e) => setNewFamName(e.target.value)}
                  placeholder="e.g. Kamala Kumar"
                  className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-xs focus:outline-none focus:border-[#00D09C]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Relationship</label>
                  <select
                    value={newFamRelation}
                    onChange={(e) => setNewFamRelation(e.target.value)}
                    className="w-full h-10 px-2 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-xs"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child (Son/Daughter)</option>
                    <option value="Parent">Parent (Father/Mother)</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Other">Other Dependent</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    required
                    value={newFamAge}
                    onChange={(e) => setNewFamAge(e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Gender</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {['Male', 'Female', 'Other'].map(g => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setNewFamGender(g)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        newFamGender === g
                          ? 'border-[#00D09C] bg-[#00D09C] text-white'
                          : 'border-[#E8E8EC] dark:border-[#2C2C2C] text-[#7C7E8C]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveSubModal('family')}
                  className="flex-1 py-2.5 rounded-xl border border-[#E8E8EC] text-[#7C7E8C] font-semibold text-xs"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUB-MODAL: Privacy & DPDP Act */}
      {activeSubModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-[#1B1B1B] rounded-3xl p-5 border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#00B386]" />
                <h3 className="font-bold text-sm text-[#44475B] dark:text-white">DPDP Act 2023 Compliance</h3>
              </div>
              <button onClick={() => setActiveSubModal(null)} className="text-[#7C7E8C] p-1">✕</button>
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

      {/* SUB-MODAL: Transactions History */}
      {activeSubModal === 'transactions' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm max-h-[80vh] flex flex-col bg-white dark:bg-[#1B1B1B] rounded-3xl p-5 border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
              <h3 className="font-bold text-sm text-[#44475B] dark:text-white">Payments & UPI Transactions</h3>
              <button onClick={() => setActiveSubModal(null)} className="text-[#7C7E8C] p-1">✕</button>
            </div>
            <div className="space-y-2.5 overflow-y-auto no-scrollbar flex-1">
              {safeTransactions.length > 0 ? (
                safeTransactions.map(tx => (
                  <div key={tx.id} className="p-3 bg-[#F5F6F8] dark:bg-[#222222] rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-[#44475B] dark:text-white">{tx.title}</h4>
                      <p className="text-[10px] text-[#7C7E8C]">{tx.date} • Ref: {tx.refId}</p>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${tx.type === 'Credit' ? 'text-[#00B386]' : 'text-[#44475B] dark:text-white'}`}>
                        {tx.type === 'Credit' ? '+' : '-'}₹{tx.amount}
                      </span>
                      <p className="text-[10px] text-[#00B386] font-medium">{tx.status}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-[#7C7E8C] py-4">No transactions yet.</p>
              )}
            </div>
            <button
              onClick={() => setActiveSubModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#00D09C] text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* SUB-MODAL: Edit Patient Profile */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-[#1B1B1B] rounded-3xl p-5 border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
              <div className="flex items-center space-x-2">
                <Edit3 className="w-4 h-4 text-[#00D09C]" />
                <h3 className="font-bold text-sm text-[#44475B] dark:text-white">Edit Patient Profile</h3>
              </div>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-[#7C7E8C] p-1">✕</button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none focus:border-[#00D09C] font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none focus:border-[#00D09C]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none focus:border-[#00D09C]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">ABHA Address</label>
                <input
                  type="text"
                  value={editAbha}
                  onChange={(e) => setEditAbha(e.target.value)}
                  placeholder="username@abdm"
                  className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#00B386] rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none focus:border-[#00D09C] font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none focus:border-[#00D09C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Gender</label>
                  <select
                    value={editGender}
                    onChange={(e) => setEditGender(e.target.value)}
                    className="w-full h-10 px-2 mt-1 bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-[#7C7E8C] font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
