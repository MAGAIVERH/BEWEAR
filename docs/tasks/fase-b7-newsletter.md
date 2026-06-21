# Fase B7 — Newsletter real

**Data:** 2026-06-20
**Branch:** `feat/fase-b7-newsletter`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Persistir as inscrições de newsletter de verdade (tabela + serviço), com validação e feedback —
substituindo o toast "fake" do formulário do footer.

## 📋 Tarefas
- [x] **Schema:** tabela `newsletter_subscriber` (id, email único, createdAt) + migração Drizzle.
- [x] **Action:** `subscribe-newsletter` (Zod `email`; normaliza lower/trim; `onConflictDoNothing`
      para e-mail já inscrito).
- [x] **Hook:** `useSubscribeNewsletter` (TanStack Query mutation).
- [x] **UI:** ligar `newsletter-form.tsx` ao backend; estado de loading; Sonner para sucesso /
      já-inscrito / erro.
- [x] Verificação: `tsc --noEmit` 0 erros; lint nos arquivos novos; build de produção.

## 🧱 Arquivos
- `src/db/schema.ts` (+ `newsletterSubscriberTable`), `drizzle/*` (migração)
- `src/actions/subscribe-newsletter/{index,schema}.ts`
- `src/hooks/mutations/use-subscribe-newsletter.ts`
- `src/components/common/newsletter-form.tsx`

## 🧩 Decisões & aprendizados
- Newsletter é público (sem auth). Duplicidade tratada no banco (`unique` + `onConflictDoNothing`),
  retornando `alreadySubscribed` para mensagem amigável (sem vazar erro de constraint).

## ⏭️ Próximo
- **B6 Cupom/promoções** (Stripe Coupons).
