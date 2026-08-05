import { MediaPlaceholder } from "./media-placeholder";
import { PARTNERS } from "./partners";
import roboticaAlunos from "@/assets/robotica-alunos-2.png.asset.json";
import equipeInstituto from "@/assets/equipe-instituto.jpg.asset.json";
import alunosTurma from "@/assets/alunos-turma.jpg.asset.json";
import fachadaInstituto from "@/assets/fachada-instituto.jpg.asset.json";
import cursoEletromecanica from "@/assets/curso-eletromecanica.png.asset.json";

const GALLERY = [
  { src: roboticaAlunos.url, alt: "Alunos apresentando projetos de robótica na feira" },
  { src: equipeInstituto.url, alt: "Equipe do Instituto reunida no auditório" },
  { src: alunosTurma.url, alt: "Turma de alunos do Instituto" },
  { src: cursoEletromecanica.url, alt: "Aluno na bancada de eletromecânica de autos" },
  { src: fachadaInstituto.url, alt: "Fachada do Instituto Social Nossa Senhora de Fátima" },
];

export function PartnersSection() {
  return (
    <section id="parceiros" className="bg-brand py-16 lg:py-24" aria-labelledby="parceiros-titulo">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div id="galeria" className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl">
            Nossa última Feira
          </h2>
          <p className="mt-2 text-primary-foreground/80">
            Momentos registrados na edição anterior da Feira das Profissões.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item) => (
            <li key={item.src} className="rounded-2xl bg-background p-3 shadow-card">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
            </li>
          ))}
        </ul>

        <div className="mt-16 text-center">
          <h2
            id="parceiros-titulo"
            className="font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl"
          >
            Nossos Parceiros
          </h2>
          <p className="mt-2 text-primary-foreground/80">
            Empresas e instituições que caminham com o Frei.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((partner) => (
            <li
              key={partner.name}
              className="flex flex-col items-center gap-4 rounded-full bg-background px-8 py-7 shadow-card"
            >
              {partner.logo ? (
                <div className="flex h-20 w-full items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : (
                <MediaPlaceholder label={`Logo ${partner.name}`} className="h-20 w-full" />
              )}
              <span className="text-center text-sm font-semibold text-primary">{partner.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
