// Lazy-initialized error logger to prevent boot failures

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';
export type ErrorCategory = 'general' | 'module_load' | 'network' | 'render' | 'auth';

export interface ErrorContext {
  component?: string;
  route?: string;
  userId?: string;
  action?: string;
  category?: ErrorCategory;
  metadata?: Record<string, unknown>;
}

interface LoggedError {
  id: string;
  timestamp: string;
  severity: ErrorSeverity;
  message: string;
  stack?: string;
  context: ErrorContext;
  userAgent: string;
  url: string;
  category: ErrorCategory;
}

interface ModuleLoadStats {
  totalAttempts: number;
  failures: number;
  recoveries: number;
  lastFailure?: string;
}

class ErrorLogger {
  private static instance: ErrorLogger | null = null;
  private errorQueue: LoggedError[] = [];
  private readonly maxQueueSize = 50;
  private moduleLoadStats: ModuleLoadStats = {
    totalAttempts: 0,
    failures: 0,
    recoveries: 0
  };
  private initialized = false;

  private constructor() {
    // Don't do anything in constructor - defer to init()
  }

  private init(): void {
    if (this.initialized) return;
    this.initialized = true;

    // Only set up listeners if window is available
    if (typeof window === 'undefined') return;

    try {
      // Catch unhandled errors
      window.addEventListener('error', (event) => {
        const category = this.categorizeError(event.message);
        this.log('critical', event.message, {
          component: 'window',
          category,
          metadata: { filename: event.filename, lineno: event.lineno, colno: event.colno }
        }, event.error);
      });

      // Catch unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        const message = event.reason?.message || String(event.reason);
        const category = this.categorizeError(message);
        this.log('critical', `Unhandled Promise Rejection: ${message}`, {
          component: 'promise',
          category
        }, event.reason instanceof Error ? event.reason : undefined);
      });

      // Flush queue periodically
      setInterval(() => this.flushQueue(), 30000);
    } catch (e) {
      console.warn('ErrorLogger init warning:', e);
    }
  }

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    // Lazy init on first access
    ErrorLogger.instance.init();
    return ErrorLogger.instance;
  }

  private categorizeError(message: string): ErrorCategory {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('failed to fetch dynamically imported module') ||
        lowerMessage.includes('loading chunk') ||
        lowerMessage.includes('loading css chunk')) {
      return 'module_load';
    }
    
    if (lowerMessage.includes('network') ||
        lowerMessage.includes('fetch') ||
        lowerMessage.includes('cors')) {
      return 'network';
    }
    
    if (lowerMessage.includes('auth') ||
        lowerMessage.includes('unauthorized') ||
        lowerMessage.includes('unauthenticated')) {
      return 'auth';
    }
    
    if (lowerMessage.includes('render') ||
        lowerMessage.includes('hydrat')) {
      return 'render';
    }
    
    return 'general';
  }

  trackModuleLoad(success: boolean, moduleName?: string): void {
    this.moduleLoadStats.totalAttempts++;
    
    if (!success) {
      this.moduleLoadStats.failures++;
      this.moduleLoadStats.lastFailure = new Date().toISOString();
      
      this.log('warning', `Module load failed: ${moduleName || 'unknown'}`, {
        category: 'module_load',
        metadata: { moduleName, stats: { ...this.moduleLoadStats } }
      });
    }
  }

  trackModuleRecovery(moduleName?: string): void {
    this.moduleLoadStats.recoveries++;
    this.log('info', `Module recovered: ${moduleName || 'unknown'}`, {
      category: 'module_load',
      metadata: { moduleName, stats: { ...this.moduleLoadStats } }
    });
  }

  getModuleLoadStats(): ModuleLoadStats {
    return { ...this.moduleLoadStats };
  }

  private generateId(): string {
    try {
      return typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : `err-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    } catch {
      return `err-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  log(
    severity: ErrorSeverity,
    message: string,
    context: ErrorContext = {},
    error?: Error
  ): void {
    const loggedError: LoggedError = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      severity,
      message,
      stack: error?.stack,
      context,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      category: context.category || 'general',
    };

    this.errorQueue.push(loggedError);

    // Keep queue size limited
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue = this.errorQueue.slice(-this.maxQueueSize);
    }

    // Console output
    const consoleMethod = severity === 'critical' || severity === 'error' ? 'error' : severity === 'warning' ? 'warn' : 'log';
    console[consoleMethod](`[${severity.toUpperCase()}] ${message}`, context, error || '');

    // Immediate flush for critical errors
    if (severity === 'critical') {
      this.flushQueue();
    }
  }

  private async flushQueue(): Promise<void> {
    if (this.errorQueue.length === 0) return;

    const errorsToSend = [...this.errorQueue];
    this.errorQueue = [];

    // Store locally as backup
    try {
      if (typeof localStorage !== 'undefined') {
        const existingErrors = JSON.parse(localStorage.getItem('error_log') || '[]');
        const combined = [...existingErrors, ...errorsToSend].slice(-100);
        localStorage.setItem('error_log', JSON.stringify(combined));
      }
    } catch (e) {
      // Ignore storage errors
    }

    // SECURITY: Send errors to backend with authentication
    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      if (!SUPABASE_URL) {
        console.warn('Supabase URL not configured, skipping error log upload');
        return;
      }

      // Get session for auth
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      
      if (!supabaseKey) {
        console.warn('Supabase key not configured, skipping error log upload');
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: { session } } = await supabase.auth.getSession();

      // Rate limit error logging (max 10 batches per minute)
      const rateLimitKey = 'error_log_flush';
      const stored = localStorage.getItem(`rate_limit_${rateLimitKey}`);
      const now = Date.now();
      
      if (stored) {
        const limit = JSON.parse(stored);
        if (now < limit.resetAt && limit.count >= 10) {
          // Rate limited, skip this flush
          return;
        }
      }

      // Prepare errors for sending
      const errorsPayload = errorsToSend.map(err => ({
        id: err.id,
        timestamp: err.timestamp,
        severity: err.severity,
        category: err.category,
        message: err.message.slice(0, 5000), // Limit message length
        stack: err.stack ? err.stack.slice(0, 10000) : null,
        route: err.context.route || null,
        url: err.url || null,
        userAgent: err.userAgent || null,
        userId: session?.user?.id || null,
        context: err.context.metadata || {},
      }));

      // Send to backend function
      const response = await fetch(`${SUPABASE_URL}/functions/v1/log-client-error`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: session ? `Bearer ${session.access_token}` : `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ errors: errorsPayload }),
      });

      if (!response.ok) {
        console.warn('Failed to send error logs to backend:', response.status);
      } else {
        // Update rate limit
        const newLimit = {
          count: 1,
          resetAt: now + 60000, // 1 minute
        };
        localStorage.setItem(`rate_limit_${rateLimitKey}`, JSON.stringify(newLimit));
      }
    } catch (error) {
      // Silently fail - don't break app if error logging fails
      console.warn('Error logging failed:', error);
    }
  }

  info(message: string, context?: ErrorContext): void {
    this.log('info', message, context);
  }

  warning(message: string, context?: ErrorContext, error?: Error): void {
    this.log('warning', message, context, error);
  }

  error(message: string, context?: ErrorContext, error?: Error): void {
    this.log('error', message, context, error);
  }

  critical(message: string, context?: ErrorContext, error?: Error): void {
    this.log('critical', message, context, error);
  }

  getRecentErrors(count: number = 10): LoggedError[] {
    return this.errorQueue.slice(-count);
  }

  getErrorsByCategory(category: ErrorCategory): LoggedError[] {
    return this.errorQueue.filter(e => e.category === category);
  }

  clearQueue(): void {
    this.errorQueue = [];
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('error_log');
      }
    } catch (e) {
      // Ignore
    }
  }
}

// LAZY GETTER - does NOT instantiate until first access
let _errorLoggerInstance: ErrorLogger | null = null;

export const errorLogger = {
  get instance(): ErrorLogger {
    if (!_errorLoggerInstance) {
      _errorLoggerInstance = ErrorLogger.getInstance();
    }
    return _errorLoggerInstance;
  },
  log: (severity: ErrorSeverity, message: string, context?: ErrorContext, error?: Error) => 
    errorLogger.instance.log(severity, message, context, error),
  info: (message: string, context?: ErrorContext) => 
    errorLogger.instance.info(message, context),
  warning: (message: string, context?: ErrorContext, error?: Error) => 
    errorLogger.instance.warning(message, context, error),
  error: (message: string, context?: ErrorContext, error?: Error) => 
    errorLogger.instance.error(message, context, error),
  critical: (message: string, context?: ErrorContext, error?: Error) => 
    errorLogger.instance.critical(message, context, error),
  trackModuleLoad: (success: boolean, moduleName?: string) => 
    errorLogger.instance.trackModuleLoad(success, moduleName),
  trackModuleRecovery: (moduleName?: string) => 
    errorLogger.instance.trackModuleRecovery(moduleName),
  getModuleLoadStats: () => 
    errorLogger.instance.getModuleLoadStats(),
  getRecentErrors: (count?: number) => 
    errorLogger.instance.getRecentErrors(count),
  getErrorsByCategory: (category: ErrorCategory) => 
    errorLogger.instance.getErrorsByCategory(category),
  clearQueue: () => 
    errorLogger.instance.clearQueue(),
};

// Helper functions
export function logComponentError(
  componentName: string,
  error: Error,
  action?: string
): void {
  errorLogger.error(error.message, {
    component: componentName,
    action,
    category: 'render',
  }, error);
}

export function logNetworkError(
  url: string,
  status: number,
  message: string
): void {
  errorLogger.error(`Network Error: ${message}`, {
    action: 'network_request',
    category: 'network',
    metadata: { url, status }
  });
}

export function logModuleLoadError(
  moduleName: string,
  error: Error
): void {
  errorLogger.error(`Module Load Error: ${moduleName}`, {
    action: 'module_load',
    category: 'module_load',
    metadata: { moduleName }
  }, error);
}
