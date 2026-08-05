import { Monitor, UserCog, Palette, Wrench, Bot, Ticket, CalendarDays, MapPin } from "lucide-react";

const SCHEDULE = [
  {
    icon: Monitor,
    area: "Informática",
    rooms: [
      { room: "Sala 25", topics: "Cibersegurança, Redes" },
      { room: "Sala 26", topics: "Desenvolvimento de Software, Banco de Dados" },
    ],
  },
  {
    icon: UserCog,
    area: "Administração",
    rooms: [{ room: "Sala 27", topics: "Logística, Legislação" }],
  },
  {
    icon: Palette,
    area: "Comunicação Visual",
    rooms: [{ room: "Sala 24", topics: "CorelDraw, Photoshop, Caricaturas" }],
  },
  {
    icon: Wrench,
    area: "Eletromecânica de Autos",
    rooms: [{ room: "Sala 3", topics: "Estrutura de automóveis, engrenagens" }],
  },
  {
    icon: Bot,
    area: "Robótica",
    rooms: [{ room: "Sala 2", topics: "Sistemas elétricos de robótica" }],
  },
];

const BADGES = [
  { icon: Ticket, text: "Evento Gratuito" },
  { icon: CalendarDays, text: "19 de Setembro de 2026, das 9h às 16h" },
  {
    icon: MapPin,
    text: "Av. Cel. Octaviano de Freitas Costa, 463 — Veleiros, São Paulo/SP, 04773-000",
  },
];

const MAP_SRC =
  "https://www.google.com/maps?q=Av.+Cel.+Octaviano+de+Freitas+Costa,+463+-+Veleiros,+S%C3%A3o+Paulo+-+SP,+04773-000&output=embed";

export function ScheduleSection() {
  return (
    <section
      id="programacao"
      className="bg-surface py-16 lg:py-24"
      aria-labelledby="programacao-titulo"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2
          id="programacao-titulo"
          className="font-display text-3xl font-extrabold text-primary sm:text-4xl"
        >
          Programação da Feira
        </h2>
        <p className="mt-2 text-muted-foreground">
          Percorra as salas e conheça cada área de formação.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <ol className="relative space-y-6 border-l-2 border-brand-tint pl-6">
            {SCHEDULE.map(({ icon: Icon, area, rooms }) => (
              <li key={area} className="relative">
                <span className="absolute top-1 -left-[2.35rem] inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div className="rounded-3xl bg-card p-5 shadow-soft ring-1 ring-border">
                  <h3 className="font-display text-lg font-bold text-primary">{area}</h3>
                  <ul className="mt-3 space-y-2">
                    {rooms.map((entry) => (
                      <li
                        key={entry.room}
                        className="grid grid-cols-[minmax(0,1fr)] gap-1 rounded-2xl bg-brand-soft px-4 py-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-3"
                      >
                        <span className="shrink-0 text-xs font-bold tracking-wide text-primary uppercase">
                          {entry.room}
                        </span>
                        <span className="min-w-0 text-sm text-foreground/80">{entry.topics}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <div id="contato" className="rounded-3xl bg-card p-5 shadow-card ring-1 ring-border sm:p-7">
            <h3 className="font-display text-xl font-bold text-primary">
              Como chegar na 6ª Feira das Profissões?
            </h3>
            <div className="mt-5 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Mapa com a localização do Instituto Social Nossa Senhora de Fátima"
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0 sm:h-96"
              />
            </div>
            <ul className="mt-5 space-y-3">
              {BADGES.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 rounded-2xl bg-brand-soft px-4 py-3 text-sm font-medium text-primary"
                >
                  <Icon className="mt-0.5 h-4.5 w-4.5 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
