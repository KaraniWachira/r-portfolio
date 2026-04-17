export interface TechTag {
  name: string;
  color: string;
  severity: 'success' | 'info' | 'danger' | 'warn' | 'secondary' | 'contrast';
  tooltip: string;
}

export interface ProjectComment {
  id: string;
  author: string;
  phase: string;
  content: string;
  techTags: TechTag[];
  timestamp: Date;
  upvotes: number;
  userVote?: 'up' | 'down' | null;
  replies?: ProjectComment[];
}

export interface Article {
  platform: 'medium' | 'hashnode';
  title: string;
  url: string;
  readTime: string;
}

export interface Project {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  subredditColor: string;
  timestamp: Date;
  content: string;
  imageUrl?: string;
  upvotes: number;
  userVote?: 'up' | 'down' | null;
  commentCount: number;
  awards: string[];
  summaryComments: ProjectComment[];
  articles: Article[];
}
