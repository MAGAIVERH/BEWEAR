# Dia 11 — Busca

**Data:** 2026-06-20
**Fase:** Fase 2 — Listagem & categorias
**Branch:** `feat/fase-2-search`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Permitir buscar produtos por nome/descrição: input no header (desktop + menu mobile) e página de
resultados com estados vazios.

## 📋 Tarefas
- [x] `SearchBar` (client): input com ícone; submit navega para `/search?q=...` (encoded).
- [x] Página `/search` (server): lê `q` de `searchParams` (awaited), busca com `ilike` em
      `name` OR `description`, grid responsivo de `ProductItem`.
- [x] Estados: sem query ("Search the store") e sem resultados ("No results found").
- [x] Header: busca no **desktop** (lado direito) e no topo do **menu mobile**.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo.

## 🧱 Arquivos tocados
- `src/components/common/search-bar.tsx` (novo)
- `src/app/search/page.tsx` (nova rota)
- `src/components/common/header.tsx` (search desktop + mobile)

## 🎨 Notas de design (Nike)
- Campo de busca arredondado com ícone, discreto no header; resultados na mesma linguagem editorial
  (eyebrow + título + contagem) e grid consistente com a PLP.

## ✅ Critério de Done
- [x] Busca retorna resultados relevantes (nome/descrição)
- [x] Estados vazios tratados; funciona em mobile e desktop
- [x] `tsc --noEmit` 0 erros; lint limpo

## 🧩 Decisões & aprendizados
- Busca via `ilike` (case-insensitive) direto na página (server component), padrão consistente com
  home/category. Catálogo pequeno → simples e suficiente.

## 🚧 Bloqueios / pendências
- Sugestões/autocomplete e busca semântica podem vir como evolução futura.

## ⏭️ Próximo passo
**Fase 3 — Dia 12: Galeria da PDP** (imagem principal + thumbnails, zoom/hover, layout desktop 2 colunas).
</content>
