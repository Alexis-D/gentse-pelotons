import {
  Alert,
  Anchor,
  Badge,
  Card,
  Group,
  Highlight,
  Image,
  List,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { ClockIcon, MapPinIcon, WarningIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import React from 'react';
import {
  Facebook,
  GPXSocial,
  Instagram,
  Strava,
  Website,
  WhatsApp,
} from '../socials';

export interface ISimplePeloton {
  name: string;
  thumbnails: ReactNode;
  starts: ReactNode;
  drop?: boolean;
  samenuit?: boolean;
  gpx: ReactNode;
  speed: string;
  needsImprovement?: boolean;

  strava?: string;
  whatsapp?: string;
  fb?: string;
  insta?: string;
  website?: string;
}

export const SimplePeloton = ({
  name,
  thumbnails,
  starts,
  drop = false,
  samenuit = false,
  needsImprovement = false,
  gpx,
  speed,

  strava,
  whatsapp,
  fb,
  insta,
  website,
}: ISimplePeloton) => {
  return (
    <Card>
      {thumbnails}
      <Group justify="space-between" mt="md" mb="xs">
        <Title order={2}>{name}</Title>
      </Group>
      {needsImprovement && (
        <Alert
          variant="light"
          color="orange"
          title="Needs improvement"
          icon={<WarningIcon />}
        >
          This ride hasn't been 100% confirmed or we don't have an authoritative
          sources for details atm (e.g. GPX). This ride may not actually exist.
        </Alert>
      )}
      {starts}
      <Group gap={5}>
        Indicative speed:{' '}
        <Text span fw={800}>
          {speed}
        </Text>{' '}
        <Text span fs="italic">
          (this varies depending on attendance, weather, etc)
        </Text>
      </Group>
      <Space h="xs" />
      <Group>
        <Strava href={strava} />
        <WhatsApp href={whatsapp} />
        <Facebook href={fb} />
        <Instagram href={insta} />
        <Website href={website} />
        {gpx}
      </Group>
      {drop && (
        <>
          <Space h="xs" />
          <Text size="xs" fs="italic">
            This is a drop ride: you can join anywhere, and no-one will wait if
            you get a mechanical/etc.
          </Text>
        </>
      )}
      {samenuit && (
        <>
          <Space h="xs" />
          <Highlight highlight="Samen uit, samen thuis" fs="italic" size="xs">
            Samen uit, samen thuis: this is a no-drop ride, we wait for each
            other.
          </Highlight>
        </>
      )}
    </Card>
  );
};

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

interface IStartsProps {
  children: ReactNode;
}

export const Starts = ({ children }: IStartsProps) =>
  React.Children.count(children) === 1 ? (
    children
  ) : (
    <List>
      {React.Children.map(children, (child) => (
        <List.Item>{child}</List.Item>
      ))}
    </List>
  );

interface IStartProps {
  time: string;
  location: string;
  locationhref: string;
  extra?: string;
}

export const Start = ({ time, location, locationhref, extra }: IStartProps) => (
  <Group gap={4} align="center">
    {extra && (
      <Text span fw={800}>
        {extra}
      </Text>
    )}
    <ClockIcon />
    <Text span fw={800}>
      {time} <Anchor href={locationhref}>{location}</Anchor>
    </Text>
  </Group>
);

interface IGPXProps {
  href?: string;
  text: string;
}

export const GPX = ({ href, text }: IGPXProps) =>
  href !== undefined ? (
    <GPXSocial href={href} text={text} />
  ) : (
    <Badge color="gray" variant="outline" leftSection={<MapPinIcon />}>
      {text}
    </Badge>
  );
