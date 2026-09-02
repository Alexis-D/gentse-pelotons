import { createTheme, MantineProvider } from '@mantine/core';
import { addProtocol, setWorkerUrl } from 'maplibre-gl';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Protocol } from 'pmtiles';

// 1. Initialize the PMTiles protocol handler
const protocol = new Protocol();
addProtocol('pmtiles', protocol.tile);

setWorkerUrl(
  new URL(
    'maplibre-gl/dist/maplibre-gl-worker.mjs',
    import.meta.url,
  ).toString(),
);
const theme = createTheme({});

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </React.StrictMode>,
  );
}
