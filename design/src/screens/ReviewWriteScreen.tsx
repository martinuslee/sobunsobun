import React, { useState } from 'react';
import { ScreenType, ReviewItem } from '../types';
import { LETTUCE_IMAGE } from '../assets/productImages';

interface ReviewWriteScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSubmitReview: (review: ReviewItem) => void;
}

export const ReviewWriteScreen: React.FC<ReviewWriteScreenProps> = ({
  onNavigate,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    '신선도가 사진과 같아요',
    '약속 시간을 잘 지켜요',
    '포장이 꼼꼼해요',
  ]);
  const [comment, setComment] = useState<string>(
    '소분해주신 상추가 마트보다 훨씬 신선하고 지퍼백에 깔끔하게 담아주셔서 감동했어요! 덕분에 건강한 한 끼 맛있게 먹었습니다 :)'
  );

  const availableTags = [
    '신선도가 사진과 같아요',
    '약속 시간을 잘 지켜요',
    '친절하고 매너가 좋아요',
    '포장이 꼼꼼해요',
    '답장이 빠르고 정확해요',
    '가격이 매우 합리적이에요',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      itemId: 'veggie-1',
      itemTitle: '자연그대로 친환경 상추 500g 소분',
      hostName: '샐러드러버',
      rating,
      tags: selectedTags,
      comment,
      createdAt: '2023.10.26',
    };

    onSubmitReview(newReview);
    onNavigate('review_complete');
  };

  return (
    <div id="screen-review-write" className="min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col pb-28">
      {/* Top Header */}
      <header className="bg-[#f7fbed] border-b border-[#e0e4d7] sticky top-0 z-30 flex items-center justify-between px-4 py-3 shadow-xs">
        <button
          id="btn-review-write-back"
          type="button"
          aria-label="뒤로 가기"
          onClick={() => onNavigate('history')}
          className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer text-[#191d15] flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        <h1 className="text-[17px] font-bold text-[#191d15]">따뜻한 소분 후기 작성</h1>

        <div className="w-10"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Target Item Summary */}
          <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e0e4d7] shadow-xs flex items-center gap-3.5">
            <img
              src={LETTUCE_IMAGE}
              alt="친환경 상추"
              className="w-16 h-16 rounded-xl object-cover bg-white"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-[#506c00] bg-[#e6eadc] px-2 py-0.5 rounded-md">
                소분 완료
              </span>
              <h2 className="text-[15px] font-bold text-[#191d15] truncate mt-1">
                자연그대로 친환경 상추 500g 소분
              </h2>
              <p className="text-[12px] text-[#727a69]">
                호스트: 샐러드러버 · 역삼역 3번 출구
              </p>
            </div>
          </div>

          {/* Star Rating Section */}
          <div className="bg-[#ffffff] rounded-2xl p-6 border border-[#e0e4d7] shadow-xs flex flex-col items-center justify-center text-center">
            <h3 className="text-[16px] font-bold text-[#191d15] mb-1">
              이웃과의 소분 경험은 어떠셨나요?
            </h3>
            <p className="text-[12px] text-[#727a69] mb-4">
              별점을 주시면 이웃의 매너온도에 반영됩니다.
            </p>

            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                >
                  <span
                    className={`material-symbols-outlined text-[36px] ${
                      star <= rating ? 'text-[#ffb703] fill-1' : 'text-[#d8dccf]'
                    }`}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>

            <span className="text-[14px] font-bold text-[#316b00]">
              {rating === 5 && '최고였어요! 적극 추천해요 😊'}
              {rating === 4 && '만족스러웠어요 👍'}
              {rating === 3 && '보통이었어요'}
              {rating <= 2 && '조금 아쉬웠어요'}
            </span>
          </div>

          {/* Compliment Tags */}
          <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
            <h3 className="text-[15px] font-bold text-[#191d15] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">thumb_up</span>
              어떤 점이 특히 좋으셨나요? (선택)
            </h3>
            <p className="text-[12px] text-[#727a69] mb-3">
              이웃에게 남길 칭찬 키워드를 선택해주세요.
            </p>

            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#c6ee6b] border border-[#316b00] text-[#214c00] font-bold shadow-2xs'
                        : 'bg-[#f7fbed] border border-[#e0e4d7] text-[#41493a] hover:bg-[#e6eadc]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Written Comment */}
          <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e0e4d7] shadow-xs">
            <h3 className="text-[15px] font-bold text-[#191d15] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#316b00] text-[20px]">rate_review</span>
              따뜻한 한 줄 후기
            </h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="이웃에게 힘이 되는 따뜻한 후기를 남겨주세요."
              className="w-full p-3.5 bg-[#f7fbed] border border-[#c1c9b6] rounded-xl text-[14px] text-[#191d15] focus:outline-none focus:ring-2 focus:ring-[#316b00] leading-relaxed"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            id="btn-submit-review"
            type="submit"
            className="w-full bg-[#316b00] hover:bg-[#235100] text-white font-bold text-[16px] py-4 rounded-2xl shadow-md cursor-pointer transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
          >
            <span className="material-symbols-outlined text-[22px]">send</span>
            <span>후기 등록하기</span>
          </button>
        </form>
      </main>
    </div>
  );
};
