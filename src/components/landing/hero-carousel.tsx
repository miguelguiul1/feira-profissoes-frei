import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "./media-placeholder";
import roboticaAlunos from "@/assets/robotica-alunos.jpg.asset.json";
import depoimentoRicardo from "@/assets/depoimento-ricardo.jpg.asset.json";
import { cn } from "@/lib/utils";

const PARTNERS = [
  "Viação Grajaú",
  "PWI Sistemas",
  "CM Comandos Lineares",
  "MWM",
  "Casa da Mulher Paulistana",
  "Cidade de São Paulo — Assistência Social",
];

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    const timer = window.setInterval(() => emblaApi.scrollNext(), 7000);
    return () => {
      window.clearInterval(timer);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="inicio" className="bg-surface pb-10" aria-label="Destaques da feira">
      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
          <div className="flex">
            {/* Slide 1 */}
            <div className="min-w-0 flex-[0_0_100%]">
              <div className="grid items-center gap-8 rounded-3xl bg-brand-soft p-6 shadow-card sm:p-10 lg:grid-cols-2 lg:p-14">
                <div>
                  <span className="inline-flex rounded-full bg-primary px-4 py-1.5 text-xs font-bold tracking-wide text-primary-foreground uppercase">
                    19 de setembro de 2026
                  </span>
                  <h1 className="mt-5 font-display text-3xl leading-tight font-extrabold text-primary sm:text-4xl lg:text-5xl">
                    Participe da 6ª Feira das Profissões do Frei
                  </h1>
                  <p className="mt-4 text-base text-foreground/80 sm:text-lg">
                    Descubra hoje a profissão do seu amanhã!
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button
                      size="lg"
                      className="rounded-full px-7 font-semibold"
                      onClick={() => scrollToId("#inscricao")}
                    >
                      Fazer Inscrição
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full border-primary bg-background px-7 font-semibold text-primary hover:bg-accent"
                      onClick={() => scrollToId("#programacao")}
                    >
                      Programação
                    </Button>
                  </div>
                </div>
                <MediaPlaceholder
                  label="Foto: alunos com projeto de robótica"
                  className="aspect-[4/3] w-full bg-background"
                />
              </div>
            </div>

            {/* Slide 2 */}
            <div className="min-w-0 flex-[0_0_100%]">
              <div className="rounded-3xl bg-gradient-to-br from-brand to-brand-deep p-6 shadow-card sm:p-10 lg:p-14">
                <h2 className="font-display text-2xl font-extrabold text-primary-foreground sm:text-3xl">
                  Nossos Parceiros
                </h2>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Empresas e instituições que caminham com o Frei.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {PARTNERS.map((partner) => (
                    <MediaPlaceholder
                      key={partner}
                      tone="dark"
                      label={partner}
                      className="h-20 rounded-xl"
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="mt-7 rounded-full border-primary-foreground/60 bg-transparent px-7 font-semibold text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
                  onClick={() => scrollToId("#parceiros")}
                >
                  Lista completa
                </Button>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="min-w-0 flex-[0_0_100%]">
              <div className="rounded-3xl bg-brand-tint p-6 shadow-card sm:p-10 lg:p-14">
                <h2 className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
                  Depoimentos
                </h2>
                <div className="mt-6 grid gap-6 rounded-2xl bg-background p-6 shadow-soft sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
                  <MediaPlaceholder
                    label="Foto do ex-aluno"
                    className="h-28 w-28 shrink-0 rounded-full"
                  />
                  <blockquote className="min-w-0">
                    <Quote className="h-6 w-6 text-primary" aria-hidden="true" />
                    <p className="mt-2 text-base text-foreground/85 italic">
                      “O Frei me deu a base técnica e humana que eu carrego até hoje. Foi ali que a
                      minha carreira começou.”
                    </p>
                    <footer className="mt-4 text-sm font-semibold text-primary">
                      Ricardo Hessel de Araújo
                      <span className="block font-normal text-muted-foreground">
                        Ex-aluno de Informática (2006) — Diretor Executivo no BTG Pactual
                      </span>
                    </footer>
                  </blockquote>
                </div>
                <Button
                  className="mt-7 rounded-full px-7 font-semibold"
                  onClick={() => scrollToId("#galeria")}
                >
                  Mais Depoimentos
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir para o slide ${index + 1}`}
              aria-current={selected === index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-2.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                selected === index ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-primary/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
