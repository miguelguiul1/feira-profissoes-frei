import { useState } from "react";
import { CheckCircle2, Loader2, QrCode, RotateCcw } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCodeDialog } from "@/components/admin/qr-code-dialog";
import type { InscriptionRow } from "@/lib/inscriptions.functions";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface p-3 ring-1 ring-border">
      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm break-words text-foreground">{value}</dd>
    </div>
  );
}

/** Ficha do visitante: dados da inscrição, status e ações de credenciamento. */
export function VisitorDetailSheet({
  visitor,
  open,
  onOpenChange,
  onToggleCheckIn,
  pending,
}: {
  visitor: InscriptionRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleCheckIn: (visitor: InscriptionRow) => void;
  pending: boolean;
}) {
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        {visitor ? (
          <>
            <SheetHeader>
              <SheetTitle className="font-display text-xl font-extrabold text-primary">
                {visitor.full_name}
              </SheetTitle>
              <SheetDescription>
                Inscrito em {new Date(visitor.created_at).toLocaleString("pt-BR")}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4 px-4 pb-6">
              <div>
                {visitor.checked_in_at ? (
                  <Badge className="rounded-full">
                    Credenciado em {new Date(visitor.checked_in_at).toLocaleString("pt-BR")}
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="rounded-full">
                    Aguardando credenciamento
                  </Badge>
                )}
              </div>

              <dl className="grid gap-3">
                <Field label="E-mail" value={visitor.email} />
                <Field label="Telefone" value={visitor.phone} />
                <Field label="Curso de interesse" value={visitor.course_interest} />
                <Field label="Ex-aluno" value={visitor.is_former_student ? "Sim" : "Não"} />
                <Field label="Como soube da feira" value={visitor.how_found_out ?? "Não informado"} />
                <Field
                  label="Previsão de chegada"
                  value={visitor.estimated_arrival ?? "Não informado"}
                />
                <Field label="Código de credenciamento" value={visitor.credential_code} />
              </dl>

              <Button
                className="w-full rounded-full"
                variant={visitor.checked_in_at ? "outline" : "default"}
                disabled={pending}
                onClick={() => onToggleCheckIn(visitor)}
              >
                {pending ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : visitor.checked_in_at ? (
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                )}
                {visitor.checked_in_at ? "Desfazer credenciamento" : "Credenciar visitante"}
              </Button>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
