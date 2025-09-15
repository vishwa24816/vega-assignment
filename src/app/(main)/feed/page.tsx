
'use client';

import { useEffect, useState, useCallback } from 'react';
import { getFeedPosts, getCurrentUser, getComments, getUser, hasLiked, getLikes } from '@/lib/data';
import { CreatePostForm } from '@/components/create-post-form';
import { PostCard } from '@/components/post-card';
import type { Post, Comment, User } from '@/lib/definitions';
import { Skeleton } from '@/components/ui/skeleton';

type PostCardData = Post & { 
  user: User;
  initialComments: Comment[];
  initialLikes: number;
  initialIsLiked: boolean;
};

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
  const [posts, setPosts] = useState<PostCardData[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async (user: User) => {
    const feedPosts = await getFeedPosts(user.id);
    const postsWithDataPromises = feedPosts.map(async (post) => {
      const [postUser, comments, likesCount, isLiked] = await Promise.all([
        getUser(post.userId),
        getComments(post.id),
        getLikes(post.id),
        hasLiked(post.id, user.id),
      ]);
      return {
        ...post,
        user: postUser!,
        initialComments: comments,
        initialLikes: likesCount,
        initialIsLiked: isLiked,
      };
    });
    const postsWithData = await Promise.all(postsWithDataPromises);
    setPosts(postsWithData);
  }, []);


  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      const user = await getCurrentUser();
      setCurrentUser(user);

      if (user) {
        await fetchPosts(user);
      }
      setLoading(false);
    }

    loadInitialData();
  }, [fetchPosts]);

  const handlePostCreated = useCallback(async (newPost: Post) => {
     if (!currentUser) return;
     await fetchPosts(currentUser);
  }, [currentUser, fetchPosts]);

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
          <PostCard 
            key={post.id} 
            post={post} 
            user={post.user}
            initialComments={post.initialComments}
            initialLikes={post.initialLikes}
            initialIsLiked={post.initialIsLiked}
           />
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
