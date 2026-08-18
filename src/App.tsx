'use client';

import React, { useState } from 'react';
import { ScreenType, GroupBuyItem, ChatMessage, NotificationItem, ReviewItem } from './types';
import { INITIAL_ITEMS, INITIAL_CHAT_MESSAGES, INITIAL_NOTIFICATIONS, INITIAL_REVIEWS } from './data/mockData';
import { HomeScreen } from './screens/HomeScreen';
import { DetailScreen } from './screens/DetailScreen';
import { JoinMapScreen } from './screens/JoinMapScreen';
import { ChatDetailScreen } from './screens/ChatDetailScreen';
import { ChatModalScreen } from './screens/ChatModalScreen';
import { CreatePostScreen } from './screens/CreatePostScreen';
import { LocationScreen } from './screens/LocationScreen';
import { NotificationScreen } from './screens/NotificationScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { ReviewWriteScreen } from './screens/ReviewWriteScreen';
import { ReviewCompleteScreen } from './screens/ReviewCompleteScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [currentLocation, setCurrentLocation] = useState<string>('역삼동');
  const [items, setItems] = useState<GroupBuyItem[]>(INITIAL_ITEMS);
  const [selectedItem, setSelectedItem] = useState<GroupBuyItem>(INITIAL_ITEMS[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);

  // Navigation Handler
  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  // Toggle Like / 찜
  const handleToggleLike = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, isLiked: !item.isLiked };
        }
        return item;
      })
    );
  };

  // Create new Group Buy post
  const handleCreateItem = (newItem: GroupBuyItem) => {
    setItems((prev) => [newItem, ...prev]);
    setSelectedItem(newItem);
  };

  // Join confirmation
  const handleConfirmJoin = (portion: number, time: string) => {
    // Add join message to chat
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      senderName: '나',
      text: `안녕하세요! ${portion}인분 소분 참여 신청했습니다. (${time} 거래 희망)`,
      time: '방금',
    };
    setChatMessages((prev) => [...prev, newMsg]);

    // Update current item members
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === selectedItem.id) {
          const updated = {
            ...it,
            currentMembers: Math.min(it.totalMembers, it.currentMembers + portion),
          };
          setSelectedItem(updated);
          return updated;
        }
        return it;
      })
    );
  };

  // Send message in Chat
  const handleSendMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      senderName: '나',
      text,
      time: '방금',
    };
    setChatMessages((prev) => [...prev, newMsg]);

    // Auto simulated response
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'other',
        senderName: selectedItem.hostName || '딸기좋아',
        avatar: selectedItem.hostAvatar || '🍓',
        text: '네 확인했습니다! 시간 맞춰 준비해서 장소로 나갈게요 😊',
        time: '방금',
      };
      setChatMessages((prev) => [...prev, replyMsg]);
    }, 1000);
  };

  // Chat attachment action
  const handleAttachAction = (actionType: string) => {
    if (actionType === 'photo') {
      const photoMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'me',
        senderName: '나',
        text: '📷 [사진 첨부] 소분용 밀폐용기와 보냉백 준비했습니다!',
        time: '방금',
      };
      setChatMessages((prev) => [...prev, photoMsg]);
    } else if (actionType === 'location') {
      const locMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'me',
        senderName: '나',
        type: 'location_proposal',
        locationInfo: {
          name: `${currentLocation} 주민센터 앞 안심거래존`,
          detail: `${currentLocation} 역 인근`,
        },
        time: '방금',
      };
      setChatMessages((prev) => [...prev, locMsg]);
    } else if (actionType === 'qr') {
      const qrMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'me',
        senderName: '나',
        text: '📱 [소분페이] 안전 결제 QR 코드가 생성되었습니다. (5,000원)',
        time: '방금',
      };
      setChatMessages((prev) => [...prev, qrMsg]);
    }
  };

  // Submit Review
  const handleSubmitReview = (newReview: ReviewItem) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // Mark all notifications read
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Select Notification
  const handleSelectNotification = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    if (notif.targetScreen) {
      handleNavigate(notif.targetScreen);
    }
  };

  return (
    <div id="sobun-app-root" className="min-h-screen bg-[#f7fbed] text-[#191d15] font-['Plus_Jakarta_Sans','Noto_Sans_KR',sans-serif] selection:bg-[#c6ee6b] selection:text-[#214c00]">
      {currentScreen === 'home' && (
        <HomeScreen
          items={items}
          currentLocation={currentLocation}
          onNavigate={handleNavigate}
          onSelectItem={(item) => setSelectedItem(item)}
          onToggleLike={handleToggleLike}
        />
      )}

      {currentScreen === 'detail' && (
        <DetailScreen
          item={selectedItem}
          onNavigate={handleNavigate}
          onToggleLike={handleToggleLike}
        />
      )}

      {currentScreen === 'join_map' && (
        <JoinMapScreen
          item={selectedItem}
          onNavigate={handleNavigate}
          onConfirmJoin={handleConfirmJoin}
        />
      )}

      {currentScreen === 'chat_detail' && (
        <ChatDetailScreen
          item={selectedItem}
          messages={chatMessages}
          onNavigate={handleNavigate}
          onSendMessage={handleSendMessage}
        />
      )}

      {currentScreen === 'chat_modal' && (
        <ChatModalScreen
          item={selectedItem}
          messages={chatMessages}
          onNavigate={handleNavigate}
          onAttachAction={handleAttachAction}
        />
      )}

      {currentScreen === 'create_post' && (
        <CreatePostScreen
          currentLocation={currentLocation}
          onNavigate={handleNavigate}
          onCreateItem={handleCreateItem}
        />
      )}

      {currentScreen === 'location_setting' && (
        <LocationScreen
          currentLocation={currentLocation}
          onSelectLocation={(loc) => setCurrentLocation(loc)}
          onNavigate={handleNavigate}
        />
      )}

      {currentScreen === 'notifications' && (
        <NotificationScreen
          notifications={notifications}
          onNavigate={handleNavigate}
          onMarkAllRead={handleMarkAllRead}
          onSelectNotification={handleSelectNotification}
        />
      )}

      {currentScreen === 'history' && (
        <HistoryScreen
          items={items}
          onNavigate={handleNavigate}
          onSelectItem={(item) => setSelectedItem(item)}
        />
      )}

      {currentScreen === 'review_write' && (
        <ReviewWriteScreen
          onNavigate={handleNavigate}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {currentScreen === 'review_complete' && (
        <ReviewCompleteScreen onNavigate={handleNavigate} />
      )}
    </div>
  );
}
