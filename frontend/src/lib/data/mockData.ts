import { GroupBuyItem, ChatMessage, NotificationItem, ReviewItem } from '@/types';
import { COFFEE_STICK_IMAGE, CUP_NOODLE_IMAGE, INSTANT_RICE_IMAGE, SPARKLING_WATER_IMAGE } from '../assets/productImages';

export const INITIAL_ITEMS: GroupBuyItem[] = [
  {
    id: 'rice-1',
    title: '즉석밥 24개입 박스 나눠요',
    category: '즉석식품',
    subCategory: '즉석밥/컵밥',
    location: '역삼1동',
    distance: '500m',
    pricePerPerson: 11000,
    totalPrice: 33000,
    totalMembers: 3,
    currentMembers: 2,
    unit: '1인 (8개)',
    imageUrl: INSTANT_RICE_IMAGE,
    urgent: true,
    hostName: '밥친구',
    hostAvatar: '🍚',
    hostMannerTemp: 37.8,
    meetingPlace: '역삼1동 주민센터 앞',
    meetingPlaceDetail: '강남구 역삼로 123',
    description: '제조사 개별 포장된 즉석밥 24개입 박스를 구매했습니다. 미개봉 낱개 단위로 8개씩 나눕니다. 오늘 오후 5시~7시 사이에 전달 가능합니다.',
    createdAt: '10분 전',
    deadline: '오늘 18:00',
    isLiked: false,
    status: 'recruiting',
  },
  {
    id: 'noodle-1',
    title: '컵라면 12개입 박스 같이 나눠요',
    category: '즉석식품',
    subCategory: '컵라면',
    location: '역삼2동',
    distance: '1.2km',
    pricePerPerson: 4500,
    totalPrice: 18000,
    totalMembers: 4,
    currentMembers: 2,
    unit: '1인 (3개)',
    imageUrl: CUP_NOODLE_IMAGE,
    urgent: false,
    hostName: '면모임',
    hostAvatar: '🍜',
    hostMannerTemp: 39.1,
    meetingPlace: '역삼역 3번 출구',
    meetingPlaceDetail: '강남구 테헤란로 152',
    description: '컵라면 12개입 박스를 샀는데 혼자 먹기엔 많아서 나눕니다. 제조사 포장 그대로 3개씩 전달합니다.',
    createdAt: '30분 전',
    deadline: '오늘 20:00',
    isLiked: true,
    status: 'recruiting',
  },
  {
    id: 'water-1',
    title: '탄산수 24캔 묶음 나눌 분',
    category: '음료',
    subCategory: '생수/탄산수',
    location: '도곡동',
    distance: '800m',
    pricePerPerson: 6000,
    totalPrice: 18000,
    totalMembers: 3,
    currentMembers: 2,
    unit: '1인 (8캔)',
    imageUrl: SPARKLING_WATER_IMAGE,
    urgent: false,
    hostName: '탄산러버',
    hostAvatar: '🥤',
    hostMannerTemp: 38.5,
    meetingPlace: '도곡역 2번 출구 우리은행 앞',
    meetingPlaceDetail: '강남구 남부순환로 2800',
    description: '탄산수 24캔 묶음을 구매했습니다. 캔 단위로 8개씩 가져가시면 됩니다. 박스만 개봉하고 상품 포장은 그대로입니다.',
    createdAt: '1시간 전',
    deadline: '내일 12:00',
    isLiked: false,
    status: 'recruiting',
  },
  {
    id: 'coffee-1',
    title: '스틱커피 100T 반씩 나눠요',
    category: '커피/차',
    subCategory: '스틱커피/티백',
    location: '역삼1동',
    distance: '300m',
    pricePerPerson: 6250,
    totalPrice: 25000,
    totalMembers: 4,
    currentMembers: 1,
    unit: '1인 (25개)',
    imageUrl: COFFEE_STICK_IMAGE,
    urgent: true,
    hostName: '커피한잔',
    hostAvatar: '☕',
    hostMannerTemp: 36.9,
    meetingPlace: '우리은행 마두지점 / 역삼지점',
    meetingPlaceDetail: '강남구 역삼로 200',
    description: '스틱커피 100T 대용량을 샀습니다. 개별 스틱 포장 그대로 25개씩 나눕니다.',
    createdAt: '2시간 전',
    deadline: '오늘 17:00',
    isLiked: false,
    status: 'recruiting',
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'me',
    senderName: '나',
    text: '안녕하세요! 소분 참여하고 싶어요. 어디서 뵐까요? 😊',
    time: '오후 2:30',
    date: '2023년 10월 26일 목요일'
  },
  {
    id: 'msg-2',
    sender: 'other',
    senderName: '커피한잔',
    avatar: '☕',
    text: '안녕하세요! 마두역 우리은행 앞에서 5시에 뵙는 건 어떠세요?',
    time: '오후 2:35',
  },
  {
    id: 'msg-3',
    sender: 'other',
    senderName: '커피한잔',
    type: 'location_proposal',
    locationInfo: {
      name: '우리은행 마두지점',
      detail: '경기 고양시 일산동구 중앙로 1195'
    },
    time: '오후 2:35',
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '소분 모집 완료!',
    content: "'즉석밥 24개입 박스 나눠요' 3명이 모두 모였습니다. 거래 장소를 확인하세요.",
    timeAgo: '5분 전',
    type: 'group_buy',
    read: false,
    targetScreen: 'detail'
  },
  {
    id: 'notif-2',
    title: '새로운 메시지 도착',
    content: "'커피한잔'님이 거래 장소를 제안했습니다: 우리은행 마두지점",
    timeAgo: '15분 전',
    type: 'chat',
    read: false,
    targetScreen: 'chat_detail'
  },
  {
    id: 'notif-3',
    title: '키워드 알림',
    content: "관심 키워드 '컵라면' 새 글이 역삼1동에 등록되었습니다.",
    timeAgo: '1시간 전',
    type: 'keyword',
    read: true,
    targetScreen: 'home'
  },
  {
    id: 'notif-4',
    title: '후기 작성 요청',
    content: "'탄산수 24캔 묶음' 소분이 완료되었습니다. 따뜻한 후기를 남겨주세요!",
    timeAgo: '어제',
    type: 'review',
    read: true,
    targetScreen: 'review_write'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    itemId: 'water-1',
    itemTitle: '탄산수 24캔 묶음 나눌 분',
    hostName: '탄산러버',
    rating: 5,
    tags: ['상품 상태가 정확해요', '약속 시간을 잘 지켜요', '친절해요', '포장이 꼼꼼해요'],
    comment: '캔 수량과 상태가 설명 그대로라 기분 좋게 나눴습니다. 다음에도 또 참여할게요.',
    createdAt: '2023.10.25'
  }
];
