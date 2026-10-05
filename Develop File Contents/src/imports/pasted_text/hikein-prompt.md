# HIKEIN — OPTIMIZED MASTER PROMPT FOR FIGMA MAKE

Build a complete outdoor exploration platform called **HikeIN** — a premium digital home for Pakistan's hikers. Preserve all existing screens; extend only.

---

## Brand & Design System

**Feel:** Premium, outdoor, clean, community-driven, trustworthy. Not Facebook/Instagram/OTA.

**Preserve:** Logo, typography, colors, components, buttons, cards, navigation, spacing, radius, responsive behavior.

**Create menu:** + Add Adventure | Share Update | Write Trip Report | Create Event | Create Club | Submit Destination Contribution

**Primary nav (desktop):** Home, Explore, Community, Trip Reports, Clubs, Guides, Map, Notifications, Search, Profile

**Mobile bottom nav:** Home, Explore, Create, Community, Profile

**Universal states:** Default, Hover, Active, Selected, Disabled, Loading, Success, Error, Empty. Auto Layout + reusable components. Accessible (contrast, touch targets, error messages).

---

## Phase 1 — Explorer Identity & Adventure History

**Explorer Profile:** Cover, photo, name, username, location, bio, verification badge, followers/following, stats (adventures, lakes, peaks, hikes, meadows, highest elevation, regions), achievements, adventure timeline by year, trip reports, clubs, collections, recent adventures.

**Add Adventure flow:** Select destination → type (Lake/Peak/Hike/Meadow/Trek/Camping/Other) → date, duration, difficulty, story, photos, route, privacy (Public/Followers/Private) → Publish. Appears in: Profile, Timeline, Destination, Community Feed.

---

## Phase 2 — Community

**/community** — Tabs: Following | Latest | Trending

**Feed card:** Avatar + name + badge → action ("Completed a new adventure") → destination image → destination name + date → story excerpt → likes/comments/share → action buttons. Use large photography.

**Follow system:** Follow/Following buttons, follower counts, Followers List + Following List (photo, name, location, stats, follow button).

**Share Update:** Modal (desktop) / full-screen (mobile). Types: Adventure Story, Photo Update, Question, Outdoor Tip, General. Fields: text, photos, tag destination, visibility (Public/Followers), Publish button.

**Post Detail:** Profile info, content, images, tagged destination, likes, comments, related explorers.

**Comments:** On posts/adventures/trip reports. Avatar, name, text, timestamp, like, reply. Nested replies (simple).

**Notifications:** Dropdown (desktop) / page (mobile). Types: like, comment, follow, achievement, club, event, verification. Group: Today, This Week, Earlier.

**Discovery sections:** Trending Explorers, Popular Destinations, Recent Achievements, Trending Trip Reports, Suggested Follows.

**Empty states:** No posts, no notifications, no followers, no comments, new user feed.

---

## Phase 3 — Trip Reports, Routes & Knowledge

### Trip Reports

**/trip-reports** — Search + filters (destination, region, difficulty, duration, elevation, latest, popular). Cards: cover, title, explorer, destination, difficulty, duration, date.

**Trip Report Detail:** Hero image, title, explorer, destination, date, location, quick stats (distance, duration, difficulty, elevation, camping nights), structured sections (Overview, How to Reach, Starting Point, Transportation, Route, Difficulty, Camping, Water, Food, What to Carry, Tips, Safety), gallery, related, comments.

**Create flow:** Select Destination → Basic Info → Write Report (structured sections) → Upload Photos → Preview → Publish.

### Routes

**Route Detail:** Name, start/end points, distance, duration, difficulty, elevation gain, best season, description, waypoints, water/camping points, warnings, photos, trip reports using route, map placeholder.

**Destination Routes tab:** Multiple routes per destination (e.g., "Ladu Village → Kundol Lake, 8km, 4-6hrs, Moderate").

### Destination Contributions

**Improve This Destination:** Form (alternative names, photos, routes, elevation, camping, water, season, tips, safety, evidence). Workflow: Draft → Submitted → Under Review → Published → Rejected. Admin review interface.

### Destination Detail Tabs

Overview | Routes | Trip Reports | Adventures | Explorers | Gallery

**Discovery filters:** Type, region, elevation, difficulty, duration, season, camping, water. Examples: "Lakes above 3,500m", "Easy hikes near Islamabad", "Multi-day treks".

---

## Phase 4 — Clubs & Events

### Clubs

**/clubs** — Search + filters (location, activity, public/private, active, newest). Cards: cover, logo, name, location, members, adventures.

**Club Profile:** Cover, logo, name, location, description, founded, member count, verified badge, Join/Share. Tabs: Overview, Members, Adventures, Trip Reports, Events, Gallery, About.

**Overview:** Upcoming events, recent adventures, featured members, recent trip reports, stats (members, adventures, destinations, events).

**Members:** Cards with photo, name, stats, role (Founder/Admin/Organizer/Member).

**Club Admin Dashboard:** Sidebar (Overview, Members, Events, Adventures, Trip Reports, Requests, Settings), stats, pending requests.

### Events

**Event Detail:** Hero, title, organizer/club, date, location, difficulty, duration, max participants, available spots, meeting point, equipment, description, itinerary, instructions, participants. Buttons: Interested, Request to Join, Share.

**Event types:** Day Hike, Multi-Day Trek, Camping, Expedition, Meetup.

**Create Event (7 steps):** Basic → Location → Date/Duration → Difficulty/Requirements → Description/Itinerary → Participant Limit → Publish.

**Join Requests:** Pending, Approved, Declined. Organizer management interface.

**Rules:** No payments, no travel booking, no chat.

---

## Phase 5 — Verification & Trust

**/verification** — "Build Trust. Verify Your Outdoor Journey."

**Cards:** Verify Explorer Profile | Verify Achievement | Verify Hiking Club | Apply as Outdoor Guide. Each shows requirements, evidence needed, process, results.

**Types:**
- ✓ Verified Explorer — identity/credentials reviewed
- 🏆 Verified Achievement — evidence supports claim (e.g., 100 Lakes)
- ✓ Verified Club — recognized community
- ✓ Verified Outdoor Guide — professional guide

**Application Flow:** Select Type → Info → Evidence (adventure history, photos, trip reports, GPS, certificates, references, documents) → Review → Submit.

**Status screen:** Draft, Submitted, Under Review, More Info Required, Approved, Rejected. Timeline of review process.

**Verified Achievement Page (premium, shareable):** Explorer name, achievement, verified badge, completion date, lakes count, adventure history, photos, trip reports, verification date. Certificate-like visual design.

**Guide Profile:** Photo, verified badge, experience, regions, specializations, languages, certifications, years, adventures, trip reports, reviews placeholder.

**Admin Verification Center:** Sidebar (Pending, Under Review, More Info, Approved, Rejected). Detail: applicant, type, profile, history, evidence, files, previous applications. Actions: Approve, Reject, Request More Info (with confirmation modals).

---

## Phase 6 — Guides, Expeditions & Trips

**/guides** — Search + filters (region, activity, experience, language, verification). Cards: photo, name, verified badge, location, specialization, years, adventure count.

**Guide Profile:** Cover, photo, name, verified, location, bio, experience, regions, specializations, languages, certifications, adventure history, trip reports, upcoming expeditions. Buttons: Contact/Request, View Expeditions.

**/expeditions** — Categories: Day Hikes, Multi-Day Treks, Peak Expeditions, Camping, Beginner. Search + filters. Cards: image, title, destination, organizer, duration, difficulty, date, spots.

**Expedition Detail:** Hero, title, destination, organizer, verified guide/club, date, duration, difficulty, max participants, spots, price placeholder, description, itinerary, included/not included, equipment, safety, participants. Buttons: Request to Join, Save, Share. No payment flow (future-ready placeholder only).

**Request to Join:** Name, experience level, previous experience, emergency contact placeholder, notes. Status: Pending, Approved, Declined.

**Organizer Dashboard:** My Expeditions, Participants, Join Requests, Upcoming Trips, Past Trips, Stats.

---

## Phase 7 — Maps, Statistics & Intelligence

### /map — Explorer Map

Interactive map placeholder with destination markers. Filters: Lakes, Peaks, Hikes, Meadows, Regions, Years.

**Summary:** 32 Destinations, 12 Lakes, 5 Peaks, 8 Hikes, 7 Meadows, Highest Elevation 4,800m, Regions Explored.

### Statistics Page

- **Adventure:** Total, Lakes, Peaks, Hikes, Meadows
- **Elevation:** Highest, Average, Total Gain (placeholder)
- **Exploration:** Regions, Destinations, Countries
- **Time:** This Year, Most Active Month, History by Year

**Charts:** Adventures by Year, Destination Types, Regions Explored, Monthly Activity, Difficulty Breakdown. Clean, minimal.

### Collections

Create, add destinations, share, public/private. Examples: "My Swat Lakes", "Dream Peaks", "Islamabad Weekend Hikes". Show completed (✓) vs incomplete ( ).

### Smart Discovery

Enhanced explore with: Type, Region, Elevation, Difficulty, Duration, Season, Camping, Water. Presets: "Lakes above 3,500m", "Easy hikes near Islamabad", "Hidden lakes".

**Discovery page sections:** Popular This Month, Hidden Lakes, Weekend Hikes, High Altitude, Beginner Friendly, Most Completed, Recently Added, Trending Regions.

### Global Search

Search destinations, explorers, trip reports, routes, clubs, guides, expeditions.

### Admin Analytics

Total users, explorers, adventures, destinations, trip reports, routes, clubs, guides. Most explored destinations, active regions, popular routes, monthly growth.

---

## User Journeys (connect all flows)

1. **New user:** Landing → Signup → Onboarding → Interests → Follow → Discover → Record Adventure → Profile
2. **Community:** Follow → Feed → Like → Comment → Notification
3. **Knowledge:** Destination → Trip Report → Route → Contribute → Under Review
4. **Club:** Discover → Join → Event → Request → Organizer Review
5. **Verification:** Apply → Submit → Track → Approved → Badge
6. **Guide:** Discover → Profile → Expedition → Request
7. **Map:** View Map → Filter → Stats → Open Destination

---

## Final Consistency Review

- One unified platform (not 7 apps)
- Consistent navigation (desktop + mobile)
- Reusable components everywhere
- Loading skeletons, empty states, error states for all screens
- All major actions have confirmation/success states
- Duplicate screens consolidated
- Developer-ready (Auto Layout, components, variants)

**End state:** Explore. Record. Connect. Learn. Organize. Verify. Discover.