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
- **UX preview:** Direction C behind toggle (018 ✓); promote to default only via 019 after approval
- **Home v2 (UX rodada 2):** Zone B flat bg, skills icon grid, timeline cards — [`docs/ux/secoes-about-skills-background.md`](ux/secoes-about-skills-background.md)

---

## In progress

_(none)_

---

## Next (ready)

### 022 · Home — Experience timeline cards
**Status:** todo | **Dep:** 020 | **UX:** [`secoes-about-skills-background.md`](ux/secoes-about-skills-background.md) §5 · [proto](ux/prototypes/proto-background-dev-reference.png)

**Goal:** Background section = card-based timeline on Zone B — no purple `ui-section-tinted` gradient.

**Scope:**
- Refactor `TimelineEntry.tsx` / `TimelineSection.tsx` — each role in a card (`rgb(255 255 255 / 3%)` surface, subtle border, hover accent)
- Vertical line + dots on the left; cards to the right (desktop)
- **Preserve** expand/collapse (technologies + attributions), exclusive open, LinkedIn link
- Remove / replace tinted gradient wrapper on timeline section (`tone="content"` or equivalent)
- **Mobile:** full-width cards, line on left — **no** `position: absolute; left: 153px` layout

**Out of scope:** Medium section redesign, projects page

**Done when:**
- [ ] Timeline matches card proto; expand/collapse still works
- [ ] Section bg is flat Zone B (no nebula/tinted purple)
- [ ] Mobile ~375px readable, no horizontal overflow
- [ ] `yarn build` + `yarn lint` pass

---

## Queue

| ID | Title | Dep | UX ref |
|----|-------|-----|--------|
| 023 | Projects page — flat Zone B bg | 020 | secoes §7 #5 |
| 019 | Promote Direction C to default | 018 + Matheus OK | direcao-c |

### 023 · Projects page — flat content zone (detail)

**Status:** todo | **Dep:** 020 | **UX:** secoes §7 decision #5

- Apply `--color-content-zone-bg` to projects route (match home Zone B)
- Keep search/tags/cards behavior; align card surfaces with 022 if already merged
- Preview C calmer cards (018) should still work on flat bg

**Done when:** `/projects` visually consistent with home content zone; no nebula on page bg.

---

### 019 · Promote Direction C to default _(blocked — Matheus approval)_

Remove `UX_PREVIEW_DIRECTION` / cookie toggle; inverted CTAs + featured strip + calmer project cards become **default**. Delete or merge redundant non-preview hero CSS. Only open after Matheus confirms preview C.

**Dep:** 018 ✓ + explicit approval.

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
006,010,012 ─── 016 ✓ ─── 017 ✓ ─── 018 ✓ ─┬─ 019 (if approved)
                                            └─ 020 ✓ ─┬─ 021 ✓
                                                      ├─ 022
                                                      └─ 023
```

**Next ready:** 022 (023 after 020). **019** blocked on approval.

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
- [ ] **022** — Timeline cards
- [ ] **023** — Projects flat zone bg
- [ ] **019** — Promote C to default _(only if Matheus approves)_
- [ ] ~~Production deploy + DNS~~ (deferred)
