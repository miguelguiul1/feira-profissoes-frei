import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, MapPin, Search } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading, SurfaceCard } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EXHIBITORS, SITE_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const TITLE = "Expositores e empresas | 6ª Feira das Profissões FREI";
const DESCRIPTION =
  "Empresas e instituições que participam da 6ª Feira das Profissões com estandes, vagas, programas de aprendizagem e orientação de carreira.";
const URL = `${SITE_URL}/expositores`;

export const Route = createFileRoute("/expositores")({
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
  component: ExpositoresPage,
});

const SEGMENTS = ["Todos", ...Array.from(new Set(EXHIBITORS.map((e) => e.segment)))];

function ExpositoresPage() {
  const [segment, setSegment] = useState("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXHIBITORS.filter(
      (item) =>
        (segment === "Todos" || item.segment === segment) &&
        (!q || `${item.name} ${item.description}`.toLowerCase().includes(q)),
    );
  }, [segment, query]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Expositores"
        title="Empresas que estarão na feira"
        description="Converse com recrutadores, conheça programas de aprendizagem e descubra vagas abertas no dia do evento."
        showEventMeta={false}
      />

      <Section tone="default" labelledBy="expositores-titulo">
        <SectionHeading
          id="expositores-titulo"
          title="Lista de expositores"
          description="Lista preliminar — novas empresas são confirmadas até a semana do evento."
        />

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filtrar por segmento" className="flex flex-wrap gap-2">
            {SEGMENTS.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={segment === item}
                onClick={() => setSegment(item)}
                className={cn(
                  "min-h-11 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  segment === item
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
            <label htmlFor="busca-expositores" className="sr-only">
              Buscar expositor
            </label>
            <Input
              id="busca-expositores"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar empresa"
              className="min-h-11 rounded-full pl-9"
            />
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          {filtered.length} expositor{filtered.length === 1 ? "" : "es"} listado
          {filtered.length === 1 ? "" : "s"}.
        </p>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <li key={item.name}>
              <SurfaceCard interactive className="flex h-full flex-col">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-tint text-primary">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-primary">{item.name}</h3>
                <Badge variant="secondary" className="mt-2 w-fit rounded-full">
                  {item.segment}
                </Badge>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{item.description}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.booth}
                </p>
              </SurfaceCard>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft">
        <SurfaceCard className="flex flex-col gap-4 bg-brand p-8 text-primary-foreground ring-0 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-extrabold">Sua empresa quer expor?</h2>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Reserve um estande, ofereça vagas ou apresente um programa de aprendizagem para os
              nossos alunos.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="rounded-full px-8 font-semibold">
            <Link to="/contato">Falar com a organização</Link>
          </Button>
        </SurfaceCard>
      </Section>
    </SiteLayout>
  );
}
