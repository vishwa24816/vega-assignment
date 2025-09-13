import Image from "next/image";
import Link from "next/link";
import { users, posts, currentUser, isFollowing } from "@/lib/data";
import { PostCard } from "@/components/post-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const user = users.find((u) => u.username === params.username);
  if (!user) {
    notFound();
  }

  const userPosts = posts.filter((p) => p.userId === user.id);
  const isCurrentUserProfile = user.id === currentUser.id;
  const following = isFollowing(currentUser.id, user.id);

  return (
    <div className="flex flex-col gap-8">
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full bg-muted">
          {user.bannerUrl && (
            <Image
              src={user.bannerUrl}
              alt={`${user.name}'s banner`}
              fill
              className="object-cover"
              data-ai-hint="abstract texture"
            />
          )}
          <div className="absolute -bottom-12 left-6">
            <Avatar className="h-24 w-24 border-4 border-card">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardHeader className="pt-16">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">{user.name}</CardTitle>
              <CardDescription>@{user.username}</CardDescription>
            </div>
            {isCurrentUserProfile ? (
              <Button variant="outline">Edit Profile</Button>
            ) : (
              <Button variant={following ? "outline" : "default"}>
                {following ? "Following" : "Follow"}
              </Button>
            )}
          </div>
          <p className="pt-4 text-sm text-foreground">{user.bio}</p>
          <div className="flex gap-4 pt-2 text-sm text-muted-foreground">
            <span>
              <span className="font-bold text-foreground">123</span> Following
            </span>
            <span>
              <span className="font-bold text-foreground">456</span> Followers
            </span>
          </div>
        </CardHeader>
      </Card>

      <div>
        <h2 className="mb-4 font-headline text-xl font-bold">Posts</h2>
        <div className="flex flex-col gap-8">
          {userPosts.length > 0 ? (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center text-muted-foreground">
              <p>@{user.username} hasn&apos;t posted anything yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
