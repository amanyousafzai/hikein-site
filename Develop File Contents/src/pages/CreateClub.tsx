import { useState } from "react";
import { useNavigate } from "react-router";

const categories = ["General Hiking", "University Club", "Regional Community", "Mountaineering", "Photography", "Trail Running", "Family Hiking"];

export default function CreateClub() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General Hiking");
  const [isPublic, setIsPublic] = useState(true);
  const [dragging, setDragging] = useState(false);

  const canSubmit = name.trim() && username.trim() && location.trim() && description.trim();

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-24 md:pb-10">
      <h1 className="font-display text-4xl font-bold text-[#2e2b26] mb-2">Create a Club</h1>
      <p className="text-[#8a8278] text-sm mb-8">Build a home for your hiking community on HikeIN.</p>

      <div className="space-y-5">
        {/* Cover image */}
        <div>
          <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Cover Image</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); }}
            className={`relative h-32 border-2 border-dashed rounded-xl overflow-hidden flex items-center justify-center transition-colors ${
              dragging ? "border-[#2a4d0f] bg-[#2a4d0f]/5" : "border-[#ddd8cc] bg-[#f6f3ee]"
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">🏔</div>
              <p className="text-xs text-[#8a8278]">Upload cover image</p>
              <label className="mt-2 cursor-pointer inline-block bg-white border border-[#ddd8cc] text-[#5a5549] text-xs font-semibold px-3 py-1.5 rounded hover:border-[#2a4d0f]/40">
                Browse <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div>
          <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Club Logo</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[#ede9e0] border border-[#ddd8cc] flex items-center justify-center text-2xl">🏔</div>
            <label className="cursor-pointer bg-white border border-[#ddd8cc] text-[#5a5549] text-xs font-semibold px-4 py-2.5 rounded-lg hover:border-[#2a4d0f]/40 transition-colors">
              Upload Logo <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Club Name *</label>
          <input value={name} onChange={(e) => { setName(e.target.value); setUsername(e.target.value.toLowerCase().replace(/\s+/g, "-")); }}
            placeholder="Aman Hiking Club"
            className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Club URL *</label>
          <div className="flex items-center border border-[#ddd8cc] rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#2a4d0f]">
            <span className="px-3 py-3 text-sm text-[#8a8278] bg-[#f6f3ee] border-r border-[#ddd8cc] flex-shrink-0">hikein.pk/clubs/</span>
            <input value={username} onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              placeholder="aman-hiking-club"
              className="flex-1 px-3 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Location *</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Islamabad, Pakistan"
            className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]"
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Description *</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell people what your club is about, who it's for, and what makes it special..."
            rows={5}
            className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f] resize-none"
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Visibility</label>
          <div className="flex gap-3">
            {[
              { value: true, icon: "🌎", label: "Public", desc: "Anyone can find and view your club" },
              { value: false, icon: "🔒", label: "Private", desc: "Only members can see the club" },
            ].map(({ value, icon, label, desc }) => (
              <button
                key={label}
                onClick={() => setIsPublic(value)}
                className={`flex-1 flex flex-col items-start p-3 rounded-xl border text-left transition-colors ${
                  isPublic === value ? "border-[#2a4d0f] bg-[#2a4d0f]/5" : "border-[#ddd8cc] bg-white hover:border-[#2a4d0f]/30"
                }`}
              >
                <span className="text-xl mb-1">{icon}</span>
                <p className={`font-semibold text-sm ${isPublic === value ? "text-[#2a4d0f]" : "text-[#2e2b26]"}`}>{label}</p>
                <p className="text-[#8a8278] text-xs">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!canSubmit}
          onClick={() => navigate("/clubs/aman-hiking-club")}
          className="w-full bg-[#2a4d0f] text-[#f6f3ee] font-semibold py-3.5 rounded-xl hover:bg-[#3a6b18] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Create Club
        </button>
      </div>
    </div>
  );
}
