
'use client';

import { useState, useTransition, useEffect } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toggleLike } from '@/lib/actions';
import { getCurrentUser } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/lib/definitions';

export function PostActions({
  postId,
  initialLiked,
  onCommentClick,
  onLikeToggle,
}: {
  postId: string;
  initialLiked: boolean;
  onCommentClick: () => void;
  onLikeToggle: (isLiked: boolean) => void;
}) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isPending, startTransition] = useTransition();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser().then(setCurrentUser);
  }, []);
  
  useEffect(() => {
    setIsLiked(initialLiked);
  }, [initialLiked]);

  const handleLike = () => {
    if (!currentUser) return;
    startTransition(async () => {
      const newLikedState = !isLiked;
      onLikeToggle(newLikedState); // Optimistically update UI
      const result = await toggleLike(postId, currentUser.id, isLiked);
      if (!result.success) {
        onLikeToggle(isLiked); // Revert on failure
        toast({
          title: 'Error',
          description: 'Could not update like status.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="flex w-full items-center">
      <Button
        variant="ghost"
        size="sm"
        className="flex-1 justify-center gap-2"
        onClick={handleLike}
        disabled={isPending || !currentUser}
      >
        <Heart
          className={cn(
            'h-5 w-5 transition-all',
            isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
          )}
        />
        <span>Like</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="flex-1 justify-center gap-2"
        onClick={onCommentClick}
      >
        <MessageCircle className="h-5 w-5 text-muted-foreground" />
        <span>Comment</span>
      </Button>
    </div>
  );
}
