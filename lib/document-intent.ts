/** A configured preset is not evidence that an authority has approved it. */
export function hasDocumentPreset(spec: { id: string }, isVisa: boolean): boolean {
  return isVisa ? spec.id.endsWith('-visa') : spec.id.endsWith('-passport');
}
