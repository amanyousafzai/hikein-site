import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const DestinationDetail = lazy(() => import("./pages/DestinationDetail"));
const AddAdventure = lazy(() => import("./pages/AddAdventure"));
const ExplorerProfile = lazy(() => import("./pages/ExplorerProfile"));
const Explorers = lazy(() => import("./pages/Explorers"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const Community = lazy(() => import("./pages/Community"));
const ShareUpdate = lazy(() => import("./pages/ShareUpdate"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const Notifications = lazy(() => import("./pages/Notifications"));
const TripReports = lazy(() => import("./pages/TripReports"));
const TripReportDetail = lazy(() => import("./pages/TripReportDetail"));
const CreateTripReport = lazy(() => import("./pages/CreateTripReport"));
const RouteDetail = lazy(() => import("./pages/RouteDetail"));
const SubmitContribution = lazy(() => import("./pages/SubmitContribution"));
const Clubs = lazy(() => import("./pages/Clubs"));
const ClubProfile = lazy(() => import("./pages/ClubProfile"));
const CreateClub = lazy(() => import("./pages/CreateClub"));
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const CreateEvent = lazy(() => import("./pages/CreateEvent"));
const Verification = lazy(() => import("./pages/Verification"));
const VerificationApply = lazy(() => import("./pages/VerificationApply"));
const VerifiedAchievement = lazy(() => import("./pages/VerifiedAchievement"));
const Guides = lazy(() => import("./pages/Guides"));
const GuideProfile = lazy(() => import("./pages/GuideProfile"));
const Expeditions = lazy(() => import("./pages/Expeditions"));
const ExpeditionDetail = lazy(() => import("./pages/ExpeditionDetail"));
const MapExplorer = lazy(() => import("./pages/MapExplorer"));
const Statistics = lazy(() => import("./pages/Statistics"));
const Collections = lazy(() => import("./pages/Collections"));
const Search = lazy(() => import("./pages/Search"));
const OrganizerDashboard = lazy(() => import("./pages/OrganizerDashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const HikeDetail = lazy(() => import("./pages/HikeDetail"));
const EditHike = lazy(() => import("./pages/EditHike"));

function NotFound() {
  return (
    <div className="text-center py-28 px-6">
      <div className="text-5xl mb-4">🏔</div>
      <h2 className="font-display text-4xl font-bold text-[#2e2b26] mb-3">Page Not Found</h2>
      <p className="text-[#8a8278] mb-6">This trail doesn't exist — yet.</p>
      <a href="/" className="text-[#2a4d0f] font-semibold hover:underline">← Back to Home</a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      // Explore
      { path: "explore", Component: Explore },
      { path: "destinations/:slug", Component: DestinationDetail },
      { path: "destinations/:slug/contribute", Component: SubmitContribution },
      // Adventures
      { path: "add-adventure", Component: AddAdventure },
      { path: "hike/:id", Component: HikeDetail },
      { path: "hike/:id/edit", Component: EditHike },
      // Explorers
      { path: "explorers", Component: Explorers },
      { path: "explorer/:username", Component: ExplorerProfile },
      // Dashboard & auth
      { path: "dashboard", Component: Dashboard },
      { path: "login", Component: Login },
      { path: "register", Component: Login },
      { path: "forgot-password", Component: Login },
      { path: "reset-password", Component: Login },
      { path: "settings", Component: Settings },
      // V2 community
      { path: "community", Component: Community },
      { path: "share-update", Component: ShareUpdate },
      { path: "posts/:id", Component: PostDetail },
      { path: "notifications", Component: Notifications },
      // V2.2 knowledge
      { path: "trip-reports", Component: TripReports },
      { path: "trip-reports/:id", Component: TripReportDetail },
      { path: "create-trip-report", Component: CreateTripReport },
      { path: "routes/:id", Component: RouteDetail },
      // V3 clubs & events
      { path: "clubs", Component: Clubs },
      { path: "clubs/:slug", Component: ClubProfile },
      { path: "create-club", Component: CreateClub },
      { path: "events", Component: Events },
      { path: "events/:id", Component: EventDetail },
      { path: "create-event", Component: CreateEvent },
      // Phase 5 — Verification & Trust
      { path: "verification", Component: Verification },
      { path: "verification/apply", Component: VerificationApply },
      { path: "verification/achievement/:id", Component: VerifiedAchievement },
      // Phase 6 — Guides & Expeditions
      { path: "guides", Component: Guides },
      { path: "guides/:username", Component: GuideProfile },
      { path: "expeditions", Component: Expeditions },
      { path: "expeditions/:id", Component: ExpeditionDetail },
      // Phase 7 — Maps, Stats, Collections, Search
      { path: "map", Component: MapExplorer },
      { path: "statistics", Component: Statistics },
      { path: "collections", Component: Collections },
      { path: "search", Component: Search },
      { path: "organizer-dashboard", Component: OrganizerDashboard },
      // Admin
      { path: "admin", Component: Admin },
      { path: "*", Component: NotFound },
    ],
  },
]);
