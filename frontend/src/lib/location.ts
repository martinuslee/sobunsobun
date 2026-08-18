import { dongFromAddress, loadGoogleMaps } from './googleMaps';

export async function resolveCurrentLocation(
  setLocation: (location: string) => void,
  setCoordinates?: (coordinates: { lat: number; lng: number }) => void,
) {
  setLocation('위치 확인 중');

  if (!window.isSecureContext || !navigator.geolocation) {
    setLocation('위치 권한 필요');
    return false;
  }

  return new Promise<boolean>((resolve) => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const coordinates = { lat: coords.latitude, lng: coords.longitude };
      setCoordinates?.(coordinates);
      setLocation('현재 위치');

      try {
        const maps = await loadGoogleMaps();
        const geocoder = new maps.Geocoder();
        const { results } = await geocoder.geocode({
          location: coordinates,
        });
        setLocation(dongFromAddress(results) ?? '현재 위치');
      } catch {
        setLocation('현재 위치');
      }

      resolve(true);
    }, () => {
      setLocation('위치 권한 필요');
      resolve(false);
    }, {
      enableHighAccuracy: true,
      maximumAge: 60000,
      timeout: 10000,
    });
  });
}
