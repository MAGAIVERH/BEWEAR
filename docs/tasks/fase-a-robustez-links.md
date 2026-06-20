# Fase A — Robustez & navegação (A1 + A2)

**Data:** 2026-06-20
**Branch:** `feat/fase-a-robustez`
**Status:** ✅ A1 e A2 concluídos · A3 planejado

---

## 🎯 Objetivo
Eliminar links mortos e tratar 404/erro, deixando a navegação robusta (todo link/botão funciona).
Também: **guia reescrito** com plano de ação completo (Fases A–G).

## ✅ A1 — Páginas institucionais + links funcionais
- [x] `/help` — Contact, Shipping, Returns e **FAQ** (accordion), com âncoras (`#contact/#shipping/#returns/#faq`).
- [x] `/about` — Our story, Careers, Sustainability (âncoras).
- [x] Footer: Help/Company agora apontam para `/help#...` e `/about#...`; **social** → URLs externas reais
      (`target="_blank"`).
- [x] Trending: "Find a Store" → `/help#contact`, "Help" → `/help`.
- [x] **Zero `href="#"`** em `src` (verificado por grep).

## ✅ A2 — 404 e erro
- [x] `src/app/not-found.tsx` (Header + 404 + "Back to store").
- [x] `src/app/error.tsx` (boundary client com **Try again** + voltar).

## 🧱 Arquivos
- `docs/guia-desenvolvimento-bewear.md` (reescrito — plano A–G)
- `src/app/help/page.tsx`, `src/app/about/page.tsx` (novos)
- `src/app/not-found.tsx`, `src/app/error.tsx` (novos)
- `src/components/common/footer.tsx`, `src/components/common/trending-section.tsx` (links)

## ✅ Verificação
- `tsc --noEmit` 0 erros; lint limpo; **`pnpm build` passou (14/14)**.

## ⏭️ Próximo (A3 + Fase B)
- **A3:** breadcrumbs (PLP/PDP) + recently viewed (localStorage).
- **Fase B:** wishlist, reviews, conta completa (endereços CRUD + `/my-orders/[id]`), paginação, estoque por tamanho.
</content>
