# Fase B5 — Conta completa (account + endereços CRUD + detalhe do pedido)

**Data:** 2026-06-20
**Branch:** `feat/fase-b5-account`
**Status:** ✅ concluído (sem migração nova)

---

## 🎯 Objetivo
Central do cliente de loja grande: página `/account`, **gestão de endereços (CRUD)** e
**detalhe do pedido `/my-orders/[id]`**.

## 📋 Tarefas
- [x] **`/account`**: saudação + e-mail, **Sign out**, links rápidos (My orders, Wishlist) e **Address book**.
- [x] **Endereços (CRUD):**
  - Read: `useUserAddresses` (já existia) com `initialData` do servidor.
  - Create: `ShippingAddressForm` reutilizável (RHF + Zod + US states) via `useCreateShippingAddress`.
  - Delete: nova action `deleteShippingAddress` (valida dono; erro amigável se ligado a pedido) +
    `useDeleteShippingAddress`.
- [x] **Detalhe do pedido `/my-orders/[id]`**: status, data, itens (com tamanho), endereço e totais;
      ownership por `userId`; `notFound` se não existir; link "View order details" na lista.
- [x] **Header:** avatar → `/account`; menu mobile com **Account** + My orders; `SignOutButton`.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo; build de produção.

## 🧱 Arquivos
- `src/actions/delete-shipping-address/{index,schema}.ts`, `src/hooks/mutations/use-delete-shipping-address.ts`
- `src/components/common/{shipping-address-form,address-book,sign-out-button}.tsx`
- `src/app/account/page.tsx`, `src/app/my-orders/[id]/page.tsx`
- `src/components/common/header-client.tsx`, `src/app/my-orders/components/order.tsx`

## 🧩 Decisões & aprendizados
- `ShippingAddressForm` extraído como componente reutilizável (account agora; checkout pode adotar depois).
- Delete protege contra remoção de endereço usado em pedido (FK) com mensagem amigável.

## 🚧 Pendências
- **Update** de endereço (editar) pode ser adicionado (hoje: create + delete). 
- Refatorar o form do checkout para usar `ShippingAddressForm` (reduz duplicação) — futuro.

## ⏭️ Próximo (Fase B)
- **B2 Reviews & ratings** ou **B3 Estoque por tamanho** (ambos com migração) · **B4 Paginação**.
</content>
