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
- **UX preview:** layout changes may ship behind a toggle until Matheus approves (task 018)

---

## In progress

_(none)_

---

## Next (ready)

_(empty — 019 only after Matheus approves Direction C)_

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
006,010,012 ─── 016 ✓ ─── 017 ✓ ─── 018 (preview)
                                      └── 019 (promote C — if approved)
```

**Next ready:** none — 019 only after Matheus approves Direction C.

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
- [ ] **019** — Promote C to default _(only if Matheus approves)_
- [ ] ~~Production deploy + DNS~~ (deferred)
