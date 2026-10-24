import React, { useState } from 'react';
import {
  Bell, CheckCircle2, AlertTriangle, AlertOctagon,
  Clock, ShieldAlert, Sparkles, Settings2, Check
} from 'lucide-react';

export default function NotificationsView({
  products = [],
  onMarkAsUsed,
  onDiscardItem
}) {
  const [schedule7Days, setSchedule7Days] = useState(true);
  const [schedule3Days, setSchedule3Days] = useState(true);
  const [schedule1Day, setSchedule1Day] = useState(true);
  const [browserPermission, setBrowserPermission] = useState(false);

  // Generate dynamic notification feed from active products
  const notifications = products
    .filter(p => p.status === 'expired' || p.status === 'expiring_soon')
    .map(p => {
      const isExpired = p.status === 'expired';
      return {
        id: `notif-${p.id}`,
        productId: p.id,
        title: isExpired ? `Expired Product: ${p.name}` : `Expiring Soon: ${p.name}`,
        message: isExpired
          ? `This item expired ${Math.abs(p.daysRemaining)} days ago. Please inspect and discard safely.`
          : `Expires in ${p.daysRemaining === 0 ? 'Today' : `${p.daysRemaining} days`}. Keep in mind for today's meals.`,
        type: isExpired ? 'danger' : 'warning',
        time: isExpired ? 'Urgent Alert' : 'Today',
        product: p
      };
    });

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          setBrowserPermission(true);
        }
      });
    } else {
      setBrowserPermission(true); // Fallback simulated
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1400px] mx-auto pb-16">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/30 mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>EXPIRY NOTIFICATION CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Notifications & Reminder Schedules
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Receive proactive reminders before dairy, bread, and medicines expire.
          </p>
        </div>

        <button
          onClick={requestNotificationPermission}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
        >
          <Bell className="w-4 h-4 text-slate-950 stroke-[3]" />
          <span>{browserPermission ? '✓ Notifications Active' : 'Enable Browser Push Alerts'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Notification Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Active Expiry Alerts ({notifications.length})
            </h3>
          </div>

          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notif) => {
                const isDanger = notif.type === 'danger';

                return (
                  <div
                    key={notif.id}
                    className={`p-5 rounded-3xl border shadow-xl flex items-start justify-between gap-4 transition-all ${
                      isDanger
                        ? 'bg-red-950/20 border-red-500/40'
                        : 'bg-amber-950/20 border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2.5 rounded-2xl mt-0.5 shrink-0 ${
                        isDanger ? 'bg-red-500 text-white' : 'bg-amber-500 text-slate-950 font-bold'
                      }`}>
                        {isDanger ? <AlertOctagon className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-black text-white">
                          {notif.title}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {notif.message}
                        </p>
                        <span className="text-[11px] font-mono font-semibold text-slate-400 block pt-1">
                          {notif.time} · Stored in <strong className="text-slate-200">{notif.product.location}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isDanger ? (
                        <button
                          onClick={() => onDiscardItem(notif.productId)}
                          className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs"
                        >
                          Discard
                        </button>
                      ) : (
                        <button
                          onClick={() => onMarkAsUsed(notif.productId)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs"
                        >
                          Mark Used
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-900/80 p-10 rounded-3xl text-center border border-slate-800 text-slate-400 text-xs">
              🎉 No urgent notifications! All products in your inventory are safe.
            </div>
          )}
        </div>

        {/* Right: Reminder Schedule Preferences */}
        <div className="lg:col-span-5 bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-emerald-400" />
              Automated Alert Schedule
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose how many days in advance you want ExpiryGuard to alert you.
            </p>
          </div>

          <div className="space-y-3.5">
            
            {/* 7 Days */}
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <div>
                <div className="text-xs font-bold text-white">7 Days Before Expiry</div>
                <div className="text-[11px] text-slate-400">Early weekly grocery planning alert</div>
              </div>
              <input
                type="checkbox"
                checked={schedule7Days}
                onChange={() => setSchedule7Days(!schedule7Days)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </label>

            {/* 3 Days */}
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <div>
                <div className="text-xs font-bold text-white">3 Days Before Expiry (72 Hours)</div>
                <div className="text-[11px] text-slate-400">Promotes items to the Use-First recipe queue</div>
              </div>
              <input
                type="checkbox"
                checked={schedule3Days}
                onChange={() => setSchedule3Days(!schedule3Days)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </label>

            {/* 1 Day */}
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <div>
                <div className="text-xs font-bold text-white">1 Day Before Expiry (Tomorrow)</div>
                <div className="text-[11px] text-slate-400">High priority banner for daily consumption</div>
              </div>
              <input
                type="checkbox"
                checked={schedule1Day}
                onChange={() => setSchedule1Day(!schedule1Day)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </label>

          </div>

          {/* Browser Disclosure Note */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 text-xs text-emerald-300 leading-relaxed">
            <strong>Transparent Note:</strong> Web push notifications require browser permission. Even when offline, alerts will pop up when you open the application.
          </div>
        </div>

      </div>

    </div>
  );
}
