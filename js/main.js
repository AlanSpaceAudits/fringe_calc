import { state, initCanvases, drawStage, drawFringes } from './sim.js';
import { bindCalculators, bindSliders, buildScenarios, bindPopups, updateReadout, buildPresetTable, bindModal } from './ui.js';

initCanvases();
bindCalculators();
bindSliders();
buildScenarios();
bindPopups();
buildPresetTable();
bindModal();

let last = performance.now();
function loop(now) {
  const dt = now - last;
  last = now;
  if (!state.pause) state.t += dt * state.speed;
  drawStage();
  drawFringes();
  updateReadout();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
