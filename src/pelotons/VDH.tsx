import { MapMarkersThumbnail } from '../ui/maps';
import { Thumbnail, Thumbnails } from '../ui/Thumbnails';
import { GPX, SimplePeloton, Start, Starts } from './SimplePeloton';

const SAFTI = 'https://maps.app.goo.gl/iBCAvPxkjpd79PA87';
const MELLE_KERK = 'https://maps.app.goo.gl/n1mt3BqjMEsUDVaj6';

export const VDH = () => (
  <SimplePeloton
    name="VDH Boys aka Woensdag Toerdag"
    thumbnails={
      <Thumbnails>
        <MapMarkersThumbnail
          markers={[
            {
              lat: 50.9946424715288,
              lon: 3.8773670512136453,
              label: 'Safti parking',
              href: SAFTI,
            },
            {
              lat: 51.004656599108785,
              lon: 3.802856144580596,
              label: 'Kerk Melle',
              href: MELLE_KERK,
            },
          ]}
        />
        <Thumbnail src="vdh-logo.jpg" href="https://wtctonneke.be/gpx-wtd/" />
      </Thumbnails>
    }
    starts={
      <Starts>
        <Start time="6:30PM" location="Safti Parking" locationhref={SAFTI} />
        <Start time="7PM" location="Kerk Melle" locationhref={MELLE_KERK} />
      </Starts>
    }
    gpx={
      <GPX text="GPX (see WTC Tonneke)" href="https://wtctonneke.be/gpx-wtd/" />
    }
    website="https://wtctonneke.be/gpx-wtd/"
    fb="https://www.facebook.com/groups/woensdagtoerdag/"
    drop
    speed="35+kph"
    extraDetails="While a drop ride, the group stops at the top of the Balei."
  />
);
