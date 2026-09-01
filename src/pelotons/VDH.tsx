import {
  GPX,
  SimplePeloton,
  Start,
  Starts,
  Thumbnail,
  Thumbnails,
} from './SimplePeloton';

const SAFTI = 'https://maps.app.goo.gl/iBCAvPxkjpd79PA87';
const MELLE_KERK = 'https://maps.app.goo.gl/n1mt3BqjMEsUDVaj6';

export const VDH = () => (
  <SimplePeloton
    name="VDH Boys aka Woensdag Toerdag"
    thumbnails={
      <Thumbnails>
        <Thumbnail src="/vdh-safti.png" href={SAFTI} />
        <Thumbnail src="/vdh-logo.jpg" href="https://wtctonneke.be/gpx-wtd/" />
        <Thumbnail src="/vdh-melle.png" href={MELLE_KERK} />
      </Thumbnails>
    }
    starts={
      <Starts>
        <Start time="6:30PM" location="Safti Parking" locationhref={SAFTI} />
        <Start time="7PM" location="Kerk Melle" locationhref={MELLE_KERK} />
      </Starts>
    }
    gpx={
      <GPX
        text="GPX (changes summer/winter, see WTC Tonneke)"
        href="https://wtctonneke.be/gpx-wtd/"
      />
    }
    website="https://wtctonneke.be/gpx-wtd/"
    fb="https://www.facebook.com/groups/woensdagtoerdag/"
    drop
    speed="35+kph"
  />
);
