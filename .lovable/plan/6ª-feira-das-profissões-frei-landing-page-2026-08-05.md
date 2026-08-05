# 6ª Feira das Profissões FREI — Landing Page

Landing page institucional em português, mobile-first, com formulário de inscrição gravado no Lovable Cloud e área administrativa protegida.

## Identidade visual

- Azul principal `#042A7E` / `#0B2567`, azul claro de destaque `#E3F2FD` / `#DDF0FF`, neutros `#FFFFFF` / `#F8F9FA`, texto `#1A202C`.
- Tipografia Plus Jakarta Sans (títulos) + Inter (corpo), carregadas via `<link>` no root.
- Cards com raio 16–24px, sombras suaves, botões pílula, glassmorphism no modal admin.
- Todos os tokens vão para `src/styles.css`; nenhuma cor fixa nos componentes.
- Logótipo enviado é usado no header e rodapé. Demais imagens (alunos, robótica, galeria, parceiros) ficam como placeholders neutros com proporção correta, prontos para troca.

## Seções da página (`/`)

1. **Header sticky** — logo, menu com smooth scroll (Início, Programação, Cursos, Inscrição, Contato), botão pílula "Administrativo", menu hambúrguer no mobile.
2. **Carrossel hero** — 3 slides (chamada principal com 2 CTAs; parceiros em gradiente azul; depoimento do Ricardo Hessel de Araújo), autoplay, indicadores em pontos.
3. **O nosso Instituto** — card histórico (fundado em 1971, Frei Xavier), card idealizador, 3 cards de estrutura (salas, laboratórios, auditório).
4. **Nossos Cursos** — carrossel horizontal com os 4 cursos (Informática, Inglês, Eletromecânica de Autos, Administração) com carga horária e duração.
5. **Por que participar** — grid 3x2 de benefícios + banner "Tradição que atravessa gerações! 55 anos".
6. **Programação + Como chegar** — timeline vertical das 5 áreas/salas e card com Google Maps embutido, badges de gratuidade, data (19/09/2026, 9h–16h) e endereço.
7. **Inscrição + O que você ganha** — formulário sobre foto de fundo e checklist de 6 benefícios.
8. **Galeria "Nossa última Feira"** (fundo azul, 5 molduras) e **grid de 6 parceiros**.
9. **Rodapé azul** em 4 colunas + linha de copyright.

## Formulário de inscrição

Campos: nome completo*, telefone*, e-mail*, escolaridade*, já foi aluno*, interesse em curso*, como soube da feira, previsão de chegada.
Validação com Zod + react-hook-form (e-mail válido, telefone BR formatado, limites de tamanho), estados de loading/sucesso/erro e toast de confirmação. Envio bloqueado enquanto inválido.

## Modal administrativo

Diálogo sobreposto (sem página própria) com blur de fundo, inputs underline, botões "Fazer Login" e "Voltar". Fecha com ESC ou clique fora, com foco preso no diálogo. Autenticação por e-mail/senha; após login redireciona ao dashboard.

## Dashboard de inscritos (`/admin`, protegido)

Rota autenticada com tabela de inscrições: busca por nome/e-mail, ordenação por data, contagem total, exportação CSV e botão de sair. Sem cadastro público — contas criadas por convite/manual.

## Backend (Lovable Cloud)

- Ativar o Cloud.
- Tabela `inscriptions` com os campos do PRD, RLS ativa: inserção pública permitida (formulário), leitura apenas para usuários autenticados; grants correspondentes.
- Leitura das inscrições via server function autenticada.

## Detalhes técnicos

- TanStack Start: página única em `src/routes/index.tsx`, dashboard em `src/routes/_authenticated/admin.tsx`, rota `/auth` mínima apenas como destino de guarda (o login real é o modal).
- Componentes divididos em `src/components/landing/*` para manter arquivos pequenos.
- Carrosséis com embla-carousel (já disponível via shadcn).
- SEO: `head()` próprio no index com título, descrição, og/twitter em português; H1 único; alt text; JSON-LD de `Event` com data, local e organizador.
