'use client';

import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { History } from '@/components/History';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { api, queryKeys } from '@/lib/api';
import { screenPath } from '@/lib/navigation';
import { useAppStore } from '@/stores/appStore';
import { ScreenType } from '@/types';

export function HistoryPage() {
  const router = useRouter();
  const selectedItemRef = useRef('');
  const currentLocation = useAppStore((state) => state.currentLocation);
  const setCurrentUserName = useAppStore((state) => state.setCurrentUserName);
  const setHasSeenLanding = useAppStore((state) => state.setHasSeenLanding);
  const { data: items = [], isLoading } = useQuery({ queryKey: queryKeys.items, queryFn: api.items });
  const navigate = (screen: ScreenType) => {
    router.push(screenPath(screen, selectedItemRef.current));
    window.scrollTo(0, 0);
  };
  const logout = () => {
    localStorage.removeItem('sobunsobun_current_user_name');
    localStorage.removeItem('sobunsobun_seen_landing');
    sessionStorage.removeItem('sobunsobun_current_user_name');
    sessionStorage.removeItem('sobunsobun_seen_landing');
    setCurrentUserName('');
    setHasSeenLanding(false);
    router.push('/login');
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <History
      items={items}
      currentLocation={currentLocation}
      onNavigate={navigate}
      onSelectItem={(item) => {
        selectedItemRef.current = item.id;
      }}
      onLogout={logout}
    />
  );
}
