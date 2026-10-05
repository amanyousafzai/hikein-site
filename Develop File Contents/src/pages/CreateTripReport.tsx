import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { destinations } from "../data/mock";
import { tripReports } from "../data/tripreports";

const sections = [
  { id: "overview", label: "Overview", placeholder: "Describe the experience overall — what to expect, what makes it special..." },
  { id: "howToReach", label: "How to Reach", placeholder: "Transport, road conditions, distance from nearest town..." },
  { id: "startingPoint", label: "Starting Point", placeholder: "Where does the trek begin? What facilities are available?" },
  { id: "hikingRoute", label: "Hiking Route", placeholder: "Describe the trail — forks, landmarks, terrain changes..." },
  { id: "difficultyDesc", label: "Difficulty", placeholder: "Explain what makes this trek easy, moderate, or hard..." },
  { id: "camping", label: "Camping", placeholder: "Where can you camp? What are the conditions?" },
  { id: "water", label: "Water Availability", placeholder: "Where are the water sources? Is the water safe?" },
];

export default function CreateTripReport() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [destSearch, setDestSearch] = useState("");
  const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("Moderate");
  const [sectionTexts, setSectionTexts] = useState<Record<string, string>>({});
  const [tips, setTips] = useState("");
  const [warnings, setWarnings] = useState("");
  const [whatToCarry, setWhatToCarry] = useState("");
  const [dragging, setDragging] = useState(false);

  const filtered = destinations.filter((d) =>
    d.name.toLowerCase().includes(destSearch.toLowerCase())
  );

  const canProceedStep1 = selectedDest && title && date && difficulty;
  const canProceedStep2 = Object.values(sectionTexts).filter(Boolean).length >= 3;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-24 md:pb-10">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-10">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              n <= step ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-[#ede9e0] text-[#8a8278]"
            }`}>{n}</div>
            <span className={`text-xs font-medium hidden sm:block ${n <= step ? "text-[#2e2b26]" : "text-[#8a8278]"}`}>
              {n === 1 ? "Trip Details" : n === 2 ? "Route & Info" : "Tips & Photos"}
            </span>
            {n < 3 && <div className="w-8 h-px bg-[#ddd8cc] mx-1" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h1 className="font-display text-4xl font-bold text-[#2e2b26] mb-2">Write a Trip Report</h1>
          <p className="text-[#8a8278] text-sm mb-8">Share your knowledge with the community. Your first-hand experience is invaluable.</p>

          {/* Destination */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Destination *</label>
            {selectedDest ? (
              <div className="flex items-center gap-3 bg-[#f6f3ee] border border-[#ddd8cc] rounded-lg p-3">
                <img src={selectedDest.image} alt={selectedDest.name} className="w-10 h-10 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-[#2e2b26] text-sm">{selectedDest.name}</p>
                  <p className="text-[#8a8278] text-xs">{selectedDest.location.split(",")[0]} · {selectedDest.type}</p>
                </div>
                <button onClick={() => setSelectedDest(null)} className="text-[#8a8278] hover:text-[#2e2b26] text-xs">✕</button>
              </div>
            ) : (
              <div>
                <input
                  value={destSearch}
                  onChange={(e) => setDestSearch(e.target.value)}
                  placeholder="Search destinations..."
                  className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f] mb-2"
                />
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {(destSearch ? filtered : destinations).map((d) => (
                    <button key={d.id} onClick={() => setSelectedDest(d)} className="w-full flex items-center gap-3 p-2.5 rounded-lg border border-[#ede9e0] bg-white hover:border-[#2a4d0f]/40 transition-colors text-left">
                      <img src={d.image} alt={d.name} className="w-9 h-9 rounded object-cover" />
                      <div>
                        <p className="font-semibold text-[#2e2b26] text-xs">{d.name}</p>
                        <p className="text-[#8a8278] text-[10px]">{d.type} · {d.elevation}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Report Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={`My Journey to ${selectedDest?.name ?? "the destination"}`}
              className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]"
            />
          </div>

          {/* Meta fields */}
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Date of Completion *</label>
              <input type="month" value={date} onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Difficulty *</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]"
              >
                {["Easy", "Moderate", "Hard", "Technical"].map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Distance</label>
              <input value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="18 KM"
                className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Duration</label>
              <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="8 Hours"
                className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]"
              />
            </div>
          </div>

          <button disabled={!canProceedStep1} onClick={() => setStep(2)}
            className="w-full bg-[#2a4d0f] text-[#f6f3ee] font-semibold py-3.5 rounded-xl hover:bg-[#3a6b18] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <button onClick={() => setStep(1)} className="text-sm text-[#8a8278] hover:text-[#2e2b26] mb-6 flex items-center gap-1">← Back</button>
          <h1 className="font-display text-3xl font-bold text-[#2e2b26] mb-2">Route & Information</h1>
          <p className="text-[#8a8278] text-sm mb-8">Complete at least 3 sections. The more detail you provide, the more useful your report.</p>

          <div className="space-y-5">
            {sections.map(({ id, label, placeholder }) => (
              <div key={id}>
                <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">{label}</label>
                <textarea
                  value={sectionTexts[id] ?? ""}
                  onChange={(e) => setSectionTexts({ ...sectionTexts, [id]: e.target.value })}
                  placeholder={placeholder}
                  rows={3}
                  className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f] resize-none"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button disabled={!canProceedStep2} onClick={() => setStep(3)}
              className="flex-1 bg-[#2a4d0f] text-[#f6f3ee] font-semibold py-3.5 rounded-xl hover:bg-[#3a6b18] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          </div>
          <p className="text-center text-xs text-[#8a8278] mt-2">
            {Object.values(sectionTexts).filter(Boolean).length} of 3 required sections filled
          </p>
        </div>
      )}

      {step === 3 && (
        <div>
          <button onClick={() => setStep(2)} className="text-sm text-[#8a8278] hover:text-[#2e2b26] mb-6 flex items-center gap-1">← Back</button>
          <h1 className="font-display text-3xl font-bold text-[#2e2b26] mb-2">Tips, Warnings & Photos</h1>
          <p className="text-[#8a8278] text-sm mb-8">The details that make a trip report truly useful.</p>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Important Tips</label>
              <textarea value={tips} onChange={(e) => setTips(e.target.value)} placeholder={"One tip per line. Practical advice for future hikers."} rows={4}
                className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f] resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Safety Warnings</label>
              <textarea value={warnings} onChange={(e) => setWarnings(e.target.value)} placeholder={"One warning per line. What do hikers need to be aware of?"} rows={3}
                className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f] resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">What to Carry</label>
              <textarea value={whatToCarry} onChange={(e) => setWhatToCarry(e.target.value)} placeholder={"One item per line. Essential gear for this trek."} rows={4}
                className="w-full bg-white border border-[#ddd8cc] text-[#2e2b26] px-4 py-3 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f] resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-2">Photos</label>
              <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); }}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragging ? "border-[#2a4d0f] bg-[#2a4d0f]/5" : "border-[#ddd8cc] bg-[#f6f3ee]"}`}
              >
                <div className="text-3xl mb-2">📷</div>
                <p className="text-sm font-medium text-[#2e2b26]">Add photos to your report</p>
                <p className="text-xs text-[#8a8278] mt-1 mb-3">Drag and drop or browse</p>
                <label className="cursor-pointer bg-white border border-[#ddd8cc] text-[#5a5549] text-xs font-semibold px-4 py-2 rounded-lg hover:border-[#2a4d0f]/40 transition-colors">
                  Browse Photos <input type="file" multiple accept="image/*" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <button onClick={() => navigate(`/trip-reports/${tripReports[0].id}`)}
            className="w-full mt-6 bg-[#2a4d0f] text-[#f6f3ee] font-semibold py-3.5 rounded-xl hover:bg-[#3a6b18] transition-colors"
          >
            Publish Trip Report
          </button>
        </div>
      )}
    </div>
  );
}
