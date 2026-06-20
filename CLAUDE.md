# CLAUDE.md — BEWEAR

E-commerce de moda/streetwear **para o mercado dos EUA** (produto **100% em inglês, en-US, USD**).
Meta de qualidade de front-end: **nível Nike** (https://www.nike.com) — tipografia, espaçamento,
efeitos, interatividade e polimento que demonstrem domínio de front-end.

## Antes de qualquer tarefa
1. Leia as **regras completas** em `.cursor/rules/bewear.mdc` (fonte de verdade).
2. Consulte o **roadmap** em `docs/guia-desenvolvimento-bewear.md`.
3. Crie/atualize o **arquivo do dia** em `docs/tasks/dia-NN-descricao.md` (base: `docs/tasks/_template.md`).

## Stack (real — não inventar)
Next.js 15 (App Router) · React 19 · TypeScript strict · **Drizzle ORM + Postgres/Neon** (não Prisma) ·
Tailwind v4 · **shadcn/ui** · lucide-react · Zod · React Hook Form · **TanStack Query** ·
Better Auth · Stripe · Sonner · **pnpm**.

## Regras de ouro
- **Idioma:** código em inglês; **UI/copy/seed em inglês (en-US)**; moeda **USD ($)**, valores em **centavos**
  (formatar com `formatCentsToUSD` em `@/helpers/money`). Migrar conteúdo pt-BR/BRL existente → en-US/USD.
- **Visual:** light/editorial nível Nike. **Sem cor hardcoded** — só tokens de `src/app/globals.css`.
- **shadcn ao máximo** (`@/components/ui`); estender com `className` + `cn()`.
- **Arquitetura real:** Server Components leem do `db` (`@/db`); mutações em `src/actions/<nome>/`
  (`index.ts` + `schema.ts`); client usa **TanStack Query** (`src/hooks/queries|mutations`).
  Sem `modules/`. Sem `fetch` cru no client.
- **Formulários:** sempre React Hook Form + zodResolver + shadcn `Form`. Nunca `useState` por campo.
- **TypeScript:** zero `any`, zero erro de compilação. Verifique (`npx tsc --noEmit` / lint) antes de entregar.
- **Feedback:** sempre Sonner toast. Nunca `alert()`.
- **Imagens:** sempre `next/image` com `alt`, `sizes` e `priority` acima da dobra.
- **Git:** Conventional Commits, branch por fase (`feat/fase-N-...`), **pnpm**.
  **Nunca** commit/push/deploy sem pedido explícito do usuário.
- **README vivo:** manter o `README.md` atualizado a cada feature/fase (estado real, stack, como rodar,
  prints/links) e produzir a **versão final** quando o projeto ficar pronto. Nunca deixar o README no
  conteúdo padrão do `create-next-app`.

## Estrutura
`src/app` (rotas) · `src/actions` (server actions) · `src/components/ui` (shadcn) ·
`src/components/common` (domínio) · `src/db` (schema/index/seed Drizzle) · `src/helpers` ·
`src/hooks/queries|mutations` · `src/lib` (auth, utils) · `src/providers` ·
`docs/` (guia + tasks) · `.cursor/rules/bewear.mdc` (regras).

## Pendências (preciso do usuário) — ver seção no fim de `.cursor/rules/bewear.mdc`
Direção de cor (preto/branco + acento?), aprovar libs de animação (framer-motion/lenis/embla),
fonte display, imagens reais, construir desktop, variáveis `.env` (Neon/Stripe/Better Auth),
deploy (Vercel) e seed em inglês.
</content>
