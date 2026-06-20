# Fase B2 — Reviews & ratings

**Data:** 2026-06-20
**Branch:** `feat/fase-b2-reviews`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Avaliações por produto (estrelas + comentário), com média na PDP — "cara de marketplace grande" + SEO.

## 📋 Tarefas
- [x] **Schema:** tabela `review` (userId, productId, rating 1–5, comment, createdAt) + **índice único**
      (user, product). Migração `0003_add_review` **aplicada**.
- [x] **Action:** `createReview` (upsert: cria ou atualiza a avaliação do usuário no produto).
- [x] **`StarRating`** (display) e **`ReviewForm`** (RHF + Zod, estrelas interativas com hover, textarea).
- [x] **`ProductReviews`** (server): média + contagem + form + lista de avaliações (nome, estrelas, data).
- [x] **PDP:** estrelas + "N reviews" (âncora) sob o preço; seção de reviews; **`aggregateRating` no JSON-LD**.
- [x] Login-guard: sem sessão, o form mostra "Sign in to write a review".
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo; build de produção.

## 🧱 Arquivos
- `src/db/schema.ts` + `drizzle/0003_add_review.sql`
- `src/actions/create-review/{index,schema}.ts`
- `src/components/common/star-rating.tsx`
- `src/app/product-variant/[slug]/components/{review-form,product-reviews}.tsx`
- `src/app/product-variant/[slug]/page.tsx`

## 🧩 Decisões & aprendizados
- Review é por **produto** (não variante). Upsert garante 1 review por usuário/produto (índice único).
- Form usa `router.refresh()` após enviar para re-renderizar o server component (lista/média atualizadas).

## 🚧 Pendências
- Estrelas no **card** (PLP/home) exigiriam agregação de rating nas queries de produto — futuro (Fase C/D).

## ⏭️ Próximo (Fase B)
- **B3 Estoque por tamanho** (migração) · **B4 Paginação** (sem migração).
</content>
