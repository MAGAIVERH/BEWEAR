# Dia 06 — Faixa de marcas (marquee) + blocos editoriais de categoria

**Data:** 2026-06-19
**Fase:** Fase 1 — Home premium
**Branch:** `feat/fase-1-brands-editorial`
**Status:** ✅ concluído (imagens placeholder — ver pendências)

---

## 🎯 Objetivo
Dar ritmo visual à home: transformar a faixa de marcas num **marquee** elegante e adicionar **blocos
editoriais de categoria** (imagem grande + label + CTA) no estilo Nike.

## 📋 Tarefas
- [x] Refatorar `Brands` para usar o `Marquee` (loop infinito, pausa no hover).
- [x] Logos em **grayscale → cor no hover** (`opacity-50 grayscale → hover:opacity-100 hover:grayscale-0`).
- [x] Constante `BRANDS` em SCREAMING_SNAKE_CASE com `as const`.
- [x] Novo componente `EditorialCategories`: 2 cards grandes (`aspect-[4/5] md:aspect-[3/4]`), overlay,
      label "Shop" + nome da categoria, botão circular com seta, **hover zoom** (`group-hover:scale-105`).
- [x] Links reais para `/category/[slug]` a partir das categorias do banco.
- [x] Integrar na home (substitui o seletor de pílulas por algo mais editorial), dentro de `Reveal`.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo.

## 🧱 Arquivos tocados
- `src/components/common/brands.tsx` (marquee + grayscale hover)
- `src/components/common/editorial-categories.tsx` (novo)
- `src/app/page.tsx` (troca CategorySelector → EditorialCategories)

## 🎨 Notas de design (Nike)
- **Marquee** lento e contínuo; logos discretos (grayscale) que "acendem" no hover — sofisticado, não chamativo.
- **Cards editoriais** com fotografia full-bleed, overlay em gradiente, tipografia branca forte e
  micro-interações (zoom na imagem + seta que desliza). Cantos `rounded-3xl` (padrão do projeto).

## ✅ Critério de Done
- [x] Home com seções alternadas e respiro consistente
- [x] Marquee de marcas com hover; blocos de categoria com hover zoom
- [x] Mobile + desktop (grid 1→2 colunas)
- [x] `tsc --noEmit` 0 erros; lint limpo

## 🧩 Decisões & aprendizados
- O componente `CategorySelector` (pílulas) saiu da home, mas o arquivo foi mantido — poderá ser reutilizado
  na navbar/header (Dia 8).
- `EditorialCategories` usa as 2 primeiras categorias do banco com imagens placeholder do Unsplash.

## 🚧 Bloqueios / pendências
- **Imagens dos blocos são placeholder (Unsplash).** Trocar por fotografia real (constante `FEATURE_IMAGES`).
- Mapear imagem específica por categoria (hoje é por índice) quando houver arte real.

## ⏭️ Próximo passo
**Dia 7 — Grids de produto (Best sellers / New arrivals):** `ProductItem` com `overflow-hidden rounded-3xl`
+ hover zoom, grid responsivo e carrossel (Embla) no mobile.
</content>
