# Fase G — Entrega & portfólio

**Data:** 2026-06-21
**Fase:** Fase G — Entrega & portfólio
**Branch:** `feat/fase-g-portfolio`
**Status:** ✅ concluído (falta só o vídeo demo, que o usuário grava)

---

## 🎯 Objetivo

Deixar o projeto pronto para apresentação: deploy ao vivo funcionando, README staff-level com
demo, screenshots e métricas, e checklist final fechado.

## 📋 Tarefas

- [x] **Corrigir o deploy da Vercel** (estava bloqueado). Causa: a Vercel **bloqueia deploys de
      Next.js vulnerável** — o build compilava mas o deploy virava `Error`
      ("Vulnerable version of Next.js detected"). Fix: upgrade `next`/`eslint-config-next`
      `15.4.1 → 15.5.19`. Site ao vivo voltou a atualizar (sitemap/icon/skip-link/JSON-LD no ar).
- [x] **README staff-level**: link de **demo ao vivo** (`bewear-navy.vercel.app`), seção de
      **Screenshots** (home/PLP/PDP), **Quality at a glance** (a11y 100, SEO 100, CLS 0, testes/CI),
      scripts, estrutura, links de arquitetura/ADRs.
- [x] Screenshots capturados em produção local (Chromium) → `public/screenshots/{home,plp,pdp}.png`.
- [x] Checklist final "FINALIZADO" marcado no guia.
- [ ] **Vídeo demo (60–90s)** — pendente, gravado pelo usuário.

## 🧱 Arquivos tocados

- `README.md` (demo, screenshots, métricas)
- `public/screenshots/plp.png`, `public/screenshots/pdp.png` (novos)
- `docs/guia-desenvolvimento-bewear.md` (Fase G + checklist final)
- `package.json`, `pnpm-lock.yaml` (Next 15.5.19 — via PR #37)

## ✅ Critério de Done

- [x] Deploy na Vercel atualizando a cada push (verificado: live site = estado atual)
- [x] README com demo ao vivo + screenshots + métricas
- [x] `pnpm build`/`tsc`/`lint`/`test` verdes

## 🧩 Decisões & aprendizados

- **Diagnóstico do deploy**: GitHub mostrava o check "Vercel ❌ Deployment has failed". Via
  `vercel inspect <dpl_id> --logs` vi que o build compilava e a última linha era
  "Vulnerable version of Next.js detected" → status Error. Não era Node/engines nem o nosso código.
  Registrado em memória para não repetir.
- O CI do GitHub **não pega** esse bloqueio porque o passo de build é pulado sem secrets.

## 🚧 Bloqueios / pendências

- **Vídeo demo** (você grava). Opcional: definir `NEXT_PUBLIC_SITE_URL` na Vercel com o domínio
  final para canonicals/sitemap (hoje usa o fallback).

## ⏭️ Próximo passo

Projeto **FINALIZADO** (exceto o vídeo). Possíveis extras: comprimir o `hero.mp4` para subir o
Perf da home; configurar secrets no GitHub para o build/E2E rodarem no CI.
