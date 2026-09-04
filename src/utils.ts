export const getBelgiumDay = () =>
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Brussels',
    weekday: 'long',
  }).format(new Date());

// we might want to load assets from /, or /en/ or /nl/
// this allows us to get consistent URLs from the root
export const getAssetUrl = (asset: string) =>
  `${import.meta.env.BASE_URL}/${asset}`;
