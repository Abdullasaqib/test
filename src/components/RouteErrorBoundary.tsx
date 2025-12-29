import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallbackRoute?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
  isRetrying: boolean;
}

const MAX_AUTO_RETRIES = 2;
const RETRY_DELAY = 1500;

export default class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null, 
      retryCount: 0,
      isRetrying: false 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const isModuleLoadError = this.isModuleLoadError(error);
    
    // Log to console instead of errorLogger to avoid boot issues
    console.error("Route component crashed", {
      route: window.location.pathname,
      isModuleLoadError,
      error: error.message
    });
    
    this.setState({ errorInfo });
    
    // Auto-retry for module loading errors
    if (isModuleLoadError && this.state.retryCount < MAX_AUTO_RETRIES) {
      this.autoRetry();
    }
  }

  isModuleLoadError(error: Error): boolean {
    const message = error.message.toLowerCase();
    return (
      message.includes('failed to fetch dynamically imported module') ||
      message.includes('loading chunk') ||
      message.includes('loading css chunk') ||
      message.includes('dynamically imported module')
    );
  }

  autoRetry = () => {
    this.setState({ isRetrying: true });
    
    setTimeout(() => {
      this.setState(prev => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prev.retryCount + 1,
        isRetrying: false
      }));
    }, RETRY_DELAY);
  };

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0 
    });
  };

  handleHardRefresh = () => {
    // Force a full page reload to clear all caches
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = this.props.fallbackRoute || "/";
  };

  render() {
    // Show loading state during auto-retry
    if (this.state.isRetrying) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">
              Reconnecting... (attempt {this.state.retryCount + 1}/{MAX_AUTO_RETRIES})
            </p>
          </div>
        </div>
      );
    }

    if (this.state.hasError) {
      const isModuleError = this.state.error && this.isModuleLoadError(this.state.error);
      
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-card border border-border rounded-xl p-8 text-center shadow-lg">
            <div className={`w-16 h-16 ${isModuleError ? 'bg-warning/10' : 'bg-destructive/10'} rounded-full flex items-center justify-center mx-auto mb-6`}>
              {isModuleError ? (
                <Wifi className="h-8 w-8 text-warning" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-destructive" />
              )}
            </div>
            
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {isModuleError ? "Connection Issue" : "Something went wrong"}
            </h2>
            
            <p className="text-muted-foreground text-sm mb-6">
              {isModuleError 
                ? "We had trouble loading this page. This usually happens due to a network issue or outdated cache."
                : "This page encountered an error. Don't worry, the rest of the app still works!"
              }
            </p>

            {this.state.error && !isModuleError && (
              <details className="text-left mb-6">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  Show error details
                </summary>
                <pre className="mt-2 p-3 bg-muted rounded-lg text-xs overflow-auto max-h-32 text-muted-foreground">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="flex gap-3 justify-center flex-wrap">
              <Button
                variant="outline"
                onClick={this.handleGoHome}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
              
              {isModuleError ? (
                <Button
                  onClick={this.handleHardRefresh}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Page
                </Button>
              ) : (
                <Button
                  onClick={this.handleRetry}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
