import { useState } from "react";
import { Link } from "react-router";
import { destinations } from "../data/mock";

interface Collection {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  destinations: string[];
  completed: string[];
  cover: string;
}

const initialCollections: Collection[] = [
  {
    id: "swat-lakes",
    name: "My Swat Lakes",
    description: "Every lake I've visited in the Swat Valley. Working on completing the full circuit.",
    isPublic: true,
    destinations: ["kundol-lake", "mahodand-lake", "katora-lake", "jahaz-banda"],
    completed: ["kundol-lake", "mahodand-lake"],
    cover: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=300&fit=crop&auto=format",
  },
  {
    id: "dream-peaks",
    name: "Dream Peaks",
    description: "The peaks I want to summit before I'm 40. A list I update every season.",
    isPublic: false,
    destinations: ["falak-sar", "nanga-parbat-base"],
    completed: ["nanga-parbat-base"],
    cover: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=600&h=300&fit=crop&auto=format",
  },
  {
    id: "weekend-hikes",
    name: "Weekend Day Hikes",
    description: "Accessible day hikes I can do from Islamabad on a weekend.",
    isPublic: true,
    destinations: ["jahaz-banda", "katora-lake"],
    completed: ["jahaz-banda"],
    cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=300&fit=crop&auto=format",
  },
];

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPublic, setNewPublic] = useState(true);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const handleCreate = () => {
    if (!newName.trim()) return;
    const col: Collection = {
      id: `col-${Date.now()}`,
      name: newName,
      description: newDesc,
      isPublic: newPublic,
      destinations: [],
      completed: [],
      cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop&auto=format",
    };
    setCollections([col, ...collections]);
    setShowCreate(false);
    setNewName("");
    setNewDesc("");
  };

  const toggleComplete = (colId: string, destId: string) => {
    setCollections(collections.map((c) => {
      if (c.id !== colId) return c;
      const already = c.completed.includes(destId);
      return { ...c, completed: already ? c.completed.filter((d) => d !== destId) : [...c.completed, destId] };
    }));
  };

  const active = collections.find((c) => c.id === activeCollection);

  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-[#2e2b26] py-14">
        <div className="max-w-7xl mx-auto px-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[#3a6b18] text-xs font-semibold uppercase tracking-widest mb-3">Personal Lists</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#f6f3ee] mb-3">Collections</h1>
            <p className="text-[#8a8278] text-lg max-w-xl">Organize destinations into personal lists. Track what you've completed.</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex-shrink-0 bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-5 py-3 rounded-xl hover:bg-[#3a6b18] transition-colors text-sm"
          >
            + New Collection
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Collection list */}
        <div className="space-y-3">
          {collections.map((col) => {
            const completedCount = col.completed.length;
            const totalCount = col.destinations.length;
            const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
            return (
              <button
                key={col.id}
                onClick={() => setActiveCollection(col.id)}
                className={`w-full text-left bg-white border rounded-xl overflow-hidden hover:border-[#2a4d0f]/40 transition-all ${
                  activeCollection === col.id ? "border-[#2a4d0f] ring-2 ring-[#2a4d0f]/20" : "border-[#ede9e0]"
                }`}
              >
                <img src={col.cover} alt={col.name} className="w-full h-20 object-cover" />
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-[#2e2b26] text-sm leading-tight">{col.name}</p>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${col.isPublic ? "bg-[#2a4d0f]/10 text-[#2a4d0f]" : "bg-[#f6f3ee] text-[#8a8278] border border-[#ddd8cc]"}`}>
                      {col.isPublic ? "Public" : "Private"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-[#ede9e0] rounded-full h-1.5">
                      <div className="bg-[#2a4d0f] h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[#8a8278] text-[10px] flex-shrink-0">{completedCount}/{totalCount}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Collection detail */}
        {active ? (
          <div>
            <div className="bg-white border border-[#ede9e0] rounded-2xl overflow-hidden mb-6">
              <img src={active.cover} alt={active.name} className="w-full h-40 object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="font-display text-2xl font-bold text-[#2e2b26]">{active.name}</h2>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${active.isPublic ? "bg-[#2a4d0f]/10 text-[#2a4d0f]" : "bg-[#f6f3ee] text-[#8a8278] border border-[#ddd8cc]"}`}>
                    {active.isPublic ? "🌐 Public" : "🔒 Private"}
                  </span>
                </div>
                <p className="text-[#5a5549] text-sm mb-4">{active.description}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-[#ede9e0] rounded-full h-2">
                    <div
                      className="bg-[#2a4d0f] h-2 rounded-full transition-all"
                      style={{ width: active.destinations.length > 0 ? `${(active.completed.length / active.destinations.length) * 100}%` : "0%" }}
                    />
                  </div>
                  <span className="text-[#2e2b26] text-sm font-semibold">{active.completed.length}/{active.destinations.length} completed</span>
                </div>
              </div>
            </div>

            {/* Destinations in collection */}
            <div className="space-y-3 mb-6">
              {active.destinations.map((destId) => {
                const dest = destinations.find((d) => d.id === destId);
                if (!dest) return null;
                const done = active.completed.includes(destId);
                return (
                  <div key={destId} className="flex items-center gap-4 bg-white border border-[#ede9e0] rounded-xl p-4">
                    <button
                      onClick={() => toggleComplete(active.id, destId)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${done ? "bg-[#2a4d0f] border-[#2a4d0f] text-white" : "border-[#ddd8cc] hover:border-[#2a4d0f]/40"}`}
                    >
                      {done && <span className="text-xs">✓</span>}
                    </button>
                    <img src={dest.image} alt={dest.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm leading-tight ${done ? "text-[#8a8278] line-through" : "text-[#2e2b26]"}`}>{dest.name}</p>
                      <p className="text-[#8a8278] text-xs">{dest.type} · {dest.elevation} · {dest.location.split(",")[0]}</p>
                    </div>
                    <Link to={`/destinations/${dest.id}`} className="text-[#2a4d0f] text-xs font-semibold hover:text-[#3a6b18] flex-shrink-0">
                      View →
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Add more destinations */}
            <div className="bg-[#f6f3ee] border-2 border-dashed border-[#ddd8cc] rounded-xl p-5 text-center">
              <p className="text-[#5a5549] text-sm font-medium mb-2">Add destinations to this collection</p>
              <Link to="/explore" className="text-[#2a4d0f] text-sm font-semibold hover:text-[#3a6b18] transition-colors">
                Browse Destinations →
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="text-5xl mb-4">📚</div>
              <p className="font-display text-2xl font-bold text-[#2e2b26] mb-2">Select a Collection</p>
              <p className="text-[#8a8278] text-sm">Choose a collection from the list to see its destinations.</p>
            </div>
          </div>
        )}
      </div>

      {/* Create collection modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-[#2e2b26]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-7 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-[#2e2b26]">New Collection</h3>
              <button onClick={() => setShowCreate(false)} className="text-[#8a8278] hover:text-[#2e2b26] text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-1.5 uppercase tracking-wide">Collection Name</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full border border-[#ddd8cc] rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                  placeholder="e.g. My Swat Lakes, Dream Peaks..."
                />
              </div>
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-1.5 uppercase tracking-wide">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={3}
                  className="w-full border border-[#ddd8cc] rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30 resize-none"
                  placeholder="What's this collection about?"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNewPublic(!newPublic)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${newPublic ? "bg-[#2a4d0f]" : "bg-[#ddd8cc]"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${newPublic ? "translate-x-5" : "translate-x-1"}`} />
                </button>
                <label className="text-[#5a5549] text-sm cursor-pointer" onClick={() => setNewPublic(!newPublic)}>
                  {newPublic ? "🌐 Public collection" : "🔒 Private collection"}
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreate(false)} className="flex-1 border border-[#ddd8cc] text-[#5a5549] font-medium py-3 rounded-xl hover:border-[#2a4d0f]/40 transition-colors text-sm">
                Cancel
              </button>
              <button onClick={handleCreate} className="flex-1 bg-[#2a4d0f] text-[#f6f3ee] font-semibold py-3 rounded-xl hover:bg-[#3a6b18] transition-colors text-sm">
                Create Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
