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

### 027 · Background — timeline dot / rail alignment
**Status:** todo | **Dep:** 024 ✓ | **UX:** stakeholder feedback

**Goal:** Purple dots on the left are **centered on the vertical line** (`.timeline::before`).

**Scope:**
- Fix `.timeline-exp::before` position relative to `.timeline::before` (adjust `left` / `top` / `transform: translateX(-50%)` as needed)
- Verify all 3 entries + expanded state; desktop and ~375px
- No layout shift on expand/collapse

**Done when:**
- [ ] Dots visually centered on rail in screenshots
- [ ] Quality gate passed

---

### 028 · Card lift hover — Skills + Background (match Medium)
**Status:** todo | **Dep:** 024 ✓ | **UX:** Medium `.ui-card` behavior

**Goal:** `.stack-tile` and `.timeline-card` use the **same lift** as Medium cards: `translateY(-4px)`, border highlight, subtle shadow (`ui.css`).

**Scope:**
- Prefer reusing `Card` component or shared `.ui-card` class on stack tiles + timeline cards
- Keep hover disabled on `@media (hover: none)` like existing `ui-card`
- Match transition timing to Medium
- Do **not** change Medium section itself

**Done when:**
- [ ] Hover/focus lift feels identical to Medium cards
- [ ] Quality gate passed

---

## Queue

| ID | Title | Dep |
|----|-------|-----|
| 029 | Projects page — full new layout alignment | 024, 028 |
| 030 | Admin pages — new layout alignment | 024 |
| 031 | Full layout QA + Playwright baseline | 029, 030 |
| 032 | Security audit & remediation queue | 031 |
| 033 | Performance audit & remediation queue | 031 |

### 029 · Projects page — full new layout alignment
**Status:** todo | **Dep:** 024 ✓, 028

**Goal:** `/projects` feels like the same design system as the new home — not just flat bg (023).

**Scope:**
- Section title + toolbar (search + tags) spacing/typography aligned with home Zone B
- Project cards: same `ui-card` lift/hover as Medium (028)
- Search input + tag chips: consistent borders, focus rings, muted colors
- Page padding/max-width matches `ui-section-inner`
- Remove any leftover preview-only or legacy project styles
- Both locales; empty state styled

**Done when:**
- [ ] Side-by-side with home feels cohesive
- [ ] Quality gate + Playwright projects spec green

---

### 030 · Admin pages — new layout alignment
**Status:** todo | **Dep:** 024 ✓

**Goal:** `/admin` matches Zone B + shared UI primitives (cards, buttons, spacing).

**Scope:**
- Flat content zone bg (`#0a0a0f`), consistent with home/projects
- `admin.css` → use `ui-card`, `gradient-button` / `outlined-button` patterns where possible
- Login panel + cache buttons: spacing, hover, focus states aligned with new layout
- English-only UI preserved

**Done when:**
- [ ] Admin visually consistent with public pages
- [ ] Quality gate + Playwright admin smoke (login UI, no auth required for layout assertions)

---

### 031 · Full layout QA + Playwright baseline
**Status:** todo | **Dep:** 029, 030

**Goal:** Automated regression + manual sweep — **no layout bugs** across the app.

**Scope:**
- **Playwright:** install `@playwright/test`, `playwright.config.ts`, scripts `yarn test:e2e`, `yarn test:e2e:ui`
- E2e coverage: `/en-US`, `/pt-BR`, `/projects`, `/admin`, locale switch, legacy redirects (`/Projects` → `/en-US/projects`), mobile viewport smoke
- Optional: screenshot comparison for home hero + about + timeline (baseline in `e2e/snapshots/`)
- **React Doctor:** `yarn doctor --verbose` full scan — score documented in PR
- **React Scan:** checklist for header, timeline expand, projects search, copy-email — no render storms
- Manual matrix: 375px / 768px / 1440px on all public routes + admin
- Fix any layout issues found (or open follow-up IDs in PR description)

**Done when:**
- [ ] `yarn test:e2e` passes in CI-ready config
- [ ] Doctor full scan — no errors
- [ ] Layout checklist signed off in PR body
- [ ] Lighthouse mobile home + projects still ≥ 90

---

### 032 · Security audit & remediation queue
**Status:** todo | **Dep:** 031

**Goal:** Identify security risks in MyPageV2, **document each finding**, and **open fix tasks** in the remediation queue (034+). Do not leave findings only in chat.

**Audit scope (checklist):**
- **Secrets:** no tokens/keys in repo; `.env.example` complete; `GITHUB_TOKEN` server-only; rotate if legacy secrets were reused
- **Auth (admin):** Auth.js config, `ADMIN_EMAIL` allowlist, session cookie flags, CSRF on server actions, cache-clear routes guarded
- **Input / output:** `dangerouslySetInnerHTML` (About i18n), URL params (`search`, `tag`), external links `rel` attributes
- **Headers:** CSP, `X-Frame-Options`, `Referrer-Policy`, HSTS (document what prod host must set)
- **Dependencies:** `yarn npm audit` (or `npm audit`) — triage high/critical
- **API routes:** `/api/auth`, `/api/locale`, admin actions — method allowlist, rate-limit notes
- **Third-party:** GitHub/Medium fetch — SSRF surface, timeout, no token leak to client
- **Playwright:** optional security smoke (admin blocked without auth, no secret in HTML)

**Deliverables:**
1. Findings table in [Audit remediation queue](#audit-remediation-queue)
2. One **fix backlog row per item** severity ≥ medium (034, 035, …); critical/high fixed immediately **or** first fix task
3. PR summary: risk summary + what was fixed vs deferred

**Out of scope:** pen-test / paid tooling; hosting WAF (deferred with deploy)

**Done when:**
- [ ] Audit checklist completed; queue populated
- [ ] At least one fix task (034+) exists if any medium+ finding
- [ ] `yarn build` + `yarn lint` + `yarn doctor --verbose --scope full`
- [ ] No new secrets committed

---

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
| _(empty)_ | | | | |

**Templates** — add `### 034 · Security fix — …` or `### 035 · Performance fix — …` below this table when auditing.

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

**Next ready:** 027 → … → 031 → **032** and **033** (can run in parallel after 031).

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
- [ ] **027** — Timeline dot alignment
- [ ] **028** — Skills + timeline hover lift (like Medium)
- [ ] **029** — Projects full layout alignment
- [ ] **030** — Admin layout alignment
- [ ] **031** — Full QA (Playwright + Doctor + Scan)
- [ ] **032** — Security audit + remediation queue
- [ ] **033** — Performance audit + remediation queue
- [ ] **034+** — Fixes from audits _(created by 032/033)_
- [ ] ~~Production deploy + DNS~~ (deferred)
