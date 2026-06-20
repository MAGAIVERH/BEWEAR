# Fase B3 — Estoque por tamanho (SKU)

**Data:** 2026-06-20
**Branch:** `feat/fase-b3-stock`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Disponibilidade real por **(variante × tamanho)**: tamanhos esgotados desabilitados na PDP e add-to-cart
bloqueado sem estoque — feature de e-commerce "sério".

## 📋 Tarefas
- [x] **Schema:** `product_variant_stock` (productVariantId, size, stock) + **índice único** (variant, size).
      Migração `0004` gerada e aplicada.
- [x] **Seed de estoque:** `seed-stock.ts` (popula por variante × tamanho; ~1 tamanho esgotado por variante
      para demonstrar). **333 linhas / 62 variantes** populadas. Estoque também adicionado ao `seed.ts` principal.
- [x] **PDP:** tamanhos agora vêm com `{ size, inStock }` (do estoque); **esgotados desabilitados**
      (line-through) e não selecionáveis. Auto-seleção quando só há 1 tamanho disponível.
- [x] **Add-to-cart:** validação **server-side** de estoque (`quantidade no carrinho + nova > stock` → erro
      "Not enough stock"); botão mostra a mensagem do erro.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo; build de produção.

## 🧱 Arquivos
- `src/db/schema.ts` + `drizzle/0004_add_variant_stock.sql` + `src/db/seed-stock.ts` + `src/db/seed.ts`
- `src/app/product-variant/[slug]/page.tsx` + `components/product-actions.tsx`
- `src/actions/add-cart-product/index.ts` + `components/add-to-cart-botton.tsx`

## 🧩 Decisões & aprendizados
- **Bug do drizzle-kit migrate (Neon):** a migração `0004` ficou registrada no journal sem criar a tabela;
  apliquei o SQL manualmente (CREATE TABLE/constraint/index) — tabela confirmada no banco compartilhado
  (mesmo do Vercel), então produção fica consistente.
- Estoque por SKU sem decremento na compra (reserva real fica como evolução futura — exige webhook Stripe).

## 🚧 Pendências
- Decremento de estoque ao pagar (via webhook) — futuro.
- "Out of stock" badge no card (PLP) — futuro (exigiria agregação nas queries de produto).

## ⏭️ Próximo (Fase B)
- **B4 Paginação na PLP** (sem migração). Depois Fases C–G (performance, a11y, SEO, testes/CI, entrega).
</content>
