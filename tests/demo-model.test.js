const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('../demo-model.js');
test('skipping a transcript prevents a translation claim across every scenario', () => {
  for (const key of Object.keys(M.scenarios)) {
    const s = M.create(key); s.language = 'Japanese';
    assert.match(M.summary(s), /Transcript: skipped/);
    assert.match(M.summary(s), /Translation: skipped/);
    s.transcript = true;
    assert.match(M.summary(s), /Japanese selected; provider not contacted/);
  }
});
test('filenames preserve the scenario extension and reject path and markup input', () => {
  for (const key of Object.keys(M.scenarios)) {
    assert.ok(M.validName(M.create(key).filename, key));
    assert.equal(M.validName('../escape.' + M.scenarios[key].ext, key), false);
    assert.equal(M.validName('<script>.txt', key), false);
    assert.equal(M.validName('wrong.extension', key), false);
  }
  assert.equal(M.filename('Échos / one <two>', 'music'), 'echos-one-two_example-v01.m4a');
});
test('restart model carries no confirmation or prior private draft', () => {
  const s = M.create('music'); s.status = 'confirmed in simulation'; s.note = 'previous private draft';
  const fresh = M.create('music');
  assert.equal(fresh.status, 'planning'); assert.equal(fresh.note, '');
  assert.doesNotMatch(M.summary(fresh), /previous private draft/);
});
