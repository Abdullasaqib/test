import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Static fallback with inline styles only - no dependencies
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0F1C",
          padding: "16px"
        }}>
          <div style={{
            backgroundColor: "#1a1f2e",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            padding: "32px",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center"
          }}>
            <h1 style={{ 
              fontSize: "20px", 
              fontWeight: "bold", 
              color: "#f87171", 
              marginBottom: "16px" 
            }}>
              Something went wrong
            </h1>
            <p style={{ 
              color: "#9ca3af", 
              marginBottom: "20px",
              fontSize: "14px"
            }}>
              We encountered an error. Please refresh the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "10px 24px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
