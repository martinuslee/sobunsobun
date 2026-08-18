import { GroupBuyItem, ChatMessage, NotificationItem, ReviewItem } from '../types';
import { FLAT_PEACH_IMAGE, LETTUCE_IMAGE, COSTCO_PORK_IMAGE, STRAWBERRY_IMAGE } from '../assets/productImages';

export const INITIAL_ITEMS: GroupBuyItem[] = [
  {
    id: 'peach-1',
    title: '납작복숭아 같이 나눠요!',
    category: '과일',
    subCategory: '복숭아/자두',
    location: '역삼1동',
    distance: '500m',
    pricePerPerson: 5000,
    totalPrice: 15000,
    totalMembers: 3,
    currentMembers: 2,
    unit: '1인 (4과)',
    imageUrl: FLAT_PEACH_IMAGE,
    urgent: true,
    hostName: '복숭아요정',
    hostAvatar: '🍑',
    hostMannerTemp: 37.8,
    meetingPlace: '역삼1동 주민센터 앞',
    meetingPlaceDetail: '강남구 역삼로 123',
    description: '온브릭스 스탠다드 프리미엄 납작복숭아 12과 대용량 세트를 구매했습니다! 혼자 먹기엔 너무 많아서 4과씩 3분과 나누고 싶어요. 오늘 오후 5시~7시 사이에 전달 가능합니다.',
    createdAt: '10분 전',
    deadline: '오늘 18:00',
    isLiked: false,
    status: 'recruiting',
  },
  {
    id: 'veggie-1',
    title: '자연그대로 친환경 상추 500g 소분',
    category: '채소',
    subCategory: '잎채소',
    location: '역삼2동',
    distance: '1.2km',
    pricePerPerson: 3500,
    totalPrice: 14000,
    totalMembers: 4,
    currentMembers: 2,
    unit: '1인 (125g)',
    imageUrl: LETTUCE_IMAGE,
    urgent: false,
    hostName: '샐러드러버',
    hostAvatar: '🥗',
    hostMannerTemp: 39.1,
    meetingPlace: '역삼역 3번 출구',
    meetingPlaceDetail: '강남구 테헤란로 152',
    description: '자연그대로 무농약 친환경 상추 대용량 팩 소분합니다. 신선도 유지를 위해 개별 지퍼백으로 깔끔하게 포장해 드립니다.',
    createdAt: '30분 전',
    deadline: '오늘 20:00',
    isLiked: true,
    status: 'recruiting',
  },
  {
    id: 'pork-1',
    title: '코스트코 삼겹살 600g 나눌분',
    category: '육류',
    subCategory: '돼지고기',
    location: '도곡동',
    distance: '800m',
    pricePerPerson: 7000,
    totalPrice: 42000,
    totalMembers: 6,
    currentMembers: 2,
    unit: '1인 (600g)',
    imageUrl: COSTCO_PORK_IMAGE,
    urgent: false,
    hostName: '고기파티',
    hostAvatar: '🥩',
    hostMannerTemp: 38.5,
    meetingPlace: '도곡역 2번 출구 우리은행 앞',
    meetingPlaceDetail: '강남구 남부순환로 2800',
    description: '코스트코 미국산 냉장 돈육 삼겹살 로스 3.0kg 팩 사왔습니다. 칼집 넣어서 600g씩 깔끔하게 트레이에 나눠 담아 드려요. 4분 더 모집합니다!',
    createdAt: '1시간 전',
    deadline: '내일 12:00',
    isLiked: false,
    status: 'recruiting',
  },
  {
    id: 'strawberry-1',
    title: '신선한 유기농 딸기대용량 소분 (설향 1kg)',
    category: '과일',
    subCategory: '베리류',
    location: '역삼1동',
    distance: '300m',
    pricePerPerson: 5000,
    totalPrice: 10000,
    totalMembers: 2,
    currentMembers: 1,
    unit: '1인 (500g)',
    imageUrl: STRAWBERRY_IMAGE,
    urgent: true,
    hostName: '딸기좋아',
    hostAvatar: '🍓',
    hostMannerTemp: 36.9,
    meetingPlace: '우리은행 마두지점 / 역삼지점',
    meetingPlaceDetail: '강남구 역삼로 200',
    description: '새벽배송으로 받은 특등 설향 딸기 2kg 박스입니다. 당도 최고이고 흠집 하나 없습니다!',
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
    senderName: '딸기좋아',
    avatar: '🍓',
    text: '안녕하세요! 마두역 우리은행 앞에서 5시에 뵙는 건 어떠세요?',
    time: '오후 2:35',
  },
  {
    id: 'msg-3',
    sender: 'other',
    senderName: '딸기좋아',
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
    content: "'납작복숭아 같이 나눠요!' 3명이 모두 모였습니다. 거래 장소를 확인하세요.",
    timeAgo: '5분 전',
    type: 'group_buy',
    read: false,
    targetScreen: 'detail'
  },
  {
    id: 'notif-2',
    title: '새로운 메시지 도착',
    content: "'딸기좋아'님이 거래 장소를 제안했습니다: 우리은행 마두지점",
    timeAgo: '15분 전',
    type: 'chat',
    read: false,
    targetScreen: 'chat_detail'
  },
  {
    id: 'notif-3',
    title: '키워드 알림',
    content: "관심 키워드 '샤인머스캣' 새 글이 역삼1동에 등록되었습니다.",
    timeAgo: '1시간 전',
    type: 'keyword',
    read: true,
    targetScreen: 'home'
  },
  {
    id: 'notif-4',
    title: '후기 작성 요청',
    content: "'친환경 상추' 소분이 완료되었습니다. 따뜻한 후기를 남겨주세요!",
    timeAgo: '어제',
    type: 'review',
    read: true,
    targetScreen: 'review_write'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    itemId: 'veggie-1',
    itemTitle: '자연그대로 친환경 상추 500g 소분',
    hostName: '샐러드러버',
    rating: 5,
    tags: ['신선도가 최고예요', '약속 시간을 잘 지켜요', '친절해요', '포장이 꼼꼼해요'],
    comment: '정말 싱싱하고 꼼꼼하게 소분 포장해주셔서 너무 기분 좋게 나눴습니다! 다음에도 또 참여할게요.',
    createdAt: '2023.10.25'
  }
];
