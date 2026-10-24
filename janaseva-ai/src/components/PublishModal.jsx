import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  QrCode,
  Smartphone,
  Copy,
  CheckCircle2,
  ExternalLink,
  Share2,
  Globe,
  Sparkles,
  Check
} from 'lucide-react';

export default function PublishModal() {
  const { isPublishModalOpen, closePublishModal } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isPublishModalOpen) return null;

  const publicUrl = "https://frontend-iota-topaz-ak3limlcy9.vercel.app";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(publicUrl)}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "MediQueue — Healthcare Simplified, Groww Style",
        text: "Access all hospitals in India, live OPD queue tokens, and doctors.",
        url: publicUrl
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-sm bg-white dark:bg-[#121212] rounded-t-3xl sm:rounded-3xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal p-6 space-y-4 text-center animate-slideUp">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-[#00D09C]" />
            <h3 className="font-bold text-base text-[#44475B] dark:text-white">
              Publish & Open on Mobile
            </h3>
          </div>
          <button onClick={closePublishModal} className="text-[#7C7E8C] hover:text-[#44475B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Published Badge */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E6F9F4] dark:bg-emerald-950/70 border border-[#00D09C]/40 text-[#00B386] text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-[#00D09C] animate-pulse" />
          <span>Live on Vercel Production</span>
        </div>

        {/* Scannable Real QR Code Container */}
        <div className="p-3 bg-white rounded-2xl border-2 border-[#00D09C] shadow-sm inline-block mx-auto">
          <img
            src={qrCodeUrl}
            alt="Scan to open MediQueue on your phone"
            className="w-48 h-48 rounded-lg mx-auto object-contain"
          />
        </div>

        <p className="text-xs text-[#7C7E8C] dark:text-[#9A9A9A]">
          Point your phone camera at the screen above to launch the mobile app instantly on iOS or Android.
        </p>

        {/* URL Box with Copy Button */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F5F6F8] dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] text-xs">
          <span className="text-[11px] font-mono text-[#44475B] dark:text-white truncate max-w-[210px]">
            {publicUrl}
          </span>
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg bg-[#00D09C] text-white font-bold text-[11px] flex items-center space-x-1 hover:bg-[#00B386] transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons: Open & Share */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={publicUrl}
            target="_blank"
            rel="noreferrer"
            className="py-2.5 rounded-xl border border-[#5367FF] text-[#5367FF] font-bold text-xs flex items-center justify-center space-x-1 hover:bg-[#EEF0FF] transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Browser</span>
          </a>

          <button
            onClick={handleShare}
            className="py-2.5 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-sm active:scale-95 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </button>
        </div>

      </div>
    </div>
  );
}
