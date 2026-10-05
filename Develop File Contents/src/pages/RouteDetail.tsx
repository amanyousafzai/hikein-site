import { useParams, Link } from "react-router";
import { hikingRoutes } from "../data/routes";
import { destinations } from "../data/mock";
import { tripReports } from "../data/tripreports";

export default function RouteDetail() {
  const { id } = useParams();
  const route = hikingRoutes.find((r) => r.id === id) ?? hikingRoutes[0];
  const dest = destinations.find((d) => d.id === route.destinationId);
  const relatedReports = tripReports.filter((r) => r.routeId === route.id);

  const diffColor: Record<string, string> = {
    Easy: "bg-emerald-100 text-emerald-800",
    Moderate: "bg-amber-100 text-amber-800",
    Hard: "bg-orange-100 text-orange-800",
    Technical: "bg-red-100 text-red-800",
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      {dest && (
        <div className="relative h-56 md:h-72 overflow-hidden bg-[#ddd8cc]">
          <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2e2b26]/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              <span className={`inline-block text-xs font-bold uppercase px-3 py-1 rounded-full mb-3 ${diffColor[route.difficulty]}`}>
                {route.difficulty}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#f6f3ee]">{route.name}</h1>
              <p className="text-[#ddd8cc] text-sm mt-1">{route.startPoint} → {route.endPoint}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats bar */}
      <div className="bg-[#2e2b26] py-4">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap gap-6">
          {[
            { icon: "📏", label: "Distance", value: route.distance },
            { icon: "⏱", label: "Duration", value: route.duration },
            { icon: "⛰", label: "Elevation Gain", value: route.elevationGain },
            { icon: "📅", label: "Best Season", value: route.popularMonth },
            { icon: "📋", label: "Trip Reports", value: `${route.reportCount}` },
          ].map(({ icon, label, value }) => (
            <div key={label}>
              <p className="text-[#8a8278] text-[10px] uppercase tracking-wide">{label}</p>
              <p className="text-[#f6f3ee] text-sm font-semibold">{icon} {value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 pb-12 grid lg:grid-cols-[1fr_260px] gap-10">
        {/* Main */}
        <div className="space-y-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#8a8278]">
            <Link to="/explore" className="hover:text-[#2e2b26]">Explore</Link>
            <span>/</span>
            {dest && <Link to={`/destinations/${dest.id}`} className="hover:text-[#2e2b26]">{dest.name}</Link>}
            <span>/</span>
            <span className="text-[#2e2b26]">{route.name}</span>
          </nav>

          {/* Description */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-3">About this Route</h2>
            <p className="text-[#5a5549] leading-relaxed text-sm">{route.description}</p>
          </div>

          {/* Route overview */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Route Details</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Start Point", value: route.startPoint },
                { label: "End Point", value: route.endPoint },
                { label: "Total Distance", value: route.distance },
                { label: "Estimated Duration", value: route.duration },
                { label: "Difficulty", value: route.difficulty },
                { label: "Elevation Gain", value: route.elevationGain },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white border border-[#ede9e0] rounded-lg px-4 py-3">
                  <p className="text-[#8a8278] text-[10px] uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-[#2e2b26] text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Waypoints */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-5">Waypoints</h2>
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#ddd8cc]" />
              <div className="space-y-4">
                {route.waypoints.map((wp, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 ${
                      i === 0 ? "border-[#2a4d0f] bg-[#2a4d0f] text-[#f6f3ee]" :
                      i === route.waypoints.length - 1 ? "border-[#2a4d0f] bg-[#2a4d0f] text-[#f6f3ee]" :
                      "border-[#ddd8cc] bg-[#f6f3ee] text-[#5a5549]"
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 bg-white border border-[#ede9e0] rounded-xl p-4 mb-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="font-semibold text-[#2e2b26] text-sm">{wp.name}</h3>
                        <span className="text-[#8a8278] text-xs">{wp.elevation}</span>
                      </div>
                      <p className="text-[#5a5549] text-xs leading-relaxed">{wp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Route Map</h2>
            <div className="bg-[#ede9e0] rounded-xl h-48 flex items-center justify-center border border-[#ddd8cc]">
              <div className="text-center">
                <div className="text-3xl mb-2">🗺</div>
                <p className="text-[#8a8278] text-sm font-medium">Interactive map coming in V2</p>
                <p className="text-[#8a8278] text-xs mt-1">Elevation: {route.elevationGain} gain over {route.distance}</p>
              </div>
            </div>
          </div>

          {/* Related reports */}
          {relatedReports.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Trip Reports Using This Route</h2>
              {relatedReports.map((rep) => (
                <Link key={rep.id} to={`/trip-reports/${rep.id}`} className="flex items-center gap-4 bg-white border border-[#ede9e0] rounded-xl p-4 hover:border-[#2a4d0f]/40 transition-all group">
                  <img src={rep.heroImage} alt={rep.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <p className="font-display font-bold text-[#2e2b26] text-sm group-hover:text-[#2a4d0f] transition-colors">{rep.title}</p>
                    <p className="text-[#8a8278] text-xs mt-0.5">By {rep.author.name} · {rep.date}</p>
                    <p className="text-[#5a5549] text-xs mt-1">❤️ {rep.likes} · 📏 {rep.distance} · ⏱ {rep.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Photos */}
          {route.photos.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Route Photos</h2>
              <div className="grid grid-cols-2 gap-3">
                {route.photos.map((img, i) => (
                  <div key={i} className="aspect-video overflow-hidden rounded-xl bg-[#ddd8cc]">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block space-y-4 pt-10">
          {dest && (
            <div className="bg-white border border-[#ede9e0] rounded-xl overflow-hidden">
              <img src={dest.image} alt={dest.name} className="w-full h-28 object-cover" />
              <div className="p-4">
                <p className="text-[#2a4d0f] text-xs font-semibold uppercase mb-1">{dest.type}</p>
                <p className="font-display font-bold text-[#2e2b26] text-base">{dest.name}</p>
                <p className="text-[#8a8278] text-xs mb-3">{dest.elevation} · {dest.explorers} explorers</p>
                <Link to={`/destinations/${dest.id}`} className="block text-center text-xs font-semibold text-[#2a4d0f] border border-[#2a4d0f]/30 py-2 rounded-lg hover:bg-[#2a4d0f]/5 transition-colors">
                  View All Routes →
                </Link>
              </div>
            </div>
          )}
          <div className="bg-[#2a4d0f] rounded-xl p-4 text-center">
            <p className="text-[#f6f3ee] font-semibold text-sm mb-1">Done this route?</p>
            <p className="text-[#ddd8cc] text-xs mb-3">Help others with your experience.</p>
            <Link to="/create-trip-report" className="block bg-[#f6f3ee] text-[#2a4d0f] font-semibold text-xs py-2 rounded-lg hover:bg-[#ede9e0] transition-colors">
              Write a Trip Report
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
