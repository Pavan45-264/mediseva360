import React, { useState } from 'react';
import {
  Tractor, IndianRupee, Calculator, CheckCircle2,
  TrendingUp, Shield, HelpCircle, PhoneCall, ArrowRight, Wheat, Sun
} from 'lucide-react';

export default function FarmerLoansHub({ onOpenEligibility }) {
  const [landAcres, setLandAcres] = useState(3);
  const [cropType, setCropType] = useState('paddy');

  const cropScaleOfFinance = {
    paddy: 44000,
    wheat: 40000,
    cotton: 58000,
    chilli: 80000,
  };

  const loanEligible = Math.round(landAcres * (cropScaleOfFinance[cropType] || 44000));
  const interestSubventionRate = 4;
  const annualInterest = Math.round(loanEligible * (interestSubventionRate / 100));

  const mspRates = [
    { crop: 'Paddy (Common)', msp: '₹2,300 / qtl', hike: '+₹117' },
    { crop: 'Wheat', msp: '₹2,275 / qtl', hike: '+₹150' },
    { crop: 'Cotton (Medium)', msp: '₹7,121 / qtl', hike: '+₹501' },
    { crop: 'Maize', msp: '₹2,090 / qtl', hike: '+₹135' },
    { crop: 'Soyabean', msp: '₹4,892 / qtl', hike: '+₹292' },
  ];

  return (
    <section id="farmer-hub" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* MSP Live Rates Ticker */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-900">
              Live MSP Government Procurement Rates (2026-27)
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar text-xs">
            {mspRates.map((m, i) => (
              <div key={i} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-amber-200 shrink-0 shadow-xs">
                <span className="font-bold text-slate-800">{m.crop}:</span>
                <span className="text-amber-800 font-extrabold">{m.msp}</span>
                <span className="text-[10px] text-emerald-700 font-mono bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                  {m.hike}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column: KCC Calculator + Agricultural Welfare */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: KCC Calculator */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-md space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Kisan Credit Card (KCC) Loan Calculator
                </h3>
                <p className="text-xs text-slate-500">
                  Calculate your bank credit eligibility at 4% concessional interest
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Cultivated Landholding:</span>
                  <span className="text-emerald-700 text-sm font-black">{landAcres} Acres</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={landAcres}
                  onChange={(e) => setLandAcres(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Primary Crop Season:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'paddy', label: 'Paddy / Rice' },
                    { id: 'wheat', label: 'Wheat' },
                    { id: 'cotton', label: 'Cotton' },
                    { id: 'chilli', label: 'Chilli / Spice' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCropType(c.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        cropType === c.id
                          ? 'bg-emerald-600 text-white font-black shadow-sm'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Matrix Box */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 grid grid-cols-2 gap-4 shadow-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Estimated Loan Limit
                  </span>
                  <span className="text-2xl font-black text-slate-900">
                    ₹{loanEligible.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-700 block mt-0.5 font-semibold">Zero collateral up to ₹1.6L</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Annual Interest (4% p.a.)
                  </span>
                  <span className="text-2xl font-black text-emerald-700">
                    ₹{annualInterest.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">3% Prompt repayment rebate</span>
                </div>
              </div>

              <button
                onClick={onOpenEligibility}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Check My KCC Loan Eligibility</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right: Subsidies & Benefits */}
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4 shadow-sm">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5 text-emerald-700" />
                Agricultural Subsidies & Grants
              </span>

              <h3 className="text-2xl font-black text-slate-900">
                Direct Input Subsidies & Solar Power
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Empowering smallholder farmers with transparent DBT input subsidies, subsidized neem-coated urea, and clean solar irrigation power.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Neem Coated Urea Subsidy</h4>
                    <p className="text-[11px] text-slate-500">Fixed rate of ₹242 per 45kg bag across all PACS primary societies.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">PM KUSUM Solar Pump Grants</h4>
                    <p className="text-[11px] text-slate-500">60% subsidy to install standalone 3HP to 7.5HP solar borewell pumps.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">24x7 Kisan Call Centre Helpline: 1800-180-1551</h4>
                    <p className="text-[11px] text-slate-500">Free telephonic agricultural advisory in Telugu and all regional languages.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
