
import type { User, Post, Comment, Like, Follow, Notification } from "@/lib/definitions";
import { subHours, subMinutes, subDays } from "date-fns";

export const currentUser: User = {
  id: "user-current",
  name: "Vishwa Lingam",
  username: "you",
  avatarUrl: "https://picsum.photos/seed/user6/200/200",
  bio: "Just trying to connect with the world. Lover of coffee, code, and cats.",
  bannerUrl: "https://picsum.photos/seed/bannercurrent/1200/400",
};

export const users: User[] = [
  currentUser,
  {
    id: "user-1",
    name: "Priya Sharma",
    username: "priyasharma",
    avatarUrl: "https://picsum.photos/seed/user1/200/200",
    bio: "Photographer & adventurer. Capturing life one frame at a time.",
    bannerUrl: "https://picsum.photos/seed/banner1/1200/400",
  },
  {
    id: "user-2",
    name: "Rohan Gupta",
    username: "rohan",
    avatarUrl: "https://picsum.photos/seed/user2/200/200",
    bio: "Chef, foodie, and culinary explorer. Always looking for the next best meal.",
  },
  {
    id: "user-3",
    name: "Anjali Mehta",
    username: "anjali",
    avatarUrl: "https://picsum.photos/seed/user3/200/200",
    bio: "UX Designer with a passion for creating beautiful and intuitive digital experiences.",
  },
  {
    id: "user-4",
    name: "Vikram Singh",
    username: "vikram",
    avatarUrl: "https://picsum.photos/seed/user4/200/200",
    bio: "Fitness enthusiast and personal trainer. Helping others achieve their goals.",
  },
  {
    id: "user-5",
    name: "Sneha Patel",
    username: "sneha",
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
  {
    id: 'post-7',
    userId: 'user-5',
    content: 'New song dropping this Friday! Can\'t wait to share it with you all. #newmusic',
    createdAt: subHours(new Date(), 8).toISOString(),
  },
  {
    id: 'post-8',
    userId: 'user-2',
    content: 'Visited the local farmer\'s market today. So many fresh ingredients to experiment with!',
    imageUrl: 'https://picsum.photos/seed/post5/600/400',
    createdAt: subHours(new Date(), 28).toISOString(),
  },
  {
    id: 'post-9',
    userId: 'user-3',
    content: 'A good book and a cup of tea is the perfect way to spend a rainy afternoon.',
    imageUrl: 'https://picsum.photos/seed/post6/600/400',
    createdAt: subHours(new Date(), 36).toISOString(),
  },
  {
    id: 'post-10',
    userId: 'user-4',
    content: 'Meal prep Sunday is in full swing. Setting myself up for a week of healthy eating.',
    createdAt: subDays(new Date(), 4).toISOString(),
  },
  {
    id: 'post-11',
    userId: 'user-1',
    content: 'Throwback to my trip to Japan. The temples in Kyoto were absolutely serene.',
    imageUrl: 'https://picsum.photos/seed/post7/600/400',
    createdAt: subDays(new Date(), 5).toISOString(),
  },
  {
    id: 'post-12',
    userId: 'user-current',
    content: 'Working on a new side project with React and TypeScript. Learning so much!',
    createdAt: subHours(new Date(), 6).toISOString(),
  },
  {
    id: 'post-13',
    userId: 'user-5',
    content: 'Just jamming and writing some new lyrics. Inspiration struck today.',
    imageUrl: 'https://picsum.photos/seed/post8/600/400',
    createdAt: subDays(new Date(), 6).toISOString(),
  },
  {
    id: 'post-14',
    userId: 'user-3',
    content: 'Attended a great webinar on accessible design. So many important takeaways to apply to my work.',
    createdAt: subHours(new Date(), 50).toISOString(),
  },
  {
    id: 'post-15',
    userId: 'user-2',
    content: 'Taco Tuesday! Made some delicious carnitas tacos from scratch.',
    imageUrl: 'https://picsum.photos/seed/post9/600/400',
    createdAt: subDays(new Date(), 7).toISOString(),
  },
  {
    id: 'post-16',
    userId: 'user-4',
    content: 'Rest day today. It\'s just as important as the workout days. Listening to my body.',
    createdAt: subHours(new Date(), 15).toISOString(),
  },
  {
    id: 'post-17',
    userId: 'user-1',
    content: 'Sunrise hike this morning was totally worth the 4am alarm.',
    imageUrl: 'https://picsum.photos/seed/post10/600/400',
    createdAt: subDays(new Date(), 8).toISOString(),
  },
  {
    id: 'post-18',
    userId: 'user-current',
    content: 'My cat has officially taken over my keyboard. I guess I\'m not coding anymore.',
    imageUrl: 'https://picsum.photos/seed/post11/600/400',
    createdAt: subMinutes(new Date(), 30).toISOString(),
  },
  {
    id: 'post-19',
    userId: 'user-3',
    content: 'Finally organized my component library in Figma. It\'s the little things!',
    createdAt: subDays(new Date(), 9).toISOString(),
  },
  {
    id: 'post-20',
    userId: 'user-5',
    content: 'Busking in the park today was a blast. Love connecting with people through music.',
    imageUrl: 'https://picsum.photos/seed/post12/600/400',
    createdAt: subDays(new Date(), 10).toISOString(),
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
    content: "Stunning shot, Priya!",
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
  },
  {
    id: 'comment-5',
    postId: 'post-7',
    userId: 'user-current',
    content: 'Can\'t wait to hear it!',
    createdAt: subHours(new Date(), 7).toISOString(),
  },
  {
    id: 'comment-6',
    postId: 'post-18',
    userId: 'user-3',
    content: 'Haha, the struggle is real!',
    createdAt: subMinutes(new Date(), 25).toISOString(),
  },
];

export const likes: Like[] = [
  { postId: "post-1", userId: "user-2" },
  { postId: "post-1", userId: "user-3" },
  { postId: "post-1", userId: "user-current" },
  { postId: "post-2", userId: "user-1" },
  { postId: "post-2", userId: "user-current" },
  { postId: "post-3", userId: "user-current" },
  { postId: "post-4", userId: "user-1" },
  { postId: 'post-5', userId: 'user-1' },
  { postId: 'post-5', userId: 'user-2' },
  { postId: 'post-7', userId: 'user-3' },
  { postId: 'post-8', userId: 'user-current' },
  { postId: 'post-9', userId: 'user-1' },
  { postId: 'post-11', userId: 'user-2' },
  { postId: 'post-11', userId: 'user-3' },
  { postId: 'post-11', userId: 'user-4' },
  { postId: 'post-12', userId: 'user-3' },
  { postId: 'post-15', userId: 'user-current' },
  { postId: 'post-18', userId: 'user-1' },
  { postId: 'post-18', userId: 'user-2' },
  { postId: 'post-18', userId: 'user-4' },
];

export const follows: Follow[] = [
  { followerId: "user-current", followingId: "user-1" },
  { followerId: "user-current", followingId: "user-2" },
  { followerId: "user-current", followingId: "user-3" },
  { followerId: "user-1", followingId: "user-current" },
  { followerId: "user-2", followingId: "user-current" },
];

export const notifications: Notification[] = [
    {
        id: "notif-1",
        type: "like",
        userId: "user-1",
        postId: "post-4",
        createdAt: subHours(new Date(), 1).toISOString(),
        read: false,
    },
    {
        id: "notif-2",
        type: "comment",
        userId: "user-2",
        postId: "post-4",
        createdAt: subHours(new Date(), 2).toISOString(),
        read: false,
    },
    {
        id: "notif-3",
        type: "follow",
        userId: "user-3",
        createdAt: subHours(new Date(), 5).toISOString(),
        read: true,
    },
     {
        id: "notif-4",
        type: "like",
        userId: "user-4",
        postId: "post-4",
        createdAt: subDays(new Date(), 1).toISOString(),
        read: true,
    },
     {
        id: "notif-5",
        type: "follow",
        userId: "user-5",
        createdAt: subDays(new Date(), 2).toISOString(),
        read: true,
    },
];

// Helper functions to get data
export const getPost = (postId: string) => posts.find(p => p.id === postId);
export const getUser = (userId: string) => users.find(u => u.id === userId);
export const getUserByUsername = (username: string) => users.find(u => u.username === username);
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

export const getNotifications = (userId: string) => {
    // In a real app, you'd fetch notifications for the given userId.
    // Here we return all mock notifications for demonstration.
    return notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

    