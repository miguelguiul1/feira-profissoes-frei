import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import alunosTurma from "@/assets/alunos-turma.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inscriptionSchema, type InscriptionInput } from "@/lib/inscriptions.functions";

const EDUCATION = [
  "Ensino Fundamental cursando",
  "Ensino Fundamental completo",
  "Ensino Médio cursando",
  "Ensino Médio completo",
  "Ensino Técnico",
  "Ensino Superior",
];

const COURSES = [
  "Curso Técnico de Informática",
  "Curso Livre de Inglês",
  "Eletromecânica de Autos",
  "Curso Técnico em Administração",
  "Ainda não sei",
];

const BENEFITS = [
  "Material informativo sobre todos os cursos",
  "Palestras com professores e profissionais",
  "Visitação às instalações do Instituto",
  "Contato com empresas parceiras",
  "Brindes exclusivos da 6ª edição",
  "Networking com especialistas da área",
];

export function InscriptionSection() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InscriptionInput>({
    resolver: zodResolver(inscriptionSchema) as Resolver<InscriptionInput>,
    mode: "onBlur",

    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      education_level: "",
      course_interest: "",
      how_found_out: "",
      estimated_arrival: "",
    },
  });

  const onSubmit = async (values: InscriptionInput) => {
    const { error } = await supabase.from("inscriptions").insert({
      full_name: values.full_name,
      phone: values.phone,
      email: values.email,
      education_level: values.education_level,
      is_former_student: values.is_former_student === "sim",
      course_interest: values.course_interest,
      how_found_out: values.how_found_out || null,
      estimated_arrival: values.estimated_arrival || null,
    });

    if (error) {
      toast.error("Não foi possível enviar a inscrição. Tente novamente.");
      return;
    }

    setSubmitted(true);
    form.reset();
    toast.success("Inscrição enviada! Te esperamos na feira.");
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <section
      id="inscricao"
      className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-deep py-16 lg:py-24"
      aria-labelledby="inscricao-titulo"
    >
      <img
        src={alunosTurma.url}
        alt="Turma de alunos do Instituto Social Nossa Senhora de Fátima"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="rounded-3xl bg-background/95 p-6 shadow-card ring-1 ring-primary-foreground/20 backdrop-blur-md sm:p-8">
            <h2
              id="inscricao-titulo"
              className="font-display text-2xl font-extrabold text-primary sm:text-3xl"
            >
              Faça sua inscrição
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Preencha o formulário e garanta o seu lugar na 6ª Feira das Profissões.
            </p>

            {submitted ? (
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brand-soft p-5">
                <PartyPopper className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-primary">Inscrição confirmada!</p>
                  <p className="mt-1 text-sm text-foreground/80">
                    Recebemos os seus dados. Nos vemos no dia 19 de setembro de 2026.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 rounded-full border-primary text-primary hover:bg-accent"
                    onClick={() => setSubmitted(false)}
                  >
                    Inscrever outra pessoa
                  </Button>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Nome Completo*</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" maxLength={120} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(11) 99999-9999"
                            inputMode="tel"
                            maxLength={20}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail*</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="voce@email.com"
                            maxLength={255}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education_level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Escolaridade*</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EDUCATION.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="is_former_student"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Já foi aluno do Frei?*</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sim">Sim</SelectItem>
                            <SelectItem value="nao">Não</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="course_interest"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Interesse em algum dos cursos?*</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COURSES.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="how_found_out"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Como ficou sabendo da feira?</FormLabel>
                        <FormControl>
                          <Input placeholder="Escola, redes sociais, amigos..." maxLength={120} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="estimated_arrival"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previsão de chegada à feira</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex.: por volta das 10h" maxLength={120} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="sm:col-span-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full rounded-full font-semibold sm:w-auto sm:px-10"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>

          <aside className="rounded-3xl bg-primary-foreground/10 p-6 ring-1 ring-primary-foreground/25 backdrop-blur-md sm:p-8">
            <h3 className="font-display text-xl font-extrabold text-primary-foreground">
              O que você ganha
            </h3>
            <ul className="mt-5 space-y-3">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-primary-foreground/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
