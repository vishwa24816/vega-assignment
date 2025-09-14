
'use client';

import { useEffect, useState } from 'react';
import { getFeedPosts, currentUser } from '@/lib/data';
import { CreatePostForm } from '@/components/create-post-form';
import { PostCard } from '@/components/post-card';
import type { Post } from '@/lib/definitions';
import { scoreFeed, ScoreFeedInput, ScoreFeedOutput } from '@/ai/flows/score-feed-flow';
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
    async function getSortedFeedPosts() {
      setLoading(true);
      const initialPosts = getFeedPosts(currentUser.id);
      if (initialPosts.length === 0) {
        setPosts([]);
        setLoading(false);
        return;
      }
      
      try {
        const scoringInput: ScoreFeedInput = {
          user: currentUser,
          posts: initialPosts,
        };
        const scoringResult = await scoreFeed(scoringInput);

        const scoredPostsMap = new Map(
          scoringResult.scoredPosts.map((p) => [p.postId, p.score])
        );

        const sortedPosts = [...initialPosts].sort((a, b) => {
          const scoreA = scoredPostsMap.get(a.id) ?? 0;
          const scoreB = scoredPostsMap.get(b.id) ?? 0;
          if (scoreB !== scoreA) {
            return scoreB - scoreA;
          }
          // If scores are equal, sort by creation date
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setPosts(sortedPosts);

      } catch (error) {
        console.error("Error scoring feed:", error);
        // Fallback to chronological order if AI scoring fails
        const sortedPosts = [...initialPosts].sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setPosts(sortedPosts);
      } finally {
        setLoading(false);
      }
    }

    getSortedFeedPosts();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <CreatePostForm user={currentUser} />
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
