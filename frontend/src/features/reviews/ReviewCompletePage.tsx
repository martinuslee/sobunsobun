'use client';

import { ReviewComplete } from '@/components/ReviewComplete';
import { useScreenNavigation } from '@/lib/navigation';

export function ReviewCompletePage() {
  const navigate = useScreenNavigation();
  return <ReviewComplete onNavigate={navigate} />;
}
