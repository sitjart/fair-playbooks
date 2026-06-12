// @ts-check
import { defineConfig } from 'astro/config';

// ─────────────────────────────────────────────────────────────────────
// DEPLOY CONFIG — set `site` and `base` when you know the GitHub URL.
//
// If pushing to github.com/<owner>/fair-playbooks:
//   site:  'https://<owner>.github.io'
//   base:  '/fair-playbooks'
//
// If using a custom domain (e.g. playbooks.elixiruknode.org):
//   site:  'https://playbooks.elixiruknode.org'
//   base:  '/'   (or remove the base line entirely)
//
// You can leave these empty for now — the dev server doesn't need them.
// The GitHub Actions workflow auto-detects the URL when deploying.
// ─────────────────────────────────────────────────────────────────────

// https://astro.build/config
// `base` is set ONLY in the deploy workflow (DEPLOY_BASE=/fair-playbooks) so the
// GitHub *project* page works at /fair-playbooks/. Locally DEPLOY_BASE is unset →
// base is "/", so `npm run dev` works at the root. Hand-written links use
// import.meta.env.BASE_URL, which adapts to whichever base is active.
export default defineConfig({
  site: 'https://sitjart.github.io',
  base: process.env.DEPLOY_BASE || '/',
});
