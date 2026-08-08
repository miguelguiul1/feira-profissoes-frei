import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Informe um e-mail válido." })
    .max(255, { message: "Máximo de 255 caracteres." }),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

/** Assinatura da newsletter persistida somente no servidor, após validação Zod. */
export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => newsletterSchema.parse(input))
  .handler(async ({ data }): Promise<{ ok: true }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert({ email: data.email }, { onConflict: "email", ignoreDuplicates: true });

    if (error) {
      console.error("[newsletter] subscribe failed", error);
      throw new Error("Não foi possível cadastrar o e-mail.");
    }

    return { ok: true };
  });
