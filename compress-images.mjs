/**
 * Image Compression Script
 * Compresses all PNG/JPEG images in /public to optimized WebP + compressed original
 * Run: node compress-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, 'public');

// Skip these directories and files
const SKIP_DIRS = ['hip-bone-3d-scan', 'shoulder-joint', 'knee-anatomy', 'reponsive igm'];
const SKIP_EXTENSIONS = ['.svg', '.webp', '.xml', '.txt', '.json'];

// Compression settings by image type
const HERO_IMAGES = [
  'doctor-hero-office.png',
  'doctor-hero-studio.png',
  'about.jpg',
  'guides-hero-banner.png',
  'treatments-hero-banner.png',
];

const MAX_SIZE_HERO = 1920;    // max dimension for hero images
const MAX_SIZE_SECTION = 1400; // max dimension for section images
const MAX_SIZE_CARD = 900;     // max dimension for small card images

async function getFiles(dir, depth = 0) {
  if (depth > 3) return [];
  
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (SKIP_DIRS.some(skip => entry.name.includes(skip))) continue;
      const subFiles = await getFiles(fullPath, depth + 1);
      files.push(...subFiles);
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (!SKIP_EXTENSIONS.includes(ext) && ['.jpg', '.jpeg', '.png'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

async function compressImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const name = basename(filePath);
  const dir = dirname(filePath);
  
  try {
    const stats = await stat(filePath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    // Ensure WebP version is always generated even if original is small

    // Determine target max dimension
    const isHero = HERO_IMAGES.includes(name);
    const maxDim = isHero ? MAX_SIZE_HERO : 
                   (stats.size > 500 * 1024 ? MAX_SIZE_SECTION : MAX_SIZE_CARD);

    // Get image metadata
    const meta = await sharp(filePath).metadata();
    
    // Calculate resize dimensions if needed
    const needsResize = meta.width > maxDim || meta.height > maxDim;
    let pipeline = sharp(filePath);
    
    if (needsResize) {
      pipeline = pipeline.resize(maxDim, maxDim, { fit: 'inside', withoutEnlargement: true });
    }

    // Compress to WebP (better compression than JPEG/PNG)
    const webpPath = join(dir, name.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    await pipeline
      .webp({ quality: 82, effort: 4, smartSubsample: true })
      .toFile(webpPath);

    const newStats = await stat(webpPath);
    const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
    const savings = Math.round((1 - newStats.size / stats.size) * 100);
    
    console.log(`  ✅ ${name}`);
    console.log(`     ${sizeMB}MB → ${newSizeMB}MB WebP (${savings}% saved, max dim: ${maxDim}px)`);
    
  } catch (err) {
    console.log(`  ❌ ERROR processing ${name}: ${err.message}`);
  }
}

async function main() {
  console.log('🗜  Image Compression — Dr. Harshil Shah Website\n');
  console.log('Scanning public/ directory...\n');
  
  const files = await getFiles(PUBLIC_DIR);
  console.log(`Found ${files.length} images to process:\n`);
  
  let processed = 0;
  for (const file of files) {
    await compressImage(file);
    processed++;
  }
  
  console.log(`\n✨ Done! Processed ${processed} images.`);
  console.log('💡 WebP files have been created alongside originals.');
  console.log('   Update image references in JSX to use .webp files for maximum savings.');
}

main().catch(console.error);
