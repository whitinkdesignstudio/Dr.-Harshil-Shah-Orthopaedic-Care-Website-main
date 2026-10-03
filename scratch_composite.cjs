const sharp = require('sharp');
const fs = require('fs');

async function createAuthenticComposite() {
  const W = 1400;
  const H = 1323;

  // 1. Prepare base background from crop_test_original.webp
  const baseImg = await sharp('public/crop_test_original.webp')
    .resize(W, H)
    .toBuffer();

  // 2. Create the SVG architectural curve (#DCE9F2) and knee joint line-art
  const svgBackdrop = Buffer.from(`
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="archGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E8F2F8" stop-opacity="0.96" />
          <stop offset="45%" stop-color="#DCE9F2" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#D3E4EF" stop-opacity="0.92" />
        </linearGradient>
      </defs>

      <!-- Large Soft Architectural Curve (#DCE9F2) extending from right/top toward center -->
      <path d="M 0,0 L 780,0 C 740,200 620,360 480,520 C 350,660 280,800 200,980 L 0,980 Z" fill="url(#archGrad)" />

      <!-- Subtle Knee Joint Line-Art Graphic (18% opacity) inside the curve -->
      <g transform="translate(100, 180) scale(1.2)" opacity="0.18" stroke="#2D67A8">
        <path d="M 160 30 L 160 120 C 160 150 120 170 110 200 C 100 230 110 260 145 270 C 175 278 185 255 200 255 C 215 255 225 278 255 270 C 290 260 300 230 290 200 C 280 170 240 150 240 120 L 240 30" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 175 260 C 185 240 215 240 225 260" stroke-width="2" stroke-linecap="round" />
        <path d="M 125 220 C 130 245 155 255 170 250" stroke-width="1.5" stroke-dasharray="4 4" />
        <path d="M 275 220 C 270 245 245 255 230 250" stroke-width="1.5" stroke-dasharray="4 4" />

        <path d="M 160 180 C 160 155 240 155 240 180 C 240 215 200 240 200 240 C 200 240 160 215 160 180 Z" stroke-width="2.2" stroke-dasharray="6 4" />
        <ellipse cx="200" cy="190" rx="26" ry="20" stroke-width="1.4" />

        <path d="M 112 282 C 120 280 165 282 175 286 C 165 292 125 292 114 286 Z" stroke-width="1.8" />
        <path d="M 288 282 C 280 280 235 282 225 286 C 235 292 275 292 286 286 Z" stroke-width="1.8" />

        <path d="M 110 295 C 135 293 175 295 190 288 C 195 284 205 284 210 288 C 225 295 265 293 290 295 C 298 315 285 340 265 360 C 255 375 250 410 250 480 L 150 480 C 150 410 145 375 135 360 C 115 340 102 315 110 295 Z" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 188 288 L 195 278 L 200 284 L 205 278 L 212 288" stroke-width="2" />
        <path d="M 185 350 C 200 365 200 375 200 395" stroke-width="1.8" stroke-dasharray="4 3" />

        <path d="M 296 320 C 315 325 325 340 320 360 C 315 375 305 400 300 480" stroke-width="2.2" stroke-linecap="round" />
        <path d="M 296 320 C 290 335 285 350 285 365" stroke-width="1.8" />

        <circle cx="200" cy="280" r="95" stroke-width="1" stroke-dasharray="3 6" opacity="0.6" />
        <circle cx="200" cy="280" r="135" stroke-width="0.8" stroke-dasharray="4 8" opacity="0.4" />
      </g>

      <!-- Clean fade along left edge -->
      <rect x="0" y="0" width="120" height="${H}" fill="url(#leftFade)" />
      <defs>
        <linearGradient id="leftFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F7F8FA" stop-opacity="1" />
          <stop offset="100%" stop-color="#F7F8FA" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  `);

  // 3. Resized authentic cutout of Dr. Harshil from IMG_2501
  const doctorOverlay = await sharp('public/doctor-cutout.png')
    .resize(W, H)
    .toBuffer();

  // 4. Composite: baseImg -> svgBackdrop -> doctorOverlay
  await sharp(baseImg)
    .composite([
      { input: svgBackdrop, top: 0, left: 0, blend: 'over' },
      { input: doctorOverlay, top: 0, left: 0, blend: 'over' }
    ])
    .webp({ quality: 96 })
    .toFile('public/doctor-original-hero.webp');

  console.log('Successfully created doctor-original-hero.webp!');
}

createAuthenticComposite().catch(console.error);
}

createAuthenticComposite().catch(console.error);
