const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');
test('repair learning extends the existing hardware section with safe source handoffs',()=>{
 const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');assert.equal(html.split('id="ifixit-repair"').length,2);assert.match(html,/without opening or powering/);assert.match(html,/qualified technician/);assert.match(html,/repair-literacy/);assert.match(html,/No repair, firmware modification, iFixit sponsorship or affiliation/);
});
