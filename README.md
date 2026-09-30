# 6ª Feira das Profissões do Frei

O site da 6ª Feira das Profissões do Instituto Social Nossa Senhora de Fátima (Frei): programação, cursos, inscrição e credencial digital para os participantes.

**No ar:** https://feira-profissoes-frei.vercel.app

## O que o site resolve

Uma feira com várias salas, cursos e horários precisa de um lugar só onde o visitante descubra o que vai ver e se inscreva. O site faz isso:

- **Programação por sala e horário**, para o visitante montar o roteiro dele.
- **Cursos e mostras** de cada área técnica do instituto.
- **Inscrição online** que gera uma **credencial com QR code** para a entrada.
- **Área administrativa** para a equipe acompanhar as inscrições.
- Páginas de instituição, parceiros, expositores, FAQ e contato, com sitemap para o Google.

## Tecnologias

React, TypeScript, TanStack Start/Router, TanStack Query, Tailwind CSS, shadcn/ui e Supabase (Auth e Postgres). Deploy na Vercel.

O projeto foi construído com o Lovable. O documento de requisitos original está em [`docs/PRD.md`](docs/PRD.md).

## Rodando localmente

Precisa de Node 20+ e de um projeto no Supabase.

```bash
git clone https://github.com/miguelguiul1/feira-profissoes-frei.git
cd feira-profissoes-frei
npm install
cp .env.example .env   # preencha com a URL e a chave publicável do seu Supabase
npm run dev
```

As migrations do banco ficam em `supabase/`.

## Licença

O código está sob a licença [MIT](LICENSE). Nome, logo e fotos do instituto e dos alunos pertencem ao Instituto Social Nossa Senhora de Fátima e não fazem parte da licença.
