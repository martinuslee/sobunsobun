import { ChatMessage, GroupBuyItem, NotificationItem, ReviewItem } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

type ApiGroupBuyItem = {
  id: number;
  title: string;
  category: string;
  sub_category?: string | null;
  location: string;
  distance: string;
  price_per_person: number;
  total_price: number;
  total_members: number;
  current_members: number;
  unit: string;
  image_url: string;
  urgent?: boolean;
  host_name: string;
  host_avatar?: string | null;
  host_manner_temp: number;
  meeting_place: string;
  meeting_place_detail: string;
  description: string;
  created_at: string;
  deadline: string;
  is_liked?: boolean;
  status: GroupBuyItem['status'];
};

type ApiChatMessage = {
  id: number;
  item_id: number;
  sender_name: string;
  avatar?: string | null;
  text?: string | null;
  type?: ChatMessage['type'];
  location_info?: { name: string; detail: string } | null;
  time: string;
  date?: string | null;
};

type ApiNotification = {
  id: number;
  title: string;
  content: string;
  time_ago: string;
  type: NotificationItem['type'];
  read: boolean;
  target_screen?: NotificationItem['targetScreen'] | null;
};

type ApiReview = {
  id: number;
  item_id: number;
  item_title: string;
  host_name: string;
  rating: number;
  tags: string[];
  comment: string;
  created_at: string;
  image_url?: string | null;
};

type ApiUser = {
  id: number;
  name: string;
  email: string;
};

type SignupPayload = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

function toGroupBuyItem(item: ApiGroupBuyItem): GroupBuyItem {
  return {
    id: String(item.id),
    title: item.title,
    category: item.category,
    subCategory: item.sub_category ?? undefined,
    location: item.location,
    distance: item.distance,
    pricePerPerson: item.price_per_person,
    totalPrice: item.total_price,
    totalMembers: item.total_members,
    currentMembers: item.current_members,
    unit: item.unit,
    imageUrl: item.image_url,
    urgent: item.urgent,
    hostName: item.host_name,
    hostAvatar: item.host_avatar ?? undefined,
    hostMannerTemp: item.host_manner_temp,
    meetingPlace: item.meeting_place,
    meetingPlaceDetail: item.meeting_place_detail,
    description: item.description,
    createdAt: item.created_at,
    deadline: item.deadline,
    isLiked: item.is_liked,
    status: item.status,
  };
}

function toCreatePayload(item: GroupBuyItem) {
  return {
    title: item.title,
    category: item.category,
    sub_category: item.subCategory,
    location: item.location,
    distance: item.distance,
    total_price: item.totalPrice,
    total_members: item.totalMembers,
    current_members: item.currentMembers,
    unit: item.unit,
    image_url: item.imageUrl,
    urgent: item.urgent ?? false,
    host_name: item.hostName,
    host_avatar: item.hostAvatar,
    host_manner_temp: item.hostMannerTemp,
    meeting_place: item.meetingPlace,
    meeting_place_detail: item.meetingPlaceDetail,
    description: item.description,
    deadline: item.deadline,
  };
}

function toChatMessage(message: ApiChatMessage): ChatMessage {
  return {
    id: String(message.id),
    sender: message.sender_name === '나' ? 'me' : 'other',
    senderName: message.sender_name,
    avatar: message.avatar ?? undefined,
    text: message.text ?? undefined,
    type: message.type,
    locationInfo: message.location_info ?? undefined,
    time: message.time,
    date: message.date ?? undefined,
  };
}

function toNotification(notification: ApiNotification): NotificationItem {
  return {
    id: String(notification.id),
    title: notification.title,
    content: notification.content,
    timeAgo: notification.time_ago,
    type: notification.type,
    read: notification.read,
    targetScreen: notification.target_screen ?? undefined,
  };
}

function toReview(review: ApiReview): ReviewItem {
  return {
    id: String(review.id),
    itemId: String(review.item_id),
    itemTitle: review.item_title,
    hostName: review.host_name,
    rating: review.rating,
    tags: review.tags,
    comment: review.comment,
    createdAt: review.created_at,
    imageUrl: review.image_url ?? undefined,
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

const list = async <T, U>(path: string, mapper: (item: T) => U) =>
  request<T[]>(path).then((items) => items.map(mapper));

export const api = {
  checkEmail: async (email: string) =>
    request<{ available: boolean }>(`/users/email-available?email=${encodeURIComponent(email)}`),
  signup: async (payload: SignupPayload) =>
    request<ApiUser>('/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        password_confirm: payload.passwordConfirm,
      }),
    }),
  login: async (payload: LoginPayload) =>
    request<ApiUser>('/users/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  items: async () => list<ApiGroupBuyItem, GroupBuyItem>('/items', toGroupBuyItem),
  createItem: async (item: GroupBuyItem) =>
    request<ApiGroupBuyItem>('/items', {
      method: 'POST',
      body: JSON.stringify(toCreatePayload(item)),
    }).then(toGroupBuyItem),
  updateItem: async (id: string, item: Partial<GroupBuyItem>) =>
    request<ApiGroupBuyItem>(`/items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        current_members: item.currentMembers,
        is_liked: item.isLiked,
      }),
    }).then(toGroupBuyItem),
  deleteItem: async (id: string, hostName: string) =>
    request<void>(`/items/${id}?host_name=${encodeURIComponent(hostName)}`, {
      method: 'DELETE',
    }),
  chatMessages: async () => list<ApiChatMessage, ChatMessage>('/chat-messages', toChatMessage),
  createChatMessage: async (itemId: string, message: ChatMessage) =>
    request<ApiChatMessage>('/chat-messages', {
      method: 'POST',
      body: JSON.stringify({
        item_id: Number(itemId),
        sender_name: message.senderName,
        avatar: message.avatar,
        text: message.text,
        type: message.type ?? 'text',
        location_info: message.locationInfo
          ? { name: message.locationInfo.name, detail: message.locationInfo.detail }
          : undefined,
        time: message.time,
        date: message.date,
      }),
    }).then(toChatMessage),
  notifications: async () => list<ApiNotification, NotificationItem>('/notifications', toNotification),
  updateNotification: async (id: string, notification: Partial<NotificationItem>) =>
    request<ApiNotification>(`/notifications/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: notification.title,
        content: notification.content,
        time_ago: notification.timeAgo,
        read: notification.read,
        target_screen: notification.targetScreen,
      }),
    }).then(toNotification),
  reviews: async () => list<ApiReview, ReviewItem>('/reviews', toReview),
  createReview: async (review: ReviewItem) => {
    let itemId = Number(review.itemId);
    if (Number.isNaN(itemId)) {
      const item = (await api.items()).find((candidate) => candidate.title === review.itemTitle);
      itemId = Number(item?.id);
    }

    return request<ApiReview>('/reviews', {
      method: 'POST',
      body: JSON.stringify({
        item_id: itemId,
        reviewer_name: '나',
        host_name: review.hostName,
        rating: review.rating,
        tags: review.tags,
        comment: review.comment,
        image_url: review.imageUrl,
      }),
    }).then(toReview);
  },
};

export const queryKeys = {
  items: ['items'] as const,
  chatMessages: ['chatMessages'] as const,
  notifications: ['notifications'] as const,
  reviews: ['reviews'] as const,
};
