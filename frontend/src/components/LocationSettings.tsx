import React, { useEffect, useRef, useState } from 'react';
import { ScreenType } from '@/types';
import { BottomNav } from './BottomNav';
import { defaultMapCenter, googleMapsErrorMessage, loadGoogleMaps } from '@/lib/googleMaps';

interface LocationSettingsProps {
  currentLocation: string;
  currentCoordinates: { lat: number; lng: number } | null;
  onUseCurrentLocation: () => Promise<boolean>;
  onNavigate: (screen: ScreenType) => void;
}

export const LocationSettings: React.FC<LocationSettingsProps> = ({
  currentLocation,
  currentCoordinates,
  onUseCurrentLocation,
  onNavigate,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState<number>(1.5);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [mapError, setMapError] = useState('');
  const radiusLabel = radius === 0.5 ? '500m' : `${radius}km`;
  const radiusPercent = ((radius - 0.5) / (3 - 0.5)) * 100;
  const radiusMeters = radius * 1000;
  const mapCenter = currentCoordinates ?? defaultMapCenter;

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps()
      .then((maps) => {
        if (cancelled || !mapRef.current) return;

        const map = new maps.Map(mapRef.current, {
          center: mapCenter,
          zoom: radius >= 3 ? 13 : radius <= 0.5 ? 15 : 14,
          disableDefaultUI: true,
          zoomControl: true,
        });

        new maps.Marker({
          map,
          position: mapCenter,
          title: currentLocation,
        });

        new maps.Circle({
          map,
          center: mapCenter,
          radius: radiusMeters,
          strokeColor: '#316b00',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#7ec151',
          fillOpacity: 0.18,
        });
      })
      .catch((error) => setMapError(googleMapsErrorMessage(error)));

    return () => {
      cancelled = true;
    };
  }, [currentLocation, mapCenter, radiusMeters, radius]);

  const handleVerifyGPS = async () => {
    setIsVerifying(true);
    const ok = await onUseCurrentLocation();
    setIsVerifying(false);

    if (ok) {
      setVerifiedSuccess(true);
      setTimeout(() => setVerifiedSuccess(false), 3000);
    }
  };

  return (
    <div id="screen-location-setting" className="min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col pb-24">
      <header className="bg-[#f7fbed] border-b border-[#e0e4d7] sticky top-0 z-30 flex items-center justify-between px-4 py-3 shadow-xs">
        <button
          id="btn-location-back"
          type="button"
          aria-label="Go back"
          onClick={() => onNavigate('home')}
          className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer text-[#191d15] flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        <h1 className="text-[17px] font-bold text-[#191d15]">내 동네 설정</h1>

        <div className="w-10"></div>
      </header>
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4 flex flex-col gap-4">
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#316b00] text-[24px]">my_location</span>
              <div>
                <h2 className="text-[16px] font-bold text-[#191d15]">현재 위치 동네 인증</h2>
                <p className="text-[12px] text-[#727a69]">현재 위치: {currentLocation}</p>
              </div>
            </div>

            <span className="text-[11px] font-bold bg-[#c6ee6b] text-[#506c00] px-2.5 py-1 rounded-full">
              인증 완료
            </span>
          </div>

          <button
            type="button"
            onClick={handleVerifyGPS}
            disabled={isVerifying}
            className="w-full bg-[#f2f5e8] hover:bg-[#e6eadc] text-[#316b00] border border-[#c1c9b6] font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-[20px] ${isVerifying ? 'animate-spin' : ''}`}>
              {isVerifying ? 'sync' : 'gps_fixed'}
            </span>
            <span>{isVerifying ? 'GPS 위치 확인 중...' : '현재 위치로 동네 재인증'}</span>
          </button>

          {verifiedSuccess && (
            <div className="mt-2 p-2.5 bg-[#e6eadc] text-[#235100] text-[13px] font-semibold rounded-lg flex items-center gap-1.5 animate-in fade-in">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              현재 위치({currentLocation}) 인증이 성공적으로 완료되었습니다!
            </div>
          )}
        </div>

        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-[15px] font-bold text-[#191d15] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">radar</span>
              소분 탐색 반경 설정
            </h2>
            <span className="text-[14px] font-extrabold text-[#316b00]">{radiusLabel}</span>
          </div>

          <p className="text-[12px] text-[#727a69] mb-4">
            설정한 반경 내의 이웃들의 공동구매 소분 글만 표시됩니다.
          </p>

          <div className="relative h-64 bg-[#e6eadc] rounded-xl overflow-hidden mb-4 border border-[#c1c9b6]/60">
            <div ref={mapRef} className="absolute inset-0" />
            {mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#e2ecda] text-[#506c00] text-[13px] font-bold">
                {mapError}
              </div>
            )}
            <div className="absolute left-3 right-3 bottom-3 z-10 bg-white/90 backdrop-blur-xs border border-[#e0e4d7] px-3 py-2 rounded-xl shadow-sm flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="block text-[11px] font-semibold text-[#727a69]">현재 위치 기준</span>
                <span className="block text-[13px] font-bold text-[#191d15] truncate">
                  {currentCoordinates ? currentLocation : '현재 위치 확인 전'}
                </span>
              </div>
              <span className="shrink-0 text-[13px] font-extrabold text-[#316b00] bg-[#c6ee6b] px-2.5 py-1 rounded-full">
                반경 {radiusLabel}
              </span>
            </div>
          </div>

          <div className="px-3">
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-[#316b00] cursor-pointer"
              aria-label="소분 탐색 반경"
            />
            <div className="relative h-6 text-[11px] font-bold text-[#316b00]">
              <span
                className="absolute top-1 -translate-x-1/2 whitespace-nowrap"
                style={{ left: `${radiusPercent}%` }}
              >
                {radiusLabel}
              </span>
            </div>
          </div>
        </div>
      </main>
      <BottomNav currentScreen="location_setting" onNavigate={onNavigate} />
    </div>
  );
};
