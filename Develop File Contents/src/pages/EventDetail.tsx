import { useParams, Link } from "react-router";
import { useState } from "react";
import { clubEvents, clubs } from "../data/clubs";
import { explorers } from "../data/mock";

export default function EventDetail() {
  const { id } = useParams();
  const event = clubEvents.find((e) => e.id === id) ?? clubEvents[0];
  const club = clubs.find((c) => c.id === event.clubId);
  const [interested, setInterested] = useState(false);
  const [joinRequested, setJoinRequested] = useState(false);

  const spotsLeft = event.maxParticipants - event.currentParticipants;
  const full = spotsLeft === 0;

  const diffColor: Record<string, string> = {
    Easy: "bg-emerald-100 text-emerald-800",
    Moderate: "bg-amber-100 text-amber-800",
    Hard: "bg-orange-100 text-orange-800",
    Technical: "bg-red-100 text-red-800",
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden bg-[#ddd8cc]">
        <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3009]/85 via-[#1a3009]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            {club && (
              <div className="flex items-center gap-2 mb-3">
                <img src={club.logo} alt={club.name} className="w-6 h-6 rounded" />
                <Link to={`/clubs/${club.slug}`} className="text-[#ddd8cc] text-xs hover:text-[#f6f3ee] font-medium">{club.name}</Link>
              </div>
            )}
            <span className={`inline-block text-xs font-bold uppercase px-3 py-1 rounded-full mb-3 ${diffColor[event.difficulty]}`}>
              {event.difficulty}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#f6f3ee] mb-3">{event.title}</h1>
            <p className="text-[#ddd8cc] text-sm">📅 {event.dates} · ⏱ {event.duration}</p>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="bg-white border-b border-[#ede9e0]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-[#5a5549]">
            <span>👥 {event.currentParticipants}/{event.maxParticipants} participants</span>
            {!full && <span className="text-[#2a4d0f] font-semibold">{spotsLeft} spots remaining</span>}
            {full && <span className="text-red-600 font-semibold">Event full</span>}
          </div>
          {event.status === "upcoming" && (
            <div className="flex gap-3">
              <button
                onClick={() => setInterested(!interested)}
                className={`text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${
                  interested ? "border-[#2a4d0f] text-[#2a4d0f] bg-[#2a4d0f]/5" : "border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/40"
                }`}
              >
                {interested ? "✓ Interested" : "Interested"}
              </button>
              {!full && (
                <button
                  onClick={() => setJoinRequested(!joinRequested)}
                  className={`text-sm font-semibold px-5 py-2 rounded-lg transition-colors ${
                    joinRequested ? "bg-[#f6f3ee] border border-[#ddd8cc] text-[#5a5549]" : "bg-[#2a4d0f] text-[#f6f3ee] hover:bg-[#3a6b18]"
                  }`}
                >
                  {joinRequested ? "Request Sent" : "Request to Join"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 pb-12 grid lg:grid-cols-[1fr_280px] gap-10">
        {/* Main */}
        <div className="space-y-8">
          {/* Description */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-3">About this Event</h2>
            <p className="text-[#5a5549] leading-relaxed text-sm">{event.description}</p>
          </section>

          {/* Itinerary */}
          {event.itinerary.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Itinerary</h2>
              <div className="space-y-3">
                {event.itinerary.map(({ day, description }, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-20 flex-shrink-0">
                      <span className="font-display font-bold text-[#2a4d0f] text-sm">{day}</span>
                    </div>
                    <div className="flex-1 bg-white border border-[#ede9e0] rounded-xl px-4 py-3">
                      <p className="text-[#5a5549] text-sm leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Required equipment */}
          {event.equipment.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Required Equipment</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {event.equipment.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white border border-[#ede9e0] rounded-lg px-4 py-3 text-sm text-[#5a5549]">
                    <span className="text-[#2a4d0f] font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Participants */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">
              Participants ({event.currentParticipants})
            </h2>
            <div className="flex items-center gap-2">
              {explorers.slice(0, event.currentParticipants > 5 ? 5 : event.currentParticipants).map((exp, i) => (
                <Link key={exp.id} to={`/explorer/${exp.username}`} title={exp.name}>
                  <img src={exp.avatar} alt={exp.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#f6f3ee] hover:ring-[#2a4d0f] transition-all" style={{ marginLeft: i > 0 ? "-8px" : "0", zIndex: 6 - i }} />
                </Link>
              ))}
              {event.currentParticipants > 5 && (
                <span className="text-xs text-[#8a8278] ml-3">+{event.currentParticipants - 5} more</span>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block space-y-4">
          {/* Event info card */}
          <div className="bg-white border border-[#ede9e0] rounded-xl p-4">
            <h3 className="font-display font-bold text-[#2e2b26] text-base mb-4">Event Details</h3>
            {[
              { icon: "📅", label: "Dates", value: event.dates },
              { icon: "⏱", label: "Duration", value: event.duration },
              { icon: "📍", label: "Destination", value: event.destination },
              { icon: "🥾", label: "Difficulty", value: event.difficulty },
              { icon: "📌", label: "Meeting Point", value: event.meetingPoint },
              { icon: "👥", label: "Participants", value: `${event.currentParticipants}/${event.maxParticipants}` },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex gap-3 py-2.5 border-b border-[#f6f3ee] last:border-0">
                <span className="text-base leading-snug flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="text-[#8a8278] text-[10px] uppercase tracking-wide">{label}</p>
                  <p className="text-[#2e2b26] text-xs font-medium leading-snug">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Organizer */}
          {club && (
            <div className="bg-white border border-[#ede9e0] rounded-xl p-4">
              <h3 className="font-display font-bold text-[#2e2b26] text-sm mb-3">Organized by</h3>
              <div className="flex items-center gap-3 mb-3">
                <img src={club.logo} alt={club.name} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <Link to={`/clubs/${club.slug}`} className="font-semibold text-[#2e2b26] text-sm hover:text-[#2a4d0f] transition-colors">{club.name}</Link>
                  <p className="text-[#8a8278] text-xs">{club.memberCount.toLocaleString()} members</p>
                </div>
              </div>
              <Link to={`/clubs/${club.slug}`} className="block w-full text-center text-xs font-semibold text-[#2a4d0f] border border-[#2a4d0f]/30 py-2 rounded-lg hover:bg-[#2a4d0f]/5 transition-colors">
                View Club →
              </Link>
            </div>
          )}

          {/* CTA */}
          {event.status === "upcoming" && !full && (
            <button
              onClick={() => setJoinRequested(!joinRequested)}
              className={`w-full font-semibold py-3 rounded-xl text-sm transition-colors ${
                joinRequested ? "bg-[#f6f3ee] border border-[#ddd8cc] text-[#5a5549]" : "bg-[#2a4d0f] text-[#f6f3ee] hover:bg-[#3a6b18]"
              }`}
            >
              {joinRequested ? "✓ Request Sent" : "Request to Join"}
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
