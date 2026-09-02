import { Badge, type MantineColor } from '@mantine/core';
import {
  FacebookLogoIcon,
  GithubLogoIcon,
  GlobeIcon,
  InstagramLogoIcon,
  MapPinIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import styles from './socials.module.css';

interface ISocialProps {
  href?: string;
  text: string;
  color: MantineColor;
  icon?: ReactNode;
}

const Social = ({ href, text, color, icon }: ISocialProps) =>
  href && (
    <Badge
      component="a"
      href={href}
      color={color}
      className={styles.pointer}
      leftSection={icon}
    >
      {text}
    </Badge>
  );

export const Strava = (props: Pick<ISocialProps, 'href'>) => (
  <Social text="Strava" color="orange" {...props} />
);
export const WhatsApp = (props: Pick<ISocialProps, 'href'>) => (
  <Social
    text="WhatsApp"
    color="green"
    icon={<WhatsappLogoIcon />}
    {...props}
  />
);
export const Facebook = (props: Pick<ISocialProps, 'href'>) => (
  <Social text="Facebook" color="blue" icon={<FacebookLogoIcon />} {...props} />
);
export const Instagram = (props: Pick<ISocialProps, 'href'>) => (
  <Social
    text="Instagram"
    color="pink"
    icon={<InstagramLogoIcon />}
    {...props}
  />
);
export const Website = (props: Pick<ISocialProps, 'href'>) => (
  <Social text="Website" color="cyan" icon={<GlobeIcon />} {...props} />
);
export const Github = (props: Pick<ISocialProps, 'href' | 'text'>) => (
  <Social color="gray" icon={<GithubLogoIcon />} {...props} />
);
export const GPXSocial = (props: Pick<ISocialProps, 'href' | 'text'>) => (
  <Social color="gray" icon={<MapPinIcon />} {...props} />
);
