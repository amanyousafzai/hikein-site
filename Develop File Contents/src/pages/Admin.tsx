import { useState } from "react";
import { destinations, explorers } from "../data/mock";

type Section = "dashboard" | "destinations" | "explorers" | "adventures" | "achievements" | "verification" | "analytics";

const pendingVerifications = [
  {
    id: "v1",
    type: "Verified Guide",
    applicant: { name: "Zara Khan", username: "zara-khan", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&auto=format" },
    submitted: "Sep 8, 2026",
    status: "Pending" as const,
    motivation: "I have been guiding groups in Swat for 6 years. Applying to expand reach via HikeIN.",
    evidence: ["PTA License", "First Aid Certificate", "2 references"],
    history: "12 adventures logged, 3 trip reports, Swat region active.",
  },
  {
    id: "v2",
    type: "Verified Achievement",
    applicant: { name: "Kamran Shah", username: "kamran-shah", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format" },
    submitted: "Sep 6, 2026",
    status: "Under Review" as const,
    motivation: "Completed 100 Lakes of Pakistan over 8 years. Attaching full adventure history and photos.",
    evidence: ["100 adventure logs", "GPS photos (selected)", "Trip reports (4)"],
    history: "210 adventures logged, 31 trip reports, Skardu/GB active.",
  },
  {
    id: "v3",
    type: "Verified Explorer",
    applicant: { name: "Sara Ahmed", username: "sara-ahmed", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format" },
    submitted: "Sep 5, 2026",
    status: "Pending" as const,
    motivation: "Active explorer since 2021. Verified identity for community trust.",
    evidence: ["CNIC copy", "Social media link", "1 reference"],
    history: "45 adventures logged, 2 trip reports, Islamabad/KPK active.",
  },
  {
    id: "v4",
    type: "Verified Club",
    applicant: { name: "Aman Hiking Club", username: "aman-hiking-club", avatar: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=80&h=80&fit=crop&auto=format" },
    submitted: "Sep 3, 2026",
    status: "Approved" as const,
    motivation: "Active club since 2018 with 47 members. Applying for verified status.",
    evidence: ["Club founding document", "Member list", "Event history"],
    history: "Club with 47 members, 23 events organized.",
  },
  {
    id: "v5",
    type: "Verified Guide",
    applicant: { name: "Ali Nawaz", username: "ali-nawaz", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" },
    submitted: "Aug 29, 2026",
    status: "Rejected" as const,
    motivation: "Applied as guide with 2 years experience.",
    evidence: ["No certifications uploaded"],
    history: "8 adventures logged, no trip reports.",
  },
];

const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800",
  "Under Review": "bg-blue-100 text-blue-800",
  Approved: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-red-100 text-red-800",
  "More Info": "bg-purple-100 text-purple-800",
};

export default function Admin() {
  const [section, setSection] = useState<Section>("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [verifFilter, setVerifFilter] = useState<string>("All");
  const [selectedVerif, setSelectedVerif] = useState<string | null>(null);
  const [verifStatuses, setVerifStatuses] = useState<Record<string, string>>(
    Object.fromEntries(pendingVerifications.map((v) => [v.id, v.status]))
  );
  const [confirmAction, setConfirmAction] = useState<{ id: string; action: string } | null>(null);
  const [moreInfoNote, setMoreInfoNote] = useState("");

  const navItems: { id: Section; icon: string; label: string }[] = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "destinations", icon: "🗺", label: "Destinations" },
    { id: "explorers", icon: "👥", label: "Explorers" },
    { id: "adventures", icon: "🥾", label: "Adventures" },
    { id: "achievements", icon: "🏆", label: "Achievements" },
    { id: "verification", icon: "🛡", label: "Verification" },
    { id: "analytics", icon: "📈", label: "Analytics" },
  ];

  const verifFilters = ["All", "Pending", "Under Review", "More Info", "Approved", "Rejected"];

  const filteredVerif = pendingVerifications.filter((v) =>
    verifFilter === "All" || verifStatuses[v.id] === verifFilter
  );

  const selectedApp = pendingVerifications.find((v) => v.id === selectedVerif);

  const handleVerifAction = (id: string, action: "Approved" | "Rejected" | "Under Review") => {
    setVerifStatuses({ ...verifStatuses, [id]: action });
    setConfirmAction(null);
    setSelectedVerif(null);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-[#2e2b26] border-r border-[#5a5549]/30">
        <div className="p-5 border-b border-[#5a5549]/30">
          <p className="text-[#f6f3ee] text-xs font-semibold uppercase tracking-widest">Admin Panel</p>
        </div>
        <nav className="p-3 flex-1">
          {navItems.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => { setSection(id); setShowForm(false); setSelectedVerif(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors ${
                section === id
                  ? "bg-[#2a4d0f] text-[#f6f3ee]"
                  : "text-[#8a8278] hover:text-[#f6f3ee] hover:bg-[#5a5549]/30"
              }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile tab row */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-[#2e2b26] border-t border-[#5a5549]/30 flex overflow-x-auto">
        {navItems.map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => setSection(id)}
            className={`flex-shrink-0 flex flex-col items-center px-4 py-2 text-xs gap-0.5 ${
              section === id ? "text-[#3a6b18]" : "text-[#8a8278]"
            }`}
          >
            <span className="text-base">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[#f6f3ee]">

        {/* Dashboard */}
        {section === "dashboard" && (
          <div className="p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-6">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Users", value: "214", icon: "👥", trend: "+12 this week" },
                { label: "Total Adventures", value: "1,048", icon: "🥾", trend: "+87 this month" },
                { label: "Total Destinations", value: "6", icon: "🗺", trend: "Active" },
                { label: "Pending Reviews", value: "3", icon: "🛡", trend: "Needs review" },
              ].map(({ label, value, icon, trend }) => (
                <div key={label} className="bg-white border border-[#ede9e0] rounded-xl p-5">
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="font-display text-3xl font-bold text-[#2e2b26]">{value}</div>
                  <div className="text-[#8a8278] text-xs mt-1">{label}</div>
                  <div className="text-[#2a4d0f] text-xs font-medium mt-1">{trend}</div>
                </div>
              ))}
            </div>
            <div className="bg-white border border-[#ede9e0] rounded-xl p-5">
              <h3 className="font-semibold text-[#2e2b26] mb-4 text-sm">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { msg: "Rafi Khan added an adventure to Kundol Lake", time: "2h ago" },
                  { msg: "Verification: Zara Khan applied as Outdoor Guide", time: "4h ago" },
                  { msg: "New user Sara Ahmed created an explorer profile", time: "5h ago" },
                  { msg: "Bilal Hussain added 3 adventures", time: "1d ago" },
                  { msg: "New destination submission: Ushu Forest", time: "2d ago" },
                ].map(({ msg, time }, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm border-b border-[#f6f3ee] pb-3 last:border-0 last:pb-0">
                    <span className="text-[#2a4d0f] mt-0.5">•</span>
                    <span className="text-[#5a5549] flex-1">{msg}</span>
                    <span className="text-[#8a8278] text-xs whitespace-nowrap">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Destinations */}
        {section === "destinations" && (
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-[#2e2b26]">Destinations</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-[#2a4d0f] text-[#f6f3ee] text-sm font-semibold px-4 py-2 rounded hover:bg-[#3a6b18] transition-colors"
              >
                {showForm ? "← Back to List" : "+ Add Destination"}
              </button>
            </div>
            {showForm ? (
              <div className="bg-white border border-[#ede9e0] rounded-xl p-6 max-w-2xl">
                <h3 className="font-display font-bold text-[#2e2b26] text-xl mb-6">Add New Destination</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Name", placeholder: "Kundol Lake" },
                    { label: "Slug", placeholder: "kundol-lake" },
                    { label: "Country", placeholder: "Pakistan" },
                    { label: "Province", placeholder: "Khyber Pakhtunkhwa" },
                    { label: "District", placeholder: "Swat" },
                    { label: "Region / Valley", placeholder: "Swat Valley" },
                    { label: "Elevation", placeholder: "3,600m" },
                    { label: "Latitude", placeholder: "35.1234" },
                    { label: "Longitude", placeholder: "72.5678" },
                  ].map(({ label, placeholder }) => (
                    <div key={label}>
                      <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-1.5">{label}</label>
                      <input
                        placeholder={placeholder}
                        className="w-full bg-[#f6f3ee] border border-[#ddd8cc] text-[#2e2b26] px-3 py-2.5 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]"
                      />
                    </div>
                  ))}
                  {[
                    { label: "Type", options: ["Lake", "Peak", "Hike", "Meadow"] },
                    { label: "Difficulty", options: ["Easy", "Moderate", "Strenuous", "Technical"] },
                    { label: "Status", options: ["Active", "Draft", "Pending Review"] },
                  ].map(({ label, options }) => (
                    <div key={label}>
                      <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-1.5">{label}</label>
                      <select className="w-full bg-[#f6f3ee] border border-[#ddd8cc] text-[#2e2b26] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]">
                        {options.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#2e2b26] uppercase tracking-wide mb-1.5">Short Description</label>
                    <textarea rows={2} className="w-full bg-[#f6f3ee] border border-[#ddd8cc] text-[#2e2b26] px-3 py-2.5 rounded-lg text-sm placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f] resize-none" placeholder="Brief description..." />
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#3a6b18] transition-colors text-sm">Save Destination</button>
                  <button onClick={() => setShowForm(false)} className="border border-[#ddd8cc] text-[#5a5549] font-medium px-5 py-2.5 rounded-lg text-sm hover:border-[#2a4d0f]/40 transition-colors">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#ede9e0] rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#ede9e0] bg-[#f6f3ee]">
                      {["Image", "Name", "Type", "Location", "Elevation", "Status", "Actions"].map((h) => (
                        <th key={h} className="text-left text-[#8a8278] text-xs font-semibold uppercase tracking-wide px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {destinations.map((dest) => (
                      <tr key={dest.id} className="border-b border-[#f6f3ee] hover:bg-[#f6f3ee]/50 transition-colors">
                        <td className="px-4 py-3"><img src={dest.image} alt={dest.name} className="w-10 h-10 rounded object-cover" /></td>
                        <td className="px-4 py-3 font-semibold text-[#2e2b26]">{dest.name}</td>
                        <td className="px-4 py-3 text-[#5a5549]">{dest.type}</td>
                        <td className="px-4 py-3 text-[#5a5549] text-xs">{dest.location.split(",")[0]}</td>
                        <td className="px-4 py-3 text-[#5a5549]">{dest.elevation}</td>
                        <td className="px-4 py-3"><span className="bg-[#2a4d0f]/10 text-[#2a4d0f] text-xs font-semibold px-2 py-0.5 rounded">Active</span></td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="text-xs text-[#5a5549] hover:text-[#2e2b26] font-medium">Edit</button>
                            <button className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Verification Center */}
        {section === "verification" && (
          <div className="p-6 md:p-8 flex gap-6">
            {/* List */}
            <div className={`flex-1 ${selectedVerif ? "hidden lg:block max-w-sm" : ""}`}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-2xl font-bold text-[#2e2b26]">Verification Center</h2>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">
                  {pendingVerifications.filter((v) => verifStatuses[v.id] === "Pending").length} pending
                </span>
              </div>

              {/* Status filter */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {verifFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setVerifFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      verifFilter === f ? "bg-[#2a4d0f] text-[#f6f3ee]" : "bg-white border border-[#ddd8cc] text-[#5a5549] hover:border-[#2a4d0f]/40"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {filteredVerif.length === 0 ? (
                  <div className="text-center py-12 text-[#8a8278] text-sm">No applications in this category</div>
                ) : filteredVerif.map((v) => {
                  const status = verifStatuses[v.id];
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVerif(v.id === selectedVerif ? null : v.id)}
                      className={`w-full text-left bg-white border rounded-xl p-4 hover:border-[#2a4d0f]/40 transition-all ${
                        selectedVerif === v.id ? "border-[#2a4d0f] ring-2 ring-[#2a4d0f]/10" : "border-[#ede9e0]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={v.applicant.avatar} alt={v.applicant.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[#2e2b26] font-semibold text-sm truncate">{v.applicant.name}</p>
                          <p className="text-[#8a8278] text-xs">{v.type}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${statusColors[status] ?? "bg-gray-100 text-gray-700"}`}>
                          {status}
                        </span>
                      </div>
                      <p className="text-[#8a8278] text-[10px] mt-1.5 pl-12">Submitted {v.submitted}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail */}
            {selectedApp && (
              <div className="flex-1 min-w-0">
                <div className="bg-white border border-[#ede9e0] rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className="p-6 border-b border-[#ede9e0]">
                    <div className="flex items-start gap-4">
                      <img src={selectedApp.applicant.avatar} alt={selectedApp.applicant.name} className="w-14 h-14 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-display text-xl font-bold text-[#2e2b26]">{selectedApp.applicant.name}</h3>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[verifStatuses[selectedApp.id]] ?? "bg-gray-100 text-gray-700"}`}>
                            {verifStatuses[selectedApp.id]}
                          </span>
                        </div>
                        <p className="text-[#8a8278] text-xs mt-0.5">@{selectedApp.applicant.username} · {selectedApp.type}</p>
                        <p className="text-[#8a8278] text-[10px] mt-1">Submitted {selectedApp.submitted}</p>
                      </div>
                      <button onClick={() => setSelectedVerif(null)} className="text-[#8a8278] hover:text-[#2e2b26] text-xl flex-shrink-0 lg:hidden">✕</button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-5">
                    <div>
                      <p className="text-[#8a8278] text-xs font-semibold uppercase tracking-wide mb-2">Explorer History</p>
                      <p className="text-[#5a5549] text-sm bg-[#f6f3ee] rounded-xl p-3">{selectedApp.history}</p>
                    </div>
                    <div>
                      <p className="text-[#8a8278] text-xs font-semibold uppercase tracking-wide mb-2">Motivation</p>
                      <p className="text-[#5a5549] text-sm bg-[#f6f3ee] rounded-xl p-3">{selectedApp.motivation}</p>
                    </div>
                    <div>
                      <p className="text-[#8a8278] text-xs font-semibold uppercase tracking-wide mb-2">Evidence Submitted</p>
                      <ul className="space-y-1.5">
                        {selectedApp.evidence.map((e) => (
                          <li key={e} className="flex items-center gap-2 text-sm text-[#5a5549] bg-[#f6f3ee] rounded-lg px-3 py-2">
                            <span className="text-[#2a4d0f]">📎</span>
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Request More Info */}
                    <div>
                      <p className="text-[#8a8278] text-xs font-semibold uppercase tracking-wide mb-2">Request More Info</p>
                      <textarea
                        value={moreInfoNote}
                        onChange={(e) => setMoreInfoNote(e.target.value)}
                        rows={2}
                        className="w-full border border-[#ddd8cc] bg-white rounded-xl px-4 py-3 text-sm text-[#2e2b26] placeholder:text-[#8a8278] focus:outline-none focus:ring-2 focus:ring-[#2a4d0f]/30 resize-none"
                        placeholder="Describe what additional information or evidence is needed..."
                      />
                      <button
                        onClick={() => { handleVerifAction(selectedApp.id, "Under Review"); setMoreInfoNote(""); }}
                        className="mt-2 text-xs text-purple-700 font-semibold bg-purple-50 border border-purple-200 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        Send Request
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  {verifStatuses[selectedApp.id] !== "Approved" && verifStatuses[selectedApp.id] !== "Rejected" && (
                    <div className="p-6 border-t border-[#ede9e0] flex gap-3 flex-wrap">
                      <button
                        onClick={() => setConfirmAction({ id: selectedApp.id, action: "Approved" })}
                        className="bg-[#2a4d0f] text-[#f6f3ee] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#3a6b18] transition-colors text-sm"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => setConfirmAction({ id: selectedApp.id, action: "Rejected" })}
                        className="bg-red-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-red-700 transition-colors text-sm"
                      >
                        ✕ Reject
                      </button>
                      <button
                        onClick={() => handleVerifAction(selectedApp.id, "Under Review")}
                        className="border border-[#ddd8cc] text-[#5a5549] font-medium px-5 py-2.5 rounded-xl hover:border-[#2a4d0f]/40 transition-colors text-sm"
                      >
                        Mark Under Review
                      </button>
                    </div>
                  )}

                  {(verifStatuses[selectedApp.id] === "Approved" || verifStatuses[selectedApp.id] === "Rejected") && (
                    <div className={`p-5 border-t border-[#ede9e0] text-center text-sm font-semibold ${verifStatuses[selectedApp.id] === "Approved" ? "text-[#2a4d0f] bg-emerald-50" : "text-red-700 bg-red-50"}`}>
                      This application has been {verifStatuses[selectedApp.id].toLowerCase()}.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics */}
        {section === "analytics" && (
          <div className="p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-6">Platform Analytics</h2>

            {/* Top stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Explorers", value: "214", icon: "👥", sub: "+12 this week" },
                { label: "Adventures Logged", value: "1,048", icon: "🥾", sub: "+87 this month" },
                { label: "Destinations", value: "6", icon: "📍", sub: "2 pending review" },
                { label: "Trip Reports", value: "3", icon: "📝", sub: "Community knowledge" },
                { label: "Clubs", value: "3", icon: "👥", sub: "1 verified" },
                { label: "Active Guides", value: "3", icon: "★", sub: "All verified" },
                { label: "Expeditions", value: "3", icon: "🏔", sub: "Upcoming" },
                { label: "Verification Queue", value: "3", icon: "🛡", sub: "Pending review" },
              ].map(({ label, value, icon, sub }) => (
                <div key={label} className="bg-white border border-[#ede9e0] rounded-xl p-4">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="font-display text-2xl font-bold text-[#2e2b26]">{value}</div>
                  <div className="text-[#8a8278] text-xs mt-0.5">{label}</div>
                  <div className="text-[#2a4d0f] text-[10px] font-medium mt-1">{sub}</div>
                </div>
              ))}
            </div>

            {/* Most explored destinations */}
            <div className="bg-white border border-[#ede9e0] rounded-xl p-6 mb-6">
              <h3 className="font-display text-lg font-bold text-[#2e2b26] mb-4">Most Explored Destinations</h3>
              <div className="space-y-3">
                {destinations.map((dest, i) => {
                  const count = [48, 41, 38, 32, 28, 22][i] ?? 10;
                  const max = 48;
                  return (
                    <div key={dest.id} className="flex items-center gap-4">
                      <span className="text-[#8a8278] text-xs w-4 text-right">{i + 1}</span>
                      <img src={dest.image} alt={dest.name} className="w-8 h-8 rounded object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[#2e2b26] text-xs font-semibold">{dest.name}</span>
                          <span className="text-[#8a8278] text-xs">{count} adventures</span>
                        </div>
                        <div className="w-full bg-[#ede9e0] rounded-full h-1.5">
                          <div className="bg-[#2a4d0f] h-1.5 rounded-full" style={{ width: `${(count / max) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Regions + Active explorers side by side */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#ede9e0] rounded-xl p-6">
                <h3 className="font-display text-lg font-bold text-[#2e2b26] mb-4">Active Regions</h3>
                <div className="space-y-2">
                  {[
                    { region: "Swat Valley", count: 62, pct: 90 },
                    { region: "Gilgit-Baltistan", count: 41, pct: 60 },
                    { region: "Kaghan / Naran", count: 28, pct: 40 },
                    { region: "Azad Kashmir", count: 18, pct: 26 },
                    { region: "Chitral", count: 12, pct: 18 },
                  ].map(({ region, count, pct }) => (
                    <div key={region}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#5a5549] font-medium">{region}</span>
                        <span className="text-[#8a8278]">{count} adventures</span>
                      </div>
                      <div className="w-full bg-[#ede9e0] rounded-full h-1.5">
                        <div className="bg-[#3a6b18] h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#ede9e0] rounded-xl p-6">
                <h3 className="font-display text-lg font-bold text-[#2e2b26] mb-4">Top Explorers</h3>
                <div className="space-y-3">
                  {explorers.slice(0, 5).map((e, i) => (
                    <div key={e.id} className="flex items-center gap-3">
                      <span className="text-[#8a8278] text-xs w-4 text-right">{i + 1}</span>
                      <img src={e.avatar} alt={e.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-[#2e2b26] text-xs font-semibold">{e.name}</p>
                        <p className="text-[#8a8278] text-[10px]">{e.adventures} adventures</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly growth placeholder */}
            <div className="mt-6 bg-white border border-[#ede9e0] rounded-xl p-6">
              <h3 className="font-display text-lg font-bold text-[#2e2b26] mb-3">Monthly Growth (2026)</h3>
              <div className="flex items-end gap-2 h-24">
                {[22, 28, 35, 41, 58, 72, 88, 94, 102].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#2a4d0f] rounded-t opacity-80 hover:opacity-100 transition-opacity relative group" style={{ height: `${(h / 102) * 100}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#2e2b26] text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap">{h} users</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((m) => (
                  <div key={m} className="flex-1 text-center text-[9px] text-[#8a8278]">{m}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Explorers / Adventures / Achievements placeholder */}
        {(section === "explorers" || section === "adventures" || section === "achievements") && (
          <div className="p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-[#2e2b26] mb-6 capitalize">{section}</h2>
            <div className="bg-white border border-[#ede9e0] rounded-xl p-10 text-center">
              <div className="text-4xl mb-3">🏗</div>
              <p className="font-display text-xl font-bold text-[#2e2b26] mb-1">Coming Soon</p>
              <p className="text-[#8a8278] text-sm">This section is being built.</p>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-[#2e2b26]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-7 shadow-2xl text-center">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl ${confirmAction.action === "Approved" ? "bg-emerald-100" : "bg-red-100"}`}>
              {confirmAction.action === "Approved" ? "✓" : "✕"}
            </div>
            <h3 className="font-display text-xl font-bold text-[#2e2b26] mb-2">
              {confirmAction.action === "Approved" ? "Approve Application?" : "Reject Application?"}
            </h3>
            <p className="text-[#5a5549] text-sm mb-6">
              {confirmAction.action === "Approved"
                ? "The applicant will receive their verified badge and a notification."
                : "The applicant will be notified of the rejection. This action can be reversed."}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmAction(null)} className="flex-1 border border-[#ddd8cc] text-[#5a5549] font-medium py-3 rounded-xl text-sm hover:border-[#2a4d0f]/40 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => handleVerifAction(confirmAction.id, confirmAction.action as "Approved" | "Rejected")}
                className={`flex-1 font-semibold py-3 rounded-xl text-sm text-white transition-colors ${confirmAction.action === "Approved" ? "bg-[#2a4d0f] hover:bg-[#3a6b18]" : "bg-red-600 hover:bg-red-700"}`}
              >
                Confirm {confirmAction.action === "Approved" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
