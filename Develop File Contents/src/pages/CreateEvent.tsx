import { useState } from "react";
import { Link } from "react-router";

const steps = [
  "Basic Info",
  "Location",
  "Date & Duration",
  "Difficulty & Requirements",
  "Description & Itinerary",
  "Participant Limit",
  "Publish",
];

const eventTypes = ["Day Hike", "Multi-Day Trek", "Camping", "Expedition", "Meetup"];
const difficulties = ["Easy", "Moderate", "Hard", "Technical"];

interface FormData {
  title: string;
  type: string;
  clubId: string;
  location: string;
  region: string;
  meetingPoint: string;
  meetingCoords: string;
  startDate: string;
  endDate: string;
  duration: string;
  startTime: string;
  difficulty: string;
  minAge: string;
  fitnessLevel: string;
  requirements: string;
  description: string;
  itinerary: { day: string; description: string }[];
  equipment: string;
  safetyNotes: string;
  maxParticipants: string;
  isPublic: boolean;
  requiresApproval: boolean;
}

const initial: FormData = {
  title: "",
  type: "Day Hike",
  clubId: "",
  location: "",
  region: "",
  meetingPoint: "",
  meetingCoords: "",
  startDate: "",
  endDate: "",
  duration: "",
  startTime: "",
  difficulty: "Moderate",
  minAge: "",
  fitnessLevel: "Average",
  requirements: "",
  description: "",
  itinerary: [{ day: "Day 1", description: "" }],
  equipment: "",
  safetyNotes: "",
  maxParticipants: "20",
  isPublic: true,
  requiresApproval: true,
};

export default function CreateEvent() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [published, setPublished] = useState(false);

  const set = (field: Partial<FormData>) => setForm({ ...form, ...field });

  const addItineraryDay = () => {
    const newDay = `Day ${form.itinerary.length + 1}`;
    set({ itinerary: [...form.itinerary, { day: newDay, description: "" }] });
  };

  const updateItinerary = (i: number, field: "day" | "description", val: string) => {
    const updated = form.itinerary.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    set({ itinerary: updated });
  };

  const removeItineraryDay = (i: number) => {
    set({ itinerary: form.itinerary.filter((_, idx) => idx !== i) });
  };

  if (published) {
    return (
      <div className="min-h-screen bg-[#f6f3ee] flex items-center justify-center px-6 pb-20">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-[#2a4d0f] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-4xl font-bold text-[#2e2b26] mb-3">Event Published!</h1>
          <p className="text-[#5a5549] text-sm leading-relaxed mb-2">
            <strong>{form.title}</strong> is now live on HikeIN.
          </p>
          <p className="text-[#8a8278] text-sm mb-8">Explorers can now discover and request to join your event.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/events" className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-8 py-3 rounded-xl hover:bg-[#3a6b18] transition-colors">
              View Events
            </Link>
            <Link to="/dashboard" className="border border-[#ddd8cc] text-[#5a5549] font-medium px-8 py-3 rounded-xl hover:border-[#2a4d0f]/40 transition-colors">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f3ee] pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-[#2e2b26] py-10">
        <div className="max-w-3xl mx-auto px-6">
          <Link to="/events" className="text-[#8a8278] text-xs hover:text-[#ddd8cc] transition-colors inline-flex items-center gap-1 mb-5">
            ← Back to Events
          </Link>
          <h1 className="font-display text-3xl font-bold text-[#f6f3ee]">Create Event</h1>
          <p className="text-[#8a8278] text-sm mt-1">Organize a hike, trek, or outdoor meetup for the community.</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-[#ede9e0]">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center gap-0 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-shrink-0">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`flex flex-col items-center gap-1 ${i < step ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step ? "bg-[#2a4d0f] text-white" : i === step ? "bg-[#2a4d0f] text-white ring-4 ring-[#2a4d0f]/20" : "bg-[#ddd8cc] text-[#8a8278]"
                  }`}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className={`text-[9px] font-medium hidden sm:block whitespace-nowrap ${i <= step ? "text-[#2a4d0f]" : "text-[#8a8278]"}`}>{s}</span>
                </button>
                {i < steps.length - 1 && <div className={`w-6 sm:w-8 h-0.5 mx-1 ${i < step ? "bg-[#2a4d0f]" : "bg-[#ddd8cc]"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Step 0: Basic Info */}
        {step === 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-1">Basic Information</h2>
            <p className="text-[#8a8278] text-sm mb-7">Tell us what kind of event you're organizing.</p>
            <div className="space-y-5">
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Event Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => set({ title: e.target.value })}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                  placeholder="e.g. Swat Lakes Summer Trek"
                />
              </div>
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Event Type *</label>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => set({ type: t })}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${form.type === t ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-white border border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/40"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Organizing Club (Optional)</label>
                <input
                  value={form.clubId}
                  onChange={(e) => set({ clubId: e.target.value })}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                  placeholder="Select or search for your club..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Location */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-1">Location</h2>
            <p className="text-[#8a8278] text-sm mb-7">Where is this event taking place?</p>
            <div className="space-y-5">
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Destination / Location Name *</label>
                <input
                  value={form.location}
                  onChange={(e) => set({ location: e.target.value })}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                  placeholder="e.g. Kundol Lake, Kalam, Swat"
                />
              </div>
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Region *</label>
                <select
                  value={form.region}
                  onChange={(e) => set({ region: e.target.value })}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                >
                  <option value="">Select region</option>
                  {["Swat", "Gilgit-Baltistan", "Kaghan", "Azad Kashmir", "Chitral", "Skardu", "Naran", "Kumrat", "Other"].map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Meeting Point *</label>
                <input
                  value={form.meetingPoint}
                  onChange={(e) => set({ meetingPoint: e.target.value })}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                  placeholder="e.g. Islamabad Toll Plaza, Shell Petrol Station, Kalam Bazaar"
                />
              </div>
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">GPS Coordinates (Optional)</label>
                <input
                  value={form.meetingCoords}
                  onChange={(e) => set({ meetingCoords: e.target.value })}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                  placeholder="e.g. 35.2034, 72.9456"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Date & Duration */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-1">Date & Duration</h2>
            <p className="text-[#8a8278] text-sm mb-7">When is the event and how long does it last?</p>
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Start Date *</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => set({ startDate: e.target.value })}
                    className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                  />
                </div>
                <div>
                  <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">End Date</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => set({ endDate: e.target.value })}
                    className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Start Time</label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => set({ startTime: e.target.value })}
                    className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                  />
                </div>
                <div>
                  <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Duration</label>
                  <input
                    value={form.duration}
                    onChange={(e) => set({ duration: e.target.value })}
                    className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                    placeholder="e.g. 2 days, 8 hours"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Difficulty & Requirements */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-1">Difficulty & Requirements</h2>
            <p className="text-[#8a8278] text-sm mb-7">Help participants understand what they are signing up for.</p>
            <div className="space-y-5">
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Difficulty Level *</label>
                <div className="flex gap-2 flex-wrap">
                  {difficulties.map((d) => (
                    <button
                      key={d}
                      onClick={() => set({ difficulty: d })}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${form.difficulty === d ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-white border border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/40"}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Minimum Age</label>
                <input
                  type="number"
                  value={form.minAge}
                  onChange={(e) => set({ minAge: e.target.value })}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                  placeholder="e.g. 18"
                />
              </div>
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Required Fitness Level</label>
                <select
                  value={form.fitnessLevel}
                  onChange={(e) => set({ fitnessLevel: e.target.value })}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                >
                  {["Any", "Average", "Above Average", "Athlete Level"].map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Other Requirements</label>
                <textarea
                  value={form.requirements}
                  onChange={(e) => set({ requirements: e.target.value })}
                  rows={4}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30 resize-none"
                  placeholder="e.g. Previous trekking experience required, must bring camping gear, no beginners..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Description & Itinerary */}
        {step === 4 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-1">Description & Itinerary</h2>
            <p className="text-[#8a8278] text-sm mb-7">Write a compelling description and day-by-day plan.</p>
            <div className="space-y-5">
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Event Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => set({ description: e.target.value })}
                  rows={5}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30 resize-none"
                  placeholder="Describe the event, what to expect, why join, highlights..."
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[#2e2b26] text-xs font-semibold uppercase tracking-wide">Itinerary</label>
                  <button onClick={addItineraryDay} className="text-[#2a4d0f] text-xs font-semibold hover:text-[#3a6b18]">+ Add Day</button>
                </div>
                <div className="space-y-3">
                  {form.itinerary.map((item, i) => (
                    <div key={i} className="bg-white border border-[#ede9e0] rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          value={item.day}
                          onChange={(e) => updateItinerary(i, "day", e.target.value)}
                          className="w-20 border border-[#ddd8cc] rounded-lg px-2 py-1.5 text-xs text-[#2e2b26] font-semibold focus:outline-none focus:ring-1 focus:ring-[#2a4d0f]/30"
                        />
                        {form.itinerary.length > 1 && (
                          <button onClick={() => removeItineraryDay(i)} className="ml-auto text-[#8a8278] hover:text-red-500 text-xs transition-colors">✕ Remove</button>
                        )}
                      </div>
                      <textarea
                        value={item.description}
                        onChange={(e) => updateItinerary(i, "description", e.target.value)}
                        rows={2}
                        className="w-full border border-[#ddd8cc] rounded-lg px-3 py-2 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-1 focus:ring-[#2a4d0f]/30 resize-none"
                        placeholder={`What happens on ${item.day}?`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Equipment List</label>
                <textarea
                  value={form.equipment}
                  onChange={(e) => set({ equipment: e.target.value })}
                  rows={3}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30 resize-none"
                  placeholder="What should participants bring? Tent, sleeping bag, trekking poles..."
                />
              </div>
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Safety Notes</label>
                <textarea
                  value={form.safetyNotes}
                  onChange={(e) => set({ safetyNotes: e.target.value })}
                  rows={3}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30 resize-none"
                  placeholder="Safety instructions, emergency procedures, guide certifications..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Participant Limit */}
        {step === 5 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-1">Participant Limit</h2>
            <p className="text-[#8a8278] text-sm mb-7">Set the maximum group size and visibility settings.</p>
            <div className="space-y-5">
              <div>
                <label className="block text-[#2e2b26] text-xs font-semibold mb-2 uppercase tracking-wide">Maximum Participants *</label>
                <input
                  type="number"
                  min="2"
                  max="500"
                  value={form.maxParticipants}
                  onChange={(e) => set({ maxParticipants: e.target.value })}
                  className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30"
                />
                <p className="text-[#8a8278] text-xs mt-1.5">
                  {parseInt(form.maxParticipants) <= 8 ? "Small group — intimate experience" :
                   parseInt(form.maxParticipants) <= 20 ? "Medium group — good balance" :
                   "Large group — strong logistics needed"}
                </p>
              </div>
              <div className="bg-white border border-[#ede9e0] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#2e2b26] text-sm font-semibold">Public Event</p>
                    <p className="text-[#8a8278] text-xs">Visible to all HikeIN users</p>
                  </div>
                  <button
                    onClick={() => set({ isPublic: !form.isPublic })}
                    className={`w-10 h-6 rounded-full transition-colors relative ${form.isPublic ? "bg-[#2a4d0f]" : "bg-[#ddd8cc]"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.isPublic ? "translate-x-5" : "translate-x-1"}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#2e2b26] text-sm font-semibold">Require Approval</p>
                    <p className="text-[#8a8278] text-xs">Review join requests before confirming</p>
                  </div>
                  <button
                    onClick={() => set({ requiresApproval: !form.requiresApproval })}
                    className={`w-10 h-6 rounded-full transition-colors relative ${form.requiresApproval ? "bg-[#2a4d0f]" : "bg-[#ddd8cc]"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.requiresApproval ? "translate-x-5" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Publish */}
        {step === 6 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-1">Review & Publish</h2>
            <p className="text-[#8a8278] text-sm mb-7">Review your event details before publishing.</p>
            <div className="bg-white border border-[#ede9e0] rounded-xl divide-y divide-[#ede9e0] mb-6">
              {[
                { label: "Title", value: form.title || "—" },
                { label: "Type", value: form.type },
                { label: "Location", value: form.location || "—" },
                { label: "Region", value: form.region || "—" },
                { label: "Meeting Point", value: form.meetingPoint || "—" },
                { label: "Start Date", value: form.startDate || "—" },
                { label: "Duration", value: form.duration || "—" },
                { label: "Difficulty", value: form.difficulty },
                { label: "Max Participants", value: form.maxParticipants },
                { label: "Visibility", value: form.isPublic ? "Public" : "Private" },
                { label: "Join Requests", value: form.requiresApproval ? "Requires Approval" : "Open" },
              ].map(({ label, value }) => (
                <div key={label} className="px-5 py-3 flex items-center justify-between gap-4">
                  <p className="text-[#8a8278] text-xs">{label}</p>
                  <p className="text-[#2e2b26] text-xs font-semibold text-right max-w-[60%]">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#f6f3ee] border border-[#ede9e0] rounded-xl p-4 text-xs text-[#5a5549] mb-6">
              <p className="font-semibold text-[#2e2b26] mb-1">Important Reminder</p>
              <ul className="space-y-0.5">
                <li>• No payments are collected through HikeIN</li>
                <li>• You are responsible for the safety of your participants</li>
                <li>• Events can be edited after publishing</li>
              </ul>
            </div>
            <button
              onClick={() => setPublished(true)}
              className="w-full bg-[#2a4d0f] text-[#f6f3ee] font-semibold py-4 rounded-xl hover:bg-[#3a6b18] transition-colors text-base"
            >
              Publish Event
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="border border-[#ddd8cc] text-[#5a5549] font-medium px-6 py-3 rounded-xl hover:border-[#2a4d0f]/40 transition-colors">
              ← Back
            </button>
          )}
          {step < steps.length - 1 && (
            <button onClick={() => setStep(step + 1)} className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-8 py-3 rounded-xl hover:bg-[#3a6b18] transition-colors">
              Continue →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
