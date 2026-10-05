import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { productApi } from "../lib/api";
import type { UserPreferences } from "../types/product";
import { Alert, ConfirmDialog, SkeletonCard } from "../components/ui/ProductStates";

type Section = "profile" | "account" | "privacy" | "notifications";

const defaultPreferences: UserPreferences = {
  profileVisibility: "public",
  followPermission: "everyone",
  activityVisibility: "public",
  emailLikes: true,
  emailComments: true,
  emailFollowers: true,
  emailAchievements: true,
};

export default function Settings() {
  const navigate = useNavigate();
  const { user, profile, loading, signOut, updatePassword, refreshProfile } = useAuth();
  const [section, setSection] = useState<Section>("profile");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: profile?.name ?? "",
    username: profile?.username ?? "",
    bio: profile?.bio ?? "",
    location: profile?.location ?? "",
    avatarUrl: profile?.avatarUrl ?? "",
  });
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [passwords, setPasswords] = useState({ password: "", confirm: "" });

  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name,
        username: profile.username,
        bio: profile.bio,
        location: profile.location,
        avatarUrl: profile.avatarUrl,
      });
      productApi.getMe().then((result) => setPreferences(result.preferences)).catch(() => undefined);
    }
  }, [profile]);

  if (loading) {
    return <div className="max-w-5xl mx-auto px-6 py-12"><SkeletonCard /></div>;
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <p className="font-display text-3xl font-bold text-stone">Sign in to manage your account</p>
        <p className="text-stone-light mt-2">Privacy, profile, and notification controls are available to HikeIN members.</p>
        <Link to="/login" className="inline-block mt-6 bg-forest text-cream font-semibold px-5 py-3 rounded-xl">Sign in</Link>
      </div>
    );
  }

  async function runSave(action: () => Promise<unknown>, success: string) {
    setStatus("saving");
    setMessage("");
    try {
      await action();
      setMessage(success);
      setStatus("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Changes could not be saved.");
      setStatus("error");
    }
  }

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    await runSave(async () => {
      await productApi.updateProfile(profileForm);
      await refreshProfile();
    }, "Profile changes saved.");
  }

  async function uploadAvatar(file?: File) {
    if (!file) return;
    await runSave(async () => {
      const { url } = await productApi.uploadMedia(file, "avatars");
      await productApi.updateProfile({ avatarUrl: url });
      setProfileForm((current) => ({ ...current, avatarUrl: url }));
      await refreshProfile();
    }, "Profile photo updated.");
  }

  async function savePassword(event: FormEvent) {
    event.preventDefault();
    if (passwords.password.length < 8) {
      setStatus("error");
      setMessage("Use at least 8 characters.");
      return;
    }
    if (passwords.password !== passwords.confirm) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }
    await runSave(async () => {
      await updatePassword(passwords.password);
      setPasswords({ password: "", confirm: "" });
    }, "Password updated securely.");
  }

  async function removeAccount() {
    setDeleting(true);
    try {
      await productApi.deleteAccount();
      await signOut().catch(() => undefined);
      navigate("/");
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  }

  const sections: { id: Section; label: string; description: string }[] = [
    { id: "profile", label: "Profile", description: "Your public explorer identity" },
    { id: "account", label: "Account", description: "Email, password, and access" },
    { id: "privacy", label: "Privacy", description: "Control who sees your activity" },
    { id: "notifications", label: "Notifications", description: "Choose what reaches you" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 pb-28 md:pb-12">
      <div className="mb-8">
        <p className="text-forest text-xs font-semibold uppercase tracking-widest">Member controls</p>
        <h1 className="font-display text-4xl font-bold text-stone mt-2">Settings</h1>
        <p className="text-stone-light mt-1">Manage your profile, privacy, and account security.</p>
      </div>

      <div className="grid lg:grid-cols-[16rem_1fr] gap-8">
        <nav className="space-y-1" aria-label="Settings sections">
          {sections.map((item) => (
            <button key={item.id} onClick={() => { setSection(item.id); setMessage(""); }} className={`w-full text-left rounded-xl px-4 py-3 transition-colors ${section === item.id ? "bg-forest text-cream" : "hover:bg-white text-stone"}`}>
              <span className="block text-sm font-semibold">{item.label}</span>
              <span className={`block text-xs mt-0.5 ${section === item.id ? "text-cream-darker" : "text-stone-light"}`}>{item.description}</span>
            </button>
          ))}
        </nav>

        <div className="bg-white border border-cream-dark rounded-2xl p-5 md:p-8">
          {message && <div className="mb-6"><Alert tone={status === "error" ? "error" : "success"}>{message}</Alert></div>}

          {section === "profile" && (
            <form onSubmit={saveProfile}>
              <SectionHeader title="Public profile" description="This information represents you across HikeIN." />
              <div className="flex items-center gap-5 py-6 border-b border-cream-dark">
                <img src={profileForm.avatarUrl} alt="" className="size-20 rounded-full object-cover ring-4 ring-cream" />
                <div>
                  <label className="inline-flex cursor-pointer bg-stone text-cream text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-forest">
                    Upload new photo
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => uploadAvatar(event.target.files?.[0])} />
                  </label>
                  <p className="text-stone-light text-xs mt-2">JPG, PNG, or WebP. Maximum 10 MB.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mt-6">
                <SettingsField label="Full name"><input className="settings-input" value={profileForm.name} onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })} required /></SettingsField>
                <SettingsField label="Username"><input className="settings-input" value={profileForm.username} onChange={(event) => setProfileForm({ ...profileForm, username: event.target.value.toLowerCase() })} required /></SettingsField>
                <div className="sm:col-span-2"><SettingsField label="Bio"><textarea className="settings-input min-h-28 resize-none" value={profileForm.bio} maxLength={240} onChange={(event) => setProfileForm({ ...profileForm, bio: event.target.value })} /><span className="text-stone-light text-xs block text-right mt-1">{profileForm.bio.length}/240</span></SettingsField></div>
                <div className="sm:col-span-2"><SettingsField label="Location"><input className="settings-input" value={profileForm.location} onChange={(event) => setProfileForm({ ...profileForm, location: event.target.value })} placeholder="Islamabad, Pakistan" /></SettingsField></div>
              </div>
              <SaveButton saving={status === "saving"} />
            </form>
          )}

          {section === "account" && (
            <div>
              <SectionHeader title="Account and security" description="Your email is managed by secure Supabase authentication." />
              <SettingsField label="Email"><input className="settings-input bg-cream/50" value={user.email ?? ""} disabled /><span className="text-xs text-stone-light mt-1 block">Email changes require verification.</span></SettingsField>
              <form onSubmit={savePassword} className="mt-8 pt-8 border-t border-cream-dark space-y-5">
                <p className="font-display text-xl font-bold text-stone">Change password</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <SettingsField label="New password"><input type="password" className="settings-input" value={passwords.password} onChange={(event) => setPasswords({ ...passwords, password: event.target.value })} /></SettingsField>
                  <SettingsField label="Confirm password"><input type="password" className="settings-input" value={passwords.confirm} onChange={(event) => setPasswords({ ...passwords, confirm: event.target.value })} /></SettingsField>
                </div>
                <SaveButton saving={status === "saving"} label="Update password" />
              </form>
              <div className="mt-10 pt-8 border-t border-red-100">
                <p className="font-display text-xl font-bold text-red-800">Danger zone</p>
                <p className="text-stone-mid text-sm mt-1">Deleting your account removes your profile and owned hike records. This cannot be undone.</p>
                <button onClick={() => setDeleteOpen(true)} className="mt-4 border border-red-200 text-red-700 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-red-50">Delete account</button>
              </div>
            </div>
          )}

          {section === "privacy" && (
            <div>
              <SectionHeader title="Privacy" description="Choose who can discover and interact with your outdoor history." />
              <PreferenceSelect label="Profile visibility" description="Private profiles hide public hikes and require follower approval." value={preferences.profileVisibility} options={[["public", "Public"], ["private", "Private"]]} onChange={(value) => setPreferences({ ...preferences, profileVisibility: value as UserPreferences["profileVisibility"] })} />
              <PreferenceSelect label="Who can follow you" description="Approval gives you control over new followers." value={preferences.followPermission} options={[["everyone", "Everyone"], ["approval", "Require approval"]]} onChange={(value) => setPreferences({ ...preferences, followPermission: value as UserPreferences["followPermission"] })} />
              <PreferenceSelect label="Default activity visibility" description="You can override this for each hike." value={preferences.activityVisibility} options={[["public", "Public"], ["followers", "Followers"], ["private", "Only me"]]} onChange={(value) => setPreferences({ ...preferences, activityVisibility: value as UserPreferences["activityVisibility"] })} />
              <button onClick={() => runSave(() => productApi.updatePreferences(preferences), "Privacy settings saved.")} className="mt-7 bg-forest text-cream font-semibold text-sm px-5 py-3 rounded-xl hover:bg-forest-light">Save privacy settings</button>
            </div>
          )}

          {section === "notifications" && (
            <div>
              <SectionHeader title="Notification preferences" description="In-app notifications remain available even when email is off." />
              <div className="divide-y divide-cream-dark">
                {([
                  ["emailLikes", "Likes", "When someone appreciates your hike or post"],
                  ["emailComments", "Comments", "When someone joins a conversation on your content"],
                  ["emailFollowers", "New followers", "When an explorer follows your profile"],
                  ["emailAchievements", "Achievements", "When you unlock a new badge"],
                ] as const).map(([key, label, description]) => (
                  <label key={key} className="flex items-center justify-between gap-5 py-5">
                    <span><span className="block text-sm font-semibold text-stone">{label}</span><span className="block text-xs text-stone-light mt-0.5">{description}</span></span>
                    <input type="checkbox" checked={preferences[key]} onChange={(event) => setPreferences({ ...preferences, [key]: event.target.checked })} className="size-5 accent-forest" />
                  </label>
                ))}
              </div>
              <button onClick={() => runSave(() => productApi.updatePreferences(preferences), "Notification preferences saved.")} className="mt-7 bg-forest text-cream font-semibold text-sm px-5 py-3 rounded-xl hover:bg-forest-light">Save preferences</button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog open={deleteOpen} title="Delete your HikeIN account?" description="Your public profile and hike records will be removed. Social relationships associated with this account will no longer be accessible." confirmLabel="Delete account" busy={deleting} onCancel={() => setDeleteOpen(false)} onConfirm={removeAccount} />
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return <div className="pb-5 border-b border-cream-dark"><h2 className="font-display text-2xl font-bold text-stone">{title}</h2><p className="text-stone-light text-sm mt-1">{description}</p></div>;
}

function SettingsField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-xs font-semibold text-stone uppercase tracking-wide mb-2">{label}</span>{children}</label>;
}

function SaveButton({ saving, label = "Save changes" }: { saving: boolean; label?: string }) {
  return <button disabled={saving} className="mt-7 bg-forest text-cream font-semibold text-sm px-5 py-3 rounded-xl hover:bg-forest-light disabled:opacity-60">{saving ? "Saving…" : label}</button>;
}

function PreferenceSelect({ label, description, value, options, onChange }: { label: string; description: string; value: string; options: [string, string][]; onChange: (value: string) => void }) {
  return (
    <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-5 border-b border-cream-dark">
      <span><span className="block text-sm font-semibold text-stone">{label}</span><span className="block text-xs text-stone-light mt-0.5">{description}</span></span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="settings-input sm:w-44">
        {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
      </select>
    </label>
  );
}
