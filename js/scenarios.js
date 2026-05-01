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
