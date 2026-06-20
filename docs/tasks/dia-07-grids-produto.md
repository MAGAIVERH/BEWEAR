# Dia 07 — Grids/carrosséis de produto premium

**Data:** 2026-06-19
**Fase:** Fase 1 — Home premium
**Branch:** `feat/fase-1-product-grids`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Elevar os cards de produto e a apresentação das listas (Best sellers / New arrivals / You might also like)
ao nível Nike: imagem com hover zoom, proporção consistente, carrossel arrastável e grid responsivo.

## 📋 Tarefas
- [x] `ProductItem`: imagem em `aspect-square overflow-hidden rounded-3xl` com **hover zoom**
      (`group-hover:scale-105`, `duration-500 ease-out`); `next/image fill` + `sizes`; tipografia/preço refinados.
- [x] Trocar prop `textContainerClassName` por `className` (item agora preenche o container pai).
- [x] `ProductList`: reimplementado como **carrossel Embla** (drag livre) com **setas no desktop**
      e larguras responsivas (`basis-[45%] … xl:basis-[19%]`), edge-aligned com `px-5 md:px-8 lg:px-12`.
- [x] Página de categoria: **grid responsivo** `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` com o novo `ProductItem`.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo; sem referências à prop antiga.

## 🧱 Arquivos tocados
- `src/components/common/product-item.tsx` (hover zoom, aspect-square, className)
- `src/components/common/product-list.tsx` (Embla + setas desktop)
- `src/app/category/[slug]/page.tsx` (grid responsivo)

## 🎨 Notas de design (Nike)
- **Hover zoom** suave na imagem dentro de container arredondado com `overflow-hidden`.
- **Proporção 1:1** consistente entre todos os produtos (casa com a spec de foto pedida) — fundo `bg-muted`
  enquanto carrega, sem layout shift (`fill` + `sizes`).
- **Carrossel arrastável** (Embla, dragFree) com setas elegantes no desktop (hover invertendo cores via tokens).

## ✅ Critério de Done
- [x] Cards alinhados, hover suave, preço em USD
- [x] Carrossel arrastável no mobile e desktop; setas no desktop
- [x] Grid de categoria responsivo (2→3→4 colunas)
- [x] `tsc --noEmit` 0 erros; lint limpo

## 🧩 Decisões & aprendizados
- Usei **Embla** (já instalado no Dia 4) com gutter via padding do track (`px-5 md:px-8 lg:px-12`) para
  alinhar com o cabeçalho em todos os breakpoints.
- `ProductItem` virou Server-friendly (sem estado) e o `ProductList` carrega o estado do carrossel (client).

## 🚧 Bloqueios / pendências
- **Fotos de produto** ainda vêm do seed atual (CDN). Specs das fotos reais (1:1, fundo neutro) em
  `docs/assets-needed.md` — ligado ao **seed em inglês** (pendente).

## ⏭️ Próximo passo
**Dia 8 — Footer & navegação global premium:** header/navbar desktop (categorias, busca, conta, carrinho),
sticky com shrink, menu mobile aprimorado e footer rico.
</content>
