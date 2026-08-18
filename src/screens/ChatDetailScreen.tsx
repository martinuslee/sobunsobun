import React, { useState } from 'react';
import { ChatMessage, ScreenType, GroupBuyItem } from '../types';

interface ChatDetailScreenProps {
  item: GroupBuyItem;
  messages: ChatMessage[];
  onNavigate: (screen: ScreenType) => void;
  onSendMessage: (text: string) => void;
}

export const ChatDetailScreen: React.FC<ChatDetailScreenProps> = ({
  item,
  messages,
  onNavigate,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div id="screen-chat-detail" className="min-h-screen bg-[#f7fbed] text-[#191d15] flex flex-col justify-between">
      {/* Top Header */}
      <header className="bg-[#f7fbed] border-b border-[#e0e4d7] sticky top-0 z-30 flex items-center justify-between px-4 py-3 shadow-xs">
        <button
          id="btn-chat-back"
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
            onClick={() => alert('안심번호 통화 연결을 준비합니다.')}
            className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">call</span>
          </button>
          <button
            type="button"
            aria-label="더보기"
            onClick={() => alert('채팅방 설정: 알림 끄기, 차단하기, 신고하기')}
            className="p-2 rounded-full hover:bg-[#e6eadc] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">more_vert</span>
          </button>
        </div>
      </header>

      {/* Main Chat Scroll View */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-3 flex flex-col gap-3 overflow-y-auto">
        {/* Pinned Product Card */}
        <div
          id="chat-pinned-product"
          onClick={() => onNavigate('detail')}
          className="bg-[#ffffff] rounded-2xl p-3 border border-[#e0e4d7] flex items-center gap-3 shadow-xs cursor-pointer hover:bg-[#fafdf5] transition-colors"
        >
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
          <span className="material-symbols-outlined text-[#727a69] text-[20px]">chevron_right</span>
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
                  <div className="flex-1">
                    <p className="text-[13px] text-[#191d15]">
                      거래 장소가 <strong className="font-bold text-[#316b00]">{msg.locationInfo?.name || '우리은행 마두지점'}</strong>으로 제안되었습니다.
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <div className="w-9 h-9 rounded-full bg-[#f2f5e8] border border-[#c1c9b6] flex items-center justify-center text-[18px] mb-1">
                    {msg.avatar || '🍓'}
                  </div>
                )}

                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                  {!isMe && (
                    <span className="text-[12px] text-[#727a69] font-medium mb-1 pl-1">
                      {msg.senderName}
                    </span>
                  )}
                  <div
                    className={`p-3.5 rounded-2xl text-[14px] leading-relaxed shadow-2xs ${
                      isMe
                        ? 'bg-[#316b00] text-white rounded-br-xs'
                        : 'bg-[#e0e4d7] text-[#191d15] rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                <span className="text-[11px] text-[#727a69] mb-1">{msg.time}</span>
              </div>
            );
          })}
        </div>
      </main>

      {/* Chat Input Bar matching screenshot Image 17.png */}
      <div className="sticky bottom-0 bg-[#f7fbed] border-t border-[#e0e4d7] p-3 z-30">
        <form onSubmit={handleSend} className="max-w-2xl mx-auto flex items-center gap-2">
          {/* Plus button to open modal attachment sheet */}
          <button
            id="btn-chat-attach"
            type="button"
            aria-label="첨부 메뉴 열기"
            onClick={() => onNavigate('chat_modal')}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#41493a] hover:bg-[#e6eadc] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[28px]">add_circle_outline</span>
          </button>

          {/* Text Input */}
          <input
            id="chat-message-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="메시지를 입력하세요"
            className="flex-1 h-11 px-4 bg-[#e6eadc] border-none rounded-full text-[14px] text-[#191d15] placeholder:text-[#727a69] focus:outline-none focus:ring-2 focus:ring-[#316b00]"
          />

          {/* Send Button */}
          <button
            id="btn-chat-send"
            type="submit"
            aria-label="전송"
            disabled={!inputText.trim()}
            className="w-11 h-11 bg-[#316b00] disabled:bg-[#a0b593] text-white rounded-full flex items-center justify-center hover:bg-[#235100] transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
