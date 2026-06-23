# Speako Dutch PWA — Changelog

All notable changes are documented here. Version follows [Semantic Versioning](https://semver.org/):
- **MAJOR** — breaking change or full redesign
- **MINOR** — new feature or module
- **PATCH** — bug fix, copy change, small tweak

---

## [1.6.1] — 2026-06-24

### Fixed
- **API timeout** — all AI fetch calls now use `apiFetch()` helper with 25-second AbortController timeout; spinner no longer hangs forever if Groq is slow or unreachable
- Shows Dutch error message ("Verzoek verlopen") instead of infinite spinner on timeout
- Replaced 9 raw `fetch('/api/claude')` calls across lesson, exercises, drill, test, chat, Schrijven, OGO modules — all now go through single `apiFetch()` wrapper

---

## [1.6.0] — 2026-06-24

### Added
- **Full Luisteren module** (Phase 2) — complete listening comprehension system replacing stub
- `LUISTEREN_FRAGMENTS` data: 5 Dutch audio fragments (gemeente loket, huisarts, NS treinstation, sollicitatiegesprek, supermarkt) with 3 MCQ each (15 total)
- **TTS playback** via `window.speechSynthesis` with nl-NL voice, normal and slow (0.8x) speed controls, stop/replay toggle
- **Practice mode** — 2 random fragments; per-fragment scores saved individually; instant MCQ feedback with Dutch explanations
- **Sample Test mode** — all 5 fragments in order, 25-minute countdown timer, auto-submits when time runs out
- **Weakness analysis** — wrong-answer review grouped by context (gemeente/dokter/trein/werk/winkel) with counts
- `startLuisterenFragment(idx)` — launch any single fragment directly from the fragment list
- Per-fragment `saveExamScore(f.id, ...)` + `saveExamScore('luisteren', ...)` for sample test total
- XP rewards: 40 XP (practice pass), 15 XP (practice fail), 60 XP (test pass), 25 XP (test fail)

### Fixed
- `renderLuisterenFragment` now routes to `showLuisterenSampleResult` vs `showLuisterenPracticeResult` based on mode (previously always called practice result)

---

## [1.5.0] — 2026-06-23

### Changed
- **Full UI/UX redesign** — complete visual overhaul inspired by modern language learning apps
- **Bottom navigation bar** (fixed, thumb-friendly) replaces top tab bar — Home · Lesson · Speaking · Examen
- **Dutch orange accent** (`#f0700a`) replaces blue/purple as primary CTA color — warmer, less eye strain
- **Palette refresh** — darker, warmer background (`#0d1117`), softer card surfaces, reduced border contrast
- **Tab transitions** — smooth `fadeSlideUp` animation (0.22s) on every tab switch
- **Streak card** on Home — flame icon, day count, XP pill, readiness % in one compact bar (replaces 3-col stat grid)
- **Home action cards** — updated hover (orange border glow, -3px lift, 0.2s ease)
- **Exam grid: 3×2 layout** — 6 cards (KNM · Lezen · Schrijven | OGO · Luisteren · Mock Exam)
- Each exam module card gets a **color-coded left border** accent (blue/cyan/violet/orange/green/gold)
- **KNM options** slide right on hover; **back button** slides left on hover
- **Bottom nav active state** — orange dot bar at top + icon scale + label color change
- Session bar, motivation banner, cards all with softened borders and transitions
- iOS safe-area inset respected in bottom nav padding

### Added
- **Luisteren module stub** — 🎧 card in exam grid; full audio MCQ coming in Phase 2
- **Mock Exam stub** — ⏱️ card shows 5-module plan (KNM 35min → Lezen 35min → Luisteren 25min → Schrijven 60min → OGO 15min); full simulator coming in Phase 3
- `tab-animate` CSS animation class for smooth tab entry
- `.streak-card` component (flame + count + XP + readiness in one row)
- `.nav-active-bar` — animated orange line above active nav item
- `--ease` CSS variable for consistent cubic-bezier across all transitions

---

## [1.4.0] — 2026-06-23

### Added
- **Home dashboard tab** — new landing screen with 4 action cards (Lesson, Speaking, Test, Exam), XP / Day / Readiness stats row, session progress bar, motivation banner, 45-day journey dots all in one view
- `renderHomeTab()` — dynamically updates test locked/unlocked state, stats, and day number
- App now lands on Home tab on login; lesson loads in background

### Changed
- Tabs: Home | Lesson | Speaking | Examen (Test accessible via Home card, no longer a separate tab)
- Session bar and 45-day dots moved from above tabs into the Home tab — eliminates the long scroll before reaching content
- Button redesign: smooth cubic-bezier transitions, lift + glow on hover, ripple overlay on all buttons, active scale, consistent pill shape
- Arrows removed from all entry/action buttons (Start, Submit, Get scenario, Practice now etc.)
- Arrows kept only on navigation/flow buttons (Volgende →, Next →, See Results 🎯)
- `disc-btn` and `login-btn` updated to match new pill style

---

## [1.3.1] — 2026-06-23

### Fixed
- Disclaimer screen: "Before You Begin" title and subtitle now center-aligned to match logo/tagline above
- JS syntax error (`isNL?` ternary with no false branch) that crashed app on load, leaving users stuck on spinner
- CORS: API now allows all `*.vercel.app` origins instead of hardcoded URL
- CORS: added `speako-dutch.vercel.app` to allowed origins

---

## [1.3.0] — 2026-06-23

### Added
- **App icon** — eye-catching tulip + Dutch flag + speech bubble design with SPEAKO text and NL badge
- `icon-512.png` and `icon-192.png` — proper PNG icons for Android home screen install and PWA manifest
- `apple-touch-icon.png` (180x180) — replaces SVG for iOS home screen, renders correctly on all iPhones
- `icon-source.svg` — master source file for future icon edits
- manifest.json updated with full icon set (192px any, 512px maskable, SVG fallback)
- `<link rel="apple-touch-icon">` in index.html now points to PNG (iOS Safari requires PNG, not SVG)

---

## [1.2.0] — 2026-06-23

### Added
- **Lezen Sample Test** — full timed exam across all 5 passages back-to-back; wrong answer breakdown with passage label and explanations at the end
- **Schrijven module** — 5 AI-evaluated writing tasks (email/letter formats); scored on Taakvoltooiing, Grammatica, Woordenschat, Structuur (25 pts each); shows corrected sentence and example opening
- **Schrijven Sample Test** — random single-prompt quick-fire mode
- **OGO Sample Test** — 5 random scenarios, batch AI evaluation, per-scenario pass/partial/fail feedback with corrections
- **Weakness Report** — cross-module dashboard; modules below 70% listed with score bars and "Practice now" deeplinks; passing modules shown in green
- `APP_VERSION` constant in index.html; version number shown in app footer
- Manifest.json corrected: name/description/colors updated to Dutch/dark theme (was still showing German content)

### Fixed
- All stub functions referenced in `renderExamHome()` now implemented — no more JS errors when clicking exam tab buttons

---

## [1.1.0] — 2026-06-23

### Added
- **Inburgeringsexamen Prep tab** (4th tab) with KNM, Lezen, Schrijven, OGO modules
- **Two-tier exam system** — Practice (random subset, instant feedback) and Sample Test (full/timed, analysis at end) buttons per module; Sample Test always unlocked
- 50 KNM questions across 6 categories with shuffled order per session
- KNM weakness analysis — per-category breakdown + full wrong answer review with explanations and flashcard deeplinks
- 5 Lezen passages (huurcontract, gemeente, OV-chipkaart, NS reisinfo, werkgeversbrief)
- 5 Schrijven prompts
- 10 OGO scenarios
- ONA exemption banner (HSM visa / 30% ruling)
- Resume-on-login banner per user (auto-hides after 5s)
- XP system and readiness score persisted in localStorage per user
- Two new accounts: sandy / 8003 / Sandeep, amar / 2008 / Amarnath

### Security (OWASP Top 10)
- A02: PIN hashed with SHA-256 (crypto.subtle); sessionStorage stores pinHash only, never raw PIN
- A03: `esc()` sanitises all untrusted strings before DOM insertion (XSS prevention)
- A04: Rate limiting on AI API calls (20/min)
- A05: CSP meta tag in `<head>`
- A07: 3s login delay after failed attempt (brute-force throttle)
- A08: `safeParseLesson`/`safeParseTest` validate AI JSON responses

### Changed
- Full UI/UX redesign: warm dark palette (`--bg:#0f1117`), reduced eye strain, improved contrast ratios
- Body font 15px, line-height 1.65
- Login/disclaimer gradients changed from harsh blue-purple to deep navy
- Body background simplified to single subtle gradient (removed noisy 3-layer radials)

---

## [1.0.0] — 2026-06-18

### Added
- Standalone Dutch PWA created (branched from deutsch-jetzt multi-language repo)
- 45-day Dutch inburgering A2 curriculum
- iOS Safari PWA install support (manifest.json, apple-touch-icon, standalone display)
- Claude AI via `/api/claude` for lesson generation (Days 8-45)
- Web Speech API (nl-NL) for pronunciation and TTS
- SVG animated progress rings
- User: sharmsa / 1990 / Sakshi

### Changed
- Removed German users (Manisha, Nikhil) from accounts
- All AI prompts updated to Dutch/Amsterdam/NL context
- Speech recognition set to nl-NL throughout
- All language conditionals removed (always Dutch)
