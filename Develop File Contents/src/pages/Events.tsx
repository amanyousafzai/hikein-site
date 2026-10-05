import { useState } from "react";
import { Link } from "react-router";
import { clubEvents, clubs } from "../data/clubs";

export default function Events() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("upcoming");

  const filtered = clubEvents.filter((e) => filter === "all" || e.status === filter);

  const getClub = (clubId: string) => clubs.find((c) => c.id === clubId);

  const diffColor: Record<string, string> = {
    Easy: "bg-emerald-100 text-emerald-800",
    Moderate: "bg-amber-100 text-amber-800",
    Hard: "bg-orange-100 text-orange-800",
    Technical: "bg-red-100 text-red-800",
  };

  return (
    <div className="pb-20 md:pb-0">
      <div className="bg-[#2e2b26] pt-14 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#3a6b18] text-xs font-semibold uppercase tracking-widest mb-3">Community</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#f6f3ee] mb-4">Events</h1>
          <p className="text-[#8a8278] text-lg max-w-xl">
            Organized treks, expeditions, and group adventures from Pakistan's hiking clubs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {(["upcoming", "all", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                  filter === f ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-white border border-[#ddd8cc] text-[#5a5549]"
                }`}
              >
                {f === "upcoming" ? "Upcoming" : f === "completed" ? "Past Events" : "All"}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="font-display text-2xl font-bold text-[#2e2b26] mb-2">No events found</h3>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => {
              const club = getClub(event.clubId);
              const spotsLeft = event.maxParticipants - event.currentParticipants;
              return (
                <Link key={event.id} to={`/events/${event.id}`} className="group bg-white border border-[#ede9e0] rounded-xl overflow-hidden hover:border-[#2a4d0f]/40 hover:shadow-lg transition-all duration-200">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#ddd8cc]">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${diffColor[event.difficulty]}`}>
                        {event.difficulty}
                      </span>
                      {event.status === "upcoming" && spotsLeft <= 5 && spotsLeft > 0 && (
                        <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-orange-500/80 text-white">
                          {spotsLeft} left
                        </span>
                      )}
                      {event.status === "upcoming" && spotsLeft === 0 && (
                        <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-red-600/80 text-white">Full</span>
                      )}
                    </div>
                    {event.status === "completed" && (
                      <div className="absolute inset-0 bg-[#2e2b26]/40 flex items-center justify-center">
                        <span className="bg-[#f6f3ee] text-[#2e2b26] text-xs font-bold px-3 py-1 rounded-full">Completed</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    {club && (
                      <div className="flex items-center gap-2 mb-2">
                        <img src={club.logo} alt={club.name} className="w-5 h-5 rounded object-cover" />
                        <span className="text-[#8a8278] text-xs">{club.name}</span>
                      </div>
                    )}
                    <h3 className="font-display font-bold text-[#2e2b26] text-lg leading-snug mb-1 group-hover:text-[#2a4d0f] transition-colors">{event.title}</h3>
                    <p className="text-[#8a8278] text-xs mb-3">📅 {event.dates} · ⏱ {event.duration}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-[10px] text-[#8a8278] mb-1">
                          <span>Participants</span>
                          <span>{event.currentParticipants}/{event.maxParticipants}</span>
                        </div>
                        <div className="bg-[#ede9e0] rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-[#2a4d0f] h-full rounded-full transition-all"
                            style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
