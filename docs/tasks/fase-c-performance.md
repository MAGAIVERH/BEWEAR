# Fase C — Performance

**Data:** 2026-06-21
**Fase:** Fase C — Performance
**Branch:** `feat/fase-c-performance`
**Status:** 🚧 em andamento (código pronto; Lighthouse a rodar pelo usuário)

---

## 🎯 Objetivo

Elevar a performance ao nível internacional (Lighthouse 90+, LCP/CLS controlados) via
code-splitting, otimização de imagens, ISR/cache de catálogo e streaming com Suspense — sem
regressão visual.

## 📋 Tarefas

- [x] **Dynamic import** de componente client pesado fora da dobra (`ImpactSection` na home).
- [x] Auditar `next/image`: `sizes`/`priority` revisados + `placeholder="blur"` em todas as
      imagens raster (helper `BLUR_DATA_URL`) + AVIF/WebP no `next.config.ts`.
- [x] **ISR/revalidate** no catálogo: home com `revalidate = 3600`; PLP/PDP com leituras de
      catálogo cacheadas em `src/db/queries.ts` (`unstable_cache`, tag `catalog`).
- [x] **Streaming + Suspense**: `loading.tsx` em home/PDP/search; "You might also like" da PDP
      em `<Suspense>` com skeleton; `ProductRailSkeleton` reutilizável.
- [x] Consultas paralelizadas com `Promise.all` (home e PDP).
- [x] **Bundle analysis**: `@next/bundle-analyzer` + script `pnpm analyze`.
- [x] `docs/performance.md` com metas, snapshot do build e guia de medição.
- [ ] Rodar Lighthouse (build de produção) e preencher a tabela em `docs/performance.md`.

## 🧱 Arquivos tocados

- `src/helpers/image.ts` (novo — `BLUR_DATA_URL`)
- `src/db/queries.ts` (novo — leituras de catálogo cacheadas)
- `src/components/common/product-rail-skeleton.tsx` (novo)
- `src/app/loading.tsx`, `src/app/search/loading.tsx`,
  `src/app/product-variant/[slug]/loading.tsx` (novos)
- `src/app/product-variant/[slug]/components/related-products.tsx` (novo)
- `src/app/page.tsx`, `src/app/category/[slug]/page.tsx`,
  `src/app/product-variant/[slug]/page.tsx` (ISR/cache/streaming)
- `next.config.ts` (AVIF/WebP + bundle-analyzer), `package.json` (script `analyze`)
- Componentes com `placeholder="blur"`: `hero`, `impact-section`, `editorial-banner`,
  `campaign-grid`, `feature-cards`, `split-editorial`, `trending-section`, `product-item`,
  `product-gallery`, `variant-selector`, `cart-item`, `cart-summary`, `my-orders/order`,
  `my-orders/[id]/page`
- `docs/performance.md` (novo)

## 🎨 Notas de design (Nike)

Blur placeholder neutro (tom do `--muted`) suaviza o carregamento sem CLS; nenhum impacto
visual no resultado final. Skeletons seguem o espaçamento dos rails/grids reais.

## ✅ Critério de Done

- [x] `npx tsc --noEmit` sem erros
- [x] `pnpm lint` limpo **nos arquivos da fase** (erros restantes são pré-existentes em
      `components/ui/*` e `lib/*` — fora do escopo)
- [x] `pnpm build` passa; home marcada como **Static + ISR (Revalidate 1h)**
- [ ] Relatório Lighthouse salvo (LCP/CLS controlados) — depende de rodar localmente

## 🧩 Decisões & aprendizados

- Convertemos assets fisicamente? **Não** — o `next/image` já serve AVIF/WebP otimizado; decisão
  do usuário (confiar no pipeline). PNGs órfãos (`banner01/02`) mantidos (não removidos sem ordem).
- PLP/PDP permanecem dinâmicas por design (filtros na URL / sessão); o ganho vem do cache das
  queries de catálogo, não de torná-las estáticas.
- Lint do repositório tem erros pré-existentes de `simple-import-sort` em arquivos shadcn/`lib`
  (não tocados nesta fase). `eslint.ignoreDuringBuilds` está ligado, então o build não quebra.

## 🚧 Bloqueios / pendências

- Rodar Lighthouse (`pnpm build && pnpm start` + DevTools/CLI) e preencher a tabela de resultados.
- (Opcional) Limpar os erros de lint pré-existentes em `components/ui/*` e `lib/*` num chore à parte.

## ⏭️ Próximo passo

Fase D — Acessibilidade & responsividade.
