import { Card, Group, Image } from '@mantine/core';
import type { ReactNode } from 'react';

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
