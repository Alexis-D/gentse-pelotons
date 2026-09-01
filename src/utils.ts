export const getBelgiumDay = () =>
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Brussels',
    weekday: 'long',
  }).format(new Date());
