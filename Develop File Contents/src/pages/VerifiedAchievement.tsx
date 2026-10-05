import { useParams, Link } from "react-router";

const achievements: Record<string, {
  explorer: { name: string; username: string; avatar: string; location: string };
  achievement: string;
  completionDate: string;
  verificationDate: string;
  count: number;
  adventures: { name: string; date: string; image: string }[];
  tripReports: { title: string; date: string; likes: number }[];
}> = {
  "rafi-100-lakes": {
    explorer: {
      name: "Rafi Khan",
      username: "rafi-khan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format",
      location: "Swat, KPK",
    },
    achievement: "100 Lakes of Pakistan",
    completionDate: "July 14, 2025",
    verificationDate: "July 22, 2025",
    count: 100,
    adventures: [
      { name: "Kundol Lake", date: "May 2025", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&h=150&fit=crop&auto=format" },
      { name: "Mahodand Lake", date: "June 2025", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop&auto=format" },
      { name: "Katora Lake", date: "June 2025", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=150&fit=crop&auto=format" },
      { name: "Saif ul Maluk", date: "July 2025", image: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=200&h=150&fit=crop&auto=format" },
    ],
    tripReports: [
      { title: "Kundol Lake via Northern Ridge — A Summer Guide", date: "July 2025", likes: 142 },
      { title: "Mahodand Lake — The Calm Before Storm", date: "June 2025", likes: 98 },
    ],
  },
};

export default function VerifiedAchievement() {
  const { id } = useParams();
  const data = achievements[id ?? "rafi-100-lakes"] ?? achievements["rafi-100-lakes"];
  const { explorer, achievement, completionDate, verificationDate, count, adventures, tripReports } = data;

  return (
    <div className="min-h-screen bg-[#f6f3ee] pb-20 md:pb-0">
      {/* Certificate */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white border-2 border-[#2a4d0f]/20 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header band */}
          <div className="bg-[#2a4d0f] py-6 px-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, #f6f3ee 0, #f6f3ee 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }} />
            </div>
            <div className="relative">
              <p className="text-[#ddd8cc] text-xs font-semibold uppercase tracking-widest mb-1">HikeIN — Verified Achievement</p>
              <div className="w-12 h-0.5 bg-[#3a6b18] mx-auto my-3" />
              <p className="text-[#ddd8cc] text-xs tracking-wide">Pakistan's Premier Outdoor Explorer Platform</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 md:p-12 text-center">
            {/* Trophy */}
            <div className="w-20 h-20 bg-amber-50 border-2 border-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🏆</span>
            </div>

            {/* This certifies */}
            <p className="text-[#8a8278] text-xs uppercase tracking-widest mb-4">This certifies that</p>

            {/* Explorer */}
            <img src={explorer.avatar} alt={explorer.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover ring-4 ring-[#2a4d0f]/20" />
            <h1 className="font-display text-3xl font-bold text-[#2e2b26] mb-1">{explorer.name}</h1>
            <p className="text-[#8a8278] text-sm mb-6">@{explorer.username} · {explorer.location}</p>

            <p className="text-[#5a5549] text-sm mb-2">has officially completed and verified the achievement</p>

            {/* Achievement name */}
            <div className="my-6 py-6 border-y border-[#ede9e0]">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2a4d0f]">{achievement}</h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <span className="bg-[#2a4d0f]/10 text-[#2a4d0f] text-2xl font-bold px-4 py-1 rounded-lg">{count}</span>
                <span className="text-[#8a8278] text-sm">lakes documented and verified</span>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#f6f3ee] rounded-xl p-4">
                <p className="text-[#8a8278] text-[10px] uppercase tracking-wide mb-1">Completed</p>
                <p className="text-[#2e2b26] font-semibold text-sm">{completionDate}</p>
              </div>
              <div className="bg-[#f6f3ee] rounded-xl p-4">
                <p className="text-[#8a8278] text-[10px] uppercase tracking-wide mb-1">Verified</p>
                <p className="text-[#2e2b26] font-semibold text-sm">{verificationDate}</p>
              </div>
            </div>

            {/* Verification seal */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#2a4d0f] rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
              <div className="text-left">
                <p className="text-[#2e2b26] text-xs font-semibold">Verified by HikeIN Team</p>
                <p className="text-[#8a8278] text-[10px]">Adventure history, photos, and trip reports reviewed</p>
              </div>
            </div>

            {/* Share */}
            <div className="flex gap-3 justify-center">
              <button className="flex-1 max-w-xs bg-[#2a4d0f] text-[#f6f3ee] font-semibold py-3 rounded-xl text-sm hover:bg-[#3a6b18] transition-colors">
                Share Certificate
              </button>
              <button className="border border-[#ddd8cc] text-[#5a5549] font-medium py-3 px-4 rounded-xl text-sm hover:border-[#2a4d0f]/40 transition-colors">
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Adventure evidence */}
        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-5">Adventure Evidence</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {adventures.map((a) => (
              <div key={a.name} className="bg-white border border-[#ede9e0] rounded-xl overflow-hidden">
                <img src={a.image} alt={a.name} className="w-full h-20 object-cover" />
                <div className="p-2">
                  <p className="text-[#2e2b26] text-xs font-semibold leading-tight">{a.name}</p>
                  <p className="text-[#8a8278] text-[10px]">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[#8a8278] text-xs mt-3 text-center">Showing 4 of {count} verified adventures</p>
        </div>

        {/* Trip reports */}
        {tripReports.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-5">Trip Reports</h2>
            <div className="space-y-3">
              {tripReports.map((r) => (
                <Link key={r.title} to="/trip-reports" className="flex items-center justify-between bg-white border border-[#ede9e0] rounded-xl px-5 py-4 hover:border-[#2a4d0f]/40 transition-colors">
                  <div>
                    <p className="text-[#2e2b26] font-semibold text-sm">{r.title}</p>
                    <p className="text-[#8a8278] text-xs mt-0.5">{r.date}</p>
                  </div>
                  <span className="text-[#5a5549] text-xs">❤️ {r.likes}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="mt-10 text-center">
          <Link to={`/explorer/${explorer.username}`} className="text-[#2a4d0f] font-semibold text-sm hover:text-[#3a6b18] transition-colors">
            ← View {explorer.name}'s Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
