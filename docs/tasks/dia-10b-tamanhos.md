# Dia 10b — Tamanhos (size) de ponta a ponta

**Data:** 2026-06-20
**Fase:** Fase 2 — Listagem & PDP
**Branch:** `feat/fase-2-filters`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Plataforma premium (estilo Nike) precisa de **seleção de tamanho**. Adicionar `size` ao modelo de dados
e ao fluxo completo: PDP → carrinho → pedido.

## 📋 Tarefas
- [x] **Schema:** coluna `size text` (nullable) em `cart_item` e `order_item`.
- [x] **Migração** Drizzle `0001_add_size_to_cart_and_order_items` gerada e **aplicada** no banco.
- [x] **Helper** `getSizesForCategory(slug)`: apparel (XS–XXL), sneakers (US 7–13), accessories (One Size).
- [x] **PDP:** seletor de tamanho (obrigatório) em `ProductActions`; categoria incluída na query do produto.
- [x] **Add to bag:** exige tamanho (botão desabilitado sem seleção), toast de sucesso/erro.
- [x] **Action `add-cart-product`:** schema com `size`; item de carrinho único por (cart, variant, **size**);
      corrigido o bug do `&&` → `and()` no filtro.
- [x] **Increase** (mutation) passa `size`; **decrease/remove** já operam por id do item (ok).
- [x] **Carrinho/Checkout/Pedidos:** tamanho exibido em `cart-item`, `CartSummary` e `my-orders`;
      `finish-order` copia o `size` para o `order_item`.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo; migração confirmada.

## 🧱 Arquivos tocados
- `src/db/schema.ts`, `drizzle/0001_add_size_to_cart_and_order_items.sql` (novo)
- `src/helpers/sizes.ts` (novo)
- `src/actions/add-cart-product/{index,schema}.ts`, `src/actions/finish-order/index.ts`
- `src/hooks/mutations/use-increase-cart-product.ts`
- `src/app/product-variant/[slug]/page.tsx` + `components/{product-actions,add-to-cart-botton}.tsx`
- `src/components/common/{cart-item,cart}.tsx`, `src/app/cart/components/cart-summary.tsx`
- `src/app/cart/{identification,confirmation}/page.tsx`
- `src/app/my-orders/page.tsx` + `components/order.tsx`

## 🎨 Notas de design (Nike)
- Seletor de tamanho em grid de pills (3/6 colunas), estado selecionado em `bg-foreground text-background`;
  "Required" enquanto não escolhe; **Add to bag** e **Buy now** desabilitados sem tamanho.

## ✅ Critério de Done
- [x] Tamanho selecionável e obrigatório na PDP
- [x] Tamanho persiste no carrinho e no pedido; visível em todo o fluxo
- [x] Migração aplicada; `tsc` 0 erros; lint limpo

## 🧩 Decisões & aprendizados
- **Tamanhos por categoria** (helper), não por variante no banco: o schema de variante representa **cor**;
  a cada cor o produto oferece o mesmo conjunto de tamanhos (padrão de moda). O tamanho escolhido é
  persistido em `cart_item.size`/`order_item.size`.
- Linha de carrinho é única por **(cart, variant, size)** — mesma cor em tamanhos diferentes = itens separados.
- Sem filtro de tamanho na PLP: como os tamanhos são uniformes por categoria, não discrimina produtos.
- Corrigido bug pré-existente do `add-cart-product` (`eq(a) && eq(b)` não filtrava por carrinho) usando `and()`.

## 🚧 Bloqueios / pendências
- Estoque por tamanho (SKU real) ficaria para uma evolução do schema (tabela size×stock), se desejado.

## ⏭️ Próximo passo
**Dia 11 — Busca:** input no header + página de resultados por nome/descrição, com empty state.
</content>
