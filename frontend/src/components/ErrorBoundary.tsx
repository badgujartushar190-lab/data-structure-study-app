import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught exception]:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-xl bg-white border border-slate-200 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Application Exception</h2>
              <p className="text-xs text-slate-600 font-mono">
                {this.state.error?.message || 'An unexpected rendering error occurred.'}
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
