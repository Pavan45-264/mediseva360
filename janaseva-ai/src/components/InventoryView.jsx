import React, { useState, useMemo } from 'react';
import {
  Search, Filter, Plus, CheckCircle2, HeartHandshake,
  Trash2, AlertTriangle, AlertOctagon, HelpCircle,
  LayoutGrid, List, ArrowUpDown, IndianRupee, MapPin,
  Calendar, Check, ShieldAlert, Sparkles, Package
} from 'lucide-react';
import { CATEGORIES } from '../data/expiryData';

export default function InventoryView({
  products = [],
  onMarkAsUsed,
  onDonateItem,
  onDiscardItem,
  onDeleteItem,
  onOpenScanner,
  onOpenManualAdd
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all', 'expiring_soon', 'safe', 'expired', 'unverified'
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [sortBy, setSortBy] = useState('expiry_asc');

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.notes?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;
      const matchLocation = selectedLocation === 'all' || p.location === selectedLocation;

      return matchSearch && matchCategory && matchStatus && matchLocation;
    }).sort((a, b) => {
      if (sortBy === 'expiry_asc') {
        if (!a.expiryDate) return 1;
        if (!b.expiryDate) return -1;
        return new Date(a.expiryDate) - new Date(b.expiryDate);
      }
      if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'price_desc') {
        return (b.price || 0) - (a.price || 0);
      }
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus, selectedLocation, sortBy]);

  // Status badge styling with neon glow
  const renderStatusBadge = (product) => {
    if (product.status === 'expired') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/40">
          <AlertOctagon className="w-3 h-3 text-red-400" />
          EXPIRED ({Math.abs(product.daysRemaining)} days ago)
        </span>
      );
    }
    if (product.status === 'expiring_soon') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/40">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          {product.daysRemaining === 0 ? 'Expires Today!' : product.daysRemaining === 1 ? 'Expires Tomorrow!' : `${product.daysRemaining} days left`}
        </span>
      );
    }
    if (product.status === 'safe') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          SAFE ({product.daysRemaining} days)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
        <HelpCircle className="w-3 h-3 text-slate-400" />
        UNVERIFIED
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1600px] mx-auto pb-16">
      
      {/* Header & Quick Action Buttons */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              PANTRY & MEDICINE LEDGER
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {filteredProducts.length} of {products.length} Products Shown
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            My Product Inventory
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse, search, and manage food, dairy, and medicine expiry dates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenScanner}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
            <span>Scan New Item</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        
        {/* Search, Sort, View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search product (e.g. Amul, Bread, Dolo, Fridge)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline flex items-center gap-1 font-semibold">
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="expiry_asc">Soonest Expiry First</option>
              <option value="name_asc">Product Name (A-Z)</option>
              <option value="price_desc">Highest Price First</option>
            </select>
          </div>

          {/* Grid vs Table Toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'table' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800">
          
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'expiring_soon', label: '⚠️ Expiring Soon' },
              { id: 'safe', label: '✅ Fresh & Safe' },
              { id: 'expired', label: '🚨 Expired' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedStatus === tab.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div className="ml-auto flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const isExpired = product.status === 'expired';
            const isExpiringSoon = product.status === 'expiring_soon';

            return (
              <div
                key={product.id}
                className={`rounded-3xl p-5 border shadow-xl transition-all hover:scale-[1.01] flex flex-col justify-between ${
                  isExpired
                    ? 'border-red-500/50 bg-red-950/20 shadow-red-950/30'
                    : isExpiringSoon
                    ? 'border-amber-500/50 bg-amber-950/20 shadow-amber-950/30'
                    : 'border-slate-800 bg-slate-900/80 hover:border-emerald-500/40 shadow-black'
                }`}
              >
                <div>
                  {/* Status Badge & Price */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {renderStatusBadge(product)}
                    <span className="text-xs font-mono font-black text-white bg-slate-950 border border-slate-800 px-2.5 py-0.5 rounded-full">
                      ₹{product.price || 0}
                    </span>
                  </div>

                  {/* Product Title & Brand */}
                  <h3 className="text-base font-black text-white line-clamp-1 mb-0.5">
                    {product.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium mb-3">
                    {product.brand} · {product.quantity}
                  </div>

                  {/* Dates & Location Card */}
                  <div className="p-3.5 bg-slate-950 rounded-2xl space-y-1.5 text-xs text-slate-300 mb-3 font-mono border border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">EXP DATE:</span>
                      <strong className={isExpired ? 'text-red-400' : isExpiringSoon ? 'text-amber-300' : 'text-emerald-300'}>
                        {product.expiryDate || 'Unverified'}
                      </strong>
                    </div>
                    {product.mfgDate && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">MFG:</span>
                        <span className="text-slate-300">{product.mfgDate}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">LOCATION:</span>
                      <span className="font-sans font-semibold text-white">{product.location}</span>
                    </div>
                  </div>

                  {/* Notes / Advice */}
                  {product.notes && (
                    <p className="text-[11px] text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                      {product.notes}
                    </p>
                  )}
                </div>

                {/* 1-Click Action Buttons */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  {isExpired ? (
                    <button
                      onClick={() => onDiscardItem(product.id)}
                      className="w-full py-2.5 rounded-xl bg-red-600/40 hover:bg-red-600 text-red-200 hover:text-white font-black text-xs flex items-center justify-center gap-1.5 border border-red-500/50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Discard Safely</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => onMarkAsUsed(product.id)}
                        className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-transform hover:scale-105 shadow-md"
                        title="Mark as Consumed"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Used</span>
                      </button>

                      <button
                        onClick={() => onDonateItem(product.id)}
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors border border-slate-700"
                        title="Donate to community pantry"
                      >
                        <HeartHandshake className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDeleteItem(product.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 shadow-xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-4 px-5">Product & Brand</th>
                <th className="py-4 px-5">Category</th>
                <th className="py-4 px-5">Status & Days Left</th>
                <th className="py-4 px-5">Expiry Date</th>
                <th className="py-4 px-5">Location</th>
                <th className="py-4 px-5">Price</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-white">{p.name}</div>
                    <div className="text-[11px] text-slate-400">{p.brand} ({p.quantity})</div>
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-slate-300 capitalize">
                    {p.category}
                  </td>
                  <td className="py-3.5 px-5">
                    {renderStatusBadge(p)}
                  </td>
                  <td className="py-3.5 px-5 font-mono font-bold text-white">
                    {p.expiryDate || '—'}
                  </td>
                  <td className="py-3.5 px-5 text-slate-300">
                    {p.location}
                  </td>
                  <td className="py-3.5 px-5 font-mono font-bold text-emerald-400">
                    ₹{p.price}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onMarkAsUsed(p.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs"
                      >
                        Used
                      </button>
                      <button
                        onClick={() => onDeleteItem(p.id)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="bg-slate-900/80 rounded-3xl p-12 text-center border border-slate-800 text-slate-400 space-y-4">
          <Package className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs max-w-sm mx-auto">
            Try clearing your search query or click below to scan a new grocery or medicine item.
          </p>
          <button
            onClick={onOpenScanner}
            className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md"
          >
            Scan Product Now
          </button>
        </div>
      )}

    </div>
  );
}
