import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <img
            src="/logo-wordmark-dark.png"
            alt="SkyroCodeX"
            className="hidden dark:block h-9 w-auto object-contain mb-4"
          />
          <img
            src="/logo-wordmark-light.png"
            alt="SkyroCodeX"
            className="block dark:hidden h-9 w-auto object-contain mb-4"
          />
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">About SkyroCodeX</h1>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
          SkyroCodeX is developed by <span className="text-orange-600 dark:text-orange-400 font-bold">Skyrovix</span> to empower
          engineers, students, and educators with an immediate, lightning-fast code compiler and development
          environment without the friction of local installations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 shadow-sm">
            <Zap className="h-6 w-6 text-orange-500 mb-2" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Instant Execution</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Zero machine setup. Instant results across 9+ modern runtimes.</p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 shadow-sm">
            <Shield className="h-6 w-6 text-emerald-500 mb-2" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Isolated Security</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Hardened Linux containers enforcing strict CPU, RAM, and network limits.</p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 shadow-sm">
            <Globe className="h-6 w-6 text-amber-500 mb-2" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Collaboration First</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Share reproducible code snippets via unique links in a single click.</p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6">
          <Link href="/editor">
            <Button variant="primary" className="shadow-glow font-bold">Launch Online IDE</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
