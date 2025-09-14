export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  bio: string;
  bannerUrl?: string;
};

export type Post = {
  id: string;
  userId: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
};

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
};

export type Like = {
  postId: string;
  userId: string;
};

export type Follow = {
  followerId: string;
  followingId: string;
};

export type Notification = {
  id: string;
  type: "like" | "comment" | "follow";
  userId: string; // ID of the user who triggered the notification
  postId?: string; // ID of the relevant post, if any
  createdAt: string;
  read: boolean;
};
