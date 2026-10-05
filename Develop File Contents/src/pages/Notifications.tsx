import { useState } from "react";
import { Link } from "react-router";
import { notifications } from "../data/community";
import { productApi } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";

export default function Notifications() {
  const [items, setItems] = useState(notifications);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const unread = items.filter((n) => !n.read).length;

  async function markAllRead() {
    setItems(items.map((n) => ({ ...n, read: true })));
    if (user) {
      try {
        await productApi.markNotificationsRead();
      } catch {
        setMessage("Notifications were marked read on this device, but could not sync.");
      }
    }
  }

  const groups: { key: "today" | "week" | "earlier"; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "earlier", label: "Earlier" },
  ];

  return (
    <div className="max-w-xl mx-auto px-6 py-10 pb-24 md:pb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#2e2b26]">Notifications</h1>
          {unread > 0 && <p className="text-[#2a4d0f] text-sm font-medium mt-0.5">{unread} unread</p>}
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs font-semibold text-[#2a4d0f] hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      {message && <div className="mb-5 border border-amber-200 bg-amber-50 text-amber-900 rounded-xl px-4 py-3 text-sm">{message}</div>}

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#ede9e0] rounded-xl">
          <div className="text-4xl mb-3">🔔</div>
          <h3 className="font-display text-xl font-bold text-[#2e2b26] mb-1">No notifications</h3>
          <p className="text-[#8a8278] text-sm">You are all caught up.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map(({ key, label }) => {
            const groupItems = items.filter((n) => n.group === key);
            if (groupItems.length === 0) return null;
            return (
              <div key={key}>
                <h2 className="text-xs font-semibold text-[#8a8278] uppercase tracking-widest mb-3">{label}</h2>
                <div className="space-y-2">
                  {groupItems.map((notif) => (
                    <div
                      key={notif.id}
                      className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${
                        !notif.read
                          ? "bg-[#2a4d0f]/4 border-[#2a4d0f]/20"
                          : "bg-white border-[#ede9e0]"
                      }`}
                    >
                      {notif.actor ? (
                        <Link to={`/explorer/${notif.actor.username}`} className="flex-shrink-0">
                          <img
                            src={notif.actor.avatar}
                            alt={notif.actor.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </Link>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#2a4d0f]/10 flex items-center justify-center text-xl flex-shrink-0">
                          {notif.icon}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[#2e2b26] text-sm leading-snug">
                          <span className="mr-1">{notif.actor ? "" : notif.icon}</span>
                          {notif.text}
                        </p>
                        <p className="text-[#8a8278] text-xs mt-1">{notif.timestamp}</p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-[#2a4d0f] flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
