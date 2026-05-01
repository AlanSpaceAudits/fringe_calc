import { state, physicsLive, fmt, C } from './sim.js';
import { PRESETS, impliedV, impliedVSigma } from './scenarios.js';

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
  ['f_L', 'f_nr', 'f_n', 'f_lam', 'f_v'].forEach(id => $(id).addEventListener('input', fwd));
  ['i_D', 'i_lam', 'i_N', 'i_sN'].forEach(id => $(id).addEventListener('input', inv));
  $('d_dcc').addEventListener('input', dcc);
  fwd(); inv(); dcc();
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
      <td class="col-cite">${p.citation || ''}</td>
    `;
    tr.addEventListener('click', () => {
      document.querySelectorAll('#presets-table tbody tr').forEach(r => r.classList.remove('active'));
      tr.classList.add('active');
      applyPreset(p, null);
    });
    tbody.appendChild(tr);
  });
}

export function bindModal() {
  $('open-presets').addEventListener('click', () => $('presets-modal').hidden = false);
  $('close-presets').addEventListener('click', () => $('presets-modal').hidden = true);
  $('presets-modal').addEventListener('click', e => {
    if (e.target.id === 'presets-modal') $('presets-modal').hidden = true;
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
