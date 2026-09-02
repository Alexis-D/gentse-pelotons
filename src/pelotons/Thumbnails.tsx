import { Anchor, Card, Group, Image } from '@mantine/core';
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { type ReactNode, useEffect, useState } from 'react';

interface IThumbnailsProps {
  children: ReactNode;
}

export const Thumbnails = ({ children }: IThumbnailsProps) =>
  children && (
    <Card.Section>
      <Group gap={0} wrap="nowrap">
        {children}
      </Group>
    </Card.Section>
  );

interface IThumbnailProps {
  src: string;
  href: string;
}

export const Thumbnail = ({ src, href }: IThumbnailProps) => (
  <a href={href} style={{ display: 'block', width: '100%' }}>
    <Image src={src} height={160} />
  </a>
);

interface IMapThumbnailProps {
  geojson: string;
  lat: number;
  lon: number;
}

export const MapThumbnail = ({ geojson, lat, lon }: IMapThumbnailProps) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch(geojson)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setGeoJsonData(data))
      .catch((error) => console.error('Error fetching GeoJSON:', error));
  }, [geojson]);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={9}
      style={{ height: '160px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {geoJsonData && (
        <GeoJSON
          key={JSON.stringify(geoJsonData)}
          data={geoJsonData}
          style={{ color: '#3388ff', weight: 2, fillOpacity: 0.2 }}
        />
      )}
    </MapContainer>
  );
};

interface ILatLon {
  lat: number;
  lon: number;
  label: string;
  url: string;
}

interface IMapMarkersThumbnailProps {
  markers: ILatLon[];
}

export const MapMarkersThumbnail = ({ markers }: IMapMarkersThumbnailProps) => {
  const sortedLat = markers.map((m) => m.lat).sort();
  const sortedLon = markers.map((m) => m.lon).sort();

  const centerLat = (sortedLat[0] + sortedLat[sortedLat.length - 1]) / 2;
  const centerLon = (sortedLon[0] + sortedLon[sortedLon.length - 1]) / 2;

  return null;
  return (
    <div key={`${Math.random()}`}>
      <MapContainer
        center={[centerLat, centerLon]}
        zoom={9}
        style={{ height: '160px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((m) => (
          <Marker key={m.label} position={{ lat: m.lat, lng: m.lon }}>
            <Popup>
              <Anchor href={m.url}>{m.label}</Anchor>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
