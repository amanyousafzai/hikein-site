export type MemberRole = "Founder" | "Admin" | "Member";

export interface ClubMember {
  name: string;
  avatar: string;
  username: string;
  role: MemberRole;
  adventures: number;
  location: string;
}

export interface ClubEvent {
  id: string;
  clubId: string;
  title: string;
  destination: string;
  destinationId: string;
  image: string;
  dates: string;
  difficulty: "Easy" | "Moderate" | "Hard" | "Technical";
  duration: string;
  maxParticipants: number;
  currentParticipants: number;
  meetingPoint: string;
  description: string;
  itinerary: { day: string; description: string }[];
  equipment: string[];
  status: "upcoming" | "ongoing" | "completed";
}

export interface Club {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  description: string;
  logo: string;
  cover: string;
  memberCount: number;
  founded: string;
  website?: string;
  adventures: number;
  destinations: number;
  category: string;
  isPublic: boolean;
  members: ClubMember[];
  recentAdventures: { name: string; image: string; date: string }[];
}

export const clubs: Club[] = [
  {
    id: "aman-hiking-club",
    slug: "aman-hiking-club",
    name: "Aman Hiking Club",
    tagline: "Exploring Pakistan's wild places, together.",
    location: "Islamabad, Pakistan",
    description: "Aman Hiking Club was founded in 2018 by a group of weekend hikers who wanted to share their love of Pakistan's mountains with a wider community. We organize regular treks, educational sessions, and annual expeditions across KPK, Gilgit-Baltistan, and Azad Kashmir. Our community values safety, environmental respect, and welcoming hikers of all experience levels.",
    logo: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop&auto=format",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&auto=format",
    memberCount: 284,
    founded: "March 2018",
    website: "hikein.pk/clubs/aman-hiking-club",
    adventures: 140,
    destinations: 38,
    category: "General Hiking",
    isPublic: true,
    members: [
      { name: "Aman Ali", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format", username: "aman-ali", role: "Founder", adventures: 54, location: "Islamabad" },
      { name: "Sara Ahmed", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", username: "sara-ahmed", role: "Admin", adventures: 31, location: "Lahore" },
      { name: "Zara Khan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format", username: "zara-khan", role: "Member", adventures: 38, location: "Peshawar" },
      { name: "Rafi Khan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", username: "rafi-khan", role: "Member", adventures: 180, location: "Swat" },
    ],
    recentAdventures: [
      { name: "Kundol Lake", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop&auto=format", date: "15 Jul 2026" },
      { name: "Jahaz Banda", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=200&fit=crop&auto=format", date: "12 Jun 2026" },
      { name: "Mahodand Lake", image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=300&h=200&fit=crop&auto=format", date: "3 Jun 2026" },
    ],
  },
  {
    id: "nust-adventure-club",
    slug: "nust-adventure-club",
    name: "NUST Adventure Club",
    tagline: "University mountaineers and outdoor enthusiasts.",
    location: "Islamabad, Pakistan",
    description: "The NUST Adventure Club connects students and alumni of NUST University around a shared passion for outdoor adventure. We run semester treks, skill workshops, mountaineering courses, and an annual expedition to a 6,000m+ peak. Membership is open to current students and alumni.",
    logo: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=200&h=200&fit=crop&auto=format",
    cover: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=1200&h=400&fit=crop&auto=format",
    memberCount: 158,
    founded: "September 2015",
    adventures: 87,
    destinations: 24,
    category: "University Club",
    isPublic: true,
    members: [
      { name: "Bilal Hussain", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format", username: "bilal-hussain", role: "Admin", adventures: 140, location: "Gilgit" },
      { name: "Kamran Shah", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format", username: "kamran-shah", role: "Member", adventures: 210, location: "Skardu" },
    ],
    recentAdventures: [
      { name: "Falak Sar", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&auto=format", date: "3 Jun 2026" },
      { name: "Nanga Parbat BC", image: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=300&h=200&fit=crop&auto=format", date: "18 May 2026" },
    ],
  },
  {
    id: "swat-explorers",
    slug: "swat-explorers",
    name: "Swat Explorers",
    tagline: "Documenting the mountain heritage of Swat.",
    location: "Swat, KPK",
    description: "A community of local and visiting explorers dedicated to discovering, documenting, and protecting the outdoor heritage of Swat District. Our members include local guides, photographers, and hikers from across Pakistan.",
    logo: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&h=200&fit=crop&auto=format",
    cover: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=400&fit=crop&auto=format",
    memberCount: 92,
    founded: "June 2020",
    adventures: 210,
    destinations: 45,
    category: "Regional Community",
    isPublic: true,
    members: [
      { name: "Rafi Khan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", username: "rafi-khan", role: "Founder", adventures: 180, location: "Swat" },
    ],
    recentAdventures: [
      { name: "Kundol Lake", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop&auto=format", date: "15 Jul 2026" },
    ],
  },
];

export const clubEvents: ClubEvent[] = [
  {
    id: "aman-kundol-aug-2026",
    clubId: "aman-hiking-club",
    title: "Kundol Lake Expedition",
    destination: "Kundol Lake",
    destinationId: "kundol-lake",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=500&fit=crop&auto=format",
    dates: "15–17 August 2026",
    difficulty: "Moderate",
    duration: "3 days / 2 nights",
    maxParticipants: 20,
    currentParticipants: 12,
    meetingPoint: "Benazir Bhutto International Airport Pickup Point, Islamabad — 5:00 AM",
    description: "Our annual flagship trek to Kundol Lake in Swat. Three days in the high alpine — forested trails, wildflower meadows, and the lake at 3,600 metres. Open to members and their guests. All experience levels welcome provided you can manage 8–10 km per day on mountain terrain.",
    itinerary: [
      { day: "Day 1", description: "Early departure from Islamabad. Drive to Kalam (7 hrs). Afternoon acclimatisation walk. Overnight in Kalam." },
      { day: "Day 2", description: "Trek to Kundol Lake via Northern Ridge Route (9 km, 6 hrs). Camp at the lake shore. Evening photography session." },
      { day: "Day 3", description: "Morning at the lake. Descent to Ladu Village (4 hrs). Return drive to Islamabad." },
    ],
    equipment: [
      "Trekking poles (strongly recommended)",
      "Sleeping bag rated to -5°C minimum",
      "Tent (provided for solo members — specify at registration)",
      "Waterproof hiking boots",
      "Rain jacket and warm mid-layer",
      "Headlamp with spare batteries",
      "3 litres water capacity",
      "Personal first aid",
    ],
    status: "upcoming",
  },
  {
    id: "nust-falak-sep-2026",
    clubId: "nust-adventure-club",
    title: "Falak Sar Summit Attempt",
    destination: "Falak Sar",
    destinationId: "falak-sar",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&auto=format",
    dates: "5–12 September 2026",
    difficulty: "Technical",
    duration: "8 days",
    maxParticipants: 10,
    currentParticipants: 7,
    meetingPoint: "NUST H-12 Main Gate, Islamabad — 4:00 AM",
    description: "NUST Adventure Club's annual technical peak. Falak Sar at 5,918m is the highest point in Swat District. This is a serious mountaineering objective requiring previous high-altitude experience. Rope work and crampon use required. Application with experience record mandatory.",
    itinerary: [
      { day: "Day 1–2", description: "Drive to Swat. Approach hike to Base Camp (3,800m)." },
      { day: "Day 3–4", description: "Acclimatisation rotations. Camp 1 establishment at 4,600m." },
      { day: "Day 5–6", description: "Camp 2 at 5,200m. Rest and weather window assessment." },
      { day: "Day 7", description: "Summit day. Departure 2 AM. Summit by mid-morning if conditions permit. Return to Base Camp." },
      { day: "Day 8", description: "Descent and return to Islamabad." },
    ],
    equipment: [
      "Mountaineering boots (double) — mandatory",
      "Crampons — mandatory",
      "Ice axe — mandatory",
      "Harness and helmet",
      "Down suit or equivalent (-20°C rated)",
      "High-altitude sleeping bag",
      "Supplemental oxygen not required but altitude medication recommended",
    ],
    status: "upcoming",
  },
  {
    id: "aman-jahaz-jun-2026",
    clubId: "aman-hiking-club",
    title: "Jahaz Banda Wildflower Trek",
    destination: "Jahaz Banda",
    destinationId: "jahaz-banda",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop&auto=format",
    dates: "27–29 June 2026",
    difficulty: "Moderate",
    duration: "3 days",
    maxParticipants: 24,
    currentParticipants: 24,
    meetingPoint: "Islamabad Motorway Toll Plaza",
    description: "A sold-out trek to Jahaz Banda during peak wildflower season. This event is now complete.",
    itinerary: [],
    equipment: [],
    status: "completed",
  },
];

export interface ContributionSubmission {
  id: string;
  destinationId: string;
  destinationName: string;
  author: string;
  type: string;
  content: string;
  submittedAt: string;
  status: "Submitted" | "Under Review" | "Published" | "Rejected";
}

export const contributions: ContributionSubmission[] = [
  { id: "c1", destinationId: "kundol-lake", destinationName: "Kundol Lake", author: "Rafi Khan", type: "Route Correction", content: "The southern approach fork is at 2,500m, not 2,300m as listed. Updated GPS waypoint available.", submittedAt: "2 days ago", status: "Under Review" },
  { id: "c2", destinationId: "mahodand-lake", destinationName: "Mahodand Lake", author: "Sara Ahmed", type: "Best Season", content: "September is also excellent — far fewer tourists than July/August. Water levels at peak, weather generally stable.", submittedAt: "5 days ago", status: "Submitted" },
  { id: "c3", destinationId: "jahaz-banda", destinationName: "Jahaz Banda", author: "Kamran Shah", type: "Camping Information", content: "New camping area opened on the eastern plateau — better wind shelter than the traditional south shore spot. Capacity around 15 tents.", submittedAt: "1 week ago", status: "Published" },
  { id: "c4", destinationId: "falak-sar", destinationName: "Falak Sar", author: "Bilal Hussain", type: "Safety Warning", content: "Rockfall risk significantly increased on the northeast couloir after the 2025 earthquake. All parties should use the western approach only.", submittedAt: "2 weeks ago", status: "Published" },
];
