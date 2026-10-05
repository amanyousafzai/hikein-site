import { Link } from "react-router";

const verificationTypes = [
  {
    id: "explorer",
    icon: "✓",
    iconBg: "bg-[#2a4d0f]",
    title: "Verified Explorer",
    subtitle: "Identity & Credentials Reviewed",
    description: "Prove you are who you say you are. A verified explorer badge signals to the community that your profile, adventure history, and identity have been reviewed.",
    requirements: ["Valid government-issued ID", "Consistent adventure history", "Linked social profile or reference"],
    evidence: ["ID document (CNIC/Passport)", "Adventure photos with metadata", "2 explorer references"],
    result: "Blue verified badge on your profile, priority in search results, trusted community member status.",
    time: "3–5 business days",
  },
  {
    id: "achievement",
    icon: "🏆",
    iconBg: "bg-amber-700",
    title: "Verified Achievement",
    subtitle: "Evidence-Backed Milestone",
    description: "Claim a major milestone — 100 Lakes, 50 Peaks, every lake in Swat — and get it officially verified with a shareable certificate.",
    requirements: ["Completed the milestone claim", "Adventure logs for each item", "Photographic evidence"],
    evidence: ["Adventure history from profile", "GPS tracks or photos from each", "Trip reports (if applicable)"],
    result: "Achievement badge on profile, shareable certificate page, permanent record in Pakistan outdoor history.",
    time: "5–10 business days",
  },
  {
    id: "club",
    icon: "✓",
    iconBg: "bg-[#2e2b26]",
    title: "Verified Hiking Club",
    subtitle: "Recognized Community",
    description: "Verify your hiking club as a legitimate, active outdoor community. Show members and the public that your club is genuine and well-organized.",
    requirements: ["Active club with 5+ members", "Regular events or adventures", "Club social presence"],
    evidence: ["Club founding documents", "Member list with profiles", "Event history or photos"],
    result: "Verified badge on club page, priority listing in club directory, increased trust for event recruitment.",
    time: "5–7 business days",
  },
  {
    id: "guide",
    icon: "★",
    iconBg: "bg-[#3a6b18]",
    title: "Verified Outdoor Guide",
    subtitle: "Professional Guide Status",
    description: "Apply as a professional outdoor guide. Show clients your certifications, experience, and verified identity — the only credential that matters in the mountains.",
    requirements: ["Professional guiding experience", "Relevant certifications", "Clean safety record"],
    evidence: ["Guiding certifications (UIAGM, PTA, etc.)", "Client references (2+)", "First aid/rescue cert", "Adventure history"],
    result: "Guide profile page, listed in Guides directory, can organize verified expeditions, premium badge.",
    time: "7–14 business days",
  },
];

export default function Verification() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <div className="bg-[#2e2b26] relative overflow-hidden pt-14 pb-20">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&h=500&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#2a4d0f]/60 border border-[#3a6b18]/50 rounded-full px-4 py-1.5 mb-8">
            <span className="text-[#ddd8cc] text-xs font-medium tracking-wide uppercase">Verification & Trust</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#f6f3ee] mb-5 leading-tight">
            Build Trust.<br />
            <em className="italic font-light">Verify Your Outdoor Journey.</em>
          </h1>
          <p className="text-[#8a8278] text-lg max-w-2xl mx-auto leading-relaxed">
            HikeIN verification gives your profile, achievements, club, and guide status the credibility they deserve — reviewed by our team, permanent on your record.
          </p>
        </div>
      </div>

      {/* Process overview */}
      <div className="bg-[#f6f3ee] border-b border-[#ede9e0] py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-0">
            {["Select Type", "Submit Info", "Upload Evidence", "Admin Review", "Approved"].map((step, i, arr) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-[#2a4d0f]/10 border-2 border-[#2a4d0f]/30 flex items-center justify-center text-xs font-bold text-[#2a4d0f]">
                    {i + 1}
                  </div>
                  <span className="text-[#5a5549] text-[10px] font-medium hidden sm:block whitespace-nowrap">{step}</span>
                </div>
                {i < arr.length - 1 && <div className="w-8 sm:w-12 h-0.5 bg-[#ddd8cc] mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="text-center mb-12">
          <p className="text-[#2a4d0f] text-xs font-semibold uppercase tracking-widest mb-2">Choose What to Verify</p>
          <h2 className="font-display text-4xl font-bold text-[#2e2b26]">What would you like to verify?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {verificationTypes.map((vt) => (
            <div key={vt.id} className="bg-white border border-[#ede9e0] rounded-2xl overflow-hidden hover:border-[#2a4d0f]/40 hover:shadow-lg transition-all duration-200 group">
              <div className="p-7">
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-12 h-12 ${vt.iconBg} rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0`}>
                    {vt.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#2e2b26]">{vt.title}</h3>
                    <p className="text-[#8a8278] text-xs mt-0.5">{vt.subtitle}</p>
                  </div>
                </div>
                <p className="text-[#5a5549] text-sm leading-relaxed mb-6">{vt.description}</p>

                <div className="space-y-4">
                  <div>
                    <p className="text-[#2e2b26] text-xs font-semibold uppercase tracking-wide mb-2">Requirements</p>
                    <ul className="space-y-1">
                      {vt.requirements.map((r) => (
                        <li key={r} className="flex items-center gap-2 text-[#5a5549] text-xs">
                          <span className="text-[#2a4d0f] font-bold">✓</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[#2e2b26] text-xs font-semibold uppercase tracking-wide mb-2">Evidence Needed</p>
                    <ul className="space-y-1">
                      {vt.evidence.map((e) => (
                        <li key={e} className="flex items-center gap-2 text-[#5a5549] text-xs">
                          <span className="text-[#8a8278]">•</span>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#f6f3ee] rounded-xl p-3">
                    <p className="text-[#2e2b26] text-xs font-semibold mb-1">Result</p>
                    <p className="text-[#5a5549] text-xs">{vt.result}</p>
                    <p className="text-[#8a8278] text-[10px] mt-2">⏱ Review time: {vt.time}</p>
                  </div>
                </div>

                <Link
                  to={`/verification/apply?type=${vt.id}`}
                  className="mt-6 block text-center bg-[#2a4d0f] text-[#f6f3ee] text-sm font-semibold py-3 rounded-xl hover:bg-[#3a6b18] transition-colors"
                >
                  Apply for {vt.title} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-[#2e2b26] py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-[#f6f3ee] mb-3">Why Verify with HikeIN?</h2>
          <p className="text-[#8a8278] text-sm max-w-xl mx-auto mb-10">Trust is the foundation of outdoor communities. Verification signals authenticity to every explorer, club, and guide you interact with.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "🛡", title: "Human Reviewed", desc: "Every application is reviewed by our team — no automated decisions." },
              { icon: "📜", title: "Permanent Record", desc: "Verified badges stay on your profile and appear in your adventure history." },
              { icon: "🤝", title: "Community Trust", desc: "Verified profiles receive more follows, trust, and expedition invites." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-[#2a4d0f]/20 border border-[#3a6b18]/30 rounded-xl p-5">
                <div className="text-2xl mb-2">{icon}</div>
                <h3 className="text-[#f6f3ee] font-semibold text-sm mb-1">{title}</h3>
                <p className="text-[#8a8278] text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
