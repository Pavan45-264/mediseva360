import React, { useState } from 'react';
import {
  Package, AlertTriangle, AlertOctagon, HelpCircle, IndianRupee,
  Camera, Mic, Plus, UtensilsCrossed, Calendar, CheckCircle2,
  Volume2, ArrowRight, ShieldAlert, Sparkles, Clock, Trash2,
  Flame, Check, Search, ShieldCheck
} from 'lucide-react';
import { CATEGORIES } from '../data/expiryData';

export default function DashboardView({
  products = [],
  onOpenScanner,
  onOpenVoice,
  onOpenManualAdd,
  onOpenPlanner,
  onMarkAsUsed,
  onDiscardItem,
  onNavigateTab,
  onSpeakText
}) {
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'urgent', 'safe', 'expired'

  // Compute Key Metrics
  const totalActive = products.filter(p => p.status !== 'expired').length;
  const expiringSoon = products.filter(p => p.status === 'expiring_soon');
  const expiredItems = products.filter(p => p.status === 'expired');
  const unverifiedItems = products.filter(p => p.status === 'unverified');

  // Value calculation in Rupees
  const moneyAtRisk = expiringSoon.reduce((acc, p) => acc + (p.price || 0), 0);
  const moneySaved = products.filter(p => p.status === 'safe').reduce((acc, p) => acc + (p.price || 0), 0);

  // Items expiring within 72 hours (3 days)
  const urgent72h = products.filter(p => {
    return p.status === 'expiring_soon' && p.daysRemaining !== null && p.daysRemaining <= 3 && p.daysRemaining >= 0;
  });

  // Filtered list for quick display
  const displayedProducts = products.filter(p => {
    if (filterMode === 'urgent') return p.status === 'expiring_soon';
    if (filterMode === 'safe') return p.status === 'safe';
    if (filterMode === 'expired') return p.status === 'expired';
    return true;
  });

  // Category counts
  const categoryCounts = CATEGORIES.filter(c => c.id !== 'all').map(cat => {
    const count = products.filter(p => p.category === cat.id && p.status !== 'expired').length;
    return { ...cat, count };
  });

  // Spoken audio summary
  const handleSpeakSummary = () => {
    const msg = `You have ${expiringSoon.length} items expiring soon, and ${expiredItems.length} items expired. Please check your milk and bread today.`;
    onSpeakText(msg, 'en-IN');
  };

  const handleSpeakTeluguSummary = () => {
    const msg = `మీ ఇంట్లో ${expiringSoon.length} వస్తువులు త్వరలో ఎక్స్‌పైర్ అవుతున్నాయి. ${expiredItems.length} వస్తువులు ఎక్స్‌పైర్ అయ్యాయి. పాల ప్యాకెట్ మరియు బ్రెడ్ వెంటనే ఉపయోగించండి.`;
    onSpeakText(msg, 'te-IN');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1600px] mx-auto pb-16">
      
      {/* 1. 3D Hero Banner with Glowing Holographic Pantry Visual */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl shadow-black/90">
        
        {/* Background Image & Gradient Overlays */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/pantry_3d_bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-radial-at-c from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Content Box */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/40 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>3D SMART PANTRY & MEDICINE SAFETY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Eat Food Fresh. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Never Waste Money or Health.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Take a quick photo of milk pouches, bread, or medicine strips. ExpiryGuard tells you in simple words what to eat today, what to cook, and warns against expired medicines.
            </p>

            {/* Quick Actions & Bilingual Audio */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenScanner}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 flex items-center gap-2 border border-emerald-300"
              >
                <Camera className="w-4 h-4 stroke-[2.5]" />
                <span>Take Photo / Scan</span>
              </button>

              <button
                onClick={onOpenVoice}
                className="px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-emerald-300 font-bold text-sm border border-emerald-500/40 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Speak (తెలుగు / Eng)</span>
              </button>

              <button
                onClick={handleSpeakTeluguSummary}
                className="px-3.5 py-3 rounded-2xl bg-teal-950/80 hover:bg-teal-900 text-teal-200 font-bold text-xs sm:text-sm border border-teal-500/40 transition-all flex items-center gap-1.5"
                title="తెలుగులో వినండి"
              >
                <Volume2 className="w-4 h-4 text-teal-400" />
                <span>తెలుగులో వినండి</span>
              </button>
            </div>
          </div>

          {/* 3D Floating Holographic Shield Emblem */}
          <div className="hidden lg:flex flex-col items-center justify-center shrink-0 relative">
            <div className="relative w-48 h-48 rounded-3xl p-2 bg-gradient-to-b from-emerald-500/20 to-teal-500/10 border border-emerald-400/30 shadow-2xl shadow-emerald-950/80 backdrop-blur-xl animate-float">
              <img
                src="/images/hero_3d_scanner.jpg"
                alt="3D Smart Pantry Shield"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full shadow-lg border border-white/40">
                100% VERIFIED
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400/80 mt-3 font-semibold">
              SMART EXPIRY DETECTION
            </span>
          </div>
        </div>
      </div>

      {/* 2. Critical Safety Warning Banner (If Any Expired Medicines Exist) */}
      {expiredItems.some(item => item.category === 'medicines') && (
        <div className="rounded-2xl p-5 sm:p-6 bg-red-950/80 border-2 border-red-500 shadow-xl shadow-red-950/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-red-600 text-white shrink-0 mt-0.5">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/30 text-red-300 text-[10px] font-black uppercase tracking-wider border border-red-400/30 mb-1">
                CRITICAL HEALTH WARNING
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Expired Medicines Found in Medicine Box!
              </h2>
              <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed max-w-2xl mt-0.5">
                Never consume expired tablets or syrups (like Crocin, Dolo). They lose potency and can cause harmful reactions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            {expiredItems.filter(item => item.category === 'medicines').slice(0, 1).map(med => (
              <button
                key={med.id}
                onClick={() => onDiscardItem(med.id)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Throw Away {med.name.split(' ')[0]} Safely</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Urgent 72-Hour Food Spoilage Banner (Eat These First) */}
      {urgent72h.length > 0 && (
        <div className="rounded-2xl p-5 sm:p-6 bg-amber-950/70 border-2 border-amber-500/80 shadow-xl shadow-amber-950/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shrink-0 font-bold">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span>Cook or Drink These First ({urgent72h.length} items spoil in 1-3 days)</span>
                </h2>
                <p className="text-xs text-amber-200">
                  Eat these today to save ₹{urgent72h.reduce((a, b) => a + (b.price || 0), 0)} and keep food fresh!
                </p>
              </div>
            </div>

            <button
              onClick={onOpenPlanner}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-400/40 transition-colors flex items-center gap-1.5"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>See Recipe Ideas</span>
            </button>
          </div>

          {/* Quick Cards of Urgent Food */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {urgent72h.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-amber-400/40 shadow-md flex items-center justify-between gap-3 hover:border-amber-300 transition-colors"
              >
                <div className="min-w-0">
                  <div className="text-xs font-black text-white truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-amber-300 font-bold flex items-center gap-1 mt-0.5">
                    <span>⚠️ {item.daysRemaining === 0 ? 'Expires Today!' : `Expires in ${item.daysRemaining} days`}</span>
                    <span>· ₹{item.price}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Kept in: <strong className="text-slate-200">{item.location}</strong>
                  </div>
                </div>

                <button
                  onClick={() => onMarkAsUsed(item.id)}
                  className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-transform hover:scale-105 shrink-0 flex items-center gap-1 shadow-md"
                  title="Mark as Consumed"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Ate This</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 4 Crystal Clear Metric Cards (High Contrast & Neon Glow) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Safe & Fresh */}
        <div 
          onClick={() => setFilterMode('safe')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            filterMode === 'safe'
              ? 'bg-emerald-950/60 border-emerald-400 ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-950/80'
              : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Fresh & Safe</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalActive - expiringSoon.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Safe to eat for many days</span>
        </div>

        {/* Eat Soon */}
        <div 
          onClick={() => setFilterMode('urgent')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            filterMode === 'urgent'
              ? 'bg-amber-950/60 border-amber-400 ring-2 ring-amber-500/50 shadow-lg shadow-amber-950/80'
              : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Eat Soon</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300">
            {expiringSoon.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Within this week (Use first)</span>
        </div>

        {/* Expired */}
        <div 
          onClick={() => setFilterMode('expired')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            filterMode === 'expired'
              ? 'bg-red-950/60 border-red-400 ring-2 ring-red-500/50 shadow-lg shadow-red-950/80'
              : 'bg-slate-900/80 border-slate-800 hover:border-red-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">Expired</span>
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-red-400">
            {expiredItems.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Throw away safely</span>
        </div>

        {/* Money at Risk (₹) */}
        <div 
          onClick={() => onNavigateTab('analytics')}
          className="p-5 rounded-2xl border border-teal-500/30 bg-gradient-to-b from-slate-900/90 to-teal-950/40 hover:border-teal-400 transition-all cursor-pointer flex flex-col justify-between shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">Money Saved</span>
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            ₹{moneySaved}
          </div>
          <span className="text-[11px] text-teal-300/80 mt-1">Protected by eating on time</span>
        </div>

      </div>

      {/* 5. Food & Medicine Category Grid */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-400" />
            <span>Items By Category</span>
          </h2>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categoryCounts.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigateTab('inventory')}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div>
                <div className="text-xs font-bold text-white truncate">{cat.name.split(' ')[0]}</div>
                <div className="text-xs text-emerald-400 font-mono font-bold mt-0.5">
                  {cat.count} items
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Filterable Product Grid */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Your Kitchen & Medicine Inventory</span>
            </h2>
            <p className="text-xs text-slate-400">
              Showing {displayedProducts.length} items ({filterMode.toUpperCase()})
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              All Items ({products.length})
            </button>
            <button
              onClick={() => setFilterMode('urgent')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterMode === 'urgent'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Eat Soon ({expiringSoon.length})
            </button>
            <button
              onClick={() => setFilterMode('expired')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterMode === 'expired'
                  ? 'bg-red-500 text-white shadow-md font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Expired ({expiredItems.length})
            </button>
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProducts.map((p) => {
            const isExpired = p.status === 'expired';
            const isUrgent = p.status === 'expiring_soon';

            return (
              <div
                key={p.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isExpired
                    ? 'bg-red-950/20 border-red-500/40 hover:border-red-400'
                    : isUrgent
                    ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      isExpired
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : isUrgent
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                    }`}>
                      {isExpired ? '🔴 EXPIRED' : isUrgent ? `🟡 EAT SOON (${p.daysRemaining}d)` : '🟢 FRESH & SAFE'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      ₹{p.price}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">
                    {p.name}
                  </h3>

                  <div className="text-xs text-slate-400 space-y-0.5 mb-4">
                    <div>Brand: <strong className="text-slate-200">{p.brand}</strong></div>
                    <div>Location: <strong className="text-slate-200">{p.location}</strong></div>
                    <div>Expiry: <strong className="text-slate-200">{p.expiryDate}</strong></div>
                  </div>
                </div>

                {/* 1-Click Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  {isExpired ? (
                    <button
                      onClick={() => onDiscardItem(p.id)}
                      className="w-full py-2 rounded-xl bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white font-bold text-xs border border-red-500/40 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Throw Away Safely</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onMarkAsUsed(p.id)}
                      className="w-full py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold text-xs border border-emerald-400/40 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>We Ate / Used This</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
