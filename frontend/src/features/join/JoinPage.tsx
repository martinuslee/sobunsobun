'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { JoinMap } from '@/components/JoinMap';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { api, queryKeys } from '@/lib/api';
import { useScreenNavigation } from '@/lib/navigation';
import { ChatMessage, GroupBuyItem } from '@/types';

export function JoinPage({ itemId }: { itemId: string }) {
  const queryClient = useQueryClient();
  const { data: items = [], isLoading } = useQuery({ queryKey: queryKeys.items, queryFn: api.items });
  const item = items.find((it) => it.id === itemId) ?? items[0];
  const navigate = useScreenNavigation(item?.id);

  if (isLoading) return <LoadingSkeleton type="detail" />;
  if (!item) return <LoadingSkeleton type="detail" />;

  const confirmJoin = async (portion: number, time: string) => {
    try {
      const message = await api.createChatMessage(item.id, {
        id: `msg-${Date.now()}`,
        sender: 'me',
        senderName: '나',
        text: `안녕하세요! ${portion}인분 소분 참여 신청했습니다. (${time} 거래 희망)`,
        time: '방금',
      });
      const currentMembers = Math.min(item.totalMembers, item.currentMembers + portion);
      const updatedItem = await api.updateItem(item.id, { currentMembers });

      queryClient.setQueryData<ChatMessage[]>(queryKeys.chatMessages, (old = []) => [...old, message]);
      queryClient.setQueryData<GroupBuyItem[]>(queryKeys.items, (old = []) =>
        old.map((it) => it.id === item.id ? updatedItem : it)
      );
    } catch {
      alert('소분 참여 처리에 실패했습니다.');
      throw new Error('join failed');
    }
  };

  return <JoinMap item={item} onNavigate={navigate} onConfirmJoin={confirmJoin} />;
}
