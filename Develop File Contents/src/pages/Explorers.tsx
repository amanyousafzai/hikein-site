import { useState } from "react";
import { Link } from "react-router";
import { explorers } from "../data/mock";

type Sort = "featured" | "adventures" | "recent";

export default function Explorers() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  let filtered = explorers.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()) ||
      e.bio.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "adventures") filtered = [...filtered].sort((a, b) => b.adventures - a.adventures);

  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-[#2e2b26] pt-14 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#3a6b18] text-xs font-semibold uppercase tracking-widest mb-3">Community</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#f6f3ee] mb-4">Meet the Explorers</h1>
          <p className="text-[#8a8278] text-lg max-w-xl">
            Discover the people building Pakistan's permanent outdoor history.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8278]" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search explorers by name or location..."
              className="w-full bg-[#f6f3ee] text-[#2e2b26] pl-11 pr-4 py-3.5 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#3a6b18]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Sort */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#8a8278] text-sm">{filtered.length} explorer{filtered.length !== 1 ? "s" : ""}</p>
          <div className="flex gap-2">
            {(["featured", "adventures", "recent"] as Sort[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors capitalize ${
                  sort === s
                    ? "bg-[#2a4d0f] text-[#f6f3ee]"
                    : "border border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/40"
                }`}
              >
                {s === "adventures" ? "Most Adventures" : s === "recent" ? "Recently Active" : "Featured"}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="font-display text-2xl font-bold text-[#2e2b26] mb-2">No explorers found</h3>
            <p className="text-[#8a8278] text-sm">Try a different search term.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((exp) => (
              <div
                key={exp.id}
                className="bg-white border border-[#ede9e0] rounded-xl overflow-hidden hover:border-[#2a4d0f]/30 hover:shadow-md transition-all duration-200"
              >
                {/* Mini cover */}
                <div className="relative h-20 bg-[#ddd8cc]">
                  <img src={exp.cover} alt="" className="w-full h-full object-cover opacity-70" />
                </div>
                <div className="px-5 pb-5">
                  <div className="-mt-7 mb-3">
                    <img
                      src={exp.avatar}
                      alt={exp.name}
                      className="w-14 h-14 rounded-full object-cover ring-3 ring-[#f6f3ee]"
                    />
                  </div>
                  <h3 className="font-display font-bold text-[#2e2b26] text-lg">{exp.name}</h3>
                  <p className="text-[#5a5549] text-xs mb-0.5">{exp.title}</p>
                  <p className="text-[#8a8278] text-xs mb-3">📍 {exp.location}</p>
                  <p className="text-[#5a5549] text-xs leading-relaxed mb-4 line-clamp-2 italic">"{exp.bio}"</p>

                  <div className="flex justify-between items-center border-t border-[#ede9e0] pt-4">
                    <div className="flex gap-3 text-xs text-[#5a5549]">
                      <span>🏞 {exp.lakes}</span>
                      <span>⛰ {exp.peaks}</span>
                      <span>🥾 {exp.adventures}</span>
                    </div>
                    <Link
                      to={`/explorer/${exp.username}`}
                      className="text-xs font-semibold text-[#2a4d0f] hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
