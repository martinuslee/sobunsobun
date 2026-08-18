import { useRouter } from 'next/navigation';
import { ScreenType } from '@/types';

export function screenPath(screen: ScreenType, itemId?: string) {
  return {
    home: '/',
    detail: itemId ? `/posts/${itemId}` : '/',
    join_map: itemId ? `/join/${itemId}` : '/',
    chat_detail: itemId ? `/chat/${itemId}` : '/',
    chat_modal: itemId ? `/chat/${itemId}/attach` : '/',
    create_post: '/create',
    location_setting: '/location',
    notifications: '/notifications',
    history: '/history',
    review_write: '/reviews/write',
    review_complete: '/reviews/complete',
  }[screen];
}

export function useScreenNavigation(itemId?: string) {
  const router = useRouter();

  return (screen: ScreenType) => {
    router.push(screenPath(screen, itemId));
    window.scrollTo(0, 0);
  };
}
