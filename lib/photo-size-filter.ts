export function matchesPhotoSize(spec: { width_mm: number | string; height_mm: number | string }, filter: string): boolean {
  const dimensions: Record<string, [number, number]> = { "2x2": [51, 51], "35x45": [35, 45], "50x70": [50, 70] };
  const size = dimensions[filter];
  return !size || (Number(spec.width_mm) === size[0] && Number(spec.height_mm) === size[1]);
}
