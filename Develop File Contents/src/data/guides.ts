export interface Guide {
  id: string;
  username: string;
  name: string;
  avatar: string;
  cover: string;
  location: string;
  bio: string;
  verified: boolean;
  verifiedType: "guide" | "explorer";
  experience: number;
  regions: string[];
  specializations: string[];
  languages: string[];
  certifications: string[];
  adventures: number;
  peaksGuided: number;
  tripReports: number;
  rating: number;
  reviewCount: number;
  upcomingExpeditions: string[];
}

export interface Expedition {
  id: string;
  title: string;
  destination: string;
  destinationId: string;
  image: string;
  organizer: { name: string; avatar: string; username: string; verified: boolean };
  type: "Day Hike" | "Multi-Day Trek" | "Peak Expedition" | "Camping" | "Beginner";
  dates: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Hard" | "Technical";
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  itinerary: { day: string; description: string }[];
  included: string[];
  notIncluded: string[];
  equipment: string[];
  safetyNotes: string[];
  meetingPoint: string;
  elevation: string;
}

export const guides: Guide[] = [
  {
    id: "bilal-hussain-guide",
    username: "bilal-hussain",
    name: "Bilal Hussain",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format",
    cover: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=1200&h=400&fit=crop&auto=format",
    location: "Gilgit, Gilgit-Baltistan",
    bio: "Professional mountain guide with 14 years of experience across the Karakoram and Hindukush ranges. Summited 12 peaks above 5,000m. Fluent in Shina, Urdu, and English.",
    verified: true,
    verifiedType: "guide",
    experience: 14,
    regions: ["Gilgit-Baltistan", "Chitral", "Swat", "Azad Kashmir"],
    specializations: ["High-Altitude Trekking", "Technical Mountaineering", "Rock Climbing", "Wilderness First Aid"],
    languages: ["Urdu", "English", "Shina", "Khowar"],
    certifications: ["UIAGM Mountain Guide (Associate)", "Wilderness First Responder", "Pakistan Mountain Guide Association Member"],
    adventures: 140,
    peaksGuided: 24,
    tripReports: 18,
    rating: 4.9,
    reviewCount: 47,
    upcomingExpeditions: ["nanga-bc-aug-2026", "falak-sep-2026"],
  },
  {
    id: "kamran-shah-guide",
    username: "kamran-shah",
    name: "Kamran Shah",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&auto=format",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&auto=format",
    location: "Skardu, Gilgit-Baltistan",
    bio: "Skardu-based expedition organizer with deep knowledge of the Baltoro and Gondogoro regions. Organized 60+ group expeditions since 2012. Local guide, porter coordinator, and logistics expert.",
    verified: true,
    verifiedType: "guide",
    experience: 12,
    regions: ["Skardu", "Hushe Valley", "Shigar", "Khaplu"],
    specializations: ["Expedition Logistics", "K2 Base Camp Treks", "Gondogoro La", "Concordia Trekking"],
    languages: ["Urdu", "English", "Balti"],
    certifications: ["Pakistan Tourism Authority Licensed Guide", "First Aid Certified", "High Altitude Course (NIM Uttarkashi)"],
    adventures: 210,
    peaksGuided: 8,
    tripReports: 31,
    rating: 4.8,
    reviewCount: 89,
    upcomingExpeditions: ["k2bc-oct-2026"],
  },
  {
    id: "rafi-khan-guide",
    username: "rafi-khan",
    name: "Rafi Khan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format",
    cover: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=400&fit=crop&auto=format",
    location: "Swat, Khyber Pakhtunkhwa",
    bio: "Swat Valley specialist and landscape photographer. Expert on Swat's lake circuit — Kundol, Mahodand, Katora, and beyond. Runs small group photography treks during wildflower season.",
    verified: true,
    verifiedType: "guide",
    experience: 8,
    regions: ["Swat", "Dir", "Chitral", "Kumrat Valley"],
    specializations: ["Photography Treks", "Alpine Lakes", "Wildflower Season Treks", "Family-Friendly Routes"],
    languages: ["Urdu", "English", "Pashto"],
    certifications: ["Pakistan Tourism Authority Licensed Guide", "Wilderness First Aid"],
    adventures: 180,
    peaksGuided: 3,
    tripReports: 12,
    rating: 4.9,
    reviewCount: 62,
    upcomingExpeditions: ["swat-lakes-aug-2026"],
  },
];

export const expeditions: Expedition[] = [
  {
    id: "nanga-bc-aug-2026",
    title: "Nanga Parbat Base Camp — Fairy Meadows Trek",
    destination: "Nanga Parbat Base Camp",
    destinationId: "nanga-parbat-base",
    image: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=800&h=500&fit=crop&auto=format",
    organizer: { name: "Bilal Hussain", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format", username: "bilal-hussain", verified: true },
    type: "Multi-Day Trek",
    dates: "10–17 August 2026",
    duration: "8 days",
    difficulty: "Moderate",
    maxParticipants: 12,
    currentParticipants: 8,
    description: "Experience one of Pakistan's most iconic trekking destinations under the guidance of a professional mountain guide. The approach to Nanga Parbat's north face base camp via Fairy Meadows is a route of extraordinary scenery, wildlife, and high-altitude wonder. This group is kept small (max 12) to ensure quality and safety.",
    itinerary: [
      { day: "Day 1", description: "Islamabad to Chilas. Drive along the Karakoram Highway." },
      { day: "Day 2", description: "Chilas to Raikot Bridge. Jeep transfer to Tattu Village. Overnight at Fairy Meadows guesthouse." },
      { day: "Day 3", description: "Acclimatisation day. Short hike to viewpoint. Photography evening." },
      { day: "Day 4", description: "Fairy Meadows to Nanga Parbat Base Camp (4,200m). Full-day hike. Return to Fairy Meadows." },
      { day: "Day 5", description: "Optional: Beyal Camp extension for experienced members. Rest day for others." },
      { day: "Day 6", description: "Descent to Tattu. Drive to Chilas." },
      { day: "Day 7", description: "Return to Islamabad via KKH." },
      { day: "Day 8", description: "Departure day / buffer." },
    ],
    included: ["Professional guide (Bilal Hussain)", "Shared guesthouse accommodation (Fairy Meadows)", "All meals on trail days", "Jeep transfers Raikot Bridge ↔ Tattu", "Group first aid kit"],
    notIncluded: ["Transport Islamabad ↔ Chilas", "Travel insurance (required)", "Personal gear", "Porter fees (available on request)", "Snacks and beverages"],
    equipment: ["4-season sleeping bag", "Waterproof hiking boots", "Trekking poles", "Rain gear", "Sun protection", "Headlamp"],
    safetyNotes: ["Maximum elevation 4,200m. Acclimatisation protocol followed.", "Bilal holds Wilderness First Responder certification.", "Emergency evacuation plan in place.", "Satellite communicator carried."],
    meetingPoint: "Islamabad Toll Plaza, 5:00 AM Day 1",
    elevation: "4,200m",
  },
  {
    id: "swat-lakes-aug-2026",
    title: "Swat Lakes Photography Trek",
    destination: "Kundol Lake",
    destinationId: "kundol-lake",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=500&fit=crop&auto=format",
    organizer: { name: "Rafi Khan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", username: "rafi-khan", verified: true },
    type: "Multi-Day Trek",
    dates: "5–9 August 2026",
    duration: "5 days",
    difficulty: "Moderate",
    maxParticipants: 8,
    currentParticipants: 6,
    description: "A small-group photography trek through Swat's finest alpine lakes during peak wildflower season. Led by landscape photographer and Swat native Rafi Khan, this expedition visits Kundol, Mahodand, and (weather permitting) Katora Lake. Maximum 8 participants to keep the group intimate.",
    itinerary: [
      { day: "Day 1", description: "Islamabad to Kalam. Afternoon briefing and gear check." },
      { day: "Day 2", description: "Trek to Kundol Lake via Northern Ridge. Golden hour photography. Camp at lake shore." },
      { day: "Day 3", description: "Dawn photography. Descent. Drive to Mahodand Lake. Sunset session." },
      { day: "Day 4", description: "Mahodand circuit. Attempt Katora Lake (weather dependent). Photography review session." },
      { day: "Day 5", description: "Return to Islamabad." },
    ],
    included: ["Expert photographer/guide (Rafi Khan)", "Camping equipment for lake shore nights", "All meals on trek days", "Photography feedback sessions", "Local transport Kalam area"],
    notIncluded: ["Transport Islamabad ↔ Kalam", "Travel insurance", "Camera equipment", "Personal gear"],
    equipment: ["Camera gear (any level welcome)", "Trekking poles", "Warm layers", "Rain jacket", "Comfortable hiking boots"],
    safetyNotes: ["Route is well-established and used by local shepherds.", "Rafi holds Wilderness First Aid certification.", "Weather window confirmed before Katora Lake attempt."],
    meetingPoint: "Kalam Bazaar, 8:00 AM Day 1",
    elevation: "3,600m",
  },
  {
    id: "k2bc-oct-2026",
    title: "K2 Base Camp — Baltoro Glacier Trek",
    destination: "Nanga Parbat Base Camp",
    destinationId: "nanga-parbat-base",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&auto=format",
    organizer: { name: "Kamran Shah", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format", username: "kamran-shah", verified: true },
    type: "Multi-Day Trek",
    dates: "1–16 October 2026",
    duration: "16 days",
    difficulty: "Hard",
    maxParticipants: 10,
    currentParticipants: 7,
    description: "The legendary Baltoro Glacier trek to K2 Base Camp — one of the greatest mountain journeys on Earth. 16 days through the heart of the Karakoram, past the Cathedral Towers, Trango Towers, Masherbrum, Broad Peak, and finally the Savage Mountain herself. Organized by Kamran Shah with 12 years of Baltoro experience.",
    itinerary: [
      { day: "Day 1–2", description: "Islamabad to Skardu by road or flight." },
      { day: "Day 3", description: "Skardu to Askoli (last village). Jeep transfer." },
      { day: "Day 4–5", description: "Trek to Jhola and Paiyu." },
      { day: "Day 6", description: "Paiyu to Liligo. Baltoro Glacier entry." },
      { day: "Day 7", description: "Liligo to Urdukas. First major peak views." },
      { day: "Day 8–9", description: "Urdukas to Goro II to Concordia (4,800m)." },
      { day: "Day 10–11", description: "Concordia to K2 Base Camp and return." },
      { day: "Day 12–16", description: "Gradual descent to Askoli. Return to Skardu and Islamabad." },
    ],
    included: ["Expert guide (Kamran Shah) + assistant", "Cook + kitchen staff", "All meals on trek", "Camping equipment", "Porters", "Permits (National Park, Zone Permit)"],
    notIncluded: ["Flights/transport Islamabad–Skardu", "Travel/evacuation insurance (mandatory)", "Personal gear", "Tips for crew"],
    equipment: ["High-altitude sleeping bag (-20°C rated)", "Four-season tent (provided)", "Trekking poles mandatory", "Gaiters", "Crampons recommended for October ice"],
    safetyNotes: ["Satellite phone carried at all times.", "Kamran has evacuated 3 clients in 12 years — all safely.", "October window preferred for stable weather and fewer groups.", "Altitude acclimatisation followed strictly."],
    meetingPoint: "Skardu City, 7:00 AM Day 3",
    elevation: "5,100m",
  },
];
