import { getFeedPosts, currentUser } from "@/lib/data";
import { CreatePostForm } from "@/components/create-post-form";
import { PostCard } from "@/components/post-card";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function FeedPage() {
  const posts = getFeedPosts(currentUser.id);

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
