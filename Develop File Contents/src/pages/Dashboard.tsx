import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { destinations, achievements } from "../data/mock";
import { productApi } from "../lib/api";
import type { HikeRecord } from "../types/product";
import { ConfirmDialog, EmptyState, SkeletonCard } from "../components/ui/ProductStates";

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const [hikes, setHikes] = useState<HikeRecord[]>([]);
  const [loadingHikes, setLoadingHikes] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<HikeRecord | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoadingHikes(false);
      return;
    }
    productApi
      .getMe()
      .then((result) => setHikes(result.hikes.sort((a, b) => b.date.localeCompare(a.date))))
      .finally(() => setLoadingHikes(false));
  }, [user]);

  const totals = useMemo(
    () => ({
      hikes: hikes.filter((hike) => hike.status === "published").length,
      distance: hikes.reduce((sum, hike) => sum + hike.distanceKm, 0),
      elevation: hikes.reduce((sum, hike) => sum + hike.elevationGainM, 0),
      hours: Math.round(hikes.reduce((sum, hike) => sum + hike.durationMinutes, 0) / 60),
    }),
    [hikes],
  );

  async function removeHike() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await productApi.deleteHike(deleteTarget.id);
      setHikes((current) => current.filter((hike) => hike.id !== deleteTarget.id));
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  if (loading || loadingHikes) {
    return <div className="max-w-5xl mx-auto px-6 py-10 space-y-5"><SkeletonCard /><SkeletonCard /></div>;
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20">
        <EmptyState title="Your hiking history starts here" description="Sign in to record hikes, track progress, and build your permanent explorer profile." action={<Link to="/login" className="inline-block bg-forest text-cream font-semibold text-sm px-5 py-3 rounded-xl">Sign in to HikeIN</Link>} />
      </div>
    );
  }

  const firstName = profile?.name.split(" ")[0] ?? "Explorer";

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 pb-28 md:pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-9">
        <div>
          <p className="text-forest text-xs font-semibold uppercase tracking-widest">Activity dashboard</p>
          <h1 className="font-display text-4xl font-bold text-stone mt-2">Welcome back, {firstName}.</h1>
          <p className="text-stone-light text-sm mt-1">Your outdoor history, progress, and next milestones.</p>
        </div>
        <div className="flex gap-3">
          <Link to={`/explorer/${profile?.username}`} className="border border-cream-darker text-stone-mid text-sm font-semibold px-4 py-2.5 rounded-xl bg-white">View profile</Link>
          <Link to="/add-adventure" className="bg-forest text-cream text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-forest-light">Record a hike</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          [totals.hikes.toString(), "Published hikes"],
          [`${totals.distance.toFixed(1)} km`, "Distance"],
          [`${totals.elevation.toLocaleString()} m`, "Elevation gain"],
          [`${totals.hours} hrs`, "Time outside"],
        ].map(([value, label]) => (
          <div key={label} className="bg-white border border-cream-dark rounded-2xl p-5">
            <p className="font-display text-3xl font-bold text-stone">{value}</p>
            <p className="text-stone-light text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_20rem] gap-7">
        <section>
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-display text-2xl font-bold text-stone">Your hikes</h2><p className="text-stone-light text-sm">Published activities and private drafts.</p></div>
            <Link to="/add-adventure" className="text-forest text-sm font-semibold">Add new</Link>
          </div>
          {hikes.length === 0 ? (
            <EmptyState title="You have not recorded a hike yet" description="Record your first trail to begin your permanent outdoor history." action={<Link to="/add-adventure" className="text-forest font-semibold text-sm">Record your first hike</Link>} />
          ) : (
            <div className="space-y-3">
              {hikes.map((hike) => (
                <article key={hike.id} className="bg-white border border-cream-dark rounded-2xl p-4 flex gap-4">
                  <img src={hike.coverImage ?? destinations[0].image} alt="" className="size-20 md:size-24 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2"><span className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded ${hike.status === "published" ? "bg-forest/10 text-forest" : "bg-amber-100 text-amber-800"}`}>{hike.status}</span><span className="text-stone-light text-xs">{hike.visibility}</span></div>
                        <Link to={`/hike/${hike.id}`} className="font-display text-lg font-bold text-stone hover:text-forest block mt-1 truncate">{hike.title}</Link>
                        <p className="text-stone-light text-xs mt-0.5">{hike.location} · {new Date(hike.date).toLocaleDateString("en-PK")}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-stone-mid">
                      <span>{hike.distanceKm} km</span><span>{hike.elevationGainM} m gain</span><span>{Math.floor(hike.durationMinutes / 60)}h {hike.durationMinutes % 60}m</span>
                      <span className="md:ml-auto flex gap-3">
                        <Link to={`/hike/${hike.id}/edit`} className="text-forest font-semibold">Edit</Link>
                        <button onClick={() => setDeleteTarget(hike)} className="text-red-700 font-semibold">Delete</button>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-5">
          <div className="bg-stone text-cream rounded-2xl p-5">
            <p className="text-cream-darker text-xs uppercase tracking-widest font-semibold">Next milestone</p>
            <p className="font-display text-2xl font-bold mt-2">5 Hikes</p>
            <p className="text-cream-darker text-sm mt-1">{Math.max(0, 5 - totals.hikes)} more to unlock your next badge.</p>
            <div className="h-2 bg-white/10 rounded-full mt-4 overflow-hidden"><div className="h-full bg-forest-light rounded-full" style={{ width: `${Math.min(100, (totals.hikes / 5) * 100)}%` }} /></div>
          </div>
          <div className="bg-white border border-cream-dark rounded-2xl p-5">
            <p className="font-display font-bold text-stone">Achievement path</p>
            <div className="space-y-3 mt-4">
              {achievements.slice(0, 5).map((achievement, index) => (
                <div key={achievement.id} className="flex items-center gap-3"><span className={`size-9 rounded-full flex items-center justify-center ${index < totals.hikes ? "bg-forest/10" : "bg-cream text-stone-light"}`}>{achievement.icon}</span><span className="text-sm text-stone-mid flex-1">{achievement.label}</span><span className="text-xs text-forest font-bold">{index < totals.hikes ? "Earned" : "Locked"}</span></div>
              ))}
            </div>
          </div>
          <Link to="/explore" className="block bg-white border border-cream-dark rounded-2xl p-5 group">
            <p className="text-xs text-forest font-semibold uppercase tracking-wide">Discover next</p>
            <p className="font-display text-xl font-bold text-stone mt-1 group-hover:text-forest">Explore 98 destinations</p>
            <p className="text-stone-light text-sm mt-1">Find lakes, trails, and peaks across Pakistan.</p>
          </Link>
        </aside>
      </div>

      <ConfirmDialog open={Boolean(deleteTarget)} title="Delete this hike?" description={`"${deleteTarget?.title ?? "This hike"}" and its stored activity record will be removed. This cannot be undone.`} confirmLabel="Delete hike" busy={deleting} onCancel={() => setDeleteTarget(null)} onConfirm={removeHike} />
    </div>
  );
}
