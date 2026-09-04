import { MapMarkersThumbnail, MapThumbnail } from '../ui/maps';
import { Thumbnails } from '../ui/Thumbnails';
import { getAssetUrl } from '../utils';
import {
  GPX,
  type ISimplePeloton,
  SimplePeloton,
  Start,
  Starts,
} from './SimplePeloton';

const SP_START = 'https://maps.app.goo.gl/tXo88zK39Fz3JzoX7';
const SP_WW_START = 'https://maps.app.goo.gl/ckNdpvgCKH7cAtgi6';

const ScheldePeloton = (
  props: Pick<
    ISimplePeloton,
    'starts' | 'gpx' | 'thumbnails' | 'needsImprovement' | 'extraDetails'
  >,
) => (
  <SimplePeloton
    name="Scheldepeloton aka SP"
    drop
    speed="35+kph"
    fb="https://www.facebook.com/groups/548325031851145/"
    strava="https://www.strava.com/clubs/1845"
    {...props}
  />
);

export const ScheldePelotonWeekdays = () => (
  <ScheldePeloton
    thumbnails={
      <Thumbnails>
        {/* lat/lon = Gavere, not Zwijnaarde */}
        <MapThumbnail
          gpx={getAssetUrl('sp.gpx')}
          lat={50.9299510444054}
          lon={3.6525768763541384}
          href={SP_START}
          label="Zwijnaarde bridge"
        />
      </Thumbnails>
    }
    starts={
      <Starts>
        <Start
          time="9AM"
          location="Under the Zwijnaarde bridge"
          locationhref={SP_START}
        />
      </Starts>
    }
    gpx={<GPX text="GPX" href={getAssetUrl('sp.gpx')} />}
    extraDetails={`From Zwijnaarde down to Eine and back to Zwijnaarde.
      Usually 2x (ca. 80km). You might be (almost) alone in Zwijnaarde but by the time you
      get to Eine the peloton will have likely grown to 50+ people (in the summer, way fewer in the winter)`}
  />
);

export const ScheldePelotonWednesday = () => (
  <ScheldePeloton
    thumbnails={
      <Thumbnails>
        <MapMarkersThumbnail
          markers={[
            {
              lat: 50.986505,
              lon: 3.717936,
              label: 'Wouter Weylandt monument',
              href: SP_WW_START,
            },
          ]}
        />
      </Thumbnails>
    }
    starts={
      <Starts>
        <Start
          time="6:30PM"
          location="Wouter Weylandt monument"
          locationhref={SP_WW_START}
          extra="Summer only"
        />
      </Starts>
    }
    gpx={<GPX text="GPX unavailable" />}
    needsImprovement
  />
);

export const ScheldePelotonWeekend = () => (
  <ScheldePeloton
    thumbnails={
      <Thumbnails>
        {/* lat/lon = Gavere, not Zwijnaarde */}
        <MapMarkersThumbnail
          markers={[
            {
              lat: 51.002026,
              lon: 3.724045,
              href: SP_START,
              label: 'Zwijnaarde bridge',
            },
          ]}
        />
      </Thumbnails>
    }
    starts={
      <Starts>
        <Start
          time="9:15AM"
          location="Under the Zwijnaarde bridge"
          locationhref={SP_START}
        />
      </Starts>
    }
    gpx={<GPX text="GPX unavailable" />}
    needsImprovement
  />
);
