import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
const cache = new Map();
// Exercise source modules with JSON imports without changing production module conventions.
export default function loadTs(filename) {
  const full = path.resolve(filename);
  if (cache.has(full)) return cache.get(full);
  const source = ts.transpileModule(fs.readFileSync(full,'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }
  }).outputText;
  const mod = { exports: {} };
  const nativeRequire = createRequire(full);
  const requireSource = name => {
    if (name.startsWith('.') && !path.extname(name)) return loadTs(path.resolve(path.dirname(full),name+'.ts'));
    return nativeRequire(name);
  };
  cache.set(full,mod.exports);
  vm.runInThisContext('(function(require,module,exports){'+source+'\n})', {filename:full})(requireSource,mod,mod.exports);
  cache.set(full,mod.exports);
  return mod.exports;
};
