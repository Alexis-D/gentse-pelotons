import {
  Alert,
  Anchor,
  Badge,
  Card,
  Group,
  Highlight,
  List,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { ClockIcon, MapPinIcon, WarningIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Facebook,
  GPXSocial,
  Instagram,
  Strava,
  Website,
  WhatsApp,
} from '../ui/socials';

export interface ISimplePeloton {
  name: string;
  thumbnails: ReactNode;
  starts: ReactNode;
  drop?: boolean;
  samenuit?: boolean;
  gpx: ReactNode;
  speed: string;
  needsImprovement?: boolean;
  extraDetails?: string;

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
  extraDetails,

  strava,
  whatsapp,
  fb,
  insta,
  website,
}: ISimplePeloton) => {
  const { t } = useTranslation();

  return (
    <Card shadow="xl" withBorder mb="1rem" pt={0}>
      {thumbnails}
      <Title order={2} mt="md" mb="xs">
        {name}
      </Title>
      {needsImprovement && (
        <Alert
          variant="light"
          color="orange"
          title="Needs improvement"
          p="xs"
          icon={<WarningIcon />}
        >
          This ride hasn't been 100% confirmed or we don't have an authoritative
          sources for details atm (e.g. GPX). This ride may not actually exist.
        </Alert>
      )}
      {starts}
      <Text size="sm">
        {t('speed')}:{' '}
        <Text span fw={800}>
          {speed}{' '}
        </Text>
        <Text span fs="italic">
          ({t('speed-disclaimer')})
        </Text>
      </Text>
      {extraDetails && <Text size="sm">{extraDetails}</Text>}
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
            {t('drop')}
          </Text>
        </>
      )}
      {samenuit && (
        <>
          <Space h="xs" />
          <Highlight highlight="Samen uit, samen thuis" fs="italic" size="xs">
            {t('samenuit')}
          </Highlight>
        </>
      )}
    </Card>
  );
};

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
