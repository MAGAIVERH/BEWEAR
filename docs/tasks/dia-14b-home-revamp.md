# Dia 14b — Reformulação da Home (padrão Nike)

**Data:** 2026-06-20
**Fase:** Fase 1 — Home premium (revisão)
**Branch:** `feat/fase-1-home-revamp`
**Status:** ✅ implementado (aguardando review visual do usuário)

---

## 🎯 Objetivo
Aproximar a home do site da Nike: hero com carrossel + controles, header com nav centralizado, e uma
sequência rica de seções editoriais e de produto. Trocar o banner antigo (grande demais e em pt-BR).

## 📋 Tarefas
- [x] **Header:** nav centralizado de verdade via `grid grid-cols-[1fr_auto_1fr]` (independe da busca).
- [x] **Hero → carrossel** (`Hero`): slides vídeo + 2 imagens, **controles play/pause + prev/next** (canto
      inferior direito) e **dots** (centro), auto-advance; respeita `prefers-reduced-motion`.
- [x] **FeatureCards:** 3 cards menores (4:5) ligados a categorias, com hover zoom (substitui os 2 cards grandes).
- [x] **EditorialBanner:** banner full-bleed `2:1` com texto **em inglês** ("Be authentic.") + CTA — substitui
      o `banner02.png` (que era grande demais e em pt-BR).
- [x] **CampaignGrid:** trio assimétrico (1 grande + 2 empilhados) com texto.
- [x] **ImpactSection:** seção full-bleed em **vídeo** (atleta) + texto + CTA (poster/imagem em reduced-motion).
- [x] **SplitEditorial:** 2 imagens com texto forte + CTA.
- [x] **Product carousels** "sem fundo" com hover: Best sellers, New arrivals, **Trending now**.
- [x] Brands marquee mantido (loop infinito do fix anterior).
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo.

## 🧱 Arquivos tocados
- `src/components/common/hero.tsx` (carrossel), `header.tsx` (grid centralizado)
- Novos: `feature-cards.tsx`, `editorial-banner.tsx`, `campaign-grid.tsx`, `impact-section.tsx`, `split-editorial.tsx`
- `src/app/page.tsx` (composição da nova home)

## 🖼️ Assets baixados (stock grátis, uso comercial) em `public/home/`
- `hero-2.jpg`, `hero-3.jpg` (16:9) — slides do hero
- `feature-1..3.jpg` (4:5) — feature cards
- `banner-authentic.jpg` (2:1) — banner editorial
- `campaign-1..3.jpg` — campaign grid
- `impact.jpg` + `impact.mp4` (Mixkit, ~4.7 MB) — seção de impacto em vídeo
- `split-1..2.jpg` — split editorial
- Imagens relacionadas a moda/atleta, conforme pedido ("sempre relacionadas aos produtos").

## ✅ Critério de Done
- [x] Header com opções centralizadas
- [x] Hero com controles (play/pause, setas) + rotação de slides
- [x] Banner antigo (pt-BR/grande) substituído por banner editorial em inglês
- [x] Sequência de seções no estilo Nike (cards, banner, campanha, vídeo, split, produtos)
- [x] `tsc` 0 erros; lint limpo
- [ ] **Review visual do usuário** (pendente)

## 🧩 Decisões & aprendizados
- Hero unifica vídeo + imagens num carrossel com crossfade; controles fixos no canto (play/pause controla
  auto-advance e o vídeo continua em loop).
- `EditorialCategories` e `CategorySelector` deixaram de ser usados na home (mantidos no repo por ora).
- Banners antigos (`banner01/02.png`) não são mais referenciados.

## 🚧 Bloqueios / pendências
- Imagens são **stock curado** — substituir por fotografia de marca quando houver (`docs/assets-needed.md`).
- Performance (2 vídeos + muitas imagens) será endereçada no Dia 24 (lazy/dynamic, otimização).

## 🔧 Refinamentos (após review do usuário)
- **Header:** nav centralizada de verdade com `grid grid-cols-[1fr_auto_1fr]` (independe da busca).
- **Hero:** virou carrossel (vídeo + 2 imagens) com **anel de progresso** no play/pause + setas + dots;
  imagens do hero trocadas por outras melhores.
- **Produtos sem fundo (flutuando):** as fotos têm fundo cinza-claro de estúdio; aplicado
  `brightness/contrast` para clarear até o branco (`brightness-[1.06] contrast-[1.22]`).
- **Alinhamento unificado:** tudo no `container-bw` (agora `max-w-[1600px]`); títulos editoriais
  **centralizados** com palavra em **acento** (`text-brand`) acima das imagens; textos sobrepostos mantidos.
- **Campaign grid:** alturas iguais (`md:h-[560px]`, cards `h-full`), zoom clipado, cantos arredondados.
- **Trending:** curada só com produtos de **foto chapada** (tênis primeiro), **2 fileiras de 6 (12 itens)**,
  miniaturas pequenas/uniformes + **logo BEWEAR + links** (Find a Store/Help/Join Us/Sign In).
- Assets adicionais em `public/home/` (hero-2/3, feature-1..3, banner-authentic, campaign-1..3,
  impact.jpg/mp4, split-1..2) — stock grátis de uso comercial.

## ⏭️ Próximo passo
**Fase 4 — Dia 15: Cart polish.**
</content>
