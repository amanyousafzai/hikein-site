import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { destinations } from "../data/mock";
import { productApi } from "../lib/api";
import type { Difficulty, Visibility } from "../types/product";
import { Alert } from "../components/ui/ProductStates";

const steps = ["Basics", "Trail", "Photos", "Details", "Preview"];

export default function AddAdventure() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "error" | "success">("idle");
  const [message, setMessage] = useState("");
  const [publishedId, setPublishedId] = useState("");
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
    distanceKm: "",
    elevationGainM: "",
    durationHours: "",
    durationMinutes: "",
    difficulty: "Moderate" as Difficulty,
    startPoint: "",
    endPoint: "",
    tags: "",
    weather: "",
    companions: "",
    notes: "",
    visibility: "public" as Visibility,
  });

  const selected = destinations.find((destination) => destination.id === selectedId);
  const matches = useMemo(
    () =>
      destinations
        .filter((destination) =>
          `${destination.name} ${destination.location}`.toLowerCase().includes(search.toLowerCase()),
        )
        .slice(0, 6),
    [search],
  );
  const previews = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function selectDestination(id: string) {
    const destination = destinations.find((item) => item.id === id);
    if (!destination) return;
    setSelectedId(id);
    setSearch(destination.name);
    setForm((current) => ({
      ...current,
      location: destination.location,
      title: current.title || `${destination.name} hike`,
    }));
  }

  function addFiles(selectedFiles: FileList | null) {
    if (!selectedFiles) return;
    const valid = Array.from(selectedFiles).filter((file) => file.type.startsWith("image/"));
    setFiles((current) => [...current, ...valid].slice(0, 8));
  }

  function canContinue() {
    if (step === 1) return Boolean(form.title.trim() && form.location.trim() && form.date && form.description.trim());
    if (step === 2) return Boolean(Number(form.distanceKm) > 0 && Number(form.durationHours || 0) * 60 + Number(form.durationMinutes || 0) > 0 && form.startPoint && form.endPoint);
    return true;
  }

  async function save(statusValue: "draft" | "published") {
    if (!user) {
      setStatus("error");
      setMessage("Sign in to save this hike to your permanent record.");
      return;
    }
    setStatus("saving");
    setMessage(statusValue === "draft" ? "Saving your draft…" : "Publishing your hike…");
    try {
      const photoUrls: string[] = [];
      for (const file of files) {
        const media = await productApi.uploadMedia(file, "hikes");
        photoUrls.push(media.url);
      }
      const result = await productApi.createHike({
        title: form.title.trim(),
        description: form.description.trim(),
        destinationId: selectedId || undefined,
        location: form.location.trim(),
        date: form.date,
        distanceKm: Number(form.distanceKm),
        elevationGainM: Number(form.elevationGainM || 0),
        durationMinutes: Number(form.durationHours || 0) * 60 + Number(form.durationMinutes || 0),
        difficulty: form.difficulty,
        startPoint: form.startPoint.trim(),
        endPoint: form.endPoint.trim(),
        coverImage: photoUrls[0] ?? selected?.image,
        photoUrls,
        tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        weather: form.weather.trim() || undefined,
        companions: form.companions.trim() || undefined,
        notes: form.notes.trim() || undefined,
        visibility: form.visibility,
        status: statusValue,
      });
      setPublishedId(result.hike.id);
      setStatus("success");
      setMessage(statusValue === "draft" ? "Draft saved to your dashboard." : "Your hike is now part of your permanent HikeIN record.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Your hike could not be saved.");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-6 pb-24">
        <div className="max-w-lg text-center">
          <span className="size-16 mx-auto rounded-full bg-forest text-cream flex items-center justify-center">
            <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6" /></svg>
          </span>
          <p className="text-forest text-xs font-semibold uppercase tracking-widest mt-6">Hike recorded</p>
          <h1 className="font-display text-4xl font-bold text-stone mt-2">{form.title}</h1>
          <p className="text-stone-mid mt-3">{message}</p>
          <div className="bg-white border border-cream-dark rounded-2xl p-5 text-left mt-7">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <span><strong className="text-stone">{form.distanceKm} km</strong> <span className="text-stone-light">distance</span></span>
              <span><strong className="text-stone">{form.elevationGainM || 0} m</strong> <span className="text-stone-light">gain</span></span>
              <span><strong className="text-stone">{form.difficulty}</strong> <span className="text-stone-light">difficulty</span></span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">
            <Link to="/dashboard" className="bg-forest text-cream font-semibold px-5 py-3 rounded-xl hover:bg-forest-light">View activity dashboard</Link>
            <button onClick={() => navigate("/community")} className="border border-cream-darker text-stone-mid font-semibold px-5 py-3 rounded-xl hover:border-forest/40">Go to community</button>
          </div>
          {publishedId && <p className="text-stone-light text-xs mt-5">Record ID: {publishedId.slice(0, 8)}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 pb-28">
      <div className="max-w-3xl">
        <p className="text-forest text-xs font-semibold uppercase tracking-widest">Permanent activity record</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-stone mt-2">Record a hike</h1>
        <p className="text-stone-light mt-2">Add the details once. Keep the memory for every season ahead.</p>
      </div>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="flex min-w-max md:min-w-0">
          {steps.map((label, index) => {
            const number = index + 1;
            return (
              <button key={label} onClick={() => number < step && setStep(number)} className="flex items-center flex-1 text-left">
                <span className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${number <= step ? "bg-forest text-cream" : "bg-cream-dark text-stone-light"}`}>{number < step ? "✓" : number}</span>
                <span className={`text-xs font-semibold ml-2 ${number <= step ? "text-stone" : "text-stone-light"}`}>{label}</span>
                {number < steps.length && <span className={`h-px w-8 md:flex-1 mx-3 ${number < step ? "bg-forest" : "bg-cream-darker"}`} />}
              </button>
            );
          })}
        </div>
      </div>

      {message && <div className="mt-6 max-w-3xl"><Alert tone={status === "error" ? "error" : "info"}>{message}{!user && status === "error" && <> <Link to="/login" className="font-semibold underline">Sign in</Link></>}</Alert></div>}

      <div className="grid lg:grid-cols-[1fr_17rem] gap-8 mt-8">
        <div className="bg-white border border-cream-dark rounded-2xl p-5 md:p-8">
          {step === 1 && (
            <div>
              <StepHeader title="Tell us about the hike" description="Start with the information people use to understand this activity." />
              <div className="space-y-5 mt-7">
                <FormField label="Hike title" required><input className="settings-input" value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="Sunrise on Margalla Trail 5" /></FormField>
                <FormField label="Location or known destination" required>
                  <div className="relative">
                    <input className="settings-input" value={search || form.location} onChange={(event) => { setSearch(event.target.value); update("location", event.target.value); setSelectedId(""); }} placeholder="Search Pakistan's destinations or enter a location" />
                    {search && !selectedId && (
                      <div className="absolute z-20 inset-x-0 top-full mt-2 bg-white border border-cream-darker rounded-xl shadow-xl overflow-hidden">
                        {matches.map((destination) => (
                          <button key={destination.id} onClick={() => selectDestination(destination.id)} className="w-full flex items-center gap-3 p-3 text-left hover:bg-cream border-b last:border-b-0 border-cream-dark">
                            <img src={destination.image} alt="" className="size-10 rounded-lg object-cover" />
                            <span><span className="block text-sm font-semibold text-stone">{destination.name}</span><span className="block text-xs text-stone-light">{destination.location}</span></span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </FormField>
                <FormField label="Date completed" required><input type="date" className="settings-input" value={form.date} onChange={(event) => update("date", event.target.value)} /></FormField>
                <FormField label="Description" required><textarea className="settings-input min-h-36 resize-none" value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="What made this hike memorable? Add trail conditions, highlights, and useful context." /></FormField>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <StepHeader title="Add trail information" description="These metrics turn a memory into a useful and credible activity record." />
              <div className="grid sm:grid-cols-2 gap-5 mt-7">
                <FormField label="Distance (km)" required><input type="number" min="0.1" step="0.1" className="settings-input" value={form.distanceKm} onChange={(event) => update("distanceKm", event.target.value)} placeholder="8.5" /></FormField>
                <FormField label="Elevation gain (m)"><input type="number" min="0" className="settings-input" value={form.elevationGainM} onChange={(event) => update("elevationGainM", event.target.value)} placeholder="620" /></FormField>
                <FormField label="Duration" required><div className="grid grid-cols-2 gap-2"><input type="number" min="0" className="settings-input" value={form.durationHours} onChange={(event) => update("durationHours", event.target.value)} placeholder="Hours" /><input type="number" min="0" max="59" className="settings-input" value={form.durationMinutes} onChange={(event) => update("durationMinutes", event.target.value)} placeholder="Minutes" /></div></FormField>
                <FormField label="Difficulty" required><select className="settings-input" value={form.difficulty} onChange={(event) => update("difficulty", event.target.value)}>{["Easy", "Moderate", "Strenuous", "Technical"].map((difficulty) => <option key={difficulty}>{difficulty}</option>)}</select></FormField>
                <FormField label="Starting point" required><input className="settings-input" value={form.startPoint} onChange={(event) => update("startPoint", event.target.value)} placeholder="Trailhead or village" /></FormField>
                <FormField label="Ending point" required><input className="settings-input" value={form.endPoint} onChange={(event) => update("endPoint", event.target.value)} placeholder="Summit, lake, or return point" /></FormField>
              </div>
              <div className="mt-6 bg-cream rounded-xl p-4 flex gap-3">
                <svg className="size-5 text-forest flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /><path d="M12 11v5m0-8v.01" /></svg>
                <p className="text-stone-mid text-sm">GPS route files are intentionally not simulated. The data model supports coordinates and a future verified route integration.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <StepHeader title="Share the view" description="Upload up to eight photos. The first image becomes your hike cover." />
              <label className="mt-7 block border-2 border-dashed border-cream-darker rounded-2xl p-10 text-center hover:border-forest/40 cursor-pointer transition-colors">
                <svg className="size-10 mx-auto text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 16.5V19h16v-2.5M12 4v11m-4-7 4-4 4 4" /></svg>
                <span className="block font-semibold text-stone mt-3">Choose photos</span>
                <span className="block text-stone-light text-sm mt-1">JPG, PNG, or WebP. Maximum 10 MB each.</span>
                <input type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => addFiles(event.target.files)} />
              </label>
              {previews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                  {previews.map((preview, index) => (
                    <div key={preview} className="relative aspect-square">
                      <img src={preview} alt={`Hike upload ${index + 1}`} className="size-full rounded-xl object-cover" />
                      <button onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} className="absolute top-2 right-2 size-7 rounded-full bg-stone/80 text-white text-xs">×</button>
                      {index === 0 && <span className="absolute left-2 bottom-2 bg-forest text-cream text-[10px] font-semibold px-2 py-1 rounded">Cover</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <StepHeader title="Add useful context" description="Optional details make your record easier to rediscover and more valuable to the community." />
              <div className="space-y-5 mt-7">
                <FormField label="Tags"><input className="settings-input" value={form.tags} onChange={(event) => update("tags", event.target.value)} placeholder="forest, sunrise, solo hike (comma separated)" /></FormField>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Weather"><input className="settings-input" value={form.weather} onChange={(event) => update("weather", event.target.value)} placeholder="Clear, cool, light wind" /></FormField>
                  <FormField label="Companions"><input className="settings-input" value={form.companions} onChange={(event) => update("companions", event.target.value)} placeholder="Club or explorer names" /></FormField>
                </div>
                <FormField label="Private notes"><textarea className="settings-input min-h-28 resize-none" value={form.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Equipment notes, reminders, or personal details" /></FormField>
                <FormField label="Who can see this hike"><select className="settings-input" value={form.visibility} onChange={(event) => update("visibility", event.target.value)}><option value="public">Everyone</option><option value="followers">Followers</option><option value="private">Only me</option></select></FormField>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <StepHeader title="Preview your hike" description="This is how your activity will appear in your permanent history." />
              <article className="mt-7 border border-cream-dark rounded-2xl overflow-hidden">
                <div className="aspect-[16/8] bg-cream-dark">
                  {(previews[0] || selected?.image) ? <img src={previews[0] || selected?.image} alt="" className="size-full object-cover" /> : <div className="size-full flex items-center justify-center text-stone-light">No cover photo</div>}
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-forest font-semibold uppercase tracking-wide"><span>{form.difficulty}</span><span>·</span><span>{form.visibility}</span></div>
                  <h2 className="font-display text-3xl font-bold text-stone mt-2">{form.title}</h2>
                  <p className="text-stone-light text-sm mt-1">{form.location} · {form.date}</p>
                  <p className="text-stone-mid leading-relaxed mt-4">{form.description}</p>
                  <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-cream-dark text-center">
                    <Metric value={`${form.distanceKm} km`} label="Distance" />
                    <Metric value={`${form.elevationGainM || 0} m`} label="Elevation" />
                    <Metric value={`${form.durationHours || 0}h ${form.durationMinutes || 0}m`} label="Duration" />
                  </div>
                </div>
              </article>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-cream-dark">
            <button disabled={step === 1 || status === "saving"} onClick={() => setStep((current) => Math.max(1, current - 1))} className="border border-cream-darker text-stone-mid font-semibold text-sm px-4 py-2.5 rounded-xl disabled:opacity-30">Back</button>
            {step < 5 ? (
              <button disabled={!canContinue()} onClick={() => setStep((current) => Math.min(5, current + 1))} className="bg-forest text-cream font-semibold text-sm px-5 py-3 rounded-xl hover:bg-forest-light disabled:opacity-40">Continue</button>
            ) : (
              <div className="flex gap-2">
                <button disabled={status === "saving"} onClick={() => save("draft")} className="border border-forest/30 text-forest font-semibold text-sm px-4 py-3 rounded-xl">Save draft</button>
                <button disabled={status === "saving"} onClick={() => save("published")} className="bg-forest text-cream font-semibold text-sm px-5 py-3 rounded-xl hover:bg-forest-light disabled:opacity-60">{status === "saving" ? "Publishing…" : "Publish hike"}</button>
              </div>
            )}
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 bg-stone text-cream rounded-2xl p-5">
            <p className="font-display text-xl font-bold">A trusted record</p>
            <p className="text-cream-darker text-sm leading-relaxed mt-2">Accurate details help future you remember the journey and help other explorers prepare responsibly.</p>
            <div className="space-y-3 mt-5 text-xs text-cream-darker">
              <p className="flex gap-2"><span className="text-white">01</span> Use your actual completion date.</p>
              <p className="flex gap-2"><span className="text-white">02</span> Keep trail conditions factual.</p>
              <p className="flex gap-2"><span className="text-white">03</span> Respect private locations and people.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepHeader({ title, description }: { title: string; description: string }) {
  return <div><h2 className="font-display text-2xl md:text-3xl font-bold text-stone">{title}</h2><p className="text-stone-light text-sm mt-1">{description}</p></div>;
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="block"><span className="block text-xs font-semibold text-stone uppercase tracking-wide mb-2">{label}{required && <span className="text-forest"> *</span>}</span>{children}</label>;
}

function Metric({ value, label }: { value: string; label: string }) {
  return <div><p className="font-display text-lg font-bold text-stone">{value}</p><p className="text-stone-light text-xs mt-0.5">{label}</p></div>;
}
