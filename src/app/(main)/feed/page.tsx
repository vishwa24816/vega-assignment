
'use client';

import { useEffect, useState, useCallback } from 'react';
import { getFeedPosts, getCurrentUser, getComments } from '@/lib/data';
import { CreatePostForm } from '@/components/create-post-form';
import { PostCard } from '@/components/post-card';
import type { Post, Comment, User } from '@/lib/definitions';
import { Skeleton } from '@/components/ui/skeleton';

type PostWithComments = Post & { comments: Comment[] };

function FeedSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default function FeedPage() {
  const [posts, setPosts] = useState<PostWithComments[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      const user = await getCurrentUser();
      setCurrentUser(user);

      if (user) {
        const feedPosts = await getFeedPosts(user.id);
        const postsWithCommentsPromises = feedPosts.map(async (post) => ({
          ...post,
          comments: await getComments(post.id),
        }));
        const postsWithComments = await Promise.all(postsWithCommentsPromises);
        setPosts(postsWithComments);
      }
      setLoading(false);
    }

    loadInitialData();
  }, []);

  const handlePostCreated = useCallback(async (newPost: Post) => {
     const newPostWithComments: PostWithComments = {
      ...newPost,
      comments: await getComments(newPost.id),
    };
    setPosts((prevPosts) => [newPostWithComments, ...prevPosts]);
  }, []);

  if (loading || !currentUser) {
      return (
         <div className="flex flex-col gap-8">
           {/* You can put a skeleton loader for the form as well */}
           <Skeleton className="h-40 w-full" />
           <FeedSkeleton />
         </div>
      )
  }

  return (
    <div className="flex flex-col gap-8">
      <CreatePostForm user={currentUser} onPostCreated={handlePostCreated} />
      <>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} initialComments={post.comments} />
        ))}
        {posts.length === 0 && !loading && (
          <div className="py-12 text-center text-muted-foreground">
            <p>Your feed is empty.</p>
            <p className="text-sm">
              Follow some users to see their posts here.
            </p>
          </div>
        )}
      </>
    </div>
  );
}
