# Speako Dutch PWA — Changelog

---

## [2.5.4] — 2026-06-26

### Fixed
- **Loading screen nuclear fallback** — added a separate inline `<script>` block directly after the loading div that runs independently of the main script; if the main script fails for any reason (parse error, runtime error, cache issue), this 3-second timer forces the loading screen to hide and shows the login/disclaimer screen

---

## [2.5.3] — 2026-06-26

### Fixed
- **Loading screen stuck bug** — wrapped `window.onload` in a top-level try/catch with a `_showLoginFallback()` safety function; any unhandled error (e.g. localStorage blocked, unexpected exception) now always hides the loading screen and shows the login page instead of hanging forever

---

## [2.5.2] — 2026-06-26

### Added — Full responsive layout (iPhone · iPad · MacBook)

**iPad breakpoint (768–1023px)** — new `@media(min-width:768px) and (max-width:1023px)` rule: word cards and quiz options capped at 520–560px and centred, base font sizes bumped (+10%), buttons taller (50px), exam grid switches to 3 columns.

**MacBook sidebar nav (1024px+)** — bottom tab bar transforms into a 210px fixed left sidebar; nav items display horizontally (icon + label); active item gets an orange-tinted background chip instead of the underline bar; `.header` and `.main` offset right by 210px; home action cards switch to 3-column grid; lesson/quiz content centred at 680px max-width inside the wider canvas.

---

## [2.5.1] — 2026-06-26

### Added — Android v1.6.20 sync

**Dutch pronunciation tips** — `dutchPronTips(word)` detects tricky phonetic patterns and returns up to 2 amber chips (💡) shown below the pronunciation guide on both Daily Words cards and daily lesson word cards. Patterns detected: `tie`→tsee, `sch`/`ch`→keelklank, `ij`/`ei`→ay, `ui`, `oe`, `eu`, `au`/`ou`, `aa`/`ee`/`oo`/`uu` vowels, `g`→keelklank, `w`, `v` at start.

**Quiz Stop button** — "← Stop" button already present on all Daily Words quiz screens (chunk quizzes + mix quizzes); not shown on timed auto-dismiss transition screens.

**Mic feedback colors** — pronunciation result now uses solid light backgrounds: green `#DCFCE7` (score ≥80%), yellow `#FEF9C3` (50–79%), red `#FFE4E6` (<50%). "U zei:" transcript shown in grey `#6B7280` below the message. Result stays inside the word card, always visible without scrolling.

---

## [2.5.0] — 2026-06-26

### Added — 30-word topics + chunked adaptive quiz

**Dagelijkse Woorden expanded to 30 words per topic** (was 12). All 10 topics updated with 18 new A2-level words each — every word has `nl`, `pron`, `en`, `ex`, `exEn` fields.

**Chunked learning flow** — each topic now splits into 3 chunks of 10 words:
```
Learn 1–10  →  Adaptive quiz (chunk 1)
Learn 11–20 →  Adaptive quiz (chunk 2)  →  Mix quiz (words 1–20)
Learn 21–30 →  Adaptive quiz (chunk 3)  →  Final mix quiz (all 30)  →  Complete
```

**Word card header** shows "Deel X van 3 · woord N / 10" and progress bar covers the current chunk only.

**Mix quiz transition screen** — "🔀 Nu oefenen we alles samen!" (2.2s auto-dismiss) before each mix quiz.

**Cumulative score** tracked across all 5 quiz sessions (3 chunk + 2 mix); shown on the final complete screen with medal.

**Quiz pool** — MCQ distractors drawn from the current quiz word pool (not the full 30-word topic), so difficulty scales correctly per chunk.

---

## [2.4.3] — 2026-06-25

### Added — Dagelijkse Woorden Adaptive Quiz (Android v1.6.17 parity)

After completing all 12 words in a topic, users now enter a two-phase MCQ quiz instead of the plain completion screen.

**Phase 1 — English → Dutch**
- All 12 words in randomised order
- "Wat is het Nederlandse woord voor: *meeting*?" with 4 Dutch options
- Speed tracking: correct + <2 seconds = ⚡ mastered (skips Phase 2)
- Instant feedback: green flash + auto-advance (800ms correct / 1400ms wrong)
- 3-second countdown speed bar (green → orange → red)

**Transition screen (2.2s)**
- 🇳🇱 "Nu in het Nederlands!" full-screen prompt before Phase 2

**Phase 2 — Dutch context (fill-in-the-blank)**
- Only words not mastered in Phase 1
- Example sentence with Dutch word blanked out + pronunciation hint in italics
- Same 4-option MCQ + speed/feedback logic
- If all words mastered in Phase 1 → skip Phase 2 entirely

**Complete screen**
- Medal: 🥇 ≥90% / 🥈 ≥70% / 🥉 below
- Score: "X / Y goed" + mastered count
- Score-coloured progress bar
- Buttons: "🔁 Opnieuw oefenen" and "📚 Ander onderwerp"

---

## [2.4.2] — 2026-06-25

### Improved — Android sync (v1.6.16 parity)

**Logout button** — `⏻ Logout` icon button replaced with plain "Uitloggen" text button (Dutch, consistent with app language).

**Dagelijkse Woorden bilingual examples** — all 120 words now show the Dutch example sentence in blue italic AND the English translation below in grey (`exEn` field added to every word across all 10 topic packs).

**Daily Words back buttons** — already use `.exam-back-btn` outlined style from v2.4.1.

**Week strip + outlined back buttons** — already shipped in v2.4.1.

---

## [2.4.1] — 2026-06-25

### Improved — UI polish

**Week strip today indicator** — M T W T F S S circles now appear below the streak card on the home screen. Today's circle is highlighted with a blue border (`#2563EB`) and light blue fill; completed-lesson days fill solid blue. Lesson dates tracked in `userProgress.lessonDates` (ISO date strings).

**Back buttons outlined style** — `.exam-back-btn` updated to a white outlined pill (`transparent` background, `rgba(255,255,255,0.6)` border, `#ffffff` text, `border-radius:8px`) for better visibility on gradient headers.

---

## [2.4.0] — 2026-06-24

### Added — Dagelijkse Woorden vocabulary module

**New home screen card** — "🗣️ Dagelijkse Woorden" full-width card below the 2×2 grid; opens topic selection in the exam area.

**10 topic packs** (12 words each = 120 words total):
- 💼 Werk (office, contracts, meetings, payslip)
- 🏥 Ziekenhuis (appointments, prescriptions, blood test, insurance)
- 🚂 Station & Trein (platform, delay, transfer, chipkaart)
- 🚌 Bus & Tram (halte, check-in/out, timetable, monthly pass)
- ✈️ Luchthaven (gate, boarding pass, customs, hand luggage)
- 🛒 Supermarkt (kassa, bonus card, receipt, self-checkout)
- 🏛️ Gemeente (loket, DigiD, uittreksel, residence permit)
- 🏫 School & Onderwijs (enrolment, parents evening, compulsory education)
- 🏪 Winkelcentrum (escalator, fitting room, warranty, opening hours)
- 🏠 Thuis & Wonen (deposit, landlord, housing benefit, notice period)

**Word card** — large Dutch word (gradient), phonetic pronunciation guide, English meaning, example sentence (blue italic card), auto-plays TTS on load.

**Three action buttons per word:**
- 🔊 Luister — normal speed TTS (rate 0.85)
- 🐢 Langzaam — slow TTS (rate 0.65) for clear pronunciation
- 🎤 Spreek na — mic opens; listens in nl-NL; scores against the word with `similarityScore`; shows ✅/🟡/❌ + "U zei: …" transcript

**Navigation** — ← Vorige / Volgende → with progress bar; auto-cancels mic and TTS on page change. Completion card at end with Herhalen / Ander onderwerp options.

**iOS safe:** mic uses synchronous `r.start()` within user-gesture tap; `webkitSpeechRecognition` fallback for Safari.

---

## [2.3.1] — 2026-06-24

### Added
- **Bilingual sentence scaffold for Days 1–10** — sentence card now shows English translation below the Dutch sentence for the first 10 lesson days only
- `sentenceEn` field added to word schema (`safeParseLesson` + AI prompt)
- AI prompt requests `sentenceEn` (English translation of the `sentence` field) only when `day <= 10`
- Word card renders `🇬🇧 [English]` in grey below the italic Dutch sentence — only if `day <= 10` and `sentenceEn` is non-empty
- Days 11+ unchanged — Dutch sentence only (gradual immersion; by Day 15 reading cards begin)

---

## [2.3.0] — 2026-06-24

### Added — Vocabulary → Exam bridge (synced with Android v1.6.5)

**1. Example sentence on every word card**
- New `sentence` field added to lesson word schema (AI prompt + `safeParseLesson`)
- Shown as a light-blue 💬 card below the English translation on each word card
- Only renders when non-empty; italic Dutch text in real-life exam context (gemeente/dokter/NS/werk)

**2. "Lees dit!" reading card — Days 15–25**
- After finishing the last word of a lesson day, Days 15–25 now show a short Dutch text + 1 MCQ comprehension question before the vocabulary quiz
- `READING_CARDS` data object covers all 11 days with text, question, 4 options, and correct answer index
- Flow: last word → reading card → answer MCQ → "Verder naar quiz 🧠" button → mini-quiz → completion card
- Instant green/red feedback on answer; Verder button only appears after answering

**3. Vraagwoorden Gids — exam question word reference**
- New tile on Exam Home: "🔍 Vraagwoorden Gids — Begrijp elke examenvraag"
- Lists 15 Dutch question words (Wat/Waar/Wanneer/Wie/Waarom/Welke/Hoeveel/Hoe/Mag/Moet/Kan/Is/Zijn/Heeft/Welk) with English meaning and a real exam example sentence
- Two-column card layout: Dutch word (violet, large) | English + italic example
- Tip at top: "💡 Zie je een woord niet? Zoek het hier op voor je antwoord geeft."

---

## [2.2.0] — 2026-06-24

### Added — Vocabulary learning path (synced with Android v1.6.3)

**1. Mini-quiz after every lesson day**
- After completing all words on a lesson day, a 3-question vocabulary quiz appears before the completion card
- Each question shows the English meaning → user picks the correct Dutch word from 4 options
- Distractors are other words from the same day's lesson (shuffled)
- Instant MCQ feedback: green highlight = correct, red = wrong; auto-advances after 700ms
- Score screen: "X/3 goed" with message — Perfect (3/3), Goed gedaan (2/3), Herhaal (0–1/3)
- "Dag klaar! ✅" button on score screen leads to normal completion card
- Falls back to completion card directly if lesson has fewer than 2 words

**2. Exam relevance tag on lesson card**
- Small "🎯 Oefent: [module]" tag shown on the Today's Lesson home card
- `DAY_MODULE_MAP` covers all 45 days: Days 1–3 OGO, 4–6 KNM, 7 Herhaling, 8–9 KNM, 10–13 Schrijven, 14 Herhaling, 15–17 Lezen, 18–20 Luisteren, 21 Herhaling, 22–24 OGO/KNM, 25 Herhaling, 26–27 KNM, 28 Schrijven, 29–30 Lezen, 31–32 Luisteren, 33 Herhaling, 34–35 OGO, 36 KNM, 37 Schrijven, 38 Lezen, 39 Luisteren, 40 Herhaling, 41–45 Mock Exam
- Tag styled as small semi-transparent text on the lesson card

**3. Day 45 completion banner**
- Once all 45 days are completed (`done >= 45`), the lesson card transforms into a green celebration banner
- Shows: "🎓 45-daagse cursus voltooid!" + subtitle + "Start Proefexamen →" button
- Button navigates directly to Mock Exam
- Triggered by `renderHomeTab()` — no extra storage needed

---

## [2.1.0] — 2026-06-24

### Added — DUO A2 Audit Sync (aligned with Android app v1.6.2)

**KNM — expanded to 55+ questions (sample test uses random 40)**
- New category: **Onderwijs** (5 vragen) — leerplicht leeftijd, VMBO/HAVO/VWO, MBO, inburgeringscursus, B1 voor naturalisatie
- New category: **Geschiedenis** (4 vragen) — 4 mei Dodenherdenking, 5 mei Bevrijdingsdag, Anne Frank, Holocaust
- New category: **Geografie** (3 vragen) — Den Haag als regeringszetel, Nederland onder zeeniveau, Rijn-Maas-Scheldedelta
- New category: **Waarden 2025** (4 vragen) — zelfbeschikking, gelijkwaardigheid man/vrouw, godsdienstvrijheid, scheiding kerk/staat
- Naturalisatie vereisten question added (5 jaar, inburgering, geen strafblad)
- Sample test now uses exactly **40 random questions** (was: all questions)
- Card label updated: "50 vragen" → "40 vragen · 70% slagen"

**Lezen — expanded to 8 passages (~24 questions)**
- New passage: **Inschrijfformulier taalcursus** — kosten, gratis eerste les, dag/tijd
- New passage: **Albert Heijn weekaanbieding** — kortingsprijs, geldigheid, Bonus-kaart vereist
- New passage: **Cursusrooster Talencentrum Utrecht** — tentamenweek, aanwezigheidseis 80%, cursusboekkosten
- Pass threshold updated: **70% → 76%** (real DUO: 19/25)
- Card label: "5 teksten" → "8 teksten · 76% slagen"

**Luisteren — expanded to 8 fragmenten (~24 questions)**
- New fragment: **NS treininfo Amsterdam–Den Haag** — seinstoring, 20 min vertraging, omroute via Leiden
- New fragment: **Telefoonbericht werkgever** — functie, dag en tijd sollicitatiegesprek
- New fragment: **Gemeentelijke Open Dag Utrecht** — datum, diensten, meenemen identiteitsbewijs
- Pass threshold updated: **70% → 72%** (real DUO: 18/25)
- Card label: "Audio MCQ" → "8 fragmenten · 72% slagen"

**Mock exam — real DUO timers**
- KNM: 35 → **45 min**
- Lezen: 35 → **65 min**
- Luisteren: 25 → **45 min**
- Schrijven: 60 → **40 min**
- Spreken: 35 min (unchanged)

**Weakness report — per-module thresholds**
- Shows "Vereist: X%" under each module name (KNM 70%, Lezen 76%, Luisteren 72%)
- Schrijven/Spreken shown as pass/fail (no percentage threshold)
- Weak/strong split now uses module-specific threshold, not flat 70%
- UI text translated to Dutch

---

## [2.0.1] — 2026-06-24

### Added
- **Live speech recognition in Spreken** — mic activates immediately on BEGIN (synchronous call, satisfies iOS user-gesture requirement)
- Interim transcript shown in real time with 🔴 Live badge while speaking
- Auto-restart recognition on `onend` so the 60s window stays open (Web Speech API stops on silence — restarted automatically while timer runs)
- **Word-overlap match score** after each task — compares spoken words against example answer (filters words ≤2 chars to skip Dutch articles); score shown as coloured progress bar
  - ≥60% → Uitstekend! (green)
  - 30–59% → Redelijk goed (amber)
  - <30% → Blijf oefenen (red)
- "U zei:" transcript block shown below score so user can review what was captured
- Volgende button only appears after timer ends or Klaar is tapped (enforced by flow)
- Uses `webkitSpeechRecognition` fallback for iOS Safari

---

## [2.0.0] — 2026-06-24

### Changed
- **Spreken module completely redesigned** — replaced roleplay text scenarios with the real DUO computer-based exam format
- 16 tasks across 4 real task types: 📹 Video (4), 🖼️ 1 Foto (4), 🖼️🖼️ 2 Foto's (4), 🖼️🖼️🖼️ 3 Foto's (4)
- Each task shows: task type badge + scene description (what appears on the DUO computer screen) + the exam question
- 60-second countdown timer per task (practice) / 90 seconds (full exam); color shifts orange <30s, red <15s
- User taps **BEGIN** to start the timer, **Klaar** to stop early
- Example answer shown after timer ends with TTS "Beluister voorbeeld" option
- **Volgende** only enabled after timer completes (enforced by timer flow)
- Practice mode: 4 tasks (one of each type, randomly selected)
- Full exam (Sample Test): all 16 tasks in fixed order, 90s each
- Exam module card renamed from "OGO / Rollenspel" → **Spreken · Foto & video taken**
- Mock exam OGO phase updated: 35 min · 16 foto/video taken
- `startOGO()` → opens new `renderSprekenHome()` with type overview grid

---

All notable changes are documented here. Version follows [Semantic Versioning](https://semver.org/):
- **MAJOR** — breaking change or full redesign
- **MINOR** — new feature or module
- **PATCH** — bug fix, copy change, small tweak

---

## [1.9.1] — 2026-06-24

### Changed
- **Removed all German references** — renamed `speakGerman()` → `speakDutch()` throughout
- **Removed all Hindi/Hinglish** — every error message, UI string, prompt, and AI instruction cleaned up
- **Removed all Delhi references** — lesson prompts, drill prompts, chat system prompt, pronunciation feedback
- Memory hooks now use NL references only (Albert Heijn, NS, stroopwafel, fiets, gemeente)
- All error/status messages now in plain English
- Pronunciation tips title: "for Hindi Speakers" removed
- Mic permission and no-speech messages now in English

---

## [1.9.0] — 2026-06-24

### Changed
- **Lesson prompt rewritten** — simpler, exam-first teaching style ("explain like a smart 8-year-old"); every word and phrase now tied to a specific inburgering exam module
- Each word card now shows an exam tag (KNM / Lezen / Luisteren / Schrijven / OGO) so learners know exactly why they're learning it
- Phrase cards now show exact usage context ("Say this when the gemeente officer asks...") instead of a generic joke
- Lesson intro now shows an **Examen hook** — which exam modules today's lesson directly prepares
- `safeParseLesson` updated: handles `examHook`, `survivalTip` (replaces `berlinTip`), word `exam` field, phrase `use` field; backward-compatible with old field names
- Grammar explanation simplified: one rule (max 15 words), 3 short examples (max 6 words each), one mistake fix

---

## [1.8.0] — 2026-06-24

### Added
- **Phase 3 — Full Mock Inburgeringsexamen** (replaces stub)
  - Sequential 5-module flow: KNM (35 min) → Lezen (35 min) → Luisteren (25 min) → Schrijven (60 min) → OGO (15 min)
  - Per-module countdown timer (turns orange <5 min, red <2 min); auto-advances when time runs out
  - KNM: 40 random questions, instant MCQ flow
  - Lezen: all 5 passages scrollable, question by question
  - Luisteren: TTS playback (normal + slow) + MCQ per fragment
  - Schrijven: free-text with live word count, AI scored (taakvoltooiing/grammatica/woordenschat/structuur)
  - OGO: 3 random scenarios, free-text, AI pass/fail per scenario
  - Final report: per-module score bars, pass/fail (70% threshold), XP reward (100 XP all-pass, 40 XP otherwise)
  - Last 5 attempts saved to localStorage, shown on mock exam home screen
  - Updates `readiness` score and `mock_exam` in exam scores
- **Phase 4 — MAP info card** (Maatschappelijke Participatie)
  - What counts (vrijwilligerswerk, taalmaatje, stage, cursussen, sport)
  - Step-by-step DUO upload guide (urenstaat → MijnDUO → bevestiging)
  - IT-professional tip: taalvrijwilligerswerk bij Bibliotheek
- **Phase 4 — Participatieverklaring (PVT) info card**
  - What the PVT traject is, Nederlandse waarden covered
  - What to bring to gemeente
  - Warning: absence causes dossier delays + possible boete

---

## [1.7.5] — 2026-06-24

### Fixed
- **Dynamic Island / notch overlap** — header now uses `padding-top: calc(env(safe-area-inset-top,0px) + 9px)` so content never slides behind the Dynamic Island or status bar on iPhone (Safari + Chrome both use the same WebKit env() support)

---

## [1.7.4] — 2026-06-24

### Fixed
- **iPhone overflow (root cause)** — exam grid had `grid-template-columns:1fr 1fr 1fr!important` overriding the responsive media query; now defaults to 2 columns on mobile (<520px), 3 on tablet+
- **Text too dark** — raised `--text2` from `#8a96aa` to `#b2bccc` for all body text, translations, explanations
- **Speech recognition on iOS** — removed `setTimeout(fn, delay)` wrapper around `r.start()`; iOS Safari requires mic to be started synchronously within the user gesture event, not deferred via timeout

---

## [1.7.3] — 2026-06-24

### Fixed
- **Say it on iOS** — removed incorrect "not supported on iOS" message; iOS Safari 14.5+ supports `webkitSpeechRecognition`; now shows generic update prompt only if API is truly absent

---

## [1.7.2] — 2026-06-24

### Fixed
- **iPhone layout overflow** — added `overflow-x:hidden` to `.main` and `word-break:break-word` to `.wc-nl` so long Dutch words don't push cards off-screen
- **TTS (Listen button) on iOS** — `getVoices()` returns empty array on first call on iOS Safari; rewrote `speakGerman()` to call `speak()` immediately if voices loaded, else wait for `onvoiceschanged` callback
- **Say it on iOS** — `SpeechRecognition` is not supported on iOS Safari; now shows clear message "not supported on iOS Safari — use Chrome on desktop" instead of generic error
- **Nav button arrows** — removed `←` from Back and `→` from Next

---

## [1.7.1] — 2026-06-24

### Fixed
- **Layout broken** — `calc(50% - 340px)` side padding on `.main` crushed all content into a narrow column; reverted to normal `20px` padding; lesson width now constrained via `.lesson-wrap{max-width:640px;margin:0 auto}` on desktop only

---

## [1.7.0] — 2026-06-24

### Changed
- **Lesson card redesign** — replaced bloated `.card` blocks with compact `.lc` component (20px border-radius, tight padding, no excess whitespace)
- **Grammar card** — rule in a left-bordered highlight block, examples in clean `lc-ex` rows (Dutch bold / English subdued), warning in amber box
- **Word flashcard** — gradient header with 38px word, pronunciation pill, meaning badge; example + memory tip in body; 3-action grid (Listen / Say / Try)
- **Phrase card** — header with Dutch phrase + translation + tip + audio buttons; scenario practice in body section
- **Tips cards** — compact two-card layout with colored badge labels
- **Desktop layout** — `.main` now uses `calc(50% - 340px)` side padding to cap content at ~680px; no more full-width card stretch
- **Progress bar** — thin 4px gradient bar (blue→violet) replaces chunky bar-track; dots row above bar
- **Lesson complete screen** — finishing the last page now shows a celebration card (+10 XP) with "Review" and "Practice exam" CTAs instead of a disabled button
- **`showLessonComplete()`** — new function, awards XP, plays congrats sound, renders completion card

---

## [1.6.3] — 2026-06-24

### Fixed
- **Lesson text too dark** — `--muted` was aliased to `--text3` (`#5e6c82`) making grammar explanations, translations, and body text hard to read; raised to `--text2` (`#8a96aa`) for better contrast

---

## [1.6.2] — 2026-06-24

### Fixed
- **Lesson never loaded** — `renderDayDots()` crashed with `TypeError: Cannot set innerHTML of null` because `#dayDots` element was removed in the UI redesign but the function still referenced it; added null guard so crash no longer blocks `loadLesson()`

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
