# Fase D — Acessibilidade & responsividade

**Data:** 2026-06-21
**Fase:** Fase D — Acessibilidade & responsividade
**Branch:** `feat/fase-d-a11y-responsive`
**Status:** ✅ concluído (a11y Lighthouse 100; QA de teclado/responsivo feito)

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
- [x] QA de **navegação por teclado**: adicionado **"Skip to content"** (link visível no foco) no
      layout, apontando para `#main-content` (presente em todas as páginas). Foco visível e focus-trap
      de dialogs já garantidos por Radix/shadcn.
- [x] QA **responsivo** (screenshots reais em 390/768/1024/1440): home/PLP/PDP impecáveis.
      **Bug corrigido:** no tablet (768) a nav desktop espremia e escondia o logo — movida de `md`
      para `lg`, então tablets usam o header mobile limpo (hamburger + logo + cart).

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
- [x] QA teclado (skip link) + responsivo (screenshots 390/768/1024/1440; bug do tablet corrigido)

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
