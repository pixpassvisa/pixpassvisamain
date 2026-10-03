import sharp from 'sharp';
await sharp('public/images/example-portrait.png').resize({width:640}).webp({quality:85}).toFile('public/images/example-portrait.webp');
console.log('Optimized original example portrait.');
