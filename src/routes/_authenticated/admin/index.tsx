import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  BookOpen,
  CheckCircle2,
  Download,
  Loader2,
  Search,
  UserCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  listInscriptions,
  setInscriptionCheckIn,
  type InscriptionRow,
} from "@/lib/inscriptions.functions";
import { VisitorDetailSheet } from "@/components/admin/visitor-detail-sheet";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Gestão de Visitantes | Painel FREI" },
      {
        name: "description",
        content: "Área administrativa com a lista de visitantes inscritos na 6ª Feira das Profissões.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VisitorsPage,
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
    "Status",
    "Data da inscrição",
  ];
  // Programas de planilha executam células iniciadas por estes caracteres como fórmula.
  const escape = (value: string) =>
    `"${(/^[=+\-@\t\r]/.test(value) ? `'${value}` : value).replaceAll('"', '""')}"`;
  const lines = rows.map((row) =>
    [
      row.full_name,
      row.phone,
      row.email,
      row.is_former_student ? "Sim" : "Não",
      row.course_interest,
      row.how_found_out ?? "",
      row.estimated_arrival ?? "",
      row.checked_in_at ? "Credenciado" : "Inscrito",
      new Date(row.created_at).toLocaleString("pt-BR"),
    ]
      .map((value) => escape(String(value)))
      .join(","),
  );
  return [header.map(escape).join(","), ...lines].join("\n");
}

function VisitorsPage() {
  const queryClient = useQueryClient();
  const fetchInscriptions = useServerFn(listInscriptions);
  const checkIn = useServerFn(setInscriptionCheckIn);
  const [term, setTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [formerFilter, setFormerFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["inscriptions"],
    queryFn: () => fetchInscriptions(),
  });

  const mutation = useMutation({
    mutationFn: (input: { id: string; checked_in: boolean }) => checkIn({ data: input }),
    onSuccess: (_result, input) => {
      queryClient.invalidateQueries({ queryKey: ["inscriptions"] });
      toast.success(input.checked_in ? "Visitante credenciado." : "Credenciamento desfeito.");
    },
    onError: () => toast.error("Não foi possível atualizar o credenciamento."),
  });

  const filteredRows = useMemo(() => {
    const q = term.trim().toLowerCase();
    return (data ?? []).filter(
      (row) =>
        (!q ||
          [row.full_name, row.email, row.phone, row.course_interest].some((value) =>
            value.toLowerCase().includes(q),
          )) &&
        (courseFilter === "all" || row.course_interest === courseFilter) &&
        (sourceFilter === "all" || row.how_found_out === sourceFilter) &&
        (formerFilter === "all" || (formerFilter === "yes") === row.is_former_student) &&
        (statusFilter === "all" ||
          (statusFilter === "checked_in") === Boolean(row.checked_in_at)),
    );
  }, [data, term, courseFilter, sourceFilter, formerFilter, statusFilter]);

  const courses = useMemo(
    () => [...new Set((data ?? []).map((row) => row.course_interest))].sort(),
    [data],
  );
  const sources = useMemo(
    () =>
      [
        ...new Set(
          (data ?? [])
            .map((row) => row.how_found_out)
            .filter((value): value is string => Boolean(value)),
        ),
      ].sort(),
    [data],
  );
  const formerStudents = (data ?? []).filter((row) => row.is_former_student).length;
  const checkedIn = (data ?? []).filter((row) => row.checked_in_at).length;
  const selected = (data ?? []).find((row) => row.id === selectedId) ?? null;

  const handleExport = () => {
    const blob = new Blob([`\uFEFF${toCsv(filteredRows)}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "visitantes-feira-profissoes.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} value={data?.length ?? 0} label="Inscrições recebidas" />
        <StatCard icon={CheckCircle2} value={checkedIn} label="Visitantes credenciados" />
        <StatCard icon={UserCheck} value={formerStudents} label="Ex-alunos inscritos" />
        <StatCard icon={BookOpen} value={courses.length} label="Cursos com interesse" />
      </div>

      <h2 className="mt-8 font-display text-lg font-extrabold text-primary">
        Gestão de Visitantes
      </h2>

      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto] xl:items-center">
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
            aria-label="Buscar visitantes"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger aria-label="Filtrar por status" className="min-h-11">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="checked_in">Credenciados</SelectItem>
            <SelectItem value="pending">Aguardando credenciamento</SelectItem>
          </SelectContent>
        </Select>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger aria-label="Filtrar por curso" className="min-h-11">
            <SelectValue placeholder="Curso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os cursos</SelectItem>
            {courses.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger aria-label="Filtrar por origem" className="min-h-11">
            <SelectValue placeholder="Origem" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as origens</SelectItem>
            {sources.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={formerFilter} onValueChange={setFormerFilter}>
          <SelectTrigger aria-label="Filtrar ex-alunos" className="min-h-11">
            <SelectValue placeholder="Ex-aluno" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os perfis</SelectItem>
            <SelectItem value="yes">Ex-alunos</SelectItem>
            <SelectItem value="no">Não ex-alunos</SelectItem>
          </SelectContent>
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
            Carregando visitantes...
          </div>
        ) : isError ? (
          <p className="p-12 text-center text-sm text-destructive">
            Não foi possível carregar os visitantes.
          </p>
        ) : filteredRows.length === 0 ? (
          <p className="p-12 text-center text-sm text-muted-foreground">
            Nenhum visitante encontrado.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
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
                    <TableCell>
                      <StatusBadge checkedInAt={row.checked_in_at} />
                    </TableCell>
                    <TableCell className="text-sm">{row.course_interest}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(row.created_at).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => setSelectedId(row.id)}
                      >
                        Ver detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <VisitorDetailSheet
        visitor={selected}
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelectedId(null)}
        onToggleCheckIn={(visitor) =>
          mutation.mutate({ id: visitor.id, checked_in: !visitor.checked_in_at })
        }
        pending={mutation.isPending}
      />
    </>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Users;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-tint text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-4 text-3xl font-extrabold text-primary">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function StatusBadge({ checkedInAt }: { checkedInAt: string | null }) {
  return checkedInAt ? (
    <Badge className="rounded-full">Credenciado</Badge>
  ) : (
    <Badge variant="secondary" className="rounded-full">
      Inscrito
    </Badge>
  );
}
