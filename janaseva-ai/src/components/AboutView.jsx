import React from 'react';
import {
  Award, ShieldCheck, Sparkles, AlertTriangle, Layers,
  Cpu, HeartHandshake, CheckCircle2, DollarSign, Database,
  ArrowRight, ShieldAlert, BookOpen, Volume2, Users, Lightbulb,
  ExternalLink, BarChart3, Clock, AlertCircle
} from 'lucide-react';

export default function AboutView({ onOpenVoice, onOpenScanner }) {
  const innovations = [
    {
      num: '01',
      title: 'Multi-Product Label & Receipt OCR',
      desc: 'Simulated neural bounding-box vision scanner extracts product names, dates, and prices simultaneously from a single photo or supermarket slip.',
      tag: 'Computer Vision'
    },
    {
      num: '02',
      title: 'Unclear Date Recovery Engine',
      desc: 'When an inkjet date stamp is smudged or printed as dot-matrix, the AI flags uncertainty and prompts the user with intelligent date guesses instead of failing silently.',
      tag: 'OCR Robustness'
    },
    {
      num: '03',
      title: 'Intelligent Duplicate Detection',
      desc: 'Compares scanned brand names and pantry locations against existing inventory to prevent accidental double-purchasing and unnecessary grocery expenses.',
      tag: 'Pantry Intelligence'
    },
    {
      num: '04',
      title: 'Shelf-Life Heuristics Calculator',
      desc: 'For items bearing only "Best Before 6 Months from MFG", the engine automatically computes the exact calendar expiry date based on category shelf-life models.',
      tag: 'Rule Engine'
    },
    {
      num: '05',
      title: 'Smart Use-First Priority Queue',
      desc: 'Ranks edible inventory by remaining hours and pairs near-expiry items with quick Indian home recipe ideas (e.g., Bread Upma, Paneer Bhurji) before they spoil.',
      tag: 'Waste Prevention'
    },
    {
      num: '06',
      title: 'Strict Safety Quarantine for Expired Meds',
      desc: 'Critical zero-tolerance safety guard: expired tablets (Dolo, Crocin) and dairy items are strictly locked out of recipe suggestions with clear red warnings to protect family health.',
      tag: 'Health Safety'
    },
    {
      num: '07',
      title: 'Bilingual Voice Assistant (Telugu & English)',
      desc: 'Native integration with Web Speech API for spoken queries in Telugu (తెలుగు) and Indian English, making inventory accessible to non-English-literate users.',
      tag: 'Voice AI'
    },
    {
      num: '08',
      title: 'Senior Citizen Accessibility & Ergonomics',
      desc: 'Dedicated 125% magnification mode, high-contrast visual filters, ≥52px touch-friendly targets, and spoken Telugu audio prompts designed for elderly parents and grandparents.',
      tag: 'Accessibility'
    },
    {
      num: '09',
      title: 'Waste & Financial Impact Analytics',
      desc: 'Quantifies money saved (₹) through timely consumption versus rupees lost to discarded perishables, visualizing family financial discipline with interactive Recharts.',
      tag: 'Financial Analytics'
    },
    {
      num: '10',
      title: 'Family Multi-Member Collaboration',
      desc: 'Multi-role household coordination (Admin, Contributor, Senior User) with live consumption feeds and shared tasks so everyone knows what needs to be eaten first.',
      tag: 'Household Workflow'
    }
  ];

  return (
    <div className="space-y-10 animate-fadeIn max-w-5xl mx-auto pb-16">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/60 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-emerald-500/30 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/40">
            <Award className="w-4 h-4 text-emerald-400" />
            National Innovation Conclave & Hackathon Project
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            ExpiryGuard: Eliminating Household Food & Medicine Waste
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            An intelligent, accessibility-first inventory ecosystem combining 3D computer vision, Telugu & English voice guidance, and smart home recipe orchestration to save Indian families money and protect health.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onOpenScanner}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Try Smart Scanner
            </button>
            <button
              onClick={onOpenVoice}
              className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-500/30 transition-all flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-emerald-400" /> Test Telugu Voice
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* The Problem Statement */}
      <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-2xl bg-red-500/20 text-red-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">
              The Reality: Food & Medical Waste in Indian Households
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Why traditional grocery tracking fails in busy multi-generational families
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-3xl font-black text-amber-400 font-mono">68M+</div>
            <div className="text-sm font-bold text-white">Tonnes of Food Wasted Annually</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              According to the UNEP Food Waste Index, Indian households generate over 50kg of food waste per capita each year, primarily from forgotten perishables.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-3xl font-black text-emerald-400 font-mono">₹89,000 Cr</div>
            <div className="text-sm font-bold text-white">Yearly Financial Loss</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Urban families lose an estimated ₹1,200 to ₹3,500 every single month throwing out soured milk, stale bread, and forgotten snacks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-3xl font-black text-red-400 font-mono">Severe Risk</div>
            <div className="text-sm font-bold text-white">Expired Medicine Hazards</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Elderly citizens with fading eyesight frequently ingest expired paracetamol or syrups kept in cluttered drawers, risking toxicity.
            </p>
          </div>
        </div>
      </div>

      {/* System Architecture Diagram */}
      <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">
              System Architecture & Pipeline Flow
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              End-to-end data flow from camera capture to voice synthesis and proactive notifications
            </p>
          </div>
        </div>

        {/* Architecture Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
            <div className="font-bold text-emerald-400 text-sm">
              1. Ingestion Layer
            </div>
            <p className="text-slate-400 leading-relaxed">
              • High-Res Camera Capture<br/>
              • Supermarket Receipt Scan<br/>
              • Web Speech Ingestion (Telugu / English)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/30 space-y-2">
            <div className="font-bold text-teal-400 text-sm">
              2. Vision & OCR Core
            </div>
            <p className="text-slate-400 leading-relaxed">
              • Multi-Product OCR Bounding<br/>
              • Unclear Date Recovery Prompt<br/>
              • Indian Brand Name Fuzzy Match
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
            <div className="font-bold text-amber-400 text-sm">
              3. Logic & Rules Engine
            </div>
            <p className="text-slate-400 leading-relaxed">
              • Shelf-Life Calculator<br/>
              • Urgency Priority Queue<br/>
              • Expired Medicine Quarantine<br/>
              • Duplicate Pantry Detector
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
            <div className="font-bold text-purple-400 text-sm">
              4. Accessibility & Action
            </div>
            <p className="text-slate-400 leading-relaxed">
              • Telugu Voice Synthesis<br/>
              • Senior Citizen 125% Mode<br/>
              • Recipe Ideation Engine<br/>
              • Push Alert Dispatcher
            </p>
          </div>
        </div>
      </div>

      {/* 10 Key Innovations Matrix */}
      <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">
              The 10 Core Innovations of ExpiryGuard
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Features purpose-built for Indian household realities and elder care
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {innovations.map((inv) => (
            <div
              key={inv.num}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-950 hover:border-emerald-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-black text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                    INNOVATION {inv.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {inv.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-1.5">
                  {inv.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {inv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Realities of AI & Computer Vision Disclaimer */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 text-white space-y-5 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <AlertCircle className="w-6 h-6 text-amber-400" />
          <div>
            <h3 className="text-lg font-bold text-white">
              Engineering Transparency: Real-World OCR Realities & Fallbacks
            </h3>
            <p className="text-xs text-slate-400">
              Why 100% automated OCR is impossible on Indian packaging without Human-in-the-Loop design
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="font-bold text-amber-300">1. Dot-Matrix Inkjet Stamps</div>
            <p className="text-slate-400">
              Indian milk pouches and bread packets use faint dot-matrix printing that rubs off easily. ExpiryGuard flags faint dates for quick 1-click confirmation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="font-bold text-amber-300">2. Reflective Blister Foils</div>
            <p className="text-slate-400">
              Medicine strips reflect room lighting and obscure embossed batch dates. Our Unclear Date modal suggests likely expiration months instead of failing.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="font-bold text-amber-300">3. Non-Standard Date Formats</div>
            <p className="text-slate-400">
              Labels alternate between `DD/MM/YY`, `EXP: MM.YYYY`, and `Use within 3 days of mfg`. ExpiryGuard's heuristics normalize all variations into clean calendar dates.
            </p>
          </div>
        </div>
      </div>

      {/* Future Roadmap */}
      <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          Future Roadmap & Commercial Expansion
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-white mb-1">🛒 B2B Kirana Store Mode</div>
            <p>Batch scanning for small grocery store owners to liquidate near-expiry items at 40% discount before write-offs.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-white mb-1">🍲 NGO Food Bank Integration</div>
            <p>One-tap donation dispatch to Robin Hood Army and local food banks for surplus packaged rations.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-white mb-1">📲 WhatsApp Daily Digest</div>
            <p>Automated 8:00 AM WhatsApp message in Telugu/Hindi listing: "Today's Milk, Bread, and Dolo 650 status".</p>
          </div>
        </div>
      </div>

    </div>
  );
}
