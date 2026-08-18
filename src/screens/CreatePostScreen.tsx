import React, { useState } from 'react';
import { GroupBuyItem, ScreenType } from '../types';
import { BottomNav } from '../components/BottomNav';
import { FLAT_PEACH_IMAGE, LETTUCE_IMAGE, COSTCO_PORK_IMAGE, STRAWBERRY_IMAGE } from '../assets/productImages';

interface CreatePostScreenProps {
  currentLocation: string;
  onNavigate: (screen: ScreenType) => void;
  onCreateItem: (item: GroupBuyItem) => void;
}

export const CreatePostScreen: React.FC<CreatePostScreenProps> = ({
  currentLocation,
  onNavigate,
  onCreateItem,
}) => {
  const [category, setCategory] = useState<string>('과일');
  const [subCategory, setSubCategory] = useState<string>('복숭아/자두');
  const [title, setTitle] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(18000);
  const [totalMembers, setTotalMembers] = useState<number>(3);
  const [meetingPlace, setMeetingPlace] = useState<string>('역삼1동 주민센터 앞');
  const [description, setDescription] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>(FLAT_PEACH_IMAGE);

  const subCategoryMap: Record<string, string[]> = {
    '과일': ['복숭아/자두', '사과/배', '베리류/딸기', '감귤류/오렌지', '바나나/열대과일', '포도/샤인머스캣'],
    '채소': ['상추/잎채소', '뿌리채소/감자/당근', '버섯/양파/마늘', '토마토/파프리카', '나물/허브'],
    '육류': ['돼지고기/삼겹살', '소고기', '닭/오리고기', '양념육/가공육'],
    '베이커리': ['식빵/베이글', '디저트/케이크', '샌드위치'],
    '가공식품': ['밀키트/간편식', '소스/오일/양념', '유제품/치즈/버터', '음료/커피']
  };

  const sampleImages = [
    { label: '납작복숭아', url: FLAT_PEACH_IMAGE },
    { label: '친환경 상추', url: LETTUCE_IMAGE },
    { label: '코스트코 삼겹살', url: COSTCO_PORK_IMAGE },
    { label: '딸기/베리', url: STRAWBERRY_IMAGE },
    { label: '베이커리', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80' },
  ];

  const pricePerPerson = Math.round(totalPrice / totalMembers);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('소분 제목을 입력해주세요.');
      return;
    }

    const newItem: GroupBuyItem = {
      id: `custom-${Date.now()}`,
      title,
      category,
      subCategory,
      location: currentLocation,
      distance: '300m',
      pricePerPerson,
      totalPrice,
      totalMembers,
      currentMembers: 1,
      unit: `1인 (${Math.round(100 / totalMembers)}%)`,
      imageUrl: selectedImage,
      urgent: true,
      hostName: '초록이웃(나)',
      hostAvatar: '🌱',
      hostMannerTemp: 38.2,
      meetingPlace,
      meetingPlaceDetail: `${currentLocation} 인근 안심거래 스팟`,
      description: description || '대용량으로 구매하여 신선할 때 나눕니다. 깔끔하게 소분해드릴게요!',
      createdAt: '방금 전',
      deadline: '오늘 21:00',
      isLiked: false,
      status: 'recruiting',
    };

    onCreateItem(newItem);
    onNavigate('home');
  };

  return (
    <div id="screen-create-post" className="min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col pb-24">
      {/* Top Header */}
      <header className="bg-[#f7fbed] border-b border-[#e0e4d7] sticky top-0 z-30 shadow-xs">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div
            id="create-post-location-trigger"
            onClick={() => onNavigate('location_setting')}
            className="flex items-center gap-1 cursor-pointer hover:bg-[#e6eadc] px-3 py-1.5 rounded-full bg-[#f2f5e8] border border-[#e0e4d7]"
            role="button"
            tabIndex={0}
          >
            <span className="material-symbols-outlined text-[#316b00] text-[20px]">location_on</span>
            <h1 className="text-[17px] font-bold text-[#316b00]">{currentLocation}</h1>
            <span className="material-symbols-outlined text-[#316b00] text-[18px]">expand_more</span>
          </div>

          <span className="text-[17px] font-bold text-[#191d15]">공동구매 소분 등록</span>

          <button
            id="btn-create-notifications"
            type="button"
            aria-label="Notifications"
            onClick={() => onNavigate('notifications')}
            className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer text-[#316b00]"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
          </button>
        </div>
      </header>

      {/* Form Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Category selection */}
          <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
            <h2 className="text-[15px] font-bold text-[#191d15] mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">category</span>
              1. 카테고리 선택
            </h2>

            {/* Main categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.keys(subCategoryMap).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                    setSubCategory(subCategoryMap[cat][0]);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-[#316b00] text-white shadow-xs'
                      : 'bg-[#f2f5e8] text-[#41493a] hover:bg-[#e6eadc]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sub Categories (세분화) */}
            <div className="bg-[#f7fbed] p-3 rounded-xl border border-[#e0e4d7]">
              <span className="text-[12px] font-bold text-[#727a69] block mb-2">세부 품목 선택</span>
              <div className="flex flex-wrap gap-1.5">
                {subCategoryMap[category]?.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSubCategory(sub)}
                    className={`px-3 py-1 rounded-lg text-[12px] transition-all cursor-pointer ${
                      subCategory === sub
                        ? 'bg-[#c6ee6b] text-[#214c00] font-bold border border-[#316b00]'
                        : 'bg-white text-[#41493a] border border-[#c1c9b6]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
            <h2 className="text-[15px] font-bold text-[#191d15] mb-3 flex items-center gap-1">
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">edit_note</span>
              2. 소분 상품 정보
            </h2>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[13px] font-semibold text-[#41493a] block mb-1">
                  글 제목
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 코스트코 대용량 베이글 12개 반반 나눠요"
                  className="w-full h-11 px-3.5 bg-[#f7fbed] border border-[#c1c9b6] rounded-xl text-[14px] text-[#191d15] focus:outline-none focus:ring-2 focus:ring-[#316b00]"
                />
              </div>

              {/* Photo selector */}
              <div>
                <label className="text-[13px] font-semibold text-[#41493a] block mb-1">
                  대표 사진 선택
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {sampleImages.map((img) => (
                    <div
                      key={img.label}
                      onClick={() => setSelectedImage(img.url)}
                      className={`relative rounded-xl overflow-hidden h-18 border-2 cursor-pointer transition-all ${
                        selectedImage === img.url ? 'border-[#316b00] ring-2 ring-[#7ec151]' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] text-center py-0.5">
                        {img.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="text-[13px] font-semibold text-[#41493a] block mb-1">
                  상세 설명 및 분배 방식
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="구매처, 포장 상태, 위생 소분 방법 등을 자세히 적어주시면 더 빨리 모입니다."
                  className="w-full p-3 bg-[#f7fbed] border border-[#c1c9b6] rounded-xl text-[14px] text-[#191d15] focus:outline-none focus:ring-2 focus:ring-[#316b00]"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Pricing and Splitting */}
          <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
            <h2 className="text-[15px] font-bold text-[#191d15] mb-3 flex items-center gap-1">
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">payments</span>
              3. 가격 및 모집 인원
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-[13px] font-semibold text-[#41493a] block mb-1">
                  총 구매 가격 (원)
                </label>
                <input
                  type="number"
                  step="500"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(Number(e.target.value))}
                  className="w-full h-11 px-3.5 bg-[#f7fbed] border border-[#c1c9b6] rounded-xl text-[14px] font-bold text-[#191d15] focus:outline-none focus:ring-2 focus:ring-[#316b00]"
                />
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[#41493a] block mb-1">
                  총 모집 인원 (나 포함)
                </label>
                <div className="flex items-center gap-2 h-11">
                  {[2, 3, 4, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTotalMembers(num)}
                      className={`flex-1 h-full rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
                        totalMembers === num
                          ? 'bg-[#316b00] text-white'
                          : 'bg-[#f2f5e8] text-[#41493a] border border-[#c1c9b6]'
                      }`}
                    >
                      {num}명
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated per-person price */}
            <div className="bg-[#f2f5e8] p-3.5 rounded-xl border border-[#e0e4d7] flex items-center justify-between">
              <div>
                <span className="text-[12px] text-[#727a69]">1인당 자동 계산 분담금</span>
                <p className="text-[18px] font-extrabold text-[#316b00]">
                  {pricePerPerson.toLocaleString()}원
                </p>
              </div>
              <span className="text-[12px] bg-[#c6ee6b] text-[#506c00] font-bold px-2.5 py-1 rounded-full">
                투명 분할 계산 완료
              </span>
            </div>
          </div>

          {/* Meeting Place */}
          <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
            <h2 className="text-[15px] font-bold text-[#191d15] mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">pin_drop</span>
              4. 거래 희망 장소
            </h2>
            <input
              type="text"
              value={meetingPlace}
              onChange={(e) => setMeetingPlace(e.target.value)}
              placeholder="예: 역삼1동 주민센터 앞"
              className="w-full h-11 px-3.5 bg-[#f7fbed] border border-[#c1c9b6] rounded-xl text-[14px] text-[#191d15] focus:outline-none focus:ring-2 focus:ring-[#316b00]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#316b00] hover:bg-[#235100] text-white font-bold text-[16px] py-4 rounded-2xl shadow-md cursor-pointer transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
          >
            <span className="material-symbols-outlined text-[22px]">check_circle</span>
            소분 글 등록하기
          </button>
        </form>
      </main>

      {/* Bottom Nav */}
      <BottomNav currentScreen="create_post" onNavigate={onNavigate} />
    </div>
  );
};
