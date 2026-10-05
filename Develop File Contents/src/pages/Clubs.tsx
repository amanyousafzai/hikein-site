import { useState } from "react";
import { Link } from "react-router";
import { clubs } from "../data/clubs";

export default function Clubs() {
  const [search, setSearch] = useState("");

  const filtered = clubs.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-[#2e2b26] pt-14 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#3a6b18] text-xs font-semibold uppercase tracking-widest mb-3">Community</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#f6f3ee] mb-4">Hiking Clubs</h1>
          <p className="text-[#8a8278] text-lg max-w-xl">
            Join clubs, discover communities, and explore Pakistan with your people.
          </p>
          <div className="relative mt-8 max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8278]" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clubs by name or location..."
              className="w-full bg-[#f6f3ee] text-[#2e2b26] pl-11 pr-4 py-3.5 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#3a6b18]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#8a8278] text-sm">{filtered.length} club{filtered.length !== 1 ? "s" : ""}</p>
          <Link to="/create-club" className="bg-[#2a4d0f] text-[#f6f3ee] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#3a6b18] transition-colors">
            + Create Club
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="font-display text-2xl font-bold text-[#2e2b26] mb-2">No clubs found</h3>
            <p className="text-[#8a8278] text-sm">Try a different search, or create your own club.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((club) => (
              <div key={club.id} className="bg-white border border-[#ede9e0] rounded-xl overflow-hidden hover:border-[#2a4d0f]/40 hover:shadow-md transition-all duration-200">
                {/* Cover */}
                <div className="relative h-28 bg-[#ddd8cc]">
                  <img src={club.cover} alt={club.name} className="w-full h-full object-cover opacity-70" />
                </div>
                <div className="px-5 pb-5">
                  {/* Logo overlap */}
                  <div className="-mt-6 mb-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden ring-3 ring-[#f6f3ee] bg-[#ddd8cc]">
                      <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display font-bold text-[#2e2b26] text-lg leading-tight">{club.name}</h3>
                      <p className="text-[#8a8278] text-xs">📍 {club.location}</p>
                    </div>
                    <span className="text-[10px] font-semibold bg-[#f6f3ee] border border-[#ddd8cc] text-[#5a5549] px-2 py-0.5 rounded-full mt-1 whitespace-nowrap ml-2">
                      {club.category}
                    </span>
                  </div>
                  <p className="text-[#5a5549] text-xs leading-relaxed mb-4 italic line-clamp-2">"{club.tagline}"</p>
                  <div className="flex gap-4 text-xs text-[#5a5549] border-t border-[#f6f3ee] pt-3 mb-4">
                    <span>👥 {club.memberCount.toLocaleString()} members</span>
                    <span>🥾 {club.adventures} adventures</span>
                    <span>🗺 {club.destinations} destinations</span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/clubs/${club.slug}`} className="flex-1 text-center bg-[#2a4d0f] text-[#f6f3ee] font-semibold text-xs py-2.5 rounded-lg hover:bg-[#3a6b18] transition-colors">
                      View Club
                    </Link>
                    <JoinButton />
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

function JoinButton() {
  const [joined, setJoined] = useState(false);
  return (
    <button onClick={() => setJoined(!joined)}
      className={`flex-1 font-semibold text-xs py-2.5 rounded-lg transition-colors ${
        joined ? "border border-[#ddd8cc] text-[#5a5549]" : "border border-[#2a4d0f] text-[#2a4d0f] hover:bg-[#2a4d0f]/5"
      }`}
    >
      {joined ? "Joined" : "Join"}
    </button>
  );
}
