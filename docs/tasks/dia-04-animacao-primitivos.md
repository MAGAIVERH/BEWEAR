# Dia 04 — Biblioteca de animação & primitivos de layout

**Data:** 2026-06-19
**Fase:** Fase 0 — Fundação & Design System
**Branch:** `feat/fase-0-animation-primitives`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Montar a infraestrutura de movimento ("efeito Nike") e os primitivos de layout reutilizáveis: smooth
scroll, reveal on scroll, container, cabeçalho de seção e marquee — todos respeitando `prefers-reduced-motion`.

## 📋 Tarefas
- [x] Instalar `framer-motion`, `lenis`, `embla-carousel-react` (via pnpm).
- [x] `SmoothScrollProvider` (Lenis) no `layout.tsx`, desativado quando `prefers-reduced-motion`.
- [x] `Reveal` — fade/slide on scroll com framer-motion (`whileInView`, `once`), neutro em reduced-motion.
- [x] `Container` — wrapper responsivo usando `container-bw`.
- [x] `SectionHeader` — eyebrow (brand) + `section-title` + `section-subtitle`, com alinhamento opcional.
- [x] `Marquee` — faixa infinita sem emenda (2 cópias + `translateX(-50%)`), pausa no hover, off em reduced-motion.
- [x] Keyframe `marquee` + override de reduced-motion no `globals.css`.
- [x] Demonstração: seções da home (`Brands`, `Best sellers`, `CategorySelector`, `New arrivals`) com `Reveal`.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo; CSS compila no Tailwind v4; paths do Lenis confirmados.

## 🧱 Arquivos tocados
- `package.json` / `pnpm-lock.yaml` (deps de animação)
- `src/providers/smooth-scroll.tsx` (novo)
- `src/components/common/{reveal,container,section-header,marquee}.tsx` (novos)
- `src/app/globals.css` (keyframe marquee + reduced-motion)
- `src/app/layout.tsx` (provider), `src/app/page.tsx` (Reveal nas seções)

## 🎨 Notas de design (Nike)
- Movimento **discreto e com propósito:** reveals suaves (`ease [0.22, 1, 0.36, 1]`, 0.6s), smooth scroll leve
  (`lerp 0.1`), marquee lento (30s). Nada exagerado.
- **Acessibilidade primeiro:** todo movimento é desligado em `prefers-reduced-motion` (provider, Reveal e CSS).

## ✅ Critério de Done
- [x] Uma seção da home anima ao entrar na viewport (Reveal)
- [x] Smooth scroll ativo (Lenis) no layout
- [x] `prefers-reduced-motion` respeitado em todos os primitivos
- [x] `tsc --noEmit` 0 erros; lint limpo; CSS compila

## 🧩 Decisões & aprendizados
- Usei `lenis/react` (`ReactLenis root`) em vez de instanciar o Lenis na mão — menos boilerplate e RAF gerenciado.
- Marquee feito em **CSS** (não framer-motion) por robustez e custo zero de runtime; pausa no hover via
  `group-hover:[animation-play-state:paused]`.
- `embla-carousel-react` instalado e pronto para os carrosséis de produto (Dia 7), ainda não utilizado.

## 🚧 Bloqueios / pendências
- `Marquee`/`SectionHeader`/`Container` criados mas só serão amplamente aplicados nas fases de Home/PLP/PDP.
- Fonte display para o hero ainda em aberto (Dia 5).

## ⏭️ Próximo passo
**Fase 1 — Dia 5: Hero editorial** (primeira dobra premium, com `text-display`, CTA e reveal),
iniciando a construção da Home premium.
</content>
