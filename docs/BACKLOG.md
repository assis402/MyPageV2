# Backlog — MyPageV2

Single control file. **Do not create one MD per task.**

Status: `todo` → `doing` → `done` | `blocked`

Legacy reference: `C:\Users\Matheus\Desktop\matheus\MyPage`

Dev picks **one task at a time** from **Next (ready)**, top to bottom.

---

## Locked decisions

- **Visual:** same external appearance as legacy
- **Code:** modern Next.js structure (not a line-by-line port)
- **Performance:** high priority (Server Components, ISR, `next/image`, minimal client JS)
- **Courses:** out of scope entirely
- **Projects:** personal GitHub repos only (tag `mypage`)
- **Nav:** About + Projects (no Courses link)
- **Deploy / hosting:** out of scope for now (hosting provider TBD)

---

## In progress

_(empty)_

---

## Next (ready)

### 015 · SEO, metadata, legacy URL redirects
**Status:** todo | **Dep:** 004 ✓

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

---

## Backlog (003 → 016)

Full specs below. Move task to **In progress** when starting; to **Done** when merged.

---

### 003 · Design tokens — legacy CSS → Tailwind theme
**Status:** done | **Dep:** 001 ✓

---

### 005 · Static assets migration
**Status:** done | **Dep:** 001 ✓

---

### 004 · Layout — header, mobile menu, footer
**Status:** done | **Dep:** 002 ✓, 003 ✓, 005 ✓

**Scope:**
- `src/components/layout/`: `Header`, `MobileMenu`, `Footer`, `ScrollToTop`, `LocaleSwitcher`
- Fixed header: profile photo → home, username link, nav (**About**, **Projects**), locale flags
- Mobile hamburger + slide menu (port `handleMobileMenu` behavior from `shared.js`) — `"use client"`
- Footer: Contact section (GitHub, LinkedIn, Medium, email with copy-to-clipboard popup) — client only for copy
- Scroll-to-top button (show/hide on scroll) — client
- Footer variant: `secondary-footer` class on non-home routes (match legacy)
- Wire layouts: root `layout.tsx` (font) + `[locale]/layout.tsx` (shell)
- i18n for all nav/footer strings

**Out of scope:** page body content, courses nav, jQuery

**Done when:**
- Visual parity desktop + mobile vs legacy header/footer
- Locale switch from header preserves route
- Email copy works
- `yarn build` + `yarn lint` pass

---

### 006 · Home — hero + about
**Status:** done | **Dep:** 004 ✓

### 007 · Home — skills
**Status:** done | **Dep:** 006 ✓ | **Legacy:** `Views/Home/_Skill.cshtml`, `home.css`, `home.js` (`animateAbout`)

**Scope:**
- `SkillBar` component — title, 5-level bar, staggered animation delay
- Skills list (same as legacy): C# .NET, Unit Test, Integration Test, TypeScript, Angular, React Native, Azure, React, DevOps — levels 1–4
- Animate bars on scroll into view — minimal client hook or CSS `@scroll`-based; avoid heavy libs

**Out of scope:** timeline, Medium, certifications (removed from home)

**Done when:**
- Visual parity with legacy skill bars
- Animation triggers on scroll (same feel as legacy)

---

### 008 · Home — experience timeline
**Status:** done | **Dep:** 006 | **Legacy:** `Views/Home/Index.cshtml` (Background), `home.js` (`seeMoreTimeline` / `seeLessTimeline`)

**Scope:**
- `Timeline` + `TimelineEntry` components — 3 experiences (Dotz/Labsit, FitBank×2)
- Each entry: dates, title, company link, resume, expandable technologies + attributions (HTML lists from i18n)
- `"use client"` for expand/collapse only; only one entry expanded at a time (legacy behavior)
- Company logos/icons, gradient bars, timeline circles — match `home.css`
- “More on LinkedIn” link at bottom

**Out of scope:** Medium section

**Done when:**
- Timeline matches legacy layout and expand/collapse behavior
- All copy via i18n (including HTML fragments where legacy uses `@Html.Raw`)

---

### 009 · GitHub projects service + server cache
**Status:** done | **Dep:** 001 ✓ | **Legacy:** `GitHubIntegration.cs`, `ProjectsService.cs`, `GitHubRepositoryModel.cs`, `GitHubCustomPropertiesModel.cs`

**Scope:**
- `src/lib/github/`:
  - `fetchRepositories()` — GET repos URL with `GITHUB_TOKEN`, headers per legacy
  - Filter repos where `topics` includes `GITHUB_TOPIC_NAME` (`mypage`)
  - For each repo: fetch `{rawBaseUrl}{full_name}{customPropertiesPath}` → `mypage-props.json`
  - Map `DescriptionDictonary` → localized description by locale (`en-US` / `pt-BR`)
  - `getProjects(locale)` wrapped in `unstable_cache` (TTL from `CACHE_REVALIDATE_SECONDS`)
  - `getProjectTags(locale)` derived from cached projects, also cached
  - `revalidateProjectsCache()` for admin
- Types in `src/types/github.ts`
- Search helper: match title + description (case insensitive)
- Tag filter helper

**Out of scope:** UI, admin page

**Done when:**
- Server function returns same data shape as legacy `ProjectsPageModel`
- Cache works; revalidate function exported
- Token never exposed to client
- Unit test or simple script verifying fetch shape (optional but preferred)

---

### 010 · Projects page — search, tags, video modal
**Status:** done | **Dep:** 004, 009 | **Legacy:** `Views/Projects/Index.cshtml`, `projects.css`, `projects.js`

**Scope:**
- Route: `src/app/[locale]/projects/page.tsx`
- Search form + tag chips (toggle tag filter); URL search params: `?search=&tag=`
- Project cards: title, tags, description, links (GitHub, NuGet, Swagger, video)
- `VideoModal` client component for YouTube/embed URLs (port `openVideoModal`)
- Empty state when no results
- Server-render project list; client for search/tag UI + modal
- Visual parity with `projects.css`
- i18n: search placeholder, video label

**Out of scope:** courses, admin

**Done when:**
- `/en-US/projects` and `/pt-BR/projects` work
- Search + tag filter match legacy behavior
- Descriptions localized via `mypage-props.json`
- Video modal works

---

### 011 · Medium publications service + server cache
**Status:** done | **Dep:** 001 ✓ | **Legacy:** `MediumIntegration.cs`, `MediumResponseModel.cs`, `PublicationsCacheService.cs`

**Scope:**
- `src/lib/medium/`:
  - `fetchPublications()` — GET `MEDIUM_INTEGRATION_URL`, parse posts, sort by date desc, take 10
  - Graceful empty array on failure (legacy try/catch)
  - `getPublications()` with `unstable_cache` (same TTL env var)
  - `revalidatePublicationsCache()` for admin
- Types: title, description, imageUrl, url, createdAt, formatted date helper
- Env vars already in `.env.example`

**Out of scope:** UI

**Done when:**
- Cached server function returns publication list
- Revalidate export works

---

### 012 · Home — Medium section
**Status:** done | **Dep:** 006, 011 | **Legacy:** `Views/Home/Index.cshtml` (Medium section)

**Scope:**
- `MediumSection` Server Component — top 5 posts from `getPublications()`
- Card layout: image (`next/image`), title, description, date
- PT-BR locale: show subtitle “(apenas em inglês)” like legacy
- “More on Medium” link if >5 posts (`MEDIUM_USER_URL`)
- Match legacy `medium-card` styling

**Out of scope:** courses section (removed)

**Done when:**
- Section renders on home with cached data
- Visual parity with legacy Medium block

---

### 013 · Admin — Google auth (owner only)
**Status:** done | **Dep:** 001 ✓ | **Legacy:** `AdminController.cs`, `AdminService.cs`

**Scope:**
- Auth.js (or NextAuth v5) with Google provider
- Route: `src/app/[locale]/admin/page.tsx` (English UI only, match legacy “*English page only*”)
- Allowlist: owner email only (`assis4002@gmail.com` — move to env `ADMIN_EMAIL`)
- Login / logout flow
- Protected admin actions (task 014)
- Env: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AUTH_SECRET`, `AUTH_URL`

**Out of scope:** courses management buttons, cache UI (task 014)

**Done when:**
- Unauthenticated → Google login button
- Non-owner rejected with message
- Owner session works; logout works

---

### 014 · Admin — cache invalidation UI
**Status:** done | **Dep:** 013, 009, 011 | **Legacy:** `Views/Admin/Index.cshtml`, `AdminController` Clear* actions

**Scope:**
- Admin panel options (no courses):
  - Clear projects cache → calls `revalidateProjectsCache()`
  - Clear articles cache → calls `revalidatePublicationsCache()`
  - Logout
- Server Actions or Route Handlers for cache clear (auth guarded)
- Success/error feedback (toast or inline message — avoid `alert()` if possible, or match legacy)
- Visual parity with `admin.css`

**Out of scope:** courses cache, CRUD

**Done when:**
- Owner can clear both caches and see confirmation
- After clear, home/projects fetch fresh data

---

### 015 · SEO, metadata, legacy URL redirects
**Status:** todo | **Dep:** 004 | **Legacy:** `_Layout.cshtml` meta tags

**Scope:**
- `generateMetadata` per locale for home, projects, admin
- Title: “Matheus de Assis Developer” (or i18n variant)
- Description, `theme-color`, Open Graph, Twitter cards
- `src/app/sitemap.ts` — locale routes
- `src/app/robots.ts`
- Redirects in `next.config`:
  - `/Projects` → `/en-US/projects` (or locale-aware — document choice)
  - `/Courses` → `/en-US` (removed feature)
  - `/Admin` → `/en-US/admin`
- `metadataBase` from `NEXT_PUBLIC_SITE_URL`

**Out of scope:** OG image generation pipeline (static default OK)

**Done when:**
- View-source shows correct meta per page
- Legacy bookmarks redirect correctly
- sitemap.xml and robots.txt accessible

---

### 016 · Performance + accessibility pass
**Status:** todo | **Dep:** 006, 007, 008, 010, 012 | **Legacy:** —

**Scope:**
- Lighthouse mobile audit on `/en-US` and `/en-US/projects` — target **≥ 90** Performance
- Fix: image sizes, lazy loading, reduce client JS bundle, eliminate layout shift
- Audit `"use client"` boundaries — shrink where possible
- a11y: alt text, aria labels on menu/locale/copy buttons, focus states, contrast check
- Prefer CSS over JS for animations already in legacy
- Optional: `@next/bundle-analyzer` one-time report — document findings in PR summary, not a new MD file

**Out of scope:** new features

**Done when:**
- Lighthouse Performance ≥ 90 mobile on home + projects
- No critical a11y violations on main flows
- `yarn build` passes

---

## Removed from scope

~~Courses page~~ · ~~Home courses preview~~ · ~~Firestore~~ · ~~Courses CRUD~~ · ~~Courses cache~~ · ~~Courses nav~~ · ~~Admin manage certificates~~

## Deferred (hosting TBD)

Not in backlog until hosting provider is decided:

~~**017 · Deploy CI/CD**~~ — pipeline + hosting setup

~~**018 · DNS cutover + smoke test**~~ — point matheusassis.dev to new site

When ready, reopen as new tasks (may get new IDs).

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

004 ─── 015
006,010,012 ─── 016
```

**Next ready:** 015 (SEO, metadata, legacy URL redirects).

---

## Pending decisions

- [ ] Hosting provider (deferred — was 017/018)
- [ ] Rotate GitHub / Google secrets when wiring integrations (do not reuse legacy committed tokens)

---

## Parity (checklist)

- [ ] Visual match with legacy (layout + theme)
- [ ] Home — hero, about, skills, certs, timeline, Medium, CV download
- [ ] Projects — GitHub list, search, tag filters, video modal
- [x] Nav — About + Projects only
- [x] i18n en/pt
- [x] Footer — contact links + email copy
- [ ] Admin — Google auth + cache clear (projects + publications)
- [ ] SEO + legacy URL redirects
- [ ] Performance ≥ 90 Lighthouse (mobile)
- [ ] ~~Production deploy + DNS~~ (deferred)
