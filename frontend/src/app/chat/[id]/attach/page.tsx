import { ChatAttachPage } from '@/features/chat/ChatAttachPage';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ChatAttachPage itemId={id} />;
}
