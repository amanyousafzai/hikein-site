import { useParams, Link } from "react-router";
import { useState } from "react";
import { clubs, clubEvents } from "../data/clubs";

type ClubTab = "overview" | "members" | "adventures" | "tripreports" | "events" | "gallery" | "about";

const roleColors: Record<string, string> = {
  Founder: "bg-[#2a4d0f]/10 text-[#2a4d0f]",
  Admin: "bg-amber-100 text-amber-800",
  Member: "bg-[#f6f3ee] text-[#5a5549] border border-[#ddd8cc]",
};

export default function ClubProfile() {
  const { slug } = useParams();
  const club = clubs.find((c) => c.slug === slug) ?? clubs[0];
  const events = clubEvents.filter((e) => e.clubId === club.id);
  const [tab, setTab] = useState<ClubTab>("overview");
  const [joined, setJoined] = useState(false);
  const [memberCount, setMemberCount] = useState(club.memberCount);

  const navTabs: { id: ClubTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "members", label: "Members" },
    { id: "adventures", label: "Adventures" },
    { id: "events", label: "Events" },
    { id: "gallery", label: "Gallery" },
    { id: "about", label: "About" },
  ];

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter((e) => e.status === "completed");

  return (
    <div className="pb-20 md:pb-0">
      {/* Cover */}
      <div className="relative h-52 md:h-72 bg-[#ddd8cc] overflow-hidden">
        <img src={club.cover} alt={club.name} className="w-full h-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2e2b26]/70 to-transparent" />
      </div>

      {/* Club header */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative -mt-10 md:-mt-14 mb-6 flex flex-col md:flex-row md:items-end gap-5">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden ring-4 ring-[#f6f3ee] bg-[#ddd8cc] flex-shrink-0">
            <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 md:pb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#2e2b26]">{club.name}</h1>
              {club.isPublic && (
                <span className="text-xs font-semibold bg-[#f6f3ee] border border-[#ddd8cc] text-[#5a5549] px-2 py-0.5 rounded-full">Public</span>
              )}
            </div>
            <p className="text-[#5a5549] text-sm mt-0.5 italic">"{club.tagline}"</p>
            <p className="text-[#8a8278] text-xs mt-1">📍 {club.location} · Founded {club.founded} · {club.category}</p>
            <div className="flex gap-5 mt-3">
              <div><span className="font-display font-bold text-[#2e2b26] text-xl">{memberCount.toLocaleString()}</span><span className="text-[#8a8278] text-xs ml-1">Members</span></div>
              <div><span className="font-display font-bold text-[#2e2b26] text-xl">{club.adventures}</span><span className="text-[#8a8278] text-xs ml-1">Adventures</span></div>
              <div><span className="font-display font-bold text-[#2e2b26] text-xl">{club.destinations}</span><span className="text-[#8a8278] text-xs ml-1">Destinations</span></div>
            </div>
          </div>
          <div className="flex gap-3 md:pb-2">
            <button
              onClick={() => { setJoined(!joined); setMemberCount((c) => joined ? c - 1 : c + 1); }}
              className={`font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors ${
                joined ? "border border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/40" : "bg-[#2a4d0f] text-[#f6f3ee] hover:bg-[#3a6b18]"
              }`}
            >
              {joined ? "✓ Joined" : "Join Club"}
            </button>
            <button className="border border-[#ddd8cc] text-[#5a5549] font-medium text-sm px-4 py-2.5 rounded-lg hover:border-[#2a4d0f]/40 transition-colors">
              Share
            </button>
          </div>
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-[#ddd8cc] mb-8 -mx-1 px-1">
          {navTabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`pb-3 px-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                tab === id ? "border-[#2a4d0f] text-[#2a4d0f]" : "border-transparent text-[#8a8278] hover:text-[#5a5549]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming events */}
              {upcomingEvents.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Upcoming Events</h2>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <Link key={event.id} to={`/events/${event.id}`} className="group flex gap-4 bg-white border border-[#ede9e0] rounded-xl p-4 hover:border-[#2a4d0f]/40 hover:shadow-md transition-all">
                        <img src={event.image} alt={event.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-[#2a4d0f]">🏔 {event.destination}</span>
                          </div>
                          <h3 className="font-display font-bold text-[#2e2b26] text-base group-hover:text-[#2a4d0f] transition-colors">{event.title}</h3>
                          <p className="text-[#8a8278] text-xs">📅 {event.dates} · {event.difficulty}</p>
                          <p className="text-[#5a5549] text-xs mt-1">👥 {event.currentParticipants}/{event.maxParticipants} participants</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Recent adventures */}
              <section>
                <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Recent Adventures</h2>
                <div className="grid grid-cols-3 gap-3">
                  {club.recentAdventures.map((adv) => (
                    <div key={adv.name} className="rounded-xl overflow-hidden aspect-square bg-[#ddd8cc] relative group">
                      <img src={adv.image} alt={adv.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2e2b26]/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="text-[#f6f3ee] text-xs font-semibold truncate">{adv.name}</p>
                        <p className="text-[#ddd8cc] text-[10px]">{adv.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured members */}
              <section>
                <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-4">Featured Members</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {club.members.slice(0, 4).map((member) => (
                    <div key={member.username} className="flex items-center gap-3 bg-white border border-[#ede9e0] rounded-xl p-4">
                      <img src={member.avatar} alt={member.name} className="w-11 h-11 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <Link to={`/explorer/${member.username}`} className="font-semibold text-[#2e2b26] text-sm hover:text-[#2a4d0f] transition-colors truncate block">{member.name}</Link>
                        <p className="text-[#8a8278] text-xs">{member.location} · {member.adventures} adventures</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${roleColors[member.role]}`}>{member.role}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Stats sidebar */}
            <div className="space-y-4">
              <div className="bg-white border border-[#ede9e0] rounded-xl p-4">
                <h3 className="font-display font-bold text-[#2e2b26] text-base mb-4">Club Statistics</h3>
                {[
                  { label: "Total Members", value: memberCount.toLocaleString() },
                  { label: "Adventures Completed", value: club.adventures },
                  { label: "Destinations Explored", value: club.destinations },
                  { label: "Founded", value: club.founded },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2.5 border-b border-[#f6f3ee] last:border-0 text-sm">
                    <span className="text-[#8a8278]">{label}</span>
                    <span className="font-semibold text-[#2e2b26]">{value}</span>
                  </div>
                ))}
              </div>
              {club.website && (
                <div className="bg-[#f6f3ee] border border-[#ede9e0] rounded-xl p-4 text-xs text-[#5a5549]">
                  <p className="font-semibold text-[#2e2b26] mb-1">Club URL</p>
                  <p className="text-[#2a4d0f] font-medium">{club.website}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Members tab */}
        {tab === "members" && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-[#2e2b26]">Members ({memberCount.toLocaleString()})</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {club.members.map((member) => (
                <div key={member.username} className="bg-white border border-[#ede9e0] rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <Link to={`/explorer/${member.username}`} className="font-display font-bold text-[#2e2b26] text-base hover:text-[#2a4d0f] transition-colors truncate block">{member.name}</Link>
                      <p className="text-[#8a8278] text-xs">{member.location}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${roleColors[member.role]}`}>{member.role}</span>
                  </div>
                  <div className="flex gap-3 text-xs text-[#5a5549] border-t border-[#f6f3ee] pt-3">
                    <span>🥾 {member.adventures} adventures</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events tab */}
        {tab === "events" && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-[#2e2b26]">Events</h2>
              <Link to="/events" className="text-sm font-semibold text-[#2a4d0f] hover:underline">View all events →</Link>
            </div>
            {events.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-[#ddd8cc] rounded-xl">
                <div className="text-4xl mb-3">📅</div>
                <p className="text-[#5a5549]">No events yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`} className="group block bg-white border border-[#ede9e0] rounded-xl overflow-hidden hover:border-[#2a4d0f]/40 hover:shadow-md transition-all">
                    <div className="flex">
                      <div className="w-32 h-32 flex-shrink-0 overflow-hidden bg-[#ddd8cc]">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-display font-bold text-[#2e2b26] text-lg group-hover:text-[#2a4d0f] transition-colors">{event.title}</h3>
                            <p className="text-[#8a8278] text-xs mt-0.5">📅 {event.dates}</p>
                            <p className="text-[#5a5549] text-xs mt-1">⛰ {event.destination} · 🥾 {event.difficulty}</p>
                            <p className="text-[#5a5549] text-xs mt-1">👥 {event.currentParticipants}/{event.maxParticipants} participants</p>
                          </div>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            event.status === "upcoming" ? "bg-[#2a4d0f]/10 text-[#2a4d0f]" :
                            event.status === "completed" ? "bg-[#f6f3ee] text-[#8a8278] border border-[#ddd8cc]" :
                            "bg-amber-100 text-amber-800"
                          }`}>
                            {event.status === "upcoming" ? "Upcoming" : event.status === "completed" ? "Completed" : "Ongoing"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Other tabs placeholder */}
        {(tab === "adventures" || tab === "tripreports" || tab === "gallery" || tab === "about") && (
          <div className="mb-12 text-center py-16 border border-dashed border-[#ddd8cc] rounded-xl">
            <div className="text-4xl mb-3">
              {tab === "gallery" ? "📷" : tab === "about" ? "📖" : tab === "adventures" ? "🥾" : "📝"}
            </div>
            <p className="font-display text-xl font-bold text-[#2e2b26] mb-1 capitalize">{tab}</p>
            {tab === "about" ? (
              <p className="text-[#5a5549] text-sm max-w-lg mx-auto leading-relaxed px-4">{club.description}</p>
            ) : (
              <p className="text-[#8a8278] text-sm">Content loading…</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
