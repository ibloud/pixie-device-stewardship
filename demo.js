(() => {
  'use strict';
  const M = window.PixieDemoModel;
  const $ = id => document.getElementById(id);
  let state = M.create(), step = 0, pausedStep = 0;
  const panels = [...document.querySelectorAll('[data-demo-panel]')];
  function announce(text) { $('demo-status').textContent = text; }
  function show(n, message = '') {
    step = n;
    panels.forEach(p => { p.hidden = p.dataset.demoPanel !== String(n); });
    document.querySelectorAll('.demo-step').forEach((p, i) => {
      p.classList.toggle('active', i === n);
      p.removeAttribute('aria-current');
      if (i === n) p.setAttribute('aria-current', 'step');
    });
    if (n === 5) $('plan-preview').textContent = M.summary(state);
    const heading = panels.find(p => !p.hidden)?.querySelector('h3');
    heading?.focus({preventScroll: true});
    announce(message || (heading?.textContent || ''));
  }
  function choose() {
    state = M.create($('scenario').value);
    $('session-title').value = state.title;
    $('filename').value = state.filename;
    $('original-file').textContent = M.scenarios[state.scenario].file;
    $('resume-note').value = M.scenarios[state.scenario].next;
    $('name-error').textContent = '';
    $('receipt').hidden = true;
    $('confirm-plan').disabled = false;
  }
  function restart() { choose(); show(0, 'Reset. Previous demo choices cleared.'); }
  $('scenario').addEventListener('change', () => { choose(); announce('Example changed. No files accessed.'); });
  $('start-demo').addEventListener('click', () => show(1));
  $('session-title').addEventListener('input', () => {
    state.title = $('session-title').value;
    state.filename = M.filename(state.title, state.scenario);
    $('filename').value = state.filename;
  });
  $('accept-name').addEventListener('click', () => {
    const name = $('filename').value.trim();
    if (!M.validName(name, state.scenario)) {
      $('name-error').textContent = 'Use letters, numbers, dots, hyphens or underscores and keep the original file extension.';
      $('filename').focus(); return;
    }
    $('name-error').textContent = ''; state.filename = name; state.status = 'planning'; show(2);
  });
  $('include-transcript').addEventListener('click', () => { state.transcript = true; show(3); });
  $('skip-transcript').addEventListener('click', () => { state.transcript = false; state.language = ''; show(4, 'Transcript and translation skipped.'); });
  $('include-translation').addEventListener('click', () => { state.language = $('language').value; show(4); });
  $('skip-translation').addEventListener('click', () => { state.language = ''; show(4, 'Translation skipped.'); });
  $('include-note').addEventListener('click', () => {
    if (!$('resume-note').value.trim()) { announce('Write a short note or choose Skip note.'); $('resume-note').focus(); return; }
    state.note = $('resume-note').value.trim(); show(5);
  });
  $('skip-note').addEventListener('click', () => { state.note = ''; show(5); });
  $('confirm-plan').addEventListener('click', () => {
    state.status = 'confirmed in simulation';
    $('plan-preview').textContent = M.summary(state);
    $('receipt').hidden = false;
    $('confirm-plan').disabled = true;
    announce('Simulation confirmed. Nothing was processed, saved or sent.');
  });
  $('edit-plan').addEventListener('click', () => {
    state.status = 'planning'; $('receipt').hidden = true; $('confirm-plan').disabled = false; show(1, 'Confirmation cleared. Review your revised choices before confirming again.');
  });
  document.querySelectorAll('[data-back]').forEach(b => b.addEventListener('click', () => show(Number(b.dataset.back))));
  $('pause-demo').addEventListener('click', () => {
    if (step === 'paused') return;
    pausedStep = step; show('paused', 'Paused. No reminder scheduled. Choices stay only in this tab.');
  });
  $('resume-demo').addEventListener('click', () => show(pausedStep));
  document.querySelectorAll('[data-reset]').forEach(b => b.addEventListener('click', restart));
  $('clear-demo').addEventListener('click', () => { choose(); show('paused', 'Stopped and cleared. No actions or reminders were executed.'); pausedStep = 0; });
  function download(text, name) {
    const url = URL.createObjectURL(new Blob([text], {type:'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
  $('download-plan').addEventListener('click', () => { download(M.summary(state), 'pixie-example-plan.txt'); announce('A demo plan download was requested. Choose where to keep it; no upload occurred.'); });
  const hardware = {
    ipad: ['iPad or iPhone: keep the useful workflow', 'Start with Safari and Files, and supported apps such as GarageBand. Check the OS and browser version, battery, accessibility, audio ports and adapters. Asahi does not support iPad; Linux experiments are not a general upgrade path.', 'https://www.ifixit.com/News/118176/apple-could-give-obsolete-ipads-new-life-with-this-one-weird-trick', 'Read the iFixit right-to-repair perspective'],
    intel: ['Intel Mac: compare macOS and Linux', 'Check the exact model first. OCLP is an option only for supported models and OS releases; root patches can change system files and security settings. A Linux live session can test Wi-Fi, audio and accessibility before an installation decision.', 'https://dortania.github.io/OpenCore-Legacy-Patcher/MODELS.html', 'Check the OCLP model list'],
    t2: ['Intel Mac with T2: use the device-specific route', 'These Macs need additional Linux drivers and boot configuration. Check t2linux support for your exact model. A generic USB guide or a year range does not establish compatibility.', 'https://wiki.t2linux.org/state/', 'Check T2 Linux features'],
    silicon: ['Apple Silicon Mac: check Asahi feature support', 'Use the current model and feature matrix for Fedora Asahi Remix. Keep an internal macOS installation for maintenance and recovery. Check audio, external displays, sleep and accessibility before changing your daily workflow.', 'https://asahilinux.org/docs/platform/feature-support/overview/', 'Check Asahi support'],
    android: ['Android: browser first, launcher and ROM later', 'Use the existing browser experience first. PIXIE’s native launcher and LineageOS work remain proposed, with a separate device-specific build and recovery process. No flashing is required to try this page.', 'https://github.com/ibloud/pixie-device-stewardship/blob/main/ANDROID-IMPLEMENTATION.md', 'Read the Android plan'],
    other: ['Use capabilities, not age, to choose', 'Start with what works today: browser, keyboard or touch, accessible audio and a local export. Repair, repurpose, transfer and recycling are separate owner decisions. Verify backup and recovery before an OS change.', 'https://github.com/ibloud/pixie-device-stewardship/blob/main/docs/HARDWARE-PATHWAYS.md', 'Read the hardware pathways']
  };
  $('hardware-select').addEventListener('change', renderHardware);
  function renderHardware() {
    const h = hardware[$('hardware-select').value];
    $('hardware-title').textContent = h[0]; $('hardware-copy').textContent = h[1];
    $('hardware-link').href = h[2]; $('hardware-link').textContent = h[3];
  }
  function unloadStream() {
    $('stream-player').replaceChildren();
    $('stream-status').textContent = 'Player removed. No stream is connected to PIXIE.';
  }
  $('load-stream').addEventListener('click', () => {
    const handle = $('stream-handle').value.trim().toLowerCase();
    const labels = handle.split('.');
    if (handle.length > 253 || labels.length < 2 || labels.some(x => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(x)) || !/^[a-z]/.test(labels[labels.length-1])) {
      $('stream-status').textContent = 'Enter a public AT Protocol handle, such as example.bsky.social. URLs and credentials are not accepted.'; return;
    }
    const iframe = document.createElement('iframe');
    iframe.title = 'Optional Streamplace player for ' + handle;
    iframe.src = 'https://stream.place/embed/' + encodeURIComponent(handle);
    iframe.referrerPolicy = 'no-referrer'; iframe.allowFullscreen = true;
    $('stream-player').replaceChildren(iframe);
    $('stream-status').textContent = 'Player requested for ' + handle + '. Stream availability is unverified. This is viewing only.';
  });
  $('unload-stream').addEventListener('click', unloadStream);
  $('stream-handle').addEventListener('input', unloadStream);
  $('feedback-form').addEventListener('submit', e => {
    e.preventDefault();
    const draft = [
      'PIXIE demo feedback (voluntary; no signup or commitment)',
      'Scenario: ' + M.scenarios[state.scenario].label,
      'Device family: ' + $('feedback-device').value,
      'Usefulness: ' + $('feedback-useful').value,
      'Interest: ' + $('feedback-interest').value,
      'Observation: ' + $('feedback-observation').value.trim(),
      'Expected behavior: ' + $('feedback-expected').value.trim(),
      'No session titles, filenames, private notes or identifiers were added automatically.'
    ].join('\n');
    $('feedback-draft').value = draft; $('feedback-preview').hidden = false;
    $('feedback-status').textContent = 'Draft ready in this tab. Review it, then choose whether to download or share.';
  });
  $('download-feedback').addEventListener('click', () => download($('feedback-draft').value, 'pixie-feedback.txt'));
  $('clear-feedback').addEventListener('click', () => {
    $('feedback-form').reset(); $('feedback-draft').value = ''; $('feedback-preview').hidden = true;
    $('feedback-status').textContent = 'Feedback cleared from this tab.';
  });
  choose(); renderHardware();
})();
