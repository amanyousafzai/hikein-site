import { useState } from "react";
import { useSearchParams, Link } from "react-router";

const steps = ["Select Type", "Your Info", "Evidence", "Review", "Submit"];

const typeLabels: Record<string, string> = {
  explorer: "Verified Explorer",
  achievement: "Verified Achievement",
  club: "Verified Hiking Club",
  guide: "Verified Outdoor Guide",
};

const achievementOptions = [
  "100 Lakes of Pakistan",
  "50 Peaks of Pakistan",
  "Swat Lakes Circuit (All 7)",
  "K2 Base Camp",
  "Nanga Parbat BC",
  "Fairy Meadows Explorer",
  "Concordia Trek Completion",
  "Custom Milestone",
];

export default function VerificationApply() {
  const [params] = useSearchParams();
  const initialType = params.get("type") ?? "explorer";

  const [step, setStep] = useState(initialType ? 1 : 0);
  const [type, setType] = useState(initialType);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [info, setInfo] = useState({
    name: "",
    username: "",
    bio: "",
    achievement: achievementOptions[0],
    achievementCount: "",
    clubName: "",
    guideYears: "",
    guideCerts: "",
    motivation: "",
  });

  const types = [
    { id: "explorer", icon: "✓", label: "Verified Explorer", desc: "Identity & adventure history verified" },
    { id: "achievement", icon: "🏆", label: "Verified Achievement", desc: "Evidence-backed milestone" },
    { id: "club", icon: "✓", label: "Verified Club", desc: "Recognized hiking community" },
    { id: "guide", icon: "★", label: "Verified Guide", desc: "Professional guide status" },
  ];

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f6f3ee] flex items-center justify-center px-6 pb-20">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-[#2a4d0f] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#f6f3ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-4xl font-bold text-[#2e2b26] mb-3">Application Submitted</h1>
          <p className="text-[#5a5549] text-sm leading-relaxed mb-4">
            Your {typeLabels[type]} application has been received. Our team will review it and get back to you within{" "}
            {type === "guide" ? "7–14" : type === "achievement" ? "5–10" : "3–7"} business days.
          </p>
          <div className="bg-white border border-[#ede9e0] rounded-xl p-5 text-left mb-8">
            <p className="text-[#8a8278] text-xs font-semibold uppercase tracking-wide mb-3">Application Timeline</p>
            {[
              { status: "✓", label: "Submitted", time: "Just now", done: true },
              { status: "○", label: "Under Review", time: "3–5 business days", done: false },
              { status: "○", label: "Decision", time: "After review", done: false },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 py-2">
                <span className={`font-bold text-sm ${s.done ? "text-[#2a4d0f]" : "text-[#ddd8cc]"}`}>{s.status}</span>
                <div>
                  <p className={`text-sm font-medium ${s.done ? "text-[#2e2b26]" : "text-[#8a8278]"}`}>{s.label}</p>
                  <p className="text-[#8a8278] text-xs">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/dashboard" className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-8 py-3 rounded-xl hover:bg-[#3a6b18] transition-colors inline-block mr-3">
            Go to Dashboard
          </Link>
          <Link to="/verification" className="border border-[#ddd8cc] text-[#5a5549] font-medium px-8 py-3 rounded-xl hover:border-[#2a4d0f]/40 transition-colors inline-block">
            Back to Verification
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f3ee] pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-[#2e2b26] py-10">
        <div className="max-w-3xl mx-auto px-6">
          <Link to="/verification" className="text-[#8a8278] text-xs hover:text-[#ddd8cc] transition-colors inline-flex items-center gap-1 mb-5">
            ← Back to Verification
          </Link>
          <h1 className="font-display text-3xl font-bold text-[#f6f3ee] mb-1">Apply for Verification</h1>
          <p className="text-[#8a8278] text-sm">
            {type ? `Applying for: ${typeLabels[type]}` : "Choose the type of verification to apply for"}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-[#ede9e0] py-4">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-0">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    i < step ? "bg-[#2a4d0f] text-white" : i === step ? "bg-[#2a4d0f] text-white ring-4 ring-[#2a4d0f]/20" : "bg-[#ddd8cc] text-[#8a8278]"
                  }`}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className={`text-[9px] font-medium hidden sm:block ${i <= step ? "text-[#2a4d0f]" : "text-[#8a8278]"}`}>{s}</span>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${i < step ? "bg-[#2a4d0f]" : "bg-[#ddd8cc]"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Step 0: Select Type */}
        {step === 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-6">What would you like to verify?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {types.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`text-left p-5 rounded-xl border-2 transition-all ${
                    type === t.id ? "border-[#2a4d0f] bg-[#2a4d0f]/5" : "border-[#ddd8cc] bg-white hover:border-[#2a4d0f]/40"
                  }`}
                >
                  <div className="text-2xl mb-2">{t.icon}</div>
                  <p className="font-semibold text-[#2e2b26] text-sm">{t.label}</p>
                  <p className="text-[#8a8278] text-xs mt-1">{t.desc}</p>
                </button>
              ))}
            </div>
            <button
              disabled={!type}
              onClick={() => setStep(1)}
              className="mt-8 bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-8 py-3 rounded-xl hover:bg-[#3a6b18] transition-colors disabled:opacity-40"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 1: Info */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-1">Your Information</h2>
            <p className="text-[#8a8278] text-sm mb-7">Tell us about yourself and what you want to verify.</p>
            <div className="space-y-5">
              {(type === "explorer" || type === "guide") && (
                <>
                  <div>
                    <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Full Name</label>
                    <input
                      value={info.name}
                      onChange={(e) => setInfo({ ...info, name: e.target.value })}
                      className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">HikeIN Username</label>
                    <input
                      value={info.username}
                      onChange={(e) => setInfo({ ...info, username: e.target.value })}
                      className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                      placeholder="@username"
                    />
                  </div>
                </>
              )}
              {type === "achievement" && (
                <>
                  <div>
                    <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Achievement to Verify</label>
                    <select
                      value={info.achievement}
                      onChange={(e) => setInfo({ ...info, achievement: e.target.value })}
                      className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                    >
                      {achievementOptions.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Count Completed</label>
                    <input
                      type="number"
                      value={info.achievementCount}
                      onChange={(e) => setInfo({ ...info, achievementCount: e.target.value })}
                      className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                      placeholder="e.g. 100"
                    />
                  </div>
                </>
              )}
              {type === "club" && (
                <div>
                  <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Club Name</label>
                  <input
                    value={info.clubName}
                    onChange={(e) => setInfo({ ...info, clubName: e.target.value })}
                    className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                    placeholder="Official club name"
                  />
                </div>
              )}
              {type === "guide" && (
                <>
                  <div>
                    <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Years of Guiding Experience</label>
                    <input
                      type="number"
                      value={info.guideYears}
                      onChange={(e) => setInfo({ ...info, guideYears: e.target.value })}
                      className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                      placeholder="e.g. 5"
                    />
                  </div>
                  <div>
                    <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Certifications Held</label>
                    <input
                      value={info.guideCerts}
                      onChange={(e) => setInfo({ ...info, guideCerts: e.target.value })}
                      className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                      placeholder="e.g. PTA Licensed Guide, Wilderness First Aid"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Why do you want to verify?</label>
                <textarea
                  value={info.motivation}
                  onChange={(e) => setInfo({ ...info, motivation: e.target.value })}
                  rows={4}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30 resize-none"
                  placeholder="Tell us about your outdoor journey and why verification matters to you..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(0)} className="border border-[#ddd8cc] text-[#5a5549] font-medium px-6 py-3 rounded-xl hover:border-[#2a4d0f]/40 transition-colors">
                ← Back
              </button>
              <button onClick={() => setStep(2)} className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-8 py-3 rounded-xl hover:bg-[#3a6b18] transition-colors">
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Evidence */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-1">Upload Evidence</h2>
            <p className="text-[#8a8278] text-sm mb-7">Strong evidence leads to faster approval. Attach everything relevant.</p>
            <div className="space-y-5">
              {[
                type === "explorer" && { label: "Government ID (CNIC/Passport)", accept: ".jpg,.png,.pdf", note: "Face clearly visible. Documents are encrypted and stored securely." },
                type === "achievement" && { label: "Adventure Photos", accept: ".jpg,.png", note: "Photos from each adventure (geo-tagged preferred)." },
                type === "achievement" && { label: "GPS Tracks / Screenshots", accept: ".gpx,.jpg,.png", note: "GPS data from your adventures strengthens your claim." },
                type === "club" && { label: "Club Registration / Founding Document", accept: ".pdf,.jpg,.png", note: "Memorandum, registration certificate, or founding photos." },
                type === "guide" && { label: "Guiding Certifications", accept: ".pdf,.jpg,.png", note: "Upload each certificate as a separate file." },
                type === "guide" && { label: "First Aid / Safety Certificate", accept: ".pdf,.jpg,.png", note: "WFR, WFA, or equivalent." },
                { label: "Supporting Photos", accept: ".jpg,.png", note: "Any additional photos supporting your application." },
              ]
                .filter(Boolean)
                .map((field: any) => (
                  <div key={field.label}>
                    <label className="block text-[#2e2b26] text-xs font-semibold mb-1 uppercase tracking-wide">{field.label}</label>
                    <p className="text-[#8a8278] text-xs mb-2">{field.note}</p>
                    <div className="border-2 border-dashed border-[#ddd8cc] rounded-xl p-8 text-center bg-white hover:border-[#2a4d0f]/40 transition-colors cursor-pointer">
                      <div className="text-2xl mb-2">📎</div>
                      <p className="text-[#5a5549] text-sm font-medium">Click to upload or drag & drop</p>
                      <p className="text-[#8a8278] text-xs mt-1">{field.accept.replace(/\./g, "").toUpperCase().replace(/,/g, ", ")}</p>
                    </div>
                  </div>
                ))}
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Adventure History (auto-attached)</label>
                <div className="bg-[#2a4d0f]/5 border border-[#2a4d0f]/20 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-[#2a4d0f] text-lg">✓</span>
                  <div>
                    <p className="text-[#2e2b26] text-sm font-medium">Your HikeIN adventure history will be included automatically.</p>
                    <p className="text-[#8a8278] text-xs mt-0.5">All logged adventures, trip reports, and routes will be visible to the reviewer.</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">References (Optional)</label>
                <textarea
                  rows={3}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30 resize-none"
                  placeholder="HikeIN usernames of explorers who can vouch for you (e.g. @rafi-khan, @bilal-hussain)"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(1)} className="border border-[#ddd8cc] text-[#5a5549] font-medium px-6 py-3 rounded-xl hover:border-[#2a4d0f]/40 transition-colors">
                ← Back
              </button>
              <button onClick={() => setStep(3)} className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-8 py-3 rounded-xl hover:bg-[#3a6b18] transition-colors">
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-1">Review Your Application</h2>
            <p className="text-[#8a8278] text-sm mb-7">Check everything before submitting. You can go back to make changes.</p>
            <div className="space-y-4">
              <div className="bg-white border border-[#ede9e0] rounded-xl divide-y divide-[#ede9e0]">
                <div className="px-5 py-4">
                  <p className="text-[#8a8278] text-xs uppercase tracking-wide mb-1">Verification Type</p>
                  <p className="text-[#2e2b26] font-semibold">{typeLabels[type]}</p>
                </div>
                {info.name && (
                  <div className="px-5 py-4">
                    <p className="text-[#8a8278] text-xs uppercase tracking-wide mb-1">Name</p>
                    <p className="text-[#2e2b26] font-semibold">{info.name}</p>
                  </div>
                )}
                {info.achievement && type === "achievement" && (
                  <div className="px-5 py-4">
                    <p className="text-[#8a8278] text-xs uppercase tracking-wide mb-1">Achievement</p>
                    <p className="text-[#2e2b26] font-semibold">{info.achievement} ({info.achievementCount} completed)</p>
                  </div>
                )}
                {info.clubName && (
                  <div className="px-5 py-4">
                    <p className="text-[#8a8278] text-xs uppercase tracking-wide mb-1">Club</p>
                    <p className="text-[#2e2b26] font-semibold">{info.clubName}</p>
                  </div>
                )}
                {info.motivation && (
                  <div className="px-5 py-4">
                    <p className="text-[#8a8278] text-xs uppercase tracking-wide mb-1">Motivation</p>
                    <p className="text-[#5a5549] text-sm">{info.motivation}</p>
                  </div>
                )}
                <div className="px-5 py-4">
                  <p className="text-[#8a8278] text-xs uppercase tracking-wide mb-1">Evidence</p>
                  <p className="text-[#5a5549] text-sm">Adventure history (auto-attached) + uploaded files</p>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-xs font-semibold mb-1">Before you submit</p>
                <ul className="text-amber-700 text-xs space-y-1">
                  <li>• Submitting false or misleading information will result in permanent ban</li>
                  <li>• All submitted documents are stored securely and never shared publicly</li>
                  <li>• Our team may contact you for additional information</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(2)} className="border border-[#ddd8cc] text-[#5a5549] font-medium px-6 py-3 rounded-xl hover:border-[#2a4d0f]/40 transition-colors">
                ← Back
              </button>
              <button onClick={() => setStep(4)} className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-8 py-3 rounded-xl hover:bg-[#3a6b18] transition-colors">
                Looks Good →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Submit */}
        {step === 4 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#2a4d0f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🛡</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-[#2e2b26] mb-3">Ready to Submit?</h2>
            <p className="text-[#5a5549] text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Your {typeLabels[type]} application will be submitted for review. You will receive a notification when the status updates.
            </p>
            <button
              onClick={handleSubmit}
              className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-10 py-4 rounded-xl hover:bg-[#3a6b18] transition-colors text-base"
            >
              Submit Application
            </button>
            <div className="mt-4">
              <button onClick={() => setStep(3)} className="text-[#8a8278] text-sm hover:text-[#5a5549] transition-colors">
                ← Review again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
