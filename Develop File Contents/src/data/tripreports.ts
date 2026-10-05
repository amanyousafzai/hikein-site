export interface TripReport {
  id: string;
  title: string;
  author: { name: string; avatar: string; username: string };
  destinationId: string;
  destinationName: string;
  location: string;
  date: string;
  distance: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Hard" | "Technical";
  heroImage: string;
  overview: string;
  howToReach: string;
  startingPoint: string;
  hikingRoute: string;
  difficultyDesc: string;
  camping: string;
  water: string;
  whatToCarry: string[];
  tips: string[];
  warnings: string[];
  gallery: string[];
  likes: number;
  comments: number;
  views: number;
  routeId?: string;
}

export const tripReports: TripReport[] = [
  {
    id: "kharkhari-lake-rafi-2026",
    title: "My Journey to Kharkhari Lake",
    author: { name: "Rafi Khan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", username: "rafi-khan" },
    destinationId: "kundol-lake",
    destinationName: "Kundol Lake",
    location: "Swat, Khyber Pakhtunkhwa",
    date: "August 2026",
    distance: "18 KM",
    duration: "8 Hours",
    difficulty: "Hard",
    heroImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=600&fit=crop&auto=format",
    overview: "Kundol Lake sits at 3,600 metres in the upper Swat Valley and demands respect. This is not a casual day hike — it's a full-day endeavour through increasingly rugged terrain that rewards you with one of the finest alpine lakes in Pakistan. I completed the full circuit from Ladu Village via the northern ridge, which adds 4 km but delivers extraordinary panoramic views. If you've done Mahodand and want the next step, this is it.",
    howToReach: "From Kalam, take a jeep or local transport toward Ladu Village (approximately 45 minutes, dirt road). Most Kalam guesthouse owners can arrange a jeep for PKR 1,500–2,000. Ensure you arrive in Ladu before 7 AM to have sufficient daylight for the full circuit.",
    startingPoint: "Ladu Village (2,100m elevation). There is a small chai stall at the trailhead that opens at 6 AM. Use this as your staging point — fill water here as the next reliable source is 3 hours up the trail.",
    hikingRoute: "The trail begins northeast of Ladu Village along a well-worn shepherd's path. After 2 km the path forks — take the left (northern) branch, which is slightly less obvious but significantly more scenic. The first 4 km are moderate through dense pine forest. At the treeline (approximately 2,900m) the terrain opens onto a wide alpine meadow. From here the lake is visible but still 2 km distant across boulder fields. The final kilometre involves hands-on scrambling across large talus — trekking poles are essential.",
    difficultyDesc: "Hard. The elevation gain is approximately 1,500 metres across 9 km (one way). The boulder field section requires physical fitness and sure footing. The trail is not marked — navigation experience or a local guide is strongly recommended. Not suitable for children under 12.",
    camping: "Camping is available at two locations: the meadow at 3,200m (flat, sheltered, no water nearby — carry from the stream 500m below) and the lake shore itself (exposed to wind but extraordinary). The lake shore camp is worth the exposure. Campfires are discouraged due to limited wood at altitude.",
    water: "The first reliable water source is a glacial stream at 2,800m (approximately 3 hours from Ladu). The lake water is clean and drinkable — filter or treat as a precaution. Carry minimum 2 litres from Ladu.",
    whatToCarry: [
      "Trekking poles (mandatory for boulder section)",
      "Minimum 2 litres water from Ladu",
      "Water filter or purification tablets",
      "High-energy snacks and a full lunch",
      "Warm layer and windproof jacket (temperature drops sharply at the lake)",
      "First aid kit",
      "Headlamp (return in evening is possible but not recommended)",
      "Sunscreen and sunglasses (UV is intense at altitude)",
      "Gaiters recommended for early season snow",
    ],
    tips: [
      "Start before 7 AM. Afternoon cloud builds rapidly in Swat from 1 PM onwards.",
      "Hire a local guide from Ladu Village (PKR 1,500–2,000). It supports local livelihoods and the trail is genuinely confusing in places.",
      "The northern ridge route (left fork at 2 km) takes 1 extra hour but is worth every minute.",
      "Late July to mid-August is peak wildflower season — the meadow section is extraordinary.",
      "Shepherd families sometimes camp at the lake in summer. They are friendly and can help in emergencies.",
    ],
    warnings: [
      "Do not attempt in poor weather or when cloud is already forming on arrival.",
      "The boulder field section is risky when wet. Turn back if rain begins on the descent.",
      "No mobile signal above 2,500m. Inform your accommodation of your planned return time.",
      "Altitude sickness is possible. Acclimatise in Kalam for one night before attempting this trek.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&h=400&fit=crop&auto=format",
    ],
    likes: 87,
    comments: 14,
    views: 412,
    routeId: "kundol-northern-ridge",
  },
  {
    id: "nanga-parbat-bc-bilal-2026",
    title: "Fairy Meadows and the Killer Mountain",
    author: { name: "Bilal Hussain", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format", username: "bilal-hussain" },
    destinationId: "nanga-parbat-base",
    destinationName: "Nanga Parbat Base Camp",
    location: "Diamer, Gilgit-Baltistan",
    date: "July 2026",
    distance: "22 KM",
    duration: "2 Days",
    difficulty: "Moderate",
    heroImage: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=1200&h=600&fit=crop&auto=format",
    overview: "The approach to Nanga Parbat Base Camp is one of the great experiences of Pakistani trekking. The combination of the notorious Raikot jeep road, the impossibly green Fairy Meadows, and the overwhelming scale of the 8,126-metre north face makes this a journey unlike any other. I completed the full approach over two days, camping at Fairy Meadows and reaching base camp on the second morning. The mountain fills your entire horizon. It is humbling in the most complete sense.",
    howToReach: "Fly to Islamabad, then take the Karakoram Highway north to Raikot Bridge (7–8 hours by bus or hire car). At Raikot Bridge, hire jeeps for the notorious 16 km jeep road to Tattu Village — this road is genuinely alarming but passable. From Tattu, the trail to Fairy Meadows is 4 km on foot.",
    startingPoint: "Tattu Village (3,300m). Accommodation and basic supplies are available. Several guesthouses operate at Fairy Meadows itself.",
    hikingRoute: "Tattu → Fairy Meadows (4 km, 2 hours). The meadow guesthouses are the overnight point. Day 2: Fairy Meadows → Nanga Parbat Base Camp (7 km, 4 hours one way). The trail climbs steadily through birch forest before opening onto the moraine. The north face becomes visible at the forest edge and does not leave your sight for the rest of the approach.",
    difficultyDesc: "Moderate for the trekking sections. The challenge is the approach logistics, not the trail gradient. Altitude is significant — Fairy Meadows is at 3,300m and base camp at 4,200m. Allow two nights at Fairy Meadows to acclimatise properly.",
    camping: "Fairy Meadows has established guesthouses (PKR 3,000–5,000 per night including meals). Wild camping at base camp is possible — bring a four-season tent as temperatures drop below zero even in July.",
    water: "Streams are plentiful throughout the route. The base camp area has glacial melt streams. Always filter or treat.",
    whatToCarry: [
      "Four-season sleeping bag for base camp night",
      "Trekking poles",
      "Full rain gear — weather changes rapidly",
      "Sunscreen factor 50+ (UV is extreme on the moraine)",
      "Camera with extra batteries (cold drains batteries fast)",
      "Cash — no ATMs after Chilas",
      "Altitude sickness medication (diamox recommended)",
    ],
    tips: [
      "Book jeeps from Raikot Bridge in advance — the road is shared and space fills quickly in peak season.",
      "Spend two nights at Fairy Meadows before going to base camp.",
      "Early morning at base camp is the clearest — leave Fairy Meadows at 5 AM.",
      "The guesthouse owners at Fairy Meadows are an excellent source of current trail and weather information.",
    ],
    warnings: [
      "The jeep road from Raikot Bridge is genuinely dangerous. Travel only during daylight.",
      "Altitude sickness is a real risk. Do not rush the acclimatisation.",
      "Weather can close the mountain rapidly. Have flexibility in your itinerary.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&auto=format",
    ],
    likes: 143,
    comments: 22,
    views: 891,
    routeId: "nanga-raikot-approach",
  },
  {
    id: "jahaz-banda-kamran-2026",
    title: "The Ship Meadow: A Kumrat Valley Classic",
    author: { name: "Kamran Shah", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format", username: "kamran-shah" },
    destinationId: "jahaz-banda",
    destinationName: "Jahaz Banda",
    location: "Kumrat Valley, Dir",
    date: "June 2026",
    distance: "12 KM",
    duration: "5 Hours",
    difficulty: "Moderate",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=600&fit=crop&auto=format",
    overview: "Jahaz Banda is the defining destination of Kumrat Valley. Named for its ship-like shape when viewed from above, this high plateau sits at 3,100m and offers an experience that feels both remote and accessible. The wildflower bloom in June transforms the meadow into something from a painting. This report covers the standard approach from the Kumrat Valley floor.",
    howToReach: "From Timergara (Dir), take transport toward Kumrat Valley (3–4 hours). The valley road is improved and most vehicles can manage it in dry conditions. The trailhead is at the upper end of Kumrat Valley, near the Panjkora River headwaters.",
    startingPoint: "Upper Kumrat Valley (2,200m). Camping and basic accommodation available at the valley floor.",
    hikingRoute: "The trail ascends steadily through thick deodar forest for the first 4 km. The forest section is cool and well-shaded. After the treeline the plateau reveals itself gradually — there is a satisfying moment where the meadow suddenly opens. The return is via the same route.",
    difficultyDesc: "Moderate. Steady ascent with no technical sections. The altitude (3,100m) is manageable for most fit hikers without acclimatisation, though arriving from Islamabad and hiking the same day is not recommended.",
    camping: "Excellent camping on the meadow. Flat ground, clean water from the stream that bisects the plateau, and extraordinary star visibility at night.",
    water: "Reliable stream on the plateau. Stream at 2,600m approximately 2 hours up. Carry 1.5 litres from the valley floor.",
    whatToCarry: ["Warm layers (meadow temperature drops even in June)", "Windproof jacket", "Sun protection", "Trekking poles helpful but not required"],
    tips: ["Late June is peak wildflower season — plan around this window.", "The plateau is large enough to explore for a full day if camping."],
    warnings: ["Weather in Dir can be unpredictable. Start early and watch the sky.", "The forest section can be slippery when wet."],
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&auto=format",
    ],
    likes: 54,
    comments: 8,
    views: 267,
  },
];

