import React from 'react';
import { Sprout, PhoneCall, ShieldCheck, ExternalLink, Heart } from 'lucide-react';

export default function JanasevaFooter() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black shadow-sm">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-slate-900">JANASEVA <span className="text-emerald-600">AI</span></span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Official citizen welfare & agricultural intelligence portal. Empowering Indian farmers, students, and families with transparent government benefits.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Farmer & Agriculture</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#schemes-catalogue" className="hover:text-emerald-700 font-medium">PM-KISAN Samman Nidhi</a></li>
              <li><a href="#schemes-catalogue" className="hover:text-emerald-700 font-medium">PM Fasal Bima Crop Insurance</a></li>
              <li><a href="#schemes-catalogue" className="hover:text-emerald-700 font-medium">Kisan Credit Card (KCC)</a></li>
              <li><a href="#schemes-catalogue" className="hover:text-emerald-700 font-medium">PM Krishi Sinchayee Drip Subsidy</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Citizen Welfare</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#schemes-catalogue" className="hover:text-emerald-700 font-medium">Ayushman Bharat PM-JAY</a></li>
              <li><a href="#schemes-catalogue" className="hover:text-emerald-700 font-medium">PM MUDRA Business Loans</a></li>
              <li><a href="#scholarships" className="hover:text-emerald-700 font-medium">National Scholarship Portal</a></li>
              <li><a href="#vacancies" className="hover:text-emerald-700 font-medium">Sarkari Naukri Jobs Hub</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Helplines & Support</h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Kisan Call Centre: 1800-180-1551</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900 font-semibold bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Ayushman PM-JAY Toll-Free: 14555</span>
              </div>
              <p className="text-[10px] text-slate-500 pt-1">
                Toll-free 24x7 support in Telugu, Hindi, English and all regional languages.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2026 Janaseva AI — National Citizen Services & Digital Benefits Mission. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-800 cursor-pointer">Digital India Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
