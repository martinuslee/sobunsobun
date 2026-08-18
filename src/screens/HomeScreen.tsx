import React, { useState } from 'react';
import { GroupBuyItem, ScreenType } from '../types';
import { BottomNav } from '../components/BottomNav';

interface HomeScreenProps {
  items: GroupBuyItem[];
  currentLocation: string;
  onNavigate: (screen: ScreenType) => void;
  onSelectItem: (item: GroupBuyItem) => void;
  onToggleLike: (id: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
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
    { name: '과일', icon: 'nutrition' },
    { name: '채소', icon: 'grass' },
    { name: '육류', icon: 'set_meal' },
    { name: '베이커리', icon: 'bakery_dining' },
    { name: '가공식품', icon: 'local_pizza' },
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
      {/* TopAppBar */}
      <header className="bg-[#f7fbed] border-b border-[#e0e4d7]/60 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-5 py-3 flex flex-col gap-2.5">
          <div className="flex justify-between items-center">
            {/* Location selector trigger */}
            <div
              id="location-picker-trigger"
              onClick={() => onNavigate('location_setting')}
              className="flex items-center gap-1 cursor-pointer hover:bg-[#e6eadc] transition-colors px-3 py-1.5 rounded-full bg-[#f2f5e8] border border-[#e0e4d7]"
              role="button"
              tabIndex={0}
            >
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">location_on</span>
              <h1 className="text-[18px] font-bold text-[#316b00] leading-none">{currentLocation}</h1>
              <span className="material-symbols-outlined text-[#316b00] text-[18px]">expand_more</span>
            </div>

            {/* Notification button */}
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

          {/* Search bar */}
          <div className="relative">
            <span aria-hidden="true" className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#727a69] text-[20px]">
              search
            </span>
            <input
              id="home-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="어떤 식재료를 찾으시나요?"
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

      {/* Main Canvas */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-5 pt-3">
        {/* Category Scroll */}
        <section className="mb-5 -mx-5 px-5">
          <div className="flex overflow-x-auto gap-2.5 no-scrollbar py-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  id={`cat-btn-${cat.name}`}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex flex-col items-center justify-center min-w-[70px] h-[76px] rounded-2xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#7ec151] text-[#214c00] font-bold shadow-sm ring-2 ring-[#316b00]/20'
                      : 'bg-[#ffffff] border border-[#e0e4d7] text-[#41493a] hover:bg-[#f2f5e8]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[24px] mb-1 ${isSelected ? 'fill-1 text-[#214c00]' : 'text-[#316b00]'}`}>
                    {cat.icon}
                  </span>
                  <span className="text-[12px] font-semibold">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#316b00] text-[20px]">storefront</span>
            <h2 className="text-[16px] font-bold text-[#191d15]">
              {selectedCategory === '전체' ? '지금 참여 가능한 동네 소분' : `${selectedCategory} 소분 모임`}
            </h2>
          </div>
          <span className="text-[13px] text-[#727a69] font-medium">총 {filteredItems.length}개</span>
        </div>

        {/* Bento Grid / Feed */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="bg-[#ffffff] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(126,193,81,0.08)] border border-[#e0e4d7] flex flex-col group cursor-pointer hover:-translate-y-1 transition-all duration-200"
              >
                <div className="relative h-44 w-full bg-[#e6eadc] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {item.urgent && (
                    <div className="absolute top-3 left-3 bg-[#c6ee6b] text-[#506c00] font-bold px-2.5 py-1 rounded-full text-[12px] shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                      마감 임박
                    </div>
                  )}
                  {/* Heart / 찜 Button */}
                  <button
                    type="button"
                    aria-label="찜하기"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLike(item.id);
                    }}
                    className="absolute top-3 right-3 z-10 bg-black/30 backdrop-blur-xs p-2 rounded-full flex items-center justify-center transition-transform active:scale-90 hover:bg-black/40 cursor-pointer"
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

                <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <h3 className="text-[17px] font-bold text-[#191d15] line-clamp-1 mb-1 group-hover:text-[#316b00] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-[13px] text-[#727a69] gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#316b00]">location_on</span>
                      <span>{item.location}</span>
                      <span>·</span>
                      <span>{item.distance}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-1 border-t border-[#e0e4d7]/40">
                    <div>
                      <span className="text-[20px] font-extrabold text-[#316b00]">
                        {item.pricePerPerson.toLocaleString()}원
                      </span>
                      <span className="text-[13px] text-[#727a69] ml-1">/ 1인</span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[12px] font-semibold text-[#4c6700]">
                        {item.totalMembers}명 모집 중 / {remainingMembers > 0 ? `${remainingMembers}명 남음` : '마감'}
                      </span>
                      <div className="w-24 h-2 bg-[#ecefe2] rounded-full overflow-hidden">
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

      {/* Standard Bottom Nav with Links */}
      <BottomNav currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
};
