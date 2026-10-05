import { useState } from "react";
import { Link } from "react-router";
import { destinations } from "../data/mock";

const types = ["All", "Lake", "Peak", "Hike", "Meadow"];
const difficulties = ["All", "Easy", "Moderate", "Strenuous", "Technical"];
const regions = ["All Regions", ...Array.from(new Set(destinations.map((destination) => destination.region))).sort()];

const presets = [
  { label: "Lakes above 3,500m", type: "Lake", diff: "All", search: "" },
  { label: "Easy hikes", type: "Hike", diff: "Easy", search: "" },
  { label: "Hidden lakes", type: "Lake", diff: "All", search: "lake" },
  { label: "Alpine meadows", type: "Meadow", diff: "All", search: "" },
  { label: "Technical peaks", type: "Peak", diff: "Technical", search: "" },
  { label: "Beginner friendly", type: "All", diff: "Easy", search: "" },
];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [activeDiff, setActiveDiff] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All Regions");

  const filtered = destinations.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase());
    const matchType = activeType === "All" || d.type === activeType;
    const matchDiff = activeDiff === "All" || d.difficulty === activeDiff;
    const matchRegion = activeRegion === "All Regions" || d.region === activeRegion;
    return matchSearch && matchType && matchDiff && matchRegion;
  });

  const typeIcons: Record<string, string> = {
    All: "🗺",
    Lake: "🏞",
    Peak: "⛰",
    Hike: "🥾",
    Meadow: "🌿",
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-[#2e2b26] pt-14 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#3a6b18] text-xs font-semibold uppercase tracking-widest mb-3">Discover Pakistan</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#f6f3ee] mb-4">Explore Destinations</h1>
          <p className="text-[#8a8278] text-lg max-w-xl">
            Discover lakes, peaks, hikes, meadows, and unforgettable adventures across the mountain regions of Pakistan.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-xl">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8278]"
              width="18" height="18" viewBox="0 0 20 20" fill="currentColor"
            >
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lakes, peaks, trails, or destinations..."
              className="w-full bg-[#f6f3ee] text-[#2e2b26] pl-11 pr-4 py-3.5 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#3a6b18]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Smart Discovery Presets */}
        <div className="mb-6">
          <p className="text-[#8a8278] text-xs font-semibold uppercase tracking-wide mb-2">Quick Filters</p>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => { setActiveType(p.type); setActiveDiff(p.diff); setSearch(p.search); }}
                className="bg-[#f6f3ee] border border-[#ddd8cc] text-[#5a5549] text-xs font-medium px-3 py-1.5 rounded-full hover:border-[#2a4d0f]/50 hover:text-[#2a4d0f] transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeType === t
                  ? "bg-[#2a4d0f] text-[#f6f3ee]"
                  : "bg-white border border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/40"
              }`}
            >
              <span>{typeIcons[t]}</span>
              {t}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <select
              value={activeRegion}
              onChange={(e) => setActiveRegion(e.target.value)}
              aria-label="Filter by region"
              className="bg-white border border-[#ddd8cc] text-[#5a5549] text-sm px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#3a6b18]"
            >
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <select
              value={activeDiff}
              onChange={(e) => setActiveDiff(e.target.value)}
              className="bg-white border border-[#ddd8cc] text-[#5a5549] text-sm px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#3a6b18]"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>{d === "All" ? "Difficulty" : d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-[#8a8278] text-sm mb-6">
          {filtered.length} destination{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-[#ede9e0] hover:border-[#2a4d0f]/40 hover:shadow-lg transition-all duration-200"
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-[#ddd8cc]">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#2e2b26]/80 backdrop-blur text-[#f6f3ee] text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded">
                      {typeIcons[dest.type]} {dest.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded ${
                      dest.difficulty === "Easy" ? "bg-emerald-500/80 text-white" :
                      dest.difficulty === "Moderate" ? "bg-amber-500/80 text-white" :
                      dest.difficulty === "Strenuous" ? "bg-orange-600/80 text-white" :
                      "bg-red-700/80 text-white"
                    }`}>
                      {dest.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-[#2e2b26] text-xl leading-tight mb-1">{dest.name}</h3>
                  <p className="text-[#8a8278] text-xs mb-4">{dest.location}</p>
                  <div className="flex items-center gap-4 text-xs text-[#5a5549] border-t border-[#ede9e0] pt-4">
                    <span>⛰ {dest.elevation}</span>
                    <span>👤 {dest.explorers} explorers</span>
                    <span className="ml-auto text-[#2a4d0f] font-semibold group-hover:underline">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-2xl font-bold text-[#2e2b26] mb-2">No destinations found</h3>
            <p className="text-[#8a8278] text-sm mb-6">Try another name or spelling, or clear your filters.</p>
            <button
              onClick={() => { setSearch(""); setActiveType("All"); setActiveDiff("All"); setActiveRegion("All Regions"); }}
              className="text-sm font-semibold text-[#2a4d0f] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
