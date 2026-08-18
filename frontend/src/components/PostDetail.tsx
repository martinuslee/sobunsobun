import React, { useEffect, useRef, useState } from 'react';
import { GroupBuyItem, ScreenType } from '@/types';
import { BottomNav } from './BottomNav';
import { defaultMapCenter, googleMapsErrorMessage, loadGoogleMaps } from '@/lib/googleMaps';

interface PostDetailProps {
  item: GroupBuyItem;
  canDelete: boolean;
  onNavigate: (screen: ScreenType) => void;
  onToggleLike: (id: string) => void;
  onDelete: () => Promise<void>;
}

export const PostDetail: React.FC<PostDetailProps> = ({
  item,
  canDelete,
  onNavigate,
  onToggleLike,
  onDelete,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mapError, setMapError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = Math.round((item.currentMembers / item.totalMembers) * 100);
  const remainingMembers = item.totalMembers - item.currentMembers;

  const handleDelete = async () => {
    if (!confirm('이 모집글을 삭제할까요?')) return;

    setIsDeleting(true);
    try {
      await onDelete();
    } catch {
      alert('삭제할 수 없습니다. 내가 등록한 모집글인지 확인해주세요.');
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps()
      .then((maps) => {
        if (cancelled || !mapRef.current) return;
        const map = new maps.Map(mapRef.current, {
          center: defaultMapCenter,
          zoom: 16,
          disableDefaultUI: true,
          zoomControl: true,
        });

        new maps.Marker({
          map,
          position: defaultMapCenter,
          title: item.meetingPlace,
        });
      })
      .catch((error) => setMapError(googleMapsErrorMessage(error)));

    return () => {
      cancelled = true;
    };
  }, [item.meetingPlace]);

  return (
    <div id="screen-detail" className="min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col pb-36">
      <header className="bg-[#f7fbed]/90 backdrop-blur-md border-b border-[#e0e4d7]/60 sticky top-0 z-30 flex items-center justify-between px-4 py-3">
        <button
          id="btn-detail-back"
          type="button"
          aria-label="Go back"
          onClick={() => onNavigate('home')}
          className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer text-[#191d15] flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        <h1 className="text-[17px] font-bold text-[#191d15] max-w-[200px] truncate">
          소분 상세 정보
        </h1>

        <div className="flex items-center gap-1">
          {canDelete && (
            <button
              type="button"
              aria-label="삭제하기"
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 rounded-full hover:bg-[#e6eadc] disabled:opacity-50 transition-colors cursor-pointer text-[#ba1a1a]"
            >
              <span className="material-symbols-outlined text-[22px]">delete</span>
            </button>
          )}
          <button
            type="button"
            aria-label="공유하기"
            onClick={() => setShowShareModal(true)}
            className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer text-[#191d15]"
          >
            <span className="material-symbols-outlined text-[22px]">share</span>
          </button>
          <button
            type="button"
            aria-label="찜하기"
            onClick={() => onToggleLike(item.id)}
            className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer"
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                item.isLiked ? 'text-[#ff4081] fill-1' : 'text-[#191d15]'
              }`}
            >
              favorite
            </span>
          </button>
        </div>
      </header>
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pt-3">
        <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden shadow-sm bg-[#e6eadc] mb-4">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {item.urgent && (
            <div className="absolute top-3 left-3 bg-[#c6ee6b] text-[#506c00] font-bold px-3 py-1 rounded-full text-[13px] shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              마감 임박
            </div>
          )}
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-xs text-white text-[12px] font-medium px-2.5 py-1 rounded-full">
            {item.category} &gt; {item.subCategory || '상품'}
          </div>
        </div>
        <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e0e4d7] mb-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#f2f5e8] border border-[#c1c9b6] flex items-center justify-center text-[22px]">
              {item.hostAvatar || '🌱'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[16px] text-[#191d15]">{item.hostName}</span>
                <span className="bg-[#e6eadc] text-[#316b00] text-[11px] font-bold px-2 py-0.5 rounded-md">
                  호스트
                </span>
              </div>
              <p className="text-[13px] text-[#727a69]">{item.location} · 거래 12회 완료</p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1">
              <span className="text-[15px] font-bold text-[#316b00]">{item.hostMannerTemp}°C</span>
              <span className="text-[16px]">😊</span>
            </div>
            <div className="w-16 h-1.5 bg-[#ecefe2] rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[#316b00] rounded-full"
                style={{ width: `${Math.min(100, (item.hostMannerTemp / 50) * 100)}%` }}
              ></div>
            </div>
            <span className="text-[11px] text-[#727a69]">매너온도</span>
          </div>
        </div>
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] mb-4 shadow-xs">
          <h2 className="text-[20px] font-bold text-[#191d15] mb-2">{item.title}</h2>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[26px] font-extrabold text-[#316b00]">
              {item.pricePerPerson.toLocaleString()}원
            </span>
            <span className="text-[14px] text-[#727a69]">/ 1인당 분담금 ({item.unit})</span>
          </div>
          <div className="bg-[#f2f5e8] rounded-xl p-3.5 border border-[#e0e4d7]/60">
            <div className="flex justify-between items-center text-[13px] mb-2">
              <span className="font-semibold text-[#4c6700]">
                모집 현황: {item.currentMembers} / {item.totalMembers}명 ({progressPercent}%)
              </span>
              <span className="font-bold text-[#ba1a1a]">
                {remainingMembers > 0 ? `${remainingMembers}자리 남음!` : '모집 완료'}
              </span>
            </div>
            <div className="w-full h-3 bg-[#e0e4d7] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#316b00] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[12px] text-[#727a69] mt-2">
              <span>총 구매가 {item.totalPrice.toLocaleString()}원</span>
              <span>마감 기한: {item.deadline}</span>
            </div>
          </div>
        </div>
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] mb-4 shadow-xs">
          <h3 className="text-[16px] font-bold text-[#191d15] mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#316b00] text-[20px]">description</span>
            소분 상세 내용
          </h3>
          <p className="text-[14px] text-[#41493a] leading-relaxed whitespace-pre-line">
            {item.description}
          </p>

          <div className="mt-4 pt-4 border-t border-[#e0e4d7]/80 grid grid-cols-2 gap-3 text-[13px]">
            <div className="bg-[#f7fbed] p-2.5 rounded-xl">
              <span className="text-[#727a69] block mb-0.5">소분 방식</span>
              <span className="font-semibold text-[#191d15]">제조사 개별 포장 단위 전달</span>
            </div>
            <div className="bg-[#f7fbed] p-2.5 rounded-xl">
              <span className="text-[#727a69] block mb-0.5">결제 방식</span>
              <span className="font-semibold text-[#191d15]">소분페이 / 현장 이체</span>
            </div>
          </div>
        </div>
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] mb-4 shadow-xs">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[16px] font-bold text-[#191d15] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">location_on</span>
              거래 희망 장소
            </h3>
            <span className="text-[12px] bg-[#c6ee6b] text-[#506c00] font-bold px-2 py-0.5 rounded-md">
              안전거래장소
            </span>
          </div>

          <div className="relative h-44 bg-[#e6eadc] rounded-xl overflow-hidden mb-3 border border-[#c1c9b6]/60">
            <div ref={mapRef} className="absolute inset-0" />
            {mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#e2ecda] text-[#506c00] text-[13px] font-bold">
                {mapError}
              </div>
            )}
            <div className="absolute bottom-3 left-3 right-3 z-10 bg-white/90 backdrop-blur-xs border border-[#e0e4d7] px-3 py-2 rounded-xl shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">pin_drop</span>
              <span className="text-[13px] font-bold text-[#191d15] truncate">{item.meetingPlace}</span>
            </div>
          </div>

          <p className="text-[13px] text-[#41493a] flex items-center gap-1">
            <span className="text-[#727a69]">상세:</span>
            <span className="font-medium">{item.meetingPlaceDetail}</span>
          </p>
        </div>
      </main>
      <div className="fixed bottom-16 left-0 w-full bg-[#ffffff] border-t border-[#e0e4d7] p-3 z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToggleLike(item.id)}
            className="p-3 rounded-2xl border border-[#e0e4d7] bg-[#f7fbed] hover:bg-[#e6eadc] text-[#191d15] flex items-center justify-center cursor-pointer transition-colors"
          >
            <span
              className={`material-symbols-outlined text-[24px] ${
                item.isLiked ? 'text-[#ff4081] fill-1' : 'text-[#41493a]'
              }`}
            >
              favorite
            </span>
          </button>
          <button
            id="btn-join-group-buy"
            type="button"
            onClick={() => onNavigate('join_map')}
            className="flex-1 bg-[#316b00] hover:bg-[#235100] active:scale-[0.99] text-[#ffffff] text-[16px] font-bold py-3.5 px-6 rounded-2xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">group_add</span>
            <span>소분하기 ({item.pricePerPerson.toLocaleString()}원)</span>
          </button>
        </div>
      </div>
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[#ffffff] w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-[#e0e4d7] animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[18px] font-bold text-[#191d15]">이웃에게 공유하기</h3>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="p-1 text-[#727a69] hover:text-[#191d15]"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <p className="text-[13px] text-[#41493a] mb-5">
              주변 이웃에게 링크를 전달하여 더 빠르게 소분을 완료해보세요!
            </p>

            <div className="grid grid-cols-4 gap-3 mb-5">
              <button
                type="button"
                onClick={() => {
                  alert('카카오톡 공유가 준비되었습니다.');
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-1.5 cursor-pointer"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#fee500] flex items-center justify-center text-[22px] font-bold text-[#3c1e1e] shadow-xs">
                  💬
                </div>
                <span className="text-[12px] text-[#41493a]">카카오톡</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-1.5 cursor-pointer"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#f2f5e8] border border-[#c1c9b6] flex items-center justify-center text-[#316b00] shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">link</span>
                </div>
                <span className="text-[12px] text-[#41493a]">{copied ? '복사됨!' : '링크 복사'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  alert('당근마켓 동네생활 공유창으로 이동합니다.');
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-1.5 cursor-pointer"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#ff6f0f] text-white flex items-center justify-center text-[22px] font-bold shadow-xs">
                  🥕
                </div>
                <span className="text-[12px] text-[#41493a]">동네생활</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  alert('소분 QR코드가 생성되었습니다.');
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-1.5 cursor-pointer"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#f2f5e8] border border-[#c1c9b6] flex items-center justify-center text-[#316b00] shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
                </div>
                <span className="text-[12px] text-[#41493a]">QR 코드</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowShareModal(false)}
              className="w-full bg-[#f2f5e8] text-[#316b00] font-bold py-3 rounded-xl hover:bg-[#e6eadc] transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <BottomNav currentScreen="detail" onNavigate={onNavigate} />
    </div>
  );
};
