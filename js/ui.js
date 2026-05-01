import { state, physicsLive, fmt, C } from './sim.js';
import { PRESETS, impliedV, impliedVSigma, SAGNAC_PRESETS, sagnacN, sagnacOmegaFromN, sagnacBeatHz, wangN, wangPhi, wangSlope, linearEquivV, mmxLinearEquivV, sagnacLinearEquivV } from './scenarios.js';

const $ = id => document.getElementById(id);

export function bindCalculators() {
  function fwd() {
    const L = parseFloat($('f_L').value);
    const nr = parseFloat($('f_nr').value);
    const n = parseFloat($('f_n').value) || 1;
    const D = L * nr;
    const lam = parseFloat($('f_lam').value) * 1e-9;
    const v = parseFloat($('f_v').value) * 1000;
    const c_med = C / n;
    const N = (2 * D * v * v) / (lam * c_med * c_med);
    $('f_D_eff').textContent = fmt(D, 3);
    $('f_N').textContent = fmt(N, 5);
  }
  function inv() {
    const D = parseFloat($('i_D').value);
    const lam = parseFloat($('i_lam').value) * 1e-9;
    const N = parseFloat($('i_N').value);
    const sN = parseFloat($('i_sN').value) || 0;
    const v = C * Math.sqrt(Math.max(0, N * lam / (2 * D)));
    const sv = N > 0 ? Math.abs(0.5 * sN * C * Math.sqrt(lam / (2 * D * N))) : C * Math.sqrt(sN * lam / (2 * D));
    $('i_v').textContent = fmt(v / 1000, 3);
    $('i_sv').textContent = fmt(sv / 1000, 3);
  }
  function dcc() {
    const x = parseFloat($('d_dcc').value);
    const beta = Math.sqrt(Math.max(0, 2 * x));
    const v = beta * C;
    $('d_v').textContent = fmt(v, 4);
    $('d_beta').textContent = beta.toExponential(3);
  }
  function gen() {
    const v = parseFloat($('g_v').value);
    const dl = parseFloat($('g_dl').value);
    const N = parseFloat($('g_N').value) || 1;
    const th = parseFloat($('g_th').value);
    const lam = parseFloat($('g_lam').value);
    const DN = wangN(v, dl, N, lam, th);
    const dphi = wangPhi(v, dl, N, lam, th);
    $('g_DN').textContent    = fmt(DN, 6);
    $('g_dphi').textContent  = fmt(dphi, 5);
    $('g_slope').textContent = fmt(wangSlope(lam), 4);
  }
  function sag() {
    const A = parseFloat($('s_A').value);
    const lam = parseFloat($('s_lam').value);
    const om = parseFloat($('s_om').value);
    const th = parseFloat($('s_th').value);
    const L = parseFloat($('s_L').value);
    const DN = sagnacN(A, lam, om, th);
    const dphi = 2 * Math.PI * DN;
    const dt = (4 * A * om * Math.cos(th * Math.PI / 180)) / (C * C);
    const df = (L > 0) ? sagnacBeatHz(A, lam, L, om, th) : null;
    $('s_DN').textContent   = fmt(DN, 5);
    $('s_dphi').textContent = fmt(dphi, 4);
    $('s_dt').textContent   = dt > 1e-12 ? `${(dt*1e9).toFixed(4)}e-9 = ${dt.toExponential(3)}` : dt.toExponential(3);
    $('s_df').textContent   = df != null ? fmt(df, 4) : '—';
    const DNobs = parseFloat($('s_DNobs').value);
    const omimp = sagnacOmegaFromN(A, lam, DNobs, th);
    $('s_omimp').textContent = isFinite(omimp) ? omimp.toExponential(4) : '—';
  }
  ['f_L', 'f_nr', 'f_n', 'f_lam', 'f_v'].forEach(id => $(id).addEventListener('input', fwd));
  ['i_D', 'i_lam', 'i_N', 'i_sN'].forEach(id => $(id).addEventListener('input', inv));
  $('d_dcc').addEventListener('input', dcc);
  ['s_A', 's_lam', 's_om', 's_th', 's_L', 's_DNobs'].forEach(id => $(id).addEventListener('input', sag));
  ['g_v', 'g_dl', 'g_N', 'g_th', 'g_lam'].forEach(id => $(id).addEventListener('input', gen));
  fwd(); inv(); dcc(); sag(); gen();
}

export function bindSliders() {
  function bind(id, key, label, suffix = '') {
    const el = $(id);
    const lbl = label ? $(label) : null;
    el.addEventListener('input', () => {
      state[key] = parseFloat(el.value);
      if (lbl) lbl.textContent = el.value + suffix;
    });
  }
  bind('a_v',     'vKms',        'a_v_val',   ' km/s');
  bind('a_D',     'D',           'a_D_val',   ' m');
  bind('a_lam',   'lam',         'a_lam_val', ' nm');
  bind('a_speed', 'speed');
  bind('a_rot',   'rotationDeg', 'a_rot_val', '°');
  $('a_lorentz').addEventListener('change', e => state.lorentz = e.target.checked);
  $('a_wind').addEventListener('change',    e => state.showWind = e.target.checked);
  $('a_pause').addEventListener('change',   e => state.pause = e.target.checked);
}

export function buildScenarios() {
  const wrap = $('scenarios');
  PRESETS.slice(0, 8).forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'scenario';
    btn.textContent = s.short || s.label;
    btn.title = s.label + ' — ' + (s.apparatus || '');
    btn.addEventListener('click', () => applyPreset(s, btn));
    wrap.appendChild(btn);
  });
}

function applyPreset(p, btn) {
  document.querySelectorAll('.scenario').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  if (p.D) state.D = p.D;
  if (p.lam_nm) state.lam = p.lam_nm;
  if (p.v_assumed != null) state.vKms = p.v_assumed;
  state.lorentz = !!p.lorentz;
  state.rotationDeg = p.rotationDeg || 0;
  syncControls();
  if (p.D) {
    $('i_D').value = p.D; $('i_lam').value = p.lam_nm || 589;
    if (p.N_observed != null) $('i_N').value = p.N_observed;
    if (p.sigma_N != null) $('i_sN').value = p.sigma_N;
    $('i_D').dispatchEvent(new Event('input'));
  }
  if (p.bound_dcc != null) {
    $('d_dcc').value = p.bound_dcc;
    $('d_dcc').dispatchEvent(new Event('input'));
  }
}

function syncControls() {
  $('a_v').value = state.vKms;       $('a_v_val').textContent = state.vKms + ' km/s';
  $('a_D').value = state.D;          $('a_D_val').textContent = state.D + ' m';
  $('a_lam').value = state.lam;      $('a_lam_val').textContent = state.lam + ' nm';
  $('a_rot').value = state.rotationDeg; $('a_rot_val').textContent = state.rotationDeg + '°';
  $('a_lorentz').checked = state.lorentz;
}

export function bindPopups() {
  function close(id) { $(id).hidden = true; }
  function toggle(id) { $(id).hidden = !$(id).hidden; }
  $('about-btn').addEventListener('click', e => { e.stopPropagation(); close('legend-popup'); toggle('about-popup'); });
  $('legend-btn').addEventListener('click', e => { e.stopPropagation(); close('about-popup'); toggle('legend-popup'); });
  document.addEventListener('click', e => {
    if (!e.target.closest('.info-box')) { close('about-popup'); close('legend-popup'); }
  });
}

export function buildPresetTable() {
  const tbody = $('presets-tbody');
  PRESETS.forEach(p => {
    const tr = document.createElement('tr');
    tr.dataset.id = p.id;
    const v_imp = impliedV(p);
    const sigma_v = impliedVSigma(p);
    const wave = p.lam_nm
      ? `${p.lam_nm} nm`
      : (p.freq_GHz ? `${p.freq_GHz} GHz` : '—');
    const Npred = p.N_predicted != null ? fmt(p.N_predicted, 4) : '—';
    const Nobs = p.N_observed != null
      ? `${fmt(p.N_observed, 4)} ± ${fmt(p.sigma_N || 0, 4)}`
      : '—';
    const dcc = p.bound_dcc != null ? p.bound_dcc.toExponential(2) : '—';
    let v_imp_str = '—';
    if (v_imp != null) {
      if (v_imp >= 1000) v_imp_str = `${(v_imp/1000).toFixed(2)} km/s`;
      else if (v_imp >= 1) v_imp_str = `${v_imp.toFixed(2)} m/s`;
      else v_imp_str = `${v_imp.toExponential(2)} m/s`;
      if (sigma_v && p.bound_dcc == null) v_imp_str += ` ± ${(sigma_v/1000).toFixed(2)} km/s`;
      if (p.bound_dcc != null) v_imp_str = '≤ ' + v_imp_str;
    }
    const wang = mmxLinearEquivV(p);
    let v_lin_str = '—';
    if (wang) {
      const v = wang.v;
      let unit;
      if (v >= 1) unit = `${v.toFixed(3)} m/s`;
      else if (v >= 1e-3) unit = `${(v*1000).toFixed(3)} mm/s`;
      else if (v >= 1e-6) unit = `${(v*1e6).toFixed(3)} μm/s`;
      else if (v >= 1e-9) unit = `${(v*1e9).toFixed(3)} nm/s`;
      else unit = `${v.toExponential(2)} m/s`;
      v_lin_str = `${unit} <span class="dim">(${wang.src})</span>`;
    }
    tr.innerHTML = `
      <td>${p.year}</td>
      <td><b>${p.short || p.label}</b><br><span class="dim">${p.location || ''}</span></td>
      <td class="col-app">${p.apparatus || ''}</td>
      <td>${p.L_arm != null ? p.L_arm : '—'}</td>
      <td>${p.n_reflections != null ? p.n_reflections : '—'}</td>
      <td>${p.D != null ? p.D : '—'}</td>
      <td>${wave}</td>
      <td>${p.v_assumed != null ? p.v_assumed : '—'}</td>
      <td class="num-warn">${Npred}</td>
      <td class="num-good">${Nobs}</td>
      <td class="num-bound">${dcc}</td>
      <td class="num-good">${v_imp_str}</td>
      <td class="num-bound">${v_lin_str}</td>
      <td class="col-cite">${p.citation || ''}</td>
    `;
    tr.addEventListener('click', () => {
      document.querySelectorAll('#presets-table tbody tr').forEach(r => r.classList.remove('active'));
      tr.classList.add('active');
      applyPreset(p, null);
      $('presets-modal').hidden = true;
    });
    tbody.appendChild(tr);
  });
}

function applySagnac(p) {
  if (p.type === 'linear') {
    if (p.v_m_s != null)   $('g_v').value   = p.v_m_s;
    if (p.dl_m != null)    $('g_dl').value  = p.dl_m;
    if (p.n_turns != null) $('g_N').value   = p.n_turns;
    if (p.axis_angle_deg != null) $('g_th').value = p.axis_angle_deg;
    if (p.lam_nm) $('g_lam').value = p.lam_nm;
    $('g_v').dispatchEvent(new Event('input'));
  } else {
    if (p.A != null)   $('s_A').value = p.A;
    if (p.lam_nm)      $('s_lam').value = p.lam_nm;
    if (p.omega_rad_s != null) $('s_om').value = p.omega_rad_s;
    if (p.axis_angle_deg != null) $('s_th').value = p.axis_angle_deg;
    if (p.perim_m != null) $('s_L').value = p.perim_m;
    if (p.DN_observed != null) $('s_DNobs').value = p.DN_observed;
    $('s_A').dispatchEvent(new Event('input'));
  }
}

export function buildSagnacTable() {
  const tbody = $('sagnac-tbody');
  SAGNAC_PRESETS.forEach(p => {
    const tr = document.createElement('tr');
    tr.dataset.id = p.id;
    let DNpred = '—', motionA = '—', motionL = '—', motionRate = '—', f_earth = '—';
    if (p.type === 'linear') {
      const DN = wangN(p.v_m_s, p.dl_m, p.n_turns || 1, p.lam_nm, p.axis_angle_deg || 0);
      DNpred = fmt(DN, 6);
      motionA = `Δl·N = ${(p.dl_m * (p.n_turns || 1)).toFixed(3)} m`;
      motionL = `(${p.dl_m} m × ${p.n_turns || 1})`;
      motionRate = `v = ${p.v_m_s} m/s`;
    } else {
      DNpred = p.DN_predicted != null
        ? fmt(p.DN_predicted, 5)
        : (p.A && p.lam_nm && p.omega_rad_s != null
            ? fmt(sagnacN(p.A, p.lam_nm, p.omega_rad_s, p.axis_angle_deg || 0), 5)
            : '—');
      motionA = p.A != null ? `A = ${p.A}` : '—';
      motionL = p.perim_m != null ? `L = ${p.perim_m}` : '—';
      motionRate = p.omega_rad_s != null ? `Ω = ${p.omega_rad_s.toExponential(3)}` : '—';
      f_earth = (p.A && p.lam_nm && p.perim_m && p.omega_rad_s != null)
        ? fmt(sagnacBeatHz(p.A, p.lam_nm, p.perim_m, p.omega_rad_s, p.axis_angle_deg || 0), 3) + ' Hz'
        : '—';
    }
    const DNobs = p.DN_observed != null
      ? `${fmt(p.DN_observed, 5)} ± ${fmt(p.sigma_DN || 0, 5)}`
      : '—';
    const typeBadge = p.type === 'linear'
      ? '<span class="dim" style="color:var(--accent2)">linear</span>'
      : '<span class="dim" style="color:var(--accent3)">rot.</span>';
    const sagWang = sagnacLinearEquivV(p);
    let v_lin_str = '—';
    if (sagWang) {
      const v = sagWang.v;
      let unit;
      if (v >= 1) unit = `${v.toFixed(4)} m/s`;
      else if (v >= 1e-3) unit = `${(v*1000).toFixed(4)} mm/s`;
      else if (v >= 1e-6) unit = `${(v*1e6).toFixed(4)} μm/s`;
      else if (v >= 1e-9) unit = `${(v*1e9).toFixed(4)} nm/s`;
      else unit = `${v.toExponential(3)} m/s`;
      v_lin_str = `${unit} <span class="dim">(${sagWang.src})</span>`;
    }
    tr.innerHTML = `
      <td>${p.year}<br>${typeBadge}</td>
      <td><b>${p.short || p.label}</b><br><span class="dim">${p.location || ''}</span></td>
      <td class="col-app">${p.apparatus || ''}${p.note ? '<br><span class="dim">' + p.note + '</span>' : ''}</td>
      <td>${motionA}</td>
      <td>${motionL}</td>
      <td>${p.lam_nm || '—'}</td>
      <td>${motionRate}</td>
      <td>${p.axis_angle_deg != null ? p.axis_angle_deg : '—'}</td>
      <td class="num-warn">${DNpred}</td>
      <td class="num-good">${DNobs}</td>
      <td class="num-bound">${f_earth}</td>
      <td class="num-good">${v_lin_str}</td>
      <td class="col-cite">${p.citation || ''}</td>
    `;
    tr.addEventListener('click', () => {
      document.querySelectorAll('#sagnac-table tbody tr').forEach(r => r.classList.remove('active'));
      tr.classList.add('active');
      applySagnac(p);
      $('sagnac-modal').hidden = true;
    });
    tbody.appendChild(tr);
  });
}

export function bindModal() {
  function open(id)  { $(id).hidden = false; }
  function close(id) { $(id).hidden = true; }
  $('open-presets').addEventListener('click', () => open('presets-modal'));
  $('close-presets').addEventListener('click', () => close('presets-modal'));
  $('presets-modal').addEventListener('click', e => {
    if (e.target.id === 'presets-modal') close('presets-modal');
  });
  $('open-sagnac').addEventListener('click', () => open('sagnac-modal'));
  $('close-sagnac').addEventListener('click', () => close('sagnac-modal'));
  $('sagnac-modal').addEventListener('click', e => {
    if (e.target.id === 'sagnac-modal') close('sagnac-modal');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { close('presets-modal'); close('sagnac-modal'); }
  });
}

export function updateReadout() {
  const p = physicsLive();
  $('r-v').textContent     = `${state.vKms.toLocaleString()} km/s`;
  $('r-D').textContent     = `${state.D.toFixed(2)} m`;
  $('r-lam').textContent   = `${state.lam.toFixed(0)} nm`;
  $('r-beta').textContent  = p.beta.toExponential(3);
  $('r-dp').textContent    = p.dpath > 1e-3
    ? `${(p.dpath * 1e3).toFixed(3)} mm`
    : `${(p.dpath * 1e9).toFixed(2)} nm`;
  $('r-N').textContent     = fmt(p.N, 5);
  const phaseFrac = ((p.N % 1) + 1) % 1;
  $('phase-fill').style.width = `${phaseFrac * 100}%`;
  $('r-phase').textContent = `${(phaseFrac * 360).toFixed(2)}°`;
}
