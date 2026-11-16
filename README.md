# Tuiwer Defense

![CI](https://github.com/ThomasGoetzmann/tuiwer-defense/actions/workflows/ci.yml/badge.svg)

A turn-based tower defense game for the terminal, written in Rust. I'm building it to learn Rust.

- **The game:** in the build phase, a timer counts down while you place towers. Press Start to begin the next wave early. Enemies follow a fixed path, and your towers shoot them.
- **The course:** [`course/index.html`](course/index.html) is a step-by-step Rust course for C# developers, built around this game. Open it in a browser.

## Run

```sh
cargo run
```

## Develop

```sh
cargo test --workspace
cargo clippy --workspace --all-targets -- -D warnings
cargo fmt --all
```

## Layout

| Path | What it is |
|---|---|
| `crates/tuiwer-domain` | Game rules. No I/O. Fully tested. |
| `crates/tuiwer-tui` | Terminal UI and `main`. |
| `course/` | The HTML course. |

## License

MIT
