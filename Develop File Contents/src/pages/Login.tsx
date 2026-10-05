import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

type Mode = "login" | "register" | "forgot" | "reset";
type Status = "idle" | "loading" | "success" | "error";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signIn, signUp, sendPasswordReset, updatePassword } = useAuth();
  const routeMode: Mode = location.pathname.includes("forgot")
    ? "forgot"
    : location.pathname.includes("reset")
      ? "reset"
      : location.pathname.includes("register")
        ? "register"
        : "login";
  const [mode, setMode] = useState<Mode>(routeMode);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => setMode(routeMode), [routeMode]);
  useEffect(() => {
    if (user && mode === "login") navigate("/dashboard");
  }, [user, mode, navigate]);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function switchMode(next: Mode) {
    setMode(next);
    setStatus("idle");
    setMessage("");
    navigate(next === "login" ? "/login" : `/${next === "register" ? "register" : `${next}-password`}`);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      if (mode === "forgot") {
        await sendPasswordReset(form.email);
        setMessage("Check your inbox for a secure password reset link.");
      } else if (mode === "reset") {
        if (form.password.length < 8) throw new Error("Use at least 8 characters.");
        if (form.password !== form.confirmPassword) throw new Error("Passwords do not match.");
        await updatePassword(form.password);
        setMessage("Password updated. You can continue to your profile.");
      } else if (mode === "register") {
        if (!acceptedTerms) throw new Error("Please accept the Terms and Privacy Policy.");
        if (!/^[a-z0-9-]{3,24}$/i.test(form.username)) {
          throw new Error("Username must be 3–24 letters, numbers, or hyphens.");
        }
        if (form.password.length < 8) throw new Error("Use at least 8 characters.");
        if (form.password !== form.confirmPassword) throw new Error("Passwords do not match.");
        const result = await signUp(form);
        setMessage(
          result.needsVerification
            ? "Account created. Verify your email to activate your explorer profile."
            : "Account created. Your explorer profile is ready.",
        );
        if (!result.needsVerification) navigate("/settings?welcome=1");
      } else {
        await signIn(form.email, form.password);
        if (!remember) await Promise.resolve();
        navigate("/dashboard");
      }
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  const title =
    mode === "register"
      ? "Start your permanent trail record."
      : mode === "forgot"
        ? "Find your way back."
        : mode === "reset"
          ? "Choose a new password."
          : "Welcome back, explorer.";

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 pb-20 md:pb-0">
      <div className="hidden lg:block relative overflow-hidden bg-stone">
        <img
          src="https://images.unsplash.com/photo-1632760306935-c3fca6862dbf?w=1200&h=1400&fit=crop&auto=format"
          alt="Explorer crossing a mountain meadow"
          className="absolute inset-0 size-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-cream">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-darker">Your outdoor identity</p>
          <p className="font-display text-4xl font-semibold leading-tight mt-3 max-w-lg">
            Every trail becomes part of the story only you can tell.
          </p>
          <div className="flex gap-8 mt-8 text-sm text-cream-darker">
            <span>98 destinations</span>
            <span>Verified records</span>
            <span>Explorer community</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-10">
            <span className="size-10 bg-forest rounded-md flex items-center justify-center text-cream font-display font-bold">H</span>
            <span className="font-display font-semibold text-stone text-xl">HikeIN</span>
          </Link>
          <p className="text-forest text-xs font-semibold uppercase tracking-widest mb-2">
            {mode === "register" ? "Create explorer profile" : mode === "login" ? "Member access" : "Account recovery"}
          </p>
          <h1 className="font-display text-4xl font-bold text-stone">{title}</h1>
          <p className="text-stone-light text-sm mt-2 mb-8">
            {mode === "register"
              ? "Build a trusted history of every hike, summit, and place you explore."
              : mode === "login"
                ? "Continue building your outdoor history."
                : "We will help you securely recover your account."}
          </p>

          {message && (
            <div
              role="alert"
              className={`rounded-xl border p-4 text-sm mb-6 ${
                status === "error"
                  ? "border-red-200 bg-red-50 text-red-800"
                  : "border-forest/20 bg-forest/5 text-forest"
              }`}
            >
              {message}
            </div>
          )}

          {status === "success" && (mode === "forgot" || mode === "register") ? (
            <div className="bg-white border border-cream-darker rounded-2xl p-6">
              <p className="font-display text-xl font-bold text-stone">Check your email</p>
              <p className="text-stone-mid text-sm mt-2">{message}</p>
              <button onClick={() => switchMode("login")} className="mt-6 text-forest text-sm font-semibold hover:underline">
                Return to sign in
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              {mode === "register" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name">
                    <input required value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" className="auth-input" placeholder="Aman Ali" />
                  </Field>
                  <Field label="Username">
                    <input required value={form.username} onChange={(event) => update("username", event.target.value)} autoComplete="username" className="auth-input" placeholder="aman-ali" />
                  </Field>
                </div>
              )}
              {mode !== "reset" && (
                <Field label={mode === "login" ? "Email or username" : "Email"}>
                  <input required type={mode === "login" ? "text" : "email"} value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="username" className="auth-input" placeholder={mode === "login" ? "you@example.com or aman-ali" : "you@example.com"} />
                </Field>
              )}
              {(mode === "login" || mode === "register" || mode === "reset") && (
                <Field label={mode === "reset" ? "New password" : "Password"}>
                  <div className="relative">
                    <input required type={showPassword ? "text" : "password"} value={form.password} onChange={(event) => update("password", event.target.value)} autoComplete={mode === "login" ? "current-password" : "new-password"} className="auth-input pr-20" placeholder="At least 8 characters" />
                    <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-light hover:text-stone">
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </Field>
              )}
              {(mode === "register" || mode === "reset") && (
                <Field label="Confirm password">
                  <input required type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={(event) => update("confirmPassword", event.target.value)} autoComplete="new-password" className="auth-input" placeholder="Repeat your password" />
                </Field>
              )}

              {mode === "login" && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-stone-mid">
                    <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="accent-forest" />
                    Remember me
                  </label>
                  <button type="button" onClick={() => switchMode("forgot")} className="text-forest font-semibold hover:underline">Forgot password?</button>
                </div>
              )}
              {mode === "register" && (
                <label className="flex items-start gap-3 text-xs text-stone-mid leading-relaxed">
                  <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} className="mt-0.5 accent-forest" />
                  <span>I agree to the Terms of Service and Privacy Policy and understand that public activity is visible to the HikeIN community.</span>
                </label>
              )}

              <button disabled={status === "loading"} className="w-full bg-forest text-cream font-semibold py-3.5 rounded-xl hover:bg-forest-light transition-colors disabled:opacity-60">
                {status === "loading"
                  ? "Please wait…"
                  : mode === "register"
                    ? "Create explorer profile"
                    : mode === "forgot"
                      ? "Send reset link"
                      : mode === "reset"
                        ? "Update password"
                        : "Sign in"}
              </button>
            </form>
          )}

          {(mode === "login" || mode === "register") && (
            <p className="text-center text-sm text-stone-light mt-7">
              {mode === "register" ? "Already a member?" : "New to HikeIN?"}{" "}
              <button onClick={() => switchMode(mode === "register" ? "login" : "register")} className="text-forest font-semibold hover:underline">
                {mode === "register" ? "Sign in" : "Create an account"}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-stone uppercase tracking-wide mb-2">{label}</span>
      {children}
    </label>
  );
}
