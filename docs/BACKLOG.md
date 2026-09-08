# Backlog — MyPageV2

Single control file. **Do not create one MD per task.**

Status: `todo` → `doing` → `done` | `blocked`

Legacy reference: `C:\Users\Matheus\Desktop\matheus\MyPage`

Dev picks **one task at a time** from **Next (ready)**, top to bottom.

---

## Locked decisions

- **Visual:** modernized layout (2024+ patterns) — **keep brand identity**: Poppins, black base, purple gradient accent, white text
- **Code:** modern Next.js structure + shared UI primitives, less duplicated CSS
- **Performance:** high priority (Server Components, ISR, `next/image`, minimal client JS)
- **Courses:** out of scope entirely
- **Projects:** personal GitHub repos only (tag `mypage`)
- **Nav:** About + Projects (no Courses link)
- **Deploy / hosting:** out of scope for now (hosting provider TBD)
- **Layout:** new home v2 (020–023 ✓) + Direction C — **promote to default** (024); no preview toggle after 024
- **Quality gate (tasks 024+):** every delivery runs **Playwright**, **React Doctor**, **React Scan** — see [Quality gate](#quality-gate-tasks-024) below

---

## Quality gate (tasks 024+)

Required on **every** task 024–031 before marking `done`:

| Tool | Command / action |
|------|------------------|
| **Build + lint** | `yarn build` && `yarn lint` |
| **React Doctor** | `yarn doctor --verbose --scope changed` (031: `--scope full`) — fix errors; document warnings |
| **React Scan** | `yarn dev` → exercise changed routes; confirm no new unnecessary re-renders on client islands (toolbar in `instrumentation-client.ts`) |
| **Playwright** | `yarn test:e2e` — run specs covering **this task’s routes** (031 adds/configures suite; 024+ run affected specs once 031 exists, or add minimal spec per task) |

**031** owns Playwright install + baseline e2e config. **024–030** add/update specs for touched pages as they land.

**Tasks 032–033 (audits):** quality gate + audit-specific tools below. Each audit **must** append fix rows to [Audit remediation queue](#audit-remediation-queue) before `done`.

**Fix tasks (034+):** same quality gate as 024+; Playwright must cover affected flows.

---

## In progress

_(none)_

---

## Next (ready)

### 033 · Performance audit & remediation queue
**Status:** todo | **Dep:** 031

**Goal:** Find performance bottlenecks and regressions, **document each finding**, **open fix tasks** in the remediation queue (034+).

**Audit scope (checklist):**
- **Lighthouse mobile:** `/en-US`, `/en-US/projects`, `/pt-BR` — record LCP, INP, CLS, TBT; flag if &lt; 90 Performance
- **Bundle:** `@next/bundle-analyzer` or `next build` output — large client chunks, duplicate deps
- **React Doctor:** `yarn doctor --verbose` — Performance category rules
- **React Scan:** dev toolbar + `yarn doctor scan <url>` on hot interactions (timeline, search, locale)
- **Images:** `next/image` sizes, priority only above fold, remote patterns
- **Caching:** `unstable_cache` TTL; no client fetch for page data
- **Fonts / CSS:** Poppins subset; unused CSS
- **RSC vs client:** audit `"use client"` boundaries

**Deliverables:**
1. Findings in [Audit remediation queue](#audit-remediation-queue) (`type: perf`)
2. One fix task per regression with measurable target
3. Baseline metrics in PR (before numbers)

**Out of scope:** CDN/edge tuning (deferred with hosting)

**Done when:**
- [ ] Audit checklist completed; queue populated
- [ ] Fix tasks created for regressions or scores &lt; 90
- [ ] Quality gate (build, lint, doctor full, playwright e2e green)

---

## Audit remediation queue

_Populated by **032** and **033**. Fix in tasks **034+**._

| Fix ID | Type | Sev | Finding (short) | Fix task |
|--------|------|-----|-----------------|----------|
| 034 | sec | high | `videoUrl` / `nuGetUrl` / `swaggerUrl` from GitHub JSON used as iframe `src` or `href` with no https/host allowlist | 034 |
| 035 | sec | medium | No CSP, `frame-ancestors` / XFO, Referrer-Policy, or Permissions-Policy in the app | 035 |
| 036 | sec | medium | GitHub/Medium `fetch` has no timeout; env URLs are not host-allowlisted | 036 |
| 037 | sec | medium | Auth.js `trustHost: true`; production can boot without `AUTH_SECRET`; locale cookie missing `Secure`/`SameSite` | 037 |

**Accepted / deferred (not a 034+ row):**
- Secrets: `.env` gitignored; not in git history; `GITHUB_TOKEN` only in `server-only` GitHub client; `.env.example` complete. **Rotate** GitHub/Google tokens when wiring prod (pending decision) — do not reuse legacy repo secrets.
- About `dangerouslySetInnerHTML` is static `src/messages` plus numeric `{years}`/`{months}` — no user HTML.
- `search` / `tag` query params are string filters rendered as text.
- Cache-clear server actions call `requireAdmin`; login/logout are public by design.
- External links use `rel="noreferrer"` (noopener in modern browsers). Featured strip already has `noopener noreferrer`.
- `yarn npm audit`: no high/critical. ESLint 9 deprecation is moderate hygiene, not a runtime vuln (leave for 033/deps if desired).
- HSTS, WAF, and auth rate limits wait for the hosting provider.

### 034 · Security fix — allowlist project media and outbound URLs
**Status:** todo | **Dep:** 032 ✓ | **Sev:** high

**Goal:** Do not load or navigate to attacker-controlled URLs from `mypage-props.json`.

**Scope:**
- Allow https iframe `src` only for known embed hosts (YouTube/Vimeo) before `VideoModal`
- Reject `javascript:`, `data:`, and non-https `href`s for nuget/swagger (and treat empty as absent)
- Playwright: a fixture/stub URL that is not https must not become an iframe `src`

**Done when:** untrusted URL schemes cannot open the video iframe or become an `href`.

### 035 · Security fix — HTTP security headers
**Status:** todo | **Dep:** 032 ✓ | **Sev:** medium

**Goal:** Ship a baseline header set in `next.config.ts` `headers()`.

**Scope:**
- `Content-Security-Policy` (start with a report-or-enforcing policy that still allows Google OAuth, Medium images, YouTube embeds after 034)
- `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (disable unused powerful APIs)
- Document that **HSTS** must be set on the production host (deferred with deploy)

**Done when:** response headers are present on `/en-US` and `/en-US/admin`; OAuth and images still work.

### 036 · Security fix — bound outbound fetches
**Status:** todo | **Dep:** 032 ✓ | **Sev:** medium

**Goal:** GitHub and Medium requests cannot hang the server or follow an arbitrary env URL.

**Scope:**
- `AbortSignal.timeout` on GitHub repo/raw and Medium integration/RSS `fetch`
- Allowlist hosts (`api.github.com`, `raw.githubusercontent.com`, `medium.com`, the known worker) instead of fetching any `GITHUB_*` / `MEDIUM_*` URL string
- Keep tokens out of client bundles and error messages (already true — do not regress)

**Done when:** a slow or off-allowlist URL fails closed; existing portfolio/Medium happy path still works.

### 037 · Security fix — harden Auth.js production config
**Status:** todo | **Dep:** 032 ✓ | **Sev:** medium

**Goal:** Admin auth fails closed in production and cookies are explicit.

**Scope:**
- Refuse to boot / sign in when `AUTH_SECRET` is missing in production
- Revisit `trustHost: true` vs `AUTH_URL` / `AUTH_TRUST_HOST`
- Locale cookie: `SameSite=Lax`, `Secure` in production; keep path `/`
- Do not change the owner-email allowlist behavior

**Done when:** production without `AUTH_SECRET` cannot mint sessions; locale switch still works.

---

~~**019** — superseded by **024** (Matheus approved new layout as default)~~

---

## Done

### 001 · Scaffold Next.js
App Router, TS strict, Tailwind v4, ESLint + Prettier, `src/app/[locale]`, folder structure, `.env.example`. Verified: `yarn build`, `yarn lint`, `yarn dev`.

### 002 · i18n with next-intl (en-US, pt-BR)
next-intl wired (middleware, routing, messages from legacy resx). Locale switch via `/api/locale` + cookie. Verified: `/en-US`, `/pt-BR`, `yarn build`, `yarn lint`.

### 003 · Design tokens — legacy CSS → Tailwind theme
Tokens in `globals.css` (@theme: colors, gradients, breakpoints, z-index). Poppins via `next/font/google` in `[locale]/layout.tsx`. Verified: `yarn build`, `yarn lint`.

### 005 · Static assets migration
Images → `public/images/`, CVs → `public/cv/` (`cv-en-US.pdf`, `cv-pt-BR.pdf`), favicons + `site.webmanifest`. Skipped course-only SVGs. Verified: `yarn build`, `yarn lint`.

### 004 · Layout — header, mobile menu, footer
Header (photo, About + Projects, flags), mobile hamburger, footer contacts + email copy, scroll-to-top. No Courses. Verified desktop + mobile in browser; locale switch keeps `/projects`. `yarn build` + `yarn lint`.

### 006 · Home — hero + about
Hero (greeting, main stack, CTAs) + About (age/experience i18n, CV dropdown). Verified in browser. `yarn build` + `yarn lint`.

### 007 · Home — skills
Skill bars (9 skills, staggered fill on scroll). Certifications were dropped from this task. Verified in browser. `yarn build` + `yarn lint`.

### 008 · Home — experience timeline
Three roles (Labsit/Dotz, FitBank×2), exclusive expand/collapse, LinkedIn link. Verified desktop + ~768px. `yarn build` + `yarn lint`.

### 009 · GitHub projects service + server cache
Fetch repos tagged `mypage`, load `mypage-props.json`, localize descriptions, cache with `unstable_cache`. Verified live fetch shape (`yarn verify:github`). `yarn build` + `yarn lint`.

### 010 · Projects page — search, tags, video modal
Search + tag chips (`?search=&tag=`), project cards, video modal, empty state. Verified en-US / pt-BR and mobile in browser. `yarn build` + `yarn lint`.

### 011 · Medium publications service + server cache
Fetch Medium posts from `MEDIUM_INTEGRATION_URL`, sort by date, take 10, cache with `unstable_cache`. Empty list on failure. Verified parse shape (`yarn verify:medium`). `yarn build` + `yarn lint`.

### 012 · Home — Medium section
Top 5 Medium cards on home (image, title, description, date), pt-BR subtitle, “more” link if >5 posts. Verified en-US / pt-BR and mobile in browser. `yarn build` + `yarn lint`.

### 013 · Admin — Google auth (owner only)
Google login on `/[locale]/admin`, owner email allowlist (`ADMIN_EMAIL`), logout. Non-owner sees rejection message. Cache buttons are 014. Verified login UI and rejected state in browser. `yarn build` + `yarn lint`.

### 014 · Admin — cache invalidation UI
Clear projects and articles caches (auth-guarded), inline success/error, logout. No courses. Verified login UI still matches; cache buttons require owner session. `yarn build` + `yarn lint`.

### 015 · SEO, metadata, legacy URL redirects
Locale `generateMetadata` (title, description, Open Graph, Twitter), sitemap/robots, `metadataBase` from `NEXT_PUBLIC_SITE_URL`. Legacy `/Projects`, `/Courses`, `/Admin` (and lowercase) redirect to **en-US** routes, not the locale cookie. Verified meta per page, 308 redirects, `/sitemap.xml` and `/robots.txt`. `yarn build` + `yarn lint`.

### 016 · Performance + accessibility pass
Hero background via `next/image`, smaller client islands (header chrome, copy-email, skills/timeline split), skip link, focus-visible, CV `<details>`. Lighthouse mobile: home Performance 99 / a11y 100; projects Performance 96 / a11y 100. `yarn build` + `yarn lint`.

### 017 · Modernization pass — code quality + layout refresh
Shared `components/ui/` (`Section`, `SectionTitle`, buttons, `Card`, `Tag`) + `cn()`. Spacing, cards, nav underline, footer pills, and admin panel refreshed while keeping Poppins and purple brand tokens. Lighthouse mobile: home Performance 96 / a11y 100; projects Performance 97 / a11y 100. Responsive ~375 / ~768 / desktop. `yarn build` + `yarn lint`.

### 018 · UX preview — Direction C (temporary, layout 3)
Reversible preview behind `UX_PREVIEW_DIRECTION=c` or `?ux_preview=c` (cookie 30 days; `?ux_preview=off` wins over env). Default layout unchanged. Inverted hero CTAs, featured-projects strip (placeholders), calmer project cards. Spec: [`docs/ux/direcao-c-projects-ritmo.md`](ux/direcao-c-projects-ritmo.md). Lighthouse mobile (preview on): home Performance 96 / a11y 100; projects Performance 97 / a11y 100. `yarn build` + `yarn lint`.

### 020 · Home — content zone background (Zone B)
Hero stays nebula/photo (`height: 100vh`, not full-page). About → Medium wrapped in `.home-content-zone` on `#0a0a0f` with 80px fade + hairline. Preview C on/off. `yarn build` + `yarn lint`.

### 021 · Home — About layout + Hard Skills icon grid
Replaced skill bars with 10 stack tiles (`StackIcon` + `STACK_ITEMS`). Desktop About/Skills split `1.2fr / 0.8fr` ≥900px; mobile Sobre → Skills → CTAs. Removed `SkillBar.tsx`. `yarn build` + `yarn lint`.

### 022 · Home — Experience timeline cards
Roles as cards on a left rail (date, company chip, resume, expand/collapse). Flat Zone B — no `ui-section-tinted`. Mobile full-width cards, no `left: 153px`. `yarn build` + `yarn lint`.

### 023 · Projects page — flat content zone
Projects route uses `--color-content-zone-bg` (`#0a0a0f`); no nebula. Card surfaces match 022; preview C calmer cards still apply. `yarn build` + `yarn lint`.

### 024 · Promote new layout as default (remove preview)
Direction C is the only UI: hero (eyebrow, name, tagline, Projects primary + About secondary, featured strip), nebula background, calmer cards. Removed `ux-preview*` libs, query/cookie/env toggle, and the legacy hero branch. Theme CSS in `src/styles/theme.css`. Playwright smoke: `e2e/home.spec.ts`, `e2e/projects.spec.ts`. `yarn build` + `yarn lint` + `yarn doctor --verbose --scope changed` + `yarn test:e2e`.

### 025 · Hard Skills — icons from library
`STACK_ITEMS` now map to `react-icons` components (`currentColor`). Simple Icons for .NET, TypeScript, Angular, React, Jest, Postman, Docker. C# and Azure fall back to Tabler (`TbBrandCSharp`, `TbBrandAzure`) because `react-icons` 5.7.0 `si` has no those marks. React Native reuses `SiReact`. Removed `public/images/stacks/*.svg`. Playwright covers `#about-skills`. `yarn build` + `yarn lint` + `yarn doctor --verbose --scope changed` + `yarn test:e2e`.

### 026 · About — section title spacing
`.ui-section-inner` now has a shared `3rem` gap so About matches Background and Medium. Removed per-body `margin-top` on `.timeline-body` / `.medium-body`. Medium PT subtitle stays in `.ui-section-heading`. Playwright asserts title→content gaps. `yarn build` + `yarn lint` + `yarn doctor --verbose --scope changed` + `yarn test:e2e`.

### 027 · Background — timeline dot / rail alignment
Rail and dots share `--timeline-rail-x` with `translateX(-50%)` so the purple dots sit on the vertical line. Mobile updates `--timeline-gutter` instead of a hard-coded `padding-left`. Playwright checks all 3 entries before/after expand. `yarn build` + `yarn lint` + `yarn doctor --verbose --scope changed` + `yarn test:e2e`.

### 028 · Card lift hover — Skills + Background (match Medium)
Skills tiles and timeline cards reuse `Card` / `.ui-card`. Hover/focus matches Direction C Medium: `translateY(-2px)`, purple border, no shadow, `0.2s` transition. Lift is off on `@media (hover: none)`. Medium section unchanged. `yarn build` + `yarn lint` + `yarn doctor --verbose --scope changed` + `yarn test:e2e`.

### 029 · Projects page — full new layout alignment
Projects uses `Section` + `SectionTitle` (PROJECTS / PROJETOS) with `ui-section-inner` width and the 3rem title gap. Search/tags are a Zone B toolbar (no legacy min-widths). Cards lift like Medium (`-2px`). Empty state styled. `yarn build` + `yarn lint` + `yarn doctor --verbose --scope changed` + `yarn test:e2e`.

### 030 · Admin pages — new layout alignment
Admin uses `Section` + `SectionTitle` (ADMIN, English-only) on the shared `#0a0a0f` zone. Login panel is `ui-card` without lift; Google login is `GradientButton`; cache/logout are `OutlinedButton`. Playwright smokes the signed-out login UI. `yarn build` + `yarn lint` + `yarn doctor --verbose --scope changed` + `yarn test:e2e`.

### 031 · Full layout QA + Playwright baseline
Playwright baseline: `workers: 1`, `yarn test:e2e` / `yarn test:e2e:ui`, locale switch, legacy redirects, mobile 375px smoke, copy-email. Doctor full scan **100**. React Scan on header, timeline, projects search, copy-email — no storms. Viewport matrix 375/768/1440 with no overflow. Lighthouse mobile: home Performance **96** / a11y **96**; projects Performance **90** / a11y **100**. `yarn build` + `yarn lint` + `yarn doctor --verbose` + `yarn test:e2e`.

### 032 · Security audit & remediation queue
Checklist complete: no secrets in git; `GITHUB_TOKEN` server-only; cache actions gated; About HTML is static i18n. Opened **034–037** (iframe/URL allowlist, security headers, fetch timeout/host allowlist, Auth.js fail-closed). Playwright `e2e/security.spec.ts`. `yarn npm audit` has no high/critical. HSTS/WAF/rate-limit deferred with hosting. `yarn build` + `yarn lint` + `yarn doctor --verbose` + `yarn test:e2e`.

---

## Removed from scope

~~Courses page~~ · ~~Home courses preview~~ · ~~Firestore~~ · ~~Courses CRUD~~ · ~~Courses cache~~ · ~~Courses nav~~ · ~~Admin manage certificates~~

## Deferred (hosting TBD)

Deploy / DNS — reopen with new task IDs when hosting provider is chosen.

---

## Dependency graph

```
001 ✓ ─┬─ 002 ✓ ─── 004 ─── 006 ─┬─ 007
       │                         ├─ 008
       │                         └─ 012 ← 011
       ├─ 003 ────────────────────────┘
       ├─ 005 ────────────────────────┘
       ├─ 009 ─── 010
       ├─ 011
       └─ 013 ─── 014

004 ─── 015 ✓
006,010,012 ─── 016 ✓ ─── 017 ✓ ─── 018 ✓ ─── 020–023 ✓
                                                      └── 024 ─┬─ 025
                                                               ├─ 026
                                                               ├─ 027
                                                               └─ 028 ─┬─ 029
                                                                       └─ 030 ─── 031 ─┬─ 032 ─── 034+ (security fixes)
                                                                                      └─ 033 ─── 034+ (perf fixes)
```

**Next ready:** **033**, then **034–037** (security fixes from 032).

---

## Pending decisions

- [ ] Hosting provider (deferred)
- [ ] Rotate GitHub / Google secrets when wiring integrations (do not reuse legacy committed tokens)

---

## Parity (checklist)

- [x] Feature parity (home, projects, admin, i18n, SEO)
- [x] Performance ≥ 90 Lighthouse (mobile) — must not regress after 017
- [x] **017** — Modern layout while keeping brand tokens
- [x] **018** — UX Direction C preview (temporary toggle)
- [x] **020** — Zone B flat background + hero/content split
- [x] **021** — About + skills icon grid (no bars)
- [x] **022** — Timeline cards
- [x] **023** — Projects flat zone bg
- [x] **024** — New layout default (no preview)
- [x] **025** — Stack icons from library
- [x] **026** — About title spacing
- [x] **027** — Timeline dot alignment
- [x] **028** — Skills + timeline hover lift (like Medium)
- [x] **029** — Projects full layout alignment
- [x] **030** — Admin layout alignment
- [x] **031** — Full QA (Playwright + Doctor + Scan)
- [x] **032** — Security audit + remediation queue
- [ ] **033** — Performance audit + remediation queue
- [ ] **034+** — Fixes from audits _(created by 032/033)_
- [ ] ~~Production deploy + DNS~~ (deferred)
