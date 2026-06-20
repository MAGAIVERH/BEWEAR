# Fase B1 — Wishlist / Favoritos

**Data:** 2026-06-20
**Branch:** `feat/fase-b1-wishlist`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Favoritos por usuário (full-stack): salvar/remover produtos, ver na página `/wishlist`, com ícone de
coração no card e na PDP. Mostra domínio de schema → migração → action → hook → UI.

## 📋 Tarefas
- [x] **Schema:** tabela `wishlist_item` (id, userId, productVariantId, createdAt) + **índice único**
      (`user_id`, `product_variant_id`). Relações com user e productVariant.
- [x] **Migração** `0002_add_wishlist_item` gerada e **aplicada** no Neon.
- [x] **Actions:** `toggleWishlist` (add/remove, valida sessão) e `getWishlist` (com productVariant+product).
- [x] **Hooks:** `useWishlist` (query) + `useToggleWishlist` (mutation, invalida cache).
- [x] **`WishlistButton`** (client): coração no card (sobre a imagem) e na PDP; otimista + toast;
      login-check (toast "Sign in to save"); `preventDefault/stopPropagation` (vive dentro do Link do card).
- [x] **Página `/wishlist`** (auth-only): grid dos favoritos + estado vazio.
- [x] **Header:** ícone de coração com **contagem** (desktop) + link "Wishlist" no menu mobile.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo; **`pnpm build` passou (15/15)**.

## 🧱 Arquivos
- `src/db/schema.ts` + `drizzle/0002_add_wishlist_item.sql`
- `src/actions/toggle-wishlist/{index,schema}.ts`, `src/actions/get-wishlist/index.ts`
- `src/hooks/queries/use-wishlist.ts`, `src/hooks/mutations/use-toggle-wishlist.ts`
- `src/components/common/wishlist-button.tsx`, `product-item.tsx`, `header-client.tsx`
- `src/app/wishlist/page.tsx`, `src/app/product-variant/[slug]/page.tsx`

## 🧩 Decisões & aprendizados
- Unicidade garantida por **índice único** no banco (não só na app).
- `useWishlist` compartilhado via TanStack cache entre todos os botões de coração (1 query).

## 🚧 Pendências
- Otimismo "puro" (optimistic update) pode ser adicionado; hoje invalida e refetch (rápido o suficiente).

## ⏭️ Próximo (Fase B)
- **B2 Reviews & ratings**, **B5 Conta completa** (endereços CRUD + `/my-orders/[id]`),
  **B3 Estoque por tamanho**, **B4 Paginação**.
</content>
