# Dia 15 — Cart polish

**Data:** 2026-06-20
**Fase:** Fase 4 — Cart & Checkout
**Branch:** `feat/fase-4-cart-polish`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Refinar o carrinho (Sheet) com acabamento premium: badge de contagem, estado vazio, totais claros e
micro-interações nos itens.

## 📋 Tarefas
- [x] **Trigger do carrinho** com **badge de contagem** (soma das quantidades).
- [x] **Estado vazio**: ícone + "Your cart is empty" + botão "Continue shopping" (fecha o Sheet).
- [x] **Totais refinados**: Subtotal/Shipping em `muted`, **Total** em destaque; "Checkout" fecha o Sheet
      e navega para `/cart/identification`.
- [x] **CartItem** reescrito: imagem em `bg-muted rounded-xl` (fill), nome/variante·tamanho, botão de
      remover (X) no topo, controle de quantidade em "pill" arredondado + preço.
- [x] Botões com `disabled` durante mutações (`isPending`) e feedback via toast.
- [x] Ícone trocado para `ShoppingBagIcon`.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo.

## 🧱 Arquivos tocados
- `src/components/common/cart.tsx` (Sheet: badge, empty state, totais)
- `src/components/common/cart-item.tsx` (layout + pending states)

## 🎨 Notas de design (Nike)
- Sheet limpo com header com borda, lista com respiro, rodapé de totais fixo e CTA arredondado.
- Quantidade em pill arredondado; remover discreto; valores em USD.

## ✅ Critério de Done
- [x] Carrinho consistente, com estado vazio e badge de contagem
- [x] Micro-interações (pending/disable, hover) e valores em USD
- [x] `tsc --noEmit` 0 erros; lint limpo

## 🧩 Decisões & aprendizados
- Não há página `/cart` dedicada — o fluxo é Sheet → `/cart/identification` → `/cart/confirmation`.
  O polish focou no Sheet e no item.

## 🚧 Bloqueios / pendências
- Frete real (cálculo) é placeholder "Free" — fora do escopo atual.

## ⏭️ Próximo passo
**Dia 16 — Identificação/endereço (US)** e **Dia 17 — Stripe & confirmação** (refino do checkout).
</content>
