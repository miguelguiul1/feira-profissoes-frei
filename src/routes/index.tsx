import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { Section, SectionHeading, SurfaceCard } from "@/components/site/section";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { CoursesSection } from "@/components/landing/courses-section";
import { ReasonsSection } from "@/components/landing/reasons-section";
import { PartnersSection } from "@/components/landing/partners-section";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EVENT, FAQ_ITEMS, FULL_ADDRESS, SITE_URL, STATS, TESTIMONIALS } from "@/lib/site-data";

const TITLE = "6ª Feira das Profissões FREI | Instituto Social Nossa Senhora de Fátima";
const DESCRIPTION =
  "Participe da 6ª Feira das Profissões do Instituto Social Nossa Senhora de Fátima em 19/09/2026. Evento gratuito com cursos técnicos, palestras, oficinas e empresas parceiras em São Paulo.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: EVENT.organizer,
              url: SITE_URL,
              telephone: EVENT.phoneOffice,
              sameAs: [EVENT.instagram],
              address: {
                "@type": "PostalAddress",
                streetAddress: EVENT.address.street,
                addressLocality: EVENT.address.city,
                addressRegion: EVENT.address.state,
                postalCode: EVENT.address.zip,
                addressCountry: "BR",
              },
            },
            {
              "@type": "Event",
              name: EVENT.name,
              startDate: EVENT.startDate,
              endDate: EVENT.endDate,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              description: DESCRIPTION,
              url: SITE_URL,
              organizer: { "@type": "Organization", name: EVENT.organizer, url: SITE_URL },
              location: {
                "@type": "Place",
                name: EVENT.organizer,
                address: FULL_ADDRESS,
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
                availability: "https://schema.org/InStock",
                url: `${SITE_URL}/inscricao`,
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <HeroCarousel />

      <Section tone="default" labelledBy="numeros-titulo">
        <SectionHeading
          id="numeros-titulo"
          eyebrow="O Instituto em números"
          title="Tradição que atravessa gerações"
          description="Desde 1971 formando profissionais na zona sul de São Paulo, com ensino gratuito e de qualidade."
        />
        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <CoursesSection />
      <ReasonsSection />

      <Section tone="soft" labelledBy="depoimentos-titulo">
        <SectionHeading
          id="depoimentos-titulo"
          eyebrow="Prova social"
          title="Quem já viveu a feira"
          description="Depoimentos de ex-alunos, famílias e empresas parceiras que participam a cada edição."
        />
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <li key={item.name}>
              <SurfaceCard className="h-full">
                <Quote className="h-7 w-7 text-primary/40" aria-hidden="true" />
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85">
                  “{item.quote}”
                </blockquote>
                <p className="mt-5 font-display text-sm font-bold text-primary">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </SurfaceCard>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="default" labelledBy="faq-home-titulo">
        <SectionHeading
          id="faq-home-titulo"
          eyebrow="Antes de se inscrever"
          title="Perguntas frequentes"
          description="As dúvidas mais comuns de quem vai visitar a feira pela primeira vez."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.slice(0, 4).map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <SurfaceCard className="bg-brand text-primary-foreground ring-0">
            <h3 className="font-display text-xl font-bold">Ainda tem dúvidas?</h3>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Veja todas as respostas ou fale direto com a nossa secretaria.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Button asChild variant="secondary" className="rounded-full font-semibold">
                <Link to="/faq">
                  Ver FAQ completo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary-foreground/40 bg-transparent font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/contato">Falar com a secretaria</Link>
              </Button>
            </div>
          </SurfaceCard>
        </div>
      </Section>

      <PartnersSection />

      <Section tone="soft" className="text-center">
        <SectionHeading
          align="center"
          title="Garanta o seu lugar na 6ª Feira das Profissões"
          description={`Inscrição gratuita em menos de um minuto. ${EVENT.dateLabel}, ${EVENT.timeLabel}.`}
        />
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-8 font-semibold">
            <Link to="/inscricao">Fazer inscrição gratuita</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-primary/30 px-8 font-semibold text-primary"
          >
            <Link to="/programacao">Ver programação completa</Link>
          </Button>
        </div>
      </Section>
    </SiteLayout>
  );
}
