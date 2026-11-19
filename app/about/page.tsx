import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Code2, Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white">About SkyroCodeX</h1>
        </div>

        <p className="text-base text-slate-300 leading-relaxed mb-8">
          SkyroCodeX is developed by <span className="text-blue-400 font-semibold">Skyrovix</span> to empower
          engineers, students, and educators with an immediate, lightning-fast code compiler and development
          environment without the friction of local installations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <Zap className="h-6 w-6 text-blue-400 mb-2" />
            <h3 className="font-semibold text-slate-100 mb-1">Instant Execution</h3>
            <p className="text-xs text-slate-400">Zero machine setup. Instant results across 9+ modern runtimes.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <Shield className="h-6 w-6 text-emerald-400 mb-2" />
            <h3 className="font-semibold text-slate-100 mb-1">Isolated Security</h3>
            <p className="text-xs text-slate-400">Hardened Linux containers enforcing strict CPU, RAM, and network limits.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <Globe className="h-6 w-6 text-purple-400 mb-2" />
            <h3 className="font-semibold text-slate-100 mb-1">Collaboration First</h3>
            <p className="text-xs text-slate-400">Share reproducible code snippets via unique links in a single click.</p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6">
          <Link href="/editor">
            <Button variant="primary">Launch Online IDE</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
