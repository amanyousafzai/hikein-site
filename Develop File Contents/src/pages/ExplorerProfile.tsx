import { useParams, Link } from "react-router";
import { explorers, achievements } from "../data/mock";
import { feedPosts } from "../data/community";
import { useState } from "react";
import FeedCard from "../components/FeedCard";
import { useAuth } from "../contexts/AuthContext";
import { productApi } from "../lib/api";
import { EmptyState } from "../components/ui/ProductStates";

type ProfileTab = "journey" | "posts" | "photos" | "achievements" | "saved";

export default function ExplorerProfile() {
  const { username } = useParams();
  const { user, profile } = useAuth();
  const explorerRecord = explorers.find((e) => e.username === username);
  const isOwnProfile = Boolean(user && profile?.username === username);
  const explorer = explorerRecord ?? (isOwnProfile && profile
    ? {
        ...explorers[1],
        id: profile.id,
        name: profile.name,
        username: profile.username,
        location: profile.location,
        bio: profile.bio,
        avatar: profile.avatarUrl,
      }
    : null);

  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(1240);
  const [profileTab, setProfileTab] = useState<ProfileTab>("journey");
  const [showFollowers, setShowFollowers] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  if (!explorer) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24">
        <EmptyState
          title="Explorer not found"
          description="This profile may have moved, become private, or never existed."
          action={<Link to="/explorers" className="text-forest font-semibold text-sm">Browse explorers</Link>}
        />
      </div>
    );
  }

  const unlockedIds = new Set(explorer.achievements);
  const typeIcons: Record<string, string> = { Lake: "🏞", Peak: "⛰", Hike: "🥾", Meadow: "🌿" };

  const explorerPosts = feedPosts.filter((p) => p.author.username === explorer.username);

  async function handleFollow() {
    if (!user) {
      setActionMessage("Sign in to follow explorers.");
      return;
    }
    const next = !following;
    setFollowing(next);
    setFollowerCount((count) => count + (next ? 1 : -1));
    try {
      await productApi.toggleInteraction("follow", explorer.id, next);
    } catch {
      setFollowing(!next);
      setFollowerCount((count) => count + (next ? -1 : 1));
      setActionMessage("Follow status could not be updated.");
    }
  }

  async function shareProfile() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: `${explorer.name} on HikeIN`, text: explorer.bio, url });
    } else {
      await navigator.clipboard.writeText(url);
      setActionMessage("Profile link copied.");
    }
  }

  return (
    <div className="pb-20 md:pb-0">
      {/* Cover */}
      <div className="relative h-52 md:h-72 bg-[#2e2b26] overflow-hidden">
        <img src={explorer.cover} alt="cover" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2e2b26]/70 to-transparent" />
      </div>

      {/* Profile header */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative -mt-14 md:-mt-20 mb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-5">
            <img
              src={explorer.avatar}
              alt={explorer.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-[#f6f3ee] flex-shrink-0"
            />
            <div className="flex-1 md:pb-2">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#2e2b26]">{explorer.name}</h1>
              <p className="text-[#5a5549] text-sm mt-0.5">{explorer.title}</p>
              <p className="text-[#8a8278] text-xs mt-0.5">📍 {explorer.location}</p>
              <p className="text-[#8a8278] text-xs mt-0.5">Joined {isOwnProfile && profile ? new Date(profile.joinedAt).toLocaleDateString("en-PK", { month: "long", year: "numeric" }) : "March 2021"}</p>
              <p className="text-[#5a5549] text-sm mt-2 max-w-md italic">"{explorer.bio}"</p>

              {/* Follow stats */}
              <div className="flex gap-5 mt-3">
                <button onClick={() => setShowFollowers(true)} className="text-left group">
                  <span className="font-display font-bold text-[#2e2b26] text-lg group-hover:text-[#2a4d0f] transition-colors">
                    {followerCount.toLocaleString()}
                  </span>
                  <span className="text-[#8a8278] text-xs ml-1">Followers</span>
                </button>
                <button onClick={() => setShowFollowers(true)} className="text-left group">
                  <span className="font-display font-bold text-[#2e2b26] text-lg group-hover:text-[#2a4d0f] transition-colors">380</span>
                  <span className="text-[#8a8278] text-xs ml-1">Following</span>
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 md:pb-2">
              {isOwnProfile ? (
                <Link to="/settings" className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold text-sm px-5 py-2.5 rounded hover:bg-[#3a6b18] transition-colors">
                  Edit Profile
                </Link>
              ) : (
                <button
                  onClick={handleFollow}
                  className={`font-semibold text-sm px-5 py-2.5 rounded transition-colors ${
                    following
                      ? "border border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/40 bg-white"
                      : "bg-[#2a4d0f] text-[#f6f3ee] hover:bg-[#3a6b18]"
                  }`}
                >
                  {following ? "Following" : "Follow"}
                </button>
              )}
              <button onClick={shareProfile} className="border border-[#ddd8cc] text-[#5a5549] font-medium text-sm px-4 py-2.5 rounded hover:border-[#2a4d0f]/40 transition-colors bg-white">
                Share
              </button>
            </div>
          </div>
        </div>

        {actionMessage && (
          <div className="bg-white border border-[#ddd8cc] rounded-xl px-4 py-3 text-sm text-[#5a5549] mb-6 flex justify-between gap-3">
            <span>{actionMessage}</span>
            {!user && <Link to="/login" className="text-[#2a4d0f] font-semibold">Sign in</Link>}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {[
            { value: explorer.adventures, label: "Hikes" },
            { value: `${(explorer.adventures * 8.4).toLocaleString()} km`, label: "Distance" },
            { value: `${Math.round(explorer.adventures * 0.62).toLocaleString()} km`, label: "Elevation" },
            { value: followerCount.toLocaleString(), label: "Followers" },
            { value: "380", label: "Following" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white border border-[#ede9e0] rounded-xl p-4 text-center">
              <div className="font-display text-xl md:text-2xl font-bold text-[#2e2b26]">{value}</div>
              <div className="text-[#8a8278] text-xs mt-1 uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>

        {/* Profile tabs */}
        <div className="flex gap-1 bg-[#ede9e0] rounded-lg p-1 mb-8 overflow-x-auto">
          {(["journey", "posts", "photos", "achievements", "saved"] as ProfileTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setProfileTab(t)}
              className={`flex-1 py-2 rounded-md text-sm font-semibold capitalize transition-colors ${
                profileTab === t ? "bg-white text-[#2e2b26] shadow-sm" : "text-[#8a8278] hover:text-[#5a5549]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left — main content */}
          <div className="lg:col-span-2">
            {profileTab === "journey" ? (
              <>
                <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-8">My Journey</h2>
                {explorer.timeline.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-[#ddd8cc] rounded-xl">
                    <div className="text-4xl mb-3">🏔</div>
                    <p className="text-[#5a5549] font-medium">This explorer is just getting started.</p>
                    <Link to="/add-adventure" className="text-sm font-semibold text-[#2a4d0f] mt-2 inline-block hover:underline">
                      Add your first adventure →
                    </Link>
                  </div>
                ) : (
                  explorer.timeline.map(({ year, items }) => (
                    <div key={year} className="relative mb-10">
                      <div className="sticky top-20 z-10 inline-block bg-[#f6f3ee] pr-4 mb-6">
                        <span className="font-display text-xl font-bold text-[#2e2b26]">{year}</span>
                      </div>
                      <div className="border-l-2 border-[#ddd8cc] pl-6 space-y-6 ml-4">
                        {items.map((item) => (
                          <Link key={item.id + item.date} to={`/destinations/${item.id}`} className="group block">
                            <div className="relative bg-white border border-[#ede9e0] rounded-xl p-5 hover:border-[#2a4d0f]/40 hover:shadow-md transition-all duration-200">
                              <div className="absolute -left-[33px] top-5 w-4 h-4 rounded-full border-2 border-[#2a4d0f] bg-[#f6f3ee]" />
                              <div className="flex items-start gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm">{typeIcons[item.type]}</span>
                                    <span className="text-xs text-[#2a4d0f] font-semibold uppercase tracking-wide">{item.type}</span>
                                  </div>
                                  <h3 className="font-display font-bold text-[#2e2b26] text-lg group-hover:text-[#2a4d0f] transition-colors">{item.name}</h3>
                                  <p className="text-[#8a8278] text-xs mb-2">Completed {item.date}</p>
                                  {item.story && <p className="text-[#5a5549] text-sm leading-relaxed italic">"{item.story}"</p>}
                                </div>
                                {item.image && (
                                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </>
            ) : profileTab === "posts" ? (
              <>
                <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-6">Posts</h2>
                {explorerPosts.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-[#ddd8cc] rounded-xl">
                    <div className="text-4xl mb-3">📝</div>
                    <p className="text-[#5a5549] font-medium">No posts yet.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {explorerPosts.map((post) => (
                      <FeedCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </>
            ) : profileTab === "photos" ? (
              <div>
                <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-6">Trail Photos</h2>
                {explorer.timeline.flatMap((year) => year.items).filter((item) => item.image).length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {explorer.timeline.flatMap((year) => year.items).filter((item) => item.image).map((item) => (
                      <Link key={`${item.id}-photo`} to={`/destinations/${item.id}`} className="group relative aspect-square overflow-hidden rounded-xl bg-[#ddd8cc]">
                        <img src={item.image!} alt={item.name} className="size-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2e2b26]/80 to-transparent text-white text-xs font-semibold p-3 pt-8">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                ) : <EmptyState title="No trail photos yet" description="Photos from completed hikes will build a visual archive here." />}
              </div>
            ) : profileTab === "achievements" ? (
              <div>
                <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-6">Achievements</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {achievements.map((achievement) => {
                    const unlocked = unlockedIds.has(achievement.id);
                    return <div key={achievement.id} className={`border rounded-xl p-4 ${unlocked ? "bg-white border-[#2a4d0f]/20" : "bg-[#f6f3ee] border-[#ede9e0] opacity-60"}`}><div className="flex items-center gap-3"><span className="size-10 rounded-full bg-[#2a4d0f]/10 flex items-center justify-center">{achievement.icon}</span><span><span className="block font-semibold text-sm text-[#2e2b26]">{achievement.label}</span><span className="block text-xs text-[#8a8278]">{achievement.desc}</span></span></div><div className="h-1.5 bg-[#ede9e0] rounded-full mt-4 overflow-hidden"><div className="h-full bg-[#2a4d0f]" style={{ width: unlocked ? "100%" : "42%" }} /></div><p className="text-[10px] text-[#8a8278] mt-1">{unlocked ? "Earned" : "In progress"}</p></div>;
                  })}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-6">Saved</h2>
                {isOwnProfile ? <EmptyState title="Your saved collection is private" description="Activities and destinations you save will be organized here." action={<Link to="/explore" className="text-[#2a4d0f] font-semibold text-sm">Discover places</Link>} /> : <EmptyState title="Saved items are private" description="Only this explorer can see their saved collection." />}
              </div>
            )}
          </div>

          {/* Right — achievements */}
          <div className={`lg:col-span-1 ${profileTab === "achievements" ? "hidden lg:block" : ""}`}>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-6">Achievements</h2>
            <div className="space-y-3">
              {achievements.map((ach) => {
                const unlocked = unlockedIds.has(ach.id);
                return (
                  <div key={ach.id} className={`flex items-center gap-3 p-4 rounded-xl border ${unlocked ? "bg-white border-[#ede9e0]" : "bg-[#f6f3ee] border-[#ede9e0] opacity-40"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${unlocked ? "bg-[#2a4d0f]/10" : "bg-[#ddd8cc]"}`}>
                      {ach.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-[#2e2b26] text-sm">{ach.label}</p>
                      <p className="text-[#8a8278] text-xs">{ach.desc}</p>
                    </div>
                    {unlocked && <span className="ml-auto text-[#2a4d0f] text-xs font-bold">✓</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Followers modal */}
      {showFollowers && (
        <div
          className="fixed inset-0 bg-[#2e2b26]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowFollowers(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#ede9e0]">
              <h3 className="font-display font-bold text-[#2e2b26] text-lg">Followers</h3>
              <button onClick={() => setShowFollowers(false)} className="text-[#8a8278] hover:text-[#2e2b26] transition-colors text-lg">✕</button>
            </div>
            <div className="divide-y divide-[#f6f3ee] max-h-96 overflow-y-auto">
              {explorers.slice(1).map((exp) => (
                <div key={exp.id} className="flex items-center gap-4 px-5 py-4">
                  <img src={exp.avatar} alt={exp.name} className="w-11 h-11 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/explorer/${exp.username}`} onClick={() => setShowFollowers(false)} className="font-semibold text-[#2e2b26] text-sm hover:text-[#2a4d0f] transition-colors">{exp.name}</Link>
                    <p className="text-[#8a8278] text-xs">{exp.location} · {exp.adventures} adventures</p>
                  </div>
                  <FollowBtn />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FollowBtn() {
  const [following, setFollowing] = useState(false);
  return (
    <button
      onClick={() => setFollowing(!following)}
      className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
        following ? "border border-[#ddd8cc] text-[#5a5549]" : "bg-[#2a4d0f] text-[#f6f3ee] hover:bg-[#3a6b18]"
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
