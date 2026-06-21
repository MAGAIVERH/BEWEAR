# Fase F — Qualidade, arquitetura & testes

**Data:** 2026-06-21
**Fase:** Fase F — Qualidade, arquitetura & testes
**Branch:** `feat/fase-f-tests-ci`
**Status:** ✅ concluído

---

## 🎯 Objetivo

Provar a qualidade do projeto com testes nos caminhos que importam, CI automatizado e a
arquitetura documentada (nível portfólio sênior).

## 📋 Tarefas

- [x] **Vitest**: config (`vitest.config.ts`, alias `@/`) + scripts `test`/`test:watch`/`typecheck`.
- [x] **Testes unitários (25, 7 arquivos, verdes):** `money`, `sizes`, `coupon`, `product-gallery`,
      `us-states`, e schemas Zod (`subscribe-newsletter`, `create-review`).
- [x] **Playwright**: config (`playwright.config.ts`, webServer = build+start) + specs `e2e/`:
      browse (home → PLP → PDP com "Add to bag") e search (resultados + estado vazio). **4 verdes.**
- [x] **CI** (`.github/workflows/ci.yml`): job `quality` (lint + typecheck + unit) sempre verde +
      job `build` (com secrets do repo). Autofix de lint aplicado ao repo (import-sort).
- [x] **Arquitetura**: `docs/architecture.md` (diagrama + fronteiras + fluxos) e ADRs em `docs/adr/`
      (Drizzle×Prisma; Server Actions+TanStack; ISR+catálogo cacheado).

## 🧱 Arquivos tocados

- `vitest.config.ts`, `playwright.config.ts` (novos)
- `src/helpers/*.test.ts` (money, sizes, coupon, product-gallery, us-states)
- `src/actions/subscribe-newsletter/schema.test.ts`, `src/actions/create-review/schema.test.ts`
- `e2e/browse.spec.ts`, `e2e/search.spec.ts`
- `.github/workflows/ci.yml`
- `docs/architecture.md`, `docs/adr/0001..0003`
- `package.json` (scripts + devdeps: vitest, @playwright/test), `.gitignore` (artefatos)
- Lint autofix em vários `src/components/ui/*` e `src/lib/*` (apenas ordenação de imports)
- `README.md` (atualização sênior)

## ✅ Critério de Done

- [x] `pnpm test` verde (25/25) · `pnpm test:e2e` verde (4/4) · `pnpm lint` e `pnpm typecheck` limpos
- [x] Arquitetura + ADRs documentados

## 🧩 Decisões & aprendizados

- **E2E contra build de produção** (não dev): o first-compile do dev estourava o timeout dos testes.
  `webServer: pnpm build && pnpm start` deixou os fluxos rápidos e determinísticos.
- **CI em dois jobs**: `quality` (sem secrets, sempre verde) separado de `build` (precisa de
  `DATABASE_URL` etc., porque o build pré-renderiza home/sitemap a partir do banco).
- Os erros "Unauthorized" no log do servidor durante E2E são da query de wishlist sem sessão
  (anônimo) — capturados no boundary; as páginas renderizam normalmente.

## 🚧 Bloqueios / pendências

- Configurar **secrets no GitHub** (`DATABASE_URL`, auth/stripe) para o job `build` (e futuros E2E em CI).

## ⏭️ Próximo passo

Fase G — Entrega & portfólio (deploy Vercel, vídeo demo, checklist final).
