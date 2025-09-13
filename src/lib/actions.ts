"use server";

import { revalidatePath } from "next/cache";

// This is a mock implementation. In a real app, you would interact with a database.

let mockLikes = new Set(["post-1:user-current", "post-2:user-current", "post-3:user-current"]);
let mockFollows = new Set(["user-current:user-1", "user-current:user-2", "user-current:user-3"]);

export async function toggleFollow(currentUserId: string, targetUserId: string) {
  const key = `${currentUserId}:${targetUserId}`;
  if (mockFollows.has(key)) {
    mockFollows.delete(key);
  } else {
    mockFollows.add(key);
  }
  revalidatePath("/feed");
  revalidatePath(`/profile/${targetUserId}`);
  return { success: true };
}

export async function toggleLike(postId: string, userId: string) {
  const key = `${postId}:${userId}`;
  if (mockLikes.has(key)) {
    mockLikes.delete(key);
  } else {
    mockLikes.add(key);
  }
  revalidatePath("/feed");
  revalidatePath("/profile/.*"); // Revalidate all profiles
  return { success: true, isLiked: mockLikes.has(key), likes: Math.floor(Math.random() * 5) + 1 }; // Return mock count
}

export async function addComment(postId: string, userId: string, comment: string) {
  console.log(`User ${userId} commented on post ${postId}: "${comment}"`);
  // In a real app, you would save this to the database.
  revalidatePath("/feed");
  revalidatePath("/profile/.*");
  return { success: true };
}

export async function createPost(userId: string, content: string) {
  console.log(`User ${userId} created post: "${content}"`);
  // In a real app, you would save this to the database.
  revalidatePath("/feed");
  revalidatePath(`/profile/${userId}`);
  return { success: true };
}
