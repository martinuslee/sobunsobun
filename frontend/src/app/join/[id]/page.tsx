import { JoinPage } from '@/features/join/JoinPage';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <JoinPage itemId={id} />;
}
