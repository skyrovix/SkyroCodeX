import { SupportedLanguage } from "./language";

export interface Snippet {
  id: string;
  userId?: string;
  title: string;
  language: SupportedLanguage;
  code: string;
  stdin?: string;
  isPublic: boolean;
  shortId: string;
  createdAt: string;
  updatedAt: string;
  files?: Array<{
    name: string;
    content: string;
  }>;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  createdAt: string;
}

