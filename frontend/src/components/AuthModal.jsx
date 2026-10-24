import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import {
  X,
  User,
  Building2,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  UserPlus,
  LogIn,
  KeyRound
} from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    user,
    loginAsPatient,
    loginStaffMember,
    registerStaffAccount,
    registerPatientAccount,
    setPatientTab,
    showToast,
    portalMode
  } = useApp();

  const [selectedRole, setSelectedRole] = useState(portalMode === 'staff' ? 'staff' : 'patient'); // 'patient' | 'staff'
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  // Patient states
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('4821');
  const [signInName, setSignInName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState(28);
  const [patientGender, setPatientGender] = useState('Male');
  const [patientAbha, setPatientAbha] = useState('');

  // Staff states
  const [selectedHospitalId, setSelectedHospitalId] = useState('hosp-1');
  const [staffRoleType, setStaffRoleType] = useState('receptionist'); // 'receptionist' | 'doctor' | 'nurse'
  const [staffId, setStaffId] = useState('REC-APOLLO-01');
  const [staffPin, setStaffPin] = useState('1234');
  const [staffName, setStaffName] = useState('Front Desk Receptionist');
  const [staffDept, setStaffDept] = useState('Cardiology OPD');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = () => {
    if (mobileNumber.length < 10) {
      alert("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    setOtpSent(true);
    setOtpCode('4821');
    showToast('Demo OTP sent: 4821 (Fixed demo OTP for hackathon testing)', 'info', 'Demo OTP Sent');
  };

  const handlePatientSignIn = (e) => {
    e.preventDefault();
    if (otpSent && otpCode.trim() !== '4821') {
      showToast('Please enter the demo OTP: 4821', 'error', 'Invalid OTP');
      return;
    }
    loginAsPatient({
      phone: `+91 ${mobileNumber}`,
      name: signInName.trim() || undefined
    });
    setPatientTab('profile');
    showToast('Sign in verified! Displaying your patient profile.', 'success', 'Sign In Successful');
  };

  const handlePatientSignUp = (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      showToast('Please enter your full name', 'error', 'Name Required');
      return;
    }
    const cleanName = patientName.trim();
    registerPatientAccount({
      name: cleanName,
      phone: `+91 ${mobileNumber}`,
      abhaAddress: patientAbha.trim() || `${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')}@abdm`,
      age: patientAge,
      gender: patientGender
    });
    setPatientTab('profile');
  };

  const handleStaffSignIn = (e) => {
    e.preventDefault();
    loginStaffMember({
      hospitalId: selectedHospitalId,
      role: staffRoleType,
      staffId,
      staffName: staffRoleType === 'doctor' ? 'Dr. R. Sharma' : 'Front Desk Receptionist'
    });
    showToast('Logged into Hospital Counter Staff Portal.', 'success', 'Staff Session Active');
  };

  const handleStaffSignUp = (e) => {
    e.preventDefault();
    registerStaffAccount({
      staffName,
      hospitalId: selectedHospitalId,
      department: staffDept,
      employeeId: staffId,
      role: staffRoleType
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md max-h-[92vh] bg-white dark:bg-[#121212] rounded-t-3xl sm:rounded-3xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal p-6 space-y-4 flex flex-col overflow-y-auto no-scrollbar animate-slideUp">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#00D09C] flex items-center justify-center font-bold text-white text-xs">
              MQ
            </div>
            <h3 className="font-bold text-base text-[#44475B] dark:text-white">
              Medi<span className="text-[#00D09C]">Queue</span> Access
            </h3>
          </div>
          <button onClick={closeAuthModal} className="p-1 text-[#7C7E8C] hover:text-[#44475B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Picker: Patient vs Hospital Staff */}
        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() => setSelectedRole('patient')}
            className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all ${
              selectedRole === 'patient'
                ? 'border-[#00D09C] bg-[#E6F9F4] dark:bg-emerald-950/60 shadow-xs'
                : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#7C7E8C]'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-white dark:bg-[#121212] mx-auto flex items-center justify-center text-[#00B386]">
              <User className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-[#44475B] dark:text-white mt-1.5">
              Patient Portal
            </h4>
            <p className="text-[10px] text-[#7C7E8C]">Tokens & OPD pass</p>
          </div>

          <div
            onClick={() => setSelectedRole('staff')}
            className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all ${
              selectedRole === 'staff'
                ? 'border-[#5367FF] bg-[#EEF0FF] dark:bg-indigo-950/60 shadow-xs'
                : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#7C7E8C]'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-white dark:bg-[#121212] mx-auto flex items-center justify-center text-[#5367FF]">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-[#44475B] dark:text-white mt-1.5">
              Receptionist / Staff
            </h4>
            <p className="text-[10px] text-[#7C7E8C]">Queue kiosk & triage</p>
          </div>
        </div>

        {/* Auth Mode Toggle: Sign In vs Sign Up */}
        <div className="flex bg-[#F5F6F8] dark:bg-[#1B1B1B] p-1 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C]">
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${
              authMode === 'signin'
                ? selectedRole === 'patient'
                  ? 'bg-white dark:bg-[#2C2C2C] text-[#00B386] shadow-xs'
                  : 'bg-white dark:bg-[#2C2C2C] text-[#5367FF] shadow-xs'
                : 'text-[#7C7E8C]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${
              authMode === 'signup'
                ? selectedRole === 'patient'
                  ? 'bg-white dark:bg-[#2C2C2C] text-[#00B386] shadow-xs'
                  : 'bg-white dark:bg-[#2C2C2C] text-[#5367FF] shadow-xs'
                : 'text-[#7C7E8C]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up (New)</span>
          </button>
        </div>

        {/* --- PATIENT TAB --- */}
        {selectedRole === 'patient' && (
          <>
            {authMode === 'signin' ? (
              <form onSubmit={handlePatientSignIn} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#7C7E8C]">Your Name (Optional)</label>
                  <input
                    type="text"
                    value={signInName}
                    onChange={(e) => setSignInName(e.target.value)}
                    placeholder={user?.name ? `Current: ${user.name}` : "Enter your full name"}
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] font-semibold text-xs focus:border-[#00D09C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#7C7E8C]">Mobile Number</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-2.5 font-bold text-[#44475B] dark:text-white">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 10-digit mobile"
                      className="w-full h-11 pl-12 pr-24 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] font-semibold text-sm focus:border-[#00D09C] focus:outline-none"
                    />
                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="absolute right-2 top-2 px-2.5 py-1.5 rounded-lg bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-[11px]"
                      >
                        Get OTP
                      </button>
                    ) : (
                      <span className="absolute right-2 top-3 text-[11px] font-bold text-[#00B386]">
                        Sent ✓
                      </span>
                    )}
                  </div>
                </div>

                {otpSent && (
                  <div className="animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-[#7C7E8C]">Enter 4-Digit OTP</label>
                      <span className="text-[10px] text-[#00B386] font-semibold">Demo OTP: 4821</span>
                    </div>
                    <input
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full h-11 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#00D09C] text-center tracking-widest text-lg font-bold focus:outline-none"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full h-11 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>{otpSent ? "Verify & Sign In to Profile" : "Instant Demo Login as Patient"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-1 text-[10px] text-[#7C7E8C]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00B386]" />
                  <span>Ayushman Bharat (ABHA) compliant authentication</span>
                </div>
              </form>
            ) : (
              <form onSubmit={handlePatientSignUp} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#7C7E8C]">Full Name *</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPatientName(val);
                      if (!patientAbha || patientAbha.includes('@abdm')) {
                        setPatientAbha(val ? `${val.toLowerCase().replace(/[^a-z0-9]/g, '')}@abdm` : '');
                      }
                    }}
                    placeholder="Enter full name (e.g. Ramesh Reddy)"
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#00D09C] focus:outline-none font-medium"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-bold text-[#7C7E8C]">Age</label>
                    <input
                      type="number"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#7C7E8C]">Gender</label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value)}
                      className="w-full h-10 px-2 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#7C7E8C]">Mobile Number *</label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#7C7E8C]">ABHA Address</label>
                  <input
                    type="text"
                    value={patientAbha}
                    onChange={(e) => setPatientAbha(e.target.value)}
                    placeholder="e.g. name@abdm"
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none font-medium text-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Create Account & Save Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </>
        )}

        {/* --- STAFF TAB --- */}
        {selectedRole === 'staff' && (
          <>
            {authMode === 'signin' ? (
              <form onSubmit={handleStaffSignIn} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#7C7E8C]">Select Hospital Facility</label>
                  <select
                    value={selectedHospitalId}
                    onChange={(e) => setSelectedHospitalId(e.target.value)}
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#5367FF] focus:outline-none font-medium"
                  >
                    {HOSPITALS_DATA.slice(0, 30).map(h => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-[#7C7E8C]">Staff Role</label>
                    <select
                      value={staffRoleType}
                      onChange={(e) => {
                        setStaffRoleType(e.target.value);
                        setStaffId(e.target.value === 'receptionist' ? 'REC-APOLLO-01' : 'DR-SHARMA-01');
                      }}
                      className="w-full h-10 px-2 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none"
                    >
                      <option value="receptionist">OPD Receptionist</option>
                      <option value="doctor">Consulting Doctor</option>
                      <option value="nurse">Triage Nurse</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#7C7E8C]">Staff ID</label>
                    <input
                      type="text"
                      value={staffId}
                      onChange={(e) => setStaffId(e.target.value)}
                      className="w-full h-10 px-2 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] font-mono font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-[#7C7E8C]">4-Digit Terminal PIN</label>
                    <span className="text-[10px] text-[#5367FF] font-mono">Demo: 1234</span>
                  </div>
                  <input
                    type="password"
                    maxLength={4}
                    value={staffPin}
                    onChange={(e) => setStaffPin(e.target.value)}
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-center tracking-widest font-mono text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-[#5367FF] hover:bg-opacity-90 text-white font-bold text-xs rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center space-x-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Verify Credentials & Enter Queue</span>
                </button>

                <div className="flex items-center justify-center space-x-1 text-[10px] text-[#7C7E8C]">
                  <Lock className="w-3 h-3 text-[#5367FF]" />
                  <span>Restricted: Clinical Terminal ABDM Node</span>
                </div>
              </form>
            ) : (
              <form onSubmit={handleStaffSignUp} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#7C7E8C]">Staff Full Name</label>
                  <input
                    type="text"
                    value={staffName}
                    onChange={(e) => setStaffName(e.target.value)}
                    placeholder="Enter staff full name"
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#7C7E8C]">Hospital Facility</label>
                  <select
                    value={selectedHospitalId}
                    onChange={(e) => setSelectedHospitalId(e.target.value)}
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none"
                  >
                    {HOSPITALS_DATA.slice(0, 30).map(h => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-[#7C7E8C]">Department</label>
                    <input
                      type="text"
                      value={staffDept}
                      onChange={(e) => setStaffDept(e.target.value)}
                      placeholder="Cardiology OPD"
                      className="w-full h-10 px-2 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#7C7E8C]">Employee ID</label>
                    <input
                      type="text"
                      value={staffId}
                      onChange={(e) => setStaffId(e.target.value)}
                      className="w-full h-10 px-2 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#7C7E8C]">Security PIN (4 digits)</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={staffPin}
                    onChange={(e) => setStaffPin(e.target.value)}
                    className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-center tracking-widest font-mono text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-[#5367FF] hover:bg-opacity-90 text-white font-bold text-xs rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center space-x-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Register Staff Member & Authorize</span>
                </button>
              </form>
            )}
          </>
        )}

      </div>
    </div>
  );
}
