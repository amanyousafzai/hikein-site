import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { productApi } from "../lib/api";
import type { HikeRecord } from "../types/product";
import { Alert, SkeletonCard } from "../components/ui/ProductStates";

export default function EditHike() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hike, setHike] = useState<HikeRecord | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) productApi.getHike(id).then((result) => setHike(result.hike)).catch((error) => setMessage(error.message));
  }, [id]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!hike || user?.id !== hike.userId) return;
    setSaving(true);
    try {
      await productApi.updateHike(hike.id, hike);
      navigate(`/hike/${hike.id}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Hike could not be updated.");
    } finally {
      setSaving(false);
    }
  }

  if (!hike && !message) return <div className="max-w-3xl mx-auto px-6 py-10"><SkeletonCard /></div>;
  if (message && !hike) return <div className="max-w-xl mx-auto px-6 py-20"><Alert tone="error">{message}</Alert></div>;
  if (!hike || user?.id !== hike.userId) return <div className="max-w-xl mx-auto px-6 py-20"><Alert tone="error">Only the owner of this hike can edit it.</Alert></div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-28">
      <Link to={`/hike/${hike.id}`} className="text-forest text-sm font-semibold">Back to hike</Link>
      <h1 className="font-display text-4xl font-bold text-stone mt-5">Edit hike</h1>
      <p className="text-stone-light mt-1">Update the record while preserving its ownership and history.</p>
      {message && <div className="mt-5"><Alert tone="error">{message}</Alert></div>}
      <form onSubmit={submit} className="bg-white border border-cream-dark rounded-2xl p-6 md:p-8 mt-7 space-y-5">
        <EditField label="Title"><input className="settings-input" value={hike.title} onChange={(event) => setHike({ ...hike, title: event.target.value })} required /></EditField>
        <EditField label="Description"><textarea className="settings-input min-h-40 resize-none" value={hike.description} onChange={(event) => setHike({ ...hike, description: event.target.value })} required /></EditField>
        <div className="grid sm:grid-cols-2 gap-5">
          <EditField label="Distance (km)"><input type="number" className="settings-input" value={hike.distanceKm} onChange={(event) => setHike({ ...hike, distanceKm: Number(event.target.value) })} /></EditField>
          <EditField label="Elevation gain (m)"><input type="number" className="settings-input" value={hike.elevationGainM} onChange={(event) => setHike({ ...hike, elevationGainM: Number(event.target.value) })} /></EditField>
          <EditField label="Visibility"><select className="settings-input" value={hike.visibility} onChange={(event) => setHike({ ...hike, visibility: event.target.value as HikeRecord["visibility"] })}><option value="public">Public</option><option value="followers">Followers</option><option value="private">Only me</option></select></EditField>
          <EditField label="Status"><select className="settings-input" value={hike.status} onChange={(event) => setHike({ ...hike, status: event.target.value as HikeRecord["status"] })}><option value="published">Published</option><option value="draft">Draft</option></select></EditField>
        </div>
        <button disabled={saving} className="bg-forest text-cream font-semibold px-5 py-3 rounded-xl hover:bg-forest-light disabled:opacity-60">{saving ? "Saving…" : "Save changes"}</button>
      </form>
    </div>
  );
}

function EditField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-xs font-semibold uppercase tracking-wide text-stone mb-2">{label}</span>{children}</label>;
}
