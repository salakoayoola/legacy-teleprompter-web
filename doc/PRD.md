# 📱 Legacy Teleprompter — PRD & Upgrade Plan

> Upgrading the project within its defining constraint: **the frontend must remain ES5-only and render correctly on Safari / iOS 9.3.5**.

---

## Project Archaeology — What I Found

| Area | Issue | Severity |
|---|---|---|
| `.gitignore` | **Unresolved merge conflict** (lines 25-46) with `<<<<<<< HEAD` / `>>>>>>>` markers | 🔴 Bug |
| `Dockerfile` | Pinned to `node:18-alpine` — Node 18 reached EOL April 2025 | 🟡 Stale |
| `package.json` | `express@^4.18.2` and `sqlite3@^5.1.6` — functional but behind major versions | 🟡 Stale |
| `server.js` | No `PUT` route — can't update a saved script, only create/delete | 🟡 Missing feature |
| `server.js` | No input validation/sanitization, no security headers, no CORS config | 🟡 Security |
| `server.js` | No health-check endpoint for Docker/Traefik | 🟢 Nice-to-have |
| `web/index.html` | Title says "Prompter v4" — no version context elsewhere | 🟢 Cosmetic |
| `README.md` | File structure section references single-file architecture but the project is now split (`server.js` + `web/index.html`) | 🟡 Stale docs |
| `README.md` | Deployment section has unclosed code fence — markdown is broken from line 77 onward | 🟡 Stale docs |
| `docker-compose.yml` | No `healthcheck`, no pinned compose version, Watchtower label present but no mention in README | 🟢 Nice-to-have |

---

## User Stories

1. **US-1**: As a developer, I want a clean repo with no merge conflicts or stale docs so the project is easy to pick back up.
2. **US-2**: As a developer, I want the Node.js runtime and dependencies to be on supported LTS versions so I don't ship known vulnerabilities.
3. **US-3**: As a user, I want to edit an existing saved script without deleting and re-creating it.
4. **US-4**: As a user, I want a countdown before auto-scroll begins so I have time to settle before speaking.
5. **US-5**: As a user, I want to resume a script from where I left off last time.
6. **US-6**: As a user, I want to collapse the controls overlay to maximize screen real estate on my small iPad Mini.
7. **US-7**: As an operator, I want security headers and input validation on the API so the server is hardened.
8. **US-8**: As an operator, I want a health-check endpoint so Docker and Traefik can monitor the container.
9. **US-9**: As an operator, I want a multi-stage Dockerfile and `.dockerignore` so the image is small and secure.
10. **US-10**: As an operator, I want a backup script for the SQLite database.
11. **US-11**: As a user reading on a modern browser, I want to toggle Voice-Tracked Autoscrolling so the script scrolls automatically as I speak (progressive enhancement).
12. **US-12**: As a user, I want a Calibration Tool to measure my reading words-per-minute (WPM) and auto-configure my optimal font size, margin, and scrolling speed.

---

## Proposed Changes

### Tier 1 — Housekeeping (zero-risk cleanup)

#### [MODIFY] `.gitignore`
- Resolve the merge conflict — consolidate both sides into a single, clean file.

#### [NEW] `.nvmrc`
- Pin `22` (current LTS) so local dev matches the target Docker image.

#### [MODIFY] `README.md`
- Fix the unclosed code fence in the Deployment section.
- Update the file structure diagram to reflect the actual `server.js` + `web/` architecture.
- Add a "Local Development" section (`npm install && node server.js`).
- Mention Watchtower auto-updates since the label is already in compose.

#### [MODIFY] `package.json`
- Add `"start": "node server.js"` and `"dev": "node --watch server.js"` scripts.
- Add `"engines": { "node": ">=22" }`.

---

### Tier 2 — Backend Modernization

> The backend runs server-side only — none of these changes affect iOS 9.3.5 compatibility. The frontend remains pure ES5.

#### [MODIFY] `Dockerfile`
- Upgrade base image to `node:22-alpine`.
- Add multi-stage build (build stage installs deps, runtime stage copies only `node_modules` + app code).
- Add `HEALTHCHECK` instruction.
- Run as non-root user.

#### [MODIFY] `docker-compose.yml`
- Add `healthcheck` block matching the Dockerfile endpoint.
- Optionally add commented-out `ports: ["3000:3000"]` for non-Traefik local testing.

#### [MODIFY] `package.json`
- Upgrade `express` → `^5.1` (stable since April 2025).
- Replace `sqlite3` with `better-sqlite3` — synchronous API, faster, no native build issues on Alpine.
- Add `helmet` for security headers.

#### [MODIFY] `server.js`
- **Add `PUT /api/scripts/:id`** — update an existing script (title, content, settings).
- **Add `GET /health`** — returns `{ status: "ok" }` for Docker/Traefik health checks.
- **Add `helmet()`** middleware for security headers (X-Frame-Options, CSP, etc.).
- **Add input validation** — reject empty titles, cap content length at a sensible limit.
- **Migrate from `sqlite3` to `better-sqlite3`** — simplifies all callback-based DB code to synchronous calls.
- **Graceful shutdown** — handle `SIGTERM` to close the DB cleanly.

---

### Tier 3 — Frontend Enhancements (ES5-safe)

> Every line of frontend code must remain **strict ES5** — no `let`, `const`, arrow functions, template literals, `Promise`, `fetch`, Flexbox, or CSS Grid.

#### [MODIFY] `web/index.html`
- **Edit-in-place**: When loading a saved script, show an "Update" button alongside "Save Script" that fires a `PUT` to the new endpoint instead of creating a duplicate.
- **Countdown timer**: 3-2-1 overlay before auto-scroll begins, giving the speaker time to settle.
- **Position memory**: Save `scrollTop` to `localStorage` keyed by script ID so you can resume where you left off.
- **Improved controls UX**: Make the overlay collapsible (tap a thin bar to toggle) so it doesn't eat screen real estate on the small iPad Mini display.
- **WPM Pace Calibrator**: Simple 38-word test paragraph read interface calculating reading Words-Per-Minute (WPM) and mapping this directly to the recommended prompter speed index (bounded between 5-75).
- **Voice-Tracked Autoscrolling**: Optional progressive enhancement utilizing the Web Speech API (`SpeechRecognition`). Wraps every word of the teleprompter script inside individual `<span>` elements with coordinates, matching spoken text and scrolling to the corresponding word height (automatically hidden on legacy iOS 9 browsers lacking SpeechRecognition).
- **Visual polish**: Subtle CSS transitions on view switches (opacity fade via `-webkit-transition`, fully supported on iOS 9).

---

### Tier 4 — Infrastructure Hardening (optional)

#### [NEW] `.dockerignore`
- Exclude `.git`, `node_modules`, `data/`, `README.md`, `.env` from the build context.

#### [NEW] `scripts/backup.sh`
- Simple shell script to `cp` the SQLite DB file with a timestamp — useful for the volume-mounted `data/` directory.
