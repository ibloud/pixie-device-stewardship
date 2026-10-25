// Local-only smoke tests for the existing PIXIE demo model.
// Not a device, connector or production deletion certification.
const test=require('node:test');
const assert=require('node:assert/strict');
const M=require('../demo-model.js');
test('all scenarios start without optional capture or an external action',()=>{
 for(const scenario of Object.keys(M.scenarios)){
  const s=M.create(scenario);
  assert.equal(s.transcript,false);
  assert.equal(s.note,'');
  assert.equal(s.status,'planning');
  assert.match(M.summary(s),/No reminder, upload, publication, rename or connection was executed/);
 }
});
test('private draft state is not carried into a new local session',()=>{
 const old=M.create('music');
 old.note='CANARY_PRIVATE_DO_NOT_REUSE';old.transcript=true;old.status='confirmed in simulation';
 const fresh=M.create('music');
 assert.equal(fresh.note,'');assert.equal(fresh.transcript,false);
 assert.doesNotMatch(M.summary(fresh),/CANARY_PRIVATE_DO_NOT_REUSE/);
});
test('selecting optional features does not claim actual audio processing or third-party delivery',()=>{
 const state=M.create('stream');
 state.transcript=true;state.language='Japanese';
 const result=M.summary(state);
 assert.match(result,/no audio processed/);
 assert.match(result,/provider not contacted/);
 assert.match(result,/no real file processing or external action/i);
});
test('filenames reject traversal and markup for every supported scenario',()=>{
 for(const key of Object.keys(M.scenarios)){
  const ext=M.scenarios[key].ext;
  assert.equal(M.validName('../secret.'+ext,key),false);
  assert.equal(M.validName('<script>.'+ext,key),false);
 }
});
