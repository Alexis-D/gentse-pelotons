import { GPX, SimplePeloton, Start, Starts } from './SimplePeloton';
import { MapThumbnail, Thumbnail, Thumbnails } from './Thumbnails';

const VP_START = 'https://maps.app.goo.gl/aVgTHNEhphtysEV38';

export const VPeloton = () => (
  <SimplePeloton
    name="VP aka Vinderhoute Peloton"
    thumbnails={
      <Thumbnails>
        {/* lat/lon = Nevele, not Bierstalbrug */}
        <MapThumbnail
          gpx="vp.gpx"
          lat={51.03243491123266}
          lon={3.5513476908204686}
          label="Bierstalbrug"
          href={VP_START}
        />
        <Thumbnail src="bierstalbrug.jpg" href={VP_START} />
      </Thumbnails>
    }
    starts={
      <Starts>
        <Start
          time="9AM"
          location="Under the Bierstalbrug bridge"
          locationhref={VP_START}
        />
      </Starts>
    }
    gpx={<GPX text="GPX" href="vp.gpx" />}
    drop
    speed="35+kph"
    extraDetails="ca. 50km. Just like the Scheldepeloton, grows organically until the midpoint."
  />
);
