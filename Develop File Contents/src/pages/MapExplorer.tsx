import { useState } from "react";
import { Link } from "react-router";
import { destinations } from "../data/mock";

const filters = ["All", "Lakes", "Peaks", "Hikes", "Meadows"];
const regions = ["All Regions", ...Array.from(new Set(destinations.map((destination) => destination.region))).sort()];

const featuredDestinationCoords: Record<string, { x: number; y: number }> = {
  "kundol-lake": { x: 30, y: 35 },
  "mahodand-lake": { x: 28, y: 28 },
  "jahaz-banda": { x: 32, y: 32 },
  "katora-lake": { x: 36, y: 30 },
  "falak-sar": { x: 34, y: 26 },
  "nanga-parbat-base": { x: 62, y: 40 },
};

const regionCoords: Record<string, { x: number; y: number }> = {
  "Gilgit-Baltistan": { x: 61, y: 25 },
  "Khyber Pakhtunkhwa": { x: 36, y: 43 },
  "Azad Kashmir": { x: 59, y: 50 },
  Islamabad: { x: 49, y: 58 },
  Punjab: { x: 50, y: 68 },
  Balochistan: { x: 22, y: 72 },
  Sindh: { x: 40, y: 84 },
};

function getDestinationCoords(id: string, region: string) {
  if (featuredDestinationCoords[id]) return featuredDestinationCoords[id];

  const base = regionCoords[region] ?? { x: 50, y: 50 };
  const hash = [...id].reduce((total, character) => total + character.charCodeAt(0), 0);
  return {
    x: base.x + (hash % 15) - 7,
    y: base.y + (Math.floor(hash / 15) % 13) - 6,
  };
}

const typeColor: Record<string, string> = {
  Lake: "#2a4d0f",
  Peak: "#8a8278",
  Meadow: "#3a6b18",
  Hike: "#5a5549",
};

export default function MapExplorer() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All Regions");
  const [selectedDest, setSelectedDest] = useState<string | null>(null);

  const filtered = destinations.filter((d) => {
    const matchType = activeFilter === "All" ||
      (activeFilter === "Lakes" && d.type === "Lake") ||
      (activeFilter === "Peaks" && d.type === "Peak") ||
      (activeFilter === "Hikes" && d.type === "Hike") ||
      (activeFilter === "Meadows" && d.type === "Meadow");
    const matchRegion = activeRegion === "All Regions" || d.region === activeRegion;
    return matchType && matchRegion;
  });

  const selected = destinations.find((d) => d.id === selectedDest);

  return (
    <div className="pb-20 md:pb-0 h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#2e2b26] py-5 px-6 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-[#f6f3ee]">Explorer Map</h1>
            <p className="text-[#8a8278] text-xs">Pakistan's outdoor destinations — all in one place</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeFilter === f ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-[#f6f3ee]/10 text-[#ddd8cc] hover:bg-[#f6f3ee]/20"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <select
            value={activeRegion}
            onChange={(e) => setActiveRegion(e.target.value)}
            className="bg-[#f6f3ee]/10 border border-[#f6f3ee]/20 text-[#ddd8cc] rounded-lg px-3 py-1.5 text-xs focus:outline-none"
          >
            {regions.map((r) => <option key={r} className="text-[#2e2b26]">{r}</option>)}
          </select>
        </div>
      </div>

      {/* Map + Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map placeholder */}
        <div className="flex-1 relative bg-[#d4d0c8] overflow-hidden">
          {/* Terrain texture */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, #c8c4bc 0%, transparent 40%), radial-gradient(circle at 70% 60%, #ccc8c0 0%, transparent 35%), radial-gradient(circle at 50% 20%, #d0ccc4 0%, transparent 30%)`,
          }} />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "linear-gradient(#8a8278 1px, transparent 1px), linear-gradient(90deg, #8a8278 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

          {/* Mountain ranges */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 70 L10 50 L20 60 L30 35 L40 55 L50 25 L60 45 L70 30 L80 50 L90 40 L100 55 L100 100 L0 100Z" fill="#8a8278" />
            <path d="M20 80 L35 55 L45 65 L55 40 L65 60 L80 45 L100 65 L100 100 L20 100Z" fill="#9a9690" />
          </svg>

          {/* Destination markers */}
          {filtered.map((dest) => {
            const coords = getDestinationCoords(dest.id, dest.region);
            const isSelected = selectedDest === dest.id;
            const color = typeColor[dest.type] ?? "#2a4d0f";
            return (
              <button
                key={dest.id}
                onClick={() => setSelectedDest(isSelected ? null : dest.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
              >
                <div className={`relative transition-all duration-200 ${isSelected ? "scale-125" : "hover:scale-110"}`}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white text-white text-xs font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {dest.type === "Lake" ? "💧" : dest.type === "Peak" ? "⛰" : dest.type === "Meadow" ? "🌿" : "🥾"}
                  </div>
                  {isSelected && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white border border-[#ede9e0] rounded-lg px-3 py-2 shadow-lg whitespace-nowrap z-10">
                      <p className="text-[#2e2b26] text-xs font-semibold">{dest.name}</p>
                      <p className="text-[#8a8278] text-[10px]">{dest.elevation}</p>
                    </div>
                  )}
                </div>
              </button>
            );
          })}

          {/* Map attribution */}
          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur rounded-lg px-3 py-2">
            <p className="text-[#8a8278] text-[10px] font-medium">Interactive map · Pakistan Mountains</p>
            <p className="text-[#8a8278] text-[9px]">Full map integration coming soon</p>
          </div>

          {/* Zoom controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-1">
            <button className="w-9 h-9 bg-white border border-[#ede9e0] rounded-lg text-[#2e2b26] font-bold shadow hover:bg-[#f6f3ee] transition-colors">+</button>
            <button className="w-9 h-9 bg-white border border-[#ede9e0] rounded-lg text-[#2e2b26] font-bold shadow hover:bg-[#f6f3ee] transition-colors">−</button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur border border-[#ede9e0] rounded-xl px-4 py-3">
            <p className="text-[#2e2b26] text-[10px] font-bold uppercase tracking-wide mb-2">Legend</p>
            {[
              { color: "#2a4d0f", icon: "💧", label: "Lake" },
              { color: "#8a8278", icon: "⛰", label: "Peak" },
              { color: "#3a6b18", icon: "🌿", label: "Meadow" },
              { color: "#5a5549", icon: "🥾", label: "Trek" },
            ].map(({ color, icon, label }) => (
              <div key={label} className="flex items-center gap-2 mb-1 last:mb-0">
                <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px]" style={{ backgroundColor: color }}>
                  {icon}
                </div>
                <span className="text-[#5a5549] text-[10px]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-72 bg-white border-l border-[#ede9e0] flex flex-col overflow-y-auto flex-shrink-0">
          {/* Stats */}
          <div className="bg-[#f6f3ee] border-b border-[#ede9e0] p-4">
            <p className="text-[#2e2b26] text-xs font-semibold uppercase tracking-wide mb-3">Your Exploration Stats</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: "32", label: "Destinations" },
                { n: "12", label: "Lakes" },
                { n: "5", label: "Peaks" },
                { n: "7", label: "Meadows" },
                { n: "4,800m", label: "Highest Elev." },
                { n: "4", label: "Regions" },
              ].map(({ n, label }) => (
                <div key={label} className="bg-white border border-[#ede9e0] rounded-lg p-2 text-center">
                  <p className="font-display font-bold text-[#2e2b26] text-base">{n}</p>
                  <p className="text-[#8a8278] text-[10px]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Destination list */}
          <div className="flex-1 overflow-y-auto">
            <p className="text-[#8a8278] text-[10px] font-semibold uppercase tracking-wide px-4 py-3 border-b border-[#ede9e0]">
              {filtered.length} destination{filtered.length !== 1 ? "s" : ""} shown
            </p>
            {filtered.map((dest) => (
              <button
                key={dest.id}
                onClick={() => setSelectedDest(dest.id === selectedDest ? null : dest.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 border-b border-[#f6f3ee] hover:bg-[#f6f3ee] transition-colors text-left ${selectedDest === dest.id ? "bg-[#2a4d0f]/5 border-l-2 border-l-[#2a4d0f]" : ""}`}
              >
                <img src={dest.image} alt={dest.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[#2e2b26] text-xs font-semibold truncate">{dest.name}</p>
                  <p className="text-[#8a8278] text-[10px]">{dest.type} · {dest.elevation}</p>
                </div>
                {selectedDest === dest.id && <span className="text-[#2a4d0f] text-xs">●</span>}
              </button>
            ))}
          </div>

          {/* Selected destination CTA */}
          {selected && (
            <div className="border-t border-[#ede9e0] p-4 bg-white">
              <p className="text-[#2e2b26] font-semibold text-sm mb-1">{selected.name}</p>
              <p className="text-[#8a8278] text-xs mb-3">{selected.location} · {selected.elevation}</p>
              <Link
                to={`/destinations/${selected.id}`}
                className="block text-center bg-[#2a4d0f] text-[#f6f3ee] text-xs font-semibold py-2.5 rounded-lg hover:bg-[#3a6b18] transition-colors"
              >
                Open Destination →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
