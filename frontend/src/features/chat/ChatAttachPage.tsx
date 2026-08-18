'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatAttach } from '@/components/ChatAttach';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { api, queryKeys } from '@/lib/api';
import { useScreenNavigation } from '@/lib/navigation';
import { useAppStore } from '@/stores/appStore';
import { ChatMessage } from '@/types';

export function ChatAttachPage({ itemId }: { itemId: string }) {
  const queryClient = useQueryClient();
  const currentLocation = useAppStore((state) => state.currentLocation);
  const { data: items = [], isLoading: isLoadingItems } = useQuery({ queryKey: queryKeys.items, queryFn: api.items });
  const { data: messages = [], isLoading: isLoadingMessages } = useQuery({ queryKey: queryKeys.chatMessages, queryFn: api.chatMessages });
  const item = items.find((it) => it.id === itemId) ?? items[0];
  const navigate = useScreenNavigation(item?.id);

  if (isLoadingItems || isLoadingMessages) return <LoadingSkeleton type="chat" />;
  if (!item) return <LoadingSkeleton type="chat" />;

  const attach = async (actionType: string) => {
    const message: ChatMessage = actionType === 'location'
      ? {
          id: `msg-${Date.now()}`,
          sender: 'me',
          senderName: '나',
          type: 'location_proposal',
          locationInfo: { name: `${currentLocation} 주민센터 앞 안심거래존`, detail: `${currentLocation} 역 인근` },
          time: '방금',
        }
      : {
          id: `msg-${Date.now()}`,
          sender: 'me',
          senderName: '나',
          text: actionType === 'qr'
            ? '📱 [소분페이] 안전 결제 QR 코드가 생성되었습니다. (5,000원)'
            : '📷 [사진 첨부] 상품 수량 확인 사진을 첨부했습니다!',
          time: '방금',
        };

    try {
      const savedMessage = await api.createChatMessage(item.id, message);
      queryClient.setQueryData<ChatMessage[]>(queryKeys.chatMessages, (old = []) => [...old, savedMessage]);
    } catch {
      alert('첨부 메시지 전송에 실패했습니다.');
    }
  };

  return <ChatAttach item={item} messages={messages} onNavigate={navigate} onAttachAction={attach} />;
}
