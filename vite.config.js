import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const repositoryBase = '/-Dr.-Harshil-Shah-Orthopaedic-Care-Website/';

function getPublicAssetPaths(directory, root = directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = join(directory, entry.name);

    if (entry.isDirectory()) {
      return getPublicAssetPaths(filePath, root);
    }

    return [`/${relative(root, filePath).replaceAll('\\', '/')}`];
  });
}

function prefixPublicAssetUrls() {
  const publicAssetPaths = getPublicAssetPaths(join(process.cwd(), 'public'));

  return {
    name: 'prefix-public-asset-urls',
    generateBundle(_options, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== 'asset' && output.type !== 'chunk') continue;

        let source = typeof output.source === 'string' ? output.source : output.code;

        for (const assetPath of publicAssetPaths) {
          const escapedPath = assetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          source = source.replace(new RegExp(`(["'])${escapedPath}`, 'g'), `$1${repositoryBase.slice(0, -1)}${assetPath}`);
          source = source.replace(new RegExp(`url\\(${escapedPath}`, 'g'), `url(${repositoryBase.slice(0, -1)}${assetPath}`);
        }

        if (output.type === 'asset') output.source = source;
        else output.code = source;
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : repositoryBase,

  plugins: [react(), prefixPublicAssetUrls()],

  server: {
    port: 3000,
    open: false
  },

  build: {
    // Target modern browsers for smaller output
    target: 'es2020',

    // Warn on chunks > 600 KB
    chunkSizeWarningLimit: 600,

    // Split CSS per chunk for better caching
    cssCodeSplit: true,

    // Rollup manual chunk splitting for optimal caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React ecosystem — small, changes rarely
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom') || id.includes('node_modules/scheduler')) {
            return 'vendor-react';
          }
          // Three.js — large, only used on /treatments page
          if (id.includes('node_modules/three')) {
            return 'vendor-three';
          }
          // EmailJS — only used on /appointment
          if (id.includes('node_modules/@emailjs')) {
            return 'vendor-emailjs';
          }
          // Lucide icons
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
        },
        // Content-hash asset file names for long-term caching
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  },

  // Prevent Vite from pre-bundling three.js (it's lazy-loaded)
  optimizeDeps: {
    exclude: ['three']
  }
}));
