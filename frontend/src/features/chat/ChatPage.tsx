'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatDetail } from '@/components/ChatDetail';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { api, queryKeys } from '@/lib/api';
import { useScreenNavigation } from '@/lib/navigation';
import { ChatMessage } from '@/types';

export function ChatPage({ itemId }: { itemId: string }) {
  const queryClient = useQueryClient();
  const { data: items = [], isLoading: isLoadingItems } = useQuery({ queryKey: queryKeys.items, queryFn: api.items });
  const { data: messages = [], isLoading: isLoadingMessages } = useQuery({ queryKey: queryKeys.chatMessages, queryFn: api.chatMessages });
  const item = items.find((it) => it.id === itemId) ?? items[0];
  const navigate = useScreenNavigation(item?.id);

  if (isLoadingItems || isLoadingMessages) return <LoadingSkeleton type="chat" />;
  if (!item) return <LoadingSkeleton type="chat" />;

  const sendMessage = async (text: string) => {
    try {
      const message = await api.createChatMessage(item.id, {
        id: `msg-${Date.now()}`,
        sender: 'me',
        senderName: '나',
        text,
        time: '방금',
      });
      queryClient.setQueryData<ChatMessage[]>(queryKeys.chatMessages, (old = []) => [...old, message]);
    } catch {
      alert('메시지 전송에 실패했습니다.');
    }
  };

  return <ChatDetail item={item} messages={messages} onNavigate={navigate} onSendMessage={sendMessage} />;
}
