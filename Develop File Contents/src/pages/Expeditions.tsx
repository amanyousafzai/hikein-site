import { useState } from "react";
import { Link } from "react-router";
import { expeditions } from "../data/guides";

const categories = ["All", "Day Hike", "Multi-Day Trek", "Peak Expedition", "Camping", "Beginner"];
const difficulties = ["All", "Easy", "Moderate", "Hard", "Technical"];

export default function Expeditions() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const filtered = expeditions.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.destination.toLowerCase().includes(search.toLowerCase()) ||
      e.organizer.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || e.type === category;
    const matchDiff = difficulty === "All" || e.difficulty === difficulty;
    return matchSearch && matchCat && matchDiff;
  });

  const diffColor: Record<string, string> = {
    Easy: "bg-emerald-100 text-emerald-800",
    Moderate: "bg-amber-100 text-amber-800",
    Hard: "bg-orange-100 text-orange-800",
    Technical: "bg-red-100 text-red-800",
  };

  const spotsLeft = (e: typeof expeditions[number]) => e.maxParticipants - e.currentParticipants;

  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-[#2e2b26] pt-14 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=1400&h=400&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-[#3a6b18] text-xs font-semibold uppercase tracking-widest mb-3">Group Adventures</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#f6f3ee] mb-4">Expeditions</h1>
          <p className="text-[#8a8278] text-lg max-w-xl mb-8">
            Organized group expeditions led by verified guides and experienced organizers. Find your team and go explore.
          </p>
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8278]" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search expeditions by destination, guide, or title..."
              className="w-full bg-[#f6f3ee] text-[#2e2b26] pl-11 pr-4 py-3.5 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#3a6b18]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                category === c ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-white border border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/40"
              }`}
            >
              {c}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            {difficulties.filter((d) => d !== "All").map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(difficulty === d ? "All" : d)}
                className={`px-3 py-2 rounded-full text-xs font-semibold transition-colors ${
                  difficulty === d ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-white border border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/40"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[#8a8278] text-sm mb-6">{filtered.length} expedition{filtered.length !== 1 ? "s" : ""} found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🗻</div>
            <h3 className="font-display text-2xl font-bold text-[#2e2b26] mb-2">No expeditions found</h3>
            <p className="text-[#8a8278] text-sm">Try different filters or check back soon for new expeditions.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((exp) => {
              const spots = spotsLeft(exp);
              return (
                <Link
                  key={exp.id}
                  to={`/expeditions/${exp.id}`}
                  className="bg-white border border-[#ede9e0] rounded-2xl overflow-hidden hover:border-[#2a4d0f]/40 hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#ddd8cc]">
                    <img src={exp.image} alt={exp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-[#2e2b26]/80 backdrop-blur text-[#f6f3ee] text-[10px] font-semibold px-2 py-1 rounded">
                        {exp.type}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${diffColor[exp.difficulty]}`}>{exp.difficulty}</span>
                    </div>
                    {spots <= 2 && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                          {spots === 0 ? "Full" : `${spots} spot${spots > 1 ? "s" : ""} left`}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-[#2e2b26] text-lg leading-snug mb-1 group-hover:text-[#2a4d0f] transition-colors">{exp.title}</h3>
                    <p className="text-[#8a8278] text-xs mb-3">📍 {exp.destination}</p>

                    {/* Organizer */}
                    <div className="flex items-center gap-2 mb-4">
                      <img src={exp.organizer.avatar} alt={exp.organizer.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-[#5a5549] text-xs">{exp.organizer.name}</span>
                      {exp.organizer.verified && <span className="bg-[#2a4d0f] text-white text-[9px] px-1.5 py-0.5 rounded-full">✓</span>}
                    </div>

                    <div className="flex gap-4 text-xs text-[#5a5549] border-t border-[#f6f3ee] pt-3">
                      <span>📅 {exp.dates}</span>
                      <span>⏱ {exp.duration}</span>
                      <span className="ml-auto">👥 {exp.currentParticipants}/{exp.maxParticipants}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Organizer CTA */}
        <div className="mt-16 bg-[#f6f3ee] border border-[#ede9e0] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-2">Organize an Expedition</h2>
            <p className="text-[#5a5549] text-sm leading-relaxed">
              Are you a verified guide or club organizer? List your expedition on HikeIN and connect with serious hikers across Pakistan.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/create-event" className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-6 py-3 rounded-xl hover:bg-[#3a6b18] transition-colors text-sm">
              Create Expedition
            </Link>
            <Link to="/guides" className="border border-[#ddd8cc] text-[#5a5549] font-medium px-6 py-3 rounded-xl hover:border-[#2a4d0f]/40 transition-colors text-sm">
              View Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
