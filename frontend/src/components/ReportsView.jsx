import React, { useState } from 'react';
import {
  FileText, Printer, Download, Search, CheckCircle,
  AlertTriangle, Shield, Clock, MapPin, Table
} from 'lucide-react';
import { SEVERITY_LEVELS } from '../data/pralayaData';

export default function ReportsView({
  hazards = [],
  currentScenario = null
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHazards = hazards.filter((h) => {
    return (
      h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = [
      'Event ID', 'Title', 'Category', 'Severity', 'State',
      'Districts', 'Risk Score', 'Exposed Population', 'NDRF Teams',
      'Data Source', 'Timestamp'
    ];

    const rows = hazards.map((h) => [
      h.id,
      `"${h.title.replace(/"/g, '""')}"`,
      h.category,
      h.severity,
      `"${h.state}"`,
      `"${h.districts?.join(', ') || ''}"`,
      h.riskScore,
      h.exposure?.population || 0,
      h.ndrfResponse?.teamsDeployed || 0,
      `"${h.dataSource}"`,
      h.timestamp
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PRALAYA_AI_INCIDENT_SITREP_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1920px] mx-auto">
      
      {/* Header & Print/Export Actions */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 rounded-2xl p-6 lg:p-8 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-500/30">
              NATIONAL SITREP GENERATOR
            </span>
            <span className="text-xs font-mono text-slate-400">Standard Disaster Briefing Format</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Operational Situation Reports (SITREP) & Data Exports
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Generate formal incident command briefings for state disaster authorities, district collectors, and emergency response teams with exportable tabular registries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs tracking-wide transition-colors shadow-lg"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            Print Official SITREP
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-emerald-600/30"
          >
            <Download className="w-4 h-4" />
            Export CSV Dataset
          </button>
        </div>
      </div>

      {/* Official Printable Briefing Document (A4 Print Ready) */}
      <div className="bg-slate-900/95 printable-card rounded-2xl p-6 lg:p-10 border border-slate-800 shadow-2xl space-y-6">
        
        {/* Document Header */}
        <div className="border-b border-slate-800 pb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-black text-white font-display tracking-tight">
                PRALAYA<span className="text-red-500">.AI</span> COMMAND BRIEFING
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                SITUATION REPORT
              </span>
            </div>
            <p className="text-xs text-slate-400">
              National Disaster Management Council Intelligence Summary · India Operations
            </p>
          </div>

          <div className="text-right font-mono text-xs text-slate-400 space-y-0.5">
            <div><strong>SITREP ID:</strong> PRALAYA-{new Date().toISOString().slice(0, 10)}-IND</div>
            <div><strong>TIMELINESS:</strong> T+0 REALTIME SITUATIONAL AWARENESS</div>
            <div><strong>CLASSIFICATION:</strong> OFFICIAL EMERGENCY USE</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" /> Executive Operational Assessment
          </h3>
          Total <strong className="text-white">{hazards.length} multi-hazard calamity clusters</strong> are currently monitored across the Indian subcontinent under active operational scenario <em>"{currentScenario?.title || 'Operational Scenario'}"</em>. 
          Aggregate exposed population stands at approximately <strong className="text-white">{((hazards.reduce((a, b) => a + (b.exposure?.population || 0), 0)) / 100000).toFixed(1)} Lakh citizens</strong>. 
          Coordinated pre-positioning of {hazards.reduce((a, b) => a + (b.ndrfResponse?.teamsDeployed || 0), 0)} NDRF battalions and state disaster management taskforces is in progress.
        </div>

        {/* Search Bar for Incidents */}
        <div className="flex items-center justify-between gap-4 no-print">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter incident entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <span className="text-xs font-mono text-slate-500">
            Showing {filteredHazards.length} of {hazards.length} Events
          </span>
        </div>

        {/* Incident Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Event & Location</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4">Exposed Pop.</th>
                <th className="py-3 px-4">NDRF Teams</th>
                <th className="py-3 px-4">Telemetry Provenance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredHazards.map((h) => {
                const sev = SEVERITY_LEVELS[h.severity] || SEVERITY_LEVELS.HIGH;
                return (
                  <tr key={h.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white font-sans">{h.title}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 font-sans mt-0.5">
                        <MapPin className="w-3 h-3 text-red-400" /> {h.state} ({h.districts?.slice(0, 2).join(', ')})
                      </div>
                    </td>
                    <td className="py-3 px-4 text-cyan-300 font-bold font-sans">
                      {h.category}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${sev.bgClass}`}>
                        {h.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-amber-400">
                      {h.riskScore}%
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-bold">
                      {((h.exposure?.population || 0) / 100000).toFixed(1)} L
                    </td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">
                      {h.ndrfResponse?.teamsDeployed || 0}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] truncate max-w-xs font-sans">
                      {h.dataSource}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Authorization */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono">
          <div>Report generated via PRALAYA AI Multi-Hazard Intelligence Platform</div>
          <div>Authorized Emergency Response Copy</div>
        </div>

      </div>

    </div>
  );
}
