import { createFileRoute } from "@tanstack/react-router";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading, SurfaceCard } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { EVENT, FULL_ADDRESS, SITE_URL } from "@/lib/site-data";

const TITLE = "Contato e como chegar | 6ª Feira das Profissões FREI";
const DESCRIPTION =
  "Fale com a secretaria do Instituto Social Nossa Senhora de Fátima por WhatsApp, telefone ou Instagram e veja como chegar à Feira das Profissões em Veleiros, São Paulo.";
const URL = `${SITE_URL}/contato`;

const MAP_SRC =
  "https://www.google.com/maps?q=Av.+Cel.+Octaviano+de+Freitas+Costa,+463+-+Veleiros,+S%C3%A3o+Paulo+-+SP,+04773-000&output=embed";

export const Route = createFileRoute("/contato")({
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
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contato"
        title="Fale com a organização da feira"
        description="Nossa secretaria responde dúvidas sobre inscrição, cursos, matrículas e participação de empresas."
        showEventMeta={false}
        showCta={false}
      />

      <Section tone="default" labelledBy="contato-titulo">
        <SectionHeading id="contato-titulo" title="Canais de atendimento" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <ul className="grid gap-4">
            <li>
              <SurfaceCard className="flex items-start gap-4 p-5">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold text-primary">WhatsApp</h3>
                  <a
                    href={`https://wa.me/${EVENT.phoneWhatsapp.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    (11) 96398-6252
                  </a>
                </div>
              </SurfaceCard>
            </li>
            <li>
              <SurfaceCard className="flex items-start gap-4 p-5">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold text-primary">Telefone</h3>
                  <a
                    href={`tel:${EVENT.phoneOffice}`}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    (11) 3798-5037
                  </a>
                </div>
              </SurfaceCard>
            </li>
            <li>
              <SurfaceCard className="flex items-start gap-4 p-5">
                <Instagram className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold text-primary">Instagram</h3>
                  <a
                    href={EVENT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    @institutonsfatima
                  </a>
                </div>
              </SurfaceCard>
            </li>
            <li>
              <SurfaceCard className="flex items-start gap-4 p-5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold text-primary">
                    Horário do evento
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {EVENT.dateLabel}, {EVENT.timeLabel}
                  </p>
                </div>
              </SurfaceCard>
            </li>
            <li>
              <SurfaceCard className="flex items-start gap-4 p-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold text-primary">Endereço</h3>
                  <p className="text-sm text-muted-foreground">{FULL_ADDRESS}</p>
                </div>
              </SurfaceCard>
            </li>
            <li>
              <SurfaceCard className="flex items-start gap-4 p-5">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold text-primary">
                    Empresas e imprensa
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Fale com a secretaria pelo WhatsApp para reservar estande ou agendar visita.
                  </p>
                </div>
              </SurfaceCard>
            </li>
          </ul>

          <div>
            <div className="overflow-hidden rounded-3xl shadow-card">
              <iframe
                title="Mapa com a localização do Instituto Social Nossa Senhora de Fátima"
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-96 w-full border-0 lg:h-[32rem]"
              />
            </div>
            <Button
              asChild
              size="lg"
              className="mt-5 w-full rounded-full font-semibold sm:w-auto sm:px-8"
            >
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Av.+Cel.+Octaviano+de+Freitas+Costa,+463+-+Veleiros,+S%C3%A3o+Paulo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Traçar rota até o Instituto
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
