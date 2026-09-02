import { Anchor, Badge, type MantineColor } from '@mantine/core';
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

export const Strava = ({ href }: Pick<ISocialProps, 'href'>) => (
  <Social text="Strava" color="orange" href={href} />
);
export const WhatsApp = ({ href }: Pick<ISocialProps, 'href'>) => (
  <Social
    text="WhatsApp"
    color="green"
    href={href}
    icon={<WhatsappLogoIcon />}
  />
);
export const Facebook = ({ href }: Pick<ISocialProps, 'href'>) => (
  <Social
    text="Facebook"
    color="blue"
    href={href}
    icon={<FacebookLogoIcon />}
  />
);
export const Instagram = ({ href }: Pick<ISocialProps, 'href'>) => (
  <Social
    text="Instagram"
    color="pink"
    href={href}
    icon={<InstagramLogoIcon />}
  />
);
export const Website = ({ href }: Pick<ISocialProps, 'href'>) => (
  <Social text="Website" color="cyan" href={href} icon={<GlobeIcon />} />
);
export const Github = ({ href, text }: Pick<ISocialProps, 'href' | 'text'>) => (
  <Social text={text} color="gray" href={href} icon={<GithubLogoIcon />} />
);
export const GPXSocial = ({
  href,
  text,
}: Pick<ISocialProps, 'href' | 'text'>) => (
  <Social text={text} color="gray" href={href} icon={<MapPinIcon />} />
);
