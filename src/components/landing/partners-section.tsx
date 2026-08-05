import { MediaPlaceholder } from "./media-placeholder";

const PARTNERS = ["BTG Pactual", "Banco Safra", "Aeroporto de Congonhas", "Aeroporto de Guarulhos"];

export function PartnersSection() {
  return (
    <section className="bg-background py-16 lg:py-24" aria-labelledby="parceiros-titulo">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2
            id="parceiros-titulo"
            className="font-display text-3xl font-extrabold text-primary sm:text-4xl"
          >
            Empresas parceiras
          </h2>
          <p className="mt-2 text-muted-foreground">
            Organizações que apoiam a formação dos nossos alunos.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERS.map((partner) => (
            <li
              key={partner}
              className="flex flex-col items-center gap-4 rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border"
            >
              <MediaPlaceholder label={`Logo ${partner}`} className="aspect-[3/2] w-full" />
              <span className="text-sm font-semibold text-primary">{partner}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
