import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <aside aria-label="Notifications" className="fixed top-4 right-4 z-[9999] flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none px-3 sm:px-0">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            role={isError ? "alert" : "status"}
            aria-live="polite"
            className={`pointer-events-auto flex items-start space-x-3 p-3.5 rounded-2xl shadow-xl backdrop-blur-md border transition-all animate-slideDown ${
              isSuccess
                ? 'bg-emerald-900/95 dark:bg-emerald-950/95 text-white border-emerald-500/50'
                : isError
                ? 'bg-rose-900/95 dark:bg-rose-950/95 text-white border-rose-500/50'
                : 'bg-slate-900/95 dark:bg-[#1A1A1A]/95 text-white border-slate-700'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {isInfo && <Info className="w-5 h-5 text-sky-400" />}
            </div>

            <div className="flex-1 text-xs">
              {toast.title && (
                <h4 className="font-bold text-sm tracking-tight text-white mb-0.5">
                  {toast.title}
                </h4>
              )}
              <p className="text-white/90 leading-relaxed font-medium">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white p-1 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </aside>
  );
}
