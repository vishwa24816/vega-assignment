
import { getPost, getComments, getUser, getCurrentUser, hasLiked, getLikes } from '@/lib/data';
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
  
  const [postUser, comments, currentUser, likesCount, isLiked] = await Promise.all([
      getUser(post.userId),
      getComments(post.id),
      getCurrentUser(),
      getLikes(post.id),
      getCurrentUser().then(cu => hasLiked(post.id, cu.id)),
  ]);

  if (!postUser) {
    notFound();
  }

  const showComments = searchParams.comments === 'true';

  return (
    <div className="flex flex-col gap-8">
      <PostCard
        post={post}
        user={postUser}
        initialComments={comments}
        initialLikes={likesCount}
        initialIsLiked={isLiked}
        initialShowComments={showComments}
      />
    </div>
  );
}
