# Dia 18/19 — Conta & pedidos + Auth polish

**Data:** 2026-06-20
**Fase:** Fase 5 — Conta & pedidos
**Branch:** `feat/fase-5-account-orders`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Refinar a área do cliente: histórico de pedidos (`my-orders`) com cabeçalho, estado vazio e footer; e a
página de autenticação com card centralizado.

## 📋 Tarefas
- [x] **My orders**: layout em `container-bw`, cabeçalho (eyebrow "Account" + "My orders" + contagem),
      **estado vazio** ("No orders yet" + "Start shopping"), footer; pedidos ordenados do mais recente.
- [x] **Order card**: imagens dos itens em `bg-muted rounded-xl` (fill), consistente com o resto.
- [x] **Auth**: card **centralizado** (`max-w-md`), tabs em largura total (`grid-cols-2`), página com altura
      mínima de tela.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo.

## 🧱 Arquivos tocados
- `src/app/my-orders/page.tsx` (header, empty state, footer, ordenação)
- `src/app/my-orders/components/order.tsx` (imagem em card)
- `src/app/authentication/page.tsx` (card centralizado)

## 🎨 Notas de design (Nike)
- Conta com hierarquia clara (eyebrow + título + contagem); pedidos em accordion com badge de status.
- Auth limpo e centrado, tabs claras.

## ✅ Critério de Done
- [x] My orders com estado vazio e ordenação; auth centralizado
- [x] `tsc --noEmit` 0 erros; lint limpo

## 🧩 Decisões & aprendizados
- Pedidos ordenados por `createdAt desc` direto na query.

## 🚧 Bloqueios / pendências
- Detalhe de pedido em página própria (`/my-orders/[id]`) pode vir depois; hoje é accordion na lista.

## ⏭️ Próximo passo
**Fase 6 — Dia 20+: Polimento (micro-interações, skeletons, a11y, responsividade).**
</content>
