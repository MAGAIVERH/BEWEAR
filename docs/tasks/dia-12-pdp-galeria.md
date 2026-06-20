# Dia 12 — Galeria premium da PDP

**Data:** 2026-06-20
**Fase:** Fase 3 — Página de produto (PDP)
**Branch:** `feat/fase-3-pdp-gallery`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Transformar a página de produto num layout premium de **2 colunas no desktop**: galeria à esquerda
(imagem grande com hover zoom + thumbnails de variante) e informações/ações à direita.

## 📋 Tarefas
- [x] Layout `lg:grid lg:grid-cols-2 lg:gap-12` (empilhado no mobile).
- [x] Imagem principal `aspect-square` em container `overflow-hidden rounded-3xl` com **hover zoom**
      (`group-hover:scale-105`), `next/image fill` + `priority` + `sizes`.
- [x] `VariantSelector` restilizado como **thumbnails** (64px, ring `border-foreground` no ativo).
- [x] Coluna de info: nome, "Color: …", preço, `ProductActions` (tamanho + quantidade + add to bag) e
      bloco de descrição com `border-t`.
- [x] Removido `px-5` interno do `ProductActions` (agora vive na coluna já com padding).
- [x] "You might also like" e footer mantidos.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo.

## 🧱 Arquivos tocados
- `src/app/product-variant/[slug]/page.tsx` (layout 2 colunas)
- `src/app/product-variant/[slug]/components/variant-selector.tsx` (thumbnails)
- `src/app/product-variant/[slug]/components/product-actions.tsx` (sem px-5 interno)

## 🎨 Notas de design (Nike)
- Galeria protagonista; imagem quadrada consistente com os cards; hover zoom suave.
- Thumbnails de variante (cores) com ring claro no selecionado; info com hierarquia (título, cor, preço).

## ✅ Critério de Done
- [x] PDP com galeria fluida em mobile e desktop (2 colunas)
- [x] Troca de cor via thumbnails; tamanho + add to bag à direita
- [x] `tsc --noEmit` 0 erros; lint limpo

## 🖼️ Galeria com múltiplas imagens (stock curado)
- Baixei **stock gratuito (Unsplash, uso comercial)** de detalhe/lifestyle por categoria em
  `public/gallery/{categoria}-1.jpg` e `-2.jpg` (1200×1200) — sneakers, t-shirts, pants, shorts,
  jackets-hoodies, accessories.
- `getGalleryImages(categorySlug, mainImageUrl)` → `[imagem da variante, ...2 imagens da categoria]`.
- Novo `ProductGallery` (client): imagem principal + **thumbnails clicáveis** que trocam a imagem
  (estado no client, sem navegação). O seletor de **cor** (VariantSelector) foi movido para a coluna de info.

## 🧩 Decisões & aprendizados
- A galeria agora tem **múltiplas imagens** mesmo com 1 foto por variante no seed: combina a foto do produto
  com imagens de detalhe/lifestyle **da categoria** (stock curado). Substituir por ângulos reais do próprio
  produto quando houver fotografia de marca.
- Thumbnails de **cor** (variantes) ficam na coluna de info; thumbnails de **imagem** (galeria) ficam sob a
  imagem principal.

## 🚧 Bloqueios / pendências
- Ângulos reais por produto exigiriam fotografia de marca — registrado em `docs/assets-needed.md`.
- Conteúdo extra da PDP (accordion Details/Shipping, JSON-LD, OG) → Dia 14.

## ⏭️ Próximo passo
**Dia 13/14 — Conteúdo da PDP:** accordion (Details, Shipping & Returns), relacionados e SEO (JSON-LD + OG).
(O seletor de variante e o add-to-cart com tamanho já estão prontos dos dias anteriores.)
</content>
