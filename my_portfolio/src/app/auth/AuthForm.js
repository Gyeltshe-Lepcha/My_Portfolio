"use client";

import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction, signupAction } from "@/actions/authActions";

export default function AuthForm({ mode = "login" }) {
  const router = useRouter();
  const action = mode === "signup" ? signupAction : loginAction;
  const [state, formAction, pending] = useActionState(action, {});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isSignup = mode === "signup";
  const passwordsDiffer = isSignup && confirmPassword.length > 0 && password !== confirmPassword;
  const passwordTooShort = password.length > 0 && password.length < 8;
  const blockSubmit = pending || passwordsDiffer || passwordTooShort;

  useEffect(() => {
    if (!isSignup || !state?.ok) return undefined;

    const timeout = window.setTimeout(() => {
      router.push("/auth/login");
    }, 1500);

    return () => window.clearTimeout(timeout);
  }, [isSignup, router, state?.ok]);

  const validationMessage = useMemo(() => {
    if (passwordsDiffer) return "Passwords do not match.";
    if (passwordTooShort) return "Password must be at least 8 characters.";
    if (isSignup && confirmPassword && password === confirmPassword) return "Passwords match.";
    return "";
  }, [confirmPassword, isSignup, password, passwordTooShort, passwordsDiffer]);

  return (
    <main className="cinematic-shell min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      <div className="cinematic-ambient" aria-hidden="true">
        <div className="cinematic-ambient__color cinematic-ambient__color--dawn" />
        <div className="cinematic-ambient__glow cinematic-ambient__glow--one" />
        <div className="cinematic-ambient__glow cinematic-ambient__glow--two" />
        <div className="cinematic-ambient__grain" />
      </div>

      <form action={formAction} className="relative z-10 w-full max-w-md rounded-2xl border border-white/50 bg-white/60 p-8 shadow-[0_24px_90px_rgba(91,33,182,0.16)] backdrop-blur-xl space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-purple-600">Portfolio access</p>
          <h1 className="mt-2 text-3xl font-extrabold text-gray-950">
            {mode === "signup" ? "Create admin profile" : "Welcome back"}
          </h1>
        </div>

        {mode === "signup" && (
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-gray-700">Display name</span>
            <input name="name" required className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-500" />
          </label>
        )}

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-gray-700">Email</span>
          <input name="email" type="email" autoComplete="email" required className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-500" />
        </label>

        <PasswordField
          label="Password"
          name="password"
          value={password}
          visible={passwordVisible}
          onChange={setPassword}
          onToggle={() => setPasswordVisible((current) => !current)}
          autoComplete={isSignup ? "new-password" : "current-password"}
          invalid={passwordTooShort}
        />

        {isSignup && (
          <PasswordField
            label="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            visible={confirmVisible}
            onChange={setConfirmPassword}
            onToggle={() => setConfirmVisible((current) => !current)}
            autoComplete="new-password"
            invalid={passwordsDiffer}
          />
        )}

        {validationMessage && (
          <p
            aria-live="polite"
            className={`rounded-xl px-4 py-3 text-sm font-medium transition duration-300 ${
              passwordsDiffer || passwordTooShort
                ? "bg-red-50/90 text-red-700 ring-1 ring-red-200"
                : "bg-emerald-50/90 text-emerald-700 ring-1 ring-emerald-200"
            }`}
          >
            {validationMessage}
          </p>
        )}

        {state?.error && <p aria-live="assertive" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200 transition duration-300">{state.error}</p>}

        {state?.ok && (
          <p aria-live="polite" className="rounded-xl bg-emerald-50/95 px-4 py-3 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 shadow-[0_0_34px_rgba(16,185,129,0.22)] transition duration-500">
            {state.message || "Account created successfully. Redirecting to login..."}
          </p>
        )}

        <button
          disabled={blockSubmit || state?.ok}
          className="w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="inline-flex items-center justify-center gap-2">
            {(pending || state?.ok) && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {state?.ok ? "Redirecting..." : pending ? "Please wait..." : mode === "signup" ? "Create account" : "Login"}
          </span>
        </button>

        <p className="text-center text-sm text-gray-600">
          {mode === "signup" ? "Already have an account? " : "Need an account? "}
          <Link className="font-semibold text-purple-600" href={mode === "signup" ? "/auth/login" : "/auth/signup"}>
            {mode === "signup" ? "Login" : "Sign up"}
          </Link>
        </p>
      </form>
    </main>
  );
}

function PasswordField({ label, name, value, visible, onChange, onToggle, autoComplete, invalid }) {
  const Icon = visible ? EyeOff : Eye;

  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <div
        className={`group relative rounded-xl border bg-white/70 transition duration-300 focus-within:ring-2 ${
          invalid
            ? "border-red-300 focus-within:ring-red-400"
            : "border-white/60 focus-within:border-purple-300 focus-within:ring-purple-500"
        }`}
      >
        <input
          name={name}
          type={visible ? "text" : "password"}
          minLength={8}
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          aria-invalid={invalid}
          className="w-full rounded-xl bg-transparent px-4 py-3 pr-12 outline-none"
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-500 transition duration-300 hover:scale-105 hover:bg-white/70 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <Icon className="h-5 w-5 transition duration-300" aria-hidden="true" />
        </button>
      </div>
    </label>
  );
}
