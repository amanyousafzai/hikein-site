import { Link, NavLink, Outlet, useLocation } from "react-router";
import { useState, useRef, useEffect } from "react";
import { notifications } from "../data/community";
import { useAuth } from "../contexts/AuthContext";

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    function listener(e: MouseEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    }
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const createRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  useClickOutside(createRef, () => setCreateOpen(false));
  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(userRef, () => setUserOpen(false));

  useEffect(() => {
    setMobileMenuOpen(false);
    setCreateOpen(false);
    setNotifOpen(false);
    setUserOpen(false);
  }, [location.pathname]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { to: "/explore", label: "Explore" },
    { to: "/community", label: "Community" },
    { to: "/trip-reports", label: "Trip Reports" },
    { to: "/clubs", label: "Clubs" },
    { to: "/guides", label: "Guides" },
    { to: "/map", label: "Map" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f3ee] flex flex-col">
      {/* Desktop nav */}
      <header className="sticky top-0 z-50 bg-[#f6f3ee]/95 backdrop-blur border-b border-[#ddd8cc]">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#2a4d0f] rounded-sm flex items-center justify-center">
              <span className="text-[#f6f3ee] text-xs font-bold font-display">H</span>
            </div>
            <span className="font-display font-semibold text-[#2e2b26] text-lg tracking-tight">HikeIN</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-[#2a4d0f]" : "text-[#5a5549] hover:text-[#2e2b26]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            {/* Search */}
            <Link to="/search" className="p-2 text-[#8a8278] hover:text-[#2e2b26] transition-colors rounded-lg hover:bg-[#ede9e0]" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </Link>

            {user ? (
              <>
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setNotifOpen(!notifOpen); setCreateOpen(false); }}
                className="relative p-2 text-[#8a8278] hover:text-[#2e2b26] transition-colors rounded-lg hover:bg-[#ede9e0]"
                aria-label="Notifications"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#2a4d0f] text-[#f6f3ee] text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#ddd8cc] rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#f6f3ee]">
                    <span className="font-display font-bold text-[#2e2b26] text-sm">Notifications</span>
                    <Link to="/notifications" onClick={() => setNotifOpen(false)} className="text-xs text-[#2a4d0f] font-semibold hover:underline">View all</Link>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#f6f3ee]">
                    {notifications.slice(0, 5).map((n) => (
                      <div key={n.id} className={`flex items-start gap-3 px-4 py-3 ${!n.read ? "bg-[#2a4d0f]/3" : ""}`}>
                        {n.actor ? (
                          <img src={n.actor.avatar} alt={n.actor.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#f6f3ee] flex items-center justify-center text-base flex-shrink-0">{n.icon}</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[#2e2b26] text-xs leading-snug">{n.text}</p>
                          <p className="text-[#8a8278] text-[10px] mt-0.5">{n.timestamp}</p>
                        </div>
                        {!n.read && <div className="w-2 h-2 rounded-full bg-[#2a4d0f] flex-shrink-0 mt-1" />}
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-[#f6f3ee]">
                    <Link
                      to="/notifications"
                      onClick={() => setNotifOpen(false)}
                      className="block w-full text-center text-xs font-semibold text-[#2a4d0f] hover:underline"
                    >
                      See all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Create */}
            <div className="relative" ref={createRef}>
              <button
                onClick={() => { setCreateOpen(!createOpen); setNotifOpen(false); }}
                className="flex items-center gap-1.5 bg-[#2a4d0f] text-[#f6f3ee] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#3a6b18] transition-colors"
              >
                <span className="text-base leading-none">+</span>
                <span>Create</span>
              </button>

              {createOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#ddd8cc] rounded-xl shadow-xl overflow-hidden z-50">
                  {[
                    { to: "/add-adventure", icon: "🥾", label: "Add Adventure" },
                    { to: "/share-update", icon: "📣", label: "Share Update" },
                    { to: "/create-trip-report", icon: "📝", label: "Write Trip Report" },
                    { to: "/create-event", icon: "📅", label: "Create Event" },
                    { to: "/create-club", icon: "👥", label: "Create Club" },
                    { to: "/destinations/kundol-lake/contribute", icon: "🗺", label: "Submit Destination" },
                    { to: "/organizer-dashboard", icon: "🧭", label: "Organizer Dashboard" },
                  ].map(({ to, icon, label }) => (
                    <Link
                      key={label}
                      to={to}
                      onClick={() => setCreateOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#2e2b26] hover:bg-[#f6f3ee] transition-colors"
                    >
                      <span className="text-base">{icon}</span>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); setCreateOpen(false); }}
                className="w-9 h-9 rounded-full bg-[#2e2b26] flex items-center justify-center overflow-hidden ring-2 ring-transparent hover:ring-[#2a4d0f]/30 transition-all"
                aria-label="Open account menu"
              >
                <img
                  src={profile?.avatarUrl ?? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format"}
                  alt={profile?.name ?? "Profile"}
                  className="w-full h-full object-cover"
                />
              </button>
              {userOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#ddd8cc] rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-4 border-b border-[#f6f3ee]">
                    <p className="font-display font-bold text-[#2e2b26]">{profile?.name ?? "HikeIN Explorer"}</p>
                    <p className="text-[#8a8278] text-xs mt-0.5">@{profile?.username ?? "explorer"}</p>
                  </div>
                  <div className="p-2">
                    <Link to={`/explorer/${profile?.username ?? "aman-ali"}`} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#2e2b26] hover:bg-[#f6f3ee]">View profile</Link>
                    <Link to="/dashboard" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#2e2b26] hover:bg-[#f6f3ee]">Activity dashboard</Link>
                    <Link to="/settings" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#2e2b26] hover:bg-[#f6f3ee]">Settings & privacy</Link>
                  </div>
                  <div className="p-2 border-t border-[#f6f3ee]">
                    <button onClick={() => signOut()} className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50">Sign out</button>
                  </div>
                </div>
              )}
            </div>
              </>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link to="/login" className="text-sm font-semibold text-[#5a5549] px-3 py-2 hover:text-[#2a4d0f]">Sign in</Link>
                <Link to="/register" className="bg-[#2a4d0f] text-[#f6f3ee] text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#3a6b18] transition-colors">Join HikeIN</Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden ml-auto p-2 text-[#2e2b26]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              {mobileMenuOpen ? (
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#f6f3ee] border-t border-[#ddd8cc] px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-[#2e2b26]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/settings" className="text-sm font-medium text-[#5a5549]">Settings & Privacy</Link>
                <button onClick={() => signOut()} className="text-left text-sm font-medium text-red-700">Sign out</button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link to="/login" className="border border-[#ddd8cc] text-center text-sm font-semibold text-[#2e2b26] py-2.5 rounded-lg">Sign in</Link>
                <Link to="/register" className="bg-[#2a4d0f] text-center text-sm font-semibold text-[#f6f3ee] py-2.5 rounded-lg">Join HikeIN</Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#2e2b26] text-[#8a8278] mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[#3a6b18] rounded-sm flex items-center justify-center">
                <span className="text-[#f6f3ee] text-xs font-bold font-display">H</span>
              </div>
              <span className="font-display font-semibold text-[#f6f3ee] text-base tracking-tight">HikeIN</span>
            </div>
            <p className="text-xs leading-relaxed">Pakistan's permanent digital record of outdoor exploration and adventure.</p>
          </div>
          <div>
            <h4 className="text-[#f6f3ee] text-xs font-semibold uppercase tracking-widest mb-3">Explore</h4>
            <ul className="space-y-2 text-xs">
              {["Lakes", "Peaks", "Hikes", "Meadows"].map((t) => (
                <li key={t}><Link to="/explore" className="hover:text-[#f6f3ee] transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[#f6f3ee] text-xs font-semibold uppercase tracking-widest mb-3">Community</h4>
            <ul className="space-y-2 text-xs">
              {[["Feed", "/community"], ["Clubs", "/clubs"], ["Events", "/events"], ["Trip Reports", "/trip-reports"], ["Explorers", "/explorers"], ["Guides", "/guides"], ["Expeditions", "/expeditions"]].map(([t, href]) => (
                <li key={t}><Link to={href} className="hover:text-[#f6f3ee] transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[#f6f3ee] text-xs font-semibold uppercase tracking-widest mb-3">Tools</h4>
            <ul className="space-y-2 text-xs">
              {[["Explorer Map", "/map"], ["Statistics", "/statistics"], ["Collections", "/collections"], ["Search", "/search"], ["Verification", "/verification"], ["Sign In", "/login"]].map(([t, href]) => (
                <li key={t}><Link to={href} className="hover:text-[#f6f3ee] transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#5a5549]/30 max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-xs">
          <span>© 2026 HikeIN. All rights reserved.</span>
          <span>Built for Pakistan's explorers.</span>
        </div>
      </footer>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#f6f3ee] border-t border-[#ddd8cc] z-40 flex">
        {[
          { to: "/", icon: "⌂", label: "Home" },
          { to: "/explore", icon: "◇", label: "Discover" },
          { to: user ? "/add-adventure" : "/login", icon: "＋", label: "Record", primary: true },
          { to: user ? "/notifications" : "/community", icon: "○", label: user ? "Alerts" : "Community" },
          { to: user ? `/explorer/${profile?.username ?? "aman-ali"}` : "/login", icon: "□", label: user ? "Profile" : "Sign in" },
        ].map(({ to, icon, label, primary }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 gap-0.5 text-xs font-medium transition-colors ${
                primary
                  ? "text-[#f6f3ee] bg-[#2a4d0f] mx-2 my-1.5 rounded-lg"
                  : isActive
                  ? "text-[#2a4d0f]"
                  : "text-[#8a8278]"
              }`
            }
          >
            <span className="text-base leading-none">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
