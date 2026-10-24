import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("MediQueue Component Error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-amber-600 dark:text-amber-300 shadow-sm">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#44475B] dark:text-white">
              Something went wrong loading this view
            </h3>
            <p className="text-xs text-[#7C7E8C] dark:text-[#9A9A9A] max-w-xs mx-auto">
              We encountered a temporary rendering issue. Your appointments and wallet balance are safe.
            </p>
          </div>
          <div className="flex space-x-3 pt-2">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry View</span>
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (window.history.length > 1) {
                  window.location.href = '/';
                } else {
                  window.location.reload();
                }
              }}
              className="px-4 py-2 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] bg-white dark:bg-[#1B1B1B] text-[#44475B] dark:text-white text-xs font-semibold hover:border-[#00D09C] transition-all flex items-center space-x-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
