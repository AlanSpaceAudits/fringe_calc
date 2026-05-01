import { state, physicsLive, fmt, C } from './sim.js';
import { SCENARIOS } from './scenarios.js';

const $ = id => document.getElementById(id);

export function bindCalculators() {
  function fwd() {
    const D = parseFloat($('f_D').value);
    const lam = parseFloat($('f_lam').value) * 1e-9;
    const v = parseFloat($('f_v').value) * 1000;
    const N = (2 * D * v * v) / (lam * C * C);
    $('f_N').textContent = fmt(N, 4);
  }
  function inv() {
    const D = parseFloat($('i_D').value);
    const lam = parseFloat($('i_lam').value) * 1e-9;
    const N = parseFloat($('i_N').value);
    const v = C * Math.sqrt(N * lam / (2 * D));
    $('i_v').textContent = fmt(v / 1000, 3);
  }
  ['f_D', 'f_lam', 'f_v'].forEach(id => $(id).addEventListener('input', fwd));
  ['i_D', 'i_lam', 'i_N'].forEach(id => $(id).addEventListener('input', inv));
  fwd(); inv();
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
  SCENARIOS.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'scenario';
    btn.textContent = s.label;
    btn.title = s.note;
    btn.addEventListener('click', () => applyScenario(s, btn));
    wrap.appendChild(btn);
  });
}

function applyScenario(s, btn) {
  document.querySelectorAll('.scenario').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  Object.assign(state, s.params);
  syncControls();
}

function syncControls() {
  $('a_v').value = state.vKms;       $('a_v_val').textContent = state.vKms + ' km/s';
  $('a_D').value = state.D;          $('a_D_val').textContent = state.D + ' m';
  $('a_lam').value = state.lam;      $('a_lam_val').textContent = state.lam + ' nm';
  $('a_rot').value = state.rotationDeg; $('a_rot_val').textContent = state.rotationDeg + '°';
  $('a_lorentz').checked = state.lorentz;
}

export function bindPopups() {
  function toggle(id) {
    const el = $(id);
    el.hidden = !el.hidden;
  }
  function close(id) { $(id).hidden = true; }
  $('about-btn').addEventListener('click', e => {
    e.stopPropagation();
    close('legend-popup'); toggle('about-popup');
  });
  $('legend-btn').addEventListener('click', e => {
    e.stopPropagation();
    close('about-popup'); toggle('legend-popup');
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.info-box')) {
      close('about-popup'); close('legend-popup');
    }
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
