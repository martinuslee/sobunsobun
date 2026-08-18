'use client';

import { useQueryClient } from '@tanstack/react-query';
import { CreatePost } from '@/components/CreatePost';
import { api, queryKeys } from '@/lib/api';
import { useScreenNavigation } from '@/lib/navigation';
import { useAppStore } from '@/stores/appStore';
import { GroupBuyItem } from '@/types';

export function CreatePage() {
  const queryClient = useQueryClient();
  const currentLocation = useAppStore((state) => state.currentLocation);
  const currentUserName = useAppStore((state) => state.currentUserName);
  const navigate = useScreenNavigation();

  const createItem = async (item: GroupBuyItem) => {
    const savedItem = await api.createItem(item);
    queryClient.setQueryData<GroupBuyItem[]>(queryKeys.items, (old = []) => [savedItem, ...old]);
  };

  return (
    <CreatePost
      currentLocation={currentLocation}
      currentUserName={currentUserName}
      onNavigate={navigate}
      onCreateItem={createItem}
    />
  );
}
