
'use client';

import { useEffect, useState, useCallback } from 'react';
import { getFeedPosts, currentUser, getComments } from '@/lib/data';
import { CreatePostForm } from '@/components/create-post-form';
import { PostCard } from '@/components/post-card';
import type { Post, Comment } from '@/lib/definitions';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeedPosts() {
      setLoading(true);
      // In a real app, this would be an API call.
      // We simulate a network delay.
      await new Promise(resolve => setTimeout(resolve, 500));
      const feedPosts = getFeedPosts(currentUser.id);
      const postsWithComments = feedPosts.map(post => ({
        ...post,
        comments: getComments(post.id),
      }));
      setPosts(postsWithComments);
      setLoading(false);
    }

    loadFeedPosts();
  }, []);

  const handlePostCreated = useCallback((newPost: Post) => {
     const newPostWithComments: PostWithComments = {
      ...newPost,
      comments: getComments(newPost.id),
    };
    setPosts((prevPosts) => [newPostWithComments, ...prevPosts]);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <CreatePostForm user={currentUser} onPostCreated={handlePostCreated} />
      {loading ? (
        <FeedSkeleton />
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} initialComments={post.comments} />
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
