import React from 'react';
import {
  ShieldCheck, Bell, Mic, Camera, Eye,
  Sparkles, Menu, ZoomIn, Volume2, CheckCircle2
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenScanner,
  onOpenVoice,
  seniorMode,
  setSeniorMode,
  highContrast,
  setHighContrast,
  unreadCount,
  onToggleSidebar
}) {
  return (
    <header className="sticky top-0 z-40 bg-black/85 backdrop-blur-xl border-b border-emerald-500/20 shadow-2xl shadow-black/80">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Left: Hamburger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-xl text-slate-300 hover:text-emerald-400 hover:bg-slate-900 lg:hidden transition-colors border border-slate-800"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/30 group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  src="/images/hero_3d_scanner.jpg"
                  alt="ExpiryGuard 3D Shield"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to Lucide icon if image doesn't load
                    e.target.style.display = 'none';
                  }}
                />
                <ShieldCheck className="w-6 h-6 absolute" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans drop-shadow-sm">
                    Expiry<span className="text-emerald-400">Guard</span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                    3D SMART
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Save Food · Save Money (₹) · Safe Medicines
                </p>
              </div>
            </button>
          </div>

          {/* Right Action Shortcuts (Simple Words & High Contrast) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Scan Photo Button */}
            <button
              onClick={onOpenScanner}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] border border-emerald-300/30"
              title="Point phone camera at grocery or medicine packet"
            >
              <Camera className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span className="font-extrabold">Scan Photo</span>
            </button>

            {/* Quick Voice Assistant Button */}
            <button
              onClick={onOpenVoice}
              className="flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-bold transition-all shadow-md"
              title="Speak in Telugu or English"
            >
              <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="hidden md:inline">తెలుగు / Voice</span>
            </button>

            {/* Senior Citizen Large Mode Toggle */}
            <button
              onClick={() => setSeniorMode(!seniorMode)}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                seniorMode
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title={seniorMode ? 'Senior Large Text Mode Active' : 'Switch to Large Text for Elders'}
            >
              <ZoomIn className="w-4 h-4" />
              <span className="hidden lg:inline">{seniorMode ? '👓 Big Text: ON' : '👓 Big Text'}</span>
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
              title="Urgent Alerts & Spoilage Reminders"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-red-600 text-white text-[11px] font-black flex items-center justify-center ring-2 ring-black animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
