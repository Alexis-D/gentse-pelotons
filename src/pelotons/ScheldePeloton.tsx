import {
  GPX,
  type ISimplePeloton,
  SimplePeloton,
  Start,
  Starts,
  Thumbnail,
  Thumbnails,
} from './SimplePeloton';

const SP_START = 'https://maps.app.goo.gl/tXo88zK39Fz3JzoX7';
const SP_WW_START = 'https://maps.app.goo.gl/ckNdpvgCKH7cAtgi6';

const ScheldePeloton = ({
  starts,
  gpx,
  thumbnails,
  needsImprovement,
}: Pick<
  ISimplePeloton,
  'starts' | 'gpx' | 'thumbnails' | 'needsImprovement'
>) => (
  <SimplePeloton
    name="Scheldepeloton aka SP"
    thumbnails={thumbnails}
    starts={starts}
    gpx={gpx}
    drop
    speed="35+kph"
    fb="https://www.facebook.com/groups/548325031851145/"
    strava="https://www.strava.com/clubs/1845"
    needsImprovement={needsImprovement}
  />
);

export const ScheldePelotonWeekdays = () => (
  <ScheldePeloton
    thumbnails={
      <Thumbnails>
        <Thumbnail src="sp.png" href={SP_START} />
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
    gpx={<GPX text="GPX" href="sp.gpx" />}
  />
);

export const ScheldePelotonWednesday = () => (
  <ScheldePeloton
    thumbnails={
      <Thumbnails>
        <Thumbnail src="sp-ww.png" href={SP_WW_START} />
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
    gpx={<GPX text="Route needs to be confirmed / unavailable." />}
    needsImprovement
  />
);

export const ScheldePelotonWeekend = () => (
  <ScheldePeloton
    thumbnails={
      <Thumbnails>
        <Thumbnail src="sp.png" href={SP_START} />
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
    gpx={<GPX text="Route needs to be confirmed / unavailable." />}
    needsImprovement
  />
);
