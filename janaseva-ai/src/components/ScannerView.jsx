import React, { useState } from 'react';
import {
  Camera, Upload, Sparkles, CheckCircle2, AlertTriangle,
  HelpCircle, RefreshCw, Layers, ArrowRight, ShieldCheck,
  Plus, Calendar, IndianRupee, Tag, Info, AlertOctagon,
  Image as ImageIcon
} from 'lucide-react';
import {
  CATEGORIES, POPULAR_BRANDS, SCANNER_DEMO_PRESETS,
  computeProductStatus
} from '../data/expiryData';

export default function ScannerView({
  onAddProduct,
  existingProducts = [],
  onNavigateTab
}) {
  const [activeMode, setActiveMode] = useState('scan'); // 'scan' or 'manual'
  const [selectedPreset, setSelectedPreset] = useState(SCANNER_DEMO_PRESETS[0]);
  const [customImage, setCustomImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showUnclearModal, setShowUnclearModal] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: SCANNER_DEMO_PRESETS[0].extracted.name,
    brand: SCANNER_DEMO_PRESETS[0].extracted.brand,
    category: SCANNER_DEMO_PRESETS[0].extracted.category,
    location: 'Fridge',
    mfgDate: SCANNER_DEMO_PRESETS[0].extracted.mfgDate,
    expiryDate: SCANNER_DEMO_PRESETS[0].extracted.expiryDate,
    price: SCANNER_DEMO_PRESETS[0].extracted.price,
    quantity: SCANNER_DEMO_PRESETS[0].extracted.quantity,
    notes: 'Scanned via Smart Camera AI',
    confidence: 'high'
  });

  // Load a demo preset
  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setCustomImage(null);
    setScanComplete(false);
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);

      if (preset.isUnclear) {
        setShowUnclearModal(true);
      }

      setFormData({
        name: preset.extracted.name,
        brand: preset.extracted.brand,
        category: preset.extracted.category,
        location: preset.category === 'medicines' ? 'Medicine Box' : preset.category === 'dairy' ? 'Fridge' : 'Kitchen Pantry',
        mfgDate: preset.extracted.mfgDate,
        expiryDate: preset.extracted.expiryDate,
        price: preset.extracted.price,
        quantity: preset.extracted.quantity,
        notes: preset.isUnclear ? '⚠️ Date unclear from scan. Needs quick manual check.' : 'Verified via High Confidence OCR',
        confidence: preset.extracted.confidence
      });
    }, 600);
  };

  // Custom photo upload simulation
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      setIsScanning(true);
      setScanComplete(false);

      setTimeout(() => {
        setIsScanning(false);
        setScanComplete(true);
        // Smart parse demo
        setFormData({
          name: 'Uploaded Product Label',
          brand: 'Custom Brand',
          category: 'groceries',
          location: 'Kitchen Pantry',
          mfgDate: new Date().toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          price: 99,
          quantity: '1 Unit',
          notes: 'Uploaded from your phone gallery/camera',
          confidence: 'medium'
        });
      }, 900);
    }
  };

  // Duplicate Check Engine before Saving
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.expiryDate) return;

    // Check if item with very similar name already exists
    const existing = existingProducts.find(
      p => p.name.toLowerCase().trim() === formData.name.toLowerCase().trim() && p.status !== 'expired'
    );

    if (existing && !duplicateWarning) {
      setDuplicateWarning(existing);
      return;
    }

    const newProduct = {
      id: `exp-${Date.now()}`,
      ...formData,
      price: Number(formData.price) || 0,
      scannedVia: customImage ? 'photo_upload' : 'photo_ocr',
      addedBy: 'You'
    };

    onAddProduct(newProduct);
    onNavigateTab('inventory');
  };

  // Quick shelf life calculator
  const handleCalcExpiry = (daysToAdd) => {
    const base = formData.mfgDate ? new Date(formData.mfgDate) : new Date();
    base.setDate(base.getDate() + daysToAdd);
    setFormData({
      ...formData,
      expiryDate: base.toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1600px] mx-auto pb-16">
      
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/30 mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>AI CAMERA OCR SCANNER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Scan Product Expiry Date
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Point your phone camera at any milk pouch, bread packet, or medicine strip. The AI automatically reads the date and warns you before it spoils.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setActiveMode('scan')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'scan'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Photo Scanner</span>
          </button>

          <button
            onClick={() => setActiveMode('manual')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'manual'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Manual Type</span>
          </button>
        </div>
      </div>

      {/* Duplicate Warning Dialog Modal */}
      {duplicateWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-amber-500/50 shadow-2xl space-y-4 text-white">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-400/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Already in Your Kitchen!
                </h3>
                <p className="text-xs text-slate-400">
                  You already have an active item with this name.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
              <div><strong className="text-slate-300">Existing Item:</strong> {duplicateWarning.name}</div>
              <div><strong className="text-slate-300">Expires on:</strong> <span className="text-amber-400">{duplicateWarning.expiryDate}</span></div>
              <div><strong className="text-slate-300">Location:</strong> {duplicateWarning.location}</div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDuplicateWarning(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newProduct = {
                    id: `exp-${Date.now()}`,
                    ...formData,
                    name: `${formData.name} (Batch 2)`,
                    price: Number(formData.price) || 0,
                    scannedVia: 'photo_ocr',
                    addedBy: 'You'
                  };
                  onAddProduct(newProduct);
                  setDuplicateWarning(null);
                  onNavigateTab('inventory');
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-md"
              >
                Add as New Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unclear Date Recovery Modal */}
      {showUnclearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-red-500/50 shadow-2xl space-y-4 text-white">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-3 rounded-2xl bg-red-500/20 border border-red-400/30">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Unclear Date Recovery System
                </h3>
                <p className="text-xs text-slate-400">
                  The date on this photo is blurry or hidden by flash reflection.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-bold text-white">How to get a sharp clear scan:</div>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li><strong className="text-slate-200">Turn off camera flash:</strong> White light bounces off shiny plastic milk packets.</li>
                <li><strong className="text-slate-200">Lay packet flat:</strong> Smooth out folds so numbers aren't bent.</li>
                <li><strong className="text-slate-200">Check top crimp/seal:</strong> On bread and snack bags, dates are printed on the white band.</li>
                <li><strong className="text-slate-200">On tablet strips:</strong> The EXP date is embossed on the right-hand foil edge.</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowUnclearModal(false)}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-md"
              >
                Got It — I Will Type the Date Manually
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main View: Scanner on Left, Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Camera / Photo / Sample Presets */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Scanner Viewport Card */}
          <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-400" />
                Live Camera / Image Preview
              </h3>
              {formData.confidence === 'high' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Sharp OCR
                </span>
              )}
              {formData.confidence === 'uncertain' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-400/30 flex items-center gap-1">
                  <AlertOctagon className="w-3 h-3" /> Unclear Date
                </span>
              )}
            </div>

            {/* Simulated Camera Window */}
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-950 border-2 border-dashed border-emerald-500/30 flex items-center justify-center group shadow-inner">
              <img
                src={customImage || selectedPreset?.previewImg}
                alt="Product Label"
                className={`w-full h-full object-cover transition-all ${isScanning ? 'filter blur-sm brightness-75' : 'brightness-90'}`}
              />

              {/* Scanning Laser Animation Line */}
              {isScanning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs">
                  <div className="w-full h-1 bg-emerald-400 shadow-[0_0_20px_#10B981] animate-pulse mb-3"></div>
                  <span className="text-xs font-bold text-white bg-slate-900/90 px-3.5 py-1 rounded-full border border-emerald-500/40">
                    Extracting Dates & Text...
                  </span>
                </div>
              )}

              {/* Bounding Box Simulation over Expiry Date */}
              {scanComplete && !isScanning && !selectedPreset?.isUnclear && (
                <div className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-slate-950/90 border-2 border-emerald-400 text-white text-[11px] font-mono shadow-2xl">
                  <span className="text-emerald-400 font-bold block">✓ DETECTED EXP:</span>
                  <span className="text-white font-bold">{formData.expiryDate}</span>
                </div>
              )}
            </div>

            {/* Custom Photo Upload Input */}
            <div className="flex items-center justify-between gap-3">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-bold cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Upload Photo From Phone</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Interactive Test Presets (Instant 1-Click Testing) */}
          <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                Instant Test Labels (Try OCR Scanner)
              </h4>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">1-Click Test</span>
            </div>

            <div className="space-y-2">
              {SCANNER_DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    selectedPreset?.id === preset.id && !customImage
                      ? 'bg-emerald-950/40 border-emerald-400 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <img
                    src={preset.previewImg}
                    alt={preset.title}
                    className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="truncate flex-1">
                    <div className="text-xs font-bold text-white truncate">
                      {preset.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      {preset.brand} · {preset.category}
                    </div>
                  </div>
                  {preset.isUnclear && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 flex-shrink-0">
                      Unclear
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Editable Verification Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-5"
          >
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">
                  Confirm Product Details
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Check the extracted details. You can edit any field before saving.
                </p>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Amul Taaza Toned Milk"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Brand Autocomplete & Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="e.g. Amul, Britannia, Dolo"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Expiry Date & MFG Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Expiry Date *</span>
                  <span className="text-[10px] text-emerald-400 font-semibold font-mono">CRITICAL</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/50 text-sm text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Manufacture Date (MFG)
                </label>
                <input
                  type="date"
                  value={formData.mfgDate}
                  onChange={(e) => setFormData({ ...formData, mfgDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Quick Shelf-Life Helper Buttons */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Quick Shelf-Life Calculation (From MFG):
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '+3 Days (Milk)', days: 3 },
                  { label: '+5 Days (Bread)', days: 5 },
                  { label: '+30 Days', days: 30 },
                  { label: '+6 Months', days: 180 },
                  { label: '+1 Year', days: 365 },
                  { label: '+2 Years (Medicines)', days: 730 }
                ].map(preset => (
                  <button
                    key={preset.days}
                    type="button"
                    onClick={() => handleCalcExpiry(preset.days)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-400 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity, Price & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Quantity
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g. 1 Litre, 1 Strip"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g. 54"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Storage Spot
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Fridge">Fridge</option>
                  <option value="Kitchen Pantry">Kitchen Pantry</option>
                  <option value="Medicine Box">Medicine Box</option>
                  <option value="Bathroom Shelf">Bathroom Shelf</option>
                  <option value="Freezer">Freezer</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Notes / Advice
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Finish before weekend"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => onNavigateTab('inventory')}
                className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span>Save to My Inventory</span>
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}
