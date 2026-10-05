export interface RouteWaypoint {
  name: string;
  elevation: string;
  description: string;
}

export interface HikingRoute {
  id: string;
  destinationId: string;
  name: string;
  startPoint: string;
  endPoint: string;
  distance: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Hard" | "Technical";
  elevationGain: string;
  description: string;
  waypoints: RouteWaypoint[];
  photos: string[];
  reportCount: number;
  popularMonth: string;
}

export const hikingRoutes: HikingRoute[] = [
  {
    id: "kundol-northern-ridge",
    destinationId: "kundol-lake",
    name: "Northern Ridge Route",
    startPoint: "Ladu Village (2,100m)",
    endPoint: "Kundol Lake (3,600m)",
    distance: "9 km",
    duration: "4–6 hours",
    difficulty: "Moderate",
    elevationGain: "1,500m",
    description: "The classic and most popular approach to Kundol Lake. The trail follows shepherd paths through pine forest before breaking above the treeline onto alpine meadows. Final approach crosses a boulder field requiring some scrambling.",
    waypoints: [
      { name: "Ladu Village", elevation: "2,100m", description: "Trailhead. Chai available. Fill water here." },
      { name: "Forest Entry", elevation: "2,300m", description: "Trail enters dense pine and fir forest. Well-defined path." },
      { name: "Trail Fork", elevation: "2,500m", description: "Keep left for Northern Ridge (recommended). Right fork is shorter but less scenic." },
      { name: "Glacial Stream", elevation: "2,800m", description: "Reliable water source. Rest point. Last shade before treeline." },
      { name: "Alpine Meadow", elevation: "3,200m", description: "Treeline ends. First views of Kundol Lake basin. Rest point." },
      { name: "Boulder Field", elevation: "3,400m", description: "Scrambling required. Trekking poles very helpful. 30–45 min to lake." },
      { name: "Kundol Lake", elevation: "3,600m", description: "Destination. Camping on south shore." },
    ],
    photos: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&auto=format",
    ],
    reportCount: 8,
    popularMonth: "July – August",
  },
  {
    id: "kundol-direct-south",
    destinationId: "kundol-lake",
    name: "Direct South Approach",
    startPoint: "Ladu Village (2,100m)",
    endPoint: "Kundol Lake (3,600m)",
    distance: "7 km",
    duration: "3–4 hours",
    difficulty: "Hard",
    elevationGain: "1,500m",
    description: "A shorter but steeper alternative. Takes the right fork at 2,500m and ascends more directly via a narrow gully. Faster but less scenic and more physically demanding on the legs.",
    waypoints: [
      { name: "Ladu Village", elevation: "2,100m", description: "Trailhead." },
      { name: "Trail Fork", elevation: "2,500m", description: "Take right fork for direct route." },
      { name: "South Gully", elevation: "3,000m", description: "Steep sustained climb. Loose rock in places." },
      { name: "Kundol Lake", elevation: "3,600m", description: "Destination." },
    ],
    photos: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format"],
    reportCount: 3,
    popularMonth: "July – September",
  },
  {
    id: "nanga-raikot-approach",
    destinationId: "nanga-parbat-base",
    name: "Raikot Approach — Fairy Meadows Route",
    startPoint: "Tattu Village (3,300m)",
    endPoint: "Nanga Parbat Base Camp (4,200m)",
    distance: "11 km",
    duration: "2 days",
    difficulty: "Moderate",
    elevationGain: "900m",
    description: "The standard approach to Nanga Parbat's north face base camp. Two days allows for proper acclimatisation at Fairy Meadows before the final approach to base camp. One of Pakistan's most iconic trekking routes.",
    waypoints: [
      { name: "Tattu Village", elevation: "3,300m", description: "Trailhead. Accommodation available. Start point for Fairy Meadows approach." },
      { name: "Fairy Meadows", elevation: "3,300m", description: "Day 1 overnight. Guesthouses available. First views of Nanga Parbat north face." },
      { name: "Forest Edge", elevation: "3,700m", description: "Birch forest gives way to moraine. North face becomes fully visible." },
      { name: "Moraine Camp", elevation: "3,900m", description: "Informal rest point on the lateral moraine." },
      { name: "Nanga Parbat Base Camp", elevation: "4,200m", description: "Destination. Day 2 turnaround point." },
    ],
    photos: [
      "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format",
    ],
    reportCount: 12,
    popularMonth: "June – September",
  },
  {
    id: "mahodand-lake-circuit",
    destinationId: "mahodand-lake",
    name: "Mahodand Lake Circuit",
    startPoint: "Mahodand Village (2,800m)",
    endPoint: "Mahodand Lake (2,884m)",
    distance: "4 km",
    duration: "1–2 hours",
    difficulty: "Easy",
    elevationGain: "84m",
    description: "A gentle, accessible route to one of Pakistan's most beautiful lakes. The circuit allows a full loop around the lake with multiple viewpoints. Ideal for families and those new to alpine hiking.",
    waypoints: [
      { name: "Mahodand Village", elevation: "2,800m", description: "Starting point. Accommodation and food available." },
      { name: "Lake Inlet", elevation: "2,850m", description: "First lake views. Photography point." },
      { name: "North Shore", elevation: "2,884m", description: "Best reflection views of surrounding peaks." },
      { name: "East Shore", elevation: "2,860m", description: "Quieter bank. Picnic area." },
      { name: "Mahodand Village", elevation: "2,800m", description: "Circuit completes." },
    ],
    photos: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&h=400&fit=crop&auto=format",
    ],
    reportCount: 21,
    popularMonth: "May – October",
  },
];
