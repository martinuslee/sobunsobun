let mapsPromise: Promise<any> | null = null;
let mapsScriptId = 0;

export const defaultMapCenter = { lat: 37.5008, lng: 127.0369 };

export function loadGoogleMaps() {
  if (typeof window === 'undefined') return Promise.reject(new Error('browser only'));
  if ((window as any).google?.maps) return Promise.resolve((window as any).google.maps);
  if (mapsPromise) return mapsPromise;

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return Promise.reject(new Error('missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'));

  mapsPromise = new Promise((resolve, reject) => {
    const callbackName = `initGoogleMaps${mapsScriptId++}`;
    const fail = (message: string) => {
      mapsPromise = null;
      reject(new Error(message));
    };

    // Google 인증 실패는 script onerror로 잡히지 않아 전역 콜백으로 처리한다.
    (window as any).gm_authFailure = () => fail('google maps auth failed');
    (window as any)[callbackName] = () => {
      const maps = (window as any).google?.maps;
      delete (window as any)[callbackName];
      if (!maps) {
        fail('google maps unavailable');
        return;
      }
      resolve(maps);
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&language=ko&region=KR&v=weekly&callback=${callbackName}`;
    script.async = true;
    script.onerror = () => fail('failed to load Google Maps');
    document.head.appendChild(script);
  });

  return mapsPromise;
}

export function googleMapsErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : '';
  if (message.includes('missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY')) {
    return 'Google Maps API 키가 설정되지 않았습니다. .env 확인 후 dev 서버를 재시작해주세요.';
  }
  if (message.includes('auth failed')) {
    return 'Google Maps API 키 인증에 실패했습니다. 도메인 제한과 Maps JavaScript API 활성화를 확인해주세요.';
  }
  if (message.includes('failed to load')) {
    return 'Google Maps 스크립트를 불러오지 못했습니다. 네트워크 또는 API 키 제한을 확인해주세요.';
  }
  return 'Google Maps 검색에 실패했습니다.';
}

export function dongFromAddress(results: any[]) {
  const parts = results[0]?.address_components ?? [];
  return parts.find((part: any) => part.types.includes('sublocality_level_2'))?.long_name
    ?? parts.find((part: any) => part.types.includes('sublocality_level_1'))?.long_name
    ?? parts.find((part: any) => part.types.includes('administrative_area_level_3'))?.long_name;
}
