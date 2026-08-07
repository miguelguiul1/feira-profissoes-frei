import { createFileRoute, Link } from "@tanstack/react-router";
import { Lightbulb, Presentation } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading, SurfaceCard } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COURSES, SITE_URL } from "@/lib/site-data";

const TITLE = "Mostras dos cursos | 6ª Feira das Profissões FREI";
const DESCRIPTION = "Conheça as mostras práticas preparadas pelos cursos do Instituto Social Nossa Senhora de Fátima para a Feira das Profissões.";
const URL = `${SITE_URL}/expositores`;

const SHOWCASES: Record<string, string> = {
  "informatica": "Criação de uma página web e demonstração de segurança digital.",
  "administracao": "Simulação de rotina administrativa e organização de um pequeno negócio.",
  "comunicacao-visual": "Criação ao vivo de peças para uma campanha de comunicação.",
  "eletromecanica": "Diagnóstico de sistemas elétricos e demonstração da bancada de oficina.",
  "automacao-robotica": "Robôs, sensores e soluções de automação residencial em funcionamento.",
  "ingles": "Atividade de conversação e desafios de inglês para o mercado de trabalho.",
  "informatica-basica-excel": "Planilhas inteligentes, gráficos e recursos do Excel avançado.",
  "eletricista-instalador": "Montagem orientada de circuitos e práticas de segurança elétrica.",
};

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
  component: MostrasPage,
});

function MostrasPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Mostras dos cursos"
        title="Veja os cursos em ação na feira"
        description="Cada formação prepara uma demonstração prática para você conhecer de perto as ferramentas, projetos e possibilidades de carreira."
        showEventMeta={false}
      />

      <Section tone="default" labelledBy="mostras-titulo">
        <SectionHeading id="mostras-titulo" title="O que cada curso vai apresentar" description="Roteiro ilustrativo para a feira — as atividades finais serão confirmadas pela coordenação." />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => (
            <li key={course.slug}>
              <SurfaceCard interactive className="flex h-full flex-col overflow-hidden p-0">
                <img src={course.image} alt={`Mostra do ${course.title}`} loading="lazy" className="aspect-[16/9] w-full object-cover object-center" />
                <div className="flex flex-1 flex-col p-6">
                  <Badge variant="secondary" className="w-fit rounded-full">Mostra prática</Badge>
                  <h2 className="mt-4 font-display text-lg font-bold text-primary">{course.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{SHOWCASES[course.slug]}</p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"><Lightbulb className="h-4 w-4" aria-hidden="true" />Tema: {course.topics[0]}</p>
                </div>
              </SurfaceCard>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft">
        <SurfaceCard className="flex flex-col gap-4 bg-brand p-8 text-primary-foreground ring-0 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0"><h2 className="font-display text-2xl font-extrabold">Quer escolher uma área para conhecer melhor?</h2><p className="mt-2 text-sm text-primary-foreground/85">Confira a carga horária, duração e os temas de cada formação.</p></div>
          <Button asChild size="lg" variant="secondary" className="rounded-full px-8 font-semibold"><Link to="/cursos"><Presentation className="h-4 w-4" aria-hidden="true" />Ver todos os cursos</Link></Button>
        </SurfaceCard>
      </Section>
    </SiteLayout>
  );
}
