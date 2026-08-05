import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo-frei.png.asset.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#programacao", label: "Programação" },
  { href: "#cursos", label: "Cursos" },
  { href: "#inscricao", label: "Inscrição" },
  { href: "#contato", label: "Contato" },
];

export function SiteHeader({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent bg-background/90 backdrop-blur-md transition-shadow",
        scrolled && "border-border shadow-soft",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:justify-between lg:px-8">
        <a
          href="#inicio"
          onClick={(e) => handleNav(e, "#inicio")}
          className="flex min-w-0 items-center gap-3 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <img
            src={logoAsset.url}
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
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-accent hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:bg-secondary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={onOpenAdmin}
            className="hidden rounded-full px-6 font-semibold lg:inline-flex"
          >
            Administrativo
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:hidden"
          >
            {open ? <Menu className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            {open ? <X className="hidden" /> : null}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3" aria-label="Navegação móvel">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => {
                setOpen(false);
                onOpenAdmin();
              }}
              className="mt-2 rounded-full font-semibold"
            >
              Administrativo
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
