# Fix — Renderização do Header/menu + efeito Nike

**Data:** 2026-06-20
**Branch:** `fix/header-render-and-menu`
**Status:** ✅ concluído

---

## 🐛 Problema
Ao carregar a página, o menu/nav demorava a aparecer e "piscava": o `Header` era **client component** e
buscava as categorias no navegador (TanStack Query `useCategories`), então a nav nascia vazia até a query
resolver.

## ✅ Correção
- **Header dividido:** `header.tsx` agora é **server component** (busca categorias no `db`) e renderiza
  `header-client.tsx` (client) com as interações (sessão, scroll, sheet, busca, carrinho). → categorias
  **server-rendered**, sem flash/delay.
- **Efeito Nike:** sublinhado animado que cresce no hover de cada item da nav desktop
  (`group-hover/nav:w-full`).
- **Ajuste de fronteira:** `checkout/success/page.tsx` virou server component (o Header é async agora);
  o diálogo foi extraído para `components/success-dialog.tsx` (client).
- **Verificação:** `tsc --noEmit` 0 erros; lint limpo; **`pnpm build` passou** (12/12 páginas).

## 🧱 Arquivos tocados
- `src/components/common/header.tsx` (server) + `header-client.tsx` (novo, client)
- `src/app/checkout/success/page.tsx` (server) + `components/success-dialog.tsx` (novo)

## 🧩 Notas
- `useCategories` (hook) ficou sem uso (mantido para possível reuso).
- Home e auth são prerenderizadas (static) — categorias são "assadas" no build; revalidação pode ser
  adicionada depois se o catálogo mudar com frequência.

## 🚧 Pendências relacionadas ("todo botão/link tem que funcionar")
- Links institucionais com `#` (footer: Help/Shipping/Returns/About...; trending: Find a Store/Help) — criar
  páginas reais ou remover. A endereçar nas próximas tarefas.

## ⏭️ Próximo
Continuar o guia: **Fase 6 — polimento (skeletons, a11y, responsividade)** + garantir que todos os
links/botões funcionem.
</content>
