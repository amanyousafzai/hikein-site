import { useState } from "react";
import { Link } from "react-router";
import { feedPosts, suggestedExplorers } from "../data/community";
import { destinations, explorers } from "../data/mock";
import FeedCard from "../components/FeedCard";

type Tab = "following" | "latest" | "trending";

export default function Community() {
  const [tab, setTab] = useState<Tab>("latest");

  const filtered = tab === "latest"
    ? feedPosts
    : feedPosts.filter((p) => p.tab === tab || p.tab === "latest");

  const trending = [...feedPosts].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-10">
      <div className="grid lg:grid-cols-[1fr_300px] gap-8">

        {/* Left — Feed */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display text-3xl font-bold text-[#2e2b26]">Community</h1>
            <Link
              to="/share-update"
              className="hidden md:flex items-center gap-2 bg-[#2a4d0f] text-[#f6f3ee] text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#3a6b18] transition-colors"
            >
              + Share Update
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-[#ede9e0] rounded-lg p-1 mb-6">
            {(["following", "latest", "trending"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-md text-sm font-semibold capitalize transition-colors ${
                  tab === t
                    ? "bg-white text-[#2e2b26] shadow-sm"
                    : "text-[#8a8278] hover:text-[#5a5549]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Empty state: Following tab with no follows */}
          {tab === "following" && filtered.filter(p => p.tab === "following").length === 0 ? (
            <div className="bg-white border border-[#ede9e0] rounded-xl p-10 text-center">
              <div className="text-4xl mb-4">🏔</div>
              <h3 className="font-display text-xl font-bold text-[#2e2b26] mb-2">Your adventure community is waiting.</h3>
              <p className="text-[#8a8278] text-sm mb-5">Follow explorers and start discovering outdoor stories.</p>
              <Link to="/explorers" className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#3a6b18] transition-colors">
                Explore Explorers
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {(tab === "following"
                ? feedPosts.filter(p => p.tab === "following" || p.tab === "latest")
                : tab === "trending"
                ? [...feedPosts].sort((a, b) => b.likes - a.likes)
                : feedPosts
              ).map((post) => (
                <FeedCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Right — Discovery sidebar */}
        <aside className="hidden lg:block space-y-5">

          {/* Share update box */}
          <div className="bg-white border border-[#ede9e0] rounded-xl p-4">
            <p className="text-[#8a8278] text-xs mb-3">Share something with the community</p>
            <Link
              to="/share-update"
              className="w-full flex items-center gap-2 bg-[#f6f3ee] border border-[#ddd8cc] rounded-lg px-4 py-2.5 text-sm text-[#8a8278] hover:border-[#2a4d0f]/40 transition-colors mb-3"
            >
              ✏️ Write something...
            </Link>
            <div className="flex gap-2">
              <Link to="/share-update" className="flex-1 text-center text-xs font-medium text-[#5a5549] bg-[#f6f3ee] hover:bg-[#ede9e0] py-1.5 rounded transition-colors">📷 Photo</Link>
              <Link to="/add-adventure" className="flex-1 text-center text-xs font-medium text-[#5a5549] bg-[#f6f3ee] hover:bg-[#ede9e0] py-1.5 rounded transition-colors">🥾 Adventure</Link>
              <Link to="/share-update" className="flex-1 text-center text-xs font-medium text-[#5a5549] bg-[#f6f3ee] hover:bg-[#ede9e0] py-1.5 rounded transition-colors">📝 Report</Link>
            </div>
          </div>

          {/* Suggested explorers */}
          <div className="bg-white border border-[#ede9e0] rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-[#2e2b26] text-base">Explorers to Follow</h3>
              <Link to="/explorers" className="text-xs text-[#2a4d0f] font-semibold hover:underline">See all</Link>
            </div>
            <div className="space-y-3">
              {suggestedExplorers.map((exp) => (
                <div key={exp.username} className="flex items-center gap-3">
                  <img src={exp.avatar} alt={exp.name} className="w-9 h-9 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#2e2b26] text-xs truncate">{exp.name}</p>
                    <p className="text-[#8a8278] text-[10px]">{exp.location} · {exp.adventures} adventures</p>
                  </div>
                  <FollowButton small />
                </div>
              ))}
            </div>
          </div>

          {/* Trending destinations */}
          <div className="bg-white border border-[#ede9e0] rounded-xl p-4">
            <h3 className="font-display font-bold text-[#2e2b26] text-base mb-4">Popular Destinations</h3>
            <div className="space-y-3">
              {destinations.slice(0, 4).map((dest) => (
                <Link key={dest.id} to={`/destinations/${dest.id}`} className="flex items-center gap-3 group">
                  <img src={dest.image} alt={dest.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#2e2b26] text-xs truncate group-hover:text-[#2a4d0f] transition-colors">{dest.name}</p>
                    <p className="text-[#8a8278] text-[10px]">{dest.explorers} explorers</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent achievements */}
          <div className="bg-white border border-[#ede9e0] rounded-xl p-4">
            <h3 className="font-display font-bold text-[#2e2b26] text-base mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {[
                { explorer: "Rafi Khan", achievement: "100 Lakes Explorer", icon: "🏞", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", username: "rafi-khan" },
                { explorer: "Kamran Shah", achievement: "200 Adventures", icon: "🥾", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format", username: "kamran-shah" },
                { explorer: "Bilal Hussain", achievement: "Mountain Explorer", icon: "🏔", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format", username: "bilal-hussain" },
              ].map(({ explorer, achievement, icon, avatar, username }) => (
                <div key={username} className="flex items-center gap-3">
                  <div className="relative">
                    <img src={avatar} alt={explorer} className="w-9 h-9 rounded-full object-cover" />
                    <span className="absolute -bottom-0.5 -right-0.5 text-sm leading-none">{icon}</span>
                  </div>
                  <div>
                    <Link to={`/explorer/${username}`} className="font-semibold text-[#2e2b26] text-xs hover:text-[#2a4d0f] transition-colors">{explorer}</Link>
                    <p className="text-[#8a8278] text-[10px]">{achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FollowButton({ small }: { small?: boolean }) {
  const [following, setFollowing] = useState(false);
  return (
    <button
      onClick={() => setFollowing(!following)}
      className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
        following
          ? "bg-[#f6f3ee] border border-[#ddd8cc] text-[#5a5549]"
          : "bg-[#2a4d0f] text-[#f6f3ee] hover:bg-[#3a6b18]"
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
