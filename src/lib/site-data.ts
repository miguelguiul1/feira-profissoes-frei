import cursoInformatica from "@/assets/Nova pasta/Curso de informatica.png";
import cursoIngles from "@/assets/Nova pasta/Curso de ingles.png";
import cursoEletromecanica from "@/assets/Nova pasta/Curso de eletromecanica.png";
import cursoAdministracao from "@/assets/Nova pasta/Curso de adm.png";
import cursoComunicacaoVisual from "@/assets/Nova pasta/Curso Técnico em Comunicação Visual.png";
import cursoAutomacao from "@/assets/Nova pasta/Curso de Qualificação Profissional em Automação Residencial e Robótica.png";
import cursoEletricista from "@/assets/Nova pasta/Curso Livre de Eletricista Instalador.png";
import cursoExcel from "@/assets/Nova pasta/Curso de Informatica básica - Excel.png";

export const SITE_URL = "https://feira-das-profissoes.lovable.app";

export const EVENT = {
  name: "6ª Feira das Profissões FREI",
  organizer: "Instituto Social Nossa Senhora de Fátima",
  dateLabel: "19 de setembro de 2026",
  timeLabel: "das 9h às 16h",
  startDate: "2026-09-19T09:00:00-03:00",
  endDate: "2026-09-19T16:00:00-03:00",
  address: {
    street: "Av. Cel. Octaviano de Freitas Costa, 463",
    district: "Veleiros",
    city: "São Paulo",
    state: "SP",
    zip: "04773-000",
  },
  phoneWhatsapp: "+5511963986252",
  phoneOffice: "+551137985037",
  instagram: "https://www.instagram.com/institutonsfatima",
} as const;

export const FULL_ADDRESS =
  "Av. Cel. Octaviano de Freitas Costa, 463 — Veleiros, São Paulo/SP, 04773-000";

export const NAV_LINKS = [
  { to: "/", label: "Início" },
  { to: "/programacao", label: "Programação" },
  { to: "/cursos", label: "Cursos" },
  { to: "/expositores", label: "Mostras dos cursos" },
  { to: "/instituicao", label: "Instituição" },
  { to: "/parceiros", label: "Parceiros" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
] as const;

export interface CourseInfo {
  slug: string;
  title: string;
  short: string;
  description: string;
  hours: string;
  duration: string;
  image: string;
  topics: string[];
}

export const COURSES: CourseInfo[] = [
  {
    slug: "comunicacao-visual",
    title: "Curso Técnico em Comunicação Visual",
    short: "Design, criatividade e comunicação.",
    description: "Formação técnica para criar peças visuais, materiais gráficos e projetos de comunicação com ferramentas e práticas do mercado.",
    hours: "880 horas",
    duration: "1 ano — Segunda à sexta",
    image: cursoComunicacaoVisual,
    topics: ["Design gráfico", "Comunicação visual", "Criação de peças", "Ferramentas digitais"],
  },
  {
    slug: "automacao-robotica",
    title: "Curso de Qualificação Profissional em Automação Residencial e Robótica",
    short: "Automação, sensores e projetos de robótica.",
    description: "Qualificação prática para conhecer automação residencial, componentes eletrônicos, sensores e projetos de robótica.",
    hours: "880 horas",
    duration: "1 ano — Segunda à sexta",
    image: cursoAutomacao,
    topics: ["Automação residencial", "Robótica", "Sensores", "Projetos práticos"],
  },
  {
    slug: "informatica-basica-excel",
    title: "Curso Livre de Informática Básica – Excel Avançado",
    short: "Informática para o dia a dia e Excel avançado.",
    description: "Curso livre para desenvolver segurança no uso do computador e aplicar recursos avançados do Excel em situações reais.",
    hours: "120 horas",
    duration: "5 meses — Segunda, quarta e quinta",
    image: cursoExcel,
    topics: ["Informática básica", "Planilhas", "Excel avançado", "Produtividade"],
  },
  {
    slug: "eletricista-instalador",
    title: "Curso Livre de Eletricista Instalador",
    short: "Instalações elétricas e segurança.",
    description: "Curso livre com fundamentos de instalações elétricas, leitura de circuitos e práticas de segurança.",
    hours: "120 horas",
    duration: "5 meses — Segunda e quinta",
    image: cursoEletricista,
    topics: ["Instalações elétricas", "Circuitos", "Segurança", "Prática profissional"],
  },
  {
    slug: "informatica",
    title: "Curso Técnico de Informática",
    short: "TI, Programação e Criação de Sites.",
    description:
      "Formação técnica completa em tecnologia da informação, com lógica de programação, desenvolvimento web, banco de dados, redes e noções de cibersegurança.",
    hours: "1.000h",
    duration: "1 ano — Segunda à sexta",
    image: cursoInformatica,
    topics: ["Lógica de programação", "Desenvolvimento web", "Banco de dados", "Redes e segurança"],
  },
  {
    slug: "ingles",
    title: "Curso Livre de Inglês Básico ao Pré-Intermediário",
    short: "Comunicação, gramática e conversação.",
    description:
      "Do básico ao pré-intermediário em um ano superintensivo, com foco em conversação, compreensão auditiva e inglês aplicado ao mercado de trabalho.",
    hours: "400h",
    duration: "1 ano superintensivo — Segunda a sexta",
    image: cursoIngles,
    topics: ["Conversação", "Gramática aplicada", "Listening", "Inglês profissional"],
  },
  {
    slug: "eletromecanica",
    title: "Curso de Qualificação Profissional em Eletromecânica de Autos",
    short: "Elétrica automotiva, mecânica e diagnóstico.",
    description:
      "Prática em oficina-escola com motores, sistemas elétricos, injeção eletrônica e diagnóstico com equipamentos usados no mercado automotivo.",
    hours: "880h",
    duration: "1 ano — Segunda à sexta",
    image: cursoEletromecanica,
    topics: ["Motores", "Elétrica automotiva", "Injeção eletrônica", "Diagnóstico"],
  },
  {
    slug: "administracao",
    title: "Curso Técnico em Administração",
    short: "Estoques, RH, logística e marketing.",
    description:
      "Formação em rotinas administrativas, gestão de pessoas, controle de estoques, logística, legislação e marketing para o primeiro emprego.",
    hours: "1.000h",
    duration: "1 ano — Segunda à sexta",
    image: cursoAdministracao,
    topics: ["Rotinas administrativas", "Gestão de pessoas", "Logística", "Marketing"],
  },
];

export interface ScheduleSlot {
  time: string;
  title: string;
  place: string;
  description: string;
  track: "Palestra" | "Oficina" | "Visita" | "Institucional";
}

export const AGENDA: ScheduleSlot[] = [
  {
    time: "09:00",
    title: "Abertura oficial da 6ª Feira das Profissões",
    place: "Auditório",
    description: "Boas-vindas da direção do Instituto e apresentação do roteiro do dia.",
    track: "Institucional",
  },
  {
    time: "09:30",
    title: "Palestra: Primeiro emprego e mercado de trabalho",
    place: "Auditório",
    description: "Como se preparar para processos seletivos, currículo e entrevistas.",
    track: "Palestra",
  },
  {
    time: "10:00",
    title: "Oficina de robótica e automação",
    place: "Sala 2",
    description: "Demonstração prática de sistemas elétricos e projetos dos alunos.",
    track: "Oficina",
  },
  {
    time: "10:30",
    title: "Oficina de cibersegurança e redes",
    place: "Sala 25",
    description: "Simulação de ataques simples e boas práticas de proteção digital.",
    track: "Oficina",
  },
  {
    time: "11:00",
    title: "Oficina de desenvolvimento de software",
    place: "Sala 26",
    description: "Construa sua primeira página web com a turma de Informática.",
    track: "Oficina",
  },
  {
    time: "13:00",
    title: "Visita guiada à oficina de Eletromecânica",
    place: "Sala 3",
    description: "Estrutura de automóveis, engrenagens e diagnóstico ao vivo.",
    track: "Visita",
  },
  {
    time: "14:00",
    title: "Palestra: Carreira em Administração e Logística",
    place: "Sala 27",
    description: "Rotinas, legislação e oportunidades no setor administrativo.",
    track: "Palestra",
  },
  {
    time: "14:30",
    title: "Oficina de Comunicação Visual",
    place: "Sala 24",
    description: "CorelDraw, Photoshop e caricaturas feitas na hora.",
    track: "Oficina",
  },
  {
    time: "15:30",
    title: "Sorteio de brindes e encerramento",
    place: "Auditório",
    description: "Sorteio entre os inscritos presentes e entrega de certificados de participação.",
    track: "Institucional",
  },
];

export interface Speaker {
  name: string;
  role: string;
  topic: string;
  initials: string;
}

/** Conteúdo provisório — substituir pelos palestrantes confirmados. */
export const SPEAKERS: Speaker[] = [
  {
    name: "Ricardo Hessel de Araújo",
    role: "Ex-aluno do Instituto — Analista de Sistemas",
    topic: "Do Frei ao mercado de tecnologia",
    initials: "RA",
  },
  {
    name: "Ana Paula Moreira",
    role: "Coordenadora de RH — empresa parceira",
    topic: "Primeiro emprego: o que as empresas procuram",
    initials: "AM",
  },
  {
    name: "Carlos Eduardo Lima",
    role: "Mecânico-chefe — oficina parceira",
    topic: "Eletromecânica na prática",
    initials: "CL",
  },
  {
    name: "Juliana Freitas",
    role: "Designer e professora de Comunicação Visual",
    topic: "Criatividade como profissão",
    initials: "JF",
  },
];

export interface Exhibitor {
  name: string;
  segment: string;
  booth: string;
  description: string;
}

/** Conteúdo provisório — substituir pela lista oficial de expositores. */
export const EXHIBITORS: Exhibitor[] = [
  {
    name: "PWI Sistemas",
    segment: "Tecnologia",
    booth: "Estande 01 — Pátio",
    description: "Vagas de estágio em suporte e desenvolvimento, além de bate-papo sobre carreira em TI.",
  },
  {
    name: "MWM",
    segment: "Indústria",
    booth: "Estande 02 — Pátio",
    description: "Programas de aprendizagem industrial e demonstração de motores.",
  },
  {
    name: "CM Comandos Lineares",
    segment: "Automação",
    booth: "Estande 03 — Pátio",
    description: "Automação industrial, componentes lineares e oportunidades técnicas.",
  },
  {
    name: "Viação Grajaú",
    segment: "Transporte",
    booth: "Estande 04 — Entrada",
    description: "Manutenção de frota, logística e processos seletivos abertos.",
  },
  {
    name: "Casa da Mulher Paulistana",
    segment: "Serviços públicos",
    booth: "Estande 05 — Entrada",
    description: "Orientação profissional, capacitação e serviços de apoio.",
  },
  {
    name: "Assistência Social — Cidade de São Paulo",
    segment: "Serviços públicos",
    booth: "Estande 06 — Entrada",
    description: "Programas sociais, CadÚnico e encaminhamento para cursos gratuitos.",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

/** Conteúdo provisório — substituir por depoimentos reais coletados. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Conheci o Instituto na Feira das Profissões e hoje trabalho na área de tecnologia. Foi o dia que mudou o rumo da minha carreira.",
    name: "Ricardo Hessel de Araújo",
    role: "Ex-aluno de Informática",
  },
  {
    quote:
      "Levei minha filha para conhecer os cursos e saímos com a matrícula feita. A equipe explicou tudo com muita atenção.",
    name: "Marta Souza",
    role: "Mãe de aluna",
  },
  {
    quote:
      "As oficinas práticas mostram a profissão de verdade. Os alunos saem daqui prontos para o mercado.",
    name: "Carlos Eduardo Lima",
    role: "Empresa parceira",
  },
];

export const STATS = [
  { value: "55", label: "anos de história", detail: "Fundado em 1971 por Frei Xavier" },
  { value: "+20 mil", label: "alunos formados", detail: "Gerações transformadas pela educação" },
  { value: "8", label: "cursos gratuitos", detail: "Técnicos, de qualificação e livres" },
  { value: "6ª", label: "edição da feira", detail: "Evento aberto a toda a comunidade" },
];

export const CERTIFICATIONS = [
  "Certificado de participação na feira para inscritos presentes",
  "Cursos técnicos com certificação reconhecida pelo mercado",
  "Instituição sem fins lucrativos com atuação social desde 1971",
  "Parceria com a Secretaria de Assistência Social da Cidade de São Paulo",
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "A Feira das Profissões é gratuita?",
    answer:
      "Sim. A entrada, as palestras, as oficinas e as visitas guiadas são totalmente gratuitas e abertas à comunidade.",
  },
  {
    question: "Preciso me inscrever para participar?",
    answer:
      "A inscrição não é obrigatória, mas é recomendada: ela garante seu certificado de participação, agiliza a entrada e habilita você para o sorteio de brindes.",
  },
  {
    question: "Qual é a idade mínima para participar?",
    answer:
      "Não há idade mínima para visitar a feira. Menores de 16 anos devem estar acompanhados de um responsável.",
  },
  {
    question: "Posso me matricular em um curso no dia do evento?",
    answer:
      "Sim. A secretaria fica aberta durante todo o evento para tirar dúvidas, informar a documentação necessária e realizar matrículas.",
  },
  {
    question: "Como chego ao Instituto?",
    answer: `O Instituto fica na ${FULL_ADDRESS}. Há linhas de ônibus com parada próxima e o mapa interativo está disponível na página de Contato.`,
  },
  {
    question: "Empresas podem expor na feira?",
    answer:
      "Sim. Empresas interessadas em montar estande ou oferecer vagas podem falar com a secretaria pelo WhatsApp ou pelo formulário de contato.",
  },
  {
    question: "Vai ter estacionamento e acessibilidade?",
    answer:
      "O Instituto conta com acesso adaptado para cadeirantes. O estacionamento é limitado, por isso recomendamos transporte público ou aplicativo.",
  },
];

export const BENEFITS = [
  "Material informativo dos cursos",
  "Contato com empresas parceiras",
  "Palestras com profissionais de sucesso",
  "Concorrer a brindes exclusivos",
  "Visitação completa às instalações",
  "Networking com especialistas",
];
