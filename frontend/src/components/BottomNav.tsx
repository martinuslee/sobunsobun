import React from 'react';
import { ScreenType } from '@/types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const isHome = currentScreen === 'home';
  const isCreate = currentScreen === 'create_post';
  const isHistory = currentScreen === 'history' || currentScreen === 'review_write' || currentScreen === 'review_complete';

  return (
    <nav className="bg-[#ffffff] border-t border-[#e0e4d7] shadow-[0_-4px_16px_rgba(49,107,0,0.06)] docked full-width fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-3 h-16">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-colors cursor-pointer ${
          isHome ? 'bg-[#c6ee6b] text-[#506c00] font-semibold' : 'text-[#41493a] hover:text-[#316b00]'
        }`}
      >
        <span className={`material-symbols-outlined text-[24px] ${isHome ? 'fill-1' : ''}`}>home</span>
        <span className="text-[12px] font-medium leading-tight">홈</span>
      </button>

      <button
        type="button"
        onClick={() => onNavigate('create_post')}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-colors cursor-pointer ${
          isCreate ? 'bg-[#c6ee6b] text-[#506c00] font-semibold' : 'text-[#41493a] hover:text-[#316b00]'
        }`}
      >
        <span className="material-symbols-outlined text-[24px]">add_circle</span>
        <span className="text-[12px] font-medium leading-tight">모집하기</span>
      </button>

      <button
        type="button"
        onClick={() => onNavigate('history')}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-colors cursor-pointer ${
          isHistory ? 'bg-[#c6ee6b] text-[#506c00] font-semibold' : 'text-[#41493a] hover:text-[#316b00]'
        }`}
      >
        <span className={`material-symbols-outlined text-[24px] ${isHistory ? 'fill-1' : ''}`}>person</span>
        <span className="text-[12px] font-medium leading-tight">마이페이지</span>
      </button>
    </nav>
  );
};
