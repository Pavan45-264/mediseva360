import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, UserPlus, CheckCircle2 } from 'lucide-react';

export default function WalkInModal() {
  const { isWalkInModalOpen, setIsWalkInModalOpen, registerWalkIn, t } = useApp();
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('42');
  const [patientGender, setPatientGender] = useState('Male');
  const [triageLevel, setTriageLevel] = useState('Moderate');
  const [department, setDepartment] = useState('Cardiology OPD');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [fee, setFee] = useState('450');
  const [createdToken, setCreatedToken] = useState(null);

  if (!isWalkInModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert("Please enter patient name.");
      return;
    }

    const token = registerWalkIn({
      patientName,
      patientAge,
      patientGender,
      triageLevel,
      department,
      fee,
      paymentMethod
    });

    setCreatedToken(token);
    setTimeout(() => {
      setCreatedToken(null);
      setPatientName('');
      setIsWalkInModalOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-sm bg-white dark:bg-[#121212] rounded-t-3xl sm:rounded-3xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal p-5 space-y-4 animate-slideUp">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-[#00D09C]" />
            <h3 className="font-bold text-base text-[#44475B] dark:text-white">Register Walk-in Patient</h3>
          </div>
          <button onClick={() => setIsWalkInModalOpen(false)} className="text-[#7C7E8C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {createdToken ? (
          <div className="py-6 text-center space-y-2 animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-[#00D09C] mx-auto animate-bounce" />
            <h4 className="font-bold text-base text-[#44475B] dark:text-white">
              Token #{createdToken.tokenNumber} Issued!
            </h4>
            <p className="text-xs text-[#7C7E8C]">
              {createdToken.patientName} added to live queue • Fee ₹{createdToken.fee} collected via {paymentMethod}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-[#7C7E8C]">Patient Full Name</label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#00D09C] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-[#7C7E8C]">Age</label>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#00D09C] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-[#7C7E8C]">Gender</label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#00D09C] focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-[#7C7E8C]">Triage Urgency</label>
              <select
                value={triageLevel}
                onChange={(e) => setTriageLevel(e.target.value)}
                className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#00D09C] focus:outline-none font-semibold"
              >
                <option value="Emergency">🚨 Emergency (Immediate Priority)</option>
                <option value="High">⚠️ High Priority</option>
                <option value="Moderate">🟡 Moderate Priority</option>
                <option value="Low">🟢 Low / Routine</option>
                <option value="Unclassified">⚪ Unclassified</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-[#7C7E8C]">Payment Mode</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#00D09C] focus:outline-none"
                >
                  <option value="Cash">Cash at Counter</option>
                  <option value="UPI">UPI / QR Scan</option>
                  <option value="Card">Debit/Credit Card</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-[#7C7E8C]">Fee (₹)</label>
                <input
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="w-full h-10 px-3 mt-1 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#00D09C] focus:outline-none font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 mt-2 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-all"
            >
              Issue Token & Collect ₹{fee}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
