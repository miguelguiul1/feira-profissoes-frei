import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  CalendarClock,
  CheckCircle2,
  Clock,
  GraduationCap,
  Loader2,
  Percent,
  RefreshCw,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listInscriptions, type InscriptionRow } from "@/lib/inscriptions.functions";
import { EVENT } from "@/lib/site-data";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard Operacional | Painel FREI" },
      {
        name: "description",
        content:
          "Acompanhamento em tempo real das inscrições e do credenciamento da 6ª Feira das Profissões.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

const PERIODS = [
  { value: "all", label: "Todo o período" },
  { value: "today", label: "Hoje" },
  { value: "7d", label: "Últimos 7 dias" },
  { value: "30d", label: "Últimos 30 dias" },
] as const;

function eventStatus(now: Date) {
  const start = new Date(EVENT.startDate).getTime();
  const end = new Date(EVENT.endDate).getTime();
  const t = now.getTime();
  if (t < start) return { label: "Evento ainda não iniciado", tone: "secondary" as const };
  if (t > end) return { label: "Evento encerrado", tone: "outline" as const };
  return { label: "Evento em andamento", tone: "default" as const };
}

function DashboardPage() {
  const fetchInscriptions = useServerFn(listInscriptions);
  const [period, setPeriod] = useState<string>("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, isError, isFetching, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["inscriptions"],
    queryFn: () => fetchInscriptions(),
    refetchInterval: 60_000,
  });

  const allRows = useMemo(() => data ?? [], [data]);

  const courses = useMemo(
    () => [...new Set(allRows.map((row) => row.course_interest))].sort(),
    [allRows],
  );

  const rows = useMemo(() => {
    const now = Date.now();
    const windowMs =
      period === "today" ? null : period === "7d" ? 7 * 864e5 : period === "30d" ? 30 * 864e5 : null;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    return allRows.filter((row) => {
      const created = new Date(row.created_at).getTime();
      if (period === "today" && created < startOfToday.getTime()) return false;
      if (windowMs && now - created > windowMs) return false;
      if (courseFilter !== "all" && row.course_interest !== courseFilter) return false;
      if (statusFilter === "checked_in" && !row.checked_in_at) return false;
      if (statusFilter === "pending" && row.checked_in_at) return false;
      return true;
    });
  }, [allRows, period, courseFilter, statusFilter]);

  const filtersActive = period !== "all" || courseFilter !== "all" || statusFilter !== "all";

  const total = rows.length;
  const checkedIn = rows.filter((row) => row.checked_in_at).length;
  const pending = total - checkedIn;
  const rate = total > 0 ? (checkedIn / total) * 100 : 0;

  const hourly = useMemo(() => {
    const buckets = new Map<string, number>();
    for (const row of rows) {
      if (!row.checked_in_at) continue;
      const date = new Date(row.checked_in_at);
      const key = `${String(date.getHours()).padStart(2, "0")}:00`;
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
    return [...buckets.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([hour, count]) => ({ hour, count }));
  }, [rows]);

  const byCourse = useMemo(() => distribution(rows, (row) => row.course_interest), [rows]);
  const byEducation = useMemo(() => distribution(rows, (row) => row.education_level), [rows]);

  const recent = useMemo(
    () =>
      [...rows]
        .map((row) => ({
          row,
          at: row.checked_in_at ?? row.created_at,
          kind: row.checked_in_at ? ("checkin" as const) : ("signup" as const),
        }))
        .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
        .slice(0, 8),
    [rows],
  );

  const status = eventStatus(new Date());

  return (
    <>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="truncate font-display text-2xl font-extrabold text-primary">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Visão geral da 6ª Feira das Profissões
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Última atualização:{" "}
            {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleString("pt-BR") : "—"}
          </p>
        </div>
        <Button
          onClick={() => void refetch()}
          disabled={isFetching}
          className="shrink-0 rounded-full"
        >
          {isFetching ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          )}
          Atualizar dados
        </Button>
      </header>

      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-3xl bg-card p-4 shadow-soft ring-1 ring-border">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          <CalendarClock className="h-4 w-4" aria-hidden="true" />
          {EVENT.dateLabel} · 09:00 às 16:00
        </span>
        <Badge variant={status.tone} className="rounded-full">
          {status.label}
        </Badge>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_auto_auto_auto] xl:items-center">
        <p className="text-sm text-muted-foreground">
          {filtersActive
            ? "Indicadores e gráficos refletem os filtros aplicados."
            : "Indicadores considerando todos os registros."}
        </p>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger aria-label="Filtrar por período" className="min-h-11">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            {PERIODS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
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
      </div>
      {filtersActive ? (
        <Button
          variant="ghost"
          className="mt-2 rounded-full"
          onClick={() => {
            setPeriod("all");
            setCourseFilter("all");
            setStatusFilter("all");
          }}
        >
          Limpar filtros
        </Button>
      ) : null}

      {isLoading ? (
        <div className="mt-6 flex items-center justify-center gap-2 rounded-3xl bg-card p-12 text-muted-foreground shadow-soft ring-1 ring-border">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Carregando indicadores...
        </div>
      ) : isError ? (
        <div className="mt-6 rounded-3xl bg-card p-12 text-center shadow-soft ring-1 ring-border">
          <p className="text-sm text-destructive">
            Não foi possível carregar os dados. Tente novamente.
          </p>
          <Button className="mt-4 rounded-full" onClick={() => void refetch()}>
            Tentar novamente
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              icon={Users}
              label="Total de inscritos"
              value={total.toLocaleString("pt-BR")}
              hint={filtersActive ? "Com filtros aplicados" : "Todas as inscrições"}
            />
            <MetricCard
              icon={CheckCircle2}
              label="Credenciados"
              value={checkedIn.toLocaleString("pt-BR")}
              hint="Já passaram pelo credenciamento"
            />
            <MetricCard
              icon={Clock}
              label="Ainda não credenciados"
              value={pending.toLocaleString("pt-BR")}
              hint="Aguardando chegada"
            />
            <MetricCard
              icon={Percent}
              label="Comparecimento"
              value={`${rate.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`}
              hint="Credenciados sobre inscritos"
            />
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <Panel title="Credenciamentos ao longo do dia" icon={Activity}>
              {hourly.length === 0 ? (
                <EmptyState message="Ainda não há credenciamentos registrados." />
              ) : (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourly} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="hour" tickLine={false} axisLine={false} fontSize={12} />
                      <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} />
                      <RechartsTooltip
                        cursor={{ fill: "color-mix(in oklab, currentColor 8%, transparent)" }}
                        formatter={(value: number) => [`${value}`, "Credenciamentos"]}
                      />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="currentColor" className="text-primary">
                        {hourly.map((item) => (
                          <Cell key={item.hour} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Panel>

            <Panel title="Visitantes por curso de interesse" icon={GraduationCap}>
              {byCourse.length === 0 ? (
                <EmptyState message="Ainda não há inscrições para exibir." />
              ) : (
                <DistributionList items={byCourse} />
              )}
            </Panel>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <Panel title="Distribuição por escolaridade" icon={GraduationCap}>
              {byEducation.length === 0 ? (
                <EmptyState message="Ainda não há dados de escolaridade." />
              ) : (
                <DistributionList items={byEducation} />
              )}
            </Panel>

            <Panel
              title="Atividade recente"
              icon={Activity}
              action={
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link to="/admin">Ver todos</Link>
                </Button>
              }
            >
              {recent.length === 0 ? (
                <EmptyState message="Ainda não há atividade registrada." />
              ) : (
                <ul className="divide-y divide-border">
                  {recent.map(({ row, at, kind }) => (
                    <li key={`${row.id}-${kind}`} className="flex items-start gap-3 py-3">
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-tint text-primary">
                        {kind === "checkin" ? (
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Users className="h-4 w-4" aria-hidden="true" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-primary">{row.full_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {kind === "checkin" ? "Credenciado às " : "Inscrição às "}
                          {new Date(at).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="truncate text-sm text-muted-foreground">
                          {row.course_interest}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        </>
      )}
    </>
  );
}

function distribution(rows: InscriptionRow[], key: (row: InscriptionRow) => string) {
  const map = new Map<string, number>();
  for (const row of rows) {
    const value = key(row)?.trim();
    if (!value) continue;
    map.set(value, (map.get(value) ?? 0) + 1);
  }
  const total = rows.length || 1;
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count, percent: (count / total) * 100 }));
}

function DistributionList({
  items,
}: {
  items: { label: string; count: number; percent: number }[];
}) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.label}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate text-sm font-semibold text-primary">
              {item.label}
            </span>
            <span className="shrink-0 text-sm text-muted-foreground">
              {item.count} · {item.percent.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%
            </span>
          </div>
          <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-accent">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.max(item.percent, 2)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Panel({
  title,
  icon: Icon,
  action,
  children,
}: {
  title: string;
  icon: typeof Users;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h3 className="flex min-w-0 items-center gap-2 font-display text-base font-extrabold text-primary">
          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{title}</span>
        </h3>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return <p className="py-10 text-center text-sm text-muted-foreground">{message}</p>;
}

function MetricCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-tint text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-4 text-3xl font-extrabold text-primary">{value}</p>
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
