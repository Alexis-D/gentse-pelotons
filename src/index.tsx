import {
  Box,
  Button,
  Collapse,
  createTheme,
  Group,
  MantineProvider,
} from '@mantine/core';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapContainer, TileLayer } from 'react-leaflet';
import App from './App';
import 'leaflet/dist/leaflet.css';
import { useDisclosure } from '@mantine/hooks';

// Delete the broken internal fallback method Leaflet uses
delete L.Icon.Default.prototype._getIconUrl;
// Re-assign the correct asset URLs processed by Rsbuild
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const theme = createTheme({});

const Test = () => {
  const [expanded, { toggle }] = useDisclosure(false);
  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Button onClick={toggle}>Toggle content</Button>
      </Group>
      <Collapse expanded={expanded}>
        <div key={`${Math.random()}`}>
          <MapContainer
            center={[51, 3]}
            zoom={9}
            style={{ height: '160px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      </Collapse>
    </Box>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <MantineProvider theme={theme}>
        {/* <Test /> */}
        <App />
      </MantineProvider>
    </React.StrictMode>,
  );
}
