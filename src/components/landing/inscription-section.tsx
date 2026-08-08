import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarPlus, CheckSquare, Download, Loader2, Mail, MessageCircle, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import inscriptionImage from "@/assets/Nova pasta/Formulário de inscrição.png";
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
import { ShareButtons } from "@/components/site/share-buttons";
import { EVENT, FULL_ADDRESS, SITE_URL } from "@/lib/site-data";

const SOURCES = [
  "Escola",
  "Redes sociais",
  "Amigos ou familiares",
  "Ex-aluno do Frei",
  "Panfleto ou cartaz",
  "Site do Instituto",
  "Outro",
];

const COURSES = [
  "Curso Técnico de Informática",
  "Curso Técnico em Administração",
  "Curso Técnico em Comunicação Visual",
  "Curso de Qualificação Profissional em Eletromecânica de Autos",
  "Curso de Qualificação Profissional em Automação Residencial e Robótica",
  "Curso Livre de Inglês Básico ao Pré-Intermediário",
  "Curso Livre de Informática Básica – Excel Avançado",
  "Curso Livre de Eletricista Instalador",
  "Ainda não sei",
];

const BENEFITS = [
  "Material informativo dos cursos",
  "Contato com empresas parceiras",
  "Palestras com profissionais de sucesso",
  "Concorrer a brindes exclusivos",
  "Visitação completa às instalações",
  "Networking com especialistas",
];

const CALENDAR_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT.name)}&dates=20260919T120000Z/20260919T190000Z&details=${encodeURIComponent("Evento gratuito com palestras, oficinas e visitas guiadas.")}&location=${encodeURIComponent(FULL_ADDRESS)}`;
const CONFIRMATION_TEXT = `Minha inscrição para a ${EVENT.name} está confirmada! Nos vemos em ${EVENT.dateLabel}, ${EVENT.timeLabel}, no endereço ${FULL_ADDRESS}.`;


export function InscriptionSection() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InscriptionInput>({
    resolver: zodResolver(inscriptionSchema) as Resolver<InscriptionInput>,
    mode: "onBlur",

    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      
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
      education_level: "Não informado",
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
        src={inscriptionImage}
        alt="Turma de alunos do Instituto Social Nossa Senhora de Fátima"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-15"
      />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="rounded-4xl bg-background/95 p-6 shadow-card ring-1 ring-primary-foreground/20 backdrop-blur-md sm:p-8">
            <h2
              id="inscricao-titulo"
              className="font-display text-2xl font-extrabold text-primary sm:text-3xl"
            >
              Formulário de Inscrição
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Preencha o formulário e garanta o seu lugar na 6ª Feira das Profissões.
            </p>

            {submitted ? (
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brand-soft p-5">
                <PartyPopper className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-primary">Inscrição confirmada!</p>
                  <p className="mt-1 text-sm text-foreground/80">Recebemos os seus dados. Nos vemos no dia 19 de setembro de 2026.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-accent">
                      <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"><CalendarPlus className="h-4 w-4" aria-hidden="true" />Adicionar à agenda</a>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-accent">
                      <a href="/guia-do-visitante.txt" download><Download className="h-4 w-4" aria-hidden="true" />Baixar guia</a>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-accent">
                      <a href={`https://wa.me/?text=${encodeURIComponent(CONFIRMATION_TEXT)}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" aria-hidden="true" />Enviar no WhatsApp</a>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-accent">
                      <a href={`mailto:?subject=${encodeURIComponent("Inscrição confirmada — Feira das Profissões")}&body=${encodeURIComponent(CONFIRMATION_TEXT)}`}><Mail className="h-4 w-4" aria-hidden="true" />Enviar por e-mail</a>
                    </Button>
                    <ShareButtons title="Vou à 6ª Feira das Profissões FREI" text="Minha inscrição está confirmada. Participe também!" url={`${SITE_URL}/inscricao`} />
                    <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-accent" onClick={() => setSubmitted(false)}>Inscrever outra pessoa</Button>
                  </div>
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
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SOURCES.map((item) => (
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

          <aside className="h-fit rounded-4xl bg-card p-6 shadow-card sm:p-8">
            <h3 className="font-display text-xl font-extrabold text-primary">O que você ganha:</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckSquare className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
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
