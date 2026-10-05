import type { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { productApi } from "../lib/api";
import { serverUrl, supabase } from "../lib/supabase";
import type { UserProfile } from "../types/product";

interface SignUpInput {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (identifier: string, password: string) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<{ needsVerification: boolean }>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function profileFromUser(user: User): UserProfile {
  const metadata = user.user_metadata;
  return {
    id: user.id,
    name: metadata.name ?? "HikeIN Explorer",
    username:
      metadata.username ??
      user.email?.split("@")[0].replace(/[^a-z0-9-]/gi, "-").toLowerCase() ??
      "explorer",
    email: user.email,
    avatarUrl:
      metadata.avatar_url ??
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format",
    bio: metadata.bio ?? "Building my permanent record of outdoor exploration.",
    location: metadata.location ?? "Pakistan",
    joinedAt: user.created_at,
    updatedAt: user.updated_at ?? user.created_at,
    isPrivate: false,
    role: "member",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (activeSession: Session | null) => {
    if (!activeSession?.user) {
      setProfile(null);
      return;
    }
    try {
      const result = await productApi.getMe();
      setProfile(result.profile);
    } catch {
      setProfile(profileFromUser(activeSession.user));
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      loadProfile(data.session).finally(() => setLoading(false));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      loadProfile(nextSession).finally(() => setLoading(false));
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      profile,
      loading,
      async signIn(identifier, password) {
        if (!identifier.includes("@")) {
          const response = await fetch(`${serverUrl}/auth/sign-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: identifier, password }),
          });
          const payload = await response.json();
          if (!response.ok) throw new Error(payload.error ?? "Invalid username or password.");
          const { error } = await supabase.auth.setSession({
            access_token: payload.accessToken,
            refresh_token: payload.refreshToken,
          });
          if (error) throw error;
          return;
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: identifier,
          password,
        });
        if (error) throw error;
      },
      async signUp({ name, username, email, password }) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, username: username.toLowerCase() },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        return { needsVerification: !data.session };
      },
      async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      },
      async sendPasswordReset(email) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
      },
      async updatePassword(password) {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
      },
      async refreshProfile() {
        await loadProfile(session);
      },
    }),
    [session, profile, loading, loadProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
