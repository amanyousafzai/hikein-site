import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";

const adventuresByYear = [
  { year: "2019", count: 4 },
  { year: "2020", count: 8 },
  { year: "2021", count: 12 },
  { year: "2022", count: 18 },
  { year: "2023", count: 22 },
  { year: "2024", count: 31 },
  { year: "2025", count: 28 },
];

const destTypes = [
  { name: "Lakes", value: 42, color: "#2a4d0f" },
  { name: "Peaks", value: 18, color: "#3a6b18" },
  { name: "Meadows", value: 24, color: "#5a5549" },
  { name: "Treks", value: 16, color: "#8a8278" },
];

const monthlyActivity = [
  { month: "Jan", count: 2 },
  { month: "Feb", count: 1 },
  { month: "Mar", count: 3 },
  { month: "Apr", count: 5 },
  { month: "May", count: 8 },
  { month: "Jun", count: 14 },
  { month: "Jul", count: 18 },
  { month: "Aug", count: 16 },
  { month: "Sep", count: 12 },
  { month: "Oct", count: 7 },
  { month: "Nov", count: 3 },
  { month: "Dec", count: 1 },
];

const difficultyData = [
  { difficulty: "Easy", count: 28 },
  { difficulty: "Moderate", count: 62 },
  { difficulty: "Hard", count: 24 },
  { difficulty: "Technical", count: 9 },
];

const COLORS = ["#2a4d0f", "#3a6b18", "#5a5549", "#8a8278"];

export default function Statistics() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-[#2e2b26] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#3a6b18] text-xs font-semibold uppercase tracking-widest mb-3">Your Journey</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#f6f3ee] mb-3">Statistics</h1>
          <p className="text-[#8a8278] text-lg max-w-xl">A complete picture of your outdoor exploration history.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: "🥾", value: "123", label: "Total Adventures", sub: "+28 this year" },
            { icon: "💧", value: "42", label: "Lakes Visited", sub: "Most active: Swat" },
            { icon: "⛰", value: "18", label: "Peaks Reached", sub: "Highest: 4,800m" },
            { icon: "🌿", value: "24", label: "Meadows Explored", sub: "Across 4 regions" },
          ].map(({ icon, value, label, sub }) => (
            <div key={label} className="bg-white border border-[#ede9e0] rounded-2xl p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <p className="font-display text-3xl font-bold text-[#2e2b26]">{value}</p>
              <p className="text-[#5a5549] text-xs font-medium mt-0.5">{label}</p>
              <p className="text-[#8a8278] text-[10px] mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Secondary stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: "Highest Elevation", value: "4,800m", sub: "Falak Sar, 2024" },
            { label: "Regions Explored", value: "6", sub: "Swat, GB, Kaghan, AJK, KPK, Punjab" },
            { label: "Most Active Month", value: "July", sub: "18 adventures on average" },
            { label: "This Year", value: "28", sub: "Adventures in 2025" },
            { label: "Destinations Visited", value: "47", sub: "Out of 200+ tracked" },
            { label: "Total Elevation Gain", value: "~86,000m", sub: "Estimated (placeholder)" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-[#f6f3ee] border border-[#ede9e0] rounded-xl px-5 py-4">
              <p className="text-[#8a8278] text-[10px] uppercase tracking-wide mb-1">{label}</p>
              <p className="font-display text-2xl font-bold text-[#2e2b26]">{value}</p>
              <p className="text-[#8a8278] text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Adventures by Year */}
          <div className="bg-white border border-[#ede9e0] rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-[#2e2b26] mb-1">Adventures by Year</h2>
            <p className="text-[#8a8278] text-xs mb-6">Your outdoor activity over time</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={adventuresByYear} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ede9e0" />
                <XAxis dataKey="year" tick={{ fill: "#8a8278", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#8a8278", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #ede9e0", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#2e2b26", fontWeight: 600 }}
                />
                <Bar dataKey="count" fill="#2a4d0f" radius={[4, 4, 0, 0]} name="Adventures" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Destination Types */}
          <div className="bg-white border border-[#ede9e0] rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-[#2e2b26] mb-1">Destination Types</h2>
            <p className="text-[#8a8278] text-xs mb-6">How your adventures break down</p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={destTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {destTypes.map((entry, i) => (
                    <Cell key={entry.name} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #ede9e0", borderRadius: 8, fontSize: 12 }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(v) => <span style={{ color: "#5a5549", fontSize: 11 }}>{v}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Activity */}
          <div className="bg-white border border-[#ede9e0] rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-[#2e2b26] mb-1">Monthly Activity</h2>
            <p className="text-[#8a8278] text-xs mb-6">Average adventures per month across all years</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyActivity} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ede9e0" />
                <XAxis dataKey="month" tick={{ fill: "#8a8278", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#8a8278", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #ede9e0", borderRadius: 8, fontSize: 12 }}
                />
                <Line type="monotone" dataKey="count" stroke="#2a4d0f" strokeWidth={2.5} dot={{ fill: "#2a4d0f", r: 4 }} name="Adventures" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Difficulty Breakdown */}
          <div className="bg-white border border-[#ede9e0] rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-[#2e2b26] mb-1">Difficulty Breakdown</h2>
            <p className="text-[#8a8278] text-xs mb-6">What level of challenge you seek</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={difficultyData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ede9e0" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#8a8278", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="difficulty" tick={{ fill: "#5a5549", fontSize: 11 }} axisLine={false} tickLine={false} width={65} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #ede9e0", borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="count" fill="#3a6b18" radius={[0, 4, 4, 0]} name="Adventures" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regions explored */}
        <div className="bg-white border border-[#ede9e0] rounded-2xl p-6 mb-8">
          <h2 className="font-display text-xl font-bold text-[#2e2b26] mb-1">Regions Explored</h2>
          <p className="text-[#8a8278] text-xs mb-6">How far your adventures have taken you</p>
          <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { region: "Swat", count: 42, pct: 85 },
              { region: "Gilgit-Baltistan", count: 28, pct: 56 },
              { region: "Kaghan", count: 18, pct: 36 },
              { region: "Azad Kashmir", count: 14, pct: 28 },
              { region: "Chitral", count: 12, pct: 24 },
              { region: "Skardu", count: 9, pct: 18 },
            ].map(({ region, count, pct }) => (
              <div key={region} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ede9e0" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke="#2a4d0f" strokeWidth="3"
                      strokeDasharray={`${pct} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#2e2b26] text-xs font-bold">{pct}%</span>
                  </div>
                </div>
                <p className="text-[#2e2b26] text-xs font-semibold">{region}</p>
                <p className="text-[#8a8278] text-[10px]">{count} adventures</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
