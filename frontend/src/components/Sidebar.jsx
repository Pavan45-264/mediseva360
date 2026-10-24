import React from 'react';
import {
  LayoutDashboard, Camera, Package, Calendar, UtensilsCrossed,
  Bell, BarChart3, Users, Mic, Settings, Award, X, Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
  expiringCount,
  expiredCount
}) {
  const navItems = [
    { id: 'dashboard', label: 'Home Dashboard', icon: LayoutDashboard },
    { id: 'scanner', label: 'Scan Photo', icon: Camera, badge: 'Camera AI', badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' },
    { id: 'planner', label: 'Eat First Planner', icon: UtensilsCrossed, badge: expiringCount > 0 ? `${expiringCount} Eat Soon` : null, badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-400/30' },
    { id: 'inventory', label: 'My Food & Meds', icon: Package },
    { id: 'calendar', label: 'Calendar View', icon: Calendar },
    { id: 'notifications', label: 'Expiry Alerts', icon: Bell, badge: expiredCount > 0 ? `${expiredCount} Expired` : null, badgeColor: 'bg-red-500/20 text-red-300 border border-red-400/30' },
    { id: 'analytics', label: 'Money Saved (₹)', icon: BarChart3 },
    { id: 'voice', label: 'Voice Assistant', icon: Mic, badge: 'తెలుగు / Eng', badgeColor: 'bg-teal-500/20 text-teal-300 border border-teal-400/30' },
    { id: 'family', label: 'Family Members', icon: Users },
    { id: 'settings', label: 'Big Text & Settings', icon: Settings },
    { id: 'about', label: 'Conclave & Vision', icon: Award }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-20 left-0 z-50 lg:z-30 h-full lg:h-[calc(100vh-5rem)] w-64 bg-slate-950/90 backdrop-blur-2xl border-r border-emerald-500/20 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl shadow-black ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header on Mobile */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-extrabold text-white text-sm">Navigation</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Item List */}
        <div className="p-3 space-y-1.5 overflow-y-auto flex-1">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400/70 px-3 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Menu Options
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-400/40 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent hover:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badgeColor || 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Household Status */}
        <div className="p-3.5 m-3 rounded-2xl bg-slate-900/90 border border-emerald-500/20 shadow-inner">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-white">100% Private & Offline</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Your food & medicine photos stay safely in your browser.
          </p>
        </div>
      </aside>
    </>
  );
}
