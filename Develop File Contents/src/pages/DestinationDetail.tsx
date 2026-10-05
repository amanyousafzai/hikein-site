import { useParams, Link } from "react-router";
import { destinations, explorers } from "../data/mock";
import { useState } from "react";
import { hikingRoutes } from "../data/routes";
import { tripReports } from "../data/tripreports";

type DestTab = "overview" | "routes" | "tripreports" | "adventures" | "explorers" | "gallery";

export default function DestinationDetail() {
  const { slug } = useParams();
  const dest = destinations.find((d) => d.id === slug);
  const [saved, setSaved] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [tab, setTab] = useState<DestTab>("overview");

  if (!dest) {
    return (
      <div className="text-center py-28">
        <div className="text-5xl mb-4">🏔</div>
        <h2 className="font-display text-3xl font-bold text-[#2e2b26] mb-2">Destination not found</h2>
        <Link to="/explore" className="text-sm font-semibold text-[#2a4d0f]">← Back to Explore</Link>
      </div>
    );
  }

  const routes = hikingRoutes.filter((r) => r.destinationId === dest.id);
  const reports = tripReports.filter((r) => r.destinationId === dest.id);
  const typeIcons: Record<string, string> = { Lake: "🏞", Peak: "⛰", Hike: "🥾", Meadow: "🌿" };

  const tabs: { id: DestTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "routes", label: `Routes (${routes.length})` },
    { id: "tripreports", label: `Trip Reports (${reports.length})` },
    { id: "adventures", label: "Adventures" },
    { id: "explorers", label: `Explorers (${dest.explorers})` },
    { id: "gallery", label: "Gallery" },
  ];

  const recentAdventures = [
    { explorer: explorers[0], date: "15 July 2026", story: "One of the most beautiful alpine lakes I have ever visited. The reflection of the mountains in the crystal-clear water is unforgettable." },
    { explorer: explorers[1], date: "28 June 2026", story: "Reached the lake after a 4-hour trek from the base. Crystal-clear water and total solitude — absolutely worth it." },
    { explorer: explorers[3], date: "12 June 2026", story: "Third visit in as many years. Still takes my breath away every time." },
  ];

  const diffColor: Record<string, string> = {
    Easy: "bg-emerald-100 text-emerald-800",
    Moderate: "bg-amber-100 text-amber-800",
    Hard: "bg-orange-100 text-orange-800",
    Technical: "bg-red-100 text-red-800",
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden bg-[#ddd8cc]">
        <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3009]/80 via-[#1a3009]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block bg-[#f6f3ee]/15 backdrop-blur border border-[#f6f3ee]/25 text-[#f6f3ee] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded mb-3">
              {typeIcons[dest.type]} {dest.type}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[#f6f3ee] mb-2">{dest.name}</h1>
            <p className="text-[#ddd8cc] text-sm md:text-base mb-6">{dest.location} · {dest.elevation} Elevation</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setCompleted(!completed)}
                className={`flex items-center gap-2 font-semibold px-6 py-3 rounded transition-colors ${
                  completed ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-[#f6f3ee] text-[#2e2b26] hover:bg-[#ede9e0]"
                }`}
              >
                {completed ? "✓ Completed!" : "✓ I Completed This"}
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className="flex items-center gap-2 bg-[#f6f3ee]/10 backdrop-blur border border-[#f6f3ee]/30 text-[#f6f3ee] font-medium px-5 py-3 rounded hover:bg-[#f6f3ee]/20 transition-colors"
              >
                {saved ? "♥ Saved" : "♡ Save"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-[#8a8278]">
          <Link to="/" className="hover:text-[#2e2b26]">Home</Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-[#2e2b26]">Explore</Link>
          <span>/</span>
          <span className="text-[#2e2b26]">{dest.name}</span>
        </nav>
      </div>

      {/* Knowledge tab nav */}
      <div className="border-b border-[#ddd8cc] sticky top-16 z-30 bg-[#f6f3ee]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`pb-3 pt-2 px-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                tab === id ? "border-[#2a4d0f] text-[#2a4d0f]" : "border-transparent text-[#8a8278] hover:text-[#5a5549]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-6 py-8 pb-16">

        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-3xl font-bold text-[#2e2b26] mb-4">About {dest.name}</h2>
                <p className="text-[#5a5549] leading-relaxed">{dest.description}</p>
              </div>

              {/* Explorer avatars */}
              <div>
                <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">
                  {dest.explorers} Explorers Have Completed This
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  {explorers.slice(0, 5).map((exp, i) => (
                    <Link key={exp.id} to={`/explorer/${exp.username}`}>
                      <img src={exp.avatar} alt={exp.name} title={exp.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#f6f3ee] hover:ring-[#2a4d0f] transition-all" style={{ zIndex: 5 - i, marginLeft: i > 0 ? "-8px" : "0" }} />
                    </Link>
                  ))}
                  <span className="text-xs text-[#8a8278] ml-3">+{dest.explorers - 5} more</span>
                </div>
                <button onClick={() => setTab("explorers")} className="text-sm font-semibold text-[#2a4d0f] hover:underline">
                  View all explorers →
                </button>
              </div>

              {/* Recent adventures preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl font-bold text-[#2e2b26]">Recent Adventures</h2>
                  <button onClick={() => setTab("adventures")} className="text-sm font-semibold text-[#2a4d0f] hover:underline">See all</button>
                </div>
                <div className="space-y-4">
                  {recentAdventures.slice(0, 2).map(({ explorer, date, story }) => (
                    <div key={explorer.id} className="bg-white border border-[#ede9e0] rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <img src={explorer.avatar} alt={explorer.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <Link to={`/explorer/${explorer.username}`} className="font-semibold text-[#2e2b26] text-sm hover:text-[#2a4d0f]">{explorer.name}</Link>
                          <p className="text-[#8a8278] text-xs">Completed on {date}</p>
                        </div>
                      </div>
                      <p className="text-[#5a5549] text-sm leading-relaxed italic">"{story}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improve CTA */}
              <div className="bg-[#f6f3ee] border border-[#ede9e0] rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-[#2e2b26] text-lg">Know something we don't?</h3>
                  <p className="text-[#5a5549] text-sm mt-1">Help improve this destination with your first-hand knowledge.</p>
                </div>
                <Link to={`/destinations/${dest.id}/contribute`} className="bg-[#2e2b26] text-[#f6f3ee] font-semibold text-sm px-4 py-2.5 rounded hover:bg-[#2a4d0f] transition-colors whitespace-nowrap ml-4">
                  Improve this destination
                </Link>
              </div>
            </div>

            {/* Sticky info card */}
            <div className="lg:col-span-1">
              <div className="sticky top-36 bg-white border border-[#ede9e0] rounded-xl overflow-hidden">
                <div className="p-5 border-b border-[#ede9e0]">
                  <h3 className="font-display font-bold text-[#2e2b26] text-lg">Destination Info</h3>
                </div>
                <div className="p-5 space-y-4">
                  {[
                    { icon: "📍", label: "Location", value: dest.location },
                    { icon: "⛰", label: "Elevation", value: dest.elevation },
                    { icon: "🥾", label: "Difficulty", value: dest.difficulty },
                    { icon: "📅", label: "Best Season", value: dest.bestSeason },
                    { icon: "🏕", label: "Camping", value: dest.camping },
                    { icon: "👤", label: "Explorers", value: `${dest.explorers} completed` },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex gap-3">
                      <span className="text-lg leading-none mt-0.5">{icon}</span>
                      <div>
                        <p className="text-[#8a8278] text-xs uppercase tracking-wide font-medium">{label}</p>
                        <p className="text-[#2e2b26] text-sm font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-5 border-t border-[#ede9e0] space-y-2">
                  <button onClick={() => setCompleted(!completed)}
                    className={`w-full font-semibold py-3 rounded transition-colors ${completed ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-[#2a4d0f] text-[#f6f3ee] hover:bg-[#3a6b18]"}`}
                  >
                    {completed ? "✓ Completed!" : "✓ I Completed This"}
                  </button>
                  <Link to="/add-adventure" className="block text-center text-[#2a4d0f] text-sm font-semibold hover:underline">
                    Add full adventure story →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROUTES TAB */}
        {tab === "routes" && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-[#2e2b26]">Routes to {dest.name}</h2>
            </div>
            {routes.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-[#ddd8cc] rounded-xl">
                <div className="text-4xl mb-3">🗺</div>
                <p className="text-[#5a5549]">No routes documented yet.</p>
                <Link to={`/destinations/${dest.id}/contribute`} className="text-sm font-semibold text-[#2a4d0f] mt-2 inline-block hover:underline">Contribute a route →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {routes.map((route) => (
                  <Link key={route.id} to={`/routes/${route.id}`} className="group block bg-white border border-[#ede9e0] rounded-xl p-5 hover:border-[#2a4d0f]/40 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-display font-bold text-[#2e2b26] text-lg group-hover:text-[#2a4d0f] transition-colors">{route.name}</h3>
                        <p className="text-[#8a8278] text-xs mt-0.5">{route.startPoint} → {route.endPoint}</p>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded flex-shrink-0 ml-3 ${diffColor[route.difficulty]}`}>
                        {route.difficulty}
                      </span>
                    </div>
                    <p className="text-[#5a5549] text-sm leading-relaxed mb-4">{route.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-[#5a5549] border-t border-[#f6f3ee] pt-3">
                      <span>📏 {route.distance}</span>
                      <span>⏱ {route.duration}</span>
                      <span>⛰ {route.elevationGain} gain</span>
                      <span>📋 {route.reportCount} trip reports</span>
                      <span className="ml-auto text-[#2a4d0f] font-semibold">View route →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TRIP REPORTS TAB */}
        {tab === "tripreports" && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-[#2e2b26]">Trip Reports</h2>
              <Link to="/create-trip-report" className="bg-[#2a4d0f] text-[#f6f3ee] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#3a6b18] transition-colors">
                + Write Report
              </Link>
            </div>
            {reports.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-[#ddd8cc] rounded-xl">
                <div className="text-4xl mb-3">📝</div>
                <p className="text-[#5a5549]">No trip reports yet.</p>
                <Link to="/create-trip-report" className="text-sm font-semibold text-[#2a4d0f] mt-2 inline-block hover:underline">Write the first report →</Link>
              </div>
            ) : (
              <div className="space-y-5">
                {reports.map((report) => (
                  <Link key={report.id} to={`/trip-reports/${report.id}`} className="group flex gap-5 bg-white border border-[#ede9e0] rounded-xl p-5 hover:border-[#2a4d0f]/40 hover:shadow-md transition-all">
                    <img src={report.heroImage} alt={report.title} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <img src={report.author.avatar} alt={report.author.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-[#8a8278] text-xs">{report.author.name} · {report.date}</span>
                      </div>
                      <h3 className="font-display font-bold text-[#2e2b26] text-lg leading-snug group-hover:text-[#2a4d0f] transition-colors">{report.title}</h3>
                      <div className="flex gap-3 text-xs text-[#5a5549] mt-2">
                        <span>📏 {report.distance}</span>
                        <span>⏱ {report.duration}</span>
                        <span>❤️ {report.likes}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ADVENTURES TAB */}
        {tab === "adventures" && (
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-6">Adventures at {dest.name}</h2>
            <div className="space-y-4">
              {recentAdventures.map(({ explorer, date, story }) => (
                <div key={explorer.id} className="bg-white border border-[#ede9e0] rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={explorer.avatar} alt={explorer.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <Link to={`/explorer/${explorer.username}`} className="font-semibold text-[#2e2b26] text-sm hover:text-[#2a4d0f]">{explorer.name}</Link>
                      <p className="text-[#8a8278] text-xs">Completed on {date}</p>
                    </div>
                  </div>
                  <p className="text-[#5a5549] text-sm leading-relaxed italic">"{story}"</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/add-adventure" className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold text-sm px-5 py-3 rounded-lg hover:bg-[#3a6b18] transition-colors">
                + Record Your Adventure
              </Link>
            </div>
          </div>
        )}

        {/* EXPLORERS TAB */}
        {tab === "explorers" && (
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-6">{dest.explorers} Explorers Have Completed {dest.name}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {explorers.map((exp) => (
                <div key={exp.id} className="flex items-center gap-4 bg-white border border-[#ede9e0] rounded-xl p-4">
                  <img src={exp.avatar} alt={exp.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/explorer/${exp.username}`} className="font-semibold text-[#2e2b26] text-sm hover:text-[#2a4d0f] transition-colors">{exp.name}</Link>
                    <p className="text-[#8a8278] text-xs">{exp.location}</p>
                    <p className="text-[#5a5549] text-xs mt-0.5">🥾 {exp.adventures} adventures</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {tab === "gallery" && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-6">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[dest.image, ...tripReports.slice(0, 5).map((r) => r.heroImage)].map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl bg-[#ddd8cc] group cursor-pointer">
                  <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
