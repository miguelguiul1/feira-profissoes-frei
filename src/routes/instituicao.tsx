import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading, SurfaceCard } from "@/components/site/section";
import { InstituteSection } from "@/components/landing/institute-section";
import { Button } from "@/components/ui/button";
import { CERTIFICATIONS, SITE_URL, STATS } from "@/lib/site-data";

const TITLE = "A instituição | Instituto Social Nossa Senhora de Fátima";
const DESCRIPTION =
  "Fundado em 1971 por Frei Xavier, o Instituto Social Nossa Senhora de Fátima oferece educação profissional gratuita na zona sul de São Paulo há 55 anos.";
const URL = `${SITE_URL}/instituicao`;

export const Route = createFileRoute("/instituicao")({
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
  component: InstituicaoPage,
});

function InstituicaoPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Instituição"
        title="55 anos transformando vidas pela educação"
        description="Uma instituição social sem fins lucrativos que forma profissionais na zona sul de São Paulo desde 1971."
        showEventMeta={false}
      />

      <InstituteSection />

      <Section tone="default" labelledBy="instituicao-numeros">
        <SectionHeading id="instituicao-numeros" title="Nossa história em números" />
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <SurfaceCard key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-extrabold text-primary">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm font-semibold text-foreground">
                  {stat.label}
                </span>
                <span className="mt-2 block text-xs text-muted-foreground">{stat.detail}</span>
              </dd>
            </SurfaceCard>
          ))}
        </dl>
      </Section>

      <Section tone="soft" labelledBy="instituicao-certificacoes">
        <SectionHeading
          id="instituicao-certificacoes"
          eyebrow="Credibilidade"
          title="Certificações e reconhecimento"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {CERTIFICATIONS.map((item) => (
            <li key={item}>
              <SurfaceCard className="h-full p-5 text-sm text-foreground/85">{item}</SurfaceCard>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full px-8 font-semibold">
            <Link to="/cursos">Conhecer os cursos</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-primary/30 px-8 font-semibold text-primary"
          >
            <Link to="/contato">Visitar o Instituto</Link>
          </Button>
        </div>
      </Section>
    </SiteLayout>
  );
}
