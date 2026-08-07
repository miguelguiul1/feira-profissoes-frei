import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PARTNERS } from "./partners";
import feira1 from "@/assets/Nova pasta/Nossa última feira.png";
import feira2 from "@/assets/Nova pasta/Nossa última feiraNossa última feira.png";
import feira3 from "@/assets/Nova pasta/Nossa última feiraNossa última feiraNossa última feira.png";
import feira4 from "@/assets/Nova pasta/Nossa última feiraNossa última feiraNossa última feiraNossa última feira.png";
import feira5 from "@/assets/Nova pasta/Nossa última feiraNossa última feiraNossa última feiraNossa última feiraNossa última feira.png";
import feira6 from "@/assets/Nova pasta/Nossa última feiraNossa última feiraNossa última feiraNossa última feiraNossa última feiraNossa última feira.png";

const GALLERY = [
  { src: feira1, alt: "Momento da última Feira das Profissões" },
  { src: feira2, alt: "Visitantes conhecendo a Feira das Profissões" },
  { src: feira3, alt: "Atividade da última Feira das Profissões" },
  { src: feira4, alt: "Participantes da Feira das Profissões" },
  { src: feira5, alt: "Expositores e visitantes na Feira das Profissões" },
  { src: feira6, alt: "Registro da última Feira das Profissões" },
];

export function PartnersSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const updateControls = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateControls);
    emblaApi.on("reInit", updateControls);
    updateControls();
    return () => {
      emblaApi.off("select", updateControls);
      emblaApi.off("reInit", updateControls);
    };
  }, [emblaApi, updateControls]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), 3200);
    return () => window.clearInterval(timer);
  }, [emblaApi]);

  return (
    <section id="parceiros" className="bg-brand py-16 lg:py-24" aria-labelledby="parceiros-titulo">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div id="galeria" className="scroll-mt-24 text-center">
          <h2 className="font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl">Nossa última Feira</h2>
          <p className="mt-2 text-primary-foreground/80">Momentos registrados na edição anterior da Feira das Profissões.</p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item) => (
            <li key={item.src} className="group overflow-hidden rounded-2xl bg-background p-3 shadow-card">
              <img src={item.src} alt={item.alt} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]" />
            </li>
          ))}
        </ul>

        <div id="parceiros-lista" className="mt-16 flex scroll-mt-24 flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="parceiros-titulo" className="font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl">Nossos Parceiros</h2>
            <p className="mt-2 text-primary-foreground/80">Deslize para conhecer todas as empresas e instituições parceiras.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="Parceiros anteriores" disabled={!canPrev} onClick={() => emblaApi?.scrollPrev()} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/35 text-primary-foreground transition-colors hover:bg-primary-foreground/10 disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft className="h-4 w-4" /></button>
            <button type="button" aria-label="Próximos parceiros" disabled={!canNext} onClick={() => emblaApi?.scrollNext()} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/35 text-primary-foreground transition-colors hover:bg-primary-foreground/10 disabled:cursor-not-allowed disabled:opacity-40"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <ul className="flex">
            {PARTNERS.map((partner) => (
              <li key={partner.name} className="mr-5 flex h-20 min-w-0 flex-[0_0_80px] items-center justify-center rounded-2xl bg-background p-2.5 shadow-card sm:h-24 sm:flex-[0_0_96px] sm:p-3 lg:h-26 lg:flex-[0_0_104px]">
                <img src={partner.logo} alt={`Logo ${partner.name}`} loading="lazy" className="max-h-14 max-w-[60px] object-contain sm:max-h-16 sm:max-w-[72px]" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
