
import Image from 'next/image';
import {
  getUserByUsername,
  getAllPosts,
  getCurrentUser,
  isFollowing,
  getFollowers,
  getFollows,
  getAllUsers,
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
import type { User } from '@/lib/definitions';
import { FollowButton } from '@/components/follow-button';

async function UserList({
  userIds,
  emptyMessage,
  currentUser,
}: {
  userIds: string[];
  emptyMessage: string;
  currentUser: User;
}) {
  const allUsers = await getAllUsers();
  const users = userIds.map(id => allUsers.find(u => u.id === id)).filter(Boolean) as User[];
  
  return (
    <div className="flex flex-col gap-4">
      {users.length > 0 ? (
        users.map(async (user) => {
          const followingStatus = await isFollowing(currentUser.id, user.id);
          return (
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
                  targetUserId={user.id}
                  initialIsFollowing={followingStatus}
                  currentUserId={currentUser.id}
                />
              )}
            </div>
          )
        })
      ) : (
        <p className="text-center text-muted-foreground">{emptyMessage}</p>
      )}
    </div>
  );
}

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const [user, allPosts, currentUser, allUsers] = await Promise.all([
    getUserByUsername(params.username),
    getAllPosts(),
    getCurrentUser(),
    getAllUsers(),
  ]);

  if (!user || !currentUser) {
    notFound();
  }

  const userPosts = allPosts
    .filter((p) => p.userId === user.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const isCurrentUserProfile = user.id === currentUser.id;
  const followingStatus = await isFollowing(currentUser.id, user.id);
  
  const followersData = await getFollowers(user.id);
  const followerIds = followersData.map(f => f.followerId);

  const followingData = await getFollows(user.id);
  const followingIds = followingData.map(f => f.followingId);


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
             {isCurrentUserProfile ? (
              <Button variant="outline" asChild>
                <Link href="/settings">Edit Profile</Link>
              </Button>
            ) : (
              <FollowButton
                targetUserId={user.id}
                initialIsFollowing={followingStatus}
                currentUserId={currentUser.id}
              />
            )}
          </div>
          <p className="pt-4 text-sm text-foreground">{user.bio}</p>
          <div className="flex gap-4 pt-2 text-sm text-muted-foreground">
            <span className="hover:underline">
              <span className="font-bold text-foreground">
                {followingIds.length}
              </span>{' '}
              Following
            </span>
            <span className="hover:underline">
              <span className="font-bold text-foreground">
                {followerIds.length}
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
                userIds={followerIds}
                emptyMessage={`@${user.username} doesn't have any followers yet.`}
                currentUser={currentUser}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="following">
          <Card>
            <CardContent className="p-6">
              <UserList
                userIds={followingIds}
                emptyMessage={`@${user.username} isn't following anyone yet.`}
                currentUser={currentUser}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
