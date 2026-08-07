import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/Nova pasta/logo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/site-data";

export function SiteHeader({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent bg-background/90 backdrop-blur-md transition-shadow",
        scrolled && "border-border shadow-soft",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:justify-between lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <img
            src={logoAsset}
            alt="Instituto Social Nossa Senhora de Fátima — 6ª Feira das Profissões"
            className="h-11 w-11 shrink-0 rounded-full object-contain"
            width={44}
            height={44}
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-sm leading-tight font-extrabold text-primary">
              6ª Feira das Profissões
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              Instituto Social Nossa Senhora de Fátima
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "bg-accent text-primary" }}
              className="rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-accent hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden rounded-full px-6 font-semibold xl:inline-flex">
            <Link to="/inscricao">Inscreva-se</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none xl:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div id="menu-principal" className="border-t border-border bg-background xl:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3"
            aria-label="Navegação móvel"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "bg-accent text-primary" }}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2 rounded-full font-semibold">
              <Link to="/inscricao">Inscreva-se</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                onOpenAdmin();
              }}
              className="rounded-full font-semibold"
            >
              Administrativo
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
