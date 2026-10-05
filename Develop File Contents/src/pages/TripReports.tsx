import { useState } from "react";
import { Link } from "react-router";
import { tripReports } from "../data/tripreports";

const difficulties = ["All", "Easy", "Moderate", "Hard", "Technical"];

export default function TripReports() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState<"latest" | "popular">("latest");

  let filtered = tripReports.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.destinationName.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase());
    const matchDiff = difficulty === "All" || r.difficulty === difficulty;
    return matchSearch && matchDiff;
  });

  if (sort === "popular") filtered = [...filtered].sort((a, b) => b.likes - a.likes);

  const diffColor: Record<string, string> = {
    Easy: "bg-emerald-500/80 text-white",
    Moderate: "bg-amber-500/80 text-white",
    Hard: "bg-orange-600/80 text-white",
    Technical: "bg-red-700/80 text-white",
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-[#2e2b26] pt-14 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#3a6b18] text-xs font-semibold uppercase tracking-widest mb-3">Community Knowledge</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#f6f3ee] mb-4">Trip Reports</h1>
          <p className="text-[#8a8278] text-lg max-w-xl">
            Detailed first-hand accounts from explorers who have been there. Real routes, real conditions, real advice.
          </p>
          <div className="relative mt-8 max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8278]" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search trip reports..."
              className="w-full bg-[#f6f3ee] text-[#2e2b26] pl-11 pr-4 py-3.5 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#3a6b18]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex gap-2 flex-wrap">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  difficulty === d ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-white border border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/40"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            {(["latest", "popular"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                  sort === s ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-white border border-[#ddd8cc] text-[#5a5549]"
                }`}
              >
                {s === "latest" ? "Latest" : "Most Popular"}
              </button>
            ))}
          </div>
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#8a8278] text-sm">{filtered.length} report{filtered.length !== 1 ? "s" : ""}</p>
          <Link
            to="/create-trip-report"
            className="bg-[#2a4d0f] text-[#f6f3ee] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#3a6b18] transition-colors"
          >
            + Write Trip Report
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="font-display text-2xl font-bold text-[#2e2b26] mb-2">No reports found</h3>
            <p className="text-[#8a8278] text-sm">Try different search terms or filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((report) => (
              <Link
                key={report.id}
                to={`/trip-reports/${report.id}`}
                className="group bg-white border border-[#ede9e0] rounded-xl overflow-hidden hover:border-[#2a4d0f]/40 hover:shadow-lg transition-all duration-200"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#ddd8cc]">
                  <img src={report.heroImage} alt={report.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase px-2 py-1 rounded ${diffColor[report.difficulty]}`}>
                    {report.difficulty}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={report.author.avatar} alt={report.author.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-[#8a8278] text-xs">{report.author.name}</span>
                    <span className="text-[#ddd8cc] text-xs">·</span>
                    <span className="text-[#8a8278] text-xs">{report.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-[#2e2b26] text-lg leading-snug mb-1 group-hover:text-[#2a4d0f] transition-colors">{report.title}</h3>
                  <p className="text-[#8a8278] text-xs mb-3">📍 {report.destinationName} · {report.location.split(",")[0]}</p>
                  <div className="flex gap-4 text-xs text-[#5a5549] border-t border-[#f6f3ee] pt-3">
                    <span>📏 {report.distance}</span>
                    <span>⏱ {report.duration}</span>
                    <span className="ml-auto">❤️ {report.likes} · 💬 {report.comments}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
