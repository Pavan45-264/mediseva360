import React from 'react';
import {
  UtensilsCrossed, AlertTriangle, AlertOctagon, CheckCircle2,
  HeartHandshake, Trash2, Sparkles, ShieldAlert, ArrowRight,
  Info, Check, Clock
} from 'lucide-react';

export default function PlannerView({
  products = [],
  onMarkAsUsed,
  onDonateItem,
  onDiscardItem
}) {
  // Sort items by priority: Expired first (for discarding), then Expiring Soon (for using), then Safe
  const prioritizedQueue = [...products].sort((a, b) => {
    if (a.status === 'expired' && b.status !== 'expired') return -1;
    if (b.status === 'expired' && a.status !== 'expired') return 1;
    return (a.daysRemaining ?? 999) - (b.daysRemaining ?? 999);
  });

  // Smart Recipe / Usage hints generator
  const getUsageHint = (product) => {
    const name = product.name.toLowerCase();
    const cat = product.category;

    if (cat === 'medicines') {
      if (product.status === 'expired') {
        return '⛔ STRICT HEALTH BAN: Never consume expired medicines. Potency drops and toxic degradation can occur. Discard immediately.';
      }
      return 'Store in cool dry place away from sunlight. Check with doctor before taking antibiotic courses.';
    }

    if (name.includes('milk')) {
      return '🥛 Recipe Idea: Boil and make Paneer, Kheer, or homemade Curd before it curdles!';
    }
    if (name.includes('bread')) {
      return '🍞 Recipe Idea: Make crispy Bread Upma, Garlic Butter Toast, or Bread Pakora tonight!';
    }
    if (name.includes('paneer')) {
      return '🧀 Recipe Idea: Cook Matar Paneer or scrambled Paneer Bhurji for dinner.';
    }
    if (name.includes('atta') || name.includes('flour')) {
      return '🌾 Usage Hint: Knead for fresh rotis, pooris, or parathas.';
    }
    if (name.includes('noodle')) {
      return '🍜 Quick Snack: Cook with sautéed carrots and capsicum.';
    }
    return '⚡ High Urgency: Prioritize consuming this item before end of this week.';
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1600px] mx-auto pb-16">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-400/30 mb-2">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>ZERO-WASTE ACTION QUEUE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Smart Use-First Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Items prioritized by urgency so your family eats fresh food on time and throws zero groceries in the trash.
          </p>
        </div>
      </div>

      {/* Safety Guardrails Card */}
      <div className="bg-red-950/40 border border-red-500/40 text-white p-5 sm:p-6 rounded-3xl shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider font-mono">
          <ShieldAlert className="w-4 h-4" />
          Strict Safety Guardrails Enforced
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          ExpiryGuard automatically enforces safety rules. We <strong className="text-white">never recommend consuming expired medicines, spoiled dairy, or bad-smelling items</strong>. Expired medicines are quarantined from recipes.
        </p>
      </div>

      {/* Prioritized Queue List */}
      <div className="space-y-4">
        {prioritizedQueue.map((item, index) => {
          const isExpired = item.status === 'expired';
          const isExpiringSoon = item.status === 'expiring_soon';
          const isMedicine = item.category === 'medicines';

          return (
            <div
              key={item.id}
              className={`rounded-3xl p-5 sm:p-6 border shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isExpired
                  ? 'border-red-500/50 bg-red-950/20 shadow-red-950/30'
                  : isExpiringSoon
                  ? 'border-amber-500/50 bg-amber-950/20 shadow-amber-950/30'
                  : 'border-slate-800 bg-slate-900/80 hover:border-emerald-500/40 shadow-black'
              }`}
            >
              {/* Left: Priority Rank & Details */}
              <div className="flex items-start gap-4 flex-1">
                <span className={`w-10 h-10 rounded-2xl font-mono font-black flex items-center justify-center flex-shrink-0 text-sm shadow-md ${
                  isExpired
                    ? 'bg-red-500/30 text-red-300 border border-red-500/40'
                    : isExpiringSoon
                    ? 'bg-amber-500/30 text-amber-300 border border-amber-400/40'
                    : 'bg-slate-950 text-slate-300 border border-slate-800'
                }`}>
                  #{index + 1}
                </span>

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base font-black text-white">
                      {item.name}
                    </h3>

                    {isExpired ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-500/20 text-red-300 border border-red-500/40">
                        EXPIRED
                      </span>
                    ) : isExpiringSoon ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-400/40">
                        EXPIRES IN {item.daysRemaining === 0 ? 'TODAY' : `${item.daysRemaining} DAYS`}
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        SAFE ({item.daysRemaining} DAYS)
                      </span>
                    )}

                    <span className="text-xs font-mono font-black text-white bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">
                      ₹{item.price}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 font-medium">
                    {item.brand} · {item.quantity} · Stored in <strong className="text-slate-200">{item.location}</strong>
                  </div>

                  {/* Recipe / Safety Hint */}
                  <div className={`p-3 rounded-2xl text-xs font-medium mt-2 leading-relaxed ${
                    isExpired && isMedicine
                      ? 'bg-red-950/60 text-red-200 border border-red-500/40 font-bold'
                      : isExpired
                      ? 'bg-red-950/40 text-red-300 border border-red-500/30'
                      : isExpiringSoon
                      ? 'bg-amber-950/40 text-amber-200 border border-amber-500/40'
                      : 'bg-slate-950 text-slate-300 border border-slate-800'
                  }`}>
                    {getUsageHint(item)}
                  </div>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                {isExpired ? (
                  <button
                    onClick={() => onDiscardItem(item.id)}
                    className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-md flex items-center gap-2 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Discard Safely</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => onMarkAsUsed(item.id)}
                      className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Used Up</span>
                    </button>

                    <button
                      onClick={() => onDonateItem(item.id)}
                      className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
                      title="Donate to someone before it expires"
                    >
                      <HeartHandshake className="w-4 h-4" />
                      <span className="hidden sm:inline">Donate</span>
                    </button>

                    <button
                      onClick={() => onDiscardItem(item.id)}
                      className="p-3 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors"
                      title="Discard spoiled item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
