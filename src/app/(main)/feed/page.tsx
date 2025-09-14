
import { getFeedPosts, currentUser, getLikes, getComments } from "@/lib/data";
import { CreatePostForm } from "@/components/create-post-form";
import { PostCard } from "@/components/post-card";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "@/lib/definitions";

async function getScoredFeedPosts(): Promise<Post[]> {
  const initialPosts = getFeedPosts(currentUser.id);

  // Non-AI scoring mimic: Sort by engagement (likes + comments)
  // We'll give comments more weight than likes.
  const sortedPosts = [...initialPosts].sort((a, b) => {
    const scoreA = getLikes(a.id) + getComments(a.id).length * 2;
    const scoreB = getLikes(b.id) + getComments(b.id).length * 2;
    
    // If scores are equal, sort by creation date
    if (scoreB === scoreA) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    
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
