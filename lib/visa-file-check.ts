export function checkVisaFile(input: { jpeg: boolean; bytes: number; width: number; height: number }) {
  return [
    { label: 'JPEG file', passed: input.jpeg, detail: input.jpeg ? 'JPEG signature detected' : 'Export as JPEG; renaming the extension does not convert a file.' },
    { label: 'Square dimensions, 600–1200 pixels', passed: Number.isInteger(input.width) && input.width === input.height && input.width >= 600 && input.width <= 1200, detail: `${input.width} × ${input.height} pixels` },
    // Use a conservative decimal kB limit rather than silently allowing 245,760 bytes.
    { label: 'File size at most 240 kB', passed: Number.isFinite(input.bytes) && input.bytes > 0 && input.bytes <= 240000, detail: `${input.bytes.toLocaleString('en-US')} bytes (this check uses a 240,000-byte limit)` },
  ];
}
