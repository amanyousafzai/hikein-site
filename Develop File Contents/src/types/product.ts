export type Visibility = "public" | "followers" | "private";
export type Difficulty = "Easy" | "Moderate" | "Strenuous" | "Technical";

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email?: string;
  avatarUrl: string;
  coverUrl?: string;
  bio: string;
  location: string;
  joinedAt: string;
  updatedAt: string;
  isPrivate: boolean;
  role: "member" | "guide" | "organizer" | "admin";
}

export interface HikeRecord {
  id: string;
  userId: string;
  title: string;
  description: string;
  destinationId?: string;
  location: string;
  coordinates?: { latitude: number; longitude: number };
  date: string;
  distanceKm: number;
  elevationGainM: number;
  durationMinutes: number;
  difficulty: Difficulty;
  startPoint: string;
  endPoint: string;
  coverImage?: string;
  photoUrls: string[];
  tags: string[];
  weather?: string;
  companions?: string;
  notes?: string;
  visibility: Visibility;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface CommentRecord {
  id: string;
  userId: string;
  contentType: "hike" | "post";
  contentId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  metric: "hikes" | "distanceKm" | "elevationM" | "summits";
  threshold: number;
}

export interface UserBadge {
  userId: string;
  badgeId: string;
  earnedAt: string;
}

export interface ProductNotification {
  id: string;
  userId: string;
  type: "follow" | "like" | "comment" | "mention" | "badge";
  actorId?: string;
  referenceId?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface UserPreferences {
  profileVisibility: Visibility;
  followPermission: "everyone" | "approval";
  activityVisibility: Visibility;
  emailLikes: boolean;
  emailComments: boolean;
  emailFollowers: boolean;
  emailAchievements: boolean;
}
