import React, { useState } from 'react';
import { ScreenType } from '../types';
import { BottomNav } from '../components/BottomNav';

interface LocationScreenProps {
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const LocationScreen: React.FC<LocationScreenProps> = ({
  currentLocation,
  onSelectLocation,
  onNavigate,
}) => {
  const [radius, setRadius] = useState<number>(1.5);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const availableNeighborhoods = [
    { name: '역삼동', isCurrent: true, distance: '내 위치' },
    { name: '도곡동', isCurrent: false, distance: '800m' },
    { name: '대치동', isCurrent: false, distance: '1.4km' },
    { name: '삼성동', isCurrent: false, distance: '1.8km' },
    { name: '양재동', isCurrent: false, distance: '2.1km' },
    { name: '논현동', isCurrent: false, distance: '1.2km' }
  ];

  const handleVerifyGPS = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      setTimeout(() => setVerifiedSuccess(false), 3000);
    }, 1200);
  };

  const handleSelectDong = (dong: string) => {
    onSelectLocation(dong);
    onNavigate('home');
  };

  return (
    <div id="screen-location-setting" className="min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col pb-24">
      {/* Top Header */}
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

      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4 flex flex-col gap-4">
        {/* GPS Verification Banner */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#316b00] text-[24px]">my_location</span>
              <div>
                <h2 className="text-[16px] font-bold text-[#191d15]">현재 위치 동네 인증</h2>
                <p className="text-[12px] text-[#727a69]">현재 위치: 서울특별시 강남구 {currentLocation}</p>
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

        {/* Neighborhood Radius Slider */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-[15px] font-bold text-[#191d15] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">radar</span>
              소분 탐색 반경 설정
            </h2>
            <span className="text-[14px] font-extrabold text-[#316b00]">{radius} km</span>
          </div>

          <p className="text-[12px] text-[#727a69] mb-4">
            설정한 반경 내의 이웃들의 공동구매 소분 글만 표시됩니다.
          </p>

          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.5"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full accent-[#316b00] cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-[#727a69] mt-2">
            <span>500m (걸어서 5분)</span>
            <span>1.5km (기본)</span>
            <span>3.0km (동네 전체)</span>
          </div>
        </div>

        {/* Neighborhood List */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
          <h2 className="text-[15px] font-bold text-[#191d15] mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#316b00] text-[20px]">apartment</span>
            관심 동네 목록
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {availableNeighborhoods.map((dong) => {
              const isSelected = currentLocation === dong.name;
              return (
                <button
                  key={dong.name}
                  id={`dong-btn-${dong.name}`}
                  type="button"
                  onClick={() => handleSelectDong(dong.name)}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-[#316b00] text-white border-[#316b00] shadow-sm font-bold'
                      : 'bg-[#f7fbed] border-[#e0e4d7] text-[#191d15] hover:bg-[#e6eadc]'
                  }`}
                >
                  <span className="text-[15px] font-bold">{dong.name}</span>
                  <span className={`text-[11px] ${isSelected ? 'text-white/80' : 'text-[#727a69]'}`}>
                    {dong.distance}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <BottomNav currentScreen="location_setting" onNavigate={onNavigate} />
    </div>
  );
};
