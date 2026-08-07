import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone } from "lucide-react";
import logoAsset from "@/assets/Nova pasta/logo-frei.png";
import fairLogo from "@/assets/Nova pasta/logo.png";
import { EVENT, FULL_ADDRESS, NAV_LINKS } from "@/lib/site-data";

export function SiteFooter({ onOpenAdmin }: { onOpenAdmin?: () => void }) {
  return (
    <footer className="bg-brand py-12 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-start gap-10 text-center lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14 lg:text-left">
          <div className="flex justify-center gap-4 lg:justify-start">
            <img src={fairLogo} alt="Logo da Feira das Profissões" className="h-24 w-24 object-contain" loading="lazy" />
            <img src={logoAsset} alt="Logo do Instituto Social Nossa Senhora de Fátima" className="h-24 w-24 object-contain" loading="lazy" />
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          <div>
            <h2 className="font-display text-sm font-bold tracking-wide uppercase">Horários e endereço</h2>
            <p className="mt-4 text-sm text-primary-foreground/80">{EVENT.dateLabel}, {EVENT.timeLabel}</p>
            <p className="mt-3 flex items-start justify-center gap-2 text-sm text-primary-foreground/80 lg:justify-start">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="max-w-52">{FULL_ADDRESS}</span>
            </p>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold tracking-wide uppercase">Navegação</h2>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
              {NAV_LINKS.map((link) => (
                <li key={link.to}><Link to={link.to} className="rounded hover:underline focus-visible:underline">{link.label}</Link></li>
              ))}
              <li><Link to="/inscricao" className="rounded font-semibold hover:underline">Inscrição</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold tracking-wide uppercase">Contato</h2>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
              <li><a href={EVENT.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline"><Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />institutonsfatima</a></li>
              <li className="flex items-center justify-center gap-2 lg:justify-start"><Phone className="h-4 w-4 shrink-0" aria-hidden="true" /><a href={`tel:${EVENT.phoneWhatsapp}`} className="hover:underline">(11) 96398-6252 — secretaria / WhatsApp</a></li>
              <li className="flex items-center justify-center gap-2 lg:justify-start"><Phone className="h-4 w-4 shrink-0" aria-hidden="true" /><a href={`tel:${EVENT.phoneOffice}`} className="hover:underline">(11) 3798-5037 — secretaria</a></li>
              {onOpenAdmin ? <li><button type="button" onClick={onOpenAdmin} className="rounded text-primary-foreground/70 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary-foreground/60 focus-visible:outline-none">Acesso administrativo</button></li> : null}
            </ul>
          </div>
          </div>
        </div>

        <p className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-xs text-primary-foreground/70">© 2026 Todos os direitos reservados para Instituto Social Nossa Senhora de Fátima.</p>
      </div>
    </footer>
  );
}
