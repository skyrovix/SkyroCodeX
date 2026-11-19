"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { LANGUAGE_LIST } from "@/lib/languages";
import {
  Code2,
  Terminal,
  Zap,
  ShieldCheck,
  Share2,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Play,
  Cpu,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-blue-400" />,
      title: "Zero-Setup Cloud Runtime",
      description:
        "Jump into code immediately without configuring compilers, interpreters, or local development environments.",
    },
    {
      icon: <Layers className="h-6 w-6 text-purple-400" />,
      title: "Multi-Language & Web Preview",
      description:
        "Full support for Python, JavaScript, Java, C, C++, Go, PHP, SQLite, plus interactive HTML/CSS/JS live preview.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
      title: "Hardened Container Sandbox",
      description:
        "Every execution is isolated in real-time Linux containers with strict CPU, memory, and network limits.",
    },
    {
      icon: <Share2 className="h-6 w-6 text-cyan-400" />,
      title: "Instant Snippet Sharing",
      description:
        "Generate short links to share your code with teammates, students, or interviewers. Forkable with one click.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-violet-600/20 to-cyan-500/10 blur-[130px] -z-10 rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Skyrovix Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-300 shadow-sm mb-6 animate-pulse-subtle">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Next-Generation Online IDE by Skyrovix</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Code. Run. Share.{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              Instantly.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A lightning-fast, sandboxed online code compiler and IDE with Monaco Editor,
            live web preview, multi-language support, and zero setup required.
          </p>

          {/* Call to action buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/editor">
              <Button size="lg" variant="primary" className="gap-2.5 px-8 shadow-glow text-base">
                <Play className="h-4 w-4 fill-current" />
                <span>Start Coding Now</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="#languages">
              <Button size="lg" variant="secondary" className="gap-2 text-base">
                <span>View 9+ Languages</span>
              </Button>
            </Link>
          </div>

          {/* Interactive Hero IDE Mockup */}
          <div className="mt-16 mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-xl">
            <div className="rounded-xl border border-slate-800/80 bg-slate-950 overflow-hidden text-left">
              {/* Fake Window Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">SkyroCodeX :: main.py</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[11px] font-mono text-blue-400">
                    Python 3.10
                  </span>
                  <span className="rounded bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 text-[11px] font-mono text-emerald-400">
                    Isolated Sandbox
                  </span>
                </div>
              </div>

              {/* Fake Code Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 font-mono text-xs">
                <div className="p-4 text-slate-300 bg-slate-950">
                  <div className="text-slate-500 mb-2"># SkyroCodeX Online Compiler</div>
                  <div><span className="text-purple-400">def</span> <span className="text-blue-400">solve_challenge</span>(name: <span className="text-cyan-400">str</span>):</div>
                  <div className="pl-4">engine = <span className="text-emerald-400">&quot;SkyroCodeX v1.0&quot;</span></div>
                  <div className="pl-4">stats = {`{"status": "ready", "speed": "< 50ms"}`}</div>
                  <div className="pl-4 text-purple-400">return <span className="text-slate-300">f</span><span className="text-emerald-400">&quot;Hello &#123;name&#125;! Welcome to &#123;engine&#125;&quot;</span></div>
                  <div className="mt-3"><span className="text-blue-400">print</span>(solve_challenge(<span className="text-emerald-400">&quot;Skyrovix Developer&quot;</span>))</div>
                </div>

                <div className="p-4 bg-slate-900/40 text-slate-300">
                  <div className="flex items-center justify-between text-slate-500 mb-2 border-b border-slate-800 pb-1">
                    <span>Console Output</span>
                    <span className="text-emerald-400 text-[10px]">Exit Code: 0</span>
                  </div>
                  <div className="text-emerald-400 font-medium">Hello Skyrovix Developer! Welcome to SkyroCodeX v1.0</div>
                  <div className="mt-4 text-[11px] text-slate-500 flex items-center gap-3">
                    <span>⏱ Time: 28ms</span>
                    <span>💾 Memory: 14.2 MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-slate-800/80 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Engineered for Developers and Students
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              Everything you need to write, experiment, debug, and share code without leaving your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/80 shadow-lg"
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 group-hover:scale-105 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">{f.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Languages Section */}
      <section id="languages" className="py-20 border-t border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Supported Languages & Environments
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              Select any language to open with verified starter code, syntax highlighting, and isolated runtime.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {LANGUAGE_LIST.map((lang) => (
              <Link
                key={lang.id}
                href="/editor"
                className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-blue-500/60 hover:bg-slate-900 transition-all shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                    {lang.name}
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                    {lang.version}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{lang.isWebPreview ? "Live Preview" : `Extension: ${lang.fileExtension}`}</span>
                  <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-medium">
                    Open IDE <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 border-t border-slate-800/80 bg-gradient-to-b from-slate-950 to-blue-950/20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to test your code in seconds?
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            No registration required to compile. Create an account to save unlimited snippets to your dashboard.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/editor">
              <Button size="lg" variant="primary" className="px-8 shadow-glow">
                Launch SkyroCodeX IDE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
