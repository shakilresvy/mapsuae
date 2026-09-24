import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home as HomeIcon, Phone, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl, getPhoneUrl, CONTACT_CONFIG } from '../config';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  title?: string;
  description?: string;
  resetKeys?: unknown[];
  onReset?: () => void;
  compact?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public componentDidUpdate(prevProps: Props) {
    // Automatically reset error boundary if resetKeys changed
    if (this.state.hasError && this.props.resetKeys && prevProps.resetKeys) {
      const hasChanged = this.props.resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      );
      if (hasChanged) {
        this.resetError();
      }
    }
  }

  public resetError = () => {
    this.props.onReset?.();
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  public handleGoHome = () => {
    this.resetError();
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  public handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Compact inline error fallback (e.g. for widgets, sub-sections)
      if (this.props.compact) {
        return (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-slate-800 my-3">
            <div className="flex items-center gap-2.5 text-amber-800 font-bold text-sm mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{this.props.title || 'Component could not be displayed'}</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              {this.props.description || 'A temporary display issue occurred while loading this section.'}
            </p>
            <button
              onClick={this.resetError}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Try Again</span>
            </button>
          </div>
        );
      }

      // Full featured Error Screen
      return (
        <div className="min-h-[400px] flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-center p-6 sm:p-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {this.props.title || 'Something unexpected happened'}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              {this.props.description ||
                'An error occurred while rendering this view. Your session is safe, and you can recover by resetting the view or returning to the home catalog.'}
            </p>

            {/* Error Message Details (if available) */}
            {this.state.error && (
              <div className="bg-slate-900 text-amber-400/90 rounded-xl p-3 text-xs font-mono text-left mb-6 overflow-x-auto border border-slate-800">
                <span className="text-slate-400 font-bold block mb-0.5">Details:</span>
                {this.state.error.message || 'Unknown runtime error'}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={this.resetError}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-all shadow-sm cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-sm cursor-pointer"
              >
                <HomeIcon className="w-4 h-4 text-amber-400" />
                <span>Back to Home</span>
              </button>
            </div>

            {/* Direct Support Fallback */}
            <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
              <span>Need urgent parts assistance?</span>
              <a
                href={getPhoneUrl()}
                className="inline-flex items-center gap-1 font-bold text-slate-800 hover:text-amber-600 transition-colors"
              >
                <Phone className="w-3 h-3 text-amber-500" />
                <span>{CONTACT_CONFIG.showroom.primaryPhone}</span>
              </a>
              <a
                href={getWhatsAppUrl('Hello MAPS UAE, I encountered an issue on the website and would like to inquire about parts directly.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <MessageSquare className="w-3 h-3 text-emerald-500" />
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
