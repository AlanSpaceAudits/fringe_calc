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

## Sagnac equation and presets

The Sagnac effect (rotation interferometers and ring laser gyros) uses a
different formula and is provided in a separate card and modal.

    ΔN  = 4·A·Ω·cos(θ) / (λ·c)
    Δφ  = 2π·ΔN
    Δt  = 4·A·Ω·cos(θ) / c²
    Δf  = 4·A·Ω·cos(θ) / (λ·L)        (ring-laser beat, L = perimeter)

`A` is the enclosed area, `Ω` is the rotation rate, `θ` is the angle between
Ω and the area normal. Sagnac preset table includes:

  - 1913 Sagnac (Paris)
  - 1925 Michelson-Gale-Pearson (Clearing IL, detected Earth rotation)
  - 1928 Pogány (Budapest)
  - 1963 Macek & Davis (first ring laser gyroscope, Sperry)
  - 1993 Stedman C-II ring laser (Canterbury, NZ)
  - 2009 Schreiber et al. — G ring (Wettzell, Germany)
  - 2017 GINGERino (Gran Sasso, Italy)
  - 2003 Wang, Zheng, Yao, Langley (linear FOC, Phys. Lett. A 312)
  - 2004 Wang, Zheng, Yao — generalized Sagnac (PRL 93, 143901): air-core fiber
  - 2004 Wang, Zheng, Yao — generalized Sagnac: glass-fiber parallelogram, 11 turns
  - generic fiber-optic gyro (commercial spec)

## Generalized (linear-segment) Sagnac

Per Wang, Zheng, Yao, *Phys. Rev. Lett.* 93, 143901 (2004), the Sagnac result
extends to any moving waveguide segment:

    Δφ  = (4π/cλ) · ∮ v·dl
    Δφ  = 4π·v·Δl·cos(θ) / (cλ)        (single linear segment)
    ΔN  = 2·v·Δl·cos(θ) / (cλ)

For a multi-turn fiber, multiply Δl by the number of turns N. The rotational
Sagnac result (`Δφ = 8π·A·Ω/(cλ)`) drops out via Stokes' theorem
(`∮v·dl = 2A·Ω`).

The linear-Sagnac calculator card takes v, Δl, N, θ, λ and reports ΔN, Δφ,
and the regression slope `4π/(cλ)` (units s/m²).

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
