import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading, SurfaceCard } from "@/components/site/section";
import { PartnersSection } from "@/components/landing/partners-section";
import { Button } from "@/components/ui/button";
import { PARTNERS } from "@/components/landing/partners";
import { SITE_URL } from "@/lib/site-data";

const TITLE = "Parceiros | 6ª Feira das Profissões FREI";
const DESCRIPTION =
  "Empresas, órgãos públicos e instituições parceiras que apoiam o Instituto Social Nossa Senhora de Fátima e a Feira das Profissões.";
const URL = `${SITE_URL}/parceiros`;

export const Route = createFileRoute("/parceiros")({
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
  component: ParceirosPage,
});

function ParceirosPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Parceiros"
        title="Quem caminha junto com o Instituto"
        description={`${PARTNERS.length} organizações apoiam nossos cursos, estágios e a realização da Feira das Profissões.`}
        showEventMeta={false}
        showCta={false}
      />

      <PartnersSection />

      <Section id="seja-parceiro" tone="default">
        <SurfaceCard className="flex flex-col gap-4 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Parcerias"
              title="Sua organização quer apoiar a feira?"
              description="Fale com a organização para conhecer formas de apoiar a formação gratuita de jovens e adultos."
              level={2}
            />
          </div>
          <Button asChild size="lg" className="rounded-full px-8 font-semibold">
            <Link to="/contato">Fale com a organização</Link>
          </Button>
        </SurfaceCard>
      </Section>
    </SiteLayout>
  );
}
