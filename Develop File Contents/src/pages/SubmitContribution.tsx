import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { destinations } from "../data/mock";

const contributionTypes = [
  { id: "route", label: "Route Correction", icon: "🗺", desc: "Update route details, distances, or waypoints" },
  { id: "elevation", label: "Elevation Correction", icon: "⛰", desc: "Correct peak or lake elevation data" },
  { id: "season", label: "Best Season", icon: "📅", desc: "Update seasonal access information" },
  { id: "camping", label: "Camping Information", icon: "🏕", desc: "Add or correct camping details" },
  { id: "water", label: "Water Sources", icon: "💧", desc: "Add water source locations" },
  { id: "safety", label: "Safety Warning", icon: "⚠️", desc: "Report hazards or trail changes" },
  { id: "photos", label: "Photos", icon: "📷", desc: "Submit photos for the destination gallery" },
  { id: "name", label: "Alternative Names", icon: "📝", desc: "Add local or alternative names" },
  { id: "tip", label: "Tip or Advice", icon: "💡", desc: "Share practical knowledge for visitors" },
];

export default function SubmitContribution() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dest = destinations.find((d) => d.id === slug) ?? destinations[0];
  const [selectedType, setSelectedType] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center pb-24 md:pb-20">
        <div className="w-16 h-16 bg-[#2a4d0f] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#f6f3ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-3xl font-bold text-[#2e2b26] mb-2">Contribution Submitted</h2>
        <p className="text-[#5a5549] text-sm leading-relaxed mb-2">
          Your contribution to <strong>{dest.name}</strong> has been received and is Under Review.
        </p>
        <p className="text-[#8a8278] text-xs mb-8">Our team will review your submission and publish it if it meets our guidelines. Thank you for improving HikeIN.</p>
        <div className="flex flex-col gap-3">
          <Link to={`/destinations/${dest.id}`} className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold py-3 rounded-xl hover:bg-[#3a6b18] transition-colors text-sm">
            Back to {dest.name}
          </Link>
          <button onClick={() => { setSubmitted(false); setSelectedType(""); setContent(""); }} className="border border-[#ddd8cc] text-[#5a5549] font-medium py-3 rounded-xl text-sm hover:border-[#2a4d0f]/40 transition-colors">
            Submit Another Contribution
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-24 md:pb-10">
      {/* Header */}
      <nav className="flex items-center gap-2 text-xs text-[#8a8278] mb-6">
        <Link to={`/destinations/${dest.id}`} className="hover:text-[#2e2b26]">{dest.name}</Link>
        <span>/</span>
        <span className="text-[#2e2b26]">Improve this Destination</span>
      </nav>

      <div className="flex items-center gap-4 mb-8">
        <img src={dest.image} alt={dest.name} className="w-14 h-14 rounded-xl object-cover" />
        <div>
          <h1 className="font-display text-2xl font-bold text-[#2e2b26]">Improve this Destination</h1>
          <p className="text-[#8a8278] text-sm">{dest.name} · {dest.location.split(",")[0]}</p>
        </div>
      </div>

      <p className="text-[#5a5549] text-sm leading-relaxed mb-8 bg-[#f6f3ee] border border-[#ede9e0] rounded-xl p-4">
        HikeIN's destination data grows better through the knowledge of explorers who have been there. Every verified contribution is credited to your profile. All submissions are reviewed before publishing.
      </p>

      {/* Type selection */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-3">Contribution Type *</label>
        <div className="grid sm:grid-cols-2 gap-2">
          {contributionTypes.map(({ id, label, icon, desc }) => (
            <button
              key={id}
              onClick={() => setSelectedType(id)}
              className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-colors ${
                selectedType === id
                  ? "border-[#2a4d0f] bg-[#2a4d0f]/5"
                  : "border-[#ede9e0] bg-white hover:border-[#2a4d0f]/30"
              }`}
            >
              <span className="text-xl leading-none mt-0.5">{icon}</span>
              <div>
                <p className={`font-semibold text-xs ${selectedType === id ? "text-[#2a4d0f]" : "text-[#2e2b26]"}`}>{label}</p>
                <p className="text-[#8a8278] text-[10px] mt-0.5">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">
          Your Contribution *
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            selectedType === "safety"
              ? "Describe the hazard, its location, and what hikers should do..."
              : selectedType === "photos"
              ? "Describe where and when the photos were taken..."
              : "Provide your updated or corrected information. Be as specific as possible — include measurements, GPS references, or dates where relevant."
          }
          rows={6}
          className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-xl text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f] resize-none"
        />
      </div>

      {(selectedType === "photos" || selectedType === "") && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Attach Photos (Optional)</label>
          <label className="flex items-center gap-3 border border-dashed border-[#ddd8cc] rounded-xl p-4 cursor-pointer hover:border-[#2a4d0f]/40 transition-colors bg-[#f6f3ee]">
            <span className="text-2xl">📷</span>
            <span className="text-sm text-[#5a5549] font-medium">Upload supporting photos</span>
            <input type="file" multiple accept="image/*" className="hidden" />
          </label>
        </div>
      )}

      {/* Status info */}
      <div className="bg-[#f6f3ee] border border-[#ede9e0] rounded-xl p-4 mb-6 text-xs text-[#5a5549] leading-relaxed">
        <p className="font-semibold text-[#2e2b26] mb-1">How contributions work</p>
        Your submission will be marked <span className="font-semibold text-amber-700">Under Review</span> immediately. Once our team verifies it, it will be <span className="font-semibold text-emerald-700">Published</span> to the destination page and credited to your explorer profile. Inaccurate or harmful submissions will be <span className="font-semibold text-red-700">Rejected</span>.
      </div>

      <button
        disabled={!selectedType || !content.trim()}
        onClick={() => setSubmitted(true)}
        className="w-full bg-[#2a4d0f] text-[#f6f3ee] font-semibold py-3.5 rounded-xl hover:bg-[#3a6b18] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Submit Contribution
      </button>
    </div>
  );
}
