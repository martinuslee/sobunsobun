'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home } from '@/components/Home';
import { Landing } from '@/components/Landing';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { api, queryKeys } from '@/lib/api';
import { resolveCurrentLocation } from '@/lib/location';
import { screenPath } from '@/lib/navigation';
import { useAppStore } from '@/stores/appStore';
import { GroupBuyItem, ScreenType } from '@/types';

export function HomePage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const selectedItemRef = useRef('');
  const [showLanding, setShowLanding] = useState(true);
  const currentLocation = useAppStore((state) => state.currentLocation);
  const hasSeenLanding = useAppStore((state) => state.hasSeenLanding);
  const setCurrentLocation = useAppStore((state) => state.setCurrentLocation);
  const setCurrentCoordinates = useAppStore((state) => state.setCurrentCoordinates);
  const setCurrentUserName = useAppStore((state) => state.setCurrentUserName);
  const setHasSeenLanding = useAppStore((state) => state.setHasSeenLanding);
  const { data: items = [], isLoading } = useQuery({
    queryKey: queryKeys.items,
    queryFn: api.items,
    enabled: !showLanding,
  });

  useEffect(() => {
    const storedUserName = localStorage.getItem('sobunsobun_current_user_name') ?? sessionStorage.getItem('sobunsobun_current_user_name');
    if (storedUserName) setCurrentUserName(storedUserName);

    if (hasSeenLanding || localStorage.getItem('sobunsobun_seen_landing') === '1' || sessionStorage.getItem('sobunsobun_seen_landing') === '1') {
      setShowLanding(false);
      setHasSeenLanding(true);
    }
  }, [hasSeenLanding, setCurrentUserName, setHasSeenLanding]);

  useEffect(() => {
    if (showLanding) return;
    resolveCurrentLocation(setCurrentLocation, setCurrentCoordinates);
  }, [showLanding, setCurrentLocation, setCurrentCoordinates]);

  const enterHome = () => {
    router.push('/signup');
  };

  const toggleLike = (id: string) => {
    queryClient.setQueryData<GroupBuyItem[]>(queryKeys.items, (old = []) =>
      old.map((item) => item.id === id ? { ...item, isLiked: !item.isLiked } : item)
    );
  };
  const navigate = (screen: ScreenType) => {
    router.push(screenPath(screen, selectedItemRef.current));
    window.scrollTo(0, 0);
  };

  if (showLanding) {
    return <Landing onStart={enterHome} />;
  }
  if (isLoading) return <LoadingSkeleton />;

  return (
    <Home
      items={items}
      currentLocation={currentLocation}
      onNavigate={navigate}
      onSelectItem={(item) => {
        selectedItemRef.current = item.id;
      }}
      onToggleLike={toggleLike}
    />
  );
}
