import { Instagram, MapPin, Phone } from "lucide-react";
import logoAsset from "@/assets/logo-frei.png.asset.json";

const LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#programacao", label: "Programação" },
  { href: "#cursos", label: "Cursos" },
  { href: "#inscricao", label: "Inscrição" },
  { href: "#contato", label: "Contato" },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand py-12 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={logoAsset.url}
              alt="Logo do Instituto Social Nossa Senhora de Fátima — FREI 1971"
              className="h-16 w-16 rounded-full bg-primary-foreground/10 object-contain"
              loading="lazy"
            />
            <p className="mt-4 text-sm text-primary-foreground/80">
              Instituto Social Nossa Senhora De Fátima — Descubra seu futuro na Feira de Profissões
              2026 e conheça de perto os nossos cursos, projetos e parceiros.
            </p>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold tracking-wide uppercase">
              Horários e endereço
            </h2>
            <p className="mt-4 text-sm text-primary-foreground/80">
              19 de Setembro de 2026, das 9h às 16h
            </p>
            <p className="mt-3 flex items-start gap-2 text-sm text-primary-foreground/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0">
                Instituto Social Nossa Senhora de Fátima, Av. Cel. Octaviano de Freitas Costa, 463 —
                Veleiros, São Paulo/SP, 04773-000
              </span>
            </p>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold tracking-wide uppercase">
              Links rápidos
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold tracking-wide uppercase">Contato</h2>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
              <li>
                <a
                  href="https://www.instagram.com/institutonsfatima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:underline"
                >
                  <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                  institutonsfatima
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href="tel:+5511963986252" className="hover:underline">
                  (11) 96398-6252 — secretaria / whatsapp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href="tel:+551137985037" className="hover:underline">
                  (11) 3798-5037 — secretaria
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-xs text-primary-foreground/70">
          © 2026 Todos os direitos reservados para Instituto Social Nossa Senhora de Fátima.
        </p>
      </div>
    </footer>
  );
}
