
import { getFeedPosts, currentUser } from "@/lib/data";
import { CreatePostForm } from "@/components/create-post-form";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/definitions";

async function getSortedFeedPosts(): Promise<Post[]> {
  const initialPosts = getFeedPosts(currentUser.id);

  // Sort posts chronologically, newest first.
  const sortedPosts = [...initialPosts].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return sortedPosts;
}


export default async function FeedPage() {
  const posts = await getSortedFeedPosts();

  return (
    <div className="flex flex-col gap-8">
      <CreatePostForm user={currentUser} />
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
