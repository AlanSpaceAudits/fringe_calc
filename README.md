# Michelson-Morley Fringe / Velocity Calculator

Interactive single-page calculator and animation for the classical fringe-shift formula

    N = 2 D v² / (λ c²)

derived in Michelson & Morley (1887), *American Journal of Science* 34: 333-345, p. 336.

## Features

- Forward calculator: arm length D, wavelength λ, velocity v → fringe shift N
- Inverse calculator: arm length D, wavelength λ, fringe shift N → implied velocity v
- Animated interferometer (laser, beam splitter, two arms, mirrors, detector)
- Live phase-gap and path-difference readout
- Fringe-pattern strip rendered from the current parameters
- Presets for the 1881 Potsdam, 1887 Cleveland, and CMB-frame scenarios

## Run

Open `index.html` in any browser. No build step.

## Deploy

Push to GitHub and enable GitHub Pages on the default branch. The `.nojekyll`
file is included so any future underscore-prefixed assets are served as-is.

## Reference

A. A. Michelson and E. W. Morley, "On the Relative Motion of the Earth and the
Luminiferous Ether," *American Journal of Science* 34, 333-345 (1887).
