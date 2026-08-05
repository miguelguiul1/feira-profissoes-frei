import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { MediaPlaceholder } from "./media-placeholder";
import cursoInformatica from "@/assets/curso-informatica.jpg.asset.json";
import roboticaAlunos from "@/assets/robotica-alunos.jpg.asset.json";

const COURSES = [
  {
    title: "Curso Técnico de Informática",
    description: "TI, Programação e Criação de Sites.",
    hours: "1.000h",
    duration: "1 ano — segunda a sexta",
    image: cursoInformatica.url,
  },
  {
    title: "Curso Livre de Inglês Básico ao Pré-Intermediário",
    description: "Comunicação, Gramática e Conversação.",
    hours: "400h",
    duration: "1 ano superintensivo",
    image: null,
  },
  {
    title: "Eletromecânica de Autos",
    description: "Elétrica Automotiva, Mecânica e Diagnóstico.",
    hours: "880h",
    duration: "1 ano — segunda a sexta",
    image: roboticaAlunos.url,
  },
  {
    title: "Curso Técnico em Administração",
    description: "Estoques, RH, Logística, Marketing e Contabilidade.",
    hours: "1.000h",
    duration: "1 ano — segunda a sexta",
    image: null,
  },
];

export function CoursesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="cursos" className="bg-surface py-16 lg:py-24" aria-labelledby="cursos-titulo">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h2
              id="cursos-titulo"
              className="font-display text-3xl font-extrabold text-primary sm:text-4xl"
            >
              Nossos Cursos
            </h2>
            <p className="mt-2 text-muted-foreground">
              Formações gratuitas e profissionalizantes para transformar o seu futuro.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Curso anterior"
              disabled={!canPrev}
              onClick={() => emblaApi?.scrollPrev()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-primary transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Próximo curso"
              disabled={!canNext}
              onClick={() => emblaApi?.scrollNext()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-primary transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {COURSES.map((course) => (
              <article
                key={course.title}
                className="flex min-w-0 flex-[0_0_88%] flex-col rounded-3xl bg-card p-5 shadow-soft ring-1 ring-border sm:flex-[0_0_48%] lg:flex-[0_0_31%]"
              >
                {course.image ? (
                  <img
                    src={course.image}
                    alt={`Imagem do ${course.title}`}
                    loading="lazy"
                    className="aspect-[16/10] w-full rounded-2xl object-cover"
                  />
                ) : (
                  <MediaPlaceholder
                    label={`Foto do curso: ${course.title}`}
                    className="aspect-[16/10] w-full"
                  />
                )}

                <h3 className="mt-5 font-display text-lg leading-snug font-bold text-primary">
                  {course.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{course.description}</p>
                <dl className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-3 py-1.5 text-primary">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    <dt className="sr-only">Carga horária</dt>
                    <dd>{course.hours}</dd>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-primary">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    <dt className="sr-only">Duração</dt>
                    <dd>{course.duration}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
