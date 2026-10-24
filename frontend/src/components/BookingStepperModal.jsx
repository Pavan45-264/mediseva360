import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTORS_DATA } from '../data/doctorsData';
import { QRCodeSVG } from 'qrcode.react';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  CreditCard,
  ShieldAlert,
  ArrowRight,
  QrCode,
  Check,
  AlertTriangle,
  Lock,
  Printer,
  Download,
  Users
} from 'lucide-react';
import { getAvailableBookingDates, getAvailableTimeSlots, getTodayFormatted } from '../utils/dateUtils';

export default function BookingStepperModal() {
  const {
    bookingModalState,
    closeBookingModal,
    completeBooking,
    user,
    setPatientTab,
    setIsEmergencyModalOpen,
    t
  } = useApp();

  const { isOpen, hospital, doctor: initialDoctor } = bookingModalState;

  // Flow step (1: Details & Slot, 2: Patient & Triage, 3: Order Summary & Pay, 4: Success Ticket)
  const [step, setStep] = useState(1);

  // Dynamic Date Options
  const dateOptions = getAvailableBookingDates(5);

  // Form states
  const [selectedDept, setSelectedDept] = useState("Cardiology OPD");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => dateOptions[0]);
  const [selectedSlot, setSelectedSlot] = useState("11:30 AM");
  const [patientName, setPatientName] = useState(user?.name || "Pavan Kumar");
  const [patientAge, setPatientAge] = useState(34);
  const [patientGender, setPatientGender] = useState("Male");
  const [triageLevel, setTriageLevel] = useState("Moderate");
  const [paymentMethod, setPaymentMethod] = useState("UPI (Google Pay)");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedToken, setConfirmedToken] = useState(null);

  // Re-synchronize modal state every time a new hospital or doctor is opened
  useEffect(() => {
    if (isOpen && hospital) {
      setStep(1);
      const depts = hospital.departments?.length ? hospital.departments : [
        { id: 'd1', name: 'General Medicine OPD', code: 'GEN' },
        { id: 'd2', name: 'Cardiology OPD', code: 'CARD' }
      ];
      setSelectedDept(depts[0]?.name || "General Medicine OPD");
      setSelectedDoctor(initialDoctor || null);
      const dates = getAvailableBookingDates(5);
      setSelectedDate(dates[0]);
      const slots = getAvailableTimeSlots(dates[0]);
      setSelectedSlot(slots[0] || "11:30 AM");
      setPatientName(user?.name || "Pavan Kumar");
      setPatientAge(34);
      setPatientGender("Male");
      setTriageLevel("Moderate");
      setPaymentMethod("UPI (Google Pay)");
      setIsProcessing(false);
      setConfirmedToken(null);
    }
  }, [isOpen, hospital, initialDoctor, user]);

  // Adjust time slots when date changes to prevent booking past slots
  useEffect(() => {
    const slots = getAvailableTimeSlots(selectedDate);
    if (!slots.includes(selectedSlot)) {
      setSelectedSlot(slots[0] || "11:30 AM");
    }
  }, [selectedDate]);

  if (!isOpen || !hospital) return null;

  // Filter available doctors
  const availableDoctors = DOCTORS_DATA.filter(d => d.hospitalId === hospital.id);

  // Dynamic available time slots based on selected date
  const slotOptions = getAvailableTimeSlots(selectedDate);

  const handleNextStep = () => {
    if (step === 2 && triageLevel === 'Emergency') {
      const proceed = confirm("Emergency detected: Are you in severe acute distress (e.g. acute chest pain or breathing failure)? If yes, please call 108 immediately or proceed directly to the 24x7 Emergency Trauma Unit.");
      if (!proceed) {
        setIsEmergencyModalOpen(true);
        closeBookingModal();
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleConfirmAndPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const tok = completeBooking({
        hospital,
        doctor: selectedDoctor || { name: "Senior OPD Physician" },
        department: selectedDept,
        date: selectedDate,
        slotTime: selectedSlot,
        patientName,
        triageLevel,
        amount: hospital.consultationFee,
        paymentMethod
      });
      setConfirmedToken(tok);
      setIsProcessing(false);
      setStep(4); // Success screen
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg max-h-[92vh] bg-white dark:bg-[#121212] rounded-t-3xl sm:rounded-3xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal flex flex-col overflow-hidden animate-slideUp">
        
        {/* Modal Header with Explicit Hospital Name & Verified Fee */}
        <div className="p-4 border-b border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D09C] animate-pulse flex-shrink-0" />
            <div>
              <h3 className="font-bold text-sm text-[#44475B] dark:text-white leading-tight">
                {step === 4 ? "OPD Token Confirmed" : `Book OPD Token • ${hospital.name}`}
              </h3>
              <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">
                {hospital.city}, {hospital.state || 'India'} • {hospital.isGovt ? '🏛️ Free Govt OPD (₹0)' : `₹${hospital.consultationFee} OPD Fee`}
              </p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-1.5 rounded-full hover:bg-[#F5F6F8] dark:hover:bg-[#1B1B1B] text-[#7C7E8C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Indicator */}
        {step < 4 && (
          <div className="px-5 pt-3 pb-1 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5 font-semibold text-[#00B386]">
              <span className="w-5 h-5 rounded-full bg-[#00D09C] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Slot</span>
            </div>
            <div className={`h-0.5 flex-1 mx-2 ${step >= 2 ? 'bg-[#00D09C]' : 'bg-[#E8E8EC] dark:bg-[#2C2C2C]'}`} />
            <div className={`flex items-center space-x-1.5 font-semibold ${step >= 2 ? 'text-[#00B386]' : 'text-[#7C7E8C]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#00D09C] text-white' : 'bg-[#E8E8EC] text-[#7C7E8C]'}`}>2</span>
              <span>Triage</span>
            </div>
            <div className={`h-0.5 flex-1 mx-2 ${step >= 3 ? 'bg-[#00D09C]' : 'bg-[#E8E8EC] dark:bg-[#2C2C2C]'}`} />
            <div className={`flex items-center space-x-1.5 font-semibold ${step >= 3 ? 'text-[#00B386]' : 'text-[#7C7E8C]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#00D09C] text-white' : 'bg-[#E8E8EC] text-[#7C7E8C]'}`}>3</span>
              <span>Pay</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">

          {/* STEP 1: Department, Doctor & Slot Selection */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Department */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Department</label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {(hospital.departments?.length ? hospital.departments : [
                    { id: 'd1', name: 'General Medicine OPD', code: 'GEN' },
                    { id: 'd2', name: 'Cardiology OPD', code: 'CARD' }
                  ]).map(dept => (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDept(dept.name)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        selectedDept === dept.name
                          ? 'border-[#00D09C] bg-[#E6F9F4] dark:bg-emerald-950/60 font-bold text-[#00B386]'
                          : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white'
                      }`}
                    >
                      <span className="text-[10px] text-[#5367FF] font-semibold block">{dept.code || 'OPD'}</span>
                      <span className="line-clamp-1">{dept.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctor */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Consulting Clinician</label>
                <div className="space-y-2 mt-1.5">
                  {(availableDoctors.length ? availableDoctors : [
                    { id: 'doc-gen', name: 'Dr. Duty Physician', speciality: 'General OPD', fee: hospital.consultationFee, rating: 4.8 }
                  ]).map(doc => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctor(doc)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedDoctor?.id === doc.id
                          ? 'border-[#00D09C] bg-[#E6F9F4] dark:bg-emerald-950/60'
                          : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-white dark:bg-[#1B1B1B]'
                      }`}
                    >
                      <div className="text-xs">
                        <span className="font-bold text-[#44475B] dark:text-white">{doc.name}</span>
                        <p className="text-[11px] text-[#7C7E8C]">{doc.speciality} • ★ {doc.rating}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#00B386]">₹{doc.fee}</span>
                        {selectedDoctor?.id === doc.id && <Check className="w-4 h-4 text-[#00B386] ml-auto" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Consultation Date</label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {dateOptions.map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`py-2 px-1 text-center rounded-xl border text-xs transition-all ${
                        selectedDate === d
                          ? 'border-[#00D09C] bg-[#00D09C] text-white font-bold'
                          : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#7C7E8C]'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Select OPD Time Window</label>
                  <span className="text-[10px] text-[#00B386] font-medium">✓ Past slots excluded</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {slotOptions.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSlot(s)}
                      className={`py-2 rounded-xl border text-xs text-center transition-all ${
                        selectedSlot === s
                          ? 'border-[#5367FF] bg-[#EEF0FF] dark:bg-indigo-950/70 text-[#5367FF] font-bold'
                          : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Patient Info & Clinical Triage */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Family Profile Quick Switcher */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Select Patient Profile</label>
                <div className="flex space-x-1.5 overflow-x-auto pb-1 mt-1.5 no-scrollbar">
                  {user.familyMembers?.map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setPatientName(m.name);
                        setPatientAge(m.age);
                        setPatientGender(m.gender);
                      }}
                      className={`px-3 py-1.5 text-xs rounded-xl border transition-all flex items-center space-x-1 flex-shrink-0 ${
                        patientName === m.name
                          ? 'border-[#00D09C] bg-[#E6F9F4] dark:bg-emerald-950/60 text-[#00B386] font-bold shadow-xs'
                          : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#7C7E8C]'
                      }`}
                    >
                      <User className="w-3 h-3" />
                      <span>{m.relation}: {m.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full h-11 px-3 mt-1 text-xs bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#00D09C] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Age</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full h-11 px-3 mt-1 text-xs bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#00D09C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full h-11 px-3 mt-1 text-xs bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#00D09C] focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Clinical Triage Self-Assessment */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Triage Symptom Urgency</label>
                  <span className="text-[10px] text-[#5367FF]">ABDM Clinical Protocol</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { level: 'Routine / Low', val: 'Low', desc: 'Prescription refill, general follow-up', color: 'border-emerald-500' },
                    { level: 'Moderate', val: 'Moderate', desc: 'Mild fever, joint pain, cough', color: 'border-yellow-500' },
                    { level: 'High Urgency', val: 'High', desc: 'High fever, acute pain, vomiting', color: 'border-amber-500' },
                    { level: 'Emergency (108)', val: 'Emergency', desc: 'Severe chest pain, heavy bleeding', color: 'border-rose-500' }
                  ].map(item => (
                    <button
                      key={item.val}
                      onClick={() => setTriageLevel(item.val)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        triageLevel === item.val
                          ? `${item.color} bg-[#EEF0FF] dark:bg-indigo-950/70 font-bold text-[#44475B] dark:text-white shadow-xs`
                          : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#7C7E8C]'
                      }`}
                    >
                      <span className="font-bold text-xs block text-[#44475B] dark:text-white">{item.level}</span>
                      <span className="text-[10px] text-[#7C7E8C] line-clamp-1 mt-0.5">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#EEF0FF] dark:bg-indigo-950/40 rounded-xl text-xs text-[#5367FF] flex items-center space-x-2">
                <Lock className="w-4 h-4 flex-shrink-0" />
                <span>Encrypted under Digital Personal Data Protection (DPDP) Act 2023.</span>
              </div>
            </div>
          )}

          {/* STEP 3: Groww-Style Order Summary & Payment Mode */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Order Summary Card */}
              <div className="p-4 bg-[#F5F6F8] dark:bg-[#1B1B1B] rounded-2xl border border-[#E8E8EC] dark:border-[#2C2C2C] space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Order Summary</h4>
                
                <div className="flex justify-between text-xs text-[#44475B] dark:text-white">
                  <span>Hospital OPD Consultation Fee</span>
                  <span className="font-semibold">₹{hospital.consultationFee}</span>
                </div>
                <div className="flex justify-between text-xs text-[#44475B] dark:text-white">
                  <span>Digital Queue & ABHA Registration</span>
                  <span className="font-semibold text-[#00B386]">FREE (₹0)</span>
                </div>
                <div className="flex justify-between text-xs text-[#44475B] dark:text-white">
                  <span>GST (Healthcare Exemption)</span>
                  <span className="font-semibold text-[#00B386]">₹0.00</span>
                </div>

                <div className="pt-2 border-t border-[#E8E8EC] dark:border-[#2C2C2C] flex justify-between text-sm font-extrabold text-[#44475B] dark:text-white">
                  <span>Total Amount Payable</span>
                  <span className="text-[#00B386]">₹{hospital.consultationFee}</span>
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#7C7E8C]">Select Payment Method</label>
                <div className="space-y-2 mt-2">
                  {[
                    { id: 'UPI (Google Pay)', label: 'Google Pay / PhonePe / Paytm UPI', sub: 'Instant Verified Webhook' },
                    { id: 'MediQueue Hospital Balance', label: `MediQueue Wallet (Bal: ₹${user.walletBalance})`, sub: '1-tap instant deduction' },
                    { id: 'Credit / Debit Card', label: 'Debit or Credit Card', sub: 'Visa, Mastercard, RuPay' },
                    { id: 'Pay at Hospital Counter', label: 'Cash / Card at Hospital Reception', sub: 'Pay upon OPD check-in' }
                  ].map(method => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-[#00D09C] bg-[#E6F9F4] dark:bg-emerald-950/60'
                          : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-white dark:bg-[#1B1B1B]'
                      }`}
                    >
                      <div className="text-xs">
                        <span className="font-bold text-[#44475B] dark:text-white">{method.label}</span>
                        <p className="text-[10px] text-[#7C7E8C]">{method.sub}</p>
                      </div>
                      {paymentMethod === method.id && (
                        <div className="w-4 h-4 rounded-full bg-[#00D09C] text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success Ticket Screen */}
          {step === 4 && confirmedToken && (
            <div className="space-y-4 text-center py-2 animate-fadeIn">
              {/* Green Tick Animation */}
              <div className="w-14 h-14 rounded-full bg-[#E6F9F4] text-[#00B386] border-2 border-[#00D09C] mx-auto flex items-center justify-center shadow-md animate-bounce">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="text-lg font-black text-[#44475B] dark:text-white">
                  Payment Successful & Token Confirmed!
                </h3>
                <p className="text-xs text-[#7C7E8C]">
                  Your OPD token is registered on the National Health Grid live queue.
                </p>
              </div>

              {/* Requirement 1: Realtime Queue Wait Banner */}
              <div className="p-3 bg-gradient-to-r from-[#E6F9F4] to-[#EEF0FF] dark:from-emerald-950/50 dark:to-indigo-950/50 rounded-2xl border border-[#00D09C]/40 text-center shadow-xs">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#00B386] block">
                  Realtime Queue Telemetry
                </span>
                <div className="text-base sm:text-lg font-black text-[#1E3A8A] dark:text-emerald-300 mt-0.5">
                  Your token is #{confirmedToken.tokenNumber}, about {confirmedToken.estimatedWaitMins} min wait
                </div>
                <p className="text-[11px] text-[#7C7E8C] mt-0.5">
                  {confirmedToken.tokensAhead} patients ahead in {confirmedToken.department} • Polling live every 10s
                </p>
              </div>

              {/* Requirement 2: Digital Token Pass with QR Code */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F5F6F8] to-white dark:from-[#1B1B1B] dark:to-[#222222] border-2 border-[#00D09C] text-left space-y-3 shadow-groww-card">
                <div className="flex justify-between items-center pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
                  <span className="text-[11px] font-bold text-[#00B386]">ABDM DIGITAL OPD TOKEN PASS</span>
                  <span className="text-xs font-extrabold text-[#5367FF] bg-[#EEF0FF] dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                    {confirmedToken.slotTime}
                  </span>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
                  <div>
                    <span className="text-[10px] text-[#7C7E8C]">Your Token Number</span>
                    <div className="text-3xl font-black text-[#44475B] dark:text-white">
                      {confirmedToken.tokenNumber}
                    </div>
                    <div className="mt-1">
                      <span className="text-[10px] text-[#7C7E8C]">Currently Serving: </span>
                      <span className="text-xs font-bold text-[#00B386]">{confirmedToken.currentServingToken}</span>
                    </div>
                  </div>

                  {/* QR Code (Requirement 2) */}
                  <div className="p-1.5 bg-white rounded-xl border border-[#E8E8EC] shadow-xs flex flex-col items-center">
                    <QRCodeSVG
                      value={confirmedToken.qrCodeData || `MEDIQ-${confirmedToken.tokenNumber}`}
                      size={88}
                      level="M"
                      includeMargin={false}
                    />
                    <span className="text-[8px] font-mono font-bold text-slate-500 mt-1">SCAN AT COUNTER</span>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-[#44475B] dark:text-slate-200 pt-1 border-t border-[#E8E8EC] dark:border-[#2C2C2C]">
                  <p><strong>Patient:</strong> {confirmedToken.patientName}</p>
                  <p><strong>Hospital:</strong> {confirmedToken.hospitalName}</p>
                  <p><strong>Department:</strong> {confirmedToken.department}</p>
                  <p><strong>Clinician:</strong> {confirmedToken.doctorName}</p>
                  <p><strong>Room:</strong> {confirmedToken.roomNo}</p>
                </div>
              </div>

              {/* Action Buttons: View Queue & Download / Print Token (Requirement 2) */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    closeBookingModal();
                    setPatientTab('appointments');
                  }}
                  className="py-3 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  View Live Queue
                </button>
                <button
                  onClick={() => {
                    // Download / Print Token flow
                    const printContent = `
                      <html>
                        <head>
                          <title>OPD Token - ${confirmedToken.tokenNumber}</title>
                          <style>
                            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; padding: 30px; color: #1E293B; background: #fff; }
                            .card { border: 2.5px dashed #00D09C; border-radius: 20px; padding: 25px; max-width: 400px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
                            .hospital { font-size: 20px; font-weight: 800; color: #1E3A8A; }
                            .token { font-size: 48px; font-weight: 900; color: #00B386; margin: 12px 0; }
                            .wait { background: #E6F9F4; color: #00B386; padding: 10px; border-radius: 12px; font-weight: bold; font-size: 15px; margin-bottom: 15px; }
                            .meta { font-size: 13px; margin: 6px 0; text-align: left; }
                            .footer { font-size: 11px; color: #64748B; margin-top: 15px; border-top: 1px solid #E2E8F0; padding-top: 10px; }
                          </style>
                        </head>
                        <body>
                          <div class="card">
                            <div class="hospital">${confirmedToken.hospitalName}</div>
                            <div style="font-size:12px; color:#64748B; margin-top:4px;">ABDM Health Facility Registry Verified OPD Pass</div>
                            <div class="token">Token #${confirmedToken.tokenNumber}</div>
                            <div class="wait">Your token is #${confirmedToken.tokenNumber}, about ${confirmedToken.estimatedWaitMins} min wait</div>
                            <div class="meta"><strong>Patient:</strong> ${confirmedToken.patientName}</div>
                            <div class="meta"><strong>Department:</strong> ${confirmedToken.department}</div>
                            <div class="meta"><strong>Doctor:</strong> ${confirmedToken.doctorName}</div>
                            <div class="meta"><strong>Slot:</strong> ${confirmedToken.slotTime} (${confirmedToken.date})</div>
                            <div class="meta"><strong>Room:</strong> ${confirmedToken.roomNo}</div>
                            <div class="footer">Please show this digital token or QR pass at the doctor's room 10 minutes prior to your turn.</div>
                          </div>
                        </body>
                      </html>
                    `;
                    const win = window.open('', '_blank');
                    if (win) {
                      win.document.write(printContent);
                      win.document.close();
                      win.focus();
                      setTimeout(() => { win.print(); }, 300);
                    } else {
                      window.print();
                    }
                  }}
                  className="py-3 rounded-xl border border-[#5367FF] hover:bg-[#EEF0FF] dark:hover:bg-indigo-950/50 text-[#5367FF] font-bold text-xs flex items-center justify-center space-x-1.5 transition-all active:scale-95 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Download / Print Token</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls (Groww-Style Full Width Green Button) */}
        {step < 4 && (
          <div className="p-4 border-t border-[#E8E8EC] dark:border-[#2C2C2C] bg-white dark:bg-[#121212]">
            {step < 3 ? (
              <button
                onClick={handleNextStep}
                className="w-full h-12 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-sm rounded-xl shadow-md active:scale-[0.99] transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleConfirmAndPay}
                disabled={isProcessing}
                className="w-full h-12 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-sm rounded-xl shadow-md active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  <>
                    <span>{hospital.consultationFee === 0 ? 'Confirm Free OPD Token (₹0)' : `Pay & Confirm (₹${hospital.consultationFee})`}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
