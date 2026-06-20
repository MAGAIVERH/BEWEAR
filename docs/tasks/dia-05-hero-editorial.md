# Dia 05 — Hero editorial (Fase 1: Home premium)

**Data:** 2026-06-19
**Fase:** Fase 1 — Home premium
**Branch:** `feat/fase-1-home-hero`
**Status:** ✅ concluído (imagem é placeholder — ver pendências)

---

## 🎯 Objetivo
Construir a primeira dobra da home com impacto "nível Nike": hero full-bleed com fotografia, headline
em `text-display`, subtítulo, CTAs e animação de entrada suave — a "cara" do site.

## 📋 Tarefas
- [x] Componente `Hero` full-bleed (`h-[80vh] min-h-[520px]`) com `next/image fill` + `priority`.
- [x] Overlay de contraste (gradiente) para legibilidade do texto sobre qualquer foto.
- [x] Conteúdo: eyebrow "New collection", headline **"Built to move."** (`text-display`), subtítulo e 2 CTAs
      ("Shop now" / "Explore").
- [x] Animação de entrada com **stagger** (framer-motion), neutra em `prefers-reduced-motion`.
- [x] Adicionar `images.unsplash.com` ao `remotePatterns` do `next.config.ts` (placeholder de fotografia).
- [x] Integrar o `Hero` na home (substituindo o banner01) e adicionar âncoras
      `#best-sellers` / `#new-arrivals` (com `scroll-mt-24`) para os CTAs.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo.

## 🧱 Arquivos tocados
- `src/components/common/hero.tsx` (novo)
- `src/app/page.tsx` (hero + seções com id de âncora)
- `next.config.ts` (Unsplash em remotePatterns)

## 🎨 Notas de design (Nike)
- **Imagem protagonista** full-bleed; texto alinhado à base com respiro generoso.
- **Tipografia** display forte (`text-display`), eyebrow uppercase; CTA primário preto (token) + secundário
  outline translúcido sobre a foto.
- **Movimento** discreto: stagger de entrada (0.12s), easing premium; desligado em reduced-motion.
- Texto sobre a foto usa `text-white`/overlay `bg-black/..` (utilitários, não cores hardcoded em hex).

## ✅ Critério de Done
- [x] Hero responsivo (mobile + desktop), sem layout shift (imagem com `fill`/`sizes`)
- [x] Headline display + CTA funcionais (âncoras)
- [x] Animação respeita `prefers-reduced-motion`
- [x] `tsc --noEmit` 0 erros; lint limpo

## 🧩 Decisões & aprendizados
- Usei **foto do Unsplash** como placeholder (decisão já acordada) em vez do `banner01.png`, que tem texto
  embutido e não combina com o hero editorial de tipografia própria.
- CTAs apontam para âncoras das seções existentes (`#best-sellers`, `#new-arrivals`) até existir uma PLP "all".

## 🚧 Bloqueios / pendências
- **Imagem do hero é placeholder (Unsplash).** Trocar por fotografia real de campanha quando disponível
  (basta alterar `HERO_IMAGE` em `hero.tsx`).
- "Shop now" idealmente apontará para uma PLP de todos os produtos (a criar na Fase 2).
- Fonte display dedicada (Archivo/Anton) ainda em aberto — hero usa Geist black por enquanto.

## ⏭️ Próximo passo
**Dia 6 — Faixa de marcas + seções editoriais:** refinar `Brands` com `Marquee` (grayscale→cor no hover) e
adicionar blocos editoriais de categoria estilo Nike.
</content>
