export const SCENARIOS = [
  {
    id: 'classical',
    label: 'Classical aether wind',
    note: '1887 Cleveland setup as predicted by stationary-aether theory',
    params: { vKms: 30, D: 11, lam: 589, lorentz: false, rotationDeg: 0 }
  },
  {
    id: 'potsdam1881',
    label: '1881 Potsdam',
    note: 'Michelson original (D = 1.2 m); predicted shift ≈ 0.04 fringes',
    params: { vKms: 30, D: 1.2, lam: 589, lorentz: false, rotationDeg: 0 }
  },
  {
    id: 'cleveland1887',
    label: '1887 Cleveland',
    note: 'M&M extended (D = 11 m via multiple reflection); predicted ≈ 0.4 fringes',
    params: { vKms: 30, D: 11, lam: 589, lorentz: false, rotationDeg: 0 }
  },
  {
    id: 'lorentz',
    label: 'Lorentz-contracted',
    note: 'Parallel arm contracts by √(1-β²); predicted shift collapses to zero',
    params: { vKms: 30, D: 11, lam: 589, lorentz: true, rotationDeg: 0 }
  },
  {
    id: 'rotation',
    label: '90° rotation',
    note: 'Rotating the apparatus flips the sign of Δ-path',
    params: { vKms: 30, D: 11, lam: 589, lorentz: false, rotationDeg: 90 }
  },
  {
    id: 'cmb',
    label: 'CMB rest-frame v',
    note: 'If the aether moved with the cosmic microwave dipole (≈370 km/s)',
    params: { vKms: 370, D: 11, lam: 589, lorentz: false, rotationDeg: 0 }
  },
  {
    id: 'fast',
    label: 'Exaggerated v = 30,000 km/s',
    note: 'Cartoon speed for visible animation; β = 0.1',
    params: { vKms: 30000, D: 11, lam: 589, lorentz: false, rotationDeg: 0 }
  }
];
