import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const inscriptionSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, { message: "Informe o nome completo." })
    .max(120, { message: "Máximo de 120 caracteres." }),
  phone: z
    .string()
    .trim()
    .regex(/^\(?\d{2}\)?[\s-]?9?\d{4}-?\d{4}$/, {
      message: "Telefone inválido. Use o formato (11) 99999-9999.",
    }),
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido." })
    .max(255, { message: "Máximo de 255 caracteres." }),

  is_former_student: z.enum(["sim", "nao"], { message: "Selecione uma opção." }),
  course_interest: z.string().trim().min(1, { message: "Selecione um curso." }).max(160),
  how_found_out: z.string().trim().max(120).optional().or(z.literal("")),
  estimated_arrival: z.string().trim().max(120).optional().or(z.literal("")),
});

export type InscriptionInput = z.infer<typeof inscriptionSchema>;

export interface InscriptionRow {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string;
  education_level: string;
  is_former_student: boolean;
  course_interest: string;
  how_found_out: string | null;
  estimated_arrival: string | null;
  credential_code: string;
  checked_in_at: string | null;
}

/**
 * Escrita de PII feita exclusivamente no servidor: o navegador nunca insere
 * diretamente na tabela. Validação Zod estrita antes de persistir.
 */
export const createInscription = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inscriptionSchema.parse(input))
  .handler(async ({ data }): Promise<{ ok: true }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("inscriptions").insert({
      full_name: data.full_name,
      phone: data.phone,
      email: data.email.toLowerCase(),
      education_level: "Não informado",
      is_former_student: data.is_former_student === "sim",
      course_interest: data.course_interest,
      how_found_out: data.how_found_out ? data.how_found_out : null,
      estimated_arrival: data.estimated_arrival ? data.estimated_arrival : null,
    });

    if (error) {
      // Nunca expor detalhes internos do banco ao usuário final.
      console.error("[inscriptions] insert failed", error);
      throw new Error("Não foi possível registrar a inscrição.");
    }

    return { ok: true };
  });

/** Leitura de PII: exige sessão válida E papel admin/staff verificado no servidor. */
export const listInscriptions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<InscriptionRow[]> => {
    const [admin, staff] = await Promise.all([
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" }),
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "staff" }),
    ]);

    if (admin.error || staff.error) {
      console.error("[inscriptions] role check failed", admin.error ?? staff.error);
      throw new Error("Não foi possível validar suas permissões.");
    }

    if (!admin.data && !staff.data) {
      throw new Error("Acesso negado.");
    }

    const { data, error } = await context.supabase
      .from("inscriptions")
      .select(
        "id, created_at, full_name, phone, email, education_level, is_former_student, course_interest, how_found_out, estimated_arrival, credential_code, checked_in_at",
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[inscriptions] list failed", error);
      throw new Error("Não foi possível carregar as inscrições.");
    }
    return (data ?? []) as InscriptionRow[];
  });

/**
 * Credenciamento manual (base para a etapa de QR Code): marca ou desfaz o
 * check-in de um visitante. Exige sessão válida e papel admin/staff.
 */
export const setInscriptionCheckIn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), checked_in: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }): Promise<{ checked_in_at: string | null }> => {
    const [admin, staff] = await Promise.all([
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" }),
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "staff" }),
    ]);

    if (admin.error || staff.error) {
      console.error("[inscriptions] role check failed", admin.error ?? staff.error);
      throw new Error("Não foi possível validar suas permissões.");
    }
    if (!admin.data && !staff.data) {
      throw new Error("Acesso negado.");
    }

    const checkedInAt = data.checked_in ? new Date().toISOString() : null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("inscriptions")
      .update({ checked_in_at: checkedInAt })
      .eq("id", data.id);

    if (error) {
      console.error("[inscriptions] check-in failed", error);
      throw new Error("Não foi possível atualizar o credenciamento.");
    }
    return { checked_in_at: checkedInAt };
  });

/** Busca um visitante pelo código único do QR Code. Exige sessão e papel admin/staff. */
export const findInscriptionByCredential = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ credential_code: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }): Promise<InscriptionRow | null> => {
    const [admin, staff] = await Promise.all([
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" }),
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "staff" }),
    ]);

    if (admin.error || staff.error) {
      console.error("[inscriptions] role check failed", admin.error ?? staff.error);
      throw new Error("Não foi possível validar suas permissões.");
    }
    if (!admin.data && !staff.data) {
      throw new Error("Acesso negado.");
    }

    const { data: row, error } = await context.supabase
      .from("inscriptions")
      .select(
        "id, created_at, full_name, phone, email, education_level, is_former_student, course_interest, how_found_out, estimated_arrival, credential_code, checked_in_at",
      )
      .eq("credential_code", data.credential_code)
      .maybeSingle();

    if (error) {
      console.error("[inscriptions] credential lookup failed", error);
      throw new Error("Não foi possível localizar o visitante.");
    }
    return (row as InscriptionRow | null) ?? null;
  });
