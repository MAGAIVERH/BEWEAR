# Fase B4 — Paginação na PLP

**Data:** 2026-06-20
**Branch:** `feat/fase-b4-pagination`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Paginação na PLP (categoria) com estado na URL, preservando filtros/ordenação — pronto para catálogos grandes.

## 📋 Tarefas
- [x] **`Pagination`** (client): Prev / números / Next; estado em `?page=N`; preserva os demais params;
      some quando há 1 página (envolto em `Suspense`).
- [x] **Categoria:** após filtrar/ordenar, pagina (`PAGE_SIZE = 8`); renderiza a fatia; contagem
      "Showing X–Y of Z".
- [x] **Reset de página:** mudar filtro/ordenação volta para a página 1 (`page` removido no `ProductFilters`).
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo; build de produção.

## 🧱 Arquivos
- `src/components/common/pagination.tsx` (novo)
- `src/app/category/[slug]/page.tsx` (paginação)
- `src/components/common/product-filters.tsx` (reset de página)

## 🧩 Decisões & aprendizados
- Paginação por página (server-side slice) com estado na URL — compartilhável e com histórico.
- `PAGE_SIZE = 8` (valor de produção). Com o catálogo atual (~4 por categoria) há **1 página** — os controles
  aparecem automaticamente quando a categoria passa de 8 produtos (fácil de demonstrar baixando o `PAGE_SIZE`).

## ⏭️ Próximo — Fase C–G
Performance (dynamic import, ISR, Lighthouse) · A11y/responsivo · SEO (sitemap/robots) · Testes + CI · README/demo.
</content>
