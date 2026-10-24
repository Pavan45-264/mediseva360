import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, Building, ArrowDownLeft } from 'lucide-react';

export default function RefundModal() {
  const { isRefundOpen, setIsRefundOpen, refundToBank, user, t } = useApp();
  const [amount, setAmount] = useState('450');
  const [isDone, setIsDone] = useState(false);

  if (!isRefundOpen) return null;

  const handleRefund = () => {
    const num = Number(amount);
    if (!num || num <= 0 || num > user.walletBalance) {
      alert("Please enter a valid amount within your wallet balance.");
      return;
    }
    refundToBank(num);
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      setIsRefundOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-sm bg-white dark:bg-[#121212] rounded-t-3xl sm:rounded-3xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal p-5 space-y-4 animate-slideUp">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
          <div>
            <h3 className="font-bold text-base text-[#44475B] dark:text-white">{t('refundToBank')}</h3>
            <p className="text-[11px] text-[#7C7E8C]">Available to refund: ₹{user.walletBalance.toFixed(2)}</p>
          </div>
          <button onClick={() => setIsRefundOpen(false)} className="text-[#7C7E8C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isDone ? (
          <div className="py-6 text-center space-y-2 animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-[#00D09C] mx-auto animate-bounce" />
            <h4 className="font-bold text-sm text-[#44475B] dark:text-white">Refund Initiated!</h4>
            <p className="text-xs text-[#7C7E8C]">₹{amount} is transferring to your linked HDFC Bank account.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Bank Card */}
            <div className="p-3 rounded-xl bg-[#F5F6F8] dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  HDFC
                </div>
                <div>
                  <h4 className="font-bold text-[#44475B] dark:text-white">HDFC Bank •••• 4921</h4>
                  <p className="text-[10px] text-[#7C7E8C]">Primary Verified Bank Account</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#00B386]">Verified</span>
            </div>

            {/* Amount input */}
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-lg font-bold text-[#7C7E8C]">₹</span>
              <input
                type="number"
                value={amount}
                max={user.walletBalance}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full h-13 pl-8 pr-20 text-xl font-bold bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#5367FF] focus:outline-none"
              />
              <button
                onClick={() => setAmount(String(user.walletBalance))}
                className="absolute right-3 top-3.5 text-xs font-bold text-[#5367FF]"
              >
                Withdraw all
              </button>
            </div>

            <p className="text-[11px] text-[#7C7E8C]">
              Zero cancellation charges. Funds reflect in your bank account immediately via IMPS/NEFT.
            </p>

            {/* Submit Button */}
            <button
              onClick={handleRefund}
              className="w-full h-12 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-sm rounded-xl shadow-md active:scale-95 transition-all"
            >
              Refund ₹{amount || 0} to bank
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
