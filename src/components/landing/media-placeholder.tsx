import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  label: string;
  className?: string;
  tone?: "light" | "dark";
}

/**
 * Neutral image slot. Replace each usage with a real <img> when the
 * institute's photos are available.
 */
export function MediaPlaceholder({ label, className, tone = "light" }: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed p-4 text-center",
        tone === "light"
          ? "border-border bg-secondary text-muted-foreground"
          : "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground/80",
        className,
      )}
    >
      <ImageIcon className="h-6 w-6 shrink-0 opacity-70" aria-hidden="true" />
      <span className="text-xs leading-snug font-medium">{label}</span>
    </div>
  );
}
