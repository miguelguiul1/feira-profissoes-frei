import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, QrCode, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Visitantes", icon: Users, exact: true },
  { to: "/admin/credenciamento", label: "Credenciamento", icon: QrCode, exact: false },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 lg:px-8">
          <div className="min-w-0">
            <h1 className="truncate font-display text-xl font-extrabold text-primary sm:text-2xl">
              Painel Administrativo
            </h1>
            <p className="truncate text-sm text-muted-foreground">
              6ª Feira das Profissões — Instituto Social Nossa Senhora de Fátima
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="shrink-0 rounded-full border-primary text-primary hover:bg-accent"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sair
          </Button>
        </div>

        <nav aria-label="Navegação do painel" className="mx-auto max-w-7xl px-4 lg:px-8">
          <ul className="flex gap-2 overflow-x-auto pb-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.exact }}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                  activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" }}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
