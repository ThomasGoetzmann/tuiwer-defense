# Course design decisions

The decisions behind the Tuiwer Defense course, settled in a grilling session (2026-11-15/16) with the learner. Each entry gives the decision and the reason, so a later agent can extend the course or review the learner's work in the same direction. The roadmap itself lives in `course/assets/course.js` (`CHAPTERS`); the tutor rules and chapter-generation steps live in `CLAUDE.md`.

## The learner

- Expert C# developer (15 years), strong in architecture and testing, basic F#. New to Rust.
- Goal: **master the language itself**. Frameworks (ratatui, serde, Tokio) are vehicles, taught only as deep as the language lesson needs.
- Interests beyond the game: general craft, systems/CLI, web services. These justify side quests, never framework deep dives.
- Fun/home project: motivation is a design constraint. Every chapter ends on something visible.
- Shell: fish. Editors: RustRover (via JetBrains Toolbox, brew cask) and Neovim (config in `~/sources/dotfiles-v2`, chezmoi; Rust setup explained in `course/appendix-a-neovim.html`).

## Teaching approach

- The learner writes **all game code**. Lessons give tests (the spec) and signatures; the learner writes implementations. Scaffolding is acceptable only for boilerplate with no Rust lesson in it.
- **Game-driven concept order**: a concept appears when the game needs it. A concept the game never needs but a Rust developer must know becomes a **side quest** with a better-suited example (e.g. `Box` with a recursive type, async with a high-score server, `unsafe`).
- Analogies at expert level: C# first, F# where it fits (DUs ↔ enums, `let`/`let mutable`, expressions). Never explain general programming.
- Hints have three levels (direction → concept → near-code), hidden in `<details>`. Pages never contain full solutions.
- AI is a **tutor**: it explains, hints, reviews. The learner asks for code only to compare after solving.
- Progress: one git commit per exercise; the learner asks for a review per lesson or chapter.

## Course format

- Static HTML in `course/`, hosted on GitHub Pages later. Nothing is published to claude.ai.
- Lesson = one page, 15–25 min. Chapter = 1–2 h. Lessons are self-contained so the learner can split or merge them by difficulty.
- Diagrams: Mermaid (vendored, offline) for flows; hand-written inline SVG for memory/ownership concepts. SVGs use the CSS colour tokens so dark mode works.
- Lesson blocks: Goal, C# → Rust, Concept, Hands-on, Exercise + hints, Check — plus where they fit: Compiler error of the day, Boss fight, Show-off, Why Rust does this, Deep dive, Ask the AI. Installing and running tools counts as hands-on.
- Progress map on `index.html`: chapters drawn as a tower-defense path; a finished lesson is a "defeated wave" (localStorage).
- Prose: ASD-STE100 plain English (rules in `CLAUDE.md`).
- Chapters are written **just in time**: the learner asks "generate chapter N" after finishing N−1, so each chapter builds on the learner's real code.

## The game

- Turn-based tower defense. **Build phase**: a timer counts down while the player places towers; a Start key skips to the wave. **Wave phase**: the wave plays out automatically. Then Build again, or Won/Lost.
- Fixed path on a grid. Open-grid maps with A\* pathfinding come late (chapter 16).
- Keyboard first; mouse support later.
- First playable version (milestone, chapter 12): 1 map, 3 tower types (fast/weak, slow/strong, area), 3 enemy types (normal, fast, armored), gold, lives, 10 waves, win/lose screens.
- Later: upgrade/sell, levels from RON files, save/load, mouse, open grid.
- **Keep the door open, do not build yet**: placing towers during a wave, and a player-controlled hero unit with its own actions. Domain design must not block these.

## Architecture

- Clean architecture as a Cargo workspace. Cargo enforces dependency direction: `tui → domain`, `tui → infra → domain`.
  - `tuiwer-domain`: rules, `Command`s, ports as traits. No I/O, no clock, no terminal.
  - `tuiwer-tui`: presentation (`ratatui` + `crossterm`) and composition root.
  - `tuiwer-infra`: adapters (files, saves, `serde`). **Created in chapter 13 as a refactoring exercise**, not up front.
- Another presentation layer (GUI, web) or another infra adapter must be possible without domain changes.
- **Deterministic domain**: `game.apply(Command)` for player actions, `game.tick()` to advance time, seeded RNG passed in. The presentation layer decides tick rate. Reason: repeatable tests, replays, and the future options above become new `Command` variants instead of rewrites.
- Ports via traits; chapter 13 teaches generics vs `dyn Trait` as the Rust form of DI.
- Crates: only `ratatui` + `crossterm` for the terminal, plus crates that teach a language idea (`serde` for derive/traits, `thiserror` for error enums, `proptest` for property tests). Game logic is hand-written: no ECS, no engine.
- Edition 2024 (latest stable), `resolver = "3"`, `unsafe_code = "forbid"`, MIT license, CI with fmt + clippy `-D warnings` + tests.

## Toolchain

- Rust comes only from **rustup** (also in the chezmoi script). rust-analyzer and rustfmt from rustup, never from mason, so they match the compiler.
- `bacon` and `cargo-nextest` are installed by `cargo install` inside lesson 0.4, not in dotfiles. Tools are installed by commands in the lesson that first needs them.

## Verified gotchas

Found by running a reference solution; every new lesson needs the same check.

- `cargo test` without `--workspace` tests only `default-members` (the TUI crate). Lessons always say `--workspace`.
- `rustc` rejects constant overflow at compile time (`arithmetic_overflow`). To demonstrate run-time overflow, hide the value with `std::hint::black_box`.
- Clippy prefers `x.is_multiple_of(n)` over `x % n == 0`; hints follow clippy.
- `cargo new` inside a workspace writes `*.workspace = true` and `[lints] workspace = true` itself.
- `cargo add` accepts a dependency cycle; only the build fails ("cyclic package dependency").
- Type errors (`E0308`, `E0277`) hide lint errors until fixed; claim errors in the order the learner will see them.

## Using Addy Osmani's agent-skills here

The learner may invoke these skills. Each one runs in **tutor** mode in this repo: skills that produce code produce it for course files or for a scratch reference solution; game code in `crates/` stays the learner's.

| Skill | Use in this project |
|---|---|
| `test-driven-development` | The learner's workflow: lessons ship red tests first. Reviews check the learner kept red → green. |
| `code-review-and-quality` | Lesson/chapter reviews: findings ranked, idiomatic-Rust axis first, C# comparison, no rewrites. |
| `code-simplification` | Suggest simplifications as review findings and hints; the learner applies them. |
| `debugging-and-error-recovery` | Walk the learner through a failing test or compiler error with questions. |
| `planning-and-task-breakdown`, `spec-driven-development` | Planning a new chapter: lessons, concepts, tests as spec. |
| `source-driven-development` | Verifying lesson claims against official docs (the Book, std docs, ratatui.rs). |
| `documentation-and-adrs` | Recording a new design decision here, or an ADR the learner writes as a lesson. |
| `ci-cd-and-automation`, `git-workflow-and-versioning` | Lesson 0.4 (CI) and chapter 18 (releases): guide, the learner writes the files. |
| `performance-optimization` | Chapter 16 polish, as guided profiling. |
| `incremental-implementation` | Chapter generation and course-file edits only. |
