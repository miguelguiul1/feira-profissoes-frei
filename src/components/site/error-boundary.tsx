import { Component, type ErrorInfo, type ReactNode } from "react";
import { reportLovableError } from "@/lib/lovable-error-reporting";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Boundary de renderização: evita a "tela branca" quando um componente
 * lança em runtime. Nunca exibe stack traces ao usuário final.
 */
export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
    reportLovableError(error, { boundary: "app_error_boundary" });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-xl font-bold text-foreground">
            Algo deu errado por aqui
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Não foi possível exibir esta parte do site. Tente recarregar a página.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Tentar novamente
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Ir para a home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
