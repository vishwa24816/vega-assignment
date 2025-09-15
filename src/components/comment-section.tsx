
'use client';

import { formatDistanceToNow } from 'date-fns';
import { useRef, useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Comment, User } from '@/lib/definitions';
import { getCurrentUser, getUser } from '@/lib/data';
import { Send, MoreHorizontal, Trash2, Edit, Loader2, Flag } from 'lucide-react';
import { addComment, deleteComment, updateComment, reportPost } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from './ui/separator';

function CommentItem({
  comment,
  onCommentDeleted,
  onCommentUpdated,
  currentUser,
}: {
  comment: Comment;
  onCommentDeleted: (commentId: string) => void;
  onCommentUpdated: (updatedComment: Comment) => void;
  currentUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    getUser(comment.userId).then(u => setUser(u || null));
  }, [comment.userId]);

  if (!user || !currentUser) return null;
  const isCurrentUserComment = comment.userId === currentUser.id;

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteComment(comment.id);
      if (result.success) {
        onCommentDeleted(comment.id);
        toast({
          title: 'Success',
          description: 'Comment deleted.',
        });
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    });
  };

  const handleUpdate = () => {
    if (editedContent === comment.content) {
      setIsEditing(false);
      return;
    }
    startTransition(async () => {
      const result = await updateComment(comment.id, editedContent);
      if (result.success && result.comment) {
        onCommentUpdated(result.comment);
        setIsEditing(false);
        toast({
          title: 'Success',
          description: 'Comment updated.',
        });
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    });
  };

  const handleReport = () => {
    startTransition(async () => {
      // In a real app, you might want to report the comment itself, not just the post.
      // For this prototype, we'll report the parent post.
      const result = await reportPost(comment.postId);
      if (result.success) {
        toast({
          title: 'Reported',
          description: 'Thank you for your feedback. An admin will review this post.',
        });
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8 border">
        <AvatarImage src={user.avatarUrl} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="rounded-lg bg-muted/50 px-3 py-2">
          <div className="flex items-center justify-between">
            <Link
              href={`/profile/${user.username}`}
              className="font-semibold hover:underline"
            >
              {user.name}
            </Link>
            {!isEditing && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {isCurrentUserComment ? (
                    <>
                      <DropdownMenuItem onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleDelete}
                        className="text-destructive"
                        disabled={isPending}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={handleReport} disabled={isPending}>
                      <Flag className="mr-2 h-4 w-4" />
                      <span>Report</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          {isEditing ? (
            <div className="mt-2 space-y-2">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[60px]"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleUpdate} disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm">{comment.content}</p>
          )}
        </div>
        {!isEditing && (
          <p className="pl-3 text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </p>
        )}
      </div>
    </div>
  );
}

function AddCommentForm({
  postId,
  onCommentAdded,
  currentUser,
}: {
  postId: string;
  onCommentAdded: (comment: Comment) => void;
  currentUser: User | null;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  
  if (!currentUser) return null;

  const handleAddComment = (formData: FormData) => {
    startTransition(async () => {
      const result = await addComment(postId, currentUser.id, formData);
      if (result.success && result.comment) {
        onCommentAdded(result.comment);
        formRef.current?.reset();
        toast({
          title: 'Success!',
          description: 'Your comment has been posted.',
        });
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Could not post comment.',
          variant: 'destructive',
        });
      }
    });
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
          disabled={isPending}
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1 h-8 w-8"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span className="sr-only">Post comment</span>
        </Button>
      </div>
    </form>
  );
}

export function CommentSection({
  postId,
  comments,
  onCommentAdded,
  onCommentDeleted,
  onCommentUpdated,
}: {
  postId: string;
  comments: Comment[];
  onCommentAdded: (comment: Comment) => void;
  onCommentDeleted: (commentId: string) => void;
  onCommentUpdated: (updatedComment: Comment) => void;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
      getCurrentUser().then(setCurrentUser);
  }, []);

  return (
    <div className="w-full space-y-4 pt-4">
      <AddCommentForm postId={postId} onCommentAdded={onCommentAdded} currentUser={currentUser} />
      {comments.length > 0 && <Separator />}
      <div className="space-y-4">
        {comments
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onCommentDeleted={onCommentDeleted}
              onCommentUpdated={onCommentUpdated}
              currentUser={currentUser}
            />
          ))}
        {comments.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
