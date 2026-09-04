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

// map init
const protocol = new Protocol();
addProtocol('pmtiles', protocol.tile);

setWorkerUrl(
  new URL(
    'maplibre-gl/dist/maplibre-gl-worker.mjs',
    import.meta.url,
  ).toString(),
);

// mantine init
const theme = createTheme({});

// react query init
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

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

const WithDevtools = () => {
  return (
    process.env.NODE_ENV === 'development' && <ReactQueryDevtoolsProduction />
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister,
        }}
      >
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
        <WithDevtools />
      </PersistQueryClientProvider>
    </React.StrictMode>,
  );
}
