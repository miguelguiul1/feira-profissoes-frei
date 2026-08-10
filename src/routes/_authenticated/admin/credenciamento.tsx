import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  AlertTriangle,
  Camera,
  CameraOff,
  CheckCircle2,
  Loader2,
  QrCode,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QrScanner } from "@/components/admin/qr-scanner";
import { parseCredentialCode } from "@/lib/credential-qr";
import {
  findInscriptionByCredential,
  listInscriptions,
  setInscriptionCheckIn,
  type InscriptionRow,
} from "@/lib/inscriptions.functions";

export const Route = createFileRoute("/_authenticated/admin/credenciamento")({
  head: () => ({
    meta: [
      { title: "Credenciamento | Painel FREI" },
      {
        name: "description",
        content: "Credenciamento por QR Code e busca manual dos visitantes da 6ª Feira das Profissões.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CredentialingPage,
});

function CredentialingPage() {
  const queryClient = useQueryClient();
  const fetchInscriptions = useServerFn(listInscriptions);
  const findByCredential = useServerFn(findInscriptionByCredential);
  const checkIn = useServerFn(setInscriptionCheckIn);

  const [term, setTerm] = useState("");
  const [scanning, setScanning] = useState(false);
  const [selected, setSelected] = useState<InscriptionRow | null>(null);
  const [confirmDuplicate, setConfirmDuplicate] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookingUp, setLookingUp] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["inscriptions"],
    queryFn: () => fetchInscriptions(),
  });

  const mutation = useMutation({
    mutationFn: (id: string) => checkIn({ data: { id, checked_in: true } }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["inscriptions"] });
      setSelected((current) =>
        current ? { ...current, checked_in_at: result.checked_in_at } : current,
      );
      setConfirmDuplicate(false);
      toast.success("Visitante credenciado com sucesso.");
    },
    onError: () => toast.error("Não foi possível credenciar o visitante."),
  });

  const selectVisitor = (visitor: InscriptionRow) => {
    setSelected(visitor);
    setConfirmDuplicate(false);
    setLookupError(null);
    setScanning(false);
    setTerm("");
  };

  const handleScan = async (raw: string) => {
    if (lookingUp || selected) return;
    const code = parseCredentialCode(raw);
    if (!code) {
      setLookupError("QR Code inválido para esta Feira.");
      return;
    }
    setLookingUp(true);
    try {
      const row = await findByCredential({ data: { credential_code: code } });
      if (!row) {
        setLookupError("Nenhuma inscrição encontrada para este QR Code.");
        return;
      }
      selectVisitor(row);
    } catch {
      setLookupError("Não foi possível consultar o visitante.");
    } finally {
      setLookingUp(false);
    }
  };

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
  const alreadyCheckedIn = Boolean(selected?.checked_in_at);

  return (
    <>
      <div className="rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-tint text-primary">
          <QrCode className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-display text-lg font-extrabold text-primary">Credenciamento</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Escaneie o QR Code da credencial do visitante ou faça a busca manual. Os dados são
          exibidos para conferência antes de confirmar a entrada.
        </p>
        <p className="mt-4 text-sm font-semibold text-primary">
          {checkedIn} de {data?.length ?? 0} visitantes credenciados
        </p>
      </div>

      {selected ? (
        <div className="mt-6 rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-display text-xl font-extrabold break-words text-primary">
                {selected.full_name}
              </h3>
              <p className="text-sm text-muted-foreground">{selected.course_interest}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Fechar ficha do visitante"
              onClick={() => {
                setSelected(null);
                setConfirmDuplicate(false);
              }}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div className="rounded-2xl bg-surface p-3 ring-1 ring-border">
              <dt className="text-xs text-muted-foreground uppercase">E-mail</dt>
              <dd className="break-words text-foreground">{selected.email}</dd>
            </div>
            <div className="rounded-2xl bg-surface p-3 ring-1 ring-border">
              <dt className="text-xs text-muted-foreground uppercase">Telefone</dt>
              <dd className="text-foreground">{selected.phone}</dd>
            </div>
            <div className="rounded-2xl bg-surface p-3 ring-1 ring-border sm:col-span-2">
              <dt className="text-xs text-muted-foreground uppercase">Código</dt>
              <dd className="font-mono text-xs break-all text-foreground">
                {selected.credential_code}
              </dd>
            </div>
          </dl>

          {alreadyCheckedIn ? (
            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-destructive/10 p-4 text-sm text-destructive">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>
                Este visitante já foi credenciado em{" "}
                {new Date(selected.checked_in_at as string).toLocaleString("pt-BR")}. Confirme
                explicitamente para registrar novamente.
              </p>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            {alreadyCheckedIn && !confirmDuplicate ? (
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setConfirmDuplicate(true)}
              >
                Credenciar novamente
              </Button>
            ) : (
              <Button
                className="rounded-full"
                disabled={mutation.isPending}
                onClick={() => mutation.mutate(selected.id)}
              >
                {mutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                )}
                {alreadyCheckedIn ? "Confirmar novo registro" : "Confirmar credenciamento"}
              </Button>
            )}
            <Button
              variant="ghost"
              className="rounded-full"
              onClick={() => {
                setSelected(null);
                setConfirmDuplicate(false);
              }}
            >
              Próximo visitante
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6 rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border">
            <Button
              className="w-full rounded-full"
              variant={scanning ? "outline" : "default"}
              onClick={() => {
                setLookupError(null);
                setScanning((value) => !value);
              }}
            >
              {scanning ? (
                <CameraOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Camera className="h-4 w-4" aria-hidden="true" />
              )}
              {scanning ? "Parar câmera" : "Escanear QR Code"}
            </Button>

            {scanning ? (
              <div className="mt-4">
                <QrScanner active={scanning} onResult={handleScan} />
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {lookingUp ? "Consultando visitante..." : "Aponte a câmera para o QR Code."}
                </p>
              </div>
            ) : null}

            {lookupError ? (
              <p className="mt-3 text-center text-sm font-medium text-destructive">{lookupError}</p>
            ) : null}
          </div>

          <p className="mt-4 text-center text-sm font-semibold text-muted-foreground">ou</p>

          <div className="relative mt-4">
            <Search
              className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Buscar visitante manualmente"
              className="pl-9"
              aria-label="Buscar visitante manualmente"
            />
          </div>

          <div className="mt-4 space-y-3">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 p-8 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Carregando visitantes...
              </div>
            ) : !term.trim() ? null : results.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted-foreground">
                Nenhum visitante encontrado.
              </p>
            ) : (
              results.map((row) => (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => selectVisitor(row)}
                  className="flex w-full flex-wrap items-center justify-between gap-3 rounded-2xl bg-card p-4 text-left shadow-soft ring-1 ring-border transition-colors hover:bg-accent"
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
                    <Badge variant="secondary" className="rounded-full">
                      Aguardando
                    </Badge>
                  )}
                </button>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
}
