import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, AlertTriangle, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';

export default function ReportWrongDataModal() {
  const {
    reportingHospital,
    isReportModalOpen,
    closeReportModal,
    submitHospitalReport
  } = useApp();

  const [issueType, setIssueType] = useState('Incorrect OPD Timings');
  const [details, setDetails] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isReportModalOpen || !reportingHospital) return null;

  const issueCategories = [
    'Incorrect OPD Timings',
    'Outdated Consultation Fee / Free OPD',
    'Wrong Hospital Phone or Emergency Contact',
    'Inaccurate Available Beds or ICU Count',
    'Doctor or Department Not Available',
    'Incorrect GPS / Map Location',
    'Other Discrepancy'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details.trim()) {
      alert('Please describe the incorrect data so our verification team can fix it.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitHospitalReport({
        hospitalId: reportingHospital.id,
        hospitalName: reportingHospital.name,
        issueType,
        details,
        contactNumber,
        timestamp: new Date().toISOString()
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setDetails('');
        closeReportModal();
      }, 1400);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md max-h-[92vh] bg-white dark:bg-[#121212] rounded-t-3xl sm:rounded-3xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal p-5 flex flex-col overflow-y-auto no-scrollbar animate-slideUp">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
          <div className="flex items-center space-x-2 text-rose-500">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-base text-[#44475B] dark:text-white">
              Report Data Discrepancy
            </h3>
          </div>
          <button
            onClick={closeReportModal}
            className="p-1.5 rounded-full hover:bg-[#F5F6F8] dark:hover:bg-[#1B1B1B] text-[#7C7E8C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3 animate-fadeIn">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-[#00D09C] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h4 className="font-bold text-base text-[#44475B] dark:text-white">
              Correction Report Saved!
            </h4>
            <p className="text-xs text-[#7C7E8C] max-w-xs mx-auto">
              Your report for <strong>{reportingHospital.name}</strong> has been logged in the ABDM audit database.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-3 text-xs">
            {/* Hospital target banner */}
            <div className="p-3 rounded-xl bg-[#F5F6F8] dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C]">
              <span className="text-[10px] uppercase font-bold text-[#7C7E8C]">Target Hospital</span>
              <h4 className="font-bold text-sm text-[#44475B] dark:text-white line-clamp-1">
                {reportingHospital.name}
              </h4>
              <p className="text-[11px] text-[#7C7E8C]">
                {reportingHospital.city}, {reportingHospital.state || 'India'}
              </p>
            </div>

            {/* Issue Category */}
            <div>
              <label className="font-bold text-[#44475B] dark:text-white block mb-1">
                What information is inaccurate?
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full h-11 px-3 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] font-semibold text-xs focus:border-[#00D09C] focus:outline-none"
              >
                {issueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Correction Details */}
            <div>
              <label className="font-bold text-[#44475B] dark:text-white block mb-1">
                Provide correct information / Details *
              </label>
              <textarea
                required
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="e.g. The OPD timing has changed to 8:30 AM - 1:30 PM, or the general physician fee is updated..."
                className="w-full p-3 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-xs focus:border-[#00D09C] focus:outline-none resize-none"
              />
            </div>

            {/* Contact Phone (Optional) */}
            <div>
              <label className="font-bold text-[#7C7E8C] block mb-1">
                Your Contact Number or ABHA ID (Optional for follow-up)
              </label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Mobile number or ABHA address"
                className="w-full h-11 px-3 bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] text-xs focus:border-[#00D09C] focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-1.5 text-[10px] text-[#7C7E8C]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00D09C]" />
              <span>Crowdsourced corrections are reconciled with ABDM HFR nodal authorities.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center space-x-1.5"
            >
              {isSubmitting ? (
                <span>Submitting to Database...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Correction Report</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
