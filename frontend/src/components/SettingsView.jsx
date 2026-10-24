import React, { useState } from 'react';
import {
  Settings, ZoomIn, Eye, Volume2, BellRing, Database,
  RotateCcw, Trash2, CheckCircle2, Shield, HeartHandshake,
  AlertCircle, Sparkles, MapPin, Plus, Sliders
} from 'lucide-react';
import { INITIAL_PRODUCTS, saveInventoryToStorage } from '../data/expiryData';

export default function SettingsView({
  seniorMode,
  setSeniorMode,
  highContrast,
  setHighContrast,
  onResetData,
  onClearData,
  onSpeak,
  customThreshold,
  setCustomThreshold
}) {
  const [locations, setLocations] = useState([
    'Fridge',
    'Medicine Box',
    'Pantry Counter',
    'Kitchen Cupboard',
    'Snack Jar',
    'Bathroom Cabinet'
  ]);
  const [newLocation, setNewLocation] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [teluguVoiceEnabled, setTeluguVoiceEnabled] = useState(true);

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (!newLocation.trim()) return;
    if (!locations.includes(newLocation.trim())) {
      setLocations([...locations, newLocation.trim()]);
    }
    setNewLocation('');
  };

  const handleRemoveLocation = (loc) => {
    setLocations(locations.filter(l => l !== loc));
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto pb-16">
      
      {/* Top Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/30 mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>EASY CONTROLS & SENIOR CITIZEN MODE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Settings & Senior Accessibility
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Make text bigger for grandparents, hear spoken Telugu guides, customize alert days, and manage your kitchen data easily.
          </p>
        </div>

        <button
          onClick={() => onSpeak && onSpeak('సెట్టింగ్స్ పేజీకి స్వాగతం. ఇక్కడ మీరు పెద్ద అక్షరాలు, తెలుగు వాయిస్ మరియు హెచ్చరికలను సెట్ చేసుకోవచ్చు.', 'te-IN')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-bold transition-all shadow-md"
        >
          <Volume2 className="w-4 h-4 text-emerald-400" />
          <span>తెలుగులో వినండి (Listen)</span>
        </button>
      </div>

      {/* Senior Citizen Accessibility Card */}
      <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">
              Senior Citizen & Elderly Friendly Controls
            </h2>
            <p className="text-xs text-slate-400">
              Designed specially for parents and grandparents for comfortable daily reading
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Big Text Mode Toggle */}
          <div className={`p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 ${
            seniorMode
              ? 'bg-emerald-950/40 border-emerald-400 shadow-lg shadow-emerald-950/50'
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <ZoomIn className="w-5 h-5 text-emerald-400" />
                <span className="text-base font-black text-white">
                  Big Text Mode (పెద్ద అక్షరాలు)
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Increases font size by 25% and expands touch buttons so elders can read product expiry dates without eye strain.
              </p>
              {seniorMode && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full mt-1 border border-emerald-500/40">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Large Mode Active
                </span>
              )}
            </div>

            <button
              onClick={() => setSeniorMode(!seniorMode)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                seniorMode
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {seniorMode ? 'ON (ఆన్)' : 'OFF (ఆఫ్)'}
            </button>
          </div>

          {/* High Contrast Mode */}
          <div className={`p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 ${
            highContrast
              ? 'bg-black border-emerald-400 shadow-lg'
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Eye className={`w-5 h-5 ${highContrast ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="text-base font-black text-white">
                  High Contrast (స్పష్టమైన రంగులు)
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sharp borders and maximum contrast for clearer reading in bright sunlight or for low vision.
              </p>
              {highContrast && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full mt-1 border border-emerald-500/40">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High Contrast On
                </span>
              )}
            </div>

            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                highContrast
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {highContrast ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Telugu Spoken Voice Feedback */}
          <div className={`p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 md:col-span-2 ${
            teluguVoiceEnabled
              ? 'bg-emerald-950/40 border-emerald-400 shadow-lg'
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-emerald-400" />
                <span className="text-base font-black text-white">
                  Telugu Audio Voice Assistant (తెలుగు మాటలు)
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Speaks reminders aloud in clear Telugu when opening the app or inspecting medicines, so elders can simply listen without reading.
              </p>
            </div>

            <button
              onClick={() => setTeluguVoiceEnabled(!teluguVoiceEnabled)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                teluguVoiceEnabled
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {teluguVoiceEnabled ? 'Enabled (ఆన్)' : 'Disabled'}
            </button>
          </div>

        </div>
      </div>

      {/* Reminder Threshold Settings */}
      <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <BellRing className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">
              Expiry Warning Schedule
            </h2>
            <p className="text-xs text-slate-400">
              Choose how many days before expiry you want to receive alerts
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm font-bold text-white mb-2">
              <span>Warning Threshold Days:</span>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-black border border-emerald-400/30">
                {customThreshold || 3} Days in Advance
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="14"
              value={customThreshold || 3}
              onChange={(e) => setCustomThreshold(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
              <span>1 Day (Last moment)</span>
              <span>3 Days (Recommended)</span>
              <span>7 Days (1 Week)</span>
              <span>14 Days (2 Weeks)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <div className="font-bold text-white mb-0.5">🥛 Fresh Milk & Curd</div>
              <div className="text-slate-400">Alert triggers at <strong className="text-emerald-400">2 days</strong> before souring</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <div className="font-bold text-white mb-0.5">🍞 Packaged Bread & Buns</div>
              <div className="text-slate-400">Alert triggers at <strong className="text-amber-400">24 hours</strong> before mold risk</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <div className="font-bold text-white mb-0.5">💊 Medicines & Tablets</div>
              <div className="text-slate-400">Alert triggers at <strong className="text-teal-400">30 days</strong> for safe restock</div>
            </div>
          </div>
        </div>
      </div>

      {/* Household Storage Locations */}
      <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">
              Household Storage Spots
            </h2>
            <p className="text-xs text-slate-400">
              Organize where items are kept in your kitchen, fridge, or medicine drawer
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => (
            <span
              key={loc}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-950 text-slate-200 text-xs font-semibold border border-slate-800"
            >
              📍 {loc}
              <button
                onClick={() => handleRemoveLocation(loc)}
                className="hover:text-red-400 text-slate-500 font-bold ml-1"
                title="Remove location"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <form onSubmit={handleAddLocation} className="flex gap-2 pt-2">
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Add new spot (e.g., Dining Table, Garage Cooler)..."
            className="flex-1 px-4 py-2.5 text-xs rounded-2xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl text-xs font-black flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add Spot
          </button>
        </form>
      </div>

      {/* Local Storage & Data Management */}
      <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">
              Inventory Data Controls & Reset
            </h2>
            <p className="text-xs text-slate-400">
              All your products are stored safely inside your browser's private offline storage
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Reset to Sample Data */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
            <div>
              <div className="text-sm font-black text-white flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                Reset Sample Indian Inventory
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Restores 12 verified realistic Indian items (Amul Milk, Dolo 650, Crocin, Britannia Bread, etc.) for quick testing and demonstration.
              </p>
            </div>

            {showResetConfirm ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onResetData();
                    setShowResetConfirm(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black"
                >
                  Confirm Reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-2 transition-all shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[3]" />
                Load Sample Data
              </button>
            )}
          </div>

          {/* Clear All Inventory */}
          <div className="p-5 rounded-2xl border border-red-500/30 bg-red-950/20 space-y-3">
            <div>
              <div className="text-sm font-black text-red-300 flex items-center gap-1.5">
                <Trash2 className="w-4 h-4 text-red-400" />
                Clear All Inventory
              </div>
              <p className="text-xs text-red-200/80 mt-1 leading-relaxed">
                Wipes all items from your pantry and starts fresh with a blank inventory slate.
              </p>
            </div>

            {showClearConfirm ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClearData();
                    setShowClearConfirm(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-black"
                >
                  Yes, Wipe Everything
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-5 py-2.5 rounded-xl bg-red-600/40 hover:bg-red-600 text-red-200 hover:text-white text-xs font-black flex items-center gap-2 transition-all border border-red-500/40"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All Products
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
