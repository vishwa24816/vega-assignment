'use client';

import Image from 'next/image';
import {
  users,
  posts,
  currentUser,
  isFollowing,
  getFollowers,
  getFollows,
} from '@/lib/data';
import { PostCard } from '@/components/post-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { User } from '@/lib/definitions';
import { useTransition } from 'react';
import { toggleFollow } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

function FollowButton({
  isCurrentUserProfile,
  isFollowing,
  targetUserId,
}: {
  isCurrentUserProfile: boolean;
  isFollowing: boolean;
  targetUserId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFollow = () => {
    startTransition(async () => {
      const result = await toggleFollow(
        currentUser.id,
        targetUserId,
        isFollowing
      );
      if (!result.success) {
        toast({
          title: 'Error',
          description: 'Could not update follow status.',
          variant: 'destructive',
        });
      }
    });
  };

  if (isCurrentUserProfile) {
    return (
      <Button variant="outline" asChild>
        <Link href="/settings">Edit Profile</Link>
      </Button>
    );
  }

  return (
    <Button
      variant={isFollowing ? 'outline' : 'default'}
      onClick={handleFollow}
      disabled={isPending}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}

function UserList({
  users,
  emptyMessage,
}: {
  users: User[];
  emptyMessage: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={`/profile/${user.username}`}
                  className="font-semibold hover:underline"
                >
                  {user.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>
            {currentUser.id !== user.id && (
              <FollowButton
                isCurrentUserProfile={false}
                isFollowing={isFollowing(currentUser.id, user.id)}
                targetUserId={user.id}
              />
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-muted-foreground">{emptyMessage}</p>
      )}
    </div>
  );
}

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
  const followingStatus = isFollowing(currentUser.id, user.id);
  const followers = getFollowers(user.id)
    .map((f) => f.followerId)
    .map((id) => users.find((u) => u.id === id))
    .filter(Boolean) as User[];
  const followingList = getFollows(user.id)
    .map((f) => f.followingId)
    .map((id) => users.find((u) => u.id === id))
    .filter(Boolean) as User[];

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
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="font-headline text-2xl">
                {user.name}
              </CardTitle>
              <CardDescription>@{user.username}</CardDescription>
            </div>
            <FollowButton
              isCurrentUserProfile={isCurrentUserProfile}
              isFollowing={followingStatus}
              targetUserId={user.id}
            />
          </div>
          <p className="pt-4 text-sm text-foreground">{user.bio}</p>
          <div className="flex gap-4 pt-2 text-sm text-muted-foreground">
            <span className="hover:underline">
              <span className="font-bold text-foreground">
                {followingList.length}
              </span>{' '}
              Following
            </span>
            <span className="hover:underline">
              <span className="font-bold text-foreground">
                {followers.length}
              </span>{' '}
              Followers
            </span>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="mt-4 flex flex-col gap-8">
            {userPosts.length > 0 ? (
              userPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <p>@{user.username} hasn&apos;t posted anything yet.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="followers">
          <Card>
            <CardContent className="p-6">
              <UserList
                users={followers}
                emptyMessage={`@${user.username} doesn't have any followers yet.`}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="following">
          <Card>
            <CardContent className="p-6">
              <UserList
                users={followingList}
                emptyMessage={`@${user.username} isn't following anyone yet.`}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
