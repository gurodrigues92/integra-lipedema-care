import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';
import { trackEvent } from './AnalyticsTracker';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to analytics
    trackEvent({
      action: 'javascript_error',
      category: 'error',
      label: error.message,
      value: 1
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you might want to send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      this.logErrorToService(error, errorInfo);
    }
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // Example implementation - replace with your error reporting service
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Send to your error reporting service
    console.log('Error logged to service:', errorData);
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });

    trackEvent({
      action: 'error_retry',
      category: 'error_recovery',
      label: this.state.errorId,
    });
  };

  private handleReportError = () => {
    const subject = encodeURIComponent('Erro no site - ID: ' + this.state.errorId);
    const body = encodeURIComponent(`
Olá! Encontrei um erro no site da Integra Lipecare.

ID do Erro: ${this.state.errorId}
Página: ${window.location.href}
Horário: ${new Date().toLocaleString('pt-BR')}

Descrição do que estava fazendo:
[Descreva o que você estava fazendo quando o erro ocorreu]

Detalhes técnicos:
${this.state.error?.message || 'Erro desconhecido'}
    `);

    const whatsappUrl = `https://wa.me/5515991159866?text=${body}`;
    window.open(whatsappUrl, '_blank');

    trackEvent({
      action: 'error_reported',
      category: 'error_recovery',
      label: this.state.errorId,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="max-w-2xl w-full text-center space-y-8">
            {/* Error Icon */}
            <div className="mx-auto w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-destructive" />
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground">
                Ops! Algo deu errado
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Encontramos um problema técnico inesperado. Nossa equipe foi notificada e está trabalhando para resolver.
              </p>
              
              {/* Error ID for support */}
              <div className="bg-muted/50 rounded-lg p-4 text-sm font-mono text-muted-foreground">
                ID do Erro: {this.state.errorId}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar Novamente
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-xl hover:bg-muted transition-colors font-medium"
              >
                <Home className="w-4 h-4" />
                Voltar ao Início
              </button>

              <button
                onClick={this.handleReportError}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                Reportar Problema
              </button>
            </div>

            {/* Error Details (Development Mode) */}
            {this.props.showDetails && process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-muted/50 rounded-lg p-6 mt-8">
                <summary className="cursor-pointer font-semibold mb-4 text-destructive">
                  Detalhes do Erro (Modo Desenvolvimento)
                </summary>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold">Mensagem:</h4>
                    <pre className="bg-background p-3 rounded mt-1 overflow-x-auto">
                      {this.state.error.message}
                    </pre>
                  </div>
                  
                  {this.state.error.stack && (
                    <div>
                      <h4 className="font-semibold">Stack Trace:</h4>
                      <pre className="bg-background p-3 rounded mt-1 overflow-x-auto text-xs">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}
                  
                  {this.state.errorInfo?.componentStack && (
                    <div>
                      <h4 className="font-semibold">Component Stack:</h4>
                      <pre className="bg-background p-3 rounded mt-1 overflow-x-auto text-xs">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* Help Text */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Se o problema persistir, entre em contato conosco pelo WhatsApp.
              </p>
              <p>
                Nosso horário de atendimento: Segunda a Sexta, 8h às 18h | Sábado, 8h às 13h
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}