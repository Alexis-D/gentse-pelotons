import {
  ActionIcon,
  Alert,
  Anchor,
  LoadingOverlay,
  Popover,
} from '@mantine/core';
import { MapPinIcon } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { gpx as toGpx } from '@tmcw/togeojson';
import {
  Layer,
  Map as MapLibreMap,
  Marker,
  Source,
} from 'react-map-gl/maplibre';

interface IMarkerWithPopoverLinkProps {
  lat: number;
  lon: number;
  label: string;
  href: string;
}

const MarkerWithPopoverLink = ({
  lat,
  lon,
  label,
  href,
}: IMarkerWithPopoverLinkProps) => (
  <Marker latitude={lat} longitude={lon}>
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <ActionIcon variant="filled" color="lime">
          <MapPinIcon />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Anchor href={href}>{label}</Anchor>
      </Popover.Dropdown>
    </Popover>
  </Marker>
);

interface IMapThumbnailProps {
  gpx: string;
  lat: number;
  lon: number;
  label: string;
  href: string;
}

export const MapThumbnail = ({
  gpx,
  lat,
  lon,
  label,
  href,
}: IMapThumbnailProps) => {
  const {
    data: geoJsonData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['v0', 'gpx', gpx],
    queryFn: async () =>
      fetch(gpx)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then((data) => new DOMParser().parseFromString(data, 'text/xml'))
        .then((data) => toGpx(data)),
    staleTime: 1000 * 60 * 60 * 24 * 7, // a week
  });

  const firstFeatureGeometry = geoJsonData?.features[0].geometry;

  if (error) {
    return (
      <Alert color="red" h="160px" w="100%" title="Failed to load GPX">
        Failed to load {gpx} / map cannot be rendered.
      </Alert>
    );
  }
  const firstPoint =
    firstFeatureGeometry?.type === 'LineString'
      ? firstFeatureGeometry.coordinates[0]
      : null;

  return (
    <MapLibreMap
      initialViewState={{
        latitude: lat,
        longitude: lon,
        zoom: 8,
      }}
      style={{ width: '100%', height: 160 }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
      attributionControl={false}
    >
      <LoadingOverlay visible={isLoading} />
      {geoJsonData && (
        <Source type="geojson" data={geoJsonData}>
          <Layer
            id="outline-layer"
            type="line"
            paint={{
              'line-color': 'hotpink',
              'line-width': 6,
              'line-opacity': 1,
            }}
          />
        </Source>
      )}
      {firstPoint && (
        <MarkerWithPopoverLink
          lat={firstPoint[1]}
          lon={firstPoint[0]}
          href={href}
          label={label}
        />
      )}
    </MapLibreMap>
  );
};

interface IMapMarkersThumbnailProps {
  markers: IMarkerWithPopoverLinkProps[];
}

export const MapMarkersThumbnail = ({ markers }: IMapMarkersThumbnailProps) => {
  if (!markers) {
    return null;
  }

  const sortedLat = markers.map((m) => m.lat).sort();
  const sortedLon = markers.map((m) => m.lon).sort();

  const centerLat = (sortedLat[0] + sortedLat[sortedLat.length - 1]) / 2;
  const centerLon = (sortedLon[0] + sortedLon[sortedLon.length - 1]) / 2;

  return (
    <MapLibreMap
      initialViewState={{
        latitude: centerLat,
        longitude: centerLon,
        zoom: 10,
      }}
      style={{ width: '100%', height: 160 }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
      attributionControl={false}
    >
      {markers.map((m) => (
        <MarkerWithPopoverLink key={m.label} {...m} />
      ))}
    </MapLibreMap>
  );
};
