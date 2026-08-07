import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarPlus, MapPin, Search } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading, SurfaceCard } from "@/components/site/section";
import { ScheduleSection } from "@/components/landing/schedule-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/site/share-buttons";
import { AGENDA, EVENT, FULL_ADDRESS, SITE_URL, SPEAKERS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const TITLE = "Programação | 6ª Feira das Profissões FREI";
const DESCRIPTION =
  "Agenda completa da 6ª Feira das Profissões: palestras, oficinas práticas, visitas guiadas e sorteio, das 9h às 16h de 19 de setembro de 2026.";
const URL = `${SITE_URL}/programacao`;

const TRACKS = ["Todos", "Palestra", "Oficina", "Visita", "Institucional"] as const;

const CALENDAR_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  EVENT.name,
)}&dates=20260919T120000Z/20260919T190000Z&details=${encodeURIComponent(
  "Evento gratuito com palestras, oficinas e visitas guiadas.",
)}&location=${encodeURIComponent(FULL_ADDRESS)}`;

export const Route = createFileRoute("/programacao")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ProgramacaoPage,
});

function ProgramacaoPage() {
  const [track, setTrack] = useState<(typeof TRACKS)[number]>("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AGENDA.filter((slot) => {
      const matchesTrack = track === "Todos" || slot.track === track;
      const matchesQuery =
        !q ||
        `${slot.title} ${slot.place} ${slot.description}`.toLowerCase().includes(q);
      return matchesTrack && matchesQuery;
    });
  }, [track, query]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Programação"
        title="Agenda completa do dia da feira"
        description="Monte o seu roteiro: filtre por tipo de atividade, busque por tema e adicione o evento ao seu calendário."
        showCta={false}
      />

      <Section tone="default" labelledBy="agenda-titulo">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SectionHeading
            id="agenda-titulo"
            title="Agenda interativa"
            description="Todas as atividades são gratuitas e não exigem inscrição prévia por atividade."
          />
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="rounded-full font-semibold text-primary">
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                Adicionar ao Google Calendar
              </a>
            </Button>
            <ShareButtons title={TITLE} text={DESCRIPTION} url={URL} />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filtrar atividades por tipo"
            className="flex flex-wrap gap-2"
          >
            {TRACKS.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={track === item}
                onClick={() => setTrack(item)}
                className={cn(
                  "min-h-11 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  track === item
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-primary hover:bg-accent",
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="busca-agenda" className="sr-only">
              Buscar na programação
            </label>
            <Input
              id="busca-agenda"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por tema, sala ou palestra"
              className="min-h-11 rounded-full pl-9"
            />
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          {filtered.length} atividade{filtered.length === 1 ? "" : "s"} encontrada
          {filtered.length === 1 ? "" : "s"}.
        </p>

        <ol className="mt-6 space-y-3">
          {filtered.map((slot) => (
            <li key={`${slot.time}-${slot.title}`}>
              <SurfaceCard
                interactive
                className="grid gap-3 p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6"
              >
                <p className="font-display text-lg font-extrabold text-primary sm:w-20">
                  {slot.time}
                </p>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full">{slot.track}</Badge>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {slot.place}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold text-foreground">
                    {slot.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{slot.description}</p>
                </div>
              </SurfaceCard>
            </li>
          ))}
        </ol>

        {filtered.length === 0 ? (
          <p className="mt-6 rounded-3xl bg-secondary p-6 text-center text-sm text-muted-foreground">
            Nenhuma atividade corresponde à sua busca. Tente outro termo ou volte para “Todos”.
          </p>
        ) : null}
      </Section>

      <Section tone="gradient" labelledBy="palestrantes-titulo">
        <SectionHeading
          id="palestrantes-titulo"
          eyebrow="Palestrantes"
          title="Quem vai falar na feira"
          description="Profissionais do mercado, professores e ex-alunos compartilham experiências reais de carreira."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPEAKERS.map((speaker) => (
            <li key={speaker.name}>
              <SurfaceCard className="h-full">
                <span
                  aria-hidden="true"
                  className="grid h-14 w-14 place-items-center rounded-full bg-brand-tint font-display text-lg font-extrabold text-primary"
                >
                  {speaker.initials}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-primary">
                  {speaker.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{speaker.role}</p>
                <p className="mt-3 text-sm text-foreground/85">{speaker.topic}</p>
              </SurfaceCard>
            </li>
          ))}
        </ul>
      </Section>

      <ScheduleSection />

      <Section tone="soft" className="text-center">
        <SectionHeading
          align="center"
          title="Vai participar? Confirme sua presença"
          description="A inscrição é gratuita e garante o certificado de participação."
        />
        <div className="mt-6 flex justify-center">
          <Button asChild size="lg" className="rounded-full px-8 font-semibold">
            <Link to="/inscricao">Fazer inscrição</Link>
          </Button>
        </div>
      </Section>
    </SiteLayout>
  );
}
