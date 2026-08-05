import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import logoAsset from "@/assets/logo-frei.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-brand-deep py-12 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex items-start gap-3">
          <img
            src={logoAsset.url}
            alt="Logo da 6ª Feira das Profissões do Instituto Social Nossa Senhora de Fátima"
            className="h-14 w-14 shrink-0 rounded-full bg-primary-foreground/10 object-contain"
            loading="lazy"
          />
          <div className="min-w-0">
            <p className="font-display text-lg font-extrabold">6ª Feira das Profissões</p>
            <p className="text-sm text-primary-foreground/75">
              Instituto Social Nossa Senhora de Fátima
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold tracking-wide uppercase">Navegação</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
            {[
              { href: "#inicio", label: "Início" },
              { href: "#programacao", label: "Programação" },
              { href: "#cursos", label: "Cursos" },
              { href: "#parceiros", label: "Parceiros" },
              { href: "#inscricao", label: "Inscrição" },
            ].map((link) => (
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
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0">
                Av. Cel. Octaviano de Freitas Costa, 463 — Veleiros, São Paulo/SP, 04773-000
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a href="tel:+551155245100" className="hover:underline">
                (11) 5524-5100
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a href="mailto:contato@institutofrei.org.br" className="hover:underline">
                contato@institutofrei.org.br
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold tracking-wide uppercase">Redes sociais</h2>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/20"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            @institutofrei
          </a>
          <p className="mt-6 text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Instituto Social Nossa Senhora de Fátima. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
