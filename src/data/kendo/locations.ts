const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  서울: { lat: 37.5665, lng: 126.978 },
  대전: { lat: 36.3504, lng: 127.3845 },
  부산: { lat: 35.1796, lng: 129.0756 },
  구미: { lat: 36.1195, lng: 128.3446 },
  인천: { lat: 37.4563, lng: 126.7052 },
};

const toRadians = (value: number) => (value * Math.PI) / 180;

export const calculateDistanceKm = (locationA: string, locationB: string): number => {
  const pointA = locationCoordinates[locationA];
  const pointB = locationCoordinates[locationB];

  if (!pointA || !pointB) {
    return Number.POSITIVE_INFINITY;
  }

  const R = 6371;
  const dLat = toRadians(pointB.lat - pointA.lat);
  const dLon = toRadians(pointB.lng - pointA.lng);
  const lat1 = toRadians(pointA.lat);
  const lat2 = toRadians(pointB.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const getLocationCoordinates = (location: string) => locationCoordinates[location];
