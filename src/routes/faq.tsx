import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading, SurfaceCard } from "@/components/site/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQ_ITEMS, SITE_URL } from "@/lib/site-data";

const TITLE = "Perguntas frequentes | 6ª Feira das Profissões FREI";
const DESCRIPTION =
  "Tire suas dúvidas sobre a 6ª Feira das Profissões: inscrição, gratuidade, idade mínima, matrículas, acessibilidade e como chegar.";
const URL = `${SITE_URL}/faq`;

export const Route = createFileRoute("/faq")({
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="FAQ"
        title="Perguntas frequentes"
        description="Tudo o que você precisa saber antes de visitar a 6ª Feira das Profissões."
        showEventMeta={false}
        showCta={false}
      />

      <Section tone="default" labelledBy="faq-titulo">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <SectionHeading id="faq-titulo" title="Dúvidas sobre o evento" />
            <Accordion type="single" collapsible className="mt-6 w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`}>
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

          <SurfaceCard className="bg-brand text-primary-foreground ring-0">
            <h2 className="font-display text-xl font-bold">Pronto para participar?</h2>
            <p className="mt-2 text-sm text-primary-foreground/85">
              A inscrição é gratuita, leva menos de um minuto e garante o seu certificado.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Button asChild variant="secondary" className="rounded-full font-semibold">
                <Link to="/inscricao">Fazer inscrição</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary-foreground/40 bg-transparent font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/contato">Ainda tenho dúvidas</Link>
              </Button>
            </div>
          </SurfaceCard>
        </div>
      </Section>
    </SiteLayout>
  );
}
