import { useEffect, useState } from "react";
import { Download, Loader2, Printer, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { buildCredentialImage, buildCredentialUrl, renderQrDataUrl } from "@/lib/credential-qr";
import type { InscriptionRow } from "@/lib/inscriptions.functions";

/** Modal com o QR Code da credencial do visitante (sem dados pessoais no código). */
export function QrCodeDialog({
  visitor,
  open,
  onOpenChange,
}: {
  visitor: InscriptionRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    if (!open || !visitor) {
      setQrSrc(null);
      return;
    }
    renderQrDataUrl(buildCredentialUrl(visitor.credential_code)).then((src) => {
      if (active) setQrSrc(src);
    });
    return () => {
      active = false;
    };
  }, [open, visitor]);

  const handleDownload = async () => {
    if (!visitor) return;
    setBusy(true);
    try {
      const dataUrl = await buildCredentialImage({
        fullName: visitor.full_name,
        courseInterest: visitor.course_interest,
        credentialCode: visitor.credential_code,
        qrText: buildCredentialUrl(visitor.credential_code),
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `credencial-${visitor.full_name.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.click();
    } finally {
      setBusy(false);
    }
  };

  const handlePrint = async () => {
    if (!visitor) return;
    setBusy(true);
    try {
      const dataUrl = await buildCredentialImage({
        fullName: visitor.full_name,
        courseInterest: visitor.course_interest,
        credentialCode: visitor.credential_code,
        qrText: buildCredentialUrl(visitor.credential_code),
      });
      const win = window.open("", "_blank", "width=800,height=1000");
      if (!win) return;
      win.document.write(
        `<html><head><title>Credencial</title></head><body style="margin:0;display:flex;justify-content:center"><img src="${dataUrl}" style="width:100%;max-width:700px" onload="window.focus();window.print()" /></body></html>`,
      );
      win.document.close();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {visitor ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl font-extrabold text-primary">
                {visitor.full_name}
              </DialogTitle>
              <DialogDescription>{visitor.course_interest}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-3">
              <div className="rounded-3xl bg-white p-4 ring-1 ring-border">
                {qrSrc ? (
                  <img
                    src={qrSrc}
                    alt={`QR Code da credencial de ${visitor.full_name}`}
                    className="h-64 w-64"
                  />
                ) : (
                  <div className="flex h-64 w-64 items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-hidden="true" />
                  </div>
                )}
              </div>
              <p className="font-mono text-xs break-all text-muted-foreground">
                {visitor.credential_code}
              </p>
            </div>

            <DialogFooter className="gap-2 sm:justify-center">
              <Button className="rounded-full" onClick={handleDownload} disabled={busy || !qrSrc}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Baixar QR Code
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={handlePrint}
                disabled={busy || !qrSrc}
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                Imprimir
              </Button>
              <Button variant="ghost" className="rounded-full" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" aria-hidden="true" />
                Fechar
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
