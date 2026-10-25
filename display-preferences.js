/* PIXIE display preferences: local-only, no analytics or external calls. */
(() => {
  'use strict';
  const root = document.documentElement;
  const key = 'pixie-display-v1';
  const valid = { theme: ['system','dark','light'], size: ['default','large','largest'], contrast: ['standard','high'] };
  const read = () => {
    try { const s = JSON.parse(localStorage.getItem(key) || '{}'); return s && typeof s === 'object' ? s : {}; }
    catch { return {}; }
  };
  const current = read();
  const state = Object.fromEntries(Object.entries(valid).map(([field, values]) =>
    [field, values.includes(current[field]) ? current[field] : values[0]]));
  function apply() {
    root.dataset.theme = state.theme;
    root.dataset.textSize = state.size;
    root.dataset.contrast = state.contrast;
    root.style.colorScheme = state.theme === 'light' ? 'light' : state.theme === 'dark' ? 'dark' : '';
    document.querySelectorAll('[data-display-setting]').forEach(input => {
      input.value = state[input.dataset.displaySetting];
    });
  }
  function persist() {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* disabled storage: session controls still work */ }
  }
  document.addEventListener('change', event => {
    const el = event.target;
    if (!el.matches || !el.matches('[data-display-setting]')) return;
    const field = el.dataset.displaySetting;
    if (!Object.hasOwn(valid, field) || !valid[field].includes(el.value)) return;
    state[field] = el.value;
    apply(); persist();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest || !event.target.closest('[data-reset-display]')) return;
    state.theme = 'system'; state.size = 'default'; state.contrast = 'standard';
    apply(); persist();
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once:true });
  else apply();
})();
