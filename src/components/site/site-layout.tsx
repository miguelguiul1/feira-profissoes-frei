import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { AdminLoginDialog } from "@/components/landing/admin-login-dialog";
import { Button } from "@/components/ui/button";
import { EVENT } from "@/lib/site-data";

/** Barra de CTA persistente no rodapé da viewport (mobile e tablet). */
function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md xl:hidden">
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <p className="hidden min-w-0 flex-1 items-center gap-2 text-xs font-semibold text-primary sm:flex">
          <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">
            {EVENT.dateLabel}, {EVENT.timeLabel}
          </span>
        </p>
        <Button asChild className="min-h-11 flex-1 rounded-full font-semibold sm:flex-none sm:px-8">
          <Link to="/inscricao">Inscreva-se grátis</Link>
        </Button>
      </div>
    </div>
  );
}

/** Casca comum das páginas públicas: header fixo, main único, rodapé e CTA persistente. */
export function SiteLayout({ children }: { children: ReactNode }) {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <a
        href="#conteudo"
        className="sr-only rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader onOpenAdmin={() => setAdminOpen(true)} />
      <main id="conteudo" className="flex-1 pb-20 xl:pb-0">
        {children}
      </main>
      <SiteFooter onOpenAdmin={() => setAdminOpen(true)} />
      <StickyCta />
      <AdminLoginDialog open={adminOpen} onOpenChange={setAdminOpen} />
    </div>
  );
}
