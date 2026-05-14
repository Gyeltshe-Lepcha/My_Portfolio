"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, signupAction } from "@/actions/authActions";

export default function AuthForm({ mode = "login" }) {
  const action = mode === "signup" ? signupAction : loginAction;
  const [state, formAction, pending] = useActionState(action, {});

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
            <input name="name" required className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500" />
          </label>
        )}

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-gray-700">Email</span>
          <input name="email" type="email" required className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500" />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-gray-700">Password</span>
          <input name="password" type="password" minLength={8} required className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500" />
        </label>

        {state?.error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{state.error}</p>}

        <button disabled={pending} className="w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:opacity-60">
          {pending ? "Please wait..." : mode === "signup" ? "Create account" : "Login"}
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
