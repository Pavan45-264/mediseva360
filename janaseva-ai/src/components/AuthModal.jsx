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
  Stethoscope,
  Users
} from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, loginAsPatient, loginAsStaff, currentUserRole, portalMode } = useApp();

  const [selectedRole, setSelectedRole] = useState(portalMode === 'staff' ? 'staff' : 'patient'); // 'patient' | 'staff'
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('4821');
  const [selectedHospitalId, setSelectedHospitalId] = useState('hosp-1');
  const [staffRoleType, setStaffRoleType] = useState('receptionist'); // 'receptionist' | 'doctor'
  const [staffId, setStaffId] = useState('REC-APOLLO-01');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = () => {
    if (mobileNumber.length < 10) {
      alert("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    setOtpSent(true);
  };

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    loginAsPatient(`+91 ${mobileNumber}`);
  };

  const handleStaffSubmit = (e) => {
    e.preventDefault();
    loginAsStaff({
      hospitalId: selectedHospitalId,
      role: staffRoleType,
      staffName: staffRoleType === 'receptionist' ? 'Front Desk Receptionist' : 'Dr. R. Sharma'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md max-h-[92vh] bg-white dark:bg-[#121212] rounded-t-3xl sm:rounded-3xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal p-6 space-y-5 flex flex-col overflow-y-auto no-scrollbar animate-slideUp">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#00D09C] flex items-center justify-center font-bold text-white text-xs">
              MQ
            </div>
            <h3 className="font-bold text-base text-[#44475B] dark:text-white">
              Welcome to MediQueue
            </h3>
          </div>
          <button onClick={closeAuthModal} className="p-1 text-[#7C7E8C] hover:text-[#44475B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-extrabold text-[#44475B] dark:text-white">
            How would you like to continue?
          </h2>
          <p className="text-xs text-[#7C7E8C] mt-0.5">
            Select your account type to access OPD queues and tokens
          </p>
        </div>

        {/* Role Picker Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Patient */}
          <div
            onClick={() => setSelectedRole('patient')}
            className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${
              selectedRole === 'patient'
                ? 'border-[#00D09C] bg-[#E6F9F4] dark:bg-emerald-950/60 shadow-sm'
                : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#7C7E8C]'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-white dark:bg-[#121212] mx-auto flex items-center justify-center shadow-xs text-[#00B386]">
              <User className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-[#44475B] dark:text-white mt-2">
              Patient
            </h4>
            <p className="text-[10px] text-[#7C7E8C] mt-1">
              Book tokens, track queue & pay OPD bills
            </p>
          </div>

          {/* Card 2: Hospital Staff / Receptionist */}
          <div
            onClick={() => setSelectedRole('staff')}
            className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${
              selectedRole === 'staff'
                ? 'border-[#5367FF] bg-[#EEF0FF] dark:bg-indigo-950/60 shadow-sm'
                : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#7C7E8C]'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-white dark:bg-[#121212] mx-auto flex items-center justify-center shadow-xs text-[#5367FF]">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-[#44475B] dark:text-white mt-2">
              Receptionist / Staff
            </h4>
            <p className="text-[10px] text-[#7C7E8C] mt-1">
              Call tokens, register walk-ins & view collection
            </p>
          </div>
        </div>

        {/* FORM 1: Patient Mobile OTP Login */}
        {selectedRole === 'patient' && (
          <form onSubmit={handlePatientSubmit} className="space-y-3.5 text-xs">
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
              className="w-full h-12 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-sm rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>{otpSent ? "Verify & Continue as Patient" : "Instant Demo Login as Patient"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-1 text-[11px] text-[#7C7E8C]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00B386]" />
              <span>Ayushman Bharat (ABHA) compliant authentication</span>
            </div>
          </form>
        )}

        {/* FORM 2: Hospital Staff / Receptionist Login */}
        {selectedRole === 'staff' && (
          <form onSubmit={handleStaffSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-[#7C7E8C]">Select Hospital Facility</label>
              <select
                value={selectedHospitalId}
                onChange={(e) => setSelectedHospitalId(e.target.value)}
                className="w-full h-11 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#5367FF] focus:outline-none font-medium"
              >
                {HOSPITALS_DATA.filter(h => h.onboarded).map(h => (
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
                    setStaffId(e.target.value === 'receptionist' ? 'REC-DESK-01' : 'DR-SHARMA-01');
                  }}
                  className="w-full h-10 px-2 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none"
                >
                  <option value="receptionist">OPD Receptionist</option>
                  <option value="doctor">Consulting Doctor</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#7C7E8C]">Staff / Desk ID</label>
                <input
                  type="text"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="w-full h-10 px-2 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#5367FF] hover:bg-opacity-90 text-white font-bold text-sm rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Login to Staff Terminal & Queue</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-1 text-[11px] text-[#7C7E8C]">
              <Lock className="w-3.5 h-3.5 text-[#5367FF]" />
              <span>Admin-provisioned clinical terminal (ABDM Node)</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
