import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { productApi } from "../lib/api";
import type { HikeRecord, UserProfile } from "../types/product";
import { EmptyState, SkeletonCard } from "../components/ui/ProductStates";

export default function HikeDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [hike, setHike] = useState<HikeRecord | null>(null);
  const [owner, setOwner] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    productApi.getHike(id).then((result) => { setHike(result.hike); setOwner(result.owner); }).catch((reason) => setError(reason.message));
  }, [id]);

  if (error) return <div className="max-w-xl mx-auto px-6 py-20"><EmptyState title="Hike unavailable" description={error} action={<Link to="/community" className="text-forest font-semibold text-sm">Explore public activity</Link>} /></div>;
  if (!hike) return <div className="max-w-4xl mx-auto px-6 py-10"><SkeletonCard /></div>;

  const isOwner = user?.id === hike.userId;
  return (
    <div className="pb-24">
      <section className="relative h-[50vh] min-h-96 bg-stone overflow-hidden">
        {hike.coverImage && <img src={hike.coverImage} alt={hike.title} className="absolute inset-0 size-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 max-w-5xl mx-auto px-6 pb-10 text-cream">
          <p className="text-xs uppercase tracking-widest font-semibold text-cream-darker">{hike.difficulty} · {new Date(hike.date).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-2">{hike.title}</h1>
          <p className="text-cream-darker mt-2">{hike.location}</p>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-7 border-b border-cream-darker">
          <Link to={`/explorer/${owner?.username}`} className="flex items-center gap-3">
            <img src={owner?.avatarUrl} alt="" className="size-11 rounded-full object-cover" />
            <span><span className="block font-semibold text-stone">{owner?.name}</span><span className="block text-xs text-stone-light">@{owner?.username}</span></span>
          </Link>
          <div className="flex gap-2">
            {isOwner ? <Link to={`/hike/${hike.id}/edit`} className="border border-cream-darker text-stone font-semibold text-sm px-4 py-2.5 rounded-xl">Edit hike</Link> : <button onClick={async () => { if (!user) return; const next = !saved; setSaved(next); await productApi.toggleInteraction("save", hike.id, next); }} className="border border-cream-darker text-stone font-semibold text-sm px-4 py-2.5 rounded-xl">{saved ? "Saved" : "Save"}</button>}
            <button onClick={() => navigator.share?.({ title: hike.title, url: window.location.href })} className="bg-forest text-cream font-semibold text-sm px-4 py-2.5 rounded-xl">Share</button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-7">
          {[[`${hike.distanceKm} km`, "Distance"], [`${hike.elevationGainM} m`, "Elevation gain"], [`${Math.floor(hike.durationMinutes / 60)}h ${hike.durationMinutes % 60}m`, "Duration"], [hike.difficulty, "Difficulty"]].map(([value, label]) => <div key={label} className="bg-white border border-cream-dark rounded-xl p-4"><p className="font-display text-xl font-bold text-stone">{value}</p><p className="text-stone-light text-xs mt-1">{label}</p></div>)}
        </div>
        <div className="grid lg:grid-cols-[1fr_18rem] gap-10">
          <div><h2 className="font-display text-3xl font-bold text-stone">The hike</h2><p className="text-stone-mid leading-relaxed mt-4 whitespace-pre-line">{hike.description}</p>{hike.photoUrls.length > 1 && <div className="grid grid-cols-2 gap-3 mt-8">{hike.photoUrls.slice(1).map((url) => <img key={url} src={url} alt="" className="w-full aspect-square object-cover rounded-xl" />)}</div>}</div>
          <aside className="bg-white border border-cream-dark rounded-2xl p-5 h-fit"><p className="font-display font-bold text-stone">Trail details</p><dl className="mt-4 space-y-4 text-sm"><div><dt className="text-stone-light text-xs">Start</dt><dd className="text-stone font-medium">{hike.startPoint}</dd></div><div><dt className="text-stone-light text-xs">End</dt><dd className="text-stone font-medium">{hike.endPoint}</dd></div><div><dt className="text-stone-light text-xs">Visibility</dt><dd className="text-stone font-medium capitalize">{hike.visibility}</dd></div></dl><div className="mt-5 pt-5 border-t border-cream-dark"><p className="text-stone-light text-xs">Map-ready record</p><p className="text-stone-mid text-xs mt-1">Start, end, and coordinate fields support future verified GPS routes.</p></div></aside>
        </div>
      </div>
    </div>
  );
}
