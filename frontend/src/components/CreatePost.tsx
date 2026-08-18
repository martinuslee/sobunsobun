import React, { useRef, useState } from 'react';
import { GroupBuyItem, ScreenType } from '@/types';
import { BottomNav } from './BottomNav';
import { INSTANT_RICE_IMAGE } from '@/lib/assets/productImages';
import { defaultMapCenter, googleMapsErrorMessage, loadGoogleMaps } from '@/lib/googleMaps';

interface CreatePostProps {
  currentLocation: string;
  currentUserName: string;
  onNavigate: (screen: ScreenType) => void;
  onCreateItem: (item: GroupBuyItem) => Promise<void>;
}

export const CreatePost: React.FC<CreatePostProps> = ({
  currentLocation,
  currentUserName,
  onNavigate,
  onCreateItem,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [category, setCategory] = useState<string>('즉석식품');
  const [subCategory, setSubCategory] = useState<string>('즉석밥/컵밥');
  const [title, setTitle] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(18000);
  const [totalMembers, setTotalMembers] = useState<number>(3);
  const [meetingPlace, setMeetingPlace] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>(INSTANT_RICE_IMAGE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetingPlaceDetail, setMeetingPlaceDetail] = useState('');
  const [isSearchingPlace, setIsSearchingPlace] = useState(false);
  const [placeSearchError, setPlaceSearchError] = useState('');

  const subCategoryMap: Record<string, string[]> = {
    즉석식품: ['즉석밥/컵밥', '컵라면', '레토르트/간편식', '통조림'],
    음료: ['생수/탄산수', '캔/병음료', '두유/팩음료'],
    간식: ['개별 포장 과자', '견과/시리얼바', '초콜릿/젤리'],
    '커피/차': ['스틱커피/티백', '캡슐커피', '원두/드립백'],
  };
  const forbiddenWords = ['신선식품', '과일', '채소', '육류', '정육', '생선', '해산물', '복숭아', '상추', '삼겹살', '딸기'];

  const pricePerPerson = Math.round(totalPrice / totalMembers);

  const searchMeetingPlace = async () => {
    if (!meetingPlace.trim()) return;

    setIsSearchingPlace(true);
    setPlaceSearchError('');

    try {
      const maps = await loadGoogleMaps();
      const geocoder = new maps.Geocoder();
      // 입력한 장소명은 현재 동네와 합쳐 검색해야 짧은 장소명도 근처 결과로 좁혀진다.
      const { results } = await geocoder.geocode({
        address: `${currentLocation} ${meetingPlace}`,
        region: 'KR',
      });
      const result = results[0];
      const location = result?.geometry?.location;

      if (!result || !location || !mapRef.current) {
        setPlaceSearchError('검색 결과가 없습니다.');
        return;
      }

      const map = mapInstanceRef.current ?? new maps.Map(mapRef.current, {
        center: defaultMapCenter,
        zoom: 16,
        disableDefaultUI: true,
        zoomControl: true,
      });
      mapInstanceRef.current = map;
      map.setCenter(location);
      map.setZoom(16);

      if (!markerRef.current) {
        markerRef.current = new maps.Marker({ map });
      }
      markerRef.current.setPosition(location);
      markerRef.current.setTitle(meetingPlace);
      setMeetingPlaceDetail(result.formatted_address ?? `${currentLocation} ${meetingPlace}`);
    } catch (error) {
      setPlaceSearchError(googleMapsErrorMessage(error));
    } finally {
      setIsSearchingPlace(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('소분 제목을 입력해주세요.');
      return;
    }
    if (forbiddenWords.some((word) => `${title} ${description}`.includes(word))) {
      alert('MVP에서는 제조사 개별 포장 상품만 등록할 수 있어요.');
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
      hostName: currentUserName,
      hostAvatar: '🌱',
      hostMannerTemp: 38.2,
      meetingPlace,
      meetingPlaceDetail: meetingPlaceDetail || `${currentLocation} 인근 안심거래 스팟`,
      description: description || '대용량으로 구매한 제조사 개별 포장 상품을 미개봉 낱개 단위로 나눕니다.',
      createdAt: '방금 전',
      deadline: '오늘 21:00',
      isLiked: false,
      status: 'recruiting',
    };

    setIsSubmitting(true);
    try {
      await onCreateItem(newItem);
      onNavigate('home');
    } catch {
      alert('모집글 등록에 실패했습니다. 백엔드 서버를 확인해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="screen-create-post" className="min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col pb-24">
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
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
            <h2 className="text-[15px] font-bold text-[#191d15] mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">category</span>
              1. 카테고리 선택
            </h2>
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
                  placeholder="예: 즉석밥 24개입 박스 같이 나눠요"
                  className="w-full h-11 px-3.5 bg-[#f7fbed] border border-[#c1c9b6] rounded-xl text-[14px] text-[#191d15] focus:outline-none focus:ring-2 focus:ring-[#316b00]"
                />
              </div>
              <div>
                <label className="text-[13px] font-semibold text-[#41493a] block mb-1">
                  대표 사진 업로드
                </label>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="representative-image"
                    className="w-24 h-24 rounded-xl overflow-hidden border border-[#c1c9b6] cursor-pointer shrink-0"
                  >
                    <img
                      src={selectedImage}
                      alt="대표 사진 미리보기"
                      className="w-full h-full object-cover"
                    />
                  </label>
                  <input
                    id="representative-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-[13px] text-[#41493a] file:mr-3 file:h-10 file:px-4 file:rounded-xl file:border-0 file:bg-[#316b00] file:text-white file:font-bold file:cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="text-[13px] font-semibold text-[#41493a] block mb-1">
                  상세 설명 및 분배 방식
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="구매처, 포장 상태, 유통기한, 나눌 수량을 적어주세요."
                  className="w-full p-3 bg-[#f7fbed] border border-[#c1c9b6] rounded-xl text-[14px] text-[#191d15] focus:outline-none focus:ring-2 focus:ring-[#316b00]"
                ></textarea>
              </div>
            </div>
          </div>
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
                <div className="flex items-center h-11 rounded-xl overflow-hidden border border-[#c1c9b6] bg-[#f7fbed]">
                  <button
                    type="button"
                    onClick={() => setTotalMembers((value) => Math.max(2, value - 1))}
                    className="w-12 h-full bg-[#f2f5e8] text-[#316b00] text-[22px] font-bold cursor-pointer"
                    aria-label="모집 인원 줄이기"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-[15px] font-bold text-[#191d15]">
                    {totalMembers}명
                  </span>
                  <button
                    type="button"
                    onClick={() => setTotalMembers((value) => Math.min(20, value + 1))}
                    className="w-12 h-full bg-[#f2f5e8] text-[#316b00] text-[22px] font-bold cursor-pointer"
                    aria-label="모집 인원 늘리기"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
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
          <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
            <h2 className="text-[15px] font-bold text-[#191d15] mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">pin_drop</span>
              4. 거래 희망 장소
            </h2>
            <input
              type="text"
              value={meetingPlace}
              onChange={(e) => {
                setMeetingPlace(e.target.value);
                setPlaceSearchError('');
              }}
              onBlur={searchMeetingPlace}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  searchMeetingPlace();
                }
              }}
              placeholder="예: 주민센터 앞"
              className="w-full h-11 px-3.5 bg-[#f7fbed] border border-[#c1c9b6] rounded-xl text-[14px] text-[#191d15] focus:outline-none focus:ring-2 focus:ring-[#316b00]"
            />
            <button
              type="button"
              onClick={searchMeetingPlace}
              disabled={isSearchingPlace || !meetingPlace.trim()}
              className="mt-2 w-full h-10 rounded-xl bg-[#f2f5e8] border border-[#c1c9b6] text-[#316b00] text-[13px] font-bold flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[18px] ${isSearchingPlace ? 'animate-spin' : ''}`}>
                {isSearchingPlace ? 'sync' : 'search'}
              </span>
              {isSearchingPlace ? '지도 검색 중...' : 'Google Map에서 장소 확인'}
            </button>

            <div className="relative h-44 bg-[#e6eadc] rounded-xl overflow-hidden mt-3 border border-[#c1c9b6]/60">
              <div ref={mapRef} className="absolute inset-0" />
              {!meetingPlaceDetail && !placeSearchError && (
                <div className="absolute inset-0 flex items-center justify-center text-[#506c00] text-[13px] font-bold">
                  거래 희망 장소를 입력하면 지도에 표시됩니다.
                </div>
              )}
              {placeSearchError && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#e2ecda] text-[#506c00] text-[13px] font-bold">
                  {placeSearchError}
                </div>
              )}
            </div>

            {meetingPlaceDetail && (
              <p className="mt-2 text-[12px] text-[#41493a] flex gap-1">
                <span className="text-[#727a69] shrink-0">검색 주소:</span>
                <span className="font-medium">{meetingPlaceDetail}</span>
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#316b00] hover:bg-[#235100] text-white font-bold text-[16px] py-4 rounded-2xl shadow-md cursor-pointer transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
          >
            <span className="material-symbols-outlined text-[22px]">check_circle</span>
            {isSubmitting ? '모집 중...' : '모집하기'}
          </button>
        </form>
      </main>
      <BottomNav currentScreen="create_post" onNavigate={onNavigate} />
    </div>
  );
};
