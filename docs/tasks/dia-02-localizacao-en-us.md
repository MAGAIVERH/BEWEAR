# Dia 02 — Localização en-US/USD (base)

**Data:** 2026-06-19
**Fase:** Fase 0 — Fundação & Design System
**Branch:** `feat/fase-0-localizacao-en-us`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Migrar todo o produto de **pt-BR/BRL → en-US/USD** para o mercado americano: strings de UI em inglês,
moeda em dólar, datas em `en-US`, moeda do Stripe em USD e checkout/endereço no padrão dos EUA.
É a base obrigatória antes de construir as telas premium.

## 📋 Tarefas
- [x] Helper de moeda: `formatCentsToBRL` → **`formatCentsToUSD`** (`Intl.NumberFormat("en-US", USD)`).
- [x] Substituir todos os usos do helper (cart, cart-item, cart-summary, product-item, PDP, my-orders).
- [x] Stripe: `currency: "brl"` → **`"usd"`** em `create-checkout-session`.
- [x] Traduzir toda a UI para inglês: home, header, footer, cart, PDP, ações de produto, auth (sign-in/up),
      success, my-orders, confirmation, identification.
- [x] Datas em `my-orders` → `toLocaleDateString/TimeString("en-US")`.
- [x] Metadata do `layout.tsx` (title/description) em inglês; `lang="en"` já estava setado.
- [x] **Checkout no padrão americano:** novo `addresses.tsx` com Full name, Email, Phone `(555) 123-4567`,
      Street address, Apt/suite, City, **State (dropdown 50 + DC)**, **ZIP code**.
- [x] `us-states.ts` — constante com os 50 estados + DC.
- [x] Schema Zod e action de endereço migrados (US); `country: "United States"`.
- [x] `formatAddress` reescrito no formato americano (`Name • Street, City, ST ZIP`).
- [x] Correção de bug: `my-orders` redirecionava para `/login` (inexistente) → `/authentication`.
- [x] Correção de regra: cor hardcoded em `category-selector` (`bg-[#F4EFFF]`/`bg-white`) → tokens (`bg-muted`/`bg-background`).
- [x] Inputs de senha com `type="password"` (eram texto puro).
- [x] `npx tsc --noEmit` → **0 erros** · lint dos arquivos alterados → **limpo**.

## 🧱 Arquivos tocados
- `src/helpers/money.ts`, `src/helpers/us-states.ts` (novo)
- `src/actions/create-checkout-session/index.ts`
- `src/actions/create-shipping-address/{index,schema}.ts`
- `src/actions/get-user-address/index.ts`
- `src/app/layout.tsx`, `src/app/page.tsx`
- `src/app/cart/{components/cart-summary,helpers/address,identification/components/addresses,confirmation/page}.tsx`
- `src/app/product-variant/[slug]/{page,components/add-to-cart-botton,components/product-actions}.tsx`
- `src/app/authentication/{page,components/sign-in-form,components/sign-up-form}.tsx`
- `src/app/checkout/success/page.tsx`, `src/app/my-orders/{page,components/order}.tsx`
- `src/components/common/{header,footer,cart,cart-item,product-item,category-selector}.tsx`

## ✅ Critério de Done
- [x] Nenhuma string pt-BR na UI (verificado por grep)
- [x] Nenhum uso de `formatCentsToBRL` restante
- [x] Preços em `$` (USD) em toda a aplicação e no Stripe
- [x] Checkout com campos americanos (State dropdown, ZIP, phone)
- [x] `tsc --noEmit` sem erros; lint limpo nos arquivos alterados

## 🧩 Decisões & aprendizados
- **Sem migração de banco neste dia.** Para presentar endereço americano sem alterar o schema (e sem
  depender de `DATABASE_URL`), os campos legados pt-BR (`number`, `neighborhood`, `cpfOrCnpj`) passam a ser
  gravados como string vazia `""` (são `text notNull`). Limpeza definitiva do schema fica para uma migração
  dedicada quando o `.env` estiver confirmado.
- **State** usa `<select>` nativo estilizado com os tokens do tema (não há `@radix-ui/react-select` instalado).
  Pode ser trocado pelo shadcn `Select` depois (`pnpm dlx shadcn@latest add select`).
- Lint do projeto tem ~30 erros **pré-existentes** de `simple-import-sort` em arquivos não tocados
  (componentes `ui/` do shadcn, `lib/`, `db/`). Não corrigidos aqui para manter o diff focado.

## 🚧 Bloqueios / pendências
- **Seed (`src/db/seed.ts`)** ainda em pt-BR/BRL — depende do conteúdo real em inglês (decisão pendente).
  Será tratado no dia de conteúdo.
- Migração de schema para remover colunas BR (`number`, `neighborhood`, `cpfOrCnpj`) — requer `.env`/Neon.
- Lint global (import-sort) dos arquivos shadcn pré-existentes — opcional, fora do escopo.

## ⏭️ Próximo passo
**Dia 03 — Tokens, paleta e tipografia:** migrar `globals.css` para **preto/branco + 1 acento** e definir a
escala tipográfica editorial (identidade Nike).
</content>
