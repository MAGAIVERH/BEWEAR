# Dia 10 — Filtros & ordenação (PLP)

**Data:** 2026-06-19
**Fase:** Fase 2 — Listagem & categorias
**Branch:** `feat/fase-2-filters`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Permitir filtrar e ordenar produtos na PLP, com o estado refletido na **URL** (`searchParams`),
para ser compartilhável e funcionar com o histórico do navegador.

## 📋 Tarefas
- [x] Componente `ProductFilters` (client): chips de **cor**, **faixa de preço** (min/max em USD) e
      **ordenação** (Featured / Price ↑ / Price ↓ / Newest) + "Clear all".
- [x] Estado na URL via `useRouter`/`usePathname`/`useSearchParams`.
- [x] Página de categoria aplica filtros/ordenação a partir de `searchParams` **awaited** (Next 15):
      filtra por cor e faixa de preço; ordena por preço/recência.
- [x] Cores disponíveis derivadas das variantes da categoria.
- [x] Estado vazio "No products found" quando os filtros não retornam nada.
- [x] `ProductFilters` envolto em `Suspense` (boa prática com `useSearchParams`).
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo.

## 🧱 Arquivos tocados
- `src/components/common/product-filters.tsx` (novo)
- `src/app/category/[slug]/page.tsx` (filtro/ordenação + Suspense)

## 🎨 Notas de design (Nike)
- Barra de filtros limpa: chips de cor à esquerda, preço + ordenação à direita; cor ativa em
  `bg-foreground text-background`.
- Tudo via tokens; sem cores hardcoded (swatches de cor são texto, não cor de tema).

## ✅ Critério de Done
- [x] Filtrar/ordenar reflete na URL e na lista
- [x] Funciona em mobile e desktop
- [x] `tsc --noEmit` 0 erros; lint limpo

## 🧩 Decisões & aprendizados
- Filtro/ordenação aplicados em memória (catálogo pequeno) sobre os produtos da categoria; preço usa o
  da **primeira variante** (o exibido no card).
- Sem filtro de "tamanho": o schema atual de variante só tem **cor** (não há tamanho).
- Cor é single-select (toggle) para manter a URL e a UI simples.

## 🚧 Bloqueios / pendências
- **Busca** global → Dia 11.
- Filtro de cor multi-select e filtro por tamanho (se o schema ganhar tamanho) podem vir depois.

## ⏭️ Próximo passo
**Dia 11 — Busca:** busca por nome/descrição (input no header + página de resultados) com empty state.
</content>
