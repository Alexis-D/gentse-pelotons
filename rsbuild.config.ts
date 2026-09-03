import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  html: {
    title: 'Genste Pelotons',
    favicon: './public/favicon.svg',
  },
  plugins: [pluginReact(), pluginTypeCheck()],
  output: {
    // 🛠️ Forces relative path handling
    assetPrefix: './',
    copy: [
      {
        from: 'node_modules/maplibre-gl/dist/maplibre-gl-shared.mjs',
        to: 'static/assets/maplibre-gl-shared.mjs',
      },
    ],
  },
});
