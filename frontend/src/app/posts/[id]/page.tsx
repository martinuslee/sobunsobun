import { DetailPage } from '@/features/posts/DetailPage';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DetailPage itemId={id} />;
}
