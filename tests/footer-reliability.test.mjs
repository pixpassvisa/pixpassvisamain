import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as jsx from 'react/jsx-runtime';
import {renderToStaticMarkup} from 'react-dom/server';
import matter from 'gray-matter';

test('bundled guide navigation preserves published source slugs without runtime source files',()=>{
  const index=JSON.parse(fs.readFileSync('data/local-guide-index.json','utf8'));
  for(const [prefix,dir] of [['uk','content/uk'],['ca','content/ca'],['de/guides','content/de/guides']]) {
    const expected=fs.readdirSync(dir).filter(f=>f.endsWith('.md')).map(f=>{
      const {data}=matter(fs.readFileSync(`${dir}/${f}`,'utf8'));
      return `${prefix}/${data.slug||f.replace(/\.md$/,'')}`;
    }).sort();
    assert.deepEqual(index.filter(g=>g.prefix===prefix).map(g=>`${prefix}/${g.slug}`).sort(),expected);
  }
  assert.doesNotMatch(fs.readFileSync('lib/public-pages.ts','utf8'),/from ["'][^"']*(?:uk-content|ca-content|de-guides)["']/);
});

test('footer navigation failure cannot reject the root layout and exposes useful fallback links',async()=>{
  const code=ts.transpileModule(fs.readFileSync('app/components/PageDirectory.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  const exports={};
  vm.runInNewContext(code,{exports,console:{error(){}},require:(id)=>{
    if(id==='react/jsx-runtime') return jsx;
    if(id==='next/link') return ({children,...props})=>jsx.jsx('a',{...props,children});
    if(id==='@/lib/public-pages') return {getPublicPages:async()=>{throw new Error('EROFS: read-only source directory');}};
    if(id==='@/lib/page-directory') return {directoryGroups:[]};
    throw new Error(id);
  }});
  const html=renderToStaticMarkup(await exports.default({}));
  assert.match(html,/href="\/passport-photos"/);
  assert.match(html,/href="\/site-map"/);
  assert.doesNotMatch(html,/EROFS/);
});
