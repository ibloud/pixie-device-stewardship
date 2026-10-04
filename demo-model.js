/* Pure local planning model. No file access, storage, service calls or inference. */
(function (root) {
  'use strict';
  const scenarios = {
    stream: { label: 'After a stream', title: 'Community development session', file: 'capture-example.mkv', ext: 'mkv', next: 'Review one clip tomorrow.' },
    music: { label: 'After music practice', title: 'My original rhythm exercise', file: 'practice-example.m4a', ext: 'm4a', next: 'Try the rhythm slowly next time.' },
    return: { label: 'Return to a project', title: 'My game prototype', file: 'project-example.txt', ext: 'txt', next: 'Test the next interaction.' }
  };
  function create(key = 'stream') {
    if (!scenarios[key]) key = 'stream';
    return { scenario: key, title: scenarios[key].title, filename: filename(scenarios[key].title, key), transcript: false, language: '', note: '', status: 'planning' };
  }
  function filename(title, key) {
    const stem = String(title).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'my-project';
    return stem + '_example-v01.' + scenarios[key].ext;
  }
  function validName(name, key) {
    return name.length <= 120 && /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(name) && name.endsWith('.' + scenarios[key].ext);
  }
  function summary(s) {
    return [
      'PIXIE SIMULATION — no real file processing or external action',
      'Scenario: ' + scenarios[s.scenario].label,
      'Original example: ' + scenarios[s.scenario].file + ' (unchanged)',
      'Proposed working copy: ' + s.filename,
      'Transcript: ' + (s.transcript ? 'sample transcript selected; no audio processed' : 'skipped'),
      'Translation: ' + (s.transcript && s.language ? s.language + ' selected; provider not contacted' : 'skipped'),
      'Re-entry note: ' + (s.note || 'skipped'),
      'Status: ' + s.status,
      'No reminder, upload, publication, rename or connection was executed.'
    ].join('\n');
  }
  const api = { scenarios, create, filename, validName, summary };
  root.PixieDemoModel = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window === 'undefined' ? globalThis : window);
