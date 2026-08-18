import React from 'react';
import { GroupBuyItem, ChatMessage, ScreenType } from '../types';

interface ChatModalScreenProps {
  item: GroupBuyItem;
  messages: ChatMessage[];
  onNavigate: (screen: ScreenType) => void;
  onAttachAction: (actionType: string) => void;
}

export const ChatModalScreen: React.FC<ChatModalScreenProps> = ({
  item,
  messages,
  onNavigate,
  onAttachAction,
}) => {
  return (
    <div id="screen-chat-modal" className="relative min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <header className="bg-[#f7fbed] border-b border-[#e0e4d7] sticky top-0 z-30 flex items-center justify-between px-4 py-3">
        <button
          id="btn-chat-modal-back"
          type="button"
          aria-label="뒤로 가기"
          onClick={() => onNavigate('join_map')}
          className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer text-[#191d15] flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </button>

        <div className="flex flex-col items-center">
          <h1 className="text-[18px] font-bold text-[#316b00]">
            {item.hostName || '딸기좋아'}
          </h1>
        </div>

        <div className="flex items-center gap-1 text-[#316b00]">
          <button
            type="button"
            aria-label="전화 걸기"
            className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">call</span>
          </button>
          <button
            type="button"
            aria-label="더보기"
            className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">more_vert</span>
          </button>
        </div>
      </header>

      {/* Main Chat Background content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-3 flex flex-col gap-3 opacity-60">
        {/* Pinned Product Card */}
        <div className="bg-[#ffffff] rounded-2xl p-3 border border-[#e0e4d7] flex items-center gap-3 shadow-xs">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-14 h-14 rounded-xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[11px] font-bold text-[#316b00] bg-[#c6ee6b] px-2 py-0.5 rounded-full">
                모집중
              </span>
              <span className="text-[14px] font-bold text-[#191d15] truncate">
                {item.title}
              </span>
            </div>
            <div className="flex items-baseline gap-1 text-[13px]">
              <span className="font-extrabold text-[#316b00]">
                {item.pricePerPerson.toLocaleString()}원
              </span>
              <span className="text-[#727a69]">/ {item.unit}</span>
            </div>
          </div>
        </div>

        {/* Date Divider */}
        <div className="flex items-center justify-center my-2">
          <span className="bg-[#e6eadc] text-[#41493a] text-[12px] font-semibold px-4 py-1.5 rounded-full">
            2023년 10월 26일 목요일
          </span>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-4">
          {messages.map((msg) => {
            const isMe = msg.sender === 'me';
            if (msg.type === 'location_proposal') {
              return (
                <div
                  key={msg.id}
                  className="bg-[#e0e4d7]/70 border border-[#c1c9b6] rounded-2xl p-3.5 flex items-center gap-3 my-1"
                >
                  <span className="material-symbols-outlined text-[#316b00] text-[24px]">location_on</span>
                  <p className="text-[13px] text-[#191d15]">
                    거래 장소가 <strong className="font-bold text-[#316b00]">{msg.locationInfo?.name || '우리은행 마두지점'}</strong>으로 제안되었습니다.
                  </p>
                </div>
              );
            }
            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <div className="w-9 h-9 rounded-full bg-[#f2f5e8] border border-[#c1c9b6] flex items-center justify-center text-[18px]">
                    {msg.avatar || '🍓'}
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl text-[14px] leading-relaxed ${
                    isMe ? 'bg-[#316b00] text-white' : 'bg-[#e0e4d7] text-[#191d15]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Dimmed Modal Backdrop (Dismisses to chat_detail on click) */}
      <div
        id="modal-backdrop"
        role="button"
        tabIndex={0}
        aria-label="닫기"
        onClick={() => onNavigate('chat_detail')}
        className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-40 transition-opacity"
      ></div>

      {/* Bottom Sheet Modal matching Image 7.png */}
      <div className="fixed bottom-0 left-0 w-full bg-[#ffffff] rounded-t-[32px] p-6 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom duration-200">
        {/* Handle Bar */}
        <div className="w-12 h-1.5 bg-[#c1c9b6] rounded-full mx-auto mb-6"></div>

        {/* 3 Action Buttons */}
        <div className="max-w-md mx-auto grid grid-cols-3 gap-4 pb-4">
          {/* 1. 사진 첨부 */}
          <button
            type="button"
            onClick={() => {
              onAttachAction('photo');
              onNavigate('chat_detail');
            }}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-18 h-18 rounded-2xl bg-[#e6eadc] text-[#316b00] flex items-center justify-center group-hover:bg-[#d0dec9] transition-all group-active:scale-95 shadow-xs">
              <span className="material-symbols-outlined text-[32px]">photo_camera</span>
            </div>
            <span className="text-[14px] font-semibold text-[#191d15]">사진 첨부</span>
          </button>

          {/* 2. 위치 공유 */}
          <button
            type="button"
            onClick={() => {
              onAttachAction('location');
              onNavigate('chat_detail');
            }}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-18 h-18 rounded-2xl bg-[#e6eadc] text-[#316b00] flex items-center justify-center group-hover:bg-[#d0dec9] transition-all group-active:scale-95 shadow-xs">
              <span className="material-symbols-outlined text-[32px]">location_on</span>
            </div>
            <span className="text-[14px] font-semibold text-[#191d15]">위치 공유</span>
          </button>

          {/* 3. 결제 QR */}
          <button
            type="button"
            onClick={() => {
              onAttachAction('qr');
              onNavigate('chat_detail');
            }}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-18 h-18 rounded-2xl bg-[#e6eadc] text-[#316b00] flex items-center justify-center group-hover:bg-[#d0dec9] transition-all group-active:scale-95 shadow-xs">
              <span className="material-symbols-outlined text-[32px]">qr_code_2</span>
            </div>
            <span className="text-[14px] font-semibold text-[#191d15]">결제 QR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
