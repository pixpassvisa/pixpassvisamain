/** Resolve known aliases before canonical-host normalization, including legacy silos. */
export function canonicalRedirects(rules, origin = 'https://www.pixpassvisa.com') {
  const exact = new Map(rules.filter(r => !r.source.includes(':')).map(r => [r.source, r.destination]));
  const resolve = path => {
    const seen = new Set();
    while (exact.has(path)) {
      if (seen.has(path)) throw new Error(`Redirect cycle: ${path}`);
      seen.add(path);
      path = exact.get(path);
    }
    return path;
  };
  const expanded = [...exact.keys()].flatMap(path => ['/photo', '/visa-photo'].map(prefix => ({
    source: `${prefix}${path}`, destination: resolve(path), permanent: true,
  })));
  return [...expanded, ...rules].map(rule => ({
    ...rule, destination: `${origin}${resolve(rule.destination)}`,
  }));
}
