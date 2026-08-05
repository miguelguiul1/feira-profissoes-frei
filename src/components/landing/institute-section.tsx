import { Building2, Laptop, Projector } from "lucide-react";
import freiXavier from "@/assets/frei-xavier.jpg.asset.json";
import fachadaInstituto from "@/assets/fachada-instituto.jpg.asset.json";

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
    <section
      className="relative overflow-hidden bg-linear-to-b from-brand-soft via-brand-tint to-secondary py-16 lg:py-24"
      aria-labelledby="instituto-titulo"
    >
      <img
        src={fachadaInstituto.url}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
      />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2
            id="instituto-titulo"
            className="font-display text-3xl font-extrabold text-primary sm:text-4xl"
          >
            O nosso Instituto
          </h2>
          <p className="mt-2 text-lg text-foreground/70">Muito mais que uma escola</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <article className="rounded-4xl bg-card p-7 shadow-card">
            <img
              src={fachadaInstituto.url}
              alt="Fachada do Instituto Social Nossa Senhora de Fátima"
              loading="lazy"
              className="aspect-[16/9] w-full rounded-3xl object-cover"
            />
            <h3 className="mt-5 font-display text-xl font-bold text-primary">
              Mais de 50 anos formando gerações
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              Há mais de 50 anos, o Instituto Social Nossa Senhora de Fátima transforma vidas por
              meio da educação. Fundado em 1971 pelo Frei Xavier, dedica-se à formação humana e
              profissional de jovens a partir dos 13 anos, oferecendo cursos técnicos, de
              qualificação e livres. Com compromisso, excelência e responsabilidade social,
              constrói oportunidades que fortalecem o desenvolvimento da juventude e da comunidade.
            </p>
          </article>

          <article className="grid content-center gap-6 rounded-4xl bg-background/55 p-7 shadow-soft ring-1 ring-primary/10 backdrop-blur-md sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <img
              src={freiXavier.url}
              alt="Frei Xavier, idealizador do Instituto"
              loading="lazy"
              className="h-32 w-32 shrink-0 rounded-3xl object-cover"
            />
            <div className="min-w-0">
              <blockquote className="text-sm leading-relaxed text-foreground/85 italic">
                “Educar é acreditar que cada jovem pode escrever uma história diferente.”
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-primary">
                Ambrogio Fornasieiro, OFM / Frei Xavier
                <span className="block font-normal text-foreground/70">(1930 – 2026)</span>
                <span className="mt-2 block font-normal text-foreground/70">
                  Idealizador do Instituto Social Nossa Senhora de Fátima e da Paróquia Santa Rita
                  de Cássia.
                </span>
              </p>
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {STRUCTURE.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-4xl bg-card p-7 shadow-soft transition-shadow hover:shadow-card"
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
