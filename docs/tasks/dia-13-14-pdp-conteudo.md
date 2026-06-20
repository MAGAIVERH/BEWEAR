# Dia 13/14 — Conteúdo da PDP (accordion + SEO)

**Data:** 2026-06-20
**Fase:** Fase 3 — Página de produto (PDP)
**Branch:** `feat/fase-3-pdp-content`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Completar a PDP com conteúdo rico e SEO: accordion (Details / Size & Fit / Shipping & Returns),
metadata + Open Graph e dados estruturados (JSON-LD).

> Obs.: o **seletor de variante** e o **add-to-cart com tamanho** (escopo dos dias 13) já foram entregues
> nos dias anteriores (tamanhos + galeria), então este dia foca no conteúdo e SEO.

## 📋 Tarefas
- [x] **Accordion** (shadcn) na coluna de info: Details (descrição), Size & Fit, Shipping & Returns.
- [x] **`generateMetadata`** por produto: `title`, `description` e **Open Graph** (com imagem da variante).
- [x] **JSON-LD** `Product` (name, image, description, `offers` com `priceCurrency: USD`, price, availability).
- [x] "You might also like" (relacionados) mantido.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo.

## 🧱 Arquivos tocados
- `src/app/product-variant/[slug]/page.tsx` (generateMetadata + JSON-LD + accordion)

## 🎨 Notas de design (Nike)
- Accordion limpo com divisória superior; conteúdo em `text-muted-foreground` com bom leading.
- SEO/preview rico ao compartilhar (OG image = foto do produto).

## ✅ Critério de Done
- [x] PDP com accordion de conteúdo e relacionados
- [x] Metadata + OG por produto; JSON-LD válido (Product/Offer)
- [x] `tsc --noEmit` 0 erros; lint limpo

## 🧩 Decisões & aprendizados
- `generateMetadata` faz uma consulta leve (`with: { product: true }`) pelo slug — separada do render,
  mas barata para o catálogo atual.
- Conteúdo de Size & Fit / Shipping é texto padrão (não há campo no schema) — comum em lojas; pode virar
  dado por produto/categoria no futuro.

## 🚧 Bloqueios / pendências
- Reviews reais (backlog v2); por ora sem aba de reviews.
- SEO global (sitemap, robots, OG default) → Dia 25.

## ⏭️ Próximo passo
**Fase 4 — Dia 15: Cart polish** (carrinho/sheet e página refinados, micro-interações, valores em USD).
</content>
