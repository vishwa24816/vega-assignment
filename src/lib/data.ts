import type { User, Post, Comment, Like, Follow } from "@/lib/definitions";
import { subHours, subMinutes, subDays } from "date-fns";

export const currentUser: User = {
  id: "user-current",
  name: "You",
  username: "you",
  avatarUrl: "https://picsum.photos/seed/user6/200/200",
  bio: "Just trying to connect with the world. Lover of coffee, code, and cats.",
  bannerUrl: "https://picsum.photos/seed/bannercurrent/1200/400",
};

export const users: User[] = [
  currentUser,
  {
    id: "user-1",
    name: "Sarah Lee",
    username: "sarahlee",
    avatarUrl: "https://picsum.photos/seed/user1/200/200",
    bio: "Photographer & adventurer. Capturing life one frame at a time.",
    bannerUrl: "https://picsum.photos/seed/banner1/1200/400",
  },
  {
    id: "user-2",
    name: "Mike Johnson",
    username: "mikej",
    avatarUrl: "https://picsum.photos/seed/user2/200/200",
    bio: "Chef, foodie, and culinary explorer. Always looking for the next best meal.",
  },
  {
    id: "user-3",
    name: "Emily Chen",
    username: "emilyc",
    avatarUrl: "https://picsum.photos/seed/user3/200/200",
    bio: "UX Designer with a passion for creating beautiful and intuitive digital experiences.",
  },
  {
    id: "user-4",
    name: "David Rodriguez",
    username: "davidr",
    avatarUrl: "https://picsum.photos/seed/user4/200/200",
    bio: "Fitness enthusiast and personal trainer. Helping others achieve their goals.",
  },
  {
    id: "user-5",
    name: "Alex Kim",
    username: "alexkim",
    avatarUrl: "https://picsum.photos/seed/user5/200/200",
    bio: "Musician and songwriter. Making sounds and telling stories.",
  },
];

export const posts: Post[] = [
  {
    id: "post-1",
    userId: "user-1",
    content:
      "Golden hour in the mountains is something else. So grateful for moments like these.",
    imageUrl: "https://picsum.photos/seed/post1/600/400",
    createdAt: subHours(new Date(), 2).toISOString(),
  },
  {
    id: "post-2",
    userId: "user-2",
    content:
      "Just perfected my pasta carbonara recipe! The secret is in the guanciale. 🤌",
    imageUrl: "https://picsum.photos/seed/post2/600/400",
    createdAt: subHours(new Date(), 5).toISOString(),
  },
  {
    id: "post-3",
    userId: "user-3",
    content: "Deep in focus mode today, refining some new interface designs. The creative process is a journey!",
    createdAt: subHours(new Date(), 10).toISOString(),
  },
  {
    id: "post-4",
    userId: "user-current",
    content:
      "My first post on Social Connect! Excited to see what this platform is all about. Here's a picture of my desk setup.",
    imageUrl: "https://picsum.photos/seed/post3/600/400",
    createdAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: "post-5",
    userId: "user-4",
    content: "Just finished a 10k run. Feeling energized and ready to take on the day! #fitness #running",
    createdAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: "post-6",
    userId: "user-1",
    content: "The city lights have their own kind of magic. Exploring downtown tonight.",
    imageUrl: "https://picsum.photos/seed/post4/600/400",
    createdAt: subDays(new Date(), 3).toISOString(),
  },
];

export const comments: Comment[] = [
  {
    id: "comment-1",
    postId: "post-1",
    userId: "user-2",
    content: "Wow, that view is breathtaking!",
    createdAt: subMinutes(new Date(), 90).toISOString(),
  },
  {
    id: "comment-2",
    postId: "post-1",
    userId: "user-3",
    content: "Stunning shot, Sarah!",
    createdAt: subMinutes(new Date(), 85).toISOString(),
  },
  {
    id: "comment-3",
    postId: "post-2",
    userId: "user-1",
    content: "That looks delicious! Recipe please?",
    createdAt: subMinutes(new Date(), 200).toISOString(),
  },
  {
    id: "comment-4",
    postId: "post-4",
    userId: "user-1",
    content: "Welcome to the platform! Nice setup.",
    createdAt: subHours(new Date(), 20).toISOString(),
  }
];

export const likes: Like[] = [
  { postId: "post-1", userId: "user-2" },
  { postId: "post-1", userId: "user-3" },
  { postId: "post-1", userId: "user-current" },
  { postId: "post-2", userId: "user-1" },
  { postId: "post-2", userId: "user-current" },
  { postId: "post-3", userId: "user-current" },
  { postId: "post-4", userId: "user-1" },
];

export const follows: Follow[] = [
  { followerId: "user-current", followingId: "user-1" },
  { followerId: "user-current", followingId: "user-2" },
  { followerId: "user-current", followingId: "user-3" },
  { followerId: "user-1", followingId: "user-current" },
  { followerId: "user-2", followingId: "user-current" },
];

// Helper functions to get data
export const getPost = (postId: string) => posts.find(p => p.id === postId);
export const getUser = (userId: string) => users.find(u => u.id === userId);
export const getComments = (postId: string) => comments.filter(c => c.postId === postId);
export const getLikes = (postId: string) => likes.filter(l => l.postId === postId).length;
export const hasLiked = (postId: string, userId: string) => !!likes.find(l => l.postId === postId && l.userId === userId);
export const getFollows = (userId: string) => follows.filter(f => f.followerId === userId);
export const getFollowers = (userId: string) => follows.filter(f => f.followingId === userId);
export const isFollowing = (followerId: string, followingId: string) => !!follows.find(f => f.followerId === followerId && f.followingId === followingId);

export const getFeedPosts = (userId: string) => {
    const followedUsers = getFollows(userId).map(f => f.followingId);
    return posts
        .filter(p => followedUsers.includes(p.userId) || p.userId === userId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export const getUsersToFollow = (userId: string) => {
    const followedUsers = getFollows(userId).map(f => f.followingId);
    return users.filter(u => u.id !== userId && !followedUsers.includes(u.id));
}
