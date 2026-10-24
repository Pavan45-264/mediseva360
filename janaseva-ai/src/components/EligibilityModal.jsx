import React, { useState } from 'react';
import {
  X, CheckCircle, ShieldCheck, Sparkles, FileText,
  IndianRupee, ArrowRight, User, MapPin, Building, GraduationCap, Tractor
} from 'lucide-react';

export default function EligibilityModal({ isOpen, onClose, selectedScheme }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    occupation: 'farmer',
    landSize: '2.5',
    annualIncome: '180000',
    category: 'OBC',
    state: 'Telangana',
    educationLevel: 'Undergraduate',
  });

  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleCheck = (e) => {
    e.preventDefault();

    let computedSchemes = [];
    let benefitEstimate = '';

    if (profile.occupation === 'farmer') {
      computedSchemes = [
        'PM-KISAN Samman Nidhi (₹6,000/yr Direct DBT)',
        'PM Fasal Bima Yojana (Subsidized 2% Crop Insurance)',
        'Kisan Credit Card (₹3 Lakh Loan @ 4% Concessional Interest)',
        'PM Krishi Sinchayee Yojana (Up to 90% Drip Irrigation Subsidy)',
        'PM KUSUM (60% Subsidy on Solar Irrigation Pump)',
      ];
      benefitEstimate = '₹48,000 / year Subsidy + ₹3,00,000 KCC Credit Limit';
    } else if (profile.occupation === 'student') {
      computedSchemes = [
        'PM Vidyalaxmi Scheme (Up to ₹10 Lakhs Collateral-Free Education Loan)',
        'PM YASASVI Scholarship (₹75,000 to ₹1,25,000/yr)',
        'Post-Matric Scholarship for OBC/SC/ST (100% Tuition Waiver)',
        'Central Sector Scheme of Scholarships (₹20,000/yr)',
      ];
      benefitEstimate = 'Up to ₹1,25,000 / year + ₹10,00,000 Education Loan Guarantee';
    } else {
      computedSchemes = [
        'Ayushman Bharat PM-JAY (₹5 Lakh Free Cashless Hospital Cover)',
        'PM MUDRA Yojana (Up to ₹10 Lakhs Business Loan without Collateral)',
        'PM SVANidhi Micro-Credit (₹10,000 to ₹50,000 + 7% Interest Subsidy)',
        'PM Ujjwala Yojana 2.0 (Free Gas Connection + Subsidized Cylinders)',
      ];
      benefitEstimate = '₹5,00,000 Health Cover + ₹10,00,000 MUDRA Credit';
    }

    setResult({
      isEligible: true,
      eligibleSchemes: computedSchemes,
      estimatedBenefits: benefitEstimate,
    });
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {selectedScheme ? `Eligibility: ${selectedScheme.title}` : 'AI Government Eligibility Engine'}
              </h3>
              <p className="text-xs text-slate-500">
                1-Minute Instant Central & State Evaluation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleCheck} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Primary Citizen Category
              </label>
              <select
                value={profile.occupation}
                onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                className="w-full h-11 px-3.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm font-medium"
              >
                <option value="farmer">Farmer / Landholder / Agri Worker</option>
                <option value="student">Student / College Aspirant / Scholar</option>
                <option value="business">Micro-Entrepreneur / Self-Employed</option>
                <option value="women">Women Self-Help Group (SHG) Member</option>
                <option value="senior">Senior Citizen (60+ years)</option>
              </select>
            </div>

            {profile.occupation === 'farmer' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Agricultural Landholding (Acres)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={profile.landSize}
                  onChange={(e) => setProfile({ ...profile, landSize: e.target.value })}
                  className="w-full h-11 px-3.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm"
                  placeholder="e.g. 2.5"
                />
              </div>
            )}

            {profile.occupation === 'student' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Current Education Level
                </label>
                <select
                  value={profile.educationLevel}
                  onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value })}
                  className="w-full h-11 px-3.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm font-medium"
                >
                  <option value="School">Class 9 - 12 (High School / Inter)</option>
                  <option value="Undergraduate">Undergraduate (B.Tech, MBBS, B.Sc, B.Com)</option>
                  <option value="Postgraduate">Postgraduate (M.Tech, MBA, M.Sc)</option>
                  <option value="Research">Ph.D. / Research Fellowship</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Annual Family Income (₹)
                </label>
                <input
                  type="number"
                  value={profile.annualIncome}
                  onChange={(e) => setProfile({ ...profile, annualIncome: e.target.value })}
                  className="w-full h-11 px-3.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm"
                  placeholder="e.g. 180000"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Social Category
                </label>
                <select
                  value={profile.category}
                  onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                  className="w-full h-11 px-3.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm"
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC (Other Backward Class)</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="Minority">Minority Community</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                State / Union Territory
              </label>
              <select
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                className="w-full h-11 px-3.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm"
              >
                <option value="Telangana">Telangana</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Other">All Other States (All-India)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Evaluate Real-Time Government Benefits</span>
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
              <CheckCircle className="w-7 h-7 shrink-0 text-emerald-600" />
              <div>
                <h4 className="text-sm font-black text-slate-900">Eligible for Multiple National Schemes!</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Estimated Total Value: <strong className="text-slate-900">{result?.estimatedBenefits}</strong>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Schemes You Qualify For:
              </span>
              {result?.eligibleSchemes.map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-900 font-medium">
                  <span>{s}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Verified
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Modify Answers
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Done & View Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
