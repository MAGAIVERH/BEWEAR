# Dia 09 — PLP responsiva (Fase 2: Listagem & categorias)

**Data:** 2026-06-19
**Fase:** Fase 2 — Listagem & categorias
**Branch:** `feat/fase-2-plp`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Tornar a página de categoria (PLP) elegante e responsiva: cabeçalho com eyebrow + título + contagem,
grid desktop, skeleton de carregamento e estado vazio.

## 📋 Tarefas
- [x] Cabeçalho de categoria: `text-eyebrow-brand` "Category" + `<h1>` + contagem de produtos.
- [x] Grid responsivo `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` com `ProductItem`.
- [x] **Estado vazio** ("No products yet") quando a categoria não tem produtos.
- [x] **Skeleton de loading** (`loading.tsx`) com placeholders animados (header + grid).
- [x] Footer adicionado à PLP (consistência com as demais páginas).
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo.

## 🧱 Arquivos tocados
- `src/app/category/[slug]/page.tsx` (cabeçalho + grid + estado vazio + footer)
- `src/app/category/[slug]/loading.tsx` (novo — skeleton)

## 🎨 Notas de design (Nike)
- Cabeçalho editorial com eyebrow de marca; contagem dá contexto sem poluir.
- Skeleton coerente com o card real (`aspect-square rounded-3xl`) para transição suave, sem "tela branca".

## ✅ Critério de Done
- [x] PLP elegante em mobile e desktop (2→3→4 colunas)
- [x] Skeleton durante navegação; estado vazio tratado
- [x] `tsc --noEmit` 0 erros; lint limpo

## 🧩 Decisões & aprendizados
- `categoryTable` não tem coluna `description` (só `name`/`slug`), então o subtítulo usa a **contagem de
  produtos** em vez de descrição.
- Usei o `loading.tsx` do App Router (Suspense automático) para o skeleton — idiomático no Next 15.

## 🚧 Bloqueios / pendências
- **Filtros e ordenação** (tamanho, cor, preço, "Featured/Price/Newest") → Dia 10.
- **Busca** → Dia 11.

## ⏭️ Próximo passo
**Dia 10 — Filtros & ordenação:** sidebar/sheet de filtros + ordenação, com estado na URL (`searchParams`).
</content>
