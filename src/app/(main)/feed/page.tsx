
'use client';

import { useEffect, useState, useCallback } from 'react';
import { getFeedPosts, currentUser } from '@/lib/data';
import { CreatePostForm } from '@/components/create-post-form';
import { PostCard } from '@/components/post-card';
import type { Post } from '@/lib/definitions';
import { Skeleton } from '@/components/ui/skeleton';

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeedPosts() {
      setLoading(true);
      // In a real app, this would be an API call.
      // We simulate a network delay.
      await new Promise(resolve => setTimeout(resolve, 500));
      const feedPosts = getFeedPosts(currentUser.id);
      setPosts(feedPosts);
      setLoading(false);
    }

    loadFeedPosts();
  }, []);

  const handlePostCreated = useCallback((newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <CreatePostForm user={currentUser} onPostCreated={handlePostCreated} />
      {loading ? (
        <FeedSkeleton />
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {posts.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <p>Your feed is empty.</p>
              <p className="text-sm">
                Follow some users to see their posts here.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
