import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkVisaFile } from '../lib/visa-file-check.ts';
test('visa file check accepts boundary dimensions and conservative maximum bytes', () => {
  for (const size of [600, 1200]) assert.ok(checkVisaFile({jpeg:true,bytes:240000,width:size,height:size}).every(c=>c.passed));
});
test('a square photo does not hide format, size or resolution failures', () => {
  const result=checkVisaFile({jpeg:false,bytes:240001,width:599,height:599});
  assert.ok(result.every(c=>!c.passed));
  assert.equal(checkVisaFile({jpeg:true,bytes:100000,width:600,height:750})[1].passed,false);
  assert.equal(checkVisaFile({jpeg:true,bytes:0,width:1201,height:1201})[2].passed,false);
});
