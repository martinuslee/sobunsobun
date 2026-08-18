import React, { useState } from 'react';
import { GroupBuyItem, ScreenType } from '@/types';
import { BottomNav } from './BottomNav';
import { CUP_NOODLE_IMAGE, INSTANT_RICE_IMAGE, SPARKLING_WATER_IMAGE } from '@/lib/assets/productImages';

interface HistoryProps {
  items: GroupBuyItem[];
  currentLocation: string;
  onNavigate: (screen: ScreenType) => void;
  onSelectItem: (item: GroupBuyItem) => void;
  onLogout: () => void;
}

export const History: React.FC<HistoryProps> = ({
  items,
  currentLocation,
  onNavigate,
  onSelectItem,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed' | 'liked'>('completed');

  return (
    <div id="screen-history" className="min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col pb-24">
      <header className="bg-[#f7fbed] border-b border-[#e0e4d7] sticky top-0 z-30 flex items-center justify-between px-4 py-3 shadow-xs">
        <h1 className="text-[18px] font-bold text-[#316b00]">나의 소분 & 참여 내역</h1>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="로그아웃"
            onClick={onLogout}
            className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors text-[#316b00] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">logout</span>
          </button>
          <button
            type="button"
            aria-label="설정"
            onClick={() => onNavigate('location_setting')}
            className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors text-[#316b00] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">settings</span>
          </button>
        </div>
      </header>
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4 flex flex-col gap-4">
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#f2f5e8] border-2 border-[#7ec151] flex items-center justify-center text-[28px]">
                🌱
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[17px] font-bold text-[#191d15]">초록이웃</span>
                  <span className="bg-[#c6ee6b] text-[#506c00] text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                    LV.3 나눔러
                  </span>
                </div>
                <p className="text-[13px] text-[#727a69]">{currentLocation} 주민 · 이웃 24명과 소분 완료</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[16px] font-extrabold text-[#316b00]">38.2°C</span>
              <div className="w-16 h-1.5 bg-[#ecefe2] rounded-full overflow-hidden mt-1">
                <div className="h-full bg-[#316b00] rounded-full w-[76%]"></div>
              </div>
              <span className="text-[10px] text-[#727a69]">매너온도</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#e0e4d7]/70 text-center">
            <div className="bg-[#f7fbed] py-2.5 rounded-xl">
              <span className="text-[11px] text-[#727a69] block">참여한 소분</span>
              <span className="text-[16px] font-bold text-[#191d15]">14회</span>
            </div>
            <div className="bg-[#f7fbed] py-2.5 rounded-xl">
              <span className="text-[11px] text-[#727a69] block">개설한 소분</span>
              <span className="text-[16px] font-bold text-[#191d15]">6회</span>
            </div>
            <div className="bg-[#f7fbed] py-2.5 rounded-xl">
              <span className="text-[11px] text-[#727a69] block">받은 후기</span>
              <span className="text-[16px] font-bold text-[#316b00]">18개</span>
            </div>
          </div>
        </div>
        <div className="bg-[#fff9db] border border-[#ffe08d] rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffe08d] text-[#745b00] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">rate_review</span>
            </div>
            <div>
              <span className="text-[14px] font-bold text-[#534000] block">작성 대기 중인 후기 1건</span>
              <p className="text-[12px] text-[#745b00]">'탄산수 24캔 묶음' 나눔 완료</p>
            </div>
          </div>
          <button
            id="btn-go-write-review-banner"
            type="button"
            onClick={() => onNavigate('review_write')}
            className="bg-[#316b00] hover:bg-[#235100] text-white text-[13px] font-bold px-3.5 py-2 rounded-xl cursor-pointer transition-colors shadow-xs"
          >
            후기 작성
          </button>
        </div>
        <div className="flex border-b border-[#e0e4d7]">
          <button
            type="button"
            onClick={() => setActiveTab('ongoing')}
            className={`flex-1 py-3 text-center text-[14px] font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'ongoing'
                ? 'border-[#316b00] text-[#316b00]'
                : 'border-transparent text-[#727a69] hover:text-[#191d15]'
            }`}
          >
            진행 중 (2)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-3 text-center text-[14px] font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'completed'
                ? 'border-[#316b00] text-[#316b00]'
                : 'border-transparent text-[#727a69] hover:text-[#191d15]'
            }`}
          >
            완료된 소분 (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('liked')}
            className={`flex-1 py-3 text-center text-[14px] font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'liked'
                ? 'border-[#316b00] text-[#316b00]'
                : 'border-transparent text-[#727a69] hover:text-[#191d15]'
            }`}
          >
            찜한 목록 (1)
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {activeTab === 'completed' && (
            <>
              <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e0e4d7] shadow-xs flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#506c00] bg-[#e6eadc] px-2.5 py-0.5 rounded-full">
                    나눔 완료 · 2023.10.25
                  </span>
                  <span className="text-[12px] text-[#727a69]">호스트: 탄산러버</span>
                </div>

                <div className="flex gap-3 items-center">
                  <img
                    src={SPARKLING_WATER_IMAGE}
                    alt="탄산수"
                    className="w-16 h-16 rounded-xl object-cover bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold text-[#191d15] truncate">
                      탄산수 24캔 묶음 나눌 분
                    </h3>
                    <p className="text-[13px] text-[#727a69]">6,000원 · 8캔 분배 완료</p>
                    <span className="text-[12px] text-[#316b00] font-semibold">
                      거래장소: 역삼역 3번 출구
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#e0e4d7]/70 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const item = items[2] ?? items[0];
                      if (item) onSelectItem(item);
                      onNavigate('chat_detail');
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-[#e0e4d7] text-[13px] font-semibold text-[#41493a] hover:bg-[#f7fbed]"
                  >
                    대화 보기
                  </button>
                  <button
                    id="btn-write-review-item"
                    type="button"
                    onClick={() => onNavigate('review_write')}
                    className="px-4 py-1.5 rounded-xl bg-[#316b00] text-white text-[13px] font-bold hover:bg-[#235100] transition-colors cursor-pointer shadow-xs"
                  >
                    후기 작성
                  </button>
                </div>
              </div>
              <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e0e4d7] shadow-xs flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#727a69] bg-[#f2f5e8] px-2.5 py-0.5 rounded-full">
                    후기 작성 완료 · 2023.10.20
                  </span>
                  <span className="text-[12px] text-[#727a69]">호스트: 밥친구</span>
                </div>

                <div className="flex gap-3 items-center">
                  <img
                    src={INSTANT_RICE_IMAGE}
                    alt="즉석밥"
                    className="w-16 h-16 rounded-xl object-cover bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold text-[#191d15] truncate">
                      즉석밥 24개입 박스 나눠요
                    </h3>
                    <p className="text-[13px] text-[#727a69]">11,000원 · 거래 완료</p>
                    <div className="flex items-center gap-1 text-[12px] text-[#745b00] mt-0.5">
                      <span>★ 5.0</span>
                      <span>"수량이 정확했어요!"</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'ongoing' && (
            <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e0e4d7] shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#214c00] bg-[#c6ee6b] px-2.5 py-0.5 rounded-full">
                  오늘 17:00 만남 예정
                </span>
                <span className="text-[12px] text-[#727a69]">호스트: 면모임</span>
              </div>

              <div className="flex gap-3 items-center">
                <img
                  src={CUP_NOODLE_IMAGE}
                  alt="컵라면"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-[#191d15] truncate">
                    컵라면 12개입 박스 같이 나눠요
                  </h3>
                  <p className="text-[13px] text-[#727a69]">4,500원 · 3개</p>
                  <span className="text-[12px] text-[#316b00] font-semibold">
                    거래장소: 약속된 안심거래 장소
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#e0e4d7]/70 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('chat_detail')}
                  className="px-4 py-1.5 rounded-xl bg-[#316b00] text-white text-[13px] font-bold hover:bg-[#235100] transition-colors cursor-pointer"
                >
                  채팅방 입장
                </button>
              </div>
            </div>
          )}

          {activeTab === 'liked' && (
            <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e0e4d7] shadow-xs flex gap-3 items-center">
              <img
                src={SPARKLING_WATER_IMAGE}
                alt="탄산수"
                className="w-16 h-16 rounded-xl object-cover bg-white"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-bold text-[#191d15] truncate">
                  탄산수 24캔 묶음 나눌 분
                </h3>
                <p className="text-[13px] text-[#316b00] font-bold">6,000원 / 1인</p>
                <span className="text-[12px] text-[#727a69]">도곡동 · 800m</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('detail')}
                className="px-3 py-1.5 rounded-xl bg-[#f2f5e8] text-[#316b00] text-[13px] font-bold hover:bg-[#e6eadc]"
              >
                상세보기
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNav currentScreen="history" onNavigate={onNavigate} />
    </div>
  );
};
