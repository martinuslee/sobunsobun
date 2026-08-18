'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ReviewWrite } from '@/components/ReviewWrite';
import { api, queryKeys } from '@/lib/api';
import { useScreenNavigation } from '@/lib/navigation';
import { ReviewItem } from '@/types';

export function ReviewWritePage() {
  const queryClient = useQueryClient();
  const navigate = useScreenNavigation();

  const submitReview = async (review: ReviewItem) => {
    try {
      const savedReview = await api.createReview(review);
      queryClient.setQueryData<ReviewItem[]>(queryKeys.reviews, (old = []) => [savedReview, ...old]);
    } catch {
      alert('후기 등록에 실패했습니다.');
      throw new Error('review failed');
    }
  };

  return <ReviewWrite onNavigate={navigate} onSubmitReview={submitReview} />;
}
