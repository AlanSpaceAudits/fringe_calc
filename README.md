# Fringe Calculator

Browser-based playable demo of the Michelson-Morley fringe-shift formula

    N = 2 D v² / (λ c²)

derived in Michelson & Morley (1887), *American Journal of Science* 34: 333-345, p. 336.

## Features

- Forward calculator: D, λ, v → fringe shift N
- Inverse calculator: D, λ, N → implied velocity v
- Animated interferometer (laser, beam splitter, two arms, mirrors, detector)
  with live wave fronts and pulse-tracers
- Sliders for v, D, λ, animation speed, and apparatus rotation
- Lorentz-contraction toggle (parallel arm × √(1-β²)); shows null result
- Live readout panel: v, D, λ, β, Δ-path, N, phase gap (deg)
- Fringe-pattern strip below the stage updates with N mod 1
- Scenario presets:
  - 1881 Potsdam (D = 1.2 m)
  - 1887 Cleveland (D = 11 m)
  - Classical aether wind
  - Lorentz-contracted null
  - 90° rotation
  - CMB rest-frame velocity (~370 km/s)
  - Exaggerated v = 30,000 km/s (β = 0.1)

## Layout

    index.html              page structure
    css/styles.css          dark theme matching fe_model
    js/main.js              entry, RAF loop
    js/sim.js               physics + canvas drawing
    js/ui.js                controls, readout, popups
    js/scenarios.js         scenario preset table
    change_log_serials.md   per-serial change history
    .nojekyll               GitHub Pages: serve underscored assets as-is

## Run

Open `index.html` in any browser. No build step.

## Deploy

Push to GitHub and enable GitHub Pages on the default branch.

## Reference

A. A. Michelson and E. W. Morley, "On the Relative Motion of the Earth and the
Luminiferous Ether," *American Journal of Science* 34, 333-345 (1887).
