
import { getPost } from '@/lib/data';
import { PostCard } from '@/components/post-card';
import { notFound } from 'next/navigation';

export default function PostPage({
  params,
  searchParams,
}: {
  params: { postId: string };
  searchParams: { comments?: string };
}) {
  const post = getPost(params.postId);

  if (!post) {
    notFound();
  }

  const showComments = searchParams.comments === 'true';

  return (
    <div className="flex flex-col gap-8">
      <PostCard post={post} initialShowComments={showComments} />
    </div>
  );
}
