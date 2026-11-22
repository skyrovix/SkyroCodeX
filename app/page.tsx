"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { LANGUAGE_LIST, getLanguageConfig } from "@/lib/languages";
import {
  PythonIcon,
  JavaScriptIcon,
  CppIcon,
  JavaIcon,
  CIcon,
  PhpIcon,
  SqlIcon,
  HtmlIcon,
  CssIcon,
  GoIcon,
} from "@/components/icons/language-icons";
import {
  Zap,
  ShieldCheck,
  Share2,
  Layers,
  ArrowRight,
  Sparkles,
  Play,
  Terminal,
  Cpu,
  Clock,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Laptop,
  Users,
  Code2,
  Cloud,
  Maximize2,
  RotateCw,
  Settings,
} from "lucide-react";

export default function LandingPage() {
  // FAQ accordion open state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const coreFeatures = [
    {
      icon: <Zap className="h-6 w-6 text-orange-500" />,
      title: "Zero-Setup Cloud Runtime",
      description:
        "Skip the complex local installation of compilers, toolchains, or interpreters. Write and execute in your browser immediately.",
    },
    {
      icon: <Layers className="h-6 w-6 text-amber-500" />,
      title: "Multi-Language & Web Mode",
      description:
        "Full support for Python, JavaScript, Java, C, C++, Go, PHP, SQLite, plus interactive HTML/CSS/JS with real-time sandboxed preview.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
      title: "Hardened Container Sandbox",
      description:
        "Every execution runs in isolated Linux containers enforcing strict CPU (5s), memory (256MB), and network restrictions.",
    },
    {
      icon: <Share2 className="h-6 w-6 text-orange-500" />,
      title: "Instant Snippet Sharing",
      description:
        "Generate short links (/s/abc123) to share reproducible code with colleagues, students, or interviewers. Forkable with one click.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Select Your Runtime",
      desc: "Pick from 9+ supported languages or start an interactive Web (HTML/CSS/JS) multi-tab workspace.",
    },
    {
      num: "02",
      title: "Code in Monaco Editor",
      desc: "Enjoy auto-completion, VS Code shortcuts, bracket matching, syntax highlighting, and dual dark/light themes.",
    },
    {
      num: "03",
      title: "Run, Test & Share",
      desc: "Pass standard input (stdin), view instant console output, and generate unique share links for teammates.",
    },
  ];

  const faqs = [
    {
      q: "Is SkyroCodeX completely free to use?",
      a: "Yes! SkyroCodeX is free for students, developers, and educators. You can write and execute code across all supported languages with zero setup.",
    },
    {
      q: "How does the code execution sandbox remain secure?",
      a: "All code runs inside isolated Linux containers (Judge0 CE / Piston architecture). Sandboxes enforce a strict 5.0-second CPU time limit, 256MB memory cap, read-only root filesystems, and zero external network access, preventing fork bombs and malicious code execution.",
    },
    {
      q: "Can I pass custom standard input (stdin) to my programs?",
      a: "Yes! The I/O panel includes a dedicated 'Input (stdin)' tab. You can input custom data before clicking Run, and your program will read it exactly like terminal input.",
    },
    {
      q: "How does the interactive Web (HTML/CSS/JS) mode work?",
      a: "Web mode provides multi-tab editing for index.html, styles.css, and script.js with an instant live preview. The iframe uses a strict sandbox=\"allow-scripts\" policy without allow-same-origin, preventing interference with your parent session.",
    },
    {
      q: "Can I share code with teammates or students?",
      a: "Clicking 'Share' generates a unique short URL (e.g. /s/X7k9Lm2). Anyone visiting that link can view the code, run it, or click 'Fork & Edit' to create their own editable copy.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#080C14] text-slate-900 dark:text-slate-100 selection:bg-orange-500 selection:text-white transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
        {/* Soft Ambient Mesh Glow Backgrounds (Peach/Amber on left, Radiant Violet on right) */}
        <div className="absolute top-0 left-[-5%] w-[650px] h-[580px] bg-gradient-to-br from-orange-400/20 via-amber-400/15 to-transparent blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-0 right-[-5%] w-[680px] h-[600px] bg-gradient-to-bl from-purple-600/20 via-indigo-500/15 to-transparent blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-orange-500/5 dark:bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Subtle Ambient Dot Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-20 opacity-50" />

        {/* Perspective Grid Floor at Bottom */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-[linear-gradient(to_right,rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:36px_36px] [transform:perspective(500px)_rotateX(60deg)] pointer-events-none origin-bottom opacity-75 -z-10" />

        {/* Decorative Dot Matrices in Top Corners */}
        <div className="absolute top-10 left-6 sm:left-12 grid grid-cols-5 gap-2 opacity-35 pointer-events-none -z-10">
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600" />
          ))}
        </div>
        <div className="absolute top-10 right-6 sm:right-12 grid grid-cols-5 gap-2 opacity-35 pointer-events-none -z-10">
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600" />
          ))}
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
          {/* Ambient Floating 3D Badges */}
          <div className="absolute top-2 -left-4 sm:-left-8 z-20 hidden md:flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-700 text-white font-mono font-black text-xl shadow-2xl shadow-purple-500/40 -rotate-12 hover:rotate-0 hover:scale-110 transition-all cursor-default select-none border border-white/20 animate-float">
            &lt;/&gt;
          </div>
          <div className="absolute top-4 -right-4 sm:-right-8 z-20 hidden md:flex items-center justify-center h-13 w-13 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-2xl shadow-amber-500/25 rotate-6 hover:rotate-0 hover:scale-110 transition-all cursor-default select-none p-2.5 animate-float-delayed">
            <Zap className="h-7 w-7 text-amber-500 fill-amber-500" />
          </div>
          <div className="absolute bottom-28 -right-6 sm:-right-10 z-20 hidden lg:flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 text-white shadow-2xl shadow-purple-500/40 rotate-12 hover:rotate-0 hover:scale-110 transition-all cursor-default select-none border border-white/20 animate-float">
            <Cloud className="h-7 w-7 fill-white/20" />
          </div>
          <div className="absolute bottom-28 -left-6 sm:-left-10 z-20 hidden lg:flex items-center gap-2 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-3.5 py-1.5 shadow-xl animate-float-delayed text-xs">
            <Zap className="h-3.5 w-3.5 text-orange-500 fill-orange-500" />
            <span className="font-bold text-orange-600 dark:text-orange-400 font-mono">&lt; 25ms</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Execution</span>
          </div>

          {/* Centered Hero Content */}
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center space-y-6 sm:space-y-7">
            {/* Top Floating Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 dark:border-orange-500/25 bg-orange-50/80 dark:bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-orange-500 fill-orange-500" />
              <span>Next-Generation Cloud IDE &amp; Compilers by Skyrovix</span>
              <span className="rounded-full bg-purple-100 dark:bg-purple-900/50 px-2 py-0.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300">
                v2.0
              </span>
            </div>

            {/* Main Headline with Brush Underline Flourish */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Code. Run. Share.{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                  Instantly.
                </span>
                {/* Subtle curved brush flourish underline */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3 text-orange-500"
                  viewBox="0 0 260 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 13C60 4 150 2 257 11C180 8 95 7 15 15"
                    stroke="url(#hero-brush-gradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="hero-brush-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              The ultra-fast, sandboxed online code compiler and IDE with Monaco Editor,
              live web preview, multi-language support, and zero setup required.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
              <Link href="/editor">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-bold px-8 py-3.5 h-12 shadow-lg shadow-orange-500/25 text-sm sm:text-base gap-2.5 border-0 hover:scale-[1.02] transition-transform"
                >
                  <Play className="h-4 w-4 fill-white text-white" />
                  <span>Start Coding Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/editor">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-7 py-3.5 h-12 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-sm sm:text-base gap-2 hover:scale-[1.02] transition-transform"
                >
                  <span className="text-orange-500 font-mono font-bold">&lt;/&gt;</span>
                  <span>Explore 10+ Compilers</span>
                </Button>
              </Link>
            </div>

            {/* Supported Languages Showcase Grid (Centered 2 Rows with Official Style) */}
            <div className="space-y-2 pt-2 flex flex-col items-center">
              {/* Row 1 */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: "python", name: "Python", version: "3.10", icon: <PythonIcon /> },
                  { id: "javascript", name: "JavaScript", version: "(Node 18)", icon: <JavaScriptIcon /> },
                  { id: "html", name: "HTML", version: "5", icon: <HtmlIcon /> },
                  { id: "css", name: "CSS", version: "3", icon: <CssIcon /> },
                  { id: "cpp", name: "C++", version: "(G++ 10)", icon: <CppIcon /> },
                ].map((item) => (
                  <Link
                    key={item.id}
                    href={`/compiler/${item.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 px-3.5 py-1.5 shadow-sm hover:shadow-md hover:border-orange-500/50 hover:scale-105 transition-all group"
                  >
                    {item.icon}
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-500 transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                        {item.version}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: "java", name: "Java", version: "(OpenJDK 15)", icon: <JavaIcon /> },
                  { id: "c", name: "C", version: "(GCC 10)", icon: <CIcon /> },
                  { id: "go", name: "Go", version: "1.16", icon: <GoIcon /> },
                  { id: "php", name: "PHP", version: "8.2", icon: <PhpIcon /> },
                  { id: "sql", name: "SQL", version: "(SQLite)", icon: <SqlIcon /> },
                ].map((item) => (
                  <Link
                    key={item.id}
                    href={`/compiler/${item.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 px-3.5 py-1.5 shadow-sm hover:shadow-md hover:border-orange-500/50 hover:scale-105 transition-all group"
                  >
                    {item.icon}
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-500 transition-colors">
                        {item.name}
                      </span>
                      {item.version && (
                        <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                          {item.version}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400 fill-purple-600 dark:fill-purple-400" />
                <span>Zero local configuration</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>100% Free &amp; Unlimited</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span>No account required</span>
              </div>
            </div>
          </div>

          {/* Unified Floating Stats Bar */}
          <div className="mt-14 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-5 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
              {/* Metric 1 */}
              <div className="flex items-center justify-center gap-3 p-3 text-left">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <Zap className="h-5 w-5 fill-orange-500 text-orange-500" />
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400 leading-tight">
                    &lt; 25ms
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Execution Latency
                  </span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center justify-center gap-3 p-3 text-left">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    10+
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Compiler Runtimes
                  </span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center justify-center gap-3 p-3 text-left">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-tight">
                    100%
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Isolated Containers
                  </span>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="flex items-center justify-center gap-3 p-3 text-left">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    0s
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Setup Time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              How SkyroCodeX Works
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              A seamless flow designed to get you from an idea to executed code in less than 3 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm hover:border-orange-500/50 transition-all group"
              >
                <div className="text-4xl font-black text-orange-500/20 group-hover:text-orange-500/40 transition-colors mb-3">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{s.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Engineered for Developers, Students & Educators
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Everything you need to write, experiment, debug, and share code without leaving your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((f, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-xl shadow-sm"
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-700/60 group-hover:scale-105 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{f.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Matrix Section */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Why Choose SkyroCodeX?
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
              See how SkyroCodeX stands out compared to local setups and generic online compilers.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
                  <th className="p-4 font-bold text-slate-700 dark:text-slate-300">Feature</th>
                  <th className="p-4 font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10">SkyroCodeX</th>
                  <th className="p-4 font-medium text-slate-500">Traditional Local Setup</th>
                  <th className="p-4 font-medium text-slate-500">Generic Online Compilers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                <tr>
                  <td className="p-4 text-slate-800 dark:text-slate-200">Setup & Config Time</td>
                  <td className="p-4 text-orange-600 dark:text-orange-400 bg-orange-500/5 font-bold">0 seconds (Instant)</td>
                  <td className="p-4 text-slate-500">30 - 60 minutes</td>
                  <td className="p-4 text-slate-500">Instant</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-800 dark:text-slate-200">Editor Experience</td>
                  <td className="p-4 text-orange-600 dark:text-orange-400 bg-orange-500/5 font-bold">Monaco (VS Code Engine)</td>
                  <td className="p-4 text-slate-500">Full VS Code</td>
                  <td className="p-4 text-slate-500">Basic Textarea</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-800 dark:text-slate-200">Web Mode (HTML/CSS/JS)</td>
                  <td className="p-4 text-orange-600 dark:text-orange-400 bg-orange-500/5 font-bold">Live Sandboxed Iframe</td>
                  <td className="p-4 text-slate-500">Requires Live Server</td>
                  <td className="p-4 text-slate-500">Rare / Clunky</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-800 dark:text-slate-200">Sharing & Forking</td>
                  <td className="p-4 text-orange-600 dark:text-orange-400 bg-orange-500/5 font-bold">One-Click Short URL (/s/...)</td>
                  <td className="p-4 text-slate-500">Git repo + Pull Request</td>
                  <td className="p-4 text-slate-500">Ad-heavy links</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-800 dark:text-slate-200">Dark / Light Theming</td>
                  <td className="p-4 text-orange-600 dark:text-orange-400 bg-orange-500/5 font-bold">Obsidian & Solar Themes</td>
                  <td className="p-4 text-slate-500">Manual themes</td>
                  <td className="p-4 text-slate-500">Limited / Inconsistent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Supported Languages Section */}
      <section id="languages" className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/40 dark:bg-slate-900/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Supported Languages & Environments
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Select any language to open with verified starter code, syntax highlighting, and isolated runtime.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {LANGUAGE_LIST.map((lang) => (
              <Link
                key={lang.id}
                href="/editor"
                className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 hover:border-orange-500/70 hover:shadow-lg dark:hover:bg-slate-900 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {lang.name}
                  </span>
                  <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-400 font-medium">
                    {lang.version}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{lang.isWebPreview ? "Live Web Preview" : `Extension: ${lang.fileExtension}`}</span>
                  <span className="text-orange-600 dark:text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-bold">
                    Open IDE <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skyrovix Community & Internships Section */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold mb-4">
                <Users className="h-3.5 w-3.5" />
                <span>Skyrovix Ecosystem</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3">
                Empowering the Next Generation of Engineers
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                SkyroCodeX directly integrates with the Skyrovix internship and developer training program.
                Interns can solve practice challenges, run automated test suites, and submit verified solutions
                directly from their browser.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/editor">
                  <Button variant="primary" className="shadow-glow font-bold">
                    <span>Try Challenge Runner</span>
                  </Button>
                </Link>
                <a href="https://skyrovix.in" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="font-semibold gap-1.5">
                    <span>Skyrovix Internship</span>
                    <ExternalLink className="h-3.5 w-3.5 text-orange-500" />
                  </Button>
                </a>
                <a href="https://skyrovix.online" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="font-semibold gap-1.5">
                    <span>Skyrovix Courses</span>
                    <ExternalLink className="h-3.5 w-3.5 text-orange-500" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/30 dark:bg-slate-900/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
              Everything you need to know about SkyroCodeX and sandboxed code execution.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-orange-500" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom High-Impact CTA Banner */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-transparent to-orange-500/10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Ready to test your code in seconds?
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Zero setup, zero installation. Join thousands of students and engineers compiling code online with SkyroCodeX.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/editor">
              <Button size="lg" variant="primary" className="px-8 shadow-glow font-bold text-base">
                Launch SkyroCodeX IDE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
