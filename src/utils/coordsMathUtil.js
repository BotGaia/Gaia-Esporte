module.exports = {
    haversine: (lat, lng) => {
      const EARTH_RADIUS = 6371;
  
      const haversineA = Math.sin((lat[1] - lat[0]) / 2) * Math.sin((lat[1] - lat[0]) / 2)
      + Math.cos(lat[0]) * Math.cos(lat[1]) * Math.sin((lng[1] - lng[0]) / 2)
      * Math.sin((lng[1] - lng[0]) / 2);
      const haversineB = 2 * Math.atan2(Math.sqrt(haversineA), Math.sqrt(1 - haversineA));
  
      return EARTH_RADIUS * haversineB;
    },
  
    toRadians: num => num * (Math.PI / 180),
  };
  