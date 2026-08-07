import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "muted" | "soft" | "brand" | "gradient";

const TONE: Record<Tone, string> = {
  default: "bg-background/95",
  muted: "bg-linear-to-b from-muted to-background",
  soft: "bg-linear-to-b from-brand-soft via-background to-brand-soft",
  brand: "bg-brand text-primary-foreground",
  gradient: "relative overflow-hidden bg-linear-to-b from-background via-brand-soft to-background",
};

/** Faixa de seção padrão: espaçamento, largura máxima e tom de fundo consistentes. */
export function Section({
  children,
  className,
  tone = "default",
  id,
  labelledBy,
  as: As = "section",
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
  labelledBy?: string;
  as?: "section" | "div";
}) {
  return (
    <As id={id} aria-labelledby={labelledBy} className={cn("py-14 lg:py-20", TONE[tone], className)}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">{children}</div>
    </As>
  );
}

/** Cabeçalho de seção: eyebrow + título + descrição, com hierarquia consistente. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
  level = 2,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
  level?: 1 | 2 | 3;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-bold tracking-[0.18em] uppercase",
            inverted ? "text-primary-foreground/80" : "text-primary/70",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className={cn(
          "font-display font-extrabold text-balance",
          level === 1 ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl",
          eyebrow && "mt-2",
          inverted ? "text-primary-foreground" : "text-primary",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-3 text-base leading-relaxed text-pretty",
            inverted ? "text-primary-foreground/85" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Card base reutilizável com sombra e raio do design system. */
export function SurfaceCard({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-card/95 p-6 shadow-soft ring-1 ring-border/60 backdrop-blur-sm",
        interactive &&
          "transition-transform duration-200 hover:-translate-y-1 hover:shadow-card motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Badge em formato pílula, variação clara ou sobre fundo azul. */
export function PillBadge({
  children,
  className,
  inverted = false,
}: {
  children: ReactNode;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold",
        inverted
          ? "bg-primary-foreground/15 text-primary-foreground"
          : "bg-brand-tint text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
