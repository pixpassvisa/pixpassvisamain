import type { SpecEntry } from './slug-utils';
interface ContentBlock { type: 'h2' | 'h3' | 'h4' | 'p' | 'ul'; text?: string; items?: string[]; }
/** Describe tool settings without implying government verification. */
export function generateLongformContent(spec: SpecEntry, isVisa: boolean): ContentBlock[] {
  const document = isVisa ? 'visa' : 'passport';
  return [
    { type: 'h2', text: spec.country + ' ' + document + ': configured photo preset' },
    { type: 'p', text: 'The selected preset is ' + spec.name + '. Its configured print dimensions are ' + spec.width_mm + ' × ' + spec.height_mm + ' mm' + (spec.width_px && spec.height_px ? ' and digital dimensions are ' + spec.width_px + ' × ' + spec.height_px + ' pixels' : '') + '. These describe this tool’s settings; confirm that they match your current application instructions.' },
    { type: 'h2', text: 'Check the application before editing' },
    { type: 'ul', items: ['Confirm the issuing office, document type, and whether you need a digital upload, printed photograph, or in-person capture.', 'Check the permitted background, photo age, head position, file format, and file size against that application’s instructions.', 'Keep your original photograph. Where editing is prohibited, retake the photo instead of replacing its background or altering facial details.'] },
    { type: 'h2', text: 'Preview, pricing, and limitations' },
    { type: 'p', text: 'Preview and automated checks are free. Processed downloads require a one-time payment at the price shown before checkout. Review the output before buying. A passing automated result does not establish government acceptance or check every application rule.' },
  ];
}
