import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading, SurfaceCard } from "@/components/site/section";
import { InscriptionSection } from "@/components/landing/inscription-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQ_ITEMS, SITE_URL } from "@/lib/site-data";

const TITLE = "Inscrição gratuita | 6ª Feira das Profissões FREI";
const DESCRIPTION =
  "Faça sua inscrição gratuita na 6ª Feira das Profissões do Instituto Social Nossa Senhora de Fátima. Leva menos de um minuto e garante seu certificado de participação.";
const URL = `${SITE_URL}/inscricao`;

export const Route = createFileRoute("/inscricao")({
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
  component: InscricaoPage,
});

function InscricaoPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Inscrição"
        title="Garanta o seu lugar na feira"
        description="Inscrição gratuita e sem burocracia. Você recebe a confirmação na tela e é só aparecer no dia."
        showCta={false}
      />

      <InscriptionSection />

      <Section tone="default" labelledBy="inscricao-duvidas">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <SectionHeading
              id="inscricao-duvidas"
              eyebrow="Antes de enviar"
              title="Dúvidas sobre a inscrição"
            />
            <Accordion type="single" collapsible className="mt-6 w-full">
              {FAQ_ITEMS.slice(0, 4).map((item, index) => (
                <AccordionItem key={item.question} value={`insc-faq-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <SurfaceCard>
            <h2 className="font-display text-lg font-bold text-primary">Precisa de ajuda?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A secretaria também faz a inscrição por WhatsApp ou telefone.
            </p>
            <Button asChild className="mt-5 w-full rounded-full font-semibold">
              <Link to="/contato">Falar com a secretaria</Link>
            </Button>
          </SurfaceCard>
        </div>
      </Section>
    </SiteLayout>
  );
}
