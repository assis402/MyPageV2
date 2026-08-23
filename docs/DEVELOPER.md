# Developer Agent — MyPageV2

Implements what the **Coordinator** delegates. Read this file + `BACKLOG.md` + `COORDINATOR.md`.

**Convention:** all code in **English**. User-facing strings in i18n message files only.

---

## Role

- Implement **one task at a time** (backlog ID)
- **Same look** as legacy externally; **modern code** internally
- Use legacy C# / CSS / assets only as **reference** — do not port architecture or monolithic files
- **No courses** — never add course pages, nav links, Firestore, or course admin
- **Projects = GitHub only** (personal repos, tag `mypage`)

---

## Before coding

1. Confirm ID and status in `BACKLOG.md`
2. Open the matching legacy view/CSS for visual reference
3. Verify dependencies (`Dep`) are `done`

---

## On delivery

1. `yarn build` and `yarn lint` pass
2. Update `BACKLOG.md` → `done`
3. For UI: note how visual parity was verified
4. Short summary: what changed, main files, how to test
5. **Commit + push** the task on the current branch (no `--force`). Do this after every completed task, not in a batch at the end.

Never commit `.env` or secrets.

### Commit messages — [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- **Types:** `feat` (new capability), `fix` (bug), `docs`, `refactor`, `style`, `perf`, `chore`, `build`, `ci`, `test`
- **Scope (optional):** area of the app, e.g. `layout`, `i18n`, `home`, `projects`
- Description in English, imperative, lowercase after the colon
- Include the backlog ID in the body (`Refs: 004`)
- Breaking changes: `!` after type/scope and/or a `BREAKING CHANGE:` footer

```
feat(layout): add shared header and footer

Chrome matches the live site so later pages reuse the same shell.
No Courses nav item.

Refs: 004
```

---

## Code rules

- Secrets in `.env` / `.env.example` only
- **Server Components by default** — `"use client"` only for interactivity (mobile menu, timeline expand/collapse, CV dropdown)
- **i18n:** `next-intl` — no hardcoded locale strings in components
- **Images:** `next/image` with dimensions; lazy-load below fold
- **Fonts:** `next/font`
- **Fetch:** GitHub/Medium on server; cache with `unstable_cache` or ISR
- Small, focused components under `components/{feature}/`
- English-only identifiers and comments

---

## Performance rules

- No client-side data fetching for page content
- No large client libraries (no moment.js, no full icon packs if SVGs exist in legacy)
- Prefer CSS animations over JS where legacy already does
- Dynamic imports for heavy client-only pieces
- Keep public routes as static/ISR-heavy as possible

---

## Visual parity rules

- Compare against legacy `wwwroot/css/` and live layout before marking UI done
- Reuse legacy SVGs and images from `public/`
- Nav: **About + Projects** only (no Courses)
- Home: no courses section

---

## Typical handoff

```
Implement task 001 from BACKLOG.md.
Legacy: n/a.
Visual: n/a.
Done when: yarn dev and yarn build pass.
Out of scope: courses, pages, integrations.
```
