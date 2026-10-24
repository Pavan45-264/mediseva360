import React, { useState, useMemo } from 'react';
import {
  Cpu, AlertTriangle, Users, Shield, Activity,
  ChevronDown, ChevronUp, MapPin, Clock, Layers,
  BarChart3, TrendingUp, Radio, Eye, EyeOff
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';

const SEVERITY_COLORS = {
  critical: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', dot: 'bg-red-500' },
  high: { bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-400', dot: 'bg-orange-500' },
  moderate: { bg: 'bg-yellow-500/20', border: 'border-yellow-500', text: 'text-yellow-400', dot: 'bg-yellow-500' },
  low: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400', dot: 'bg-green-500' },
};

const HAZARD_EMOJIS = {
  FLOOD: '🌊', LANDSLIDE: '⛰️', CYCLONE: '🌀',
  EARTHQUAKE: '🔴', TSUNAMI: '🌊', DROUGHT: '☀️',
};

const HAZARD_CHART_COLORS = {
  FLOOD: '#3b82f6', LANDSLIDE: '#a855f7', CYCLONE: '#06b6d4',
  EARTHQUAKE: '#ef4444', TSUNAMI: '#14b8a6', DROUGHT: '#f59e0b',
};

const SEVERITY_ORDER = { critical: 0, high: 1, moderate: 2, low: 3 };

function formatPopulation(num) {
  if (num >= 10000000) return (num / 10000000).toFixed(1) + ' Cr';
  if (num >= 100000) return (num / 100000).toFixed(1) + ' L';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function MetricCard({ icon: Icon, label, value, color, subtext }) {
  return (
    <div className={`bg-slate-800/60 rounded-lg p-3 border-l-4 ${color} hover:bg-slate-800 transition-colors`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-slate-400" />
        <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl font-bold text-white">{value}</div>
      {subtext && <div className="text-xs text-slate-500 mt-0.5">{subtext}</div>}
    </div>
  );
}

function HazardDistributionChart({ disasters }) {
  const data = useMemo(() => {
    const counts = {};
    disasters.forEach(d => {
      counts[d.type] = (counts[d.type] || 0) + 1;
    });
    return Object.entries(counts).map(([type, count]) => ({
      name: type,
      value: count,
      color: HAZARD_CHART_COLORS[type] || '#6b7280',
    }));
  }, [disasters]);

  return (
    <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/50">
      <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
        <BarChart3 className="w-3.5 h-3.5" /> Hazard Distribution
      </h3>
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={55}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '12px',
              }}
              formatter={(value, name) => [value, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-2 mt-1">
        {data.map(d => (
          <div key={d.name} className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
            <span className="text-[10px] text-slate-400">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DisasterListItem({ disaster, isSelected, onClick }) {
  const sev = SEVERITY_COLORS[disaster.severity] || SEVERITY_COLORS.low;
  const emoji = HAZARD_EMOJIS[disaster.type] || '⚠️';

  return (
    <button
      onClick={() => onClick(disaster)}
      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 hover:bg-slate-700/50 ${
        isSelected
          ? `${sev.bg} ${sev.border} border-opacity-100`
          : 'border-slate-700/30 bg-slate-800/30'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <span className="text-lg flex-shrink-0">{emoji}</span>
          <div className="min-w-0">
            <div className="text-sm font-medium text-white truncate">{disaster.name}</div>
            <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" /> {disaster.state}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${sev.bg} ${sev.text}`}>
            {disaster.severity}
          </span>
          <span className={`w-2 h-2 rounded-full ${sev.dot} ${
            disaster.severity === 'critical' ? 'animate-pulse' : ''
          }`} />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" /> {formatPopulation(disaster.affectedPopulation)}
        </span>
        <span className="flex items-center gap-1">
          <Activity className="w-3 h-3" /> Risk: {disaster.cascadingRiskScore}%
        </span>
      </div>
    </button>
  );
}

function SelectedDisasterPanel({ disaster, onViewProtocol }) {
  const sev = SEVERITY_COLORS[disaster.severity] || SEVERITY_COLORS.low;

  const riskColor = disaster.cascadingRiskScore >= 80 ? 'bg-red-500'
    : disaster.cascadingRiskScore >= 60 ? 'bg-orange-500'
    : disaster.cascadingRiskScore >= 30 ? 'bg-yellow-500'
    : 'bg-green-500';

  return (
    <div className={`bg-slate-800/60 rounded-lg border ${sev.border} p-4 space-y-3 animate-fadeIn`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="text-lg">{HAZARD_EMOJIS[disaster.type] || '⚠️'}</span>
          {disaster.name}
        </h3>
        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${sev.bg} ${sev.text}`}>
          {disaster.status}
        </span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">{disaster.description}</p>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-900/50 rounded p-2">
          <div className="text-[10px] text-slate-500 uppercase">Affected Pop.</div>
          <div className="text-sm font-bold text-white">{formatPopulation(disaster.affectedPopulation)}</div>
        </div>
        <div className="bg-slate-900/50 rounded p-2">
          <div className="text-[10px] text-slate-500 uppercase">Response Teams</div>
          <div className="text-sm font-bold text-white">{disaster.responseTeams} NDRF</div>
        </div>
      </div>

      <div>
        <div className="text-[10px] text-slate-500 uppercase mb-1">Affected Districts</div>
        <div className="flex flex-wrap gap-1">
          {disaster.affectedDistricts.map(d => (
            <span key={d} className="text-[10px] bg-slate-700/50 text-slate-300 px-1.5 py-0.5 rounded">
              {d}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-slate-500 uppercase">Cascading Risk Score</span>
          <span className="text-xs font-bold text-white">{disaster.cascadingRiskScore}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${riskColor} transition-all duration-500`}
            style={{ width: `${disaster.cascadingRiskScore}%` }}
          />
        </div>
        {disaster.cascadingRisks && disaster.cascadingRisks.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            <span className="text-[10px] text-slate-500">May trigger:</span>
            {disaster.cascadingRisks.map(r => (
              <span key={r} className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">
                {HAZARD_EMOJIS[r]} {r}
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => onViewProtocol(disaster)}
        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Shield className="w-3.5 h-3.5" />
        View NDRF Evacuation Protocol
      </button>
    </div>
  );
}

export default function Dashboard({
  disasters,
  selectedDisaster,
  onSelectDisaster,
  onToggleCascading,
  showCascading,
  onViewProtocol,
  isOpen,
  onToggleOpen,
}) {
  const [expandedSection, setExpandedSection] = useState('list');

  const sortedDisasters = useMemo(() => {
    return [...disasters].sort((a, b) =>
      (SEVERITY_ORDER[a.severity] ?? 4) - (SEVERITY_ORDER[b.severity] ?? 4)
    );
  }, [disasters]);

  const totalAffected = useMemo(() =>
    disasters.reduce((s, d) => s + (d.affectedPopulation || 0), 0), [disasters]
  );
  const criticalCount = useMemo(() =>
    disasters.filter(d => d.severity === 'critical').length, [disasters]
  );
  const totalTeams = useMemo(() =>
    disasters.reduce((s, d) => s + (d.responseTeams || 0), 0), [disasters]
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={onToggleOpen}
        className="lg:hidden fixed top-4 left-4 z-40 bg-slate-800 border border-slate-700 rounded-lg p-2 text-white shadow-xl"
      >
        <Layers className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full z-30
        w-[360px] xl:w-[380px]
        bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50
        flex flex-col
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-slate-700/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">RAKSHAK AI</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Multi-Hazard Intelligence</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <Radio className="w-3 h-3 text-green-400 animate-pulse" />
            <span className="text-green-400 font-medium">AI Engine Active</span>
            <span className="text-slate-600">|</span>
            <Clock className="w-3 h-3 text-slate-500" />
            <span className="text-slate-500">{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2">
            <MetricCard icon={AlertTriangle} label="Active" value={disasters.length} color="border-red-500" subtext="disasters" />
            <MetricCard icon={Users} label="Affected" value={formatPopulation(totalAffected)} color="border-blue-500" subtext="population" />
            <MetricCard icon={Activity} label="Critical" value={criticalCount} color="border-orange-500" subtext="alerts" />
            <MetricCard icon={Shield} label="NDRF" value={totalTeams} color="border-green-500" subtext="teams deployed" />
          </div>

          {/* Hazard Distribution */}
          <HazardDistributionChart disasters={disasters} />

          {/* Cascading Risk Toggle */}
          <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-slate-300">Cascading Risks</span>
              </div>
              <button
                onClick={onToggleCascading}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  showCascading ? 'bg-purple-600' : 'bg-slate-600'
                }`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                  showCascading ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            {showCascading && (
              <p className="text-[10px] text-purple-300/70 mt-2 leading-relaxed">
                Showing cascading disaster risk zones. Purple dashed circles indicate areas where secondary hazards may be triggered.
              </p>
            )}
          </div>

          {/* Disaster List */}
          <div>
            <button
              onClick={() => setExpandedSection(expandedSection === 'list' ? '' : 'list')}
              className="flex items-center justify-between w-full mb-2"
            >
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" /> Active Disasters ({disasters.length})
              </h3>
              {expandedSection === 'list' ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>
            {expandedSection === 'list' && (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {sortedDisasters.map(disaster => (
                  <DisasterListItem
                    key={disaster.id}
                    disaster={disaster}
                    isSelected={selectedDisaster?.id === disaster.id}
                    onClick={onSelectDisaster}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Selected Disaster Detail */}
          {selectedDisaster && (
            <SelectedDisasterPanel
              disaster={selectedDisaster}
              onViewProtocol={onViewProtocol}
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700/50 flex-shrink-0">
          <div className="flex items-center justify-between text-[10px] text-slate-600">
            <span>NDMA / ISRO Bhuvan Integration</span>
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              System Operational
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
