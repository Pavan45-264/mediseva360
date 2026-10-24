import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, ShieldCheck, CreditCard, Plus } from 'lucide-react';

export default function AddMoneyModal() {
  const { isAddMoneyOpen, setIsAddMoneyOpen, addMoney, user, t } = useApp();
  const [amount, setAmount] = useState('500');
  const [selectedUpi, setSelectedUpi] = useState('Google Pay');
  const [isDone, setIsDone] = useState(false);

  if (!isAddMoneyOpen) return null;

  const chips = ['100', '500', '1000', '2000'];

  const handleAdd = () => {
    const num = Number(amount);
    if (!num || num <= 0) return;
    addMoney(num);
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      setIsAddMoneyOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-sm bg-white dark:bg-[#121212] rounded-t-3xl sm:rounded-3xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-modal p-5 space-y-4 animate-slideUp">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
          <div>
            <h3 className="font-bold text-base text-[#44475B] dark:text-white">{t('addMoney')}</h3>
            <p className="text-[11px] text-[#7C7E8C]">Current Balance: ₹{user.walletBalance.toFixed(2)}</p>
          </div>
          <button onClick={() => setIsAddMoneyOpen(false)} className="text-[#7C7E8C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isDone ? (
          <div className="py-6 text-center space-y-2 animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-[#00D09C] mx-auto animate-bounce" />
            <h4 className="font-bold text-sm text-[#44475B] dark:text-white">₹{amount} Added to Hospital Wallet!</h4>
            <p className="text-xs text-[#7C7E8C]">Updated Balance: ₹{(user.walletBalance).toFixed(2)}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Amount input */}
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-lg font-bold text-[#7C7E8C]">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full h-13 pl-8 pr-4 text-xl font-bold bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:border-[#00D09C] focus:outline-none"
              />
            </div>

            {/* Quick Chips */}
            <div className="grid grid-cols-4 gap-2">
              {chips.map(chip => (
                <button
                  key={chip}
                  onClick={() => setAmount(chip)}
                  className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    amount === chip
                      ? 'border-[#00D09C] bg-[#E6F9F4] text-[#00B386]'
                      : 'border-[#E8E8EC] dark:border-[#2C2C2C] text-[#7C7E8C] hover:border-[#44475B]'
                  }`}
                >
                  +₹{chip}
                </button>
              ))}
            </div>

            {/* UPI App Selection */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C7E8C]">Pay using UPI</span>
              <div className="space-y-1.5 mt-1.5">
                {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map(app => (
                  <div
                    key={app}
                    onClick={() => setSelectedUpi(app)}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer ${
                      selectedUpi === app
                        ? 'border-[#00D09C] bg-[#E6F9F4] dark:bg-emerald-950/60 font-bold text-[#00B386]'
                        : 'border-[#E8E8EC] dark:border-[#2C2C2C] text-[#44475B] dark:text-white'
                    }`}
                  >
                    <span>{app}</span>
                    <span className="text-[10px] text-[#7C7E8C]">Instant UPI</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleAdd}
              className="w-full h-12 bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-sm rounded-xl shadow-md active:scale-95 transition-all"
            >
              Add ₹{amount || 0}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
