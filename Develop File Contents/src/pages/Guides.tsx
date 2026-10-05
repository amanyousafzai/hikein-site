import { useState } from "react";
import { Link } from "react-router";
import { guides } from "../data/guides";

const regions = ["All Regions", "Gilgit-Baltistan", "Skardu", "Swat", "Chitral", "Azad Kashmir"];
const activities = ["All Activities", "High-Altitude Trekking", "Photography Treks", "Expedition Logistics", "Rock Climbing"];
const languages = ["All Languages", "Urdu", "English", "Balti", "Shina", "Pashto"];

export default function Guides() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All Regions");
  const [activity, setActivity] = useState("All Activities");
  const [language, setLanguage] = useState("All Languages");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = guides.filter((g) => {
    const matchSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.location.toLowerCase().includes(search.toLowerCase()) ||
      g.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchRegion = region === "All Regions" || g.regions.some((r) => r.includes(region));
    const matchActivity = activity === "All Activities" || g.specializations.some((s) => s.includes(activity));
    const matchLanguage = language === "All Languages" || g.languages.includes(language);
    const matchVerified = !verifiedOnly || g.verified;
    return matchSearch && matchRegion && matchActivity && matchLanguage && matchVerified;
  });

  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-[#2e2b26] pt-14 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=400&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-[#3a6b18] text-xs font-semibold uppercase tracking-widest mb-3">Verified Professionals</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#f6f3ee] mb-4">Outdoor Guides</h1>
          <p className="text-[#8a8278] text-lg max-w-xl mb-8">
            Pakistan's verified mountain guides and expedition organizers. Every guide has been reviewed, credentialed, and trusted by the community.
          </p>
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8278]" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides by name, region, or specialization..."
              className="w-full bg-[#f6f3ee] text-[#2e2b26] pl-11 pr-4 py-3.5 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#3a6b18]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border border-[#ddd8cc] bg-white text-[#5a5549] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
          >
            {regions.map((r) => <option key={r}>{r}</option>)}
          </select>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="border border-[#ddd8cc] bg-white text-[#5a5549] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
          >
            {activities.map((a) => <option key={a}>{a}</option>)}
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-[#ddd8cc] bg-white text-[#5a5549] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
          >
            {languages.map((l) => <option key={l}>{l}</option>)}
          </select>
          <label className="flex items-center gap-2 cursor-pointer ml-1">
            <div
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`w-9 h-5 rounded-full transition-colors ${verifiedOnly ? "bg-[#2a4d0f]" : "bg-[#ddd8cc]"} relative`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${verifiedOnly ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>
            <span className="text-[#5a5549] text-xs font-medium">Verified only</span>
          </label>
          <p className="ml-auto text-[#8a8278] text-sm">{filtered.length} guide{filtered.length !== 1 ? "s" : ""}</p>
        </div>

        {/* Guide cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🧭</div>
            <h3 className="font-display text-2xl font-bold text-[#2e2b26] mb-2">No guides found</h3>
            <p className="text-[#8a8278] text-sm">Try broadening your filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((guide) => (
              <Link
                key={guide.id}
                to={`/guides/${guide.username}`}
                className="bg-white border border-[#ede9e0] rounded-2xl overflow-hidden hover:border-[#2a4d0f]/40 hover:shadow-lg transition-all duration-200 group"
              >
                {/* Cover */}
                <div className="relative h-28 overflow-hidden bg-[#ddd8cc]">
                  <img src={guide.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                  {guide.verified && (
                    <div className="absolute top-3 right-3 bg-[#2a4d0f] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span>✓</span> Verified Guide
                    </div>
                  )}
                </div>

                <div className="px-5 pb-5 -mt-6 relative">
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-white mb-3"
                  />
                  <h3 className="font-display font-bold text-[#2e2b26] text-lg leading-tight">{guide.name}</h3>
                  <p className="text-[#8a8278] text-xs mb-3">📍 {guide.location} · {guide.experience} yrs exp.</p>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {guide.specializations.slice(0, 2).map((s) => (
                      <span key={s} className="bg-[#f6f3ee] text-[#5a5549] text-[10px] font-medium px-2.5 py-1 rounded-full border border-[#ede9e0]">{s}</span>
                    ))}
                    {guide.specializations.length > 2 && (
                      <span className="text-[#8a8278] text-[10px] py-1">+{guide.specializations.length - 2} more</span>
                    )}
                  </div>

                  {/* Stats row */}
                  <div className="flex gap-4 text-xs text-[#5a5549] border-t border-[#f6f3ee] pt-3">
                    <span>🥾 {guide.adventures} adventures</span>
                    <span>⛰ {guide.peaksGuided} peaks</span>
                    <span className="ml-auto">⭐ {guide.rating} ({guide.reviewCount})</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Apply CTA */}
        <div className="mt-16 bg-[#2a4d0f] rounded-2xl p-8 md:p-10 text-center">
          <h2 className="font-display text-3xl font-bold text-[#f6f3ee] mb-3">Are You an Outdoor Guide?</h2>
          <p className="text-[#ddd8cc] text-sm max-w-lg mx-auto mb-6">
            Apply for Verified Guide status and get listed in HikeIN's guide directory. Reach serious hikers and organize verified expeditions.
          </p>
          <Link
            to="/verification/apply?type=guide"
            className="inline-block bg-[#f6f3ee] text-[#2a4d0f] font-semibold px-8 py-3.5 rounded-xl hover:bg-[#ede9e0] transition-colors"
          >
            Apply as Outdoor Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
