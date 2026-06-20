# Dia 03 — Tokens, paleta e tipografia (identidade Nike)

**Data:** 2026-06-19
**Fase:** Fase 0 — Fundação & Design System
**Branch:** `feat/fase-0-design-system`
**Status:** ✅ concluído (aguardando aprovação visual do usuário)

---

## 🎯 Objetivo
Estabelecer o design system editorial em `src/app/globals.css`: paleta **preto/branco + 1 acento**
e uma **escala tipográfica forte** (estilo Nike), com utilitários reutilizáveis — base para todas as telas.

## 📋 Tarefas
- [x] Migrar a paleta de `:root` e `.dark` para **neutra (preto/branco/cinza)**, removendo o roxo.
- [x] `--primary` = quase-preto (CTAs); `--primary-foreground` = branco.
- [x] Novo token de marca **`--brand`** (laranja) + `--brand-foreground`, mapeado no `@theme inline`
      como `--color-brand` (gera utilitários `text-brand`, `bg-brand`, etc.).
- [x] Tipografia base: `h1–h3` com `font-bold tracking-tight text-balance`; `font-feature-settings`.
- [x] Utilitários de design system (em `@layer components`):
      `container-bw`, `text-eyebrow`, `text-eyebrow-brand`, `text-display`, `section-title`, `section-subtitle`.
- [x] Style tile vivo: cabeçalhos de seção (`ProductList`, `Brands`, página de categoria) usando `section-title`.
- [x] Validação: compilação do CSS no Tailwind v4 CLI **OK**; `tsc --noEmit` → 0 erros; lint limpo.

## 🧱 Arquivos tocados
- `src/app/globals.css` (tokens + `@theme` brand + tipografia + utilitários)
- `src/components/common/product-list.tsx`, `src/components/common/brands.tsx`
- `src/app/category/[slug]/page.tsx`

## 🎨 Notas de design (Nike)
- **Paleta:** branco de fundo, quase-preto para texto/CTAs, cinzas para hierarquia, **laranja** como acento
  de marca (usar com parcimônia: eyebrows, badges, destaques).
- **Tipografia:** títulos grandes, peso bold/black, `tracking-tight`, `text-balance`; eyebrows uppercase
  com tracking largo.
- **Acento (`--brand`)** definido em `oklch(0.67 0.2 41)` — trocar a cor é só ajustar **um token**.

## ✅ Critério de Done
- [x] Sem cor hardcoded; tudo via tokens em `globals.css`
- [x] CSS compila no Tailwind v4 sem erros
- [x] `tsc --noEmit` 0 erros; lint limpo nos arquivos alterados
- [ ] **Aprovação visual do usuário** da paleta + tipografia (pendente)

## 🧩 Decisões & aprendizados
- shadcn usa `--primary` como cor de marca; como aqui o primary é **neutro (preto)**, criei um token
  **separado `--brand`** para o acento laranja, evitando "sequestrar" o `--accent` (que é superfície de hover).
- Fonte: mantida a **Geist** por enquanto (corpo + títulos com peso). Avaliar fonte display (Archivo/Anton)
  para o hero quando montar a home (Dia 5) — decisão ainda aberta.

## 🚧 Bloqueios / pendências
- Aprovação da direção visual (cor do acento e tamanho dos títulos) pelo usuário.
- Decisão sobre fonte display para o hero (Dia 5).

## ⏭️ Próximo passo
**Dia 04 — Biblioteca de animação & primitivos de layout:** adicionar `framer-motion` + `lenis` + `embla`,
provider de smooth scroll e componentes `Reveal`/`Container`/`SectionHeader`/`Marquee`.
</content>
