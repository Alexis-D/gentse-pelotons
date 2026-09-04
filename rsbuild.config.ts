import fs from 'node:fs';
import path from 'node:path';

import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  html: {
    title: 'Genste Pelotons',
    favicon: './public/favicon.svg',
  },
  plugins: [
    pluginReact(),
    pluginTypeCheck(),
    {
      name: 'duplicate-html-plugin',
      setup(api) {
        api.onAfterBuild(() => {
          const distPath = api.context.distPath;
          const sourceHtml = path.join(distPath, 'index.html');

          if (!fs.existsSync(sourceHtml)) return;

          const targetSubdirs = ['en', 'nl'];

          targetSubdirs.forEach((dir) => {
            const targetDir = path.join(distPath, dir);
            const targetHtml = path.join(targetDir, 'index.html');

            fs.mkdirSync(targetDir, { recursive: true });
            fs.copyFileSync(sourceHtml, targetHtml);
          });

          console.log('✅ Successfully duplicated index.html to /en and /nl');
        });
      },
    },
  ],
  server: {
    // match the github page prefix to avoid issues
    base: '/gentse-pelotons',
  },
  output: {
    copy: [
      {
        from: 'node_modules/maplibre-gl/dist/maplibre-gl-shared.mjs',
        to: 'static/assets/maplibre-gl-shared.mjs',
      },
    ],
  },
  tools: {
    rspack: {
      ignoreWarnings: [
        {
          message:
            /Critical dependency: the request of a dependency is an expression/,
          module: /maplibre-gl.mjs/,
        },
      ],
    },
  },
});
