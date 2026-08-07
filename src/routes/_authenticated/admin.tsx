import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { BookOpen, Download, LogOut, Loader2, Search, UserCheck, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listInscriptions, type InscriptionRow } from "@/lib/inscriptions.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Dashboard de Inscritos | 6ª Feira das Profissões FREI" },
      {
        name: "description",
        content: "Área administrativa com a lista de inscritos da 6ª Feira das Profissões.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function toCsv(rows: InscriptionRow[]) {
  const header = [
    "Nome",
    "Telefone",
    "E-mail",
    "Ex-aluno",
    "Curso de interesse",
    "Como soube",
    "Previsão de chegada",
    "Data da inscrição",
  ];
  // Spreadsheet programs execute cells starting with these characters as formulas.
  const escape = (value: string) => `"${(/^[=+\-@\t\r]/.test(value) ? `'${value}` : value).replaceAll('"', '""')}"`;
  const lines = rows.map((row) =>
    [
      row.full_name,
      row.phone,
      row.email,
      row.is_former_student ? "Sim" : "Não",
      row.course_interest,
      row.how_found_out ?? "",
      row.estimated_arrival ?? "",
      new Date(row.created_at).toLocaleString("pt-BR"),
    ]
      .map((value) => escape(String(value)))
      .join(","),
  );
  return [header.map(escape).join(","), ...lines].join("\n");
}

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchInscriptions = useServerFn(listInscriptions);
  const [term, setTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [formerFilter, setFormerFilter] = useState("all");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["inscriptions"],
    queryFn: () => fetchInscriptions(),
  });

  const rows = useMemo(() => {
    const list = data ?? [];
    const q = term.trim().toLowerCase();
    if (!q) return list;
    return list.filter((row) =>
      [row.full_name, row.email, row.phone, row.course_interest].some((value) =>
        value.toLowerCase().includes(q),
      ),
    );
  }, [data, term, courseFilter, sourceFilter, formerFilter]);

  const filteredRows = useMemo(
    () => rows.filter((row) =>
      (courseFilter === "all" || row.course_interest === courseFilter) &&
      (sourceFilter === "all" || row.how_found_out === sourceFilter) &&
      (formerFilter === "all" || (formerFilter === "yes") === row.is_former_student),
    ),
    [rows, courseFilter, sourceFilter, formerFilter],
  );

  const courses = useMemo(() => [...new Set((data ?? []).map((row) => row.course_interest))].sort(), [data]);
  const sources = useMemo(() => [...new Set((data ?? []).map((row) => row.how_found_out).filter((value): value is string => Boolean(value)))].sort(), [data]);
  const formerStudents = (data ?? []).filter((row) => row.is_former_student).length;

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  const handleExport = () => {
    const blob = new Blob([`\uFEFF${toCsv(filteredRows)}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "inscritos-feira-profissoes-filtrados.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 lg:px-8">
          <div className="min-w-0">
            <h1 className="truncate font-display text-xl font-extrabold text-primary sm:text-2xl">
              Dashboard de Inscritos
            </h1>
            <p className="truncate text-sm text-muted-foreground">
              6ª Feira das Profissões — Instituto Social Nossa Senhora de Fátima
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="shrink-0 rounded-full border-primary text-primary hover:bg-accent"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sair
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-tint text-primary">
              <Users className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-4 text-3xl font-extrabold text-primary">{data?.length ?? 0}</p>
            <p className="text-sm text-muted-foreground">Inscrições recebidas</p>
          </div>
          <div className="rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-tint text-primary"><UserCheck className="h-5 w-5" aria-hidden="true" /></span>
            <p className="mt-4 text-3xl font-extrabold text-primary">{formerStudents}</p>
            <p className="text-sm text-muted-foreground">Ex-alunos inscritos</p>
          </div>
          <div className="rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-tint text-primary"><BookOpen className="h-5 w-5" aria-hidden="true" /></span>
            <p className="mt-4 text-3xl font-extrabold text-primary">{courses.length}</p>
            <p className="text-sm text-muted-foreground">Cursos com interesse</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto] lg:items-center">
          <div className="relative min-w-0">
            <Search
              className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Buscar por nome, e-mail, telefone ou curso"
              className="pl-9"
              aria-label="Buscar inscritos"
            />
          </div>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger aria-label="Filtrar por curso" className="min-h-11"><SelectValue placeholder="Curso" /></SelectTrigger>
            <SelectContent><SelectItem value="all">Todos os cursos</SelectItem>{courses.map((course) => <SelectItem key={course} value={course}>{course}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger aria-label="Filtrar por origem" className="min-h-11"><SelectValue placeholder="Origem" /></SelectTrigger>
            <SelectContent><SelectItem value="all">Todas as origens</SelectItem>{sources.map((source) => <SelectItem key={source} value={source}>{source}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={formerFilter} onValueChange={setFormerFilter}>
            <SelectTrigger aria-label="Filtrar ex-alunos" className="min-h-11"><SelectValue placeholder="Ex-aluno" /></SelectTrigger>
            <SelectContent><SelectItem value="all">Todos os perfis</SelectItem><SelectItem value="yes">Ex-alunos</SelectItem><SelectItem value="no">Não ex-alunos</SelectItem></SelectContent>
          </Select>
          <Button onClick={handleExport} className="shrink-0 rounded-full">
            <Download className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </Button>
        </div>

        <div className="mt-4 overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 p-12 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Carregando inscrições...
            </div>
          ) : isError ? (
            <p className="p-12 text-center text-sm text-destructive">
              Não foi possível carregar as inscrições.
            </p>
          ) : filteredRows.length === 0 ? (
            <p className="p-12 text-center text-sm text-muted-foreground">
              Nenhuma inscrição encontrada.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Ex-aluno</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium text-primary">{row.full_name}</TableCell>
                      <TableCell className="text-sm">
                        <span className="block">{row.email}</span>
                        <span className="block text-muted-foreground">{row.phone}</span>
                      </TableCell>
                      <TableCell className="text-sm">
                        {row.is_former_student ? "Sim" : "Não"}
                      </TableCell>
                      <TableCell className="text-sm">{row.course_interest}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(row.created_at).toLocaleDateString("pt-BR")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
