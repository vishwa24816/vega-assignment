
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PostActions } from '@/components/post-actions';
import type { Post, Comment, User } from '@/lib/definitions';
import {
  getUser,
  getLikes,
  hasLiked,
  getCurrentUser,
} from '@/lib/data';
import { Separator } from './ui/separator';
import { useState, useCallback, useEffect } from 'react';
import { CommentSection } from './comment-section';
import { Skeleton } from './ui/skeleton';

function PostCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="grid gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="flex w-full justify-between">
           <Skeleton className="h-4 w-16" />
           <Skeleton className="h-4 w-20" />
        </div>
        <Separator />
        <div className="flex w-full justify-around">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
        </div>
      </CardFooter>
    </Card>
  )
}

export function PostCard({
  post,
  initialComments = [],
  initialShowComments = false,
}: {
  post: Post;
  initialComments?: Comment[];
  initialShowComments?: boolean;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showComments, setShowComments] = useState(initialShowComments);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [totalLikes, setTotalLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [postUser, fetchedCurrentUser, likesCount, likedStatus] = await Promise.all([
        getUser(post.userId),
        getCurrentUser(),
        getLikes(post.id),
        getCurrentUser().then(cu => hasLiked(post.id, cu.id)),
      ]);
      setUser(postUser || null);
      setCurrentUser(fetchedCurrentUser);
      setTotalLikes(likesCount);
      setIsLiked(likedStatus);
      setLoading(false);
    }
    loadData();
  }, [post.id, post.userId]);

  const handleCommentAdded = useCallback((newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  }, []);

  const handleCommentDeleted = useCallback((commentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((c) => c.id !== commentId)
    );
  }, []);

  const handleCommentUpdated = useCallback((updatedComment: Comment) => {
    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === updatedComment.id ? updatedComment : c
      )
    );
  }, []);

  if (loading || !user || !currentUser) {
    return <PostCardSkeleton />;
  }

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <Link
            href={`/profile/${user.username}`}
            className="font-semibold hover:underline"
          >
            {user.name}
          </Link>
          <p className="text-sm text-muted-foreground">
            @{user.username} · {timeAgo}
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <p className="whitespace-pre-wrap">{post.content}</p>
        {post.imageUrl && (
          <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={post.imageUrl}
              alt="Post image"
              fill
              className="object-cover"
              data-ai-hint="social media post"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="flex w-full justify-between text-sm text-muted-foreground">
          <span>{totalLikes} Likes</span>
          <span>{comments.length} Comments</span>
        </div>
        <Separator />
        <PostActions
          postId={post.id}
          initialLiked={isLiked}
          onCommentClick={() => setShowComments(!showComments)}
        />
        {showComments && (
          <>
            <Separator />
            <CommentSection
              postId={post.id}
              comments={comments}
              onCommentAdded={handleCommentAdded}
              onCommentDeleted={handleCommentDeleted}
              onCommentUpdated={handleCommentUpdated}
            />
          </>
        )}
      </CardFooter>
    </Card>
  );
}
