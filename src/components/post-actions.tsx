'use client';

import { useState, useTransition } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toggleLike } from '@/lib/actions';
import { currentUser } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function PostActions({
  postId,
  initialLiked,
}: {
  postId: string;
  initialLiked: boolean;
}) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleLike = () => {
    startTransition(async () => {
      const result = await toggleLike(postId, currentUser.id, isLiked);
      if (result.success) {
        setIsLiked(!isLiked);
      } else {
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
        disabled={isPending}
      >
        <Heart
          className={cn(
            'h-5 w-5 transition-all',
            isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
          )}
        />
        <span>Like</span>
      </Button>
      <Button variant="ghost" size="sm" className="flex-1 justify-center gap-2">
        <MessageCircle className="h-5 w-5 text-muted-foreground" />
        <span>Comment</span>
      </Button>
    </div>
  );
}
