import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, GraduationCap } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading, SurfaceCard } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { CERTIFICATIONS, COURSES, SITE_URL } from "@/lib/site-data";

const TITLE = "Cursos gratuitos | 6ª Feira das Profissões FREI";
const DESCRIPTION =
  "Conheça os oito cursos técnicos, de qualificação e livres gratuitos do Instituto Social Nossa Senhora de Fátima.";
const URL = `${SITE_URL}/cursos`;

export const Route = createFileRoute("/cursos")({
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
  component: CursosPage,
});

function CursosPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Cursos"
        title="Formação gratuita que abre portas"
        description="Oito cursos com carga horária robusta, aulas práticas e certificado. Todos gratuitos e abertos à comunidade."
        showEventMeta={false}
      />

      <Section tone="default" labelledBy="cursos-lista-titulo">
        <SectionHeading
          id="cursos-lista-titulo"
          title="Nossos cursos"
          description="Conheça o conteúdo de cada formação e converse com os professores durante a feira."
        />
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {COURSES.map((course) => (
            <li key={course.slug}>
              <SurfaceCard interactive className="flex h-full flex-col p-0">
                <img
                  src={course.image}
                  alt={`Alunos no ${course.title}`}
                  loading="lazy"
                  className="aspect-[16/9] w-full rounded-t-3xl object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-primary">{course.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {course.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm text-foreground/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <span className="min-w-0">{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-3 py-1.5 text-primary">
                      <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                      <dt className="sr-only">Carga horária</dt>
                      <dd>{course.hours}</dd>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-primary">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <dt className="sr-only">Duração</dt>
                      <dd>{course.duration}</dd>
                    </div>
                  </dl>
                </div>
              </SurfaceCard>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="gradient" labelledBy="certificacoes-titulo">
        <SectionHeading
          id="certificacoes-titulo"
          eyebrow="Certificações"
          title="Reconhecimento e credibilidade"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {CERTIFICATIONS.map((item) => (
            <li key={item}>
              <SurfaceCard className="flex h-full items-start gap-3 p-5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0 text-sm text-foreground/85">{item}</span>
              </SurfaceCard>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button asChild size="lg" className="rounded-full px-8 font-semibold">
            <Link to="/inscricao">Quero conhecer os cursos na feira</Link>
          </Button>
        </div>
      </Section>
    </SiteLayout>
  );
}
