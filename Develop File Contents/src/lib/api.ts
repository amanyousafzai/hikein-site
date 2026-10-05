import { supabase, serverUrl } from "./supabase";
import type { HikeRecord, UserPreferences, UserProfile } from "../types/product";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await fetch(`${serverUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(session?.access_token
        ? { Authorization: `Bearer ${session.access_token}` }
        : {}),
      ...options.headers,
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error ?? "Unable to complete this request.");
  }
  return payload as T;
}

export const productApi = {
  getPublicProfile: (username: string) =>
    request<{ profile: UserProfile; hikes: HikeRecord[] }>(
      `/profiles/${encodeURIComponent(username)}`,
    ),

  getMe: () =>
    request<{
      profile: UserProfile;
      preferences: UserPreferences;
      hikes: HikeRecord[];
    }>("/me"),

  updateProfile: (profile: Partial<UserProfile>) =>
    request<{ profile: UserProfile }>("/me/profile", {
      method: "PUT",
      body: JSON.stringify(profile),
    }),

  updatePreferences: (preferences: UserPreferences) =>
    request<{ preferences: UserPreferences }>("/me/preferences", {
      method: "PUT",
      body: JSON.stringify(preferences),
    }),

  createHike: (hike: Omit<HikeRecord, "id" | "userId" | "createdAt" | "updatedAt">) =>
    request<{ hike: HikeRecord }>("/hikes", {
      method: "POST",
      body: JSON.stringify(hike),
    }),

  getHike: (id: string) =>
    request<{ hike: HikeRecord; owner: UserProfile }>(`/hikes/${id}`),

  updateHike: (id: string, hike: Partial<HikeRecord>) =>
    request<{ hike: HikeRecord }>(`/hikes/${id}`, {
      method: "PUT",
      body: JSON.stringify(hike),
    }),

  deleteHike: (id: string) =>
    request<{ success: true }>(`/hikes/${id}`, { method: "DELETE" }),

  async uploadMedia(file: File, folder: "avatars" | "hikes") {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("Sign in to upload photos.");
    const body = new FormData();
    body.append("file", file);
    body.append("folder", folder);
    const response = await fetch(`${serverUrl}/media`, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}` },
      body,
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error ?? "Photo upload failed.");
    return payload as { url: string };
  },

  toggleInteraction: (
    kind: "like" | "save" | "follow",
    referenceId: string,
    active: boolean,
  ) =>
    request<{ active: boolean }>(`/interactions/${kind}`, {
      method: "POST",
      body: JSON.stringify({ referenceId, active }),
    }),

  createComment: (contentType: "hike" | "post", contentId: string, comment: string) =>
    request<{ id: string }>("/comments", {
      method: "POST",
      body: JSON.stringify({ contentType, contentId, comment }),
    }),

  reportContent: (contentType: "hike" | "post" | "profile", contentId: string, reason: string) =>
    request<{ success: true }>("/reports", {
      method: "POST",
      body: JSON.stringify({ contentType, contentId, reason }),
    }),

  markNotificationsRead: () =>
    request<{ success: true }>("/notifications/read", { method: "POST" }),

  deleteAccount: () =>
    request<{ success: true }>("/me", { method: "DELETE" }),
};
