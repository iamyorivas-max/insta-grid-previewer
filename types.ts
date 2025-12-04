export interface FeedImage {
  id: string;
  url: string;
  isAiGenerated?: boolean;
}

export interface Highlight {
  id: string;
  title: string;
  coverUrl: string;
}

export interface UserProfile {
  username: string;
  name: string;
  bio: string;
  link: string;
  avatarUrl: string;
  postsCount: string;
  followersCount: string;
  followingCount: string;
  highlights: Highlight[];
}

export enum GridGap {
  NONE = 'gap-0',
  THIN = 'gap-0.5',
  STANDARD = 'gap-1',
  WIDE = 'gap-4',
}

export interface ImageConfig {
  aspectRatio: string;
  imageSize: string;
}
