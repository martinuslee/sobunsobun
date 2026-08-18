import React, { useState } from 'react';
import { NotificationItem, ScreenType } from '../types';

interface NotificationScreenProps {
  notifications: NotificationItem[];
  onNavigate: (screen: ScreenType) => void;
  onMarkAllRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationScreen: React.FC<NotificationScreenProps> = ({
  notifications,
  onNavigate,
  onMarkAllRead,
  onSelectNotification,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  return (
    <div id="screen-notifications" className="min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col pb-16">
      {/* Top Header */}
      <header className="bg-[#f7fbed] border-b border-[#e0e4d7] sticky top-0 z-30 flex items-center justify-between px-4 py-3 shadow-xs">
        <button
          id="btn-notifications-back"
          type="button"
          aria-label="Go back"
          onClick={() => onNavigate('home')}
          className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer text-[#191d15] flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        <h1 className="text-[17px] font-bold text-[#191d15]">알림 센터</h1>

        <button
          type="button"
          onClick={onMarkAllRead}
          className="text-[13px] font-bold text-[#316b00] hover:underline cursor-pointer"
        >
          모두 읽음
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-3 flex flex-col gap-3">
        {/* Filter Pills */}
        <div className="flex gap-2 pb-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: '전체' },
            { id: 'group_buy', label: '공동구매' },
            { id: 'chat', label: '채팅/약속' },
            { id: 'keyword', label: '키워드 알림' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#316b00] text-white shadow-xs'
                  : 'bg-[#ffffff] border border-[#e0e4d7] text-[#41493a] hover:bg-[#f2f5e8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex flex-col gap-2.5">
          {filtered.map((item) => {
            const iconMap: Record<string, string> = {
              group_buy: 'group',
              chat: 'chat_bubble',
              keyword: 'notifications_active',
              review: 'rate_review',
            };

            return (
              <div
                key={item.id}
                onClick={() => onSelectNotification(item)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3.5 items-start ${
                  item.read
                    ? 'bg-[#ffffff] border-[#e0e4d7]'
                    : 'bg-[#f2f5e8] border-[#c6ee6b] ring-1 ring-[#c6ee6b]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.read
                      ? 'bg-[#f7fbed] text-[#727a69]'
                      : 'bg-[#316b00] text-white shadow-xs'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {iconMap[item.type] || 'notifications'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-[14px] font-bold text-[#191d15] truncate">
                      {item.title}
                    </h3>
                    <span className="text-[11px] text-[#727a69] whitespace-nowrap">
                      {item.timeAgo}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#41493a] leading-snug">{item.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
