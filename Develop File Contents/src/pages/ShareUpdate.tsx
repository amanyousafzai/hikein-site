import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { destinations } from "../data/mock";

type PostType = "adventure" | "photo" | "tripreport" | "tip" | "question" | "update";

const types: { id: PostType; icon: string; label: string }[] = [
  { id: "adventure", icon: "🥾", label: "Adventure Story" },
  { id: "photo", icon: "📷", label: "Photo Update" },
  { id: "tripreport", icon: "📝", label: "Trip Report" },
  { id: "tip", icon: "💡", label: "Outdoor Tip" },
  { id: "question", icon: "❓", label: "Question" },
  { id: "update", icon: "📣", label: "General Update" },
];

export default function ShareUpdate() {
  const navigate = useNavigate();
  const [postType, setPostType] = useState<PostType>("update");
  const [content, setContent] = useState("");
  const [destSearch, setDestSearch] = useState("");
  const [taggedDest, setTaggedDest] = useState<typeof destinations[0] | null>(null);
  const [showDestSearch, setShowDestSearch] = useState(false);
  const [visibility, setVisibility] = useState<"public" | "followers">("public");
  const [dragging, setDragging] = useState(false);

  const destResults = destinations.filter((d) =>
    d.name.toLowerCase().includes(destSearch.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-24 md:pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="text-[#8a8278] hover:text-[#2e2b26] transition-colors">
          ←
        </button>
        <h1 className="font-display text-3xl font-bold text-[#2e2b26]">Share Update</h1>
      </div>

      <p className="text-[#8a8278] text-sm mb-6">Share an update with the HikeIN community</p>

      {/* Post type selector */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Type</label>
        <div className="grid grid-cols-3 gap-2">
          {types.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setPostType(id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
                postType === id
                  ? "border-[#2a4d0f] bg-[#2a4d0f]/5 text-[#2a4d0f]"
                  : "border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/30"
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Write */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Write something</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            postType === "tip"
              ? "Share a tip with the outdoor community..."
              : postType === "question"
              ? "Ask the community something..."
              : postType === "tripreport"
              ? "Write your trip report here — conditions, route notes, what you found..."
              : "Share your story with the HikeIN community..."
          }
          rows={6}
          className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-xl text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f] resize-none"
        />
        <div className="flex justify-end mt-1">
          <span className={`text-[10px] ${content.length > 900 ? "text-orange-500" : "text-[#8a8278]"}`}>
            {content.length}/1000
          </span>
        </div>
      </div>

      {/* Add photos */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Add Photos</label>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); }}
          className={`border-2 border-dashed rounded-xl p-7 text-center transition-colors ${
            dragging ? "border-[#2a4d0f] bg-[#2a4d0f]/5" : "border-[#ddd8cc] bg-[#f6f3ee]"
          }`}
        >
          <div className="text-3xl mb-2">📷</div>
          <p className="text-sm font-medium text-[#2e2b26]">Drag and drop photos here</p>
          <p className="text-xs text-[#8a8278] mt-1 mb-3">or</p>
          <label className="cursor-pointer bg-white border border-[#ddd8cc] text-[#5a5549] text-xs font-semibold px-4 py-2 rounded-lg hover:border-[#2a4d0f]/40 transition-colors">
            Browse Files
            <input type="file" multiple accept="image/*" className="hidden" />
          </label>
        </div>
      </div>

      {/* Tag destination */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Tag Destination</label>
        {taggedDest ? (
          <div className="flex items-center gap-3 bg-[#f6f3ee] border border-[#ddd8cc] rounded-lg p-3">
            <img src={taggedDest.image} alt={taggedDest.name} className="w-10 h-10 rounded object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#2e2b26] text-sm">{taggedDest.name}</p>
              <p className="text-[#8a8278] text-xs">{taggedDest.location.split(",")[0]} · {taggedDest.type}</p>
            </div>
            <button onClick={() => setTaggedDest(null)} className="text-[#8a8278] hover:text-[#2e2b26] text-xs">✕</button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowDestSearch(!showDestSearch)}
              className="w-full flex items-center gap-2 bg-white border border-[#ddd8cc] rounded-lg px-4 py-2.5 text-sm text-[#8a8278] hover:border-[#2a4d0f]/40 transition-colors"
            >
              📍 Tag a destination (optional)
            </button>
            {showDestSearch && (
              <div className="absolute z-10 top-full mt-1 w-full bg-white border border-[#ddd8cc] rounded-xl shadow-lg overflow-hidden">
                <div className="p-3 border-b border-[#f6f3ee]">
                  <input
                    autoFocus
                    value={destSearch}
                    onChange={(e) => setDestSearch(e.target.value)}
                    placeholder="Search destinations..."
                    className="w-full bg-[#f6f3ee] text-[#2e2b26] px-3 py-2 rounded-lg text-xs placeholder:text-[#8a8278] focus:outline-none"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {destResults.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => { setTaggedDest(d); setShowDestSearch(false); setDestSearch(""); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#f6f3ee] transition-colors text-left"
                    >
                      <img src={d.image} alt={d.name} className="w-8 h-8 rounded object-cover" />
                      <div>
                        <p className="text-[#2e2b26] text-xs font-semibold">{d.name}</p>
                        <p className="text-[#8a8278] text-[10px]">{d.type} · {d.elevation}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Visibility */}
      <div className="mb-7">
        <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Visibility</label>
        <div className="flex gap-3">
          {[{ value: "public", icon: "🌎", label: "Public" }, { value: "followers", icon: "👥", label: "Followers Only" }].map(({ value, icon, label }) => (
            <button
              key={value}
              onClick={() => setVisibility(value as "public" | "followers")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                visibility === value
                  ? "border-[#2a4d0f] bg-[#2a4d0f]/5 text-[#2a4d0f]"
                  : "border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/30"
              }`}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Publish */}
      <button
        disabled={!content.trim()}
        onClick={() => navigate("/community")}
        className="w-full bg-[#2a4d0f] text-[#f6f3ee] font-semibold py-3.5 rounded-xl hover:bg-[#3a6b18] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
      >
        Publish
      </button>
    </div>
  );
}
