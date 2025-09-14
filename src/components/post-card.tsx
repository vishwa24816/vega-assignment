
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
import type { Post } from '@/lib/definitions';
import {
  getUser,
  getComments,
  getLikes,
  hasLiked,
  currentUser,
} from '@/lib/data';
import { Separator } from './ui/separator';
import { useState } from 'react';
import { CommentSection } from './comment-section';

export function PostCard({ post }: { post: Post }) {
  const user = getUser(post.userId);
  if (!user) return null;

  const [showComments, setShowComments] = useState(false);
  const comments = getComments(post.id);
  const totalLikes = getLikes(post.id);
  const isLiked = hasLiked(post.id, currentUser.id);
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
            <CommentSection postId={post.id} comments={comments} />
          </>
        )}
      </CardFooter>
    </Card>
  );
}
