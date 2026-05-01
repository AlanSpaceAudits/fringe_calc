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
- Forward calc takes L_arm, n_reflections, refractive index, λ, v (full geometry input).
- Inverse calc takes observed N ± σ_N and reports implied v ± σ_v.
- Third card converts an SME-style Δc/c bound to a velocity bound.
- 17-entry MMX preset table (📚 button), clickable rows apply to live panels:
  - 1881 Michelson (Potsdam)
  - 1887 Michelson & Morley (Cleveland)
  - 1902-05 Morley & Miller
  - 1925-26 Miller (Mt. Wilson)
  - 1926 Kennedy
  - 1927 Illingworth
  - 1928 Piccard & Stahel
  - 1930 Joos (Jena)
  - 1958 Cedarholm & Townes (NH₃ masers)
  - 1964 Jaseja, Javan, Murray, Townes (He-Ne masers)
  - 1979 Brillet & Hall (laser)
  - 2003 Müller et al. (cryogenic optical)
  - 2005 Antonini et al.
  - 2006 Stanwix et al. (sapphire microwave)
  - 2009 Eisele et al.
  - 2009 Herrmann et al. (rotating optical)
  - 2015 Nagel et al. (rotating sapphire microwave)

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
