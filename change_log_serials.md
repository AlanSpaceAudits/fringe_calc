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
