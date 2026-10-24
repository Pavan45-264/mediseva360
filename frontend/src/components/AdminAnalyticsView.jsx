import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import {
  TrendingUp, Clock, Building2, Users,
  Activity, ArrowUpRight, ShieldCheck,
  Calendar, Siren, HeartPulse
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminAnalyticsView() {
  const { staffStats, t } = useApp();
  const [timeRange, setTimeRange] = useState('7d'); // 'today' | '7d' | '30d'

  // Chart 1: Bookings per hospital per day
  const bookingsPerHospitalData = [
    { hospital: 'Apollo Jubilee Hills', today: 142, yesterday: 135, avg: 138 },
    { hospital: 'AIIMS New Delhi', today: 380, yesterday: 365, avg: 372 },
    { hospital: 'Gandhi Govt Hospital', today: 290, yesterday: 275, avg: 284 },
    { hospital: 'Manipal Old Airport', today: 115, yesterday: 108, avg: 112 },
    { hospital: 'RIMS Govt Kadapa', today: 198, yesterday: 184, avg: 190 },
    { hospital: 'Yashoda Somajiguda', today: 164, yesterday: 155, avg: 160 }
  ];

  // Daily timeline (last 7 days up to 15 Oct 2026)
  const dailyTrendData = [
    { date: '09 Oct', bookings: 1120, waitTimeMins: 22 },
    { date: '10 Oct', bookings: 1240, waitTimeMins: 20 },
    { date: '11 Oct', bookings: 1310, waitTimeMins: 19 },
    { date: '12 Oct', bookings: 1482, waitTimeMins: 18 },
    { date: '13 Oct', bookings: 1390, waitTimeMins: 21 },
    { date: '14 Oct', bookings: 1450, waitTimeMins: 17 },
    { date: 'Today (15 Oct)', bookings: 1520, waitTimeMins: 16 }
  ];

  // Chart 2: Average wait time per department
  const waitTimeByDeptData = [
    { department: 'Cardiology', avgWait: 24, benchmark: 20 },
    { department: 'Orthopaedics', avgWait: 20, benchmark: 18 },
    { department: 'General Medicine', avgWait: 15, benchmark: 15 },
    { department: 'Ophthalmology', avgWait: 14, benchmark: 12 },
    { department: 'Paediatrics', avgWait: 12, benchmark: 10 },
    { department: 'ENT', avgWait: 10, benchmark: 10 },
    { department: 'Dermatology', avgWait: 9, benchmark: 10 }
  ];

  // Chart 3: Busiest departments
  const busiestDeptData = [
    { name: 'Cardiology', value: 320, color: '#00D09C' },
    { name: 'General Medicine', value: 285, color: '#5367FF' },
    { name: 'Paediatrics', value: 180, color: '#FFA24C' },
    { name: 'Orthopaedics', value: 145, color: '#EB5B3C' },
    { name: 'Ophthalmology', value: 95, color: '#9B51E0' },
    { name: 'ENT & Others', value: 75, color: '#6B7280' }
  ];

  return (
    <div className="pb-24 pt-2 px-4 space-y-5 animate-fadeIn max-w-5xl mx-auto">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#E6F9F4] dark:bg-emerald-950/60 text-[#00B386] font-bold text-[10px] uppercase tracking-wider border border-[#00D09C]/30 mb-1">
            <Activity className="w-3 h-3 mr-1" />
            <span>National Health Grid Analytics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#44475B] dark:text-white">
            Admin Hospital Analytics
          </h2>
          <p className="text-xs text-[#7C7E8C] dark:text-[#9A9A9A]">
            Real-time OPD queue telemetry, hospital capacity & wait time audits across India
          </p>
        </div>

        {/* Time Filter Pills */}
        <div className="flex bg-[#F5F6F8] dark:bg-[#1B1B1B] p-1 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] self-start">
          {[
            { id: 'today', label: 'Today' },
            { id: '7d', label: 'Last 7 Days' },
            { id: '30d', label: 'Month' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setTimeRange(p.id)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                timeRange === p.id
                  ? 'bg-white dark:bg-[#2C2C2C] text-[#00B386] shadow-xs'
                  : 'text-[#7C7E8C] hover:text-[#44475B]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: Bookings */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card space-y-1">
          <div className="flex items-center justify-between text-[#7C7E8C]">
            <span className="text-[11px] font-semibold">Total Bookings Today</span>
            <Users className="w-4 h-4 text-[#00D09C]" />
          </div>
          <div className="text-2xl font-black text-[#44475B] dark:text-white">
            1,520
          </div>
          <p className="text-[10px] text-[#00B386] font-bold flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" /> +14.2% vs yesterday
          </p>
        </div>

        {/* Metric 2: Average Wait Time */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card space-y-1">
          <div className="flex items-center justify-between text-[#7C7E8C]">
            <span className="text-[11px] font-semibold">Average OPD Wait</span>
            <Clock className="w-4 h-4 text-[#5367FF]" />
          </div>
          <div className="text-2xl font-black text-[#44475B] dark:text-white">
            16 mins
          </div>
          <p className="text-[10px] text-[#00B386] font-bold flex items-center">
            ▼ 4 mins faster than baseline
          </p>
        </div>

        {/* Metric 3: Active Hospitals */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card space-y-1">
          <div className="flex items-center justify-between text-[#7C7E8C]">
            <span className="text-[11px] font-semibold">Active Empaneled</span>
            <Building2 className="w-4 h-4 text-[#FFA24C]" />
          </div>
          <div className="text-2xl font-black text-[#44475B] dark:text-white">
            40,280
          </div>
          <p className="text-[10px] text-[#7C7E8C]">Across 36 States & UTs</p>
        </div>

        {/* Metric 4: Ambulances 108 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card space-y-1">
          <div className="flex items-center justify-between text-[#7C7E8C]">
            <span className="text-[11px] font-semibold">108 Dispatches</span>
            <Siren className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-500">
            14 Active
          </div>
          <p className="text-[10px] text-[#7C7E8C]">Avg dispatch ETA: 7.4 mins</p>
        </div>
      </div>

      {/* CHART 1: Bookings per hospital per day */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#44475B] dark:text-white">
              Bookings per Hospital per Day
            </h3>
            <p className="text-[11px] text-[#7C7E8C]">
              Daily digital token volume at premier government and private facilities
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF0FF] dark:bg-indigo-950/60 text-[#5367FF]">
            Daily OPD Volume
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bookingsPerHospitalData} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="hospital" angle={-15} textAnchor="end" interval={0} tick={{ fontSize: 10, fill: '#7C7E8C' }} />
              <YAxis tick={{ fontSize: 10, fill: '#7C7E8C' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '11px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="today" name="Today's Tokens" fill="#00D09C" radius={[6, 6, 0, 0]} />
              <Bar dataKey="avg" name="7-Day Average" fill="#5367FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2-Column Grid: Average Wait Time per Department + Busiest Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* CHART 2: Average Wait Time per Department */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#44475B] dark:text-white">
                Average Wait Time by Department
              </h3>
              <p className="text-[11px] text-[#7C7E8C]">Minutes from queue token to doctor examination</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F9F4] dark:bg-emerald-950/60 text-[#00B386]">
              Target: &lt;20 min
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waitTimeByDeptData} layout="vertical" margin={{ top: 5, right: 20, left: 35, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} horizontal={false} />
                <XAxis type="number" unit="m" tick={{ fontSize: 10, fill: '#7C7E8C' }} />
                <YAxis dataKey="department" type="category" tick={{ fontSize: 10, fill: '#7C7E8C' }} width={80} />
                <Tooltip
                  formatter={(val) => [`${val} minutes`, 'Wait Time']}
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#FFFFFF',
                    fontSize: '11px'
                  }}
                />
                <Bar dataKey="avgWait" name="Actual Wait (min)" fill="#FFA24C" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: Busiest Departments (Pie / Share) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#44475B] dark:text-white">
                Busiest OPD Departments
              </h3>
              <p className="text-[11px] text-[#7C7E8C]">Distribution of OPD token load across specialties</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Demand Split
            </span>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={busiestDeptData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {busiestDeptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`${val} tokens`, 'Bookings']}
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#FFFFFF',
                    fontSize: '11px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
