import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

export function ShareButtons({ title, text, url, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const shareUrl = url ?? window.location.href;
    const data = { title, text, url: shareUrl };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch (error) {
        if ((error as DOMException).name !== "AbortError") toast.error("Não foi possível abrir o compartilhamento.");
      }
      return;
    }
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareUrl);
    } else {
      window.prompt("Copie o link da feira:", shareUrl);
    }
    setCopied(true);
    toast.success("Link copiado para a área de transferência.");
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button type="button" variant="outline" onClick={share} className={`rounded-full font-semibold text-primary ${className ?? ""}`}>
      <Share2 className="h-4 w-4" aria-hidden="true" />
      {copied ? "Link copiado" : "Compartilhar"}
    </Button>
  );
}
