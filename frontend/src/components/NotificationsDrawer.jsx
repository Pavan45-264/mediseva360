import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

export default function NotificationsDrawer() {
  const { isNotificationsOpen, setIsNotificationsOpen, notifications } = useApp();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-sm max-h-[85vh] bg-white dark:bg-[#121212] rounded-t-3xl sm:rounded-3xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal p-5 space-y-4 flex flex-col animate-slideUp">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-[#00D09C]" />
            <h3 className="font-bold text-base text-[#44475B] dark:text-white">Notifications</h3>
          </div>
          <button onClick={() => setIsNotificationsOpen(false)} className="text-[#7C7E8C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 no-scrollbar">
          {notifications.map(n => (
            <div
              key={n.id}
              className={`p-3 rounded-xl border text-xs transition-all ${
                !n.read
                  ? 'border-[#00D09C]/40 bg-[#E6F9F4]/40 dark:bg-emerald-950/30'
                  : 'border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#44475B] dark:text-white">{n.title}</span>
                <span className="text-[10px] text-[#7C7E8C]">{n.time}</span>
              </div>
              <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A] leading-relaxed">
                {n.message}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsNotificationsOpen(false)}
          className="w-full py-2.5 rounded-xl bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white font-bold text-xs"
        >
          Close
        </button>

      </div>
    </div>
  );
}
