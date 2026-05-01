export const C = 299792458;

export const state = {
  vKms: 30000,
  D: 11,
  lam: 589,
  speed: 1,
  rotationDeg: 0,
  lorentz: false,
  showWind: true,
  pause: false,
  t: 0
};

export function fmt(x, digits = 4) {
  if (!isFinite(x)) return '--';
  if (Math.abs(x) >= 1e6 || (Math.abs(x) > 0 && Math.abs(x) < 1e-4)) return x.toExponential(digits);
  return x.toFixed(digits);
}

export function physicsLive() {
  const D = state.D;
  const lam = state.lam * 1e-9;
  const v = state.vKms * 1000;
  const beta2 = (v * v) / (C * C);
  const Dpar = state.lorentz ? D * Math.sqrt(Math.max(0, 1 - beta2)) : D;

  const tPar  = (2 * Dpar / C) / Math.max(1e-30, 1 - beta2);
  const tPerp = (2 * D    / C) / Math.sqrt(Math.max(1e-30, 1 - beta2));
  const dt = tPar - tPerp;
  const dpath = 2 * dt * C;
  const N = dpath / lam;
  const beta = Math.sqrt(beta2);
  return { D, Dpar, lam, v, beta, beta2, tPar, tPerp, dt, dpath, N };
}

function wavelengthToRGB(nm) {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; g = 0; b = 1; }
  else if (nm < 490) { r = 0; g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { r = 0; g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; b = 0; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; b = 0; }
  else if (nm <= 780) { r = 1; g = 0; b = 0; }
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

function fitCanvas(cv) {
  const ratio = window.devicePixelRatio || 1;
  const rect = cv.getBoundingClientRect();
  cv.width = Math.round(rect.width * ratio);
  cv.height = Math.round(rect.height * ratio);
  return ratio;
}

let stage, sctx, fr, fctx, R = 1, FR = 1;

export function initCanvases() {
  stage = document.getElementById('stage');
  fr = document.getElementById('fringes');
  sctx = stage.getContext('2d');
  fctx = fr.getContext('2d');
  R = fitCanvas(stage);
  FR = fitCanvas(fr);
  window.addEventListener('resize', () => {
    R = fitCanvas(stage);
    FR = fitCanvas(fr);
  });
}

function lerp(a, b, t) { return a + (b - a) * t; }

function pulse(x, y, color) {
  const grd = sctx.createRadialGradient(x, y, 0, x, y, 18 * R);
  grd.addColorStop(0, color);
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  sctx.fillStyle = grd;
  sctx.beginPath();
  sctx.arc(x, y, 18 * R, 0, 2 * Math.PI);
  sctx.fill();
  sctx.fillStyle = color;
  sctx.beginPath();
  sctx.arc(x, y, 4 * R, 0, 2 * Math.PI);
  sctx.fill();
}

function drawWave(x0, y0, x1, y1, color, density, amp, phaseShift) {
  const dx = x1 - x0, dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  if (len < 1) return;
  const nx = dx / len, ny = dy / len;
  const px = -ny, py = nx;
  sctx.strokeStyle = color;
  sctx.globalAlpha = 0.55;
  sctx.lineWidth = 1.4 * R;
  sctx.beginPath();
  const steps = Math.max(8, Math.floor(len / 1.5));
  for (let s = 0; s <= steps; s++) {
    const f = s / steps;
    const lx = x0 + dx * f;
    const ly = y0 + dy * f;
    const ph = (f * density + phaseShift) * 2 * Math.PI;
    const off = Math.sin(ph) * amp * R;
    const wx = lx + px * off;
    const wy = ly + py * off;
    if (s === 0) sctx.moveTo(wx, wy); else sctx.lineTo(wx, wy);
  }
  sctx.stroke();
  sctx.globalAlpha = 1;
}

export function drawStage() {
  const W = stage.width, H = stage.height;
  sctx.clearRect(0, 0, W, H);
  sctx.fillStyle = '#05080f';
  sctx.fillRect(0, 0, W, H);

  const phys = physicsLive();
  const beamColor = wavelengthToRGB(state.lam);

  if (state.showWind) {
    const arrowY = 0.08 * H;
    const wOff = (state.t * 0.04 * (state.vKms / 1000)) % 60;
    sctx.strokeStyle = 'rgba(80,140,200,0.25)';
    sctx.lineWidth = 1.2;
    for (let x = -wOff; x < W; x += 60) {
      sctx.beginPath();
      sctx.moveTo(x, arrowY);
      sctx.lineTo(x + 30, arrowY);
      sctx.lineTo(x + 24, arrowY - 4);
      sctx.moveTo(x + 30, arrowY);
      sctx.lineTo(x + 24, arrowY + 4);
      sctx.stroke();
    }
    sctx.fillStyle = '#5d80a8';
    sctx.font = `${13 * R}px ui-monospace, monospace`;
    sctx.fillText('ether wind  v →', 14 * R, arrowY - 8);
    sctx.fillText(`${state.vKms.toLocaleString()} km/s   β = ${phys.beta.toExponential(2)}`,
      14 * R, arrowY + 18);
  }

  const cx = 0.46 * W;
  const cy = 0.55 * H;
  const armPx = Math.min(0.30 * W, 0.32 * H);
  const rot = (state.rotationDeg * Math.PI) / 180;

  sctx.save();
  sctx.translate(cx, cy);
  sctx.rotate(rot);

  const lorentzScale = state.lorentz ? Math.sqrt(Math.max(0, 1 - phys.beta2)) : 1;
  const parPx = armPx * lorentzScale;
  const perpPx = armPx;

  const sourceX = -armPx - 60 * R;
  const splitX = 0;
  const yMid = 0;
  const mirRX = parPx;
  const mirUY = -perpPx;
  const detY = perpPx + 0;

  sctx.strokeStyle = '#1f2740';
  sctx.lineWidth = 1;
  sctx.setLineDash([4, 6]);
  sctx.beginPath();
  sctx.moveTo(splitX, yMid); sctx.lineTo(mirRX, yMid);
  sctx.moveTo(splitX, yMid); sctx.lineTo(splitX, mirUY);
  sctx.moveTo(splitX, yMid); sctx.lineTo(splitX, detY);
  sctx.stroke();
  sctx.setLineDash([]);

  const cycleSec = 2.0;
  const phaseAdvance = (state.t / 1000) * (1 / cycleSec) * state.speed;
  const phase = phaseAdvance % 1;

  const tParRel = Math.max(1e-6, 1 - phys.beta2) * (1 / (lorentzScale || 1));
  const tPerpRel = Math.sqrt(Math.max(1e-6, 1 - phys.beta2));

  const tRef = (state.t / 1000) * state.speed * 1.5;
  const parDensity = 26 / Math.max(0.05, tParRel);
  const perpDensity = 26 / Math.max(0.05, tPerpRel);

  drawWave(sourceX, yMid, splitX, yMid, beamColor, 26, 3, -tRef);
  drawWave(splitX, yMid, mirRX, yMid, '#00e5ff', parDensity, 4, -tRef);
  drawWave(splitX, yMid, splitX, mirUY, '#ff5ec4', perpDensity, 4, -tRef);
  drawWave(splitX, yMid, splitX, detY, beamColor, 26, 2, -tRef);

  pulse(lerp(sourceX, splitX, Math.min(1, phase * 1.2)), yMid, beamColor);

  const parPhase = (phase / Math.max(1e-3, tParRel)) % 2;
  const parFrac = parPhase < 1 ? parPhase : 2 - parPhase;
  if (parPhase < 2) pulse(lerp(splitX, mirRX, parFrac), yMid, '#00e5ff');

  const perpPhase = (phase / Math.max(1e-3, tPerpRel)) % 2;
  const perpFrac = perpPhase < 1 ? perpPhase : 2 - perpPhase;
  if (perpPhase < 2) pulse(splitX, lerp(yMid, mirUY, perpFrac), '#ff5ec4');

  sctx.fillStyle = '#080c16';
  sctx.strokeStyle = '#3a4868';
  sctx.lineWidth = 2 * R;
  sctx.beginPath();
  sctx.arc(sourceX, yMid, 22 * R, 0, 2 * Math.PI);
  sctx.fill(); sctx.stroke();
  sctx.fillStyle = beamColor;
  sctx.beginPath();
  sctx.arc(sourceX, yMid, 9 * R, 0, 2 * Math.PI);
  sctx.fill();

  sctx.save();
  sctx.translate(splitX, yMid);
  sctx.rotate(-Math.PI / 4);
  sctx.fillStyle = 'rgba(150,180,220,0.18)';
  sctx.fillRect(-26 * R, -2 * R, 52 * R, 4 * R);
  sctx.strokeStyle = '#a8c0e0';
  sctx.lineWidth = 1.2 * R;
  sctx.strokeRect(-26 * R, -2 * R, 52 * R, 4 * R);
  sctx.restore();

  sctx.strokeStyle = '#cbd6e8';
  sctx.lineWidth = 3 * R;
  sctx.beginPath();
  sctx.moveTo(mirRX, yMid - 22 * R); sctx.lineTo(mirRX, yMid + 22 * R);
  sctx.moveTo(splitX - 22 * R, mirUY); sctx.lineTo(splitX + 22 * R, mirUY);
  sctx.stroke();

  sctx.fillStyle = '#080c16';
  sctx.strokeStyle = '#3a4868';
  sctx.lineWidth = 2 * R;
  sctx.beginPath();
  sctx.rect(splitX - 36 * R, detY + 4 * R, 72 * R, 28 * R);
  sctx.fill(); sctx.stroke();

  sctx.fillStyle = '#8b96aa';
  sctx.font = `${11 * R}px ui-monospace, monospace`;
  sctx.textAlign = 'center';
  sctx.fillText(`source`, sourceX, yMid + 40 * R);
  sctx.fillText(`splitter`, splitX, yMid - 38 * R);
  sctx.fillText(`mirror ∥`, mirRX, yMid + 40 * R);
  sctx.fillText(`mirror ⟂`, splitX, mirUY - 14 * R);
  sctx.fillText(`detector`, splitX, detY + 50 * R);

  sctx.fillStyle = '#00e5ff';
  sctx.fillText(`D∥ = ${(state.D * lorentzScale).toFixed(2)} m`, mirRX / 2, yMid + 60 * R);
  sctx.save();
  sctx.translate(splitX - 22 * R, mirUY / 2);
  sctx.rotate(-Math.PI / 2);
  sctx.fillStyle = '#ff5ec4';
  sctx.fillText(`D⟂ = ${state.D.toFixed(2)} m`, 0, 0);
  sctx.restore();

  sctx.restore();

  if (state.lorentz) {
    sctx.fillStyle = 'rgba(255,154,60,0.85)';
    sctx.font = `${12 * R}px ui-monospace, monospace`;
    sctx.textAlign = 'left';
    sctx.fillText(`Lorentz contraction ON  →  D∥ × √(1-β²)`, 14 * R, H - 14 * R);
  }
}

export function drawFringes() {
  const W = fr.width, H = fr.height;
  fctx.clearRect(0, 0, W, H);
  const phys = physicsLive();
  const phaseShift = ((phys.N % 1) + 1) % 1 * 2 * Math.PI;
  const cycles = 8;
  const c = wavelengthToRGB(state.lam);
  const img = fctx.createImageData(W, H);
  const m = c.match(/\d+/g).map(Number);
  for (let x = 0; x < W; x++) {
    const ph = (x / W) * cycles * 2 * Math.PI + phaseShift;
    const I = 0.5 + 0.5 * Math.cos(ph);
    for (let y = 0; y < H; y++) {
      const i = (y * W + x) * 4;
      img.data[i]   = m[0] * I;
      img.data[i+1] = m[1] * I;
      img.data[i+2] = m[2] * I;
      img.data[i+3] = 255;
    }
  }
  fctx.putImageData(img, 0, 0);
}
