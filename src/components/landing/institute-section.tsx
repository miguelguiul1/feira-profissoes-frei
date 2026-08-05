import { Building2, Laptop, Projector } from "lucide-react";
import { MediaPlaceholder } from "./media-placeholder";

const STRUCTURE = [
  {
    icon: Building2,
    title: "Salas estruturadas",
    text: "Ambientes preparados para aulas teóricas e práticas com conforto e segurança.",
  },
  {
    icon: Laptop,
    title: "Laboratórios de Informática",
    text: "Computadores atualizados para programação, redes e criação de sites.",
  },
  {
    icon: Projector,
    title: "Auditório para uso",
    text: "Espaço para palestras, apresentações e encontros com a comunidade.",
  },
];

export function InstituteSection() {
  return (
    <section className="bg-background py-16 lg:py-24" aria-labelledby="instituto-titulo">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2
            id="instituto-titulo"
            className="font-display text-3xl font-extrabold text-primary sm:text-4xl"
          >
            O nosso Instituto
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">Muito mais que uma escola</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-card p-7 shadow-soft ring-1 ring-border">
            <h3 className="font-display text-xl font-bold text-primary">
              Mais de 50 anos formando gerações
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              O Instituto Social Nossa Senhora de Fátima foi fundado em 1971 pelo Frei Xavier, com a
              missão de oferecer formação profissional gratuita e de qualidade a jovens da região
              sul de São Paulo. Desde então, milhares de alunos passaram pelas nossas salas e hoje
              atuam em empresas de tecnologia, indústria, administração e serviços.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              A cada edição da Feira das Profissões, abrimos as portas do Instituto para que a
              comunidade conheça de perto os cursos, os professores e os projetos desenvolvidos
              pelos estudantes.
            </p>
          </article>

          <article className="grid gap-6 rounded-3xl bg-brand-soft p-7 shadow-soft sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <MediaPlaceholder
              label="Foto do Frei Xavier"
              className="h-32 w-32 shrink-0 rounded-2xl bg-background"
            />
            <div className="min-w-0">
              <blockquote className="text-sm leading-relaxed text-foreground/85 italic">
                “Educar é acreditar que cada jovem pode escrever uma história diferente.”
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-primary">
                Ambrogio Fornasieiro, OFM / Frei Xavier
                <span className="block font-normal text-muted-foreground">
                  Idealizador do Instituto (1930 – 2026)
                </span>
              </p>
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {STRUCTURE.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-3xl bg-card p-7 shadow-soft ring-1 ring-border transition-shadow hover:shadow-card"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-tint text-primary">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
