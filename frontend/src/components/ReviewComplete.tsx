import React from 'react';
import { ScreenType } from '@/types';
import { BottomNav } from './BottomNav';

interface ReviewCompleteProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ReviewComplete: React.FC<ReviewCompleteProps> = ({
  onNavigate,
}) => {
  return (
    <div id="screen-review-complete" className="min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col justify-between pb-24">
      <header className="bg-[#f7fbed] border-b border-[#e0e4d7] sticky top-0 z-30 flex items-center justify-between px-4 py-3 shadow-xs">
        <button
          id="btn-review-complete-back"
          type="button"
          aria-label="뒤로 가기"
          onClick={() => onNavigate('review_write')}
          className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer text-[#191d15] flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        <h1 className="text-[17px] font-bold text-[#191d15]">후기 등록 완료</h1>

        <div className="w-10"></div>
      </header>
      <main className="flex-1 max-w-md w-full mx-auto px-5 py-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-[#7ec151] text-white flex items-center justify-center shadow-lg mb-5 animate-in zoom-in duration-300">
          <span className="material-symbols-outlined text-[44px]">check_circle</span>
        </div>

        <h2 className="text-[22px] font-extrabold text-[#191d15] mb-2">
          소중한 후기가 등록되었습니다!
        </h2>
        
        <p className="text-[14px] text-[#727a69] leading-relaxed mb-6 max-w-xs">
          작성해주신 따뜻한 후기가 이웃에게 큰 힘이 됩니다. 더 신뢰할 수 있는 소분 커뮤니티를 만들어가요.
        </p>
        <div className="w-full bg-[#ffffff] border border-[#c6ee6b] rounded-2xl p-4 shadow-xs flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#c6ee6b] text-[#316b00] flex items-center justify-center text-[24px]">
            🌱
          </div>
          <div className="text-left flex-1">
            <span className="text-[12px] font-bold text-[#316b00]">매너 점수 상승!</span>
            <p className="text-[15px] font-extrabold text-[#191d15]">
              매너온도 +0.5°C 획득 (38.7°C)
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <button
            id="btn-confirm-review"
            type="button"
            onClick={() => onNavigate('history')}
            className="w-full bg-[#316b00] hover:bg-[#235100] text-white font-bold text-[15px] py-4 rounded-2xl shadow-md cursor-pointer transition-all active:scale-[0.99]"
          >
            후기 확인하기
          </button>
          <button
            id="btn-unwritten-reviews"
            type="button"
            onClick={() => onNavigate('history')}
            className="w-full bg-[#f2f5e8] hover:bg-[#e6eadc] text-[#316b00] border border-[#c1c9b6] font-bold text-[15px] py-3.5 rounded-2xl cursor-pointer transition-all"
          >
            미작성 후기 쓰러 가기
          </button>
        </div>
      </main>

      <BottomNav currentScreen="review_complete" onNavigate={onNavigate} />
    </div>
  );
};
