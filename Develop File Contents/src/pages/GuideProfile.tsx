import { useState } from "react";
import { useParams, Link } from "react-router";
import { guides, expeditions } from "../data/guides";

export default function GuideProfile() {
  const { username } = useParams();
  const guide = guides.find((g) => g.username === username) ?? guides[0];
  const [following, setFollowing] = useState(false);
  const myExpeditions = expeditions.filter((e) => e.organizer.username === guide.username);

  return (
    <div className="pb-20 md:pb-0">
      {/* Cover */}
      <div className="relative h-56 md:h-72 overflow-hidden bg-[#ddd8cc]">
        <img src={guide.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2e2b26]/70 to-transparent" />
      </div>

      {/* Profile header */}
      <div className="bg-white border-b border-[#ede9e0]">
        <div className="max-w-5xl mx-auto px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src={guide.avatar}
                  alt={guide.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-white"
                />
                {guide.verified && (
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#2a4d0f] rounded-full flex items-center justify-center ring-2 ring-white">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl font-bold text-[#2e2b26]">{guide.name}</h1>
                  {guide.verified && (
                    <span className="bg-[#2a4d0f] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">✓ Verified Guide</span>
                  )}
                </div>
                <p className="text-[#8a8278] text-sm">📍 {guide.location} · {guide.experience} years experience</p>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <button
                onClick={() => setFollowing(!following)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${following ? "bg-[#f6f3ee] text-[#2e2b26] border border-[#ddd8cc]" : "bg-[#2a4d0f] text-[#f6f3ee]"}`}
              >
                {following ? "Following" : "Follow"}
              </button>
              <Link
                to="/expeditions"
                className="border border-[#2a4d0f] text-[#2a4d0f] px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#2a4d0f]/5 transition-colors"
              >
                View Expeditions
              </Link>
            </div>
          </div>

          <p className="text-[#5a5549] text-sm leading-relaxed max-w-2xl mb-5">{guide.bio}</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-center mb-5">
            {[
              { n: guide.adventures, label: "Adventures" },
              { n: guide.peaksGuided, label: "Peaks Guided" },
              { n: guide.tripReports, label: "Trip Reports" },
              { n: `${guide.rating}★`, label: `(${guide.reviewCount} reviews)` },
            ].map(({ n, label }) => (
              <div key={label}>
                <p className="font-display text-2xl font-bold text-[#2e2b26]">{n}</p>
                <p className="text-[#8a8278] text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-8 grid lg:grid-cols-[1fr_280px] gap-10">
        <div className="space-y-8">
          {/* Regions */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Regions</h2>
            <div className="flex flex-wrap gap-2">
              {guide.regions.map((r) => (
                <span key={r} className="bg-[#2a4d0f]/10 text-[#2a4d0f] text-xs font-medium px-3 py-1.5 rounded-full border border-[#2a4d0f]/20">
                  📍 {r}
                </span>
              ))}
            </div>
          </section>

          {/* Specializations */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Specializations</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {guide.specializations.map((s) => (
                <div key={s} className="flex items-center gap-3 bg-white border border-[#ede9e0] rounded-xl px-4 py-3">
                  <span className="text-[#2a4d0f] font-bold">✓</span>
                  <span className="text-[#2e2b26] text-sm">{s}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Certifications</h2>
            <div className="space-y-2">
              {guide.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-3 bg-white border border-[#ede9e0] rounded-xl px-4 py-3">
                  <span className="text-amber-600 text-lg">🏅</span>
                  <span className="text-[#2e2b26] text-sm font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Expeditions */}
          {myExpeditions.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl font-bold text-[#2e2b26]">Upcoming Expeditions</h2>
                <Link to="/expeditions" className="text-[#2a4d0f] text-sm font-semibold hover:text-[#3a6b18]">View all →</Link>
              </div>
              <div className="space-y-4">
                {myExpeditions.map((exp) => (
                  <Link
                    key={exp.id}
                    to={`/expeditions/${exp.id}`}
                    className="flex gap-4 bg-white border border-[#ede9e0] rounded-xl overflow-hidden hover:border-[#2a4d0f]/40 transition-all group"
                  >
                    <img src={exp.image} alt={exp.title} className="w-24 h-20 object-cover flex-shrink-0" />
                    <div className="py-3 pr-4 flex-1">
                      <p className="font-display font-bold text-[#2e2b26] text-sm group-hover:text-[#2a4d0f] transition-colors leading-tight mb-1">{exp.title}</p>
                      <p className="text-[#8a8278] text-xs">📅 {exp.dates} · {exp.duration}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          exp.difficulty === "Easy" ? "bg-emerald-100 text-emerald-800" :
                          exp.difficulty === "Moderate" ? "bg-amber-100 text-amber-800" :
                          "bg-orange-100 text-orange-800"
                        }`}>{exp.difficulty}</span>
                        <span className="text-[#8a8278] text-xs">{exp.currentParticipants}/{exp.maxParticipants} spots</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Reviews placeholder */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Reviews</h2>
            <div className="bg-[#f6f3ee] border border-[#ede9e0] rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">⭐</div>
              <p className="font-display text-2xl font-bold text-[#2e2b26] mb-1">{guide.rating} / 5</p>
              <p className="text-[#8a8278] text-sm">Based on {guide.reviewCount} reviews</p>
              <p className="text-[#8a8278] text-xs mt-3">Detailed reviews coming soon</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Languages */}
          <div className="bg-white border border-[#ede9e0] rounded-xl p-5">
            <h3 className="font-semibold text-[#2e2b26] text-sm mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {guide.languages.map((l) => (
                <span key={l} className="bg-[#f6f3ee] text-[#5a5549] text-xs px-2.5 py-1 rounded-full border border-[#ede9e0]">
                  🗣 {l}
                </span>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-[#2a4d0f] rounded-xl p-5 text-center">
            <p className="text-[#f6f3ee] font-semibold text-sm mb-1">Ready to Explore?</p>
            <p className="text-[#ddd8cc] text-xs mb-4">Book {guide.name.split(" ")[0]} for your next expedition.</p>
            <Link to="/expeditions" className="block bg-[#f6f3ee] text-[#2a4d0f] font-semibold text-xs py-2.5 rounded-lg hover:bg-[#ede9e0] transition-colors">
              Browse Expeditions
            </Link>
          </div>

          {/* Quick stats */}
          <div className="bg-white border border-[#ede9e0] rounded-xl p-5 space-y-3">
            {[
              { label: "Experience", value: `${guide.experience} years` },
              { label: "Adventures", value: guide.adventures.toString() },
              { label: "Peaks Guided", value: guide.peaksGuided.toString() },
              { label: "Trip Reports", value: guide.tripReports.toString() },
              { label: "Rating", value: `${guide.rating} ⭐` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center">
                <p className="text-[#8a8278] text-xs">{label}</p>
                <p className="text-[#2e2b26] text-xs font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
