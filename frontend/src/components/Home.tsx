import React, { useState } from 'react';
import { GroupBuyItem, ScreenType } from '@/types';
import { BottomNav } from './BottomNav';

interface HomeProps {
  items: GroupBuyItem[];
  currentLocation: string;
  onNavigate: (screen: ScreenType) => void;
  onSelectItem: (item: GroupBuyItem) => void;
  onToggleLike: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  items,
  currentLocation,
  onNavigate,
  onSelectItem,
  onToggleLike,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { name: '전체', icon: 'eco' },
    { name: '즉석식품', icon: 'ramen_dining' },
    { name: '음료', icon: 'local_drink' },
    { name: '간식', icon: 'cookie' },
    { name: '커피/차', icon: 'coffee' },
    { name: '생활식품', icon: 'inventory_2' },
  ];

  const filteredItems = items.filter((item) => {
    const matchCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div id="screen-home" className="min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col pb-24">
      <header className="bg-[#f7fbed] border-b border-[#e0e4d7]/60 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-5 py-3 flex flex-col gap-2.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 min-w-0">
              <button
                id="home-logo"
                type="button"
                onClick={() => onNavigate('home')}
                aria-label="홈으로 이동"
                className="flex items-center gap-1.5 text-[#316b00] font-extrabold text-[18px] leading-none shrink-0"
              >
                <span className="w-8 h-8 rounded-xl bg-[#316b00] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] fill-1">eco</span>
                </span>
                <span>소분소분</span>
              </button>
              <div
                id="location-picker-trigger"
                onClick={() => onNavigate('location_setting')}
                className="flex items-center gap-1 cursor-pointer hover:bg-[#e6eadc] transition-colors px-3 py-1.5 rounded-full bg-[#f2f5e8] border border-[#e0e4d7] min-w-0"
                role="button"
                tabIndex={0}
              >
                <span className="material-symbols-outlined text-[#316b00] text-[20px]">location_on</span>
                <h1 className="text-[16px] font-bold text-[#316b00] leading-none truncate">{currentLocation}</h1>
                <span className="material-symbols-outlined text-[#316b00] text-[18px]">expand_more</span>
              </div>
            </div>
            <button
              id="btn-notifications"
              type="button"
              aria-label="알림"
              onClick={() => onNavigate('notifications')}
              className="relative p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer text-[#316b00]"
            >
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-[#f7fbed]"></span>
            </button>
          </div>
          <div className="relative">
            <span aria-hidden="true" className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#727a69] text-[20px]">
              search
            </span>
            <input
              id="home-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="어떤 대용량 상품을 찾으시나요?"
              className="w-full h-11 pl-10 pr-10 bg-[#ffffff] border border-[#c1c9b6]/60 rounded-full text-[14px] text-[#191d15] placeholder:text-[#727a69] focus:outline-none focus:ring-2 focus:ring-[#316b00] focus:border-transparent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727a69] hover:text-[#191d15] p-1"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto px-5 pt-3">
        <section className="mb-5 -mx-5 px-5 flex justify-center">
          <div className="max-w-full overflow-x-auto no-scrollbar py-1">
            <div className="flex w-max gap-1.5 rounded-full bg-[#ffffff] border border-[#e0e4d7] p-1 shadow-xs">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    id={`cat-btn-${cat.name}`}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`h-10 rounded-full px-3 flex items-center justify-center gap-1.5 whitespace-nowrap text-[13px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#316b00] text-[#ffffff] shadow-sm'
                        : 'text-[#41493a] hover:bg-[#f2f5e8]'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isSelected ? 'fill-1 text-[#ffffff]' : 'text-[#316b00]'}`}>
                      {cat.icon}
                    </span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#316b00] text-[20px]">storefront</span>
            <h2 className="text-[16px] font-bold text-[#191d15]">
              {selectedCategory === '전체' ? '지금 참여 가능한 동네 소분' : `${selectedCategory} 소분 모임`}
            </h2>
          </div>
          <span className="text-[13px] text-[#727a69] font-medium">총 {filteredItems.length}개</span>
        </div>
        <section className="flex flex-col gap-3">
          {filteredItems.map((item) => {
            const progressPercent = Math.round((item.currentMembers / item.totalMembers) * 100);
            const remainingMembers = item.totalMembers - item.currentMembers;

            return (
              <article
                key={item.id}
                id={`article-${item.id}`}
                onClick={() => {
                  onSelectItem(item);
                  onNavigate('detail');
                }}
                className="bg-[#ffffff] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(126,193,81,0.08)] border border-[#e0e4d7] flex group cursor-pointer hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 bg-[#e6eadc] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {item.urgent && (
                    <div className="absolute top-2 left-2 bg-[#c6ee6b] text-[#506c00] font-bold px-2 py-0.5 rounded-full text-[11px] shadow-sm flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[13px]">local_fire_department</span>
                      마감
                    </div>
                  )}
                  <button
                    type="button"
                    aria-label="찜하기"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLike(item.id);
                    }}
                    className="absolute bottom-2 right-2 z-10 bg-black/30 backdrop-blur-xs p-1.5 rounded-full flex items-center justify-center transition-transform active:scale-90 hover:bg-black/40 cursor-pointer"
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] transition-colors duration-200 ${
                        item.isLiked ? 'text-[#ff4081] fill-1' : 'text-white'
                      }`}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-1 min-w-0 gap-2">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#191d15] line-clamp-2 mb-1 group-hover:text-[#316b00] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-[13px] text-[#727a69] gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#316b00]">location_on</span>
                      <span>{item.location}</span>
                      <span>·</span>
                      <span>{item.distance}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 pt-2 border-t border-[#e0e4d7]/40">
                    <div>
                      <span className="text-[18px] font-extrabold text-[#316b00]">
                        {item.pricePerPerson.toLocaleString()}원
                      </span>
                      <span className="text-[13px] text-[#727a69] ml-1">/ 1인</span>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <span className="text-[12px] font-semibold text-[#4c6700]">
                        {item.totalMembers}명 모집 중 / {remainingMembers > 0 ? `${remainingMembers}명 남음` : '마감'}
                      </span>
                      <div className="w-full sm:w-24 h-2 bg-[#ecefe2] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#316b00] rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
      <BottomNav currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
};
