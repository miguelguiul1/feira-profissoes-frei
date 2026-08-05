import { MediaPlaceholder } from "./media-placeholder";
import { PARTNERS } from "./partners";

export function PartnersSection() {
  return (
    <section
      id="parceiros"
      className="bg-background py-16 lg:py-24"
      aria-labelledby="parceiros-titulo"
    >
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

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((partner) => (
            <li
              key={partner.name}
              className="flex flex-col items-center gap-4 rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border"
            >
              {partner.logo ? (
                <div className="flex aspect-[3/2] w-full items-center justify-center p-2">
                  <img
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : (
                <MediaPlaceholder
                  label={`Logo ${partner.name}`}
                  className="aspect-[3/2] w-full"
                />
              )}
              <span className="text-center text-sm font-semibold text-primary">{partner.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
