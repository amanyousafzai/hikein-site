export type PostType = "adventure" | "photo" | "tripreport" | "achievement" | "update" | "tip" | "question";

export interface Comment {
  id: string;
  author: { name: string; avatar: string; username: string };
  text: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface FeedPost {
  id: string;
  type: PostType;
  author: { name: string; avatar: string; username: string; location: string };
  timestamp: string;
  content: string;
  image?: string;
  destination?: { id: string; name: string; type: string; elevation: string; location: string };
  likes: number;
  comments: Comment[];
  achievement?: { icon: string; label: string };
  tab: "latest" | "following" | "trending";
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "achievement" | "milestone";
  icon: string;
  text: string;
  timestamp: string;
  read: boolean;
  group: "today" | "week" | "earlier";
  actor?: { name: string; avatar: string; username: string };
}

const sampleComments: Comment[] = [
  {
    id: "c1",
    author: { name: "Aman Ali", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format", username: "aman-ali" },
    text: "Stunning! The water looks incredibly clear. What time of year was this?",
    timestamp: "2h ago",
    likes: 4,
    replies: [
      {
        id: "c1r1",
        author: { name: "Rafi Khan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", username: "rafi-khan" },
        text: "Mid-July — perfect conditions. Snow had just melted.",
        timestamp: "1h ago",
        likes: 2,
      },
    ],
  },
  {
    id: "c2",
    author: { name: "Sara Ahmed", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", username: "sara-ahmed" },
    text: "I have been wanting to do this trek for years. How is the trail condition from the base camp?",
    timestamp: "3h ago",
    likes: 1,
  },
  {
    id: "c3",
    author: { name: "Bilal Hussain", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format", username: "bilal-hussain" },
    text: "One of my absolute favourites in all of Swat. Great shot!",
    timestamp: "5h ago",
    likes: 7,
  },
];

export const feedPosts: FeedPost[] = [
  {
    id: "p1",
    type: "adventure",
    author: { name: "Rafi Khan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", username: "rafi-khan", location: "Swat, Pakistan" },
    timestamp: "2 hours ago",
    content: "One of the most beautiful alpine lakes I have ever visited. The reflection of the peaks in the crystal-clear water is something you cannot describe — only experience.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=500&fit=crop&auto=format",
    destination: { id: "kundol-lake", name: "Kundol Lake", type: "Lake", elevation: "3,600m", location: "Swat" },
    likes: 124,
    comments: sampleComments,
    tab: "following",
  },
  {
    id: "p2",
    type: "achievement",
    author: { name: "Rafi Khan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", username: "rafi-khan", location: "Swat, Pakistan" },
    timestamp: "1 day ago",
    content: "Reached a milestone I have been working toward for six years. 100 lakes completed across Pakistan's mountain regions.",
    achievement: { icon: "🏞", label: "100 Lakes Explorer" },
    likes: 312,
    comments: [],
    tab: "trending",
  },
  {
    id: "p3",
    type: "tripreport",
    author: { name: "Bilal Hussain", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format", username: "bilal-hussain", location: "Gilgit, Pakistan" },
    timestamp: "3 hours ago",
    content: "Trip Report: Nanga Parbat Base Camp — July 2026\n\nThe approach from Raikot Bridge is steep and relentless, but Fairy Meadows earns its name the moment you arrive. Camped two nights under the Killer Mountain. The 8,126-metre north face fills your entire field of view. Humbling doesn't cover it.\n\nConditions: Dry trail, snowline at 4,500m. Camping gear required. Start early.",
    image: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=800&h=500&fit=crop&auto=format",
    destination: { id: "nanga-parbat-base", name: "Nanga Parbat Base Camp", type: "Hike", elevation: "4,200m", location: "Diamer" },
    likes: 88,
    comments: [sampleComments[0]],
    tab: "latest",
  },
  {
    id: "p4",
    type: "photo",
    author: { name: "Sara Ahmed", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", username: "sara-ahmed", location: "Lahore, Pakistan" },
    timestamp: "5 hours ago",
    content: "Golden hour at Katora Lake. No filter, no editing — just Pakistan.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=500&fit=crop&auto=format",
    destination: { id: "katora-lake", name: "Katora Lake", type: "Lake", elevation: "3,900m", location: "Dir" },
    likes: 201,
    comments: [sampleComments[2]],
    tab: "trending",
  },
  {
    id: "p5",
    type: "tip",
    author: { name: "Kamran Shah", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format", username: "kamran-shah", location: "Skardu, Pakistan" },
    timestamp: "1 day ago",
    content: "Outdoor Tip: If you are trekking to Jahaz Banda this summer, the jeep road to Kumrat is now paved until the valley entrance. Save your knees for the trail itself. Best wildflower window is late June through early July — don't miss it.",
    likes: 56,
    comments: [],
    tab: "latest",
  },
  {
    id: "p6",
    type: "adventure",
    author: { name: "Zara Khan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format", username: "zara-khan", location: "Peshawar, Pakistan" },
    timestamp: "2 days ago",
    content: "Mahodand Lake on a clear morning — this is why I hike.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&h=500&fit=crop&auto=format",
    destination: { id: "mahodand-lake", name: "Mahodand Lake", type: "Lake", elevation: "2,884m", location: "Kalam" },
    likes: 147,
    comments: [sampleComments[1], sampleComments[2]],
    tab: "following",
  },
];

export const notifications: Notification[] = [
  { id: "n1", type: "like", icon: "❤️", text: "Ahmed liked your adventure at Kundol Lake", timestamp: "2 min ago", read: false, group: "today", actor: { name: "Ahmed Raza", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format", username: "bilal-hussain" } },
  { id: "n2", type: "follow", icon: "👤", text: "Rafi Khan started following you", timestamp: "1 hour ago", read: false, group: "today", actor: { name: "Rafi Khan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", username: "rafi-khan" } },
  { id: "n3", type: "comment", icon: "💬", text: "Sara Ahmed commented on your trip report", timestamp: "3 hours ago", read: false, group: "today", actor: { name: "Sara Ahmed", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", username: "sara-ahmed" } },
  { id: "n4", type: "achievement", icon: "🏆", text: "You earned the 10 Lakes Explorer achievement", timestamp: "Yesterday", read: true, group: "week" },
  { id: "n5", type: "like", icon: "❤️", text: "Bilal Hussain and 12 others liked your photo", timestamp: "2 days ago", read: true, group: "week", actor: { name: "Bilal Hussain", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format", username: "bilal-hussain" } },
  { id: "n6", type: "milestone", icon: "⛰", text: "Kamran Shah completed a milestone: 200 Adventures", timestamp: "3 days ago", read: true, group: "week", actor: { name: "Kamran Shah", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format", username: "kamran-shah" } },
  { id: "n7", type: "follow", icon: "👤", text: "Zara Khan started following you", timestamp: "1 week ago", read: true, group: "earlier", actor: { name: "Zara Khan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format", username: "zara-khan" } },
];

export const suggestedExplorers = [
  { name: "Usman Tariq", username: "usman-tariq", location: "Lahore", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&auto=format", adventures: 48 },
  { name: "Aisha Noor", username: "aisha-noor", location: "Islamabad", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format", adventures: 31 },
  { name: "Hamza Mir", username: "hamza-mir", location: "Quetta", avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop&auto=format", adventures: 62 },
];
