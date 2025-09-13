export type User = {
  id: string;
  name: string;
  username: string;
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
