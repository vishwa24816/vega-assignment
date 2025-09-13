import { getFeedPosts, currentUser } from "@/lib/data";
import { CreatePostForm } from "@/components/create-post-form";
import { PostCard } from "@/components/post-card";

export default function FeedPage() {
  const posts = getFeedPosts(currentUser.id);

  return (
    <div className="grid items-start gap-8">
      <CreatePostForm user={currentUser} />
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
