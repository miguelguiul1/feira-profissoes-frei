import { useEffect, useRef, useState } from "react";
import { CameraOff, Loader2 } from "lucide-react";

/**
 * Leitor de QR Code via câmera. Importa o ZXing dinamicamente para evitar
 * qualquer execução no SSR.
 */
export function QrScanner({
  active,
  onResult,
}: {
  active: boolean;
  onResult: (text: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!active) return;
    let stopped = false;
    let controls: { stop: () => void } | undefined;

    setStarting(true);
    setError(null);

    (async () => {
      try {
        const { BrowserQRCodeReader } = await import("@zxing/browser");
        const reader = new BrowserQRCodeReader();
        const video = videoRef.current;
        if (!video) return;
        controls = await reader.decodeFromVideoDevice(undefined, video, (result) => {
          if (result) onResultRef.current(result.getText());
        });
        if (stopped) controls.stop();
      } catch (err) {
        console.error("[scanner]", err);
        setError("Não foi possível acessar a câmera. Verifique as permissões do navegador.");
      } finally {
        if (!stopped) setStarting(false);
      }
    })();

    return () => {
      stopped = true;
      controls?.stop();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-black ring-1 ring-border">
      <video
        ref={videoRef}
        className="aspect-square w-full object-cover"
        muted
        playsInline
        aria-label="Pré-visualização da câmera para leitura do QR Code"
      />
      <div
        className="pointer-events-none absolute inset-8 rounded-2xl border-2 border-white/80"
        aria-hidden="true"
      />
      {starting ? (
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 text-sm text-white">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Iniciando câmera...
        </div>
      ) : null}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/80 p-6 text-center text-sm text-white">
          <CameraOff className="h-6 w-6" aria-hidden="true" />
          {error}
        </div>
      ) : null}
    </div>
  );
}
