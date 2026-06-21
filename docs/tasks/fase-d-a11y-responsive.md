# Fase D — Acessibilidade & responsividade

**Data:** 2026-06-21
**Fase:** Fase D — Acessibilidade & responsividade
**Branch:** `feat/fase-d-a11y-responsive`
**Status:** 🚧 em andamento (a11y automatizada 100; QA de teclado/responsivo em andamento)

---

## 🎯 Objetivo

Zerar as violações críticas de acessibilidade e garantir WCAG AA (teclado, foco, contraste,
landmarks, ordem de headings), mantendo o layout impecável em todos os breakpoints.

## 📋 Tarefas

- [x] **Landmark `<main>`** em todas as páginas e estados de loading (resolve `landmark-one-main`).
- [x] **Nomes acessíveis** em botões só-ícone: menu mobile (`aria-label="Open menu"`), quantidade
      na PDP (`Decrease/Increase quantity`). (resolve `button-name`).
- [x] **`role="img"`** no `StarRating` com `aria-label` (resolve `aria-prohibited-attr`).
- [x] **Ordem de headings**: títulos de seção `h3 → h2` (Brands, ProductList, skeleton) e
      `Select size`/`Quantity` `h3 → h2` na PDP (resolve `heading-order`).
- [x] **Contraste AA**: novo token `--brand-strong` (laranja escuro ~5:1 em branco) aplicado a
      `text-eyebrow-brand` e ao desconto do carrinho (resolve `color-contrast`).
- [x] **Target-size**: dots do hero agora com área de toque ≥ 24px (resolve `target-size`).
- [x] Re-rodar Lighthouse a11y: **Home 100 · PLP 100 · PDP 100** (antes 88/90/88).
- [ ] QA de **navegação por teclado** (menus, carrosséis, dialogs, filtros) e foco visível.
- [ ] QA **responsivo** em mobile/tablet/desktop/ultrawide.
- [ ] Passar **axe DevTools** numa varredura final (complementa o Lighthouse).

## 🧱 Arquivos tocados

- `src/components/common/star-rating.tsx` (`role="img"`)
- `src/components/common/header-client.tsx` (menu `aria-label`)
- `src/components/common/brands.tsx`, `product-list.tsx`, `product-rail-skeleton.tsx` (`h3→h2`)
- `src/components/common/hero.tsx` (dots target-size)
- `src/app/product-variant/[slug]/components/product-actions.tsx` (`aria-label` + `h3→h2`)
- `src/app/cart/components/cart-summary.tsx` (`text-brand-strong`)
- `src/app/globals.css` (token `--brand-strong` + `.text-eyebrow-brand`)
- `<main>` em todas as páginas/loadings: `page.tsx` (home, category, product-variant, search,
  my-orders, my-orders/[id], account, wishlist, help, about, checkout/success,
  cart/confirmation, cart/identification, authentication), `not-found.tsx`, e os `loading.tsx`.

## ✅ Critério de Done

- [x] `npx tsc --noEmit` sem erros · `pnpm build` ok
- [x] Lighthouse **Accessibility = 100** em Home/PLP/PDP (zero violação crítica)
- [ ] QA teclado + responsivo concluídos (manual)

## 🧩 Decisões & aprendizados

- Usei os próprios relatórios Lighthouse da Fase C como fonte das violações reais — direcionou os
  fixes com precisão (em vez de adivinhar).
- Contraste: criamos `--brand-strong` (escolha do usuário) em vez de escurecer o `--brand` global,
  preservando o laranja vívido nos **destaques grandes** (que passam AA-large) e usando o tom
  acessível só em **texto pequeno**.
- `Select size`/`Quantity` viraram `h2` para manter a hierarquia (h1 do produto → h2). São rótulos
  de grupos de controle; `h2` mantém a ordem sem pular níveis.

## 🚧 Bloqueios / pendências

- QA manual de teclado e responsivo (depende de interação no navegador).

## ⏭️ Próximo passo

Concluir QA manual; depois Fase E — SEO técnico.
