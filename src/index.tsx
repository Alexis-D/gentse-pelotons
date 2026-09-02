import { createTheme, MantineProvider } from '@mantine/core';
import { addProtocol, setWorkerUrl } from 'maplibre-gl';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'maplibre-gl/dist/maplibre-gl.css';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 7, // a week
    },
  },
});
const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </PersistQueryClientProvider>
    </React.StrictMode>,
  );
}
