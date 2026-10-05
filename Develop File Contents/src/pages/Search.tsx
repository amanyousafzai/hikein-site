import { useState } from "react";
import { Link } from "react-router";
import { destinations, explorers } from "../data/mock";
import { tripReports } from "../data/tripreports";
import { hikingRoutes } from "../data/routes";
import { clubs } from "../data/clubs";
import { guides, expeditions } from "../data/guides";

type Category = "all" | "destinations" | "explorers" | "trip-reports" | "routes" | "clubs" | "guides" | "expeditions";

const categories: { id: Category; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "🔍" },
  { id: "destinations", label: "Destinations", icon: "📍" },
  { id: "explorers", label: "Explorers", icon: "👤" },
  { id: "trip-reports", label: "Trip Reports", icon: "📝" },
  { id: "routes", label: "Routes", icon: "🗺" },
  { id: "clubs", label: "Clubs", icon: "👥" },
  { id: "guides", label: "Guides", icon: "★" },
  { id: "expeditions", label: "Expeditions", icon: "🏔" },
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");

  const q = query.toLowerCase();

  const matchDest = destinations.filter((d) =>
    d.name.toLowerCase().includes(q) || d.location.toLowerCase().includes(q) || d.type.toLowerCase().includes(q)
  );
  const matchExplorers = explorers.filter((e) =>
    e.name.toLowerCase().includes(q) || e.username.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
  );
  const matchReports = tripReports.filter((r) =>
    r.title.toLowerCase().includes(q) || r.destinationName.toLowerCase().includes(q) || r.author.name.toLowerCase().includes(q)
  );
  const matchRoutes = hikingRoutes.filter((r) =>
    r.name.toLowerCase().includes(q) || r.startPoint.toLowerCase().includes(q)
  );
  const matchClubs = clubs.filter((c) =>
    c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q)
  );
  const matchGuides = guides.filter((g) =>
    g.name.toLowerCase().includes(q) || g.location.toLowerCase().includes(q) || g.specializations.some((s) => s.toLowerCase().includes(q))
  );
  const matchExpeditions = expeditions.filter((e) =>
    e.title.toLowerCase().includes(q) || e.destination.toLowerCase().includes(q)
  );

  const hasResults = matchDest.length > 0 || matchExplorers.length > 0 || matchReports.length > 0 ||
    matchRoutes.length > 0 || matchClubs.length > 0 || matchGuides.length > 0 || matchExpeditions.length > 0;

  const show = (cat: Category) => category === "all" || category === cat;

  return (
    <div className="pb-20 md:pb-0 min-h-screen bg-[#f6f3ee]">
      {/* Search hero */}
      <div className="bg-[#2e2b26] py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#f6f3ee] mb-6">Search HikeIN</h1>
          <div className="relative">
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8a8278]" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations, explorers, trip reports, guides..."
              className="w-full bg-[#f6f3ee] text-[#2e2b26] pl-14 pr-5 py-4 rounded-xl text-base placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#3a6b18]"
            />
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="bg-white border-b border-[#ede9e0] py-3 sticky top-[60px] z-10">
        <div className="max-w-7xl mx-auto px-6 flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                category === c.id ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-[#f6f3ee] text-[#5a5549] hover:bg-[#ede9e0]"
              }`}
            >
              <span>{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!query ? (
          /* Empty state — suggestions */
          <div>
            <p className="text-[#8a8278] text-sm mb-8">Start typing to search across all of HikeIN</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { label: "Destinations", icon: "📍", count: destinations.length, to: "/explore" },
                { label: "Explorers", icon: "👤", count: explorers.length, to: "/explorers" },
                { label: "Trip Reports", icon: "📝", count: tripReports.length, to: "/trip-reports" },
                { label: "Guides", icon: "★", count: guides.length, to: "/guides" },
              ].map((s) => (
                <Link key={s.label} to={s.to} className="bg-white border border-[#ede9e0] rounded-xl p-5 hover:border-[#2a4d0f]/40 hover:shadow-md transition-all group">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <p className="font-display font-bold text-[#2e2b26] text-lg">{s.count}+</p>
                  <p className="text-[#8a8278] text-xs">{s.label}</p>
                  <p className="text-[#2a4d0f] text-xs mt-2 font-semibold group-hover:underline">Browse all →</p>
                </Link>
              ))}
            </div>
            <p className="text-[#8a8278] text-xs font-semibold uppercase tracking-wide mb-3">Trending Searches</p>
            <div className="flex flex-wrap gap-2">
              {["Kundol Lake", "Nanga Parbat", "Swat Valley", "K2 Base Camp", "Fairy Meadows", "Mahodand", "Falak Sar", "Photography Trek"].map((t) => (
                <button key={t} onClick={() => setQuery(t)} className="bg-white border border-[#ddd8cc] text-[#5a5549] text-sm px-4 py-2 rounded-full hover:border-[#2a4d0f]/40 hover:text-[#2a4d0f] transition-colors">
                  {t}
                </button>
              ))}
            </div>
          </div>
        ) : !hasResults ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-2xl font-bold text-[#2e2b26] mb-2">No results for "{query}"</h3>
            <p className="text-[#8a8278] text-sm">Try a different spelling or search term.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Destinations */}
            {show("destinations") && matchDest.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📍</span>
                  <h2 className="font-display text-xl font-bold text-[#2e2b26]">Destinations</h2>
                  <span className="bg-[#f6f3ee] text-[#8a8278] text-xs font-medium px-2 py-0.5 rounded-full border border-[#ede9e0]">{matchDest.length}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {matchDest.map((d) => (
                    <Link key={d.id} to={`/destinations/${d.id}`} className="bg-white border border-[#ede9e0] rounded-xl overflow-hidden hover:border-[#2a4d0f]/40 hover:shadow-md transition-all group">
                      <img src={d.image} alt={d.name} className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="p-3">
                        <p className="font-semibold text-[#2e2b26] text-sm">{d.name}</p>
                        <p className="text-[#8a8278] text-xs">{d.type} · {d.elevation}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Explorers */}
            {show("explorers") && matchExplorers.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">👤</span>
                  <h2 className="font-display text-xl font-bold text-[#2e2b26]">Explorers</h2>
                  <span className="bg-[#f6f3ee] text-[#8a8278] text-xs font-medium px-2 py-0.5 rounded-full border border-[#ede9e0]">{matchExplorers.length}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {matchExplorers.map((e) => (
                    <Link key={e.id} to={`/explorer/${e.username}`} className="bg-white border border-[#ede9e0] rounded-xl p-4 text-center hover:border-[#2a4d0f]/40 hover:shadow-md transition-all">
                      <img src={e.avatar} alt={e.name} className="w-12 h-12 rounded-full mx-auto mb-2 object-cover ring-2 ring-[#ede9e0]" />
                      <p className="font-semibold text-[#2e2b26] text-sm">{e.name}</p>
                      <p className="text-[#8a8278] text-xs">{e.location.split(",")[0]}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Trip Reports */}
            {show("trip-reports") && matchReports.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📝</span>
                  <h2 className="font-display text-xl font-bold text-[#2e2b26]">Trip Reports</h2>
                  <span className="bg-[#f6f3ee] text-[#8a8278] text-xs font-medium px-2 py-0.5 rounded-full border border-[#ede9e0]">{matchReports.length}</span>
                </div>
                <div className="space-y-3">
                  {matchReports.map((r) => (
                    <Link key={r.id} to={`/trip-reports/${r.id}`} className="flex items-center gap-4 bg-white border border-[#ede9e0] rounded-xl p-4 hover:border-[#2a4d0f]/40 transition-all group">
                      <img src={r.heroImage} alt={r.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-[#2e2b26] text-sm group-hover:text-[#2a4d0f] transition-colors">{r.title}</p>
                        <p className="text-[#8a8278] text-xs">by {r.author.name} · {r.destinationName} · {r.difficulty}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Routes */}
            {show("routes") && matchRoutes.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">🗺</span>
                  <h2 className="font-display text-xl font-bold text-[#2e2b26]">Routes</h2>
                  <span className="bg-[#f6f3ee] text-[#8a8278] text-xs font-medium px-2 py-0.5 rounded-full border border-[#ede9e0]">{matchRoutes.length}</span>
                </div>
                <div className="space-y-3">
                  {matchRoutes.map((r) => (
                    <Link key={r.id} to={`/routes/${r.id}`} className="flex items-center justify-between bg-white border border-[#ede9e0] rounded-xl px-5 py-4 hover:border-[#2a4d0f]/40 transition-all">
                      <div>
                        <p className="font-semibold text-[#2e2b26] text-sm">{r.name}</p>
                        <p className="text-[#8a8278] text-xs">{r.startPoint} → · {r.distance} · {r.difficulty}</p>
                      </div>
                      <span className="text-[#2a4d0f] text-xs font-semibold">View →</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Clubs */}
            {show("clubs") && matchClubs.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">👥</span>
                  <h2 className="font-display text-xl font-bold text-[#2e2b26]">Clubs</h2>
                  <span className="bg-[#f6f3ee] text-[#8a8278] text-xs font-medium px-2 py-0.5 rounded-full border border-[#ede9e0]">{matchClubs.length}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchClubs.map((c) => (
                    <Link key={c.id} to={`/clubs/${c.slug}`} className="flex items-center gap-3 bg-white border border-[#ede9e0] rounded-xl p-4 hover:border-[#2a4d0f]/40 transition-all">
                      <img src={c.logo} alt={c.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-[#2e2b26] text-sm">{c.name}</p>
                        <p className="text-[#8a8278] text-xs">{c.location} · {c.memberCount} members</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Guides */}
            {show("guides") && matchGuides.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">★</span>
                  <h2 className="font-display text-xl font-bold text-[#2e2b26]">Guides</h2>
                  <span className="bg-[#f6f3ee] text-[#8a8278] text-xs font-medium px-2 py-0.5 rounded-full border border-[#ede9e0]">{matchGuides.length}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchGuides.map((g) => (
                    <Link key={g.id} to={`/guides/${g.username}`} className="flex items-center gap-3 bg-white border border-[#ede9e0] rounded-xl p-4 hover:border-[#2a4d0f]/40 transition-all">
                      <img src={g.avatar} alt={g.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-[#2e2b26] text-sm">{g.name}</p>
                          {g.verified && <span className="bg-[#2a4d0f] text-white text-[9px] px-1 py-0.5 rounded">✓</span>}
                        </div>
                        <p className="text-[#8a8278] text-xs">{g.location} · {g.experience} yrs</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Expeditions */}
            {show("expeditions") && matchExpeditions.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">🏔</span>
                  <h2 className="font-display text-xl font-bold text-[#2e2b26]">Expeditions</h2>
                  <span className="bg-[#f6f3ee] text-[#8a8278] text-xs font-medium px-2 py-0.5 rounded-full border border-[#ede9e0]">{matchExpeditions.length}</span>
                </div>
                <div className="space-y-3">
                  {matchExpeditions.map((e) => (
                    <Link key={e.id} to={`/expeditions/${e.id}`} className="flex items-center gap-4 bg-white border border-[#ede9e0] rounded-xl p-4 hover:border-[#2a4d0f]/40 transition-all group">
                      <img src={e.image} alt={e.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-[#2e2b26] text-sm group-hover:text-[#2a4d0f] transition-colors">{e.title}</p>
                        <p className="text-[#8a8278] text-xs">📅 {e.dates} · {e.difficulty} · {e.currentParticipants}/{e.maxParticipants} spots</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
