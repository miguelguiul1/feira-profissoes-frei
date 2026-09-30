# Frei Careers Hub

# 📄 PRODUCT REQUIREMENTS DOCUMENT (PRD v1.1)

## Projeto: Landing Page Institucional - 6ª Feira das Profissões FREI

---

## 1. CONTEXTO / PROPÓSITO

* **Objetivo:** Criar a landing page oficial e responsiva da 6ª Feira das Profissões do Instituto Social Nossa Senhora de Fátima (FREI). O site centraliza a apresentação dos cursos, programação por salas, história do instituto, galeria de edições anteriores, parceiros, mapa de localização, formulário de inscrição de participantes e modal de acesso administrativo.

* **Público-Alvo:** Estudantes de ensino fundamental e médio, jovens em busca de formação técnica, encarregados de educação, parceiros corporativos e a comunidade local.

* **Tom de Voz:** Inspirador, acolhedor, profissional, educacional e moderno.

---

## 2. DIRETRIZES DE LAYOUT E DESIGN SYSTEM

* **Paleta de Cores Oficial:**

  * **Azul Principal (Brand / CTA):** `#042A7E` / `#0B2567`

  * **Azul Claro (Fundo de Destaque):** `#E3F2FD` / `#DDF0FF`

  * **Fundo Neutro / Cards:** `#FFFFFF` e `#F8F9FA`

  * **Texto Principal:** `#1A202C` / `#042A7E` / `#FFFFFF` (em fundos azuis)

* **Tipografia:** Sans-serif moderna (Inter, Poppins ou Plus Jakarta Sans).

* **Estilo Visual dos Componentes:**

  * Cards com cantos bem arredondados (`border-radius: 16px` a `24px`).

  * Sombras suaves (*soft drop shadows*) em cards sobre fundo claro.

  * Molduras e botões em formato pílula (*pill buttons*).

  * Efeito *Glassmorphism* (vidro fosco translúcido) no modal administrativo.

* **Responsividade:** Mobile-First rigoroso (Mobile, Tablet e Desktop 4K).

* **Estados da Interface:** Implementação obrigatória de estados visíveis (`default`, `hover`, `focus`, `active`, `disabled`, `loading`).

---

## 3. ESTRUTURA COMPLETA DA PÁGINA (SEÇÕES DO FIGMA)

### 3.1. Header / Navegação (Sticky Navbar)

* **Esquerda:** Logótipo oficial do Instituto / Feira das Profissões.

* **Centro (Menu de Navegação):** Links com rolagem suave (smooth scroll): `Início`, `Programação`, `Cursos`, `Inscrição`, `Contato`.

* **Direita (Botão Especial):** Botão estilo pílula azul escuro `Administrativo` (Gatilho para o modal de login).

### 3.2. Carrossel Hero (Banner Principal de Destaques)

* **Slide 1 - Chamada Principal:**

  * **H1:** "Participe da 6ª Feira das Profissões do Frei"

  * **Subtítulo:** "Descubra hoje a profissão do seu amanhã!"

  * **Imagem:** Foto dos alunos com projeto de robótica.

  * **Botões CTA:** `Fazer Inscrição` (Azul escuro preenchido) e `Programação` (Branco/Outlined).

* **Slide 2 - Nossos Parceiros (Resumo):**

  * Fundo azul escuro em gradiente com logos de parceiros + Botão `Lista completa`.

* **Slide 3 - Depoimentos:**

  * Fundo azul claro. Card com foto e citação do ex-aluno *Ricardo Hessel de Araújo (Ex-aluno de Informática, 2006 - Diretor Executivo no BTG Pactual)* + Botão `Mais Depoimentos`.

* **Indicadores:** Pontos de paginação (`. . .`) na parte inferior.

### 3.3. O Nosso Instituto & Estrutura

* **Título:** "O nosso Instituto" | Subtítulo: "Muito mais que uma escola"

* **Card Histórico:** Texto sobre os 50+ anos do Instituto Social Nossa Senhora de Fátima (fundado em 1971 pelo Frei Xavier).

* **Card Idealizador:** Foto e citação de *Ambrogio Fornasieiro, OFM / Frei Xavier (1930 – 2026)*.

* **Bloco Estrutura:** 3 cards com ícone e texto:

  1. 🏫 **Salas estruturadas**

  2. 💻 **Laboratórios de Informática**

  3. 📽️ **Auditório para uso**

### 3.4. Nossos Cursos (Carrossel Horizontal)

* Cards brancos detalhados com foto, título, descrição, carga horária e duração:

  1. **Curso Técnico de Informática:** TI, Programação, Criação de Sites (1.000h | 1 ano - segunda a sexta).

  2. **Curso Livre de Inglês Básico ao Pré-Intermediário:** Comunicação, Gramática e Conversação (400h | 1 ano superintensivo).

  3. **Eletromecânica de Autos:** Elétrica Automotiva, Mecânica, Diagnóstico (880h | 1 ano - segunda a sexta).

  4. **Curso Técnico em Administração:** Estoques, RH, Logística, Marketing e Contabilidade (1.000h | 1 ano - segunda a sexta).

### 3.5. Por que participar da Feira? & Banner Institucional

* **Grid 3x2 de Cards Brancos com Ícones Azuis:**

  1. 🎓 **Conheça os cursos:** Explore as formações oferecidas.

  2. 🔬 **Experimente na prática:** Veja projetos reais e robótica.

  3. 🗣️ **Converse com especialistas:** Tire dúvidas com professores e alunos.

  4. 🤝 **Crie conexões:** Networking com pessoas de tecnologia e inovação.

  5. 🚀 **Prepare seu futuro:** Oportunidades de aprendizado profissional.

  6. 🎯 **Descubra seu caminho:** Encontre a área que combina com os teus objetivos.

* **Banner de Tradição:** Card branco horizontal com imagem da equipa: *"Tradição que atravessa gerações! 55 anos de inúmeras histórias de sucesso!"*.

### 3.6. Programação da Feira (Timeline) & Como Chegar

* **Timeline Vertical (Esquerda):**

  * 💻 **Informática:** Sala 25 (Cibersegurança, Redes) | Sala 26 (Dev Software, Banco de Dados)

  * 👤 **Administração:** Sala 27 (Logística, Legislação)

  * 🎨 **Comunicação Visual:** Sala 24 (CorelDraw, Photoshop, Caricaturas)

  * 🔧 **Eletromecânica de Autos:** Sala 3 (Estrutura de automóveis, engrenagens)

  * 🤖 **Robótica:** Sala 2 (Sistemas elétricos de robótica)

* **Card "Como chegar na 6ª Feira das Profissões?" (Direita):**

  * iFrame embebido do Google Maps.

  * Badges informativos: 🎟️ Evento Gratuito | 📅 19 de Setembro de 2026 das 9h às 16h | 📍 Av. Cel. Octaviano de Freitas Costa, 463 Veleiros - SP 04773-000.

### 3.7. Formulário de Inscrição & Benefícios

* **Formulário de Inscrição:** Card semi-transparente sobre foto de fundo com os campos: `Nome Completo*`, `Telefone*`, `E-mail*`, `Escolaridade*`, `Já foi aluno do Frei?*`, `Interesse em algum dos cursos?*`, `Como ficou sabendo da feira?`, `Previsão de chegada à feira`. Botão `Enviar`.

* **Card "O que você ganha":** Checklist com 6 itens (Material informativo, Palestras, Visitação às instalações, Contato com empresas parceiras, Brindes exclusivos, Networking com especialistas).

### 3.8. Galeria "Nossa última Feira" & "Nossos Parceiros"

* **Galeria:** Fundo azul escuro com 5 cards/fotos em moldura branca destacando edições anteriores.

* **Grid de Parceiros:** 6 cards brancos arredondados com logótipos (*Viação Grajaú*, *PWI Sistemas*, *CM Comandos Lineares*, *MWM*, *Casa da Mulher Paulistana*, *Cidade de São Paulo Assistência Social*).

### 3.9. Rodapé (Footer)

* Layout em 4 colunas em azul:

  1. Logótipo FREI + Descrição institucional da Feira de Profissões 2026.

  2. Horários e Endereço (19 de Setembro de 2026 das 9h às 16h | Av. Cel. Octaviano de Freitas Costa, 463).

  3. Links Rápidos (`Início`, `Programação`, `Cursos`, `Inscrição`, `Contato`).

  4. Contatos (`institutonsfatima`, `(11) 96398-6252 WhatsApp`, `(11) 3798-5037`).

* Linha final de Copyright: `© 2026 Todos os direitos reservados para Instituto Social Nossa Senhora de Fátima.`

---

## 4. FUNCIONALIDADE ESPECIAL: MODAL ADMINISTRATIVO (GLASSMORPHISM)

* **Gatilho de Abertura:** Clique no botão `Administrativo` no cabeçalho.

* **Visual:** Modal centralizado com desfoque de fundo (`backdrop-filter: blur(16px)`), fundo azul translúcido e cantos arredondados (`24px`).

* **Campos:**

  * `Seu e-mail de acesso` (Input underline com texto branco)

  * `Digite sua senha` (Input underline password)

* **Ações:** Botão pílula branco `Fazer Login` e botão de texto `Voltar` (para fechar).

* **Acessibilidade & Atalhos:** Fechar ao pressionar `ESC` ou clicar fora do modal. Captura de foco dentro do dialog.

---

## 5. INTEGRAÇÕES E BANCO DE DADOS (SUPABASE)

### Tabela: `inscriptions`

* `id` (uuid, primary key, default: gen_random_uuid())

* `created_at` (timestamp with time zone, default: now())

* `full_name` (text, not null)

* `phone` (text, not null)

* `email` (text, not null)

* `education_level` (text, not null)

* `is_former_student` (boolean, not null)

* `course_interest` (text, not null)

* `how_found_out` (text)

* `estimated_arrival` (text)

### Autenticação (Supabase Auth)

* Autenticação por E-mail/Senha para o modal `Administrativo`, dando acesso ao dashboard de gestão de inscritos.

---

## 6. REGRAS DO SISTEMA E RESTRIÇÕES (O QUE NÃO FAZER)

* **NÃO** criar uma página separada para o login administrativo (deve ser obrigatoriamente o Modal Glassmorphism sobreposto).

* **NÃO** permitir o envio do formulário de inscrição sem a validação prévia de e-mail e telefone.

* **NÃO** quebrar o layout no mobile — no ecrã pequeno, grids (como parceiros e benefícios) e timelines devem empilhar-se numa única coluna fluida.

* **NÃO** alterar as cores principais do tema (`#042A7E` e `#FFFFFF`).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://frei-career-fair.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c3564105-345b-4f1c-ab42-56e740722942).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
