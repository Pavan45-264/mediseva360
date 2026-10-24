import React from 'react';
import {
  X, CheckCircle, FileText, ExternalLink, ShieldCheck,
  PhoneCall, IndianRupee, Sparkles, Building, ArrowRight
} from 'lucide-react';

export default function SchemeDetailModal({ scheme, onClose, onApply }) {
  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              {scheme.badge || 'Official Government Scheme'}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {scheme.title}
            </h2>
            <p className="text-sm font-semibold text-emerald-600 mt-0.5">
              {scheme.teluguTitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Financial Benefit Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Direct Benefit Amount
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">
              {scheme.benefit}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">{scheme.tagline}</p>
          </div>

          <div className="sm:text-right shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Active Beneficiaries
            </span>
            <div className="text-lg sm:text-xl font-black text-slate-900">
              {scheme.beneficiaries}
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-emerald-600" />
            Scheme Overview & Purpose
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            {scheme.overview}
          </p>
        </div>

        {/* Eligibility Criteria */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Who Is Eligible?
          </h4>
          <div className="space-y-2">
            {scheme.eligibility.map((crit, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{crit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-600" />
            Mandatory Documents Required
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {scheme.documents.map((doc, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Portal & Helplines */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-xs">
            <span className="text-slate-500 block text-[11px]">Official Government Helpline:</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1.5 mt-0.5">
              <PhoneCall className="w-3.5 h-3.5" />
              {scheme.helpline}
            </span>
          </div>

          <div className="flex gap-2.5">
            <a
              href={scheme.officialPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-300"
            >
              <span>{scheme.portalName}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => { onClose(); onApply(scheme); }}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-transform hover:scale-105 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/25"
            >
              <span>Check My Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
