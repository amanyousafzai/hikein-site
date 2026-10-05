import { useParams, Link } from "react-router";
import { useState } from "react";
import { tripReports } from "../data/tripreports";
import { destinations } from "../data/mock";
import CommentSection from "../components/CommentSection";

export default function TripReportDetail() {
  const { id } = useParams();
  const report = tripReports.find((r) => r.id === id) ?? tripReports[0];
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(report.likes);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  const relatedDest = destinations.find((d) => d.id === report.destinationId);

  const diffColor: Record<string, string> = {
    Easy: "bg-emerald-100 text-emerald-800",
    Moderate: "bg-amber-100 text-amber-800",
    Hard: "bg-orange-100 text-orange-800",
    Technical: "bg-red-100 text-red-800",
  };

  const sections = [
    { id: "overview", label: "Overview", content: report.overview },
    { id: "reach", label: "How to Reach", content: report.howToReach },
    { id: "start", label: "Starting Point", content: report.startingPoint },
    { id: "route", label: "Hiking Route", content: report.hikingRoute },
    { id: "difficulty", label: "Difficulty", content: report.difficultyDesc },
    { id: "camping", label: "Camping", content: report.camping },
    { id: "water", label: "Water Availability", content: report.water },
  ];

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden bg-[#ddd8cc]">
        <img src={report.heroImage} alt={report.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3009]/85 via-[#1a3009]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <span className={`inline-block text-xs font-bold uppercase px-3 py-1 rounded-full mb-4 ${diffColor[report.difficulty]}`}>
              {report.difficulty}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#f6f3ee] mb-3 max-w-3xl">{report.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-[#ddd8cc] text-sm">
              <div className="flex items-center gap-2">
                <img src={report.author.avatar} alt={report.author.name} className="w-7 h-7 rounded-full object-cover" />
                <Link to={`/explorer/${report.author.username}`} className="font-medium hover:text-[#f6f3ee]">{report.author.name}</Link>
              </div>
              <span>📍 {report.location}</span>
              <span>📅 {report.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats bar */}
      <div className="bg-[#2e2b26] py-4">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap gap-6 justify-center md:justify-start">
          {[
            { icon: "📏", label: "Distance", value: report.distance },
            { icon: "⏱", label: "Duration", value: report.duration },
            { icon: "🥾", label: "Difficulty", value: report.difficulty },
            { icon: "📍", label: "Destination", value: report.destinationName },
          ].map(({ icon, label, value }) => (
            <div key={label} className="text-center md:text-left">
              <p className="text-[#8a8278] text-[10px] uppercase tracking-wide">{label}</p>
              <p className="text-[#f6f3ee] text-sm font-semibold">{icon} {value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-[#8a8278]">
          <Link to="/trip-reports" className="hover:text-[#2e2b26]">Trip Reports</Link>
          <span>/</span>
          <Link to={`/destinations/${report.destinationId}`} className="hover:text-[#2e2b26]">{report.destinationName}</Link>
          <span>/</span>
          <span className="text-[#2e2b26] truncate max-w-[200px]">{report.title}</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-12 grid lg:grid-cols-[1fr_280px] gap-10">
        {/* Main content */}
        <div className="space-y-10">
          {/* Sections */}
          {sections.map(({ id, label, content }) => (
            <section key={id}>
              <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-3 pb-2 border-b border-[#ede9e0]">{label}</h2>
              <p className="text-[#5a5549] leading-relaxed text-sm">{content}</p>
            </section>
          ))}

          {/* What to carry */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-3 pb-2 border-b border-[#ede9e0]">What to Carry</h2>
            <ul className="space-y-2">
              {report.whatToCarry.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#5a5549]">
                  <span className="text-[#2a4d0f] font-bold mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Tips */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-3 pb-2 border-b border-[#ede9e0]">Important Tips</h2>
            <ul className="space-y-3">
              {report.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 bg-[#f6f3ee] border border-[#ede9e0] rounded-lg px-4 py-3 text-sm text-[#5a5549]">
                  <span className="text-[#2a4d0f] font-bold text-base leading-snug flex-shrink-0">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          {/* Warnings */}
          {report.warnings.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-3 pb-2 border-b border-[#ede9e0]">Safety Warnings</h2>
              <ul className="space-y-3">
                {report.warnings.map((w, i) => (
                  <li key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-800">
                    <span className="flex-shrink-0">⚠️</span>
                    {w}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Gallery */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4 pb-2 border-b border-[#ede9e0]">Photo Gallery</h2>
            <div className="grid grid-cols-3 gap-2">
              {report.gallery.map((img, i) => (
                <button key={i} onClick={() => setGalleryIndex(i)} className="overflow-hidden rounded-lg aspect-square bg-[#ddd8cc] group">
                  <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </button>
              ))}
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center gap-4 py-4 border-t border-[#ede9e0]">
            <button
              onClick={() => { setLiked(!liked); setLikeCount((c) => liked ? c - 1 : c + 1); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${liked ? "text-red-500 bg-red-50" : "text-[#5a5549] bg-[#f6f3ee] hover:bg-[#ede9e0]"}`}
            >
              {liked ? "❤️" : "🤍"} {likeCount} Helpful
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#5a5549] bg-[#f6f3ee] hover:bg-[#ede9e0] transition-colors">
              ↗ Share
            </button>
          </div>

          {/* Comments */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-5">Comments</h2>
            <CommentSection comments={[]} contentId={report.id} />
          </section>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block space-y-4">
          {/* Author */}
          <div className="bg-white border border-[#ede9e0] rounded-xl p-4">
            <h3 className="font-display font-bold text-[#2e2b26] text-sm mb-3">Written by</h3>
            <div className="flex items-center gap-3 mb-3">
              <img src={report.author.avatar} alt={report.author.name} className="w-11 h-11 rounded-full object-cover" />
              <div>
                <Link to={`/explorer/${report.author.username}`} className="font-semibold text-[#2e2b26] text-sm hover:text-[#2a4d0f] transition-colors">{report.author.name}</Link>
                <p className="text-[#8a8278] text-xs">{report.date}</p>
              </div>
            </div>
            <Link to={`/explorer/${report.author.username}`} className="block w-full text-center text-xs font-semibold text-[#2a4d0f] border border-[#2a4d0f]/30 py-2 rounded-lg hover:bg-[#2a4d0f]/5 transition-colors">
              View Profile →
            </Link>
          </div>

          {/* Stats */}
          <div className="bg-white border border-[#ede9e0] rounded-xl p-4">
            <h3 className="font-display font-bold text-[#2e2b26] text-sm mb-3">Report Stats</h3>
            {[
              { label: "Views", value: report.views },
              { label: "Likes", value: likeCount },
              { label: "Comments", value: report.comments },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2 border-b border-[#f6f3ee] last:border-0 text-sm">
                <span className="text-[#8a8278]">{label}</span>
                <span className="font-semibold text-[#2e2b26]">{value.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Destination */}
          {relatedDest && (
            <div className="bg-white border border-[#ede9e0] rounded-xl overflow-hidden">
              <img src={relatedDest.image} alt={relatedDest.name} className="w-full h-28 object-cover" />
              <div className="p-4">
                <p className="text-[#2a4d0f] text-xs font-semibold uppercase tracking-wide mb-1">{relatedDest.type}</p>
                <p className="font-display font-bold text-[#2e2b26] text-base">{relatedDest.name}</p>
                <p className="text-[#8a8278] text-xs mb-3">{relatedDest.elevation} · {relatedDest.explorers} explorers</p>
                <Link to={`/destinations/${relatedDest.id}`} className="text-xs font-semibold text-[#2a4d0f] hover:underline">
                  View Destination →
                </Link>
              </div>
            </div>
          )}

          {/* Write your own */}
          <div className="bg-[#2a4d0f] rounded-xl p-4 text-center">
            <p className="text-[#f6f3ee] font-semibold text-sm mb-1">Have you been here?</p>
            <p className="text-[#ddd8cc] text-xs mb-3">Share your experience with the community.</p>
            <Link to="/create-trip-report" className="block bg-[#f6f3ee] text-[#2a4d0f] font-semibold text-xs py-2 rounded-lg hover:bg-[#ede9e0] transition-colors">
              Write a Trip Report
            </Link>
          </div>
        </aside>
      </div>

      {/* Lightbox */}
      {galleryIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setGalleryIndex(null)}>
          <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setGalleryIndex(null)}>✕</button>
          <img src={report.gallery[galleryIndex]} alt="" className="max-w-full max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryIndex > 0 && (
              <button onClick={(e) => { e.stopPropagation(); setGalleryIndex(galleryIndex - 1); }} className="bg-white/20 text-white px-4 py-2 rounded text-sm">← Prev</button>
            )}
            {galleryIndex < report.gallery.length - 1 && (
              <button onClick={(e) => { e.stopPropagation(); setGalleryIndex(galleryIndex + 1); }} className="bg-white/20 text-white px-4 py-2 rounded text-sm">Next →</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
