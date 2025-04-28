const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Ensure output directory exists
const outputDir = path.join(__dirname, '../../../public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert SVG to various PNG sizes
async function convertToPng() {
  const svgPath = path.join(__dirname, 'cuma-icon.svg');
  const svgBuffer = fs.readFileSync(svgPath);
  
  // Create favicon.ico (16x16, 32x32, 48x48)
  const sizes = [16, 32, 48, 96, 144, 192, 512];
  
  // Process each size
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(outputDir, `logo${size}.png`));
    
    console.log(`Created logo${size}.png`);
  }
  
  // Copy the 32x32 as favicon.ico
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(outputDir, 'favicon.png'));
  
  console.log('Created favicon.png (32x32)');
  console.log('Note: To create a proper .ico file, you may need to use a dedicated tool or online converter');
}

convertToPng().catch(err => {
  console.error('Error converting SVG:', err);
}); 