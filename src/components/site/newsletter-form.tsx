import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      toast.error("Informe um e-mail válido.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").upsert({ email: normalizedEmail }, { onConflict: "email", ignoreDuplicates: true });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível cadastrar seu e-mail. Tente novamente.");
      return;
    }
    setEmail("");
    toast.success("Pronto! Você receberá as novidades da feira.");
  };

  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-2 sm:flex-row" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">Seu e-mail</label>
      <div className="relative min-w-0 flex-1">
        <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seuemail@exemplo.com" className="min-h-11 rounded-full bg-background pl-9" required />
      </div>
      <Button type="submit" disabled={loading} className="min-h-11 rounded-full px-6 font-semibold">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        Receber novidades
      </Button>
    </form>
  );
}
