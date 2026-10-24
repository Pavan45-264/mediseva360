import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import {
  TrendingUp, TrendingDown, IndianRupee, PieChart as PieIcon,
  ShieldCheck, AlertTriangle, ArrowUpRight, CheckCircle2,
  BarChart3
} from 'lucide-react';
import { CATEGORIES } from '../data/expiryData';

export default function AnalyticsView({ products = [] }) {
  // Aggregate Calculations
  const expiredItems = products.filter(p => p.status === 'expired');
  const safeItems = products.filter(p => p.status === 'safe' || p.status === 'expiring_soon');

  const totalWasteLoss = expiredItems.reduce((acc, p) => acc + (p.price || 0), 0);
  const totalMoneySaved = safeItems.reduce((acc, p) => acc + (p.price || 0), 0);
  const totalValue = totalWasteLoss + totalMoneySaved;

  const preventionEfficiency = totalValue > 0
    ? Math.round((totalMoneySaved / totalValue) * 100)
    : 100;

  // Monthly Trend Data (Simulated + Current)
  const monthlyData = [
    { month: 'Jun', wastedRs: 380, savedRs: 1200 },
    { month: 'Jul', wastedRs: 290, savedRs: 1450 },
    { month: 'Aug', wastedRs: 210, savedRs: 1680 },
    { month: 'Sep', wastedRs: 180, savedRs: 1890 },
    { month: 'Oct (Now)', wastedRs: totalWasteLoss, savedRs: totalMoneySaved }
  ];

  // Status Distribution Pie
  const statusPieData = [
    { name: 'Safe & Fresh', value: products.filter(p => p.status === 'safe').length, color: '#10B981' },
    { name: 'Expiring Soon', value: products.filter(p => p.status === 'expiring_soon').length, color: '#F59E0B' },
    { name: 'Expired', value: expiredItems.length, color: '#EF4444' },
    { name: 'Unverified', value: products.filter(p => p.status === 'unverified').length, color: '#64748B' }
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1600px] mx-auto pb-16">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/30 mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>FINANCIAL AUDIT & RUPEE TRACKER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Waste & Money Analytics Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Visual breakdown of household food and medicine waste savings over time.
          </p>
        </div>
      </div>

      {/* Top 3 Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* 1. Verified Money Saved */}
        <div className="p-6 rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Money Saved via ExpiryGuard</span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-sans">
            ₹{totalMoneySaved}
          </div>
          <p className="text-xs text-emerald-300/80 font-medium mt-1">
            From groceries & medicines consumed before expiry
          </p>
        </div>

        {/* 2. Total Waste Loss */}
        <div className="p-6 rounded-3xl border border-red-500/40 bg-gradient-to-b from-slate-900/90 to-red-950/40 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-red-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Money Lost to Spoiled Items</span>
            <div className="p-2.5 rounded-2xl bg-red-500/20 text-red-400">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-red-400 font-sans">
            ₹{totalWasteLoss}
          </div>
          <p className="text-xs text-red-300/80 font-medium mt-1">
            From {expiredItems.length} discarded items this period
          </p>
        </div>

        {/* 3. Waste Prevention Rate */}
        <div className="p-6 rounded-3xl border border-teal-500/40 bg-gradient-to-b from-slate-900/90 to-teal-950/40 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-teal-300 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Waste Prevention Rate</span>
            <div className="p-2.5 rounded-2xl bg-teal-500/20 text-teal-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-sans">
            {preventionEfficiency}%
          </div>
          <p className="text-xs text-teal-300/80 font-medium mt-1">
            Household efficiency score (Target: &gt; 90%)
          </p>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Waste vs Saved Trend Chart (Bar) */}
        <div className="lg:col-span-8 bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-black text-white">
                Monthly Savings vs Waste Loss (₹)
              </h3>
              <p className="text-xs text-slate-400">
                Notice how food waste dropped as proactive reminders were used
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span> Saved (₹)
              </span>
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="w-3 h-3 rounded-full bg-red-500"></span> Lost (₹)
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '16px',
                    color: '#FFFFFF',
                    fontSize: '12px'
                  }}
                  formatter={(val) => [`₹${val}`, 'Amount']}
                />
                <Bar dataKey="savedRs" fill="#10B981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="wastedRs" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut Chart */}
        <div className="lg:col-span-4 bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-white">
              Inventory Status Share
            </h3>
            <p className="text-xs text-slate-400">
              Breakdown of all active products
            </p>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      border: '1px solid #334155',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
            {statusPieData.map(item => (
              <div key={item.name} className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-bold text-white font-mono">{item.value} items</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
