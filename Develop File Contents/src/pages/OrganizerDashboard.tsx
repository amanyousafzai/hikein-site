import { useState } from "react";
import { Link } from "react-router";
import { expeditions } from "../data/guides";

type Tab = "expeditions" | "requests" | "participants" | "past";

type RequestStatus = "Pending" | "Approved" | "Declined";

interface JoinRequest {
  id: string;
  name: string;
  expId: string;
  experience: string;
  prevExp: string;
  notes: string;
  status: RequestStatus;
  avatar: string;
}

const joinRequests: JoinRequest[] = [
  { id: "r1", name: "Usman Malik", expId: "nanga-bc-aug-2026", experience: "Intermediate", prevExp: "Trekked to Fairy Meadows, Shogran, Nathia Gali", notes: "Very excited for this trip!", status: "Pending", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format" },
  { id: "r2", name: "Fatima Noor", expId: "nanga-bc-aug-2026", experience: "Experienced", prevExp: "Kundol Lake, Mahodand, Katora", notes: "I have all the required gear.", status: "Pending", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&auto=format" },
  { id: "r3", name: "Hassan Rizvi", expId: "swat-lakes-aug-2026", experience: "Beginner", prevExp: "Day hikes around Islamabad only", notes: "Want to start serious trekking.", status: "Pending", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" },
  { id: "r4", name: "Amna Siddiqui", expId: "swat-lakes-aug-2026", experience: "Intermediate", prevExp: "Kundol Lake twice, Mahodand once", notes: "Photography enthusiast!", status: "Approved", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800",
  Approved: "bg-emerald-100 text-emerald-800",
  Declined: "bg-red-100 text-red-800",
};

export default function OrganizerDashboard() {
  const [tab, setTab] = useState<Tab>("expeditions");
  const [requests, setRequests] = useState(joinRequests);

  const myExpeditions = expeditions.slice(0, 2);

  const handleRequest = (id: string, status: "Approved" | "Declined") => {
    setRequests(requests.map((r) => r.id === id ? { ...r, status } : r));
  };

  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const approvedCount = requests.filter((r) => r.status === "Approved").length;

  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-[#2e2b26] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-[#2a4d0f] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">★</span>
            </div>
            <p className="text-[#3a6b18] text-xs font-semibold uppercase tracking-widest">Verified Guide</p>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#f6f3ee] mb-1">Organizer Dashboard</h1>
          <p className="text-[#8a8278] text-sm">Manage your expeditions and join requests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-[#ede9e0]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap gap-6">
          {[
            { n: myExpeditions.length, label: "Active Expeditions" },
            { n: myExpeditions.reduce((a, e) => a + e.currentParticipants, 0), label: "Total Participants" },
            { n: pendingCount, label: "Pending Requests" },
            { n: approvedCount, label: "Approved" },
          ].map(({ n, label }) => (
            <div key={label}>
              <p className="font-display text-2xl font-bold text-[#2e2b26]">{n}</p>
              <p className="text-[#8a8278] text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#ede9e0] bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0">
            {([
              { id: "expeditions", label: "My Expeditions" },
              { id: "requests", label: `Join Requests${pendingCount > 0 ? ` (${pendingCount})` : ""}` },
              { id: "participants", label: "Participants" },
              { id: "past", label: "Past Trips" },
            ] as { id: Tab; label: string }[]).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`px-5 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  tab === id ? "border-[#2a4d0f] text-[#2a4d0f]" : "border-transparent text-[#8a8278] hover:text-[#2e2b26]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* My Expeditions */}
        {tab === "expeditions" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-[#2e2b26]">Active Expeditions</h2>
              <Link to="/create-event" className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold text-sm px-4 py-2 rounded-xl hover:bg-[#3a6b18] transition-colors">
                + Create Expedition
              </Link>
            </div>
            <div className="space-y-5">
              {myExpeditions.map((exp) => {
                const spots = exp.maxParticipants - exp.currentParticipants;
                return (
                  <div key={exp.id} className="bg-white border border-[#ede9e0] rounded-2xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <img src={exp.image} alt={exp.title} className="w-full sm:w-40 h-32 sm:h-auto object-cover flex-shrink-0" />
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-display font-bold text-[#2e2b26] text-lg leading-tight mb-1">{exp.title}</h3>
                            <p className="text-[#8a8278] text-xs">📅 {exp.dates} · {exp.duration} · {exp.difficulty}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Link to={`/expeditions/${exp.id}`} className="border border-[#ddd8cc] text-[#5a5549] text-xs font-medium px-3 py-1.5 rounded-lg hover:border-[#2a4d0f]/40 transition-colors">
                              View
                            </Link>
                            <button className="border border-[#ddd8cc] text-[#5a5549] text-xs font-medium px-3 py-1.5 rounded-lg hover:border-[#2a4d0f]/40 transition-colors">
                              Edit
                            </button>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex-1 bg-[#ede9e0] rounded-full h-2">
                            <div className="bg-[#2a4d0f] h-2 rounded-full" style={{ width: `${(exp.currentParticipants / exp.maxParticipants) * 100}%` }} />
                          </div>
                          <span className={`text-xs font-semibold ${spots === 0 ? "text-red-600" : spots <= 3 ? "text-amber-600" : "text-[#2a4d0f]"}`}>
                            {exp.currentParticipants}/{exp.maxParticipants} participants
                            {spots > 0 ? ` · ${spots} spots left` : " · FULL"}
                          </span>
                        </div>

                        {/* Quick actions */}
                        <div className="mt-3 flex gap-3">
                          <button onClick={() => setTab("requests")} className="text-xs text-[#2a4d0f] font-semibold hover:text-[#3a6b18] transition-colors">
                            View Requests ({requests.filter((r) => r.expId === exp.id && r.status === "Pending").length} pending) →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Join Requests */}
        {tab === "requests" && (
          <div>
            <h2 className="font-display text-xl font-bold text-[#2e2b26] mb-6">Join Requests</h2>
            {requests.length === 0 ? (
              <div className="text-center py-16 text-[#8a8278]">No requests yet.</div>
            ) : (
              <div className="space-y-4">
                {requests.map((req) => {
                  const exp = expeditions.find((e) => e.id === req.expId);
                  return (
                    <div key={req.id} className="bg-white border border-[#ede9e0] rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <img src={req.avatar} alt={req.name} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="font-semibold text-[#2e2b26] text-sm">{req.name}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[req.status]}`}>{req.status}</span>
                          </div>
                          {exp && <p className="text-[#8a8278] text-xs mb-2">For: <span className="font-medium text-[#5a5549]">{exp.title}</span></p>}
                          <div className="grid sm:grid-cols-2 gap-2 text-xs text-[#5a5549] mb-3">
                            <div><span className="text-[#8a8278]">Experience: </span>{req.experience}</div>
                            <div><span className="text-[#8a8278]">Previous: </span>{req.prevExp}</div>
                          </div>
                          {req.notes && (
                            <p className="text-xs text-[#5a5549] bg-[#f6f3ee] rounded-lg px-3 py-2 mb-3">"{req.notes}"</p>
                          )}
                          {req.status === "Pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleRequest(req.id, "Approved")}
                                className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold text-xs px-4 py-2 rounded-lg hover:bg-[#3a6b18] transition-colors"
                              >
                                ✓ Approve
                              </button>
                              <button
                                onClick={() => handleRequest(req.id, "Declined")}
                                className="border border-red-300 text-red-600 font-semibold text-xs px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                ✕ Decline
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Participants */}
        {tab === "participants" && (
          <div>
            <h2 className="font-display text-xl font-bold text-[#2e2b26] mb-6">All Participants</h2>
            <div className="bg-white border border-[#ede9e0] rounded-xl divide-y divide-[#f6f3ee]">
              {requests.filter((r) => r.status === "Approved").map((req) => {
                const exp = expeditions.find((e) => e.id === req.expId);
                return (
                  <div key={req.id} className="flex items-center gap-4 px-5 py-4">
                    <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="text-[#2e2b26] font-semibold text-sm">{req.name}</p>
                      <p className="text-[#8a8278] text-xs">{exp?.title}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Confirmed</span>
                  </div>
                );
              })}
              {requests.filter((r) => r.status === "Approved").length === 0 && (
                <div className="py-12 text-center text-[#8a8278] text-sm">No confirmed participants yet. Approve join requests to add participants.</div>
              )}
            </div>
          </div>
        )}

        {/* Past Trips */}
        {tab === "past" && (
          <div>
            <h2 className="font-display text-xl font-bold text-[#2e2b26] mb-6">Past Trips</h2>
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🗻</div>
              <p className="font-display text-xl font-bold text-[#2e2b26] mb-2">No past trips yet</p>
              <p className="text-[#8a8278] text-sm">Completed expeditions will appear here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
