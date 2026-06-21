# Fase B6 — Promoções / cupom

**Data:** 2026-06-21
**Branch:** `feat/fase-b6-coupons`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Campo de cupom no checkout com desconto aplicado ao total **e** refletido no Stripe.

## 📋 Tarefas
- [x] **Schema:** tabela `coupon` (code único, `discount_type` enum percent/fixed, value,
      min_order_in_cents, active, expires_at, max_redemptions, times_redeemed) + colunas
      `coupon_code` e `discount_in_cents` na `order`.
- [x] **Validação:** `findValidCoupon` (active, expirado, limite de uso, mínimo) +
      `computeCouponDiscount` (cap no subtotal). Action `validate-coupon` (preview) e hook.
- [x] **finishOrder:** revalida cupom server-side (nunca confia no total do client), grava
      `couponCode`/`discountInCents`, ajusta total e incrementa `times_redeemed` na transação.
- [x] **Stripe:** `createCheckoutSession` cria coupon efêmero `amount_off` (`duration: once`) para
      o valor cobrado bater com o total descontado.
- [x] **UI:** `ConfirmationOrder` (client) — campo de cupom (Apply/Remove), linha "Discount" no
      summary, "Place order" passa o cupom; feedback Sonner.
- [x] **Seed:** `WELCOME10` (10%) e `SAVE20` ($20, mínimo $100).
- [x] Verificação: `tsc --noEmit` 0 erros; lint dos arquivos novos; build; teste da validação.

## 🧱 Arquivos
- `src/db/schema.ts` (+ `couponTable`, enum, colunas em `order`), `src/db/seed-coupons.ts`,
  `drizzle/0005_add_coupon_and_order_discount.sql`
- `src/helpers/coupon.ts`
- `src/actions/validate-coupon/{index,schema,find-valid-coupon}.ts`,
  `src/hooks/mutations/use-validate-coupon.ts`
- `src/actions/finish-order/index.ts`, `src/actions/create-checkout-session/index.ts`,
  `src/hooks/mutations/use-finish-order.ts`
- `src/app/cart/components/cart-summary.tsx`, `src/app/cart/confirmation/page.tsx`,
  `src/app/cart/confirmation/components/{confirmation-order,finish-order-button}.tsx`

## 🧩 Decisões & aprendizados
- **DB é fonte de verdade.** O desconto é recalculado no servidor em `finishOrder`; o preview do
  client é só UX.
- **Stripe:** coupon efêmero por checkout (`amount_off`) em vez de gerenciar cupons no Stripe —
  mantém o catálogo de cupons no nosso banco.
- **Migração aplicada via `pg` direto** (DDL gerado): `drizzle-kit push` exige TTY quando há
  ambiguidade de tabela nova (ver memória [[db-migrations-use-drizzle-push]]).
- Desconto exibido com `text-brand` (sem cor hardcoded).

## 🧪 Cupons de demo
- `WELCOME10` — 10% off, sem mínimo.
- `SAVE20` — $20 off, subtotal mínimo $100.

## ⏭️ Próximo — Fase C–G
Performance · A11y/responsivo · SEO · Testes + CI · README/demo.
