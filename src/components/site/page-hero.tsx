import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PillBadge } from "./section";
import { EVENT, FULL_ADDRESS } from "@/lib/site-data";

/** Cabeçalho padrão das páginas internas: breadcrumb visual, título e dados do evento. */
export function PageHero({
  eyebrow,
  title,
  description,
  showEventMeta = true,
  showCta = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  showEventMeta?: boolean;
  showCta?: boolean;
}) {
  return (
    <section className="bg-linear-to-b from-brand-soft to-background py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="text-xs font-bold tracking-[0.18em] text-primary/70 uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold text-balance text-primary sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
          {description}
        </p>

        {showEventMeta ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            <li>
              <PillBadge>
                <Ticket className="h-4 w-4 shrink-0" aria-hidden="true" />
                Evento gratuito
              </PillBadge>
            </li>
            <li>
              <PillBadge>
                <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
                {EVENT.dateLabel}, {EVENT.timeLabel}
              </PillBadge>
            </li>
            <li>
              <PillBadge className="max-w-full">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0 truncate">{FULL_ADDRESS}</span>
              </PillBadge>
            </li>
          </ul>
        ) : null}

        {showCta ? (
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-7 font-semibold">
              <Link to="/inscricao">Fazer inscrição gratuita</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary/30 px-7 font-semibold text-primary"
            >
              <Link to="/programacao">Ver programação</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
