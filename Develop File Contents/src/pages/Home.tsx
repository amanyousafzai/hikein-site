import { Link } from "react-router";
import { destinations, explorers } from "../data/mock";

export default function Home() {
  const featured = destinations.slice(0, 4);
  const featuredExplorers = explorers.slice(0, 4);

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop&auto=format"
          alt="Mountain landscape Pakistan"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3009]/90 via-[#1a3009]/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#f6f3ee]/10 backdrop-blur border border-[#f6f3ee]/20 rounded-full px-3 py-1 mb-6">
              <span className="text-[#f6f3ee] text-xs font-medium tracking-wide">Pakistan's Explorer Community</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-[#f6f3ee] leading-[1.05] mb-6">
              Your Adventures.<br />
              <span className="italic font-light">Your History.</span>
            </h1>
            <p className="text-[#ddd8cc] text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Track every lake, peak, trail, and adventure you complete. Build your permanent explorer profile and become part of Pakistan's outdoor history.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/login"
                className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-7 py-3.5 rounded hover:bg-[#3a6b18] transition-colors text-center"
              >
                Create Your Explorer Profile
              </Link>
              <Link
                to="/explore"
                className="bg-[#f6f3ee]/10 backdrop-blur border border-[#f6f3ee]/30 text-[#f6f3ee] font-medium px-7 py-3.5 rounded hover:bg-[#f6f3ee]/20 transition-colors text-center"
              >
                Explore Destinations
              </Link>
            </div>
          </div>

          {/* Preview cards */}
          <div className="hidden lg:flex gap-3 mt-12">
            {featured.slice(0, 3).map((d) => (
              <Link
                key={d.id}
                to={`/destinations/${d.id}`}
                className="bg-[#f6f3ee]/10 backdrop-blur border border-[#f6f3ee]/20 rounded-lg p-3 flex items-center gap-3 hover:bg-[#f6f3ee]/20 transition-colors"
              >
                <img src={d.image} alt={d.name} className="w-12 h-12 rounded object-cover" />
                <div>
                  <p className="text-[#f6f3ee] text-sm font-semibold">{d.name}</p>
                  <p className="text-[#ddd8cc] text-xs">{d.location.split(",")[0]} · {d.elevation}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#2e2b26] py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 divide-x divide-[#5a5549]/40">
          {[
            { n: `${destinations.length}+`, label: "Destinations" },
            { n: "500+", label: "Adventures Recorded" },
            { n: "200+", label: "Active Explorers" },
          ].map(({ n, label }) => (
            <div key={label} className="text-center px-4">
              <div className="font-display text-3xl font-bold text-[#f6f3ee]">{n}</div>
              <div className="text-[#8a8278] text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#2a4d0f] text-xs font-semibold uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2e2b26]">Three Steps to Your Explorer Legacy</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              n: "01",
              icon: "🗺",
              title: "Explore",
              desc: "Discover lakes, peaks, hikes, and outdoor destinations across Pakistan's mountain regions.",
            },
            {
              n: "02",
              icon: "⛰",
              title: "Complete",
              desc: "Go out there. Reach the summit, touch the water, walk the trail. Then record your achievement.",
            },
            {
              n: "03",
              icon: "📖",
              title: "Build Your History",
              desc: "Create a permanent explorer profile. Your timeline of completed adventures — visible forever.",
            },
          ].map(({ n, icon, title, desc }) => (
            <div key={n} className="relative">
              <div className="absolute -top-2 -left-2 font-display text-7xl font-bold text-[#ddd8cc] leading-none select-none">{n}</div>
              <div className="relative bg-white border border-[#ede9e0] rounded-xl p-8 pt-10">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-display text-xl font-bold text-[#2e2b26] mb-2">{title}</h3>
                <p className="text-[#5a5549] text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured destinations */}
      <section className="py-16 bg-[#ede9e0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#2a4d0f] text-xs font-semibold uppercase tracking-widest mb-2">Destinations</p>
              <h2 className="font-display text-4xl font-bold text-[#2e2b26]">Iconic Places to Explore</h2>
            </div>
            <Link to="/explore" className="hidden md:block text-sm font-semibold text-[#2a4d0f] hover:text-[#3a6b18] transition-colors">
              View all →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((dest) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-[#ddd8cc] hover:border-[#2a4d0f]/40 hover:shadow-lg transition-all duration-200"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-[#ddd8cc]">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#2e2b26]/70 backdrop-blur text-[#f6f3ee] text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded">
                      {dest.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-[#2e2b26] text-lg leading-tight">{dest.name}</h3>
                  <p className="text-[#8a8278] text-xs mt-1 mb-3">{dest.location}</p>
                  <div className="flex items-center justify-between text-xs text-[#5a5549]">
                    <span>⛰ {dest.elevation}</span>
                    <span>👤 {dest.explorers} explorers</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/explore" className="text-sm font-semibold text-[#2a4d0f]">Explore all destinations →</Link>
          </div>
        </div>
      </section>

      {/* Featured explorers */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#2a4d0f] text-xs font-semibold uppercase tracking-widest mb-2">Community</p>
            <h2 className="font-display text-4xl font-bold text-[#2e2b26]">Meet the Explorers</h2>
          </div>
          <Link to="/explorers" className="hidden md:block text-sm font-semibold text-[#2a4d0f] hover:text-[#3a6b18]">
            View all →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredExplorers.map((exp) => (
            <Link
              key={exp.id}
              to={`/explorer/${exp.username}`}
              className="bg-white border border-[#ede9e0] rounded-xl p-5 hover:border-[#2a4d0f]/30 hover:shadow-md transition-all duration-200 text-center"
            >
              <img
                src={exp.avatar}
                alt={exp.name}
                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover ring-2 ring-[#ede9e0]"
              />
              <h3 className="font-display font-bold text-[#2e2b26] text-base">{exp.name}</h3>
              <p className="text-[#8a8278] text-xs mb-3">{exp.title} · {exp.location.split(",")[0]}</p>
              <div className="flex justify-center gap-4 text-xs text-[#5a5549] border-t border-[#ede9e0] pt-3">
                <span>🏞 {exp.lakes}</span>
                <span>⛰ {exp.peaks}</span>
                <span>🥾 {exp.adventures}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#2e2b26] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#3a6b18] text-xs font-semibold uppercase tracking-widest mb-6">Our Mission</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#f6f3ee] leading-tight mb-6">
            Pakistan Has Incredible Adventures.<br />
            <em className="italic font-light">Their Stories Should Not Be Lost.</em>
          </h2>
          <p className="text-[#8a8278] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            HikeIN is building a permanent digital history of explorers, destinations, and outdoor adventures across Pakistan — so every lake reached, every peak summited, and every trail walked is remembered.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-7 py-3.5 rounded hover:bg-[#3a6b18] transition-colors"
            >
              Start Building Your Hiking History
            </Link>
            <Link
              to="/explore"
              className="border border-[#5a5549] text-[#f6f3ee] font-medium px-7 py-3.5 rounded hover:border-[#8a8278] transition-colors"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
