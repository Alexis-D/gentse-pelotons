import { useTranslation } from 'react-i18next';
import { MapMarkersThumbnail } from '../ui/maps';
import { Thumbnail, Thumbnails } from '../ui/Thumbnails';
import { getAssetUrl } from '../utils';
import {
  GPX,
  type ISimplePeloton,
  SimplePeloton,
  Start,
  Starts,
} from './SimplePeloton';

const CLUB9000_START = 'https://maps.app.goo.gl/MFcTCUEPmeGj15Gy7';

const Club9000 = (props: Pick<ISimplePeloton, 'starts' | 'gpx' | 'speed'>) => (
  <SimplePeloton
    name="Club 9000 / Kaffee Allez"
    thumbnails={
      <Thumbnails>
        <MapMarkersThumbnail
          markers={[
            {
              lat: 51.056612329213124,
              lon: 3.7325569711639286,
              label: 'Kaffee Allez',
              href: CLUB9000_START,
            },
          ]}
        />
        <Thumbnail
          src={getAssetUrl('club9000-logo.webp')}
          href="https://www.club9000.be/"
        />
      </Thumbnails>
    }
    strava="https://www.strava.com/clubs/club9000"
    whatsapp="https://chat.whatsapp.com/DbfyZg4EjyVLOECNyf478r"
    insta="https://www.instagram.com/club.9000/"
    website="https://www.club9000.be/"
    samenuit
    {...props}
  />
);

export const Club9000Wednesday = () => (
  <Club9000
    starts={
      <Starts>
        <Start
          time="6:30AM"
          location="Kaffee Allez"
          locationhref={CLUB9000_START}
        />
      </Starts>
    }
    gpx={
      <GPX
        text="GPX"
        href="https://www.strava.com/routes/3499293834460423190"
      />
    }
    speed="~30kph"
  />
);

export const Club9000Thursday = () => {
  const { t } = useTranslation();

  return (
    <Club9000
      starts={
        <Starts>
          <Start
            time="7PM"
            location="Kaffee Allez"
            locationhref={CLUB9000_START}
          />
        </Starts>
      }
      gpx={<GPX text={t('check-strava')} />}
      speed={`27-35+kph, ${t('various-groups')}`}
    />
  );
};

export const Club9000Saturday = () => {
  const { t } = useTranslation();

  return (
    <Club9000
      starts={
        <Starts>
          <Start
            time="9AM"
            location="Kaffee Allez"
            locationhref={CLUB9000_START}
            extra="Summer"
          />
          <Start
            time="10AM"
            location="Kaffee Allez"
            locationhref={CLUB9000_START}
            extra="Winter"
          />
        </Starts>
      }
      gpx={<GPX text="Check the Strava events" />}
      speed={`27-32+kph, ${t('various-groups')}`}
    />
  );
};
