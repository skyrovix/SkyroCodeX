"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Supabase Authentication will be configured in Step 4. You can continue using the online IDE immediately with local caching!");
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <img
                src="/logo-wordmark-dark.png"
                alt="SkyroCodeX"
                className="hidden dark:block h-8 w-auto object-contain"
              />
              <img
                src="/logo-wordmark-light.png"
                alt="SkyroCodeX"
                className="block dark:hidden h-8 w-auto object-contain"
              />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Create an Account</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Start saving snippets and sharing code projects</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Skyrovix Dev"
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@skyrovix.com"
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full mt-2 shadow-glow font-bold">
              Sign Up
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">
              Log in
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/editor" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300">
              <span>Or jump directly to the online IDE</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
