const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export const calculateDistance = (
  eventLocation: {lat: number; lng: number},
  userLocation: {lat: number; lng: number},
): string => {
  const earthRadiusKm = 6371;

  const dLat = toRadians(eventLocation.lat - userLocation.lat);
  const dLng = toRadians(eventLocation.lng - userLocation.lng);

  const lat1 = toRadians(userLocation.lat);
  const lat2 = toRadians(eventLocation.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;
  return distance.toFixed(2);
};
