import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  renderAsButtons?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  renderAsButtons = false
}) => {
  const isHome = currentScreen === 'home';
  const isDetail = currentScreen === 'detail';
  const isCreate = currentScreen === 'create_post';
  const isHistory = currentScreen === 'history' || currentScreen === 'review_write' || currentScreen === 'review_complete';

  if (renderAsButtons) {
    return (
      <nav id="bottom-nav-buttons" className="bg-[#ffffff] border-t border-[#e0e4d7] shadow-[0_-4px_16px_rgba(49,107,0,0.06)] docked full-width fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-3 h-16">
        <button
          id="nav-btn-home"
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
          id="nav-btn-search-detail"
          type="button"
          onClick={() => onNavigate('detail')}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-colors cursor-pointer ${
            isDetail ? 'bg-[#c6ee6b] text-[#506c00] font-semibold' : 'text-[#41493a] hover:text-[#316b00]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">search</span>
          <span className="text-[12px] font-medium leading-tight">검색</span>
        </button>

        <button
          id="nav-btn-create"
          type="button"
          onClick={() => onNavigate('create_post')}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-colors cursor-pointer ${
            isCreate ? 'bg-[#c6ee6b] text-[#506c00] font-semibold' : 'text-[#41493a] hover:text-[#316b00]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">add_circle</span>
          <span className="text-[12px] font-medium leading-tight">글쓰기</span>
        </button>

        <button
          id="nav-btn-mypage"
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
  }

  return (
    <nav id="bottom-nav-links" className="bg-[#ffffff] border-t border-[#e0e4d7] shadow-[0_-4px_16px_rgba(49,107,0,0.06)] docked full-width fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-3 h-16">
      <a
        id="nav-link-home"
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('home');
        }}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-colors cursor-pointer ${
          isHome ? 'bg-[#c6ee6b] text-[#506c00] font-semibold' : 'text-[#41493a] hover:text-[#316b00]'
        }`}
      >
        <span className={`material-symbols-outlined text-[24px] ${isHome ? 'fill-1' : ''}`}>home</span>
        <span className="text-[12px] font-medium leading-tight">홈</span>
      </a>

      <a
        id="nav-link-search-detail"
        href="#search"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('detail');
        }}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-colors cursor-pointer ${
          isDetail ? 'bg-[#c6ee6b] text-[#506c00] font-semibold' : 'text-[#41493a] hover:text-[#316b00]'
        }`}
      >
        <span className="material-symbols-outlined text-[24px]">search</span>
        <span className="text-[12px] font-medium leading-tight">검색</span>
      </a>

      <a
        id="nav-link-create"
        href="#write"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('create_post');
        }}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-colors cursor-pointer ${
          isCreate ? 'bg-[#c6ee6b] text-[#506c00] font-semibold' : 'text-[#41493a] hover:text-[#316b00]'
        }`}
      >
        <span className="material-symbols-outlined text-[24px]">add_circle</span>
        <span className="text-[12px] font-medium leading-tight">글쓰기</span>
      </a>

      <a
        id="nav-link-mypage"
        href="#mypage"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('history');
        }}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-colors cursor-pointer ${
          isHistory ? 'bg-[#c6ee6b] text-[#506c00] font-semibold' : 'text-[#41493a] hover:text-[#316b00]'
        }`}
      >
        <span className={`material-symbols-outlined text-[24px] ${isHistory ? 'fill-1' : ''}`}>person</span>
        <span className="text-[12px] font-medium leading-tight">마이페이지</span>
      </a>
    </nav>
  );
};
