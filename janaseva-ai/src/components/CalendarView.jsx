import React, { useState } from 'react';
import {
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2,
  AlertTriangle, AlertOctagon, Package, ArrowRight, Check
} from 'lucide-react';

export default function CalendarView({
  products = [],
  onMarkAsUsed,
  onDiscardItem
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayProducts, setSelectedDayProducts] = useState(null);
  const [selectedDateStr, setSelectedDateStr] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Calendar math
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDayProducts(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDayProducts(null);
  };

  // Group products by YYYY-MM-DD
  const productsByDate = products.reduce((acc, p) => {
    if (p.expiryDate) {
      if (!acc[p.expiryDate]) acc[p.expiryDate] = [];
      acc[p.expiryDate].push(p);
    }
    return acc;
  }, {});

  // Handle day click
  const handleDayClick = (dayNum) => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(dayNum).padStart(2, '0');
    const dateKey = `${year}-${formattedMonth}-${formattedDay}`;

    setSelectedDateStr(`${dayNum} ${monthNames[month]} ${year}`);
    setSelectedDayProducts(productsByDate[dateKey] || []);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1600px] mx-auto pb-16">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/30 mb-2">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>EXPIRY TIMELINE RADAR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Interactive Expiry Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            See exactly which days groceries, bread, and medicines will expire. Click any day to see items.
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-4 font-black text-sm text-emerald-300 font-mono min-w-[150px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Calendar on Left, Drawer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Calendar Card */}
        <div className="lg:col-span-8 bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          
          {/* Day Names Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold font-mono text-slate-400 uppercase py-2 border-b border-slate-800">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank leading days */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`blank-${i}`} className="h-20 sm:h-24 rounded-2xl bg-slate-950/40 border border-transparent"></div>
            ))}

            {/* Actual Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const formattedMonth = String(month + 1).padStart(2, '0');
              const formattedDay = String(dayNum).padStart(2, '0');
              const dateKey = `${year}-${formattedMonth}-${formattedDay}`;
              const dayItems = productsByDate[dateKey] || [];

              const hasExpired = dayItems.some(p => p.status === 'expired');
              const hasExpiringSoon = dayItems.some(p => p.status === 'expiring_soon');

              const isSelected = selectedDateStr === `${dayNum} ${monthNames[month]} ${year}`;

              return (
                <div
                  key={dayNum}
                  onClick={() => handleDayClick(dayNum)}
                  className={`h-20 sm:h-24 p-2.5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-500/40 shadow-lg'
                      : dayItems.length > 0
                      ? 'border-slate-700 bg-slate-950 hover:border-emerald-500/50 hover:bg-slate-900'
                      : 'border-slate-800/80 bg-slate-950/60 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-slate-300">
                      {dayNum}
                    </span>
                    {dayItems.length > 0 && (
                      <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full font-mono ${
                        hasExpired
                          ? 'bg-red-500 text-white'
                          : hasExpiringSoon
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-emerald-500 text-slate-950'
                      }`}>
                        {dayItems.length}
                      </span>
                    )}
                  </div>

                  {/* Tiny Item Badges inside Day Cell */}
                  <div className="space-y-1 overflow-hidden">
                    {dayItems.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        className={`text-[9px] font-bold truncate px-1.5 py-0.5 rounded-md ${
                          item.status === 'expired'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : item.status === 'expiring_soon'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {item.name}
                      </div>
                    ))}
                    {dayItems.length > 2 && (
                      <div className="text-[8px] font-bold text-slate-400">
                        +{dayItems.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Color Legend */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <span className="text-slate-400 font-bold font-mono uppercase text-[10px]">LEGEND:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span>Expired</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>Expiring Soon (≤ 7 Days)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>Safe for Consumption</span>
            </div>
          </div>

        </div>

        {/* Selected Day Products Drawer */}
        <div className="lg:col-span-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-800 pb-3 mb-4">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                SELECTED CALENDAR DAY
              </div>
              <h3 className="text-lg font-black text-white mt-0.5">
                {selectedDateStr || 'Click any day on calendar'}
              </h3>
            </div>

            {selectedDayProducts && selectedDayProducts.length > 0 ? (
              <div className="space-y-3">
                {selectedDayProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl border border-slate-800 bg-slate-950 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate max-w-[180px]">
                        {p.name}
                      </h4>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        ₹{p.price}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      {p.category} · {p.location}
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-900">
                      {p.status === 'expired' ? (
                        <button
                          onClick={() => onDiscardItem(p.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs"
                        >
                          Discard
                        </button>
                      ) : (
                        <button
                          onClick={() => onMarkAsUsed(p.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs"
                        >
                          Mark Used
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedDayProducts && selectedDayProducts.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                🎉 No products expire on this day!
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs leading-relaxed">
                Tap any day on the calendar to see what food or medicines need attention on that date.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
