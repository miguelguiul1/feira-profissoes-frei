import {
  GraduationCap,
  FlaskConical,
  MessagesSquare,
  Handshake,
  Rocket,
  Target,
} from "lucide-react";
import equipeInstituto from "@/assets/equipe-instituto.jpg.asset.json";

const REASONS = [
  {
    icon: GraduationCap,
    title: "Conheça os cursos",
    text: "Explore as formações oferecidas pelo Instituto.",
  },
  {
    icon: FlaskConical,
    title: "Experimente na prática",
    text: "Veja projetos reais e demonstrações de robótica.",
  },
  {
    icon: MessagesSquare,
    title: "Converse com especialistas",
    text: "Tire dúvidas com professores e alunos.",
  },
  {
    icon: Handshake,
    title: "Crie conexões",
    text: "Networking com pessoas de tecnologia e inovação.",
  },
  {
    icon: Rocket,
    title: "Prepare seu futuro",
    text: "Oportunidades de aprendizado profissional.",
  },
  {
    icon: Target,
    title: "Descubra seu caminho",
    text: "Encontre a área que combina com os teus objetivos.",
  },
];

export function ReasonsSection() {
  return (
    <section className="bg-linear-to-b from-background to-brand-tint py-16 lg:py-24" aria-labelledby="motivos-titulo">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2
          id="motivos-titulo"
          className="text-center font-display text-3xl font-extrabold text-primary sm:text-4xl"
        >
          Por que participar da Feira?
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, text }) => (
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

        <div className="mt-12 grid items-center gap-8 rounded-4xl bg-brand-tint p-8 shadow-card sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
              Tradição que atravessa gerações!
            </h3>
            <p className="mt-3 text-base text-foreground/80">
              55 anos de inúmeras histórias de sucesso!
            </p>
          </div>
          <img
            src={equipeInstituto.url}
            alt="Equipe e alunos do Instituto reunidos no auditório"
            loading="lazy"
            className="aspect-[16/9] w-full rounded-2xl object-cover shadow-soft"
          />

        </div>
      </div>
    </section>
  );
}
