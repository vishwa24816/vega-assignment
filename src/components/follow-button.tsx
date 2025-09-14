
'use client';

import { useState, useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { toggleFollow } from '@/lib/actions';
import { currentUser } from '@/lib/data';
import { Button, ButtonProps } from '@/components/ui/button';

type FollowButtonProps = {
  targetUserId: string;
  initialIsFollowing: boolean;
  buttonProps?: ButtonProps;
};

export function FollowButton({
  targetUserId,
  initialIsFollowing,
  buttonProps,
}: FollowButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleFollow = () => {
    startTransition(async () => {
      const result = await toggleFollow(
        currentUser.id,
        targetUserId,
        isFollowing
      );
      if (result.success) {
        setIsFollowing(!isFollowing);
      } else {
        toast({
          title: 'Error',
          description: 'Could not update follow status.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Button
      variant={isFollowing ? 'outline' : 'default'}
      onClick={handleFollow}
      disabled={isPending}
      {...buttonProps}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}
