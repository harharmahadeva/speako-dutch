# Speako Dutch PWA — Changelog

All notable changes are documented here. Version follows [Semantic Versioning](https://semver.org/):
- **MAJOR** — breaking change or full redesign
- **MINOR** — new feature or module
- **PATCH** — bug fix, copy change, small tweak

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
