import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";

const app = new Hono();
const prefix = "/make-server-47b8781b";

const admin = () =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

// Enable logger
app.use("*", logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get(`${prefix}/health`, (c) => {
  return c.json({ status: "ok" });
});

app.post(`${prefix}/auth/sign-in`, async (c) => {
  const { username, password } = await c.req.json();
  const profile = await kv.get(
    `profile:username:${String(username).toLowerCase()}`,
  );
  if (!profile?.email) {
    return c.json({ error: "Invalid username or password." }, 401);
  }
  const client = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
  );
  const { data, error } = await client.auth.signInWithPassword({
    email: profile.email,
    password,
  });
  if (error || !data.session) {
    return c.json({ error: "Invalid username or password." }, 401);
  }
  return c.json({
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
  });
});

async function requireUser(c: any) {
  const token = c.req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  const { data, error } = await admin().auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

function defaultPreferences() {
  return {
    profileVisibility: "public",
    followPermission: "everyone",
    activityVisibility: "public",
    emailLikes: true,
    emailComments: true,
    emailFollowers: true,
    emailAchievements: true,
  };
}

function profileFromUser(user: any) {
  const metadata = user.user_metadata ?? {};
  return {
    id: user.id,
    name: metadata.name ?? "HikeIN Explorer",
    username:
      metadata.username ??
      user.email?.split("@")[0]?.replace(/[^a-z0-9-]/gi, "-").toLowerCase(),
    email: user.email,
    avatarUrl:
      metadata.avatar_url ??
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format",
    bio: metadata.bio ?? "Building my permanent record of outdoor exploration.",
    location: metadata.location ?? "Pakistan",
    joinedAt: user.created_at,
    updatedAt: new Date().toISOString(),
    isPrivate: false,
    role: "member",
  };
}

async function getOrCreateProfile(user: any) {
  const key = `profile:user:${user.id}`;
  let profile = await kv.get(key);
  if (!profile) {
    profile = profileFromUser(user);
    await kv.mset(
      [key, `profile:username:${profile.username}`],
      [profile, profile],
    );
  }
  return profile;
}

app.get(`${prefix}/me`, async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: "Authentication required." }, 401);
  const profile = await getOrCreateProfile(user);
  const preferences =
    (await kv.get(`preferences:${user.id}`)) ?? defaultPreferences();
  const hikes = await kv.getByPrefix(`hike:user:${user.id}:`);
  return c.json({ profile, preferences, hikes });
});

app.get(`${prefix}/profiles/:username`, async (c) => {
  const profile = await kv.get(
    `profile:username:${c.req.param("username").toLowerCase()}`,
  );
  if (!profile || profile.isPrivate) {
    return c.json({ error: "Profile not found." }, 404);
  }
  const hikes = (await kv.getByPrefix(`hike:user:${profile.id}:`)).filter(
    (hike: any) => hike.visibility === "public" && hike.status === "published",
  );
  return c.json({ profile, hikes });
});

app.put(`${prefix}/me/profile`, async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: "Authentication required." }, 401);
  const current = await getOrCreateProfile(user);
  const input = await c.req.json();
  const allowed = [
    "name",
    "username",
    "avatarUrl",
    "coverUrl",
    "bio",
    "location",
    "isPrivate",
  ];
  const updates = Object.fromEntries(
    allowed.filter((key) => input[key] !== undefined).map((key) => [key, input[key]]),
  );
  const profile = {
    ...current,
    ...updates,
    id: user.id,
    email: user.email,
    updatedAt: new Date().toISOString(),
  };
  await kv.mset(
    [`profile:user:${user.id}`, `profile:username:${profile.username.toLowerCase()}`],
    [profile, profile],
  );
  if (current.username !== profile.username) {
    await kv.del(`profile:username:${current.username.toLowerCase()}`);
  }
  return c.json({ profile });
});

app.put(`${prefix}/me/preferences`, async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: "Authentication required." }, 401);
  const preferences = { ...defaultPreferences(), ...(await c.req.json()) };
  await kv.set(`preferences:${user.id}`, preferences);
  return c.json({ preferences });
});

app.delete(`${prefix}/me`, async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: "Authentication required." }, 401);
  const profile = await kv.get(`profile:user:${user.id}`);
  const hikes = await kv.getByPrefix(`hike:user:${user.id}:`);
  const keys = [
    `profile:user:${user.id}`,
    `preferences:${user.id}`,
    ...(profile?.username ? [`profile:username:${profile.username.toLowerCase()}`] : []),
    ...hikes.flatMap((hike: any) => [
      `hike:${hike.id}`,
      `hike:user:${user.id}:${hike.id}`,
    ]),
  ];
  await kv.mdel(keys);
  const { error } = await admin().auth.admin.deleteUser(user.id);
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

app.post(`${prefix}/media`, async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: "Authentication required." }, 401);
  const form = await c.req.formData();
  const file = form.get("file");
  const folder = form.get("folder") === "avatars" ? "avatars" : "hikes";
  if (!(file instanceof File)) return c.json({ error: "A photo is required." }, 400);
  if (!file.type.startsWith("image/")) {
    return c.json({ error: "Only image uploads are supported." }, 400);
  }
  if (file.size > 10 * 1024 * 1024) {
    return c.json({ error: "Photos must be smaller than 10 MB." }, 400);
  }

  const client = admin();
  const bucket = "hikein-media";
  const { data: bucketData } = await client.storage.getBucket(bucket);
  if (!bucketData) {
    const { error } = await client.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    });
    if (error) return c.json({ error: error.message }, 500);
  }
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${folder}/${user.id}/${crypto.randomUUID()}.${extension}`;
  const { error } = await client.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) return c.json({ error: error.message }, 500);
  const { data } = client.storage.from(bucket).getPublicUrl(path);
  return c.json({ url: data.publicUrl }, 201);
});

app.post(`${prefix}/hikes`, async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: "Sign in to publish a hike." }, 401);
  const input = await c.req.json();
  const now = new Date().toISOString();
  const hike = {
    ...input,
    id: crypto.randomUUID(),
    userId: user.id,
    createdAt: now,
    updatedAt: now,
  };
  await kv.mset(
    [`hike:${hike.id}`, `hike:user:${user.id}:${hike.id}`],
    [hike, hike],
  );
  return c.json({ hike }, 201);
});

app.get(`${prefix}/hikes/:id`, async (c) => {
  const hike = await kv.get(`hike:${c.req.param("id")}`);
  if (!hike) return c.json({ error: "Hike not found." }, 404);
  const user = await requireUser(c);
  const canView =
    hike.visibility === "public" ||
    hike.userId === user?.id;
  if (!canView) return c.json({ error: "This hike is private." }, 403);
  const owner = await kv.get(`profile:user:${hike.userId}`);
  return c.json({ hike, owner });
});

app.put(`${prefix}/hikes/:id`, async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: "Authentication required." }, 401);
  const current = await kv.get(`hike:${c.req.param("id")}`);
  if (!current) return c.json({ error: "Hike not found." }, 404);
  if (current.userId !== user.id) return c.json({ error: "Not permitted." }, 403);
  const input = await c.req.json();
  const hike = {
    ...current,
    ...input,
    id: current.id,
    userId: user.id,
    updatedAt: new Date().toISOString(),
  };
  await kv.mset(
    [`hike:${hike.id}`, `hike:user:${user.id}:${hike.id}`],
    [hike, hike],
  );
  return c.json({ hike });
});

app.delete(`${prefix}/hikes/:id`, async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: "Authentication required." }, 401);
  const hike = await kv.get(`hike:${c.req.param("id")}`);
  if (!hike) return c.json({ error: "Hike not found." }, 404);
  if (hike.userId !== user.id) return c.json({ error: "Not permitted." }, 403);
  await kv.mdel([`hike:${hike.id}`, `hike:user:${user.id}:${hike.id}`]);
  return c.json({ success: true });
});

app.post(`${prefix}/interactions/:kind`, async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: "Sign in to continue." }, 401);
  const kind = c.req.param("kind");
  if (!["like", "save", "follow"].includes(kind)) {
    return c.json({ error: "Unsupported interaction." }, 400);
  }
  const { referenceId, active } = await c.req.json();
  const key = `interaction:${kind}:${user.id}:${referenceId}`;
  if (active) {
    await kv.set(key, {
      userId: user.id,
      referenceId,
      createdAt: new Date().toISOString(),
    });
  } else {
    await kv.del(key);
  }
  return c.json({ active });
});

app.post(`${prefix}/comments`, async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: "Sign in to comment." }, 401);
  const { contentType, contentId, comment } = await c.req.json();
  if (!comment?.trim()) return c.json({ error: "Comment cannot be empty." }, 400);
  const id = crypto.randomUUID();
  const value = {
    id,
    userId: user.id,
    contentType,
    contentId,
    comment: comment.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await kv.set(`comment:${contentType}:${contentId}:${id}`, value);
  return c.json({ id }, 201);
});

app.post(`${prefix}/reports`, async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: "Sign in to report content." }, 401);
  const { contentType, contentId, reason } = await c.req.json();
  const id = crypto.randomUUID();
  await kv.set(`report:open:${id}`, {
    id,
    reporterId: user.id,
    contentType,
    contentId,
    reason: reason || "Community standards review",
    status: "open",
    createdAt: new Date().toISOString(),
  });
  return c.json({ success: true }, 201);
});

app.post(`${prefix}/notifications/read`, async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: "Authentication required." }, 401);
  const notifications = await kv.getByPrefix(`notification:${user.id}:`);
  await kv.mset(
    notifications.map((item: any) => `notification:${user.id}:${item.id}`),
    notifications.map((item: any) => ({ ...item, read: true })),
  );
  return c.json({ success: true });
});

Deno.serve(app.fetch);
