import React, { useState } from 'react';
import { GroupBuyItem, ScreenType } from '../types';

interface JoinMapScreenProps {
  item: GroupBuyItem;
  onNavigate: (screen: ScreenType) => void;
  onConfirmJoin: (portion: number, time: string) => void;
}

export const JoinMapScreen: React.FC<JoinMapScreenProps> = ({
  item,
  onNavigate,
  onConfirmJoin,
}) => {
  const [portion, setPortion] = useState<number>(1);
  const [selectedTime, setSelectedTime] = useState<string>('오늘 17:00');
  const [paymentMethod, setPaymentMethod] = useState<'safe_pay' | 'direct'>('safe_pay');
  const [message, setMessage] = useState<string>('안녕하세요! 신선하게 나눠 먹어요 😊');

  const times = ['오늘 17:00', '오늘 18:30', '오늘 20:00', '시간 조율하기'];

  const totalPrice = item.pricePerPerson * portion;

  const handleConfirm = () => {
    onConfirmJoin(portion, selectedTime);
    onNavigate('chat_detail');
  };

  return (
    <div id="screen-join-map" className="min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col pb-28">
      {/* Top Header */}
      <header className="bg-[#f7fbed] border-b border-[#e0e4d7] sticky top-0 z-30 flex items-center justify-between px-4 py-3">
        <button
          id="btn-join-map-back"
          type="button"
          aria-label="뒤로 가기"
          onClick={() => onNavigate('detail')}
          className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer text-[#191d15] flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        <h1 className="text-[17px] font-bold text-[#191d15]">
          소분 참여 & 거래장소 확인
        </h1>

        <div className="w-10"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pt-4 flex flex-col gap-4">
        {/* Item Summary Card */}
        <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e0e4d7] flex items-center gap-3.5 shadow-xs">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-18 h-18 rounded-xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-[#316b00] bg-[#e6eadc] px-2 py-0.5 rounded-md">
              모집 중
            </span>
            <h2 className="text-[15px] font-bold text-[#191d15] truncate mt-1">{item.title}</h2>
            <p className="text-[13px] text-[#727a69]">
              {item.hostName} · 1인 {item.pricePerPerson.toLocaleString()}원
            </p>
          </div>
        </div>

        {/* Meeting Map & Location Spot Section */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#316b00] text-[22px]">map</span>
              <h3 className="text-[16px] font-bold text-[#191d15]">거래 희망 장소 (지도)</h3>
            </div>
            <span className="text-[12px] bg-[#c6ee6b] text-[#506c00] font-bold px-2.5 py-0.5 rounded-full">
              도보 3분 안심존
            </span>
          </div>

          {/* Interactive Simulated Map */}
          <div className="relative h-48 w-full bg-[#dce8d3] rounded-2xl overflow-hidden border border-[#c1c9b6] flex flex-col items-center justify-center shadow-inner">
            {/* Map Roads & Landmarks */}
            <div className="absolute inset-0 bg-[#e3ecde]">
              {/* Road lines */}
              <div className="absolute top-1/2 left-0 right-0 h-8 bg-[#ffffff] -translate-y-1/2 border-y border-[#d0dec9]"></div>
              <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-[#ffffff] border-x border-[#d0dec9]"></div>
              <div className="absolute top-0 bottom-0 right-1/4 w-5 bg-[#ffffff] border-x border-[#d0dec9] -rotate-12"></div>
              
              {/* Landmark badges */}
              <div className="absolute top-3 left-4 bg-[#f2f5e8] text-[#506c00] text-[10px] font-bold px-2 py-1 rounded shadow-xs">
                역삼초등학교
              </div>
              <div className="absolute bottom-3 right-4 bg-[#f2f5e8] text-[#506c00] text-[10px] font-bold px-2 py-1 rounded shadow-xs">
                역삼1동 주민센터
              </div>
            </div>

            {/* Central Animated Location Pin */}
            <div className="relative z-10 flex flex-col items-center animate-bounce">
              <div className="bg-[#ba1a1a] text-white px-3 py-1 rounded-full text-[12px] font-bold shadow-lg flex items-center gap-1 border-2 border-white">
                <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                우리은행 마두지점 / 역삼지점
              </div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#ba1a1a]"></div>
            </div>

            {/* Floating Compass / Zoom controls */}
            <div className="absolute bottom-3 left-3 z-10 flex flex-col gap-1">
              <span className="bg-white/90 p-1.5 rounded-lg text-[#316b00] shadow-sm text-[11px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">near_me</span>
                현재 위치에서 300m
              </span>
            </div>
          </div>

          <div className="mt-3 p-3 bg-[#f7fbed] rounded-xl border border-[#e0e4d7] flex items-start gap-2 text-[13px]">
            <span className="material-symbols-outlined text-[#316b00] text-[18px] mt-0.5">verified_user</span>
            <div>
              <span className="font-bold text-[#191d15]">우리은행 앞 (공공 CCTV 설치 구역)</span>
              <p className="text-[#727a69] text-[12px] mt-0.5">
                유동인구가 많고 밝은 안심 거래 스팟입니다. 채팅을 통해 세부 위치 조율이 가능합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Portion Selector */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
          <h3 className="text-[16px] font-bold text-[#191d15] mb-3">소분 수량 선택</h3>
          
          <div className="flex items-center justify-between p-3 bg-[#f2f5e8] rounded-xl border border-[#e0e4d7]">
            <div>
              <span className="font-bold text-[15px] text-[#191d15]">분배 수량 ({item.unit})</span>
              <p className="text-[12px] text-[#727a69]">1인 기준 {item.pricePerPerson.toLocaleString()}원</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPortion((p) => Math.max(1, p - 1))}
                disabled={portion <= 1}
                className="w-9 h-9 rounded-full bg-white border border-[#c1c9b6] flex items-center justify-center font-bold text-[18px] text-[#191d15] disabled:opacity-40 cursor-pointer"
              >
                -
              </button>
              <span className="text-[16px] font-extrabold text-[#316b00] min-w-[20px] text-center">
                {portion}인분
              </span>
              <button
                type="button"
                onClick={() => setPortion((p) => Math.min(item.totalMembers - item.currentMembers, p + 1))}
                disabled={portion >= (item.totalMembers - item.currentMembers)}
                className="w-9 h-9 rounded-full bg-white border border-[#c1c9b6] flex items-center justify-center font-bold text-[18px] text-[#191d15] disabled:opacity-40 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Preferred Meeting Time */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
          <h3 className="text-[16px] font-bold text-[#191d15] mb-3">만남 희망 시간</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {times.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTime(t)}
                className={`py-3 px-3 rounded-xl text-[13px] font-semibold text-center border transition-all cursor-pointer ${
                  selectedTime === t
                    ? 'bg-[#c6ee6b] border-[#316b00] text-[#214c00] font-bold shadow-xs'
                    : 'bg-[#f7fbed] border-[#e0e4d7] text-[#41493a] hover:bg-[#e6eadc]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Selection */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
          <h3 className="text-[16px] font-bold text-[#191d15] mb-3">결제 및 전달 방식</h3>
          <div className="flex flex-col gap-2">
            <label
              onClick={() => setPaymentMethod('safe_pay')}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'safe_pay'
                  ? 'border-[#316b00] bg-[#f2f5e8] ring-1 ring-[#316b00]'
                  : 'border-[#e0e4d7] bg-[#f7fbed]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#316b00] text-[22px]">shield</span>
                <div>
                  <span className="font-bold text-[14px] text-[#191d15]">소분 안전 에스크로 결제</span>
                  <p className="text-[12px] text-[#727a69]">물품 수령 후 구매확정 시 송금</p>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'safe_pay'}
                onChange={() => {}}
                className="accent-[#316b00] w-4 h-4"
              />
            </label>

            <label
              onClick={() => setPaymentMethod('direct')}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'direct'
                  ? 'border-[#316b00] bg-[#f2f5e8] ring-1 ring-[#316b00]'
                  : 'border-[#e0e4d7] bg-[#f7fbed]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#316b00] text-[22px]">handshake</span>
                <div>
                  <span className="font-bold text-[14px] text-[#191d15]">현장 직접 이체 / 당일 결제</span>
                  <p className="text-[12px] text-[#727a69]">만남 장소에서 물품 확인 후 결제</p>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'direct'}
                onChange={() => {}}
                className="accent-[#316b00] w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Message for Host */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
          <h3 className="text-[16px] font-bold text-[#191d15] mb-2">호스트에게 남길 첫 인사</h3>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 bg-[#f7fbed] border border-[#c1c9b6] rounded-xl text-[14px] text-[#191d15] focus:outline-none focus:ring-2 focus:ring-[#316b00]"
          />
        </div>
      </main>

      {/* Fixed Bottom CTA Button */}
      <div className="fixed bottom-0 left-0 w-full bg-[#ffffff] border-t border-[#e0e4d7] p-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[12px] text-[#727a69] block">총 결제 예정액</span>
            <span className="text-[22px] font-extrabold text-[#316b00]">
              {totalPrice.toLocaleString()}원
            </span>
          </div>

          <button
            id="btn-confirm-join"
            type="button"
            onClick={handleConfirm}
            className="flex-1 bg-[#316b00] hover:bg-[#235100] active:scale-[0.99] text-[#ffffff] text-[16px] font-bold py-4 px-6 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>소분 참여 확정 및 1:1 채팅 시작</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
