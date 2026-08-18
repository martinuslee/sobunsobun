export type ScreenType =
  | 'home'
  | 'detail'
  | 'join_map'
  | 'chat_detail'
  | 'chat_modal'
  | 'create_post'
  | 'location_setting'
  | 'notifications'
  | 'history'
  | 'review_write'
  | 'review_complete';

export interface GroupBuyItem {
  id: string;
  title: string;
  category: string;
  subCategory?: string;
  location: string;
  distance: string;
  pricePerPerson: number;
  totalPrice: number;
  totalMembers: number;
  currentMembers: number;
  unit: string;
  imageUrl: string;
  urgent?: boolean;
  hostName: string;
  hostAvatar?: string;
  hostMannerTemp: number;
  meetingPlace: string;
  meetingPlaceDetail: string;
  description: string;
  createdAt: string;
  deadline: string;
  isLiked?: boolean;
  status: 'recruiting' | 'completed' | 'canceled';
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  senderName: string;
  avatar?: string;
  text?: string;
  type?: 'text' | 'location_proposal' | 'image' | 'qr';
  locationInfo?: {
    name: string;
    detail: string;
  };
  time: string;
  date?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  timeAgo: string;
  type: 'group_buy' | 'chat' | 'keyword' | 'review';
  read: boolean;
  targetScreen?: ScreenType;
}

export interface ReviewItem {
  id: string;
  itemId: string;
  itemTitle: string;
  hostName: string;
  rating: number;
  tags: string[];
  comment: string;
  createdAt: string;
  imageUrl?: string;
}
