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

## S001 — Playable demo restructure

- **Date:** 2026-04-30
- **Files changed:** `index.html`, `css/styles.css`, `js/main.js`, `js/sim.js`, `js/ui.js`, `js/scenarios.js`, `change_log_serials.md`, `README.md`
- **Change:** Split monolithic page into modular ES modules (`sim.js` physics + canvas, `ui.js` controls + readout + popups, `scenarios.js` preset table, `main.js` entry). New full-bleed layout: header with About/Legend popups, side readout panel with live N, calculator panel, bottom slider+scenario bar. Added rotation slider, Lorentz contraction toggle (parallel arm × √(1-β²)), seven scenario presets covering 1881 Potsdam, 1887 Cleveland, Lorentz null, 90° rotation, CMB rest frame, and exaggerated v.
- **Revert path:** `git revert <S001 commit>`; previous structure preserved on tag `v-s000000` if desired.
