import { createFileRoute } from "@tanstack/react-router";
import { QrCode } from "lucide-react";

export const Route = createFileRoute("/credencial/$code")({
  head: () => ({
    meta: [
      { title: "Credencial do visitante | 6ª Feira das Profissões FREI" },
      {
        name: "description",
        content:
          "Página de credencial da 6ª Feira das Profissões do Instituto Social Nossa Senhora de Fátima.",
      },
      { property: "og:title", content: "Credencial | 6ª Feira das Profissões FREI" },
      {
        property: "og:description",
        content: "Apresente o QR Code da sua credencial na entrada da Feira.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CredentialPage,
});

function CredentialPage() {
  const { code } = Route.useParams();

  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-card p-8 text-center shadow-soft ring-1 ring-border">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-tint text-primary">
          <QrCode className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-primary">
          Credencial da 6ª Feira das Profissões
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Este é o identificador da sua inscrição. Apresente o QR Code da sua credencial na entrada
          da Feira para o credenciamento.
        </p>
        <p className="mt-6 font-mono text-xs break-all text-foreground">{code}</p>
      </div>
    </main>
  );
}
