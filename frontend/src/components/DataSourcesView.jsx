import React from 'react';
import {
  Database, CheckCircle2, AlertTriangle, ExternalLink,
  Radio, Clock, Server, RefreshCw, ShieldCheck
} from 'lucide-react';
import { DATA_SOURCES_DIRECTORY } from '../data/pralayaData';

export default function DataSourcesView() {
  return (
    <div className="space-y-8 animate-fadeIn max-w-[1920px] mx-auto">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 rounded-2xl p-6 lg:p-8 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              NATIONAL SPATIAL DATA INFRASTRUCTURE (NSDI)
            </span>
            <span className="text-xs font-mono text-slate-400">Live Telemetry Ingestion Layer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Data Sources Health, Endpoints & Ingestion Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Real-world external data providers for earth observation, radar meteorology, seismic telemetry, and river basin stages. External services operate alongside deterministic demonstration engines.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
          <Server className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>ALL INGESTION AGENTS ONLINE</span>
        </div>
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DATA_SOURCES_DIRECTORY.map((src) => {
          const isOperational = src.status === 'OPERATIONAL';

          return (
            <div
              key={src.id}
              className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                    {src.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase flex items-center gap-1 ${
                    isOperational
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isOperational ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                    {src.status}
                  </span>
                </div>

                {/* Name & Agency */}
                <h3 className="text-base font-bold text-white mb-1 leading-snug">
                  {src.name}
                </h3>
                <p className="text-xs text-cyan-300 font-medium mb-3">
                  {src.agency}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {src.description}
                </p>

                {/* Layer Badges */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">
                    Integrated Layers:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {src.layers.map((layer) => (
                      <span
                        key={layer}
                        className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-mono"
                      >
                        {layer}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Endpoints & Ping */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Telemetry Latency:</span>
                  <span className="text-emerald-400 font-bold">{src.pingMs} ms</span>
                </div>

                <div className="p-2 rounded bg-slate-950 border border-slate-800/80 text-[10px] font-mono text-slate-400 truncate">
                  <span className="text-slate-500">ENDPOINT: </span>
                  <span className="text-slate-300">{src.primaryEndpoint}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
