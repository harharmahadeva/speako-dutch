# Speako Dutch PWA — Changelog

## [Unreleased]

---

## 2026-06-23

### Added
- **Lezen Sample Test** — full timed exam across all 5 passages back-to-back; wrong answer breakdown with passage label and explanations at the end
- **Schrijven module** — 5 AI-evaluated writing tasks (email/letter formats); scored on Taakvoltooiing, Grammatica, Woordenschat, Structuur (25 pts each); shows corrected sentence and example opening
- **Schrijven Sample Test** — random single-prompt quick mode
- **OGO Sample Test** — 5 random scenarios, batch AI evaluation, per-scenario pass/partial/fail feedback with corrections
- **Weakness Report** — cross-module dashboard; red section for modules below 70% with deeplinks to practice, green section for passing modules
- All stub functions referenced in `renderExamHome()` now implemented (no more JS errors on exam tab buttons)

### Changed
- KNM: weakness analysis shows per-category breakdown and full wrong answer review with explanations and flashcard deeplinks
- Two-tier exam system: Practice (random subset) and Sample Test (full/timed) buttons side-by-side per module

---

## 2026-06-20

### Added
- **Inburgeringsexamen Prep tab** (4th tab) with KNM, Lezen, Schrijven, OGO modules
- 50 KNM questions across 6 categories (shuffled per session)
- 5 Lezen passages (huurcontract, gemeente, OV-chipkaart, NS reisinfo, werkgeversbrief)
- 5 Schrijven prompts
- 10 OGO scenarios
- ONA exemption banner (HSM visa / 30% ruling)
- Resume-on-login banner per user
- XP system and readiness score persisted in localStorage per user
- Two new accounts: sandy / 8003 / Sandeep, amar / 2008 / Amarnath

### Security (OWASP Top 10)
- A02: PIN hashed with SHA-256 (crypto.subtle); sessionStorage stores pinHash only, never raw PIN
- A03: `esc()` sanitises all untrusted strings before DOM insertion
- A04: Rate limiting on AI API calls (20/min)
- A05: CSP meta tag in `<head>`
- A07: 3s login delay after failed attempt
- A08: `safeParseLesson`/`safeParseTest` validate AI JSON responses

### Changed
- Full UI/UX redesign: warm dark palette (`--bg:#0f1117`), reduced eye strain, improved contrast
- Body font 15px, line-height 1.65
- All content Dutch/NL (removed German conditionals, DAY_TOPICS German array)
- Speech recognition and synthesis set to `nl-NL` everywhere

---

## 2026-06-18 — Project Init

- Repository created as standalone Dutch PWA (branched from deutsch-jetzt)
- Removed German users (Manisha, Nikhil); kept Sakshi (sharmsa / 1990)
- All AI prompts updated to Dutch/Amsterdam/NL context
- 45-day Dutch inburgering A2 curriculum
