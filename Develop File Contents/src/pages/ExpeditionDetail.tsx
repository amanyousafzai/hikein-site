import { useState } from "react";
import { useParams, Link } from "react-router";
import { expeditions } from "../data/guides";

export default function ExpeditionDetail() {
  const { id } = useParams();
  const exp = expeditions.find((e) => e.id === id) ?? expeditions[0];
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [joinForm, setJoinForm] = useState({ name: "", experience: "Beginner", prevExperience: "", notes: "" });

  const spotsLeft = exp.maxParticipants - exp.currentParticipants;

  const diffColor: Record<string, string> = {
    Easy: "bg-emerald-100 text-emerald-800",
    Moderate: "bg-amber-100 text-amber-800",
    Hard: "bg-orange-100 text-orange-800",
    Technical: "bg-red-100 text-red-800",
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden bg-[#ddd8cc]">
        <img src={exp.image} alt={exp.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2e2b26]/80 to-[#2e2b26]/10" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-[#2e2b26]/80 backdrop-blur text-[#f6f3ee] text-xs font-semibold px-3 py-1 rounded-full">{exp.type}</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${diffColor[exp.difficulty]}`}>{exp.difficulty}</span>
              {spotsLeft <= 3 && spotsLeft > 0 && (
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">{spotsLeft} spot{spotsLeft > 1 ? "s" : ""} left!</span>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[#f6f3ee] leading-tight">{exp.title}</h1>
            <p className="text-[#ddd8cc] text-sm mt-2">📍 {exp.destination} · {exp.elevation}</p>
          </div>
        </div>
      </div>

      {/* Quick stats bar */}
      <div className="bg-[#2e2b26] py-4">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap gap-6">
          {[
            { icon: "📅", label: "Dates", value: exp.dates },
            { icon: "⏱", label: "Duration", value: exp.duration },
            { icon: "👥", label: "Participants", value: `${exp.currentParticipants}/${exp.maxParticipants}` },
            { icon: "📍", label: "Meeting Point", value: exp.meetingPoint },
          ].map(({ icon, label, value }) => (
            <div key={label}>
              <p className="text-[#8a8278] text-[10px] uppercase tracking-wide">{label}</p>
              <p className="text-[#f6f3ee] text-sm font-semibold">{icon} {value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_300px] gap-10">
        <div className="space-y-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#8a8278]">
            <Link to="/expeditions" className="hover:text-[#2e2b26]">Expeditions</Link>
            <span>/</span>
            <span className="text-[#2e2b26]">{exp.title}</span>
          </nav>

          {/* Description */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-3">About This Expedition</h2>
            <p className="text-[#5a5549] leading-relaxed text-sm">{exp.description}</p>
          </div>

          {/* Itinerary */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-5">Itinerary</h2>
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#ddd8cc]" />
              <div className="space-y-4">
                {exp.itinerary.map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="w-8 h-8 rounded-full border-2 border-[#2a4d0f] bg-[#2a4d0f]/10 flex items-center justify-center text-[10px] font-bold text-[#2a4d0f] flex-shrink-0 z-10">
                      {i + 1}
                    </div>
                    <div className="flex-1 bg-white border border-[#ede9e0] rounded-xl p-4 mb-1">
                      <p className="text-[#2a4d0f] text-xs font-bold uppercase tracking-wide mb-1">{item.day}</p>
                      <p className="text-[#5a5549] text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Included / Not Included */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <h3 className="font-display text-xl font-bold text-[#2e2b26] mb-4">Included</h3>
              <ul className="space-y-2">
                {exp.included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#5a5549]">
                    <span className="text-[#2a4d0f] font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-[#2e2b26] mb-4">Not Included</h3>
              <ul className="space-y-2">
                {exp.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#5a5549]">
                    <span className="text-[#8a8278] mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Equipment */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Essential Equipment</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {exp.equipment.map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white border border-[#ede9e0] rounded-lg px-4 py-3">
                  <span className="text-amber-600 text-sm">🎒</span>
                  <span className="text-[#2e2b26] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Safety Notes</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-2">
              {exp.safetyNotes.map((note) => (
                <p key={note} className="flex items-start gap-2 text-amber-800 text-sm">
                  <span className="mt-0.5 flex-shrink-0">⚠</span>
                  {note}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Join card */}
          <div className="bg-white border border-[#ede9e0] rounded-2xl p-5 shadow-sm sticky top-20">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#8a8278] text-xs uppercase tracking-wide">Availability</span>
                <span className={`text-xs font-bold ${spotsLeft === 0 ? "text-red-600" : spotsLeft <= 3 ? "text-amber-600" : "text-[#2a4d0f]"}`}>
                  {spotsLeft === 0 ? "Full" : `${spotsLeft} of ${exp.maxParticipants} spots left`}
                </span>
              </div>
              <div className="w-full bg-[#ede9e0] rounded-full h-2">
                <div
                  className="bg-[#2a4d0f] h-2 rounded-full transition-all"
                  style={{ width: `${(exp.currentParticipants / exp.maxParticipants) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 mb-5 text-xs text-[#5a5549]">
              <div className="flex justify-between"><span>Duration</span><span className="font-semibold text-[#2e2b26]">{exp.duration}</span></div>
              <div className="flex justify-between"><span>Dates</span><span className="font-semibold text-[#2e2b26]">{exp.dates}</span></div>
              <div className="flex justify-between"><span>Difficulty</span><span className={`font-semibold px-2 py-0.5 rounded-full text-[10px] ${diffColor[exp.difficulty]}`}>{exp.difficulty}</span></div>
              <div className="flex justify-between"><span>Meeting Point</span><span className="font-semibold text-[#2e2b26] text-right max-w-[60%]">{exp.meetingPoint}</span></div>
            </div>

            {spotsLeft > 0 ? (
              <button
                onClick={() => setShowJoinModal(true)}
                className="w-full bg-[#2a4d0f] text-[#f6f3ee] font-semibold py-3.5 rounded-xl hover:bg-[#3a6b18] transition-colors"
              >
                Request to Join
              </button>
            ) : (
              <button disabled className="w-full bg-[#ddd8cc] text-[#8a8278] font-semibold py-3.5 rounded-xl cursor-not-allowed">
                Expedition Full
              </button>
            )}
            <p className="text-[#8a8278] text-[10px] text-center mt-2">No payment required. Join request only.</p>
          </div>

          {/* Organizer */}
          <div className="bg-white border border-[#ede9e0] rounded-xl p-5">
            <p className="text-[#8a8278] text-xs uppercase tracking-wide mb-3">Organized by</p>
            <Link to={`/guides/${exp.organizer.username}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={exp.organizer.avatar} alt={exp.organizer.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-[#2e2b26] font-semibold text-sm">{exp.organizer.name}</p>
                  {exp.organizer.verified && (
                    <span className="bg-[#2a4d0f] text-white text-[9px] px-1.5 py-0.5 rounded-full">✓</span>
                  )}
                </div>
                <p className="text-[#8a8278] text-xs">View Guide Profile →</p>
              </div>
            </Link>
          </div>
        </aside>
      </div>

      {/* Join Request Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-[#2e2b26]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-7 shadow-2xl">
            {joinSubmitted ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-[#2a4d0f] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#2e2b26] mb-2">Request Sent!</h3>
                <p className="text-[#5a5549] text-sm mb-6">
                  {exp.organizer.name} will review your request and get back to you. You will receive a notification when your status updates.
                </p>
                <button onClick={() => { setShowJoinModal(false); setJoinSubmitted(false); }} className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-8 py-3 rounded-xl hover:bg-[#3a6b18] transition-colors">
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display text-xl font-bold text-[#2e2b26]">Request to Join</h3>
                  <button onClick={() => setShowJoinModal(false)} className="text-[#8a8278] hover:text-[#2e2b26] text-xl">✕</button>
                </div>
                <p className="text-[#5a5549] text-xs mb-5">
                  <strong>{exp.title}</strong> · {exp.dates}
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#2e2b26] text-xs font-semibold mb-1.5 uppercase tracking-wide">Your Name</label>
                    <input
                      value={joinForm.name}
                      onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                      className="w-full border border-[#ddd8cc] rounded-lg px-4 py-2.5 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#2e2b26] text-xs font-semibold mb-1.5 uppercase tracking-wide">Experience Level</label>
                    <select
                      value={joinForm.experience}
                      onChange={(e) => setJoinForm({ ...joinForm, experience: e.target.value })}
                      className="w-full border border-[#ddd8cc] rounded-lg px-4 py-2.5 text-sm text-[#2e2b26] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Experienced</option>
                      <option>Expert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#2e2b26] text-xs font-semibold mb-1.5 uppercase tracking-wide">Previous Relevant Experience</label>
                    <input
                      value={joinForm.prevExperience}
                      onChange={(e) => setJoinForm({ ...joinForm, prevExperience: e.target.value })}
                      className="w-full border border-[#ddd8cc] rounded-lg px-4 py-2.5 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                      placeholder="e.g. Trekked to Kundol Lake, Nanga Parbat viewpoint..."
                    />
                  </div>
                  <div>
                    <label className="block text-[#2e2b26] text-xs font-semibold mb-1.5 uppercase tracking-wide">Additional Notes</label>
                    <textarea
                      value={joinForm.notes}
                      onChange={(e) => setJoinForm({ ...joinForm, notes: e.target.value })}
                      rows={3}
                      className="w-full border border-[#ddd8cc] rounded-lg px-4 py-2.5 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30 resize-none"
                      placeholder="Anything else the organizer should know..."
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowJoinModal(false)} className="flex-1 border border-[#ddd8cc] text-[#5a5549] font-medium py-3 rounded-xl hover:border-[#2a4d0f]/40 transition-colors text-sm">
                    Cancel
                  </button>
                  <button onClick={() => setJoinSubmitted(true)} className="flex-1 bg-[#2a4d0f] text-[#f6f3ee] font-semibold py-3 rounded-xl hover:bg-[#3a6b18] transition-colors text-sm">
                    Send Request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
