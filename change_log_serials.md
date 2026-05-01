# Serial change log

Every change is assigned a serial `SNNN`. Entries are executed actions only —
date, files touched, what changed, revert path. No narrative.

Format:
- **Serial — title**
  - **Date** (UTC if known)
  - **Files changed**
  - **Change**
  - **Revert path**

---

## S000 — Baseline

- **Date:** 2026-04-30
- **Files changed:** `index.html`, `README.md`, `.nojekyll`, `.gitignore`
- **Change:** Initial single-page calculator + interferometer animation. Forward (v→N) and inverse (N→v) panels. Reference: Michelson & Morley (1887), p. 336.
- **Revert path:** `git revert b7216e9` (initial commit).

## S004 — Generalized (linear) Sagnac variant, Wang 2003/2004 presets, modal close fix

- **Date:** 2026-04-30
- **Files changed:** `js/scenarios.js`, `js/ui.js`, `index.html`, `css/styles.css`, `change_log_serials.md`, `README.md`
- **Change:** Added generalized Sagnac calculator card per Wang, Zheng, Yao, PRL 93, 143901 (2004): `Δφ = 4π·v·Δl·cos(θ) / (cλ)` with multi-turn factor N. New helpers `wangN`, `wangPhi`, `wangSlope` in `scenarios.js`. Three Wang presets added to Sagnac table (Wang-Langley 2003 Phys. Lett. A 312, Wang 2004 air-core, Wang 2004 glass-parallelogram 11-turn). Sagnac table now adapts to `type: 'linear'` vs `'rotational'` rows: linear rows display `Δl·N` and `v` instead of `A` and `Ω`, rotational rows unchanged. Modal foot text updated with both forms and the Stokes-theorem connection. Fixed modal not closing on row select: `.modal { display: flex }` was overriding the `hidden` attribute; added `.modal[hidden] { display: none; }` in CSS.
- **Revert path:** `git revert <S004 commit>`; tag `v-s000003` is the previous milestone.

## S003 — Sagnac equation + presets, modal closes on row select

- **Date:** 2026-04-30
- **Files changed:** `js/scenarios.js`, `js/ui.js`, `js/main.js`, `index.html`, `change_log_serials.md`, `README.md`
- **Change:** Added Sagnac equation card (forward: A, λ, Ω, θ → ΔN, Δφ, Δt, Δf; inverse: ΔN_obs → Ω) and `🌀` Sagnac preset modal with eight entries: Sagnac 1913, M-G-P 1925, Pogány 1928, Macek-Davis 1963 (first ring laser gyro), Stedman C-II 1993, Schreiber G ring 2009, GINGERino 2017, generic FOG. Each carries A, perimeter, λ, Ω, axis angle (relative to area normal), predicted/observed ΔN, beat frequency at Earth's rotation rate, and citation. Added helpers `sagnacN`, `sagnacOmegaFromN`, `sagnacBeatHz` in `scenarios.js`. Modal-close behavior: clicking any preset row in either modal applies the row and dismisses the modal. Escape key closes both modals.
- **Revert path:** `git revert <S003 commit>`; tag `v-s000002` is the previous milestone.

## S002 — MMX preset table, observed-fringe inverse, extra parameters

- **Date:** 2026-04-30
- **Files changed:** `js/scenarios.js`, `js/ui.js`, `js/main.js`, `index.html`, `css/styles.css`, `change_log_serials.md`, `README.md`
- **Change:** Expanded `scenarios.js` into a 17-entry MMX preset table covering Michelson 1881, M&M 1887, Morley-Miller 1902-05, Miller 1925, Kennedy 1926, Illingworth 1927, Piccard-Stahel 1928, Joos 1930, Cedarholm-Townes 1958, Jaseja-Javan 1964, Brillet-Hall 1979, Müller 2003, Antonini 2005, Stanwix 2006, Eisele 2009, Herrmann 2009, Nagel 2015. Each entry carries L_arm, n_reflections, D, λ or ν, refractive index, predicted N, observed N ± σ_N (or Δc/c bound), and the original citation. Added `impliedV` / `impliedVSigma` derivations from the inverse formula and the SME small-β analog. New modal table (📚 button) renders the full set; clicking a row applies it across all panels. Forward calc panel takes L_arm, n_refl, n_med separately. Inverse panel takes observed N + σ_N and reports v ± σ_v. Third card converts a Δc/c bound to a velocity bound.
- **Revert path:** `git revert <S002 commit>`; tag `v-s000001` is the previous milestone.

## S001 — Playable demo restructure

- **Date:** 2026-04-30
- **Files changed:** `index.html`, `css/styles.css`, `js/main.js`, `js/sim.js`, `js/ui.js`, `js/scenarios.js`, `change_log_serials.md`, `README.md`
- **Change:** Split monolithic page into modular ES modules (`sim.js` physics + canvas, `ui.js` controls + readout + popups, `scenarios.js` preset table, `main.js` entry). New full-bleed layout: header with About/Legend popups, side readout panel with live N, calculator panel, bottom slider+scenario bar. Added rotation slider, Lorentz contraction toggle (parallel arm × √(1-β²)), seven scenario presets covering 1881 Potsdam, 1887 Cleveland, Lorentz null, 90° rotation, CMB rest frame, and exaggerated v.
- **Revert path:** `git revert <S001 commit>`; previous structure preserved on tag `v-s000000` if desired.
