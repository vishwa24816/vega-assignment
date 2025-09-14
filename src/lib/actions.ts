
'use server';

import { posts, follows, likes, comments, users, notifications } from './data';
import { revalidatePath } from 'next/cache';
import type { Post } from './definitions';
import { useToast } from '@/hooks/use-toast';

// This is a mock implementation. In a real app, you would interact with a database.

export async function createPost(userId: string, formData: FormData) {
  const content = formData.get('content') as string;
  if (!content) return { success: false, message: 'Content cannot be empty.' };

  const newPost: Post = {
    id: `post-${Date.now()}`,
    userId,
    content,
    createdAt: new Date().toISOString(),
  };
  posts.unshift(newPost); // Add to the beginning of the array

  console.log(`User ${userId} created post: "${content}"`);
  
  // Simulate Priya Sharma liking and commenting
  const priyaUser = users.find(u => u.username === 'priyasharma');
  if (priyaUser) {
    // Simulate like
    likes.push({ postId: newPost.id, userId: priyaUser.id });
    
    // Simulate like notification
    notifications.unshift({
      id: `notif-like-${Date.now()}`,
      type: 'like' as const,
      userId: priyaUser.id,
      postId: newPost.id,
      createdAt: new Date().toISOString(),
      read: false,
    });

    // Simulate comment
    comments.push({
      id: `comment-${Date.now()}`,
      postId: newPost.id,
      userId: priyaUser.id,
      content: "Great post!",
      createdAt: new Date().toISOString(),
    });

    // Simulate comment notification
    notifications.unshift({
      id: `notif-comment-${Date.now()}`,
      type: 'comment' as const,
      userId: priyaUser.id,
      postId: newPost.id,
      createdAt: new Date().toISOString(),
      read: false,
    });
    
    console.log(`Simulated like and comment from Priya Sharma on post ${newPost.id}`);
  }


  revalidatePath('/feed');
  revalidatePath(`/profile/${users.find((u) => u.id === userId)?.username}`);
  revalidatePath('/notifications');
  revalidatePath(`/post/${newPost.id}`);

  return { success: true, post: newPost };
}

export async function toggleLike(
  postId: string,
  userId: string,
  isLiked: boolean
) {
  if (isLiked) {
    const index = likes.findIndex(
      (l) => l.postId === postId && l.userId === userId
    );
    if (index > -1) {
      likes.splice(index, 1);
    }
  } else {
    likes.push({ postId, userId });
  }

  revalidatePath('/feed');
  revalidatePath('/profile/.*'); // Revalidate all profiles to update like counts
  revalidatePath('/post/[postId]');
  return { success: true };
}

export async function toggleFollow(
  currentUserId: string,
  targetUserId: string,
  isFollowing: boolean
) {
  if (isFollowing) {
    const index = follows.findIndex(
      (f) => f.followerId === currentUserId && f.followingId === targetUserId
    );
    if (index > -1) {
      follows.splice(index, 1);
    }
  } else {
    follows.push({ followerId: currentUserId, followingId: targetUserId });
  }

  // Revalidate all pages under /profile to ensure follower/following lists update
  revalidatePath('/profile', 'page');
  revalidatePath('/feed');
  return { success: true };
}

export async function addComment(
  postId: string,
  userId: string,
  formData: FormData
) {
  const content = formData.get('comment') as string;
  if (!content) return { success: false, message: 'Comment cannot be empty.' };

  const newComment = {
    id: `comment-${Date.now()}`,
    postId,
    userId,
    content,
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  console.log(`User ${userId} commented on post ${postId}: "${content}"`);

  // Simulate a notification
  const vikramUser = users.find(u => u.username === 'vikram');
  if (vikramUser) {
    const newNotification = {
      id: `notif-${Date.now()}`,
      type: 'like' as const,
      userId: vikramUser.id,
      postId: postId,
      createdAt: new Date().toISOString(),
      read: false,
    };
    notifications.unshift(newNotification);
    console.log(`Simulated notification: Vikram Singh liked your post.`);
    revalidatePath('/notifications');
  }


  revalidatePath('/feed');
  revalidatePath('/post/[postId]');
  return { success: true, message: 'Comment added!' };
}

export async function updateProfile(userId: string, formData: FormData) {
  const name = formData.get('name') as string;
  const username = formData.get('username') as string;
  const bio = formData.get('bio') as string;

  const user = users.find((u) => u.id === userId);
  if (user) {
    user.name = name || user.name;
    user.username = username || user.username;
    user.bio = bio || user.bio;
  }

  console.log(`Updated profile for ${userId}:`, { name, username, bio });
  revalidatePath(`/profile/${user?.username}`);
  revalidatePath('/settings');
  return { success: true, message: 'Profile updated successfully!' };
}
