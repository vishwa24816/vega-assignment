
'use client';

import { formatDistanceToNow } from 'date-fns';
import { useRef, useTransition } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Comment } from '@/lib/definitions';
import { currentUser, getUser } from '@/lib/data';
import { Send } from 'lucide-react';
import { addComment } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

function CommentItem({ comment }: { comment: Comment }) {
  const user = getUser(comment.userId);
  if (!user) return null;

  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8 border">
        <AvatarImage src={user.avatarUrl} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="rounded-lg bg-muted/50 px-3 py-2">
          <Link
            href={`/profile/${user.username}`}
            className="font-semibold hover:underline"
          >
            {user.name}
          </Link>
          <p className="text-sm">{comment.content}</p>
        </div>
        <p className="pl-3 text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
}

function AddCommentForm({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleAddComment = async (formData: FormData) => {
    const result = await addComment(postId, currentUser.id, formData);
    if (result.success) {
      formRef.current?.reset();
       toast({
        title: 'Comment posted!',
        description: "We've also simulated a 'like' notification for you.",
      });
    } else {
      toast({
        title: 'Error',
        description: result.message || 'Could not post comment.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form
      ref={formRef}
      action={handleAddComment}
      className="flex items-start gap-3"
    >
      <Avatar className="h-8 w-8 border">
        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="relative flex-1">
        <Textarea
          name="comment"
          placeholder="Write a comment..."
          className="min-h-[40px] pr-12"
          rows={1}
          required
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1 h-8 w-8"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Post comment</span>
        </Button>
      </div>
    </form>
  );
}

export function CommentSection({
  postId,
  comments,
}: {
  postId: string;
  comments: Comment[];
}) {
  return (
    <div className="w-full space-y-4 pt-4">
      <AddCommentForm postId={postId} />
      <div className="space-y-4">
        {comments
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        {comments.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
