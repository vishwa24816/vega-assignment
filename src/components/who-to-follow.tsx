
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/lib/definitions';
import { FollowButton } from './follow-button';
import { isFollowing } from '@/lib/data';

export function WhoToFollow({ users, currentUser }: { users: User[], currentUser: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">Who to follow</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {users.map(async (user) => {
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
                <FollowButton
                  targetUserId={user.id}
                  initialIsFollowing={followingStatus}
                  currentUserId={currentUser.id}
                  buttonProps={{ size: 'sm', variant: 'outline' }}
                />
            </div>
          )
        })}
        {users.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No new users to follow right now.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
