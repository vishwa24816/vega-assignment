
import type { User, Post, Comment, Like, Follow, Notification } from "@/lib/definitions";
import path from 'path';
import fs from 'fs/promises';

// This is a new type to define the structure of our JSON database.
type DbData = {
  users: User[];
  posts: Post[];
  comments: Comment[];
  likes: Like[];
  follows: Follow[];
  notifications: Notification[];
};

// This points to the new db.json file.
// We use path.join to create a correct file path regardless of the operating system.
const dbPath = path.join(process.cwd(), 'src', 'lib', 'db.json');

// This function reads the entire JSON file and returns its content.
export async function readDb(): Promise<DbData> {
  try {
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist, this will be handled by the initial seeding.
    // For other errors, we log them.
    console.error("Error reading from db.json:", error);
    // Return an empty structure to prevent crashes.
    return { users: [], posts: [], comments: [], likes: [], follows: [], notifications: [] };
  }
}

// This function takes a data object and writes it to the JSON file.
// JSON.stringify with a space of 2 makes the file human-readable.
export async function writeDb(data: DbData): Promise<void> {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to db.json:", error);
  }
}

// The currentUser data is now fetched from the db.
export async function getCurrentUser(): Promise<User> {
    const db = await readDb();
    // In a real app, this would be based on the logged-in session.
    // For this mock setup, we still find a specific user.
    return db.users.find(u => u.id === "user-current")!;
}

// All helper functions are now async because they need to read from the file.

export const getPost = async (postId: string) => {
    const db = await readDb();
    return db.posts.find(p => p.id === postId)
};
export const getUser = async (userId: string) => {
    const db = await readDb();
    return db.users.find(u => u.id === userId)
};
export const getUserByUsername = async (username: string) => {
    const db = await readDb();
    return db.users.find(u => u.username === username)
};
export const getComments = async (postId: string) => {
    const db = await readDb();
    return db.comments.filter(c => c.postId === postId)
};
export const getLikes = async (postId: string) => {
    const db = await readDb();
    return db.likes.filter(l => l.postId === postId).length
};
export const hasLiked = async (postId: string, userId: string) => {
    const db = await readDb();
    return !!db.likes.find(l => l.postId === postId && l.userId === userId)
};
export const getFollows = async (userId: string) => {
    const db = await readDb();
    return db.follows.filter(f => f.followerId === userId)
};
export const getFollowers = async (userId: string) => {
    const db = await readDb();
    return db.follows.filter(f => f.followingId === userId)
};
export const isFollowing = async (followerId: string, followingId: string) => {
    const db = await readDb();
    return !!db.follows.find(f => f.followerId === followerId && f.followingId === followingId)
};

export const getFeedPosts = async (userId: string) => {
    const db = await readDb();
    const followedUsers = (await getFollows(userId)).map(f => f.followingId);
    return db.posts
        .filter(p => followedUsers.includes(p.userId) || p.userId === userId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export const getUsersToFollow = async (userId: string) => {
    const db = await readDb();
    const followedUsers = (await getFollows(userId)).map(f => f.followingId);
    return db.users.filter(u => u.id !== userId && !followedUsers.includes(u.id));
}

export const getNotifications = async (userId: string) => {
    const db = await readDb();
    // In a real app, you'd fetch notifications for the given userId.
    // Here we return all mock notifications for demonstration.
    return db.notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getAllUsers = async () => {
    const db = await readDb();
    return db.users;
}

export const getAllPosts = async () => {
    const db = await readDb();
    return db.posts;
}
