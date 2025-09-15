
import { getPost, getComments } from '@/lib/data';
import { PostCard } from '@/components/post-card';
import { notFound } from 'next/navigation';

export default async function PostPage({
  params,
  searchParams,
}: {
  params: { postId: string };
  searchParams: { comments?: string };
}) {
  const post = await getPost(params.postId);
  if (!post) {
    notFound();
  }

  const comments = await getComments(post.id);
  const showComments = searchParams.comments === 'true';

  return (
    <div className="flex flex-col gap-8">
      <PostCard
        post={post}
        initialComments={comments}
        initialShowComments={showComments}
      />
    </div>
  );
}
