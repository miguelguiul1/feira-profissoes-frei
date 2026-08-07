import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/Nova pasta/Carrossel do inicio.png";
import exAlunoRicardo from "@/assets/Nova pasta/Carrossel do inicioCarrossel do inicio.png";
import { PARTNERS } from "./partners";
import { cn } from "@/lib/utils";


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
    <section id="inicio" className="relative overflow-hidden bg-linear-to-b from-brand-soft via-surface to-background pb-10" aria-label="Destaques da feira">
      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
          <div className="flex">
            {/* Slide 1 */}
            <div className="min-w-0 flex-[0_0_100%]">
              <div className="relative grid min-h-[450px] items-center gap-8 overflow-hidden rounded-4xl bg-brand-soft p-6 shadow-card ring-1 ring-primary/10 sm:p-10 lg:min-h-[470px] lg:grid-cols-2 lg:p-14">
                <div className="absolute inset-y-0 right-0 hidden w-3/5 bg-linear-to-l from-background/30 via-background/5 to-transparent lg:block" aria-hidden="true" />
                <div className="relative z-10">
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
                    <Button asChild size="lg" className="rounded-full px-7 font-semibold">
                      <Link to="/inscricao">Fazer Inscrição</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full border-primary bg-background px-7 font-semibold text-primary hover:bg-accent">
                      <Link to="/programacao">Programação</Link>
                    </Button>
                  </div>
                </div>
                <img
                  src={heroImage}
                  alt="Alunos do Instituto apresentando projetos de robótica"
                  className="relative z-10 aspect-[3/2] w-full rounded-3xl object-cover object-center shadow-card ring-4 ring-background/65"
                />

              </div>
            </div>

            {/* Slide 2 */}
            <div className="min-w-0 flex-[0_0_100%]">
              <div className="flex min-h-[450px] flex-col justify-center rounded-4xl bg-linear-to-br from-brand to-brand-deep p-6 shadow-card ring-1 ring-primary-foreground/15 sm:p-10 lg:min-h-[470px] lg:p-14">
                <h2 className="font-display text-2xl font-extrabold text-primary-foreground sm:text-3xl">
                  Nossos Parceiros
                </h2>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Empresas e instituições que caminham com o Frei.
                </p>
                <div className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {PARTNERS.slice(0, 6).map((partner) => (
                    <div key={partner.name} className="mx-auto flex aspect-square w-full max-w-[92px] items-center justify-center rounded-2xl bg-background p-3 shadow-soft">
                      <img src={partner.logo} alt={`Logo ${partner.name}`} loading="lazy" className="max-h-full max-w-full object-contain" />
                    </div>
                  ))}
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  className="mt-7 w-fit self-center rounded-full border-primary-foreground/60 bg-transparent px-7 font-semibold text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
                  onClick={() => scrollToId("#parceiros-lista")}
                >
                  Lista completa
                </Button>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="min-w-0 flex-[0_0_100%]">
              <div className="flex min-h-[450px] flex-col justify-center rounded-4xl bg-linear-to-br from-brand-soft via-background to-brand-tint p-6 shadow-card ring-1 ring-primary/10 sm:p-10 lg:min-h-[470px] lg:p-14">
                <h2 className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
                  Depoimentos
                </h2>
                <div className="mx-auto mt-6 grid w-full max-w-4xl gap-6 rounded-3xl bg-background p-6 shadow-card sm:grid-cols-[auto_minmax(0,1fr)] sm:p-8 sm:items-center">
                  <img
                    src={exAlunoRicardo}
                    alt="Retrato de Ricardo Hessel de Araújo, ex-aluno do Instituto"
                    loading="lazy"
                    className="h-32 w-32 shrink-0 rounded-3xl bg-brand-tint object-cover object-top shadow-soft sm:h-36 sm:w-36"
                  />

                  <blockquote className="min-w-0">
                    <Quote className="h-6 w-6 text-primary" aria-hidden="true" />
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85 sm:text-base">
                      “Estudar aqui foi um divisor de águas na minha vida. A escola não só me deu
                      base técnica, mas contribuiu diretamente para a formação profissional e do
                      cidadão que sou hoje. Foi aqui que tive meu primeiro direcionamento e minha
                      primeira oportunidade no mercado de trabalho, que marcou o início da minha trajetória.”
                    </p>
                    <footer className="mt-5 text-sm font-semibold text-primary">
                      Ricardo Hessel de Araújo
                      <span className="block font-normal text-muted-foreground">
                        Ex-aluno de Informática, 2006 — Diretor Executivo no BTG Pactual
                      </span>
                    </footer>
                  </blockquote>
                </div>
                <Button
                  size="lg"
                  className="mt-7 w-fit self-center rounded-full px-7 font-semibold"
                  onClick={() => scrollToId("#depoimentos-titulo")}
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
