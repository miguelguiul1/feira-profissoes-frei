import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { CheckCircle2, Loader2, QrCode, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { listInscriptions, setInscriptionCheckIn } from "@/lib/inscriptions.functions";

export const Route = createFileRoute("/_authenticated/admin/credenciamento")({
  head: () => ({
    meta: [
      { title: "Credenciamento | Painel FREI" },
      {
        name: "description",
        content: "Credenciamento manual dos visitantes da 6ª Feira das Profissões.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CredentialingPage,
});

function CredentialingPage() {
  const queryClient = useQueryClient();
  const fetchInscriptions = useServerFn(listInscriptions);
  const checkIn = useServerFn(setInscriptionCheckIn);
  const [term, setTerm] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["inscriptions"],
    queryFn: () => fetchInscriptions(),
  });

  const mutation = useMutation({
    mutationFn: (id: string) => checkIn({ data: { id, checked_in: true } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inscriptions"] });
      toast.success("Visitante credenciado com sucesso.");
    },
    onError: () => toast.error("Não foi possível credenciar o visitante."),
  });

  const results = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return [];
    return (data ?? [])
      .filter((row) =>
        [row.full_name, row.email, row.phone, row.credential_code].some((value) =>
          value.toLowerCase().includes(q),
        ),
      )
      .slice(0, 12);
  }, [data, term]);

  const checkedIn = (data ?? []).filter((row) => row.checked_in_at).length;

  return (
    <>
      <div className="rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-tint text-primary">
          <QrCode className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-display text-lg font-extrabold text-primary">Credenciamento</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Busque o visitante pelo nome, e-mail, telefone ou código de credenciamento e confirme a
          entrada. A leitura por QR Code e câmera será ativada na próxima etapa — cada inscrito já
          possui um código único reservado para isso.
        </p>
        <p className="mt-4 text-sm font-semibold text-primary">
          {checkedIn} de {data?.length ?? 0} visitantes credenciados
        </p>
      </div>

      <div className="relative mt-6">
        <Search
          className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Buscar visitante para credenciar"
          className="pl-9"
          aria-label="Buscar visitante para credenciar"
        />
      </div>

      <div className="mt-4 space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 p-8 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Carregando visitantes...
          </div>
        ) : !term.trim() ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Digite algo para localizar o visitante.
          </p>
        ) : results.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Nenhum visitante encontrado.
          </p>
        ) : (
          results.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-primary">{row.full_name}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {row.email} · {row.phone}
                </p>
              </div>
              {row.checked_in_at ? (
                <Badge className="rounded-full">
                  Credenciado às {new Date(row.checked_in_at).toLocaleTimeString("pt-BR")}
                </Badge>
              ) : (
                <Button
                  className="rounded-full"
                  disabled={mutation.isPending}
                  onClick={() => mutation.mutate(row.id)}
                >
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Credenciar
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
