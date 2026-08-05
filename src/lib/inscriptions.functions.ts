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
  education_level: z.string().trim().min(1, { message: "Selecione a escolaridade." }),
  is_former_student: z.enum(["sim", "nao"], { message: "Selecione uma opção." }),
  course_interest: z.string().trim().min(1, { message: "Selecione um curso." }),
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
}

export const listInscriptions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<InscriptionRow[]> => {
    const { data, error } = await context.supabase
      .from("inscriptions")
      .select(
        "id, created_at, full_name, phone, email, education_level, is_former_student, course_interest, how_found_out, estimated_arrival",
      )
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as InscriptionRow[];
  });
