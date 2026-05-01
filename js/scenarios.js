// MMX-series presets. Each entry carries the apparatus geometry,
// the ether-velocity assumption used by the experimenters, the predicted
// fringe shift on 90° rotation, the reported observed value (or upper
// bound, native units), and the original citation. Conversion of modern
// SME-style bounds to a fringe-equivalent v_implied uses
// β ≈ √(2·Δc/c) → v = c·β  (classical small-β limit).

export const C = 299792458;

function vFromN(D, lam_nm, N) {
  const lam = lam_nm * 1e-9;
  return C * Math.sqrt(Math.max(0, (N * lam) / (2 * D)));
}

function vFromDcc(dcc) {
  return C * Math.sqrt(Math.max(0, 2 * dcc));
}

export const PRESETS = [
  {
    id: 'mmx-1881-potsdam',
    label: 'MMX 1881 — Michelson, Potsdam',
    short: 'M 1881',
    year: 1881, location: 'Potsdam Observatory',
    apparatus: 'single-pass interferometer, mercury float',
    L_arm: 1.2, n_reflections: 1, D: 1.2,
    lam_nm: 589, n_index: 1.0,
    v_assumed: 30, rotationDeg: 0, lorentz: false,
    N_predicted: 0.04,
    N_observed: 0.02, sigma_N: 0.01,
    citation: 'Michelson, Am. J. Sci. 22, 120-129 (1881).'
  },
  {
    id: 'mmx-1887-cleveland',
    label: 'MMX 1887 — Michelson & Morley, Cleveland',
    short: 'M&M 1887',
    year: 1887, location: 'Case School, Cleveland OH',
    apparatus: 'mercury-floated stone, 16-fold reflection',
    L_arm: 1.2, n_reflections: 8, D: 11.0,
    lam_nm: 589, n_index: 1.0,
    v_assumed: 30, rotationDeg: 0, lorentz: false,
    N_predicted: 0.40,
    N_observed: 0.01, sigma_N: 0.005,
    citation: 'Michelson & Morley, Am. J. Sci. 34, 333-345 (1887), p. 336-341.'
  },
  {
    id: 'mmx-1902-morley-miller',
    label: 'MMX 1902-05 — Morley & Miller, Cleveland',
    short: 'M&M 1902',
    year: 1904, location: 'Case School, Cleveland OH',
    apparatus: 'pine-cross interferometer (steel later), 32 m optical path',
    L_arm: 4.0, n_reflections: 4, D: 32.2,
    lam_nm: 570, n_index: 1.0,
    v_assumed: 30, rotationDeg: 0, lorentz: false,
    N_predicted: 1.13,
    N_observed: 0.0073, sigma_N: 0.005,
    citation: 'Morley & Miller, Phil. Mag. (6) 8, 753-754 (1904); 9, 680-685 (1905).'
  },
  {
    id: 'mmx-1925-miller-mtwilson',
    label: 'MMX 1925-26 — Miller, Mt. Wilson',
    short: 'Miller 1925',
    year: 1925, location: 'Mt. Wilson Observatory, CA',
    apparatus: 'steel cross, 32 m optical path, large data run',
    L_arm: 4.0, n_reflections: 4, D: 32.0,
    lam_nm: 570, n_index: 1.0,
    v_assumed: 30, rotationDeg: 0, lorentz: false,
    N_predicted: 1.12,
    N_observed: 0.044, sigma_N: 0.022,
    citation: 'Miller, Rev. Mod. Phys. 5, 203-242 (1933). Reanalysis: Shankland et al., Rev. Mod. Phys. 27, 167-178 (1955).'
  },
  {
    id: 'mmx-1926-kennedy',
    label: 'MMX 1926 — Kennedy, Mt. Wilson',
    short: 'Kennedy 1926',
    year: 1926, location: 'Mt. Wilson, CA',
    apparatus: 'sealed helium-filled, half-shade fringes',
    L_arm: 2.0, n_reflections: 1, D: 4.0,
    lam_nm: 546, n_index: 1.000035,
    v_assumed: 30, rotationDeg: 0, lorentz: false,
    N_predicted: 0.146,
    N_observed: 0.002, sigma_N: 0.001,
    citation: 'Kennedy, Proc. Natl. Acad. Sci. 12, 621-629 (1926).'
  },
  {
    id: 'mmx-1927-illingworth',
    label: 'MMX 1927 — Illingworth, Caltech',
    short: 'Illingworth 1927',
    year: 1927, location: 'Caltech, Pasadena CA',
    apparatus: 'sealed Kennedy-pattern interferometer, refined fringe estimation',
    L_arm: 1.0, n_reflections: 1, D: 2.0,
    lam_nm: 546, n_index: 1.000035,
    v_assumed: 30, rotationDeg: 0, lorentz: false,
    N_predicted: 0.073,
    N_observed: 0.0004, sigma_N: 0.0002,
    citation: 'Illingworth, Phys. Rev. 30, 692-696 (1927).'
  },
  {
    id: 'mmx-1928-piccard-stahel',
    label: 'MMX 1928 — Piccard & Stahel, balloon',
    short: 'Piccard 1928',
    year: 1928, location: 'Free balloon, Brussels altitude flights',
    apparatus: 'compact interferometer flown to ~2500 m to test altitude dependence',
    L_arm: 1.0, n_reflections: 1, D: 2.8,
    lam_nm: 546, n_index: 1.0,
    v_assumed: 30, rotationDeg: 0, lorentz: false,
    N_predicted: 0.103,
    N_observed: 0.003, sigma_N: 0.002,
    citation: 'Piccard & Stahel, C. R. Acad. Sci. Paris 185, 1198 (1927); Naturwissenschaften 16, 25 (1928).'
  },
  {
    id: 'mmx-1930-joos',
    label: 'MMX 1930 — Joos, Jena',
    short: 'Joos 1930',
    year: 1930, location: 'Carl Zeiss / Jena',
    apparatus: 'quartz-frame interferometer, photographic recording, sealed',
    L_arm: 1.5, n_reflections: 7, D: 21.0,
    lam_nm: 540, n_index: 1.000035,
    v_assumed: 30, rotationDeg: 0, lorentz: false,
    N_predicted: 0.78,
    N_observed: 0.002, sigma_N: 0.001,
    citation: 'Joos, Ann. Phys. (Leipzig) 7, 385-407 (1930).'
  },
  {
    id: 'mmx-1958-cedarholm-townes',
    label: 'MMX 1958 — Cedarholm & Townes, NH₃ masers',
    short: 'Cedarholm 1958',
    year: 1958, location: 'Columbia University, NY',
    apparatus: 'pair of opposed ammonia masers, frequency comparison',
    L_arm: null, n_reflections: null, D: null,
    lam_nm: null, freq_GHz: 23.870, n_index: 1.0,
    v_assumed: 30, rotationDeg: 0, lorentz: false,
    N_predicted: null,
    N_observed: null, sigma_N: null,
    bound_dcc: 1e-9,
    citation: 'Cedarholm, Bland, Havens, Townes, Phys. Rev. Lett. 1, 342-343 (1958).'
  },
  {
    id: 'mmx-1964-jaseja-javan',
    label: 'MMX 1964 — Jaseja, Javan, Murray, Townes',
    short: 'Jaseja 1964',
    year: 1964, location: 'MIT',
    apparatus: 'two He-Ne masers at right angles, beat-frequency measurement',
    L_arm: 1.0, n_reflections: 1, D: 2.0,
    lam_nm: 1153, n_index: 1.0,
    v_assumed: 30, rotationDeg: 0, lorentz: false,
    N_predicted: 0.035,
    N_observed: null, sigma_N: null,
    bound_dcc: 1e-12,
    citation: 'Jaseja, Javan, Murray, Townes, Phys. Rev. 133, A1221-A1225 (1964).'
  },
  {
    id: 'mmx-1979-brillet-hall',
    label: 'MMX 1979 — Brillet & Hall, JILA',
    short: 'Brillet-Hall 1979',
    year: 1979, location: 'JILA, Boulder CO',
    apparatus: 'rotating Fabry-Perot vs frequency-stabilized He-Ne laser',
    L_arm: 0.305, n_reflections: null, D: 0.305,
    lam_nm: 3390, n_index: 1.0,
    v_assumed: 30, rotationDeg: 0, lorentz: false,
    N_predicted: null,
    N_observed: null, sigma_N: null,
    bound_dcc: 3e-15,
    citation: 'Brillet & Hall, Phys. Rev. Lett. 42, 549-552 (1979): δc/c = (1.5 ± 2.5)×10⁻¹⁵.'
  },
  {
    id: 'mmx-2003-mueller',
    label: 'MMX 2003 — Müller et al., Berlin/Konstanz',
    short: 'Müller 2003',
    year: 2003, location: 'Humboldt-Universität, Berlin',
    apparatus: 'cryogenic optical sapphire resonators',
    L_arm: 0.03, n_reflections: null, D: 0.03,
    lam_nm: 1064, n_index: 1.0,
    v_assumed: 370, rotationDeg: 0, lorentz: false,
    N_predicted: null,
    N_observed: null, sigma_N: null,
    bound_dcc: 1.7e-15,
    citation: 'Müller, Herrmann, Braxmaier, Schiller, Peters, Phys. Rev. Lett. 91, 020401 (2003).'
  },
  {
    id: 'mmx-2005-antonini',
    label: 'MMX 2005 — Antonini et al., Düsseldorf',
    short: 'Antonini 2005',
    year: 2005, location: 'Heinrich-Heine-Universität, Düsseldorf',
    apparatus: 'rotating cryogenic optical resonator pair',
    L_arm: 0.085, n_reflections: null, D: 0.085,
    lam_nm: 1064, n_index: 1.0,
    v_assumed: 370, rotationDeg: 0, lorentz: false,
    N_predicted: null,
    N_observed: null, sigma_N: null,
    bound_dcc: 0.5e-15,
    citation: 'Antonini, Okhapkin, Göklü, Schiller, Phys. Rev. A 71, 050101(R) (2005).'
  },
  {
    id: 'mmx-2006-stanwix',
    label: 'MMX 2006 — Stanwix et al., UWA',
    short: 'Stanwix 2006',
    year: 2006, location: 'University of Western Australia',
    apparatus: 'rotating cryogenic sapphire microwave oscillators',
    L_arm: 0.05, n_reflections: null, D: 0.05,
    lam_nm: null, freq_GHz: 12.97, n_index: 1.0,
    v_assumed: 370, rotationDeg: 0, lorentz: false,
    N_predicted: null,
    N_observed: null, sigma_N: null,
    bound_dcc: 9.4e-11,
    citation: 'Stanwix, Tobar, Wolf et al., Phys. Rev. Lett. 95, 040404 (2005); Phys. Rev. D 74, 081101(R) (2006).'
  },
  {
    id: 'mmx-2009-eisele',
    label: 'MMX 2009 — Eisele, Nevsky, Schiller',
    short: 'Eisele 2009',
    year: 2009, location: 'Düsseldorf',
    apparatus: 'two crossed optical resonators on rotating turntable',
    L_arm: 0.085, n_reflections: null, D: 0.085,
    lam_nm: 1064, n_index: 1.0,
    v_assumed: 370, rotationDeg: 0, lorentz: false,
    N_predicted: null,
    N_observed: null, sigma_N: null,
    bound_dcc: 6e-12,
    citation: 'Eisele, Nevsky, Schiller, Phys. Rev. Lett. 103, 090401 (2009).'
  },
  {
    id: 'mmx-2009-herrmann',
    label: 'MMX 2009 — Herrmann et al., Berlin',
    short: 'Herrmann 2009',
    year: 2009, location: 'Humboldt-Universität, Berlin',
    apparatus: 'pair of orthogonal optical resonators on rotating table, 1.2-yr run',
    L_arm: 0.085, n_reflections: null, D: 0.085,
    lam_nm: 1064, n_index: 1.0,
    v_assumed: 370, rotationDeg: 0, lorentz: false,
    N_predicted: null,
    N_observed: null, sigma_N: null,
    bound_dcc: 1.6e-17,
    citation: 'Herrmann, Senger, Möhle, Nagel, Kovalchuk, Peters, Phys. Rev. D 80, 105011 (2009).'
  },
  {
    id: 'mmx-2015-nagel',
    label: 'MMX 2015 — Nagel et al., HU/PTB',
    short: 'Nagel 2015',
    year: 2015, location: 'Berlin / Braunschweig',
    apparatus: 'two rotating cryogenic sapphire microwave oscillators, multi-year run',
    L_arm: 0.05, n_reflections: null, D: 0.05,
    lam_nm: null, freq_GHz: 12.97, n_index: 1.0,
    v_assumed: 370, rotationDeg: 0, lorentz: false,
    N_predicted: null,
    N_observed: null, sigma_N: null,
    bound_dcc: 9.2e-19,
    citation: 'Nagel et al., Nat. Commun. 6, 8174 (2015).'
  }
];

export function impliedV(p) {
  if (p.bound_dcc != null) return vFromDcc(p.bound_dcc);
  if (p.N_observed != null && p.D && p.lam_nm) return vFromN(p.D, p.lam_nm, p.N_observed);
  return null;
}

export function impliedVSigma(p) {
  if (p.sigma_N != null && p.D && p.lam_nm) {
    const lam = p.lam_nm * 1e-9;
    if (p.N_observed > 0) {
      return Math.abs(C * 0.5 * p.sigma_N * Math.sqrt(lam / (2 * p.D * Math.max(1e-12, p.N_observed))));
    }
    return vFromN(p.D, p.lam_nm, p.sigma_N);
  }
  return null;
}

export const SCENARIOS = PRESETS;

// Sagnac-effect presets. Equation: ΔN = 4·A·Ω·cos(θ) / (λ·c),
// where A = enclosed loop area, Ω = rotation rate, θ = angle between
// rotation vector and area normal. Equivalently Δφ = (8πAΩ)/(λc) and
// Δt = 4AΩ/c² and (for ring laser gyros) Δf = 4AΩ/(λ·L) where L is perimeter.
export const SAGNAC_PRESETS = [
  {
    id: 'sag-1913-sagnac',
    label: 'Sagnac 1913',
    short: 'Sagnac 1913',
    year: 1913, location: 'Paris',
    apparatus: 'rotating optical platform, four mirrors, mercury lamp',
    A: 0.0860, lam_nm: 530, perim_m: 1.20,
    omega_rad_s: 12.6, axis_angle_deg: 0,
    DN_predicted: 0.0259,
    DN_observed: 0.07, sigma_DN: 0.02,
    note: 'shift reported on rotation reversal (factor 2 of single-direction)',
    citation: 'Sagnac, C. R. Acad. Sci. Paris 157, 708-710 and 1410-1413 (1913).'
  },
  {
    id: 'sag-1925-michelson-gale',
    label: 'Michelson-Gale-Pearson 1925',
    short: 'M-G-P 1925',
    year: 1925, location: 'Clearing, Illinois',
    apparatus: 'evacuated rectangular pipe loop 612 m × 339 m, detecting Earth\'s rotation',
    A: 207400, lam_nm: 570, perim_m: 1902,
    omega_rad_s: 7.292e-5, axis_angle_deg: 48.23,
    DN_predicted: 0.236,
    DN_observed: 0.230, sigma_DN: 0.005,
    note: 'horizontal loop; θ = co-latitude (90°-41.77°) so cos(θ)·Ω = Ω·sin(lat) = 4.86e-5 rad/s on the area normal (zenith)',
    citation: 'Michelson & Gale (with H. G. Pearson), Astrophys. J. 61, 137-145 (1925).'
  },
  {
    id: 'sag-1928-pogany',
    label: 'Pogány 1928',
    short: 'Pogány 1928',
    year: 1928, location: 'Budapest',
    apparatus: 'refined Sagnac repeat with photographic recording',
    A: 0.178, lam_nm: 546, perim_m: 1.7,
    omega_rad_s: 9.4, axis_angle_deg: 0,
    DN_predicted: 0.0408,
    DN_observed: 0.0440, sigma_DN: 0.003,
    note: 'confirmed Sagnac result to ~7%',
    citation: 'Pogány, Ann. Phys. (Leipzig) 80, 217-231 (1926); 85, 244-256 (1928).'
  },
  {
    id: 'sag-1963-macek-davis',
    label: 'Macek & Davis 1963',
    short: 'Macek-Davis 1963',
    year: 1963, location: 'Sperry Gyroscope, Long Island NY',
    apparatus: 'first ring laser gyroscope (HeNe active medium, square cavity)',
    A: 0.0058, lam_nm: 632.8, perim_m: 1.0,
    omega_rad_s: null, axis_angle_deg: 0,
    DN_predicted: null,
    DN_observed: null, sigma_DN: null,
    Df_per_omega_HzRad: 4 * 0.0058 / (632.8e-9 * 1.0),
    note: 'beat-frequency device (Δf = 4AΩ/λL); detected lab rotation rates down to Earth rate',
    citation: 'Macek & Davis, Appl. Phys. Lett. 2, 67-68 (1963).'
  },
  {
    id: 'sag-1993-stedman-c2',
    label: 'Stedman C-II ring laser',
    short: 'C-II 1993',
    year: 1993, location: 'University of Canterbury, NZ',
    apparatus: 'square HeNe ring laser, sealed Zerodur monolith',
    A: 0.7493, lam_nm: 632.8, perim_m: 3.477,
    omega_rad_s: 7.292e-5, axis_angle_deg: 46.4,
    DN_predicted: null,
    DN_observed: null, sigma_DN: null,
    Df_per_omega_HzRad: 4 * 0.7493 / (632.8e-9 * 3.477),
    f_earth_Hz: 79.4,
    note: 'continuous detection of Earth rotation; horizontal loop at lat 43.6°S (θ = co-latitude)',
    citation: 'Stedman, Rep. Prog. Phys. 60, 615-688 (1997).'
  },
  {
    id: 'sag-2009-schreiber-g',
    label: 'Schreiber et al. — G ring, Wettzell',
    short: 'G ring 2009',
    year: 2009, location: 'Geodetic Observatory Wettzell, Germany',
    apparatus: '4 m × 4 m square HeNe ring laser, Zerodur frame, underground',
    A: 16.0, lam_nm: 632.8, perim_m: 16.0,
    omega_rad_s: 7.292e-5, axis_angle_deg: 40.86,
    DN_predicted: null,
    DN_observed: null, sigma_DN: null,
    Df_per_omega_HzRad: 4 * 16.0 / (632.8e-9 * 16.0),
    f_earth_Hz: 348.5,
    note: 'large-area RLG; sensitivity ~12 prad/s/√Hz monitors length-of-day variations',
    citation: 'Schreiber, Klügel, Velikoseltsev, Schlüter, Stedman, Wells, Pure Appl. Geophys. 166, 1485-1498 (2009).'
  },
  {
    id: 'sag-2017-gingerino',
    label: 'GINGERino — Gran Sasso underground RLG',
    short: 'GINGERino 2017',
    year: 2017, location: 'LNGS, Gran Sasso, Italy',
    apparatus: '3.6 m × 3.6 m square HeNe ring laser at depth 1400 m',
    A: 13.0, lam_nm: 632.8, perim_m: 14.4,
    omega_rad_s: 7.292e-5, axis_angle_deg: 47.55,
    DN_predicted: null,
    DN_observed: null, sigma_DN: null,
    Df_per_omega_HzRad: 4 * 13.0 / (632.8e-9 * 14.4),
    f_earth_Hz: 280.4,
    note: 'GINGER pathfinder for general-relativity tests of frame dragging via rotation',
    citation: 'Belfi, Beverini, Bosi, Carelli, Di Virgilio, Maccioni, Ortolan, Stefani, Class. Quantum Grav. 34, 215003 (2017).'
  },
  {
    id: 'sag-fog-typical',
    label: 'Fiber-optic gyro (typical)',
    short: 'FOG typical',
    year: 2020, location: 'commercial inertial navigation',
    apparatus: 'multi-turn polarization-maintaining fiber coil, integrated optic phase modulator',
    A: 0.785, lam_nm: 1550, perim_m: 1000,
    omega_rad_s: 7.292e-5, axis_angle_deg: 0,
    DN_predicted: null,
    DN_observed: null, sigma_DN: null,
    Df_per_omega_HzRad: null,
    note: 'effective area A_eff = N·πR² = (1000 m / 0.314 m)·π·(0.05)² ≈ 25 m² for 5 cm coil; bias stability ~0.001 °/h',
    citation: 'Lefèvre, "The Fiber-Optic Gyroscope," 2nd ed., Artech House (2014).'
  }
];

export function sagnacN(A, lam_nm, omega_rad_s, axis_angle_deg = 0) {
  const lam = lam_nm * 1e-9;
  const projection = Math.cos((axis_angle_deg * Math.PI) / 180);
  return (4 * A * omega_rad_s * projection) / (lam * C);
}

export function sagnacOmegaFromN(A, lam_nm, DN, axis_angle_deg = 0) {
  const lam = lam_nm * 1e-9;
  const projection = Math.cos((axis_angle_deg * Math.PI) / 180);
  if (Math.abs(projection) < 1e-12) return Infinity;
  return (DN * lam * C) / (4 * A * projection);
}

export function sagnacBeatHz(A, lam_nm, perim_m, omega_rad_s, axis_angle_deg = 0) {
  const lam = lam_nm * 1e-9;
  const projection = Math.cos((axis_angle_deg * Math.PI) / 180);
  return (4 * A * omega_rad_s * projection) / (lam * perim_m);
}

// Generalized (linear-segment) Sagnac per Wang, Zheng, Yao,
// Phys. Rev. Lett. 93, 143901 (2004): Δφ = 4π·v·Δl·cos(θ) / (c·λ).
// Equivalent fringe shift ΔN = Δφ/2π = 2·v·Δl·cos(θ) / (c·λ).
// For multi-turn fibers, multiply Δl by the number of turns N.
export function wangN(v_m_s, dl_m, n_turns, lam_nm, axis_angle_deg = 0) {
  const lam = lam_nm * 1e-9;
  const projection = Math.cos((axis_angle_deg * Math.PI) / 180);
  return (2 * v_m_s * (dl_m * (n_turns || 1)) * projection) / (lam * C);
}

export function wangPhi(v_m_s, dl_m, n_turns, lam_nm, axis_angle_deg = 0) {
  return 2 * Math.PI * wangN(v_m_s, dl_m, n_turns, lam_nm, axis_angle_deg);
}

export function wangSlope(lam_nm) {
  return (4 * Math.PI) / (C * lam_nm * 1e-9);
}

// Inverse of the linear-segment Sagnac relation:
// given a fringe shift N and an effective moving-segment length Δl_eff,
// return the velocity that would have produced it under the Wang
// formulation, ΔN = 2·v·Δl/(c·λ).
// Δl_eff convention used here:
//   - MMX-style translational interferometers: 2·D (full round-trip path)
//   - Rotational Sagnac loops:                 perimeter L
//   - Linear-segment Wang experiments:         dl_m · n_turns
export function linearEquivV(N, lam_nm, dl_eff_m) {
  if (N == null || dl_eff_m == null || dl_eff_m <= 0) return null;
  return (N * lam_nm * 1e-9 * C) / (2 * dl_eff_m);
}

export function mmxLinearEquivV(p) {
  if (p.D == null || p.lam_nm == null) return null;
  const N = p.N_observed != null ? p.N_observed : p.N_predicted;
  if (N == null) return null;
  return { v: linearEquivV(N, p.lam_nm, 2 * p.D), N, src: p.N_observed != null ? 'obs' : 'pred' };
}

export function sagnacLinearEquivV(p) {
  if (p.type === 'linear') {
    return { v: p.v_m_s, N: null, src: 'reported' };
  }
  if (p.perim_m == null || p.lam_nm == null) return null;
  let N = null, src = null;
  if (p.DN_observed != null) { N = p.DN_observed; src = 'obs'; }
  else if (p.DN_predicted != null) { N = p.DN_predicted; src = 'pred'; }
  else if (p.A != null && p.omega_rad_s != null) {
    N = sagnacN(p.A, p.lam_nm, p.omega_rad_s, p.axis_angle_deg || 0);
    src = 'pred';
  }
  if (N == null) return null;
  return { v: linearEquivV(N, p.lam_nm, p.perim_m), N, src };
}

SAGNAC_PRESETS.forEach(p => { if (!p.type) p.type = 'rotational'; });

SAGNAC_PRESETS.push(
  {
    id: 'sag-2003-wang-langley',
    label: 'Wang, Zheng, Yao, Langley 2003',
    short: 'Wang 2003',
    type: 'linear',
    year: 2003, location: 'St. Cloud State Univ., Minnesota',
    apparatus: 'fiber-optic conveyor (FOC) with linear-moving glass fiber segment, FOG detection',
    A: null, perim_m: null,
    lam_nm: 1310, axis_angle_deg: 0,
    v_m_s: 0.25, dl_m: 1.0, n_turns: 11,
    DN_predicted: null,
    DN_observed: null, sigma_DN: null,
    note: 'first observation that a linearly-moving fiber segment contributes Δφ = 4π·v·Δl/(cλ) (preliminary report)',
    citation: 'Wang, Zheng, Yao, Langley, Phys. Lett. A 312, 7-10 (2003).'
  },
  {
    id: 'sag-2004-wang-generalized',
    label: 'Wang, Zheng, Yao 2004 — Generalized Sagnac',
    short: 'Wang 2004',
    type: 'linear',
    year: 2004, location: 'St. Cloud State Univ., Minnesota',
    apparatus: 'fiber-optic conveyor with air-core photonic-band-gap fiber, two- and three-wheel configurations',
    A: null, perim_m: null,
    lam_nm: 1310, axis_angle_deg: 0,
    v_m_s: 0.211, dl_m: 4.1, n_turns: 1,
    DN_predicted: null,
    DN_observed: null, sigma_DN: null,
    note: 'observed regression slope 0.0323·v·Δl rad vs predicted 4π/(cλ) = 0.0320 (1.0% agreement); independent of refractive index',
    citation: 'Wang, Zheng, Yao, Phys. Rev. Lett. 93, 143901 (2004).'
  },
  {
    id: 'sag-2004-wang-parallelogram',
    label: 'Wang 2004 — parallelogram, glass fiber 11-turn',
    short: 'Wang 2004 (11-turn)',
    type: 'linear',
    year: 2004, location: 'St. Cloud State Univ., Minnesota',
    apparatus: 'parallelogram fiber loop, glass single-mode fiber, top arm on 1.5 m conveyor',
    A: null, perim_m: null,
    lam_nm: 1310, axis_angle_deg: 0,
    v_m_s: 0.233, dl_m: 1.455, n_turns: 11,
    DN_predicted: null,
    DN_observed: null, sigma_DN: null,
    note: 'multi-turn enhancement; observed slope 0.0317·v·Δl rad, predicted 0.0320 (0.9% agreement)',
    citation: 'Wang, Zheng, Yao, Phys. Rev. Lett. 93, 143901 (2004).'
  }
);
