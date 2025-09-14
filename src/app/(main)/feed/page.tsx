import { getFeedPosts, currentUser } from "@/lib/data";
import { CreatePostForm } from "@/components/create-post-form";
import { PostCard } from "@/components/post-card";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { scoreFeed } from "@/ai/flows/score-feed-flow";
import type { Post } from "@/lib/definitions";

async function getScoredFeedPosts(): Promise<Post[]> {
  const initialPosts = getFeedPosts(currentUser.id);
  if (initialPosts.length === 0) {
    return [];
  }

  const result = await scoreFeed({ user: currentUser, posts: initialPosts });

  const scoredPostsMap = new Map(
    result.scoredPosts.map((p) => [p.postId, p.score])
  );

  // Sort initialPosts based on the scores from the AI
  const sortedPosts = [...initialPosts].sort((a, b) => {
    const scoreA = scoredPostsMap.get(a.id) ?? 0;
    const scoreB = scoredPostsMap.get(b.id) ?? 0;
    return scoreB - scoreA;
  });

  return sortedPosts;
}


export default async function FeedPage() {
  const posts = await getScoredFeedPosts();

  return (
    <div className="flex flex-col gap-8">
      <CreatePostForm user={currentUser} />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Your Feed</CardTitle>
        </CardHeader>
      </Card>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
       {posts.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
            <p>Your feed is empty.</p>
            <p className="text-sm">Follow some users to see their posts here.</p>
        </div>
       )}
    </div>
  );
}
