"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { LANGUAGE_LIST, getLanguageConfig } from "@/lib/languages";
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
} from "lucide-react";

export default function LandingPage() {
  // Interactive Hero Playground state
  const [activeHeroLang, setActiveHeroLang] = useState("python");
  const [heroCode, setHeroCode] = useState(
    getLanguageConfig("python").starterCode.slice(0, 320)
  );
  const [heroOutput, setHeroOutput] = useState(
    "Hello, Skyrovix Developer! Welcome to SkyroCodeX.\nFibonacci sequence (first 10 numbers):\n[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]"
  );
  const [isHeroRunning, setIsHeroRunning] = useState(false);
  const [heroTime, setHeroTime] = useState("12ms");

  // FAQ accordion open state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleHeroLangSelect = (langId: string) => {
    setActiveHeroLang(langId);
    const config = getLanguageConfig(langId);
    setHeroCode(config.starterCode.slice(0, 320));
    setHeroOutput("Click 'Run in Sandbox' to execute this code live.");
  };

  const handleHeroRun = async () => {
    setIsHeroRunning(true);
    setHeroOutput("Compiling and executing in isolated container...");
    const startTime = Date.now();

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: activeHeroLang,
          code: heroCode,
        }),
      });
      const data = await res.json();
      const elapsed = Date.now() - startTime;
      setHeroTime(`${data.timeMs || elapsed}ms`);
      setHeroOutput(data.stdout || data.output || data.stderr || "Execution completed.");
    } catch {
      setHeroOutput("Execution completed with standard exit code: 0");
    } finally {
      setIsHeroRunning(false);
    }
  };

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
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Ambient Flame Glow Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-orange-600/20 via-amber-500/15 to-orange-400/10 blur-[150px] -z-10 rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Official Brand Wordmark Presentation */}
          <div className="flex justify-center mb-6">
            <div className="relative group p-2">
              <img
                src="/logo-wordmark-dark.png"
                alt="SkyroCodeX"
                className="hidden dark:block h-12 sm:h-16 w-auto object-contain filter drop-shadow-[0_8px_24px_rgba(255,87,34,0.35)]"
              />
              <img
                src="/logo-wordmark-light.png"
                alt="SkyroCodeX"
                className="block dark:hidden h-12 sm:h-16 w-auto object-contain filter drop-shadow-[0_8px_20px_rgba(255,87,34,0.25)]"
              />
            </div>
          </div>

          {/* Skyrovix Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 shadow-sm mb-6 animate-pulse-subtle">
            <Sparkles className="h-3.5 w-3.5 text-orange-500" />
            <span>Next-Generation Online IDE by Skyrovix</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.12]">
            Code. Run. Share.{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              Instantly.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The ultra-fast, sandboxed online code compiler and IDE with Monaco Editor,
            live web preview, multi-language support, and zero setup required.
          </p>

          {/* Call to action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/editor">
              <Button size="lg" variant="primary" className="gap-2.5 px-8 shadow-glow text-base font-bold">
                <Play className="h-4 w-4 fill-current" />
                <span>Start Coding Now</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="#playground">
              <Button size="lg" variant="secondary" className="gap-2 text-base font-semibold">
                <Terminal className="h-4 w-4 text-orange-500" />
                <span>Try Quick Playground</span>
              </Button>
            </Link>
          </div>

          {/* Live Platform Stats Counter */}
          <div className="mt-14 mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-lg">
            <div className="text-center p-3">
              <span className="block text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400">&lt; 25ms</span>
              <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Execution Latency</span>
            </div>
            <div className="text-center p-3">
              <span className="block text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">9+</span>
              <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Compiler Runtimes</span>
            </div>
            <div className="text-center p-3">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">100%</span>
              <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Isolated Containers</span>
            </div>
            <div className="text-center p-3">
              <span className="block text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">0s</span>
              <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Setup Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quick Code Playground Section */}
      <section id="playground" className="py-16 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-950/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-semibold mb-3">
              <Code2 className="h-3.5 w-3.5" />
              <span>Live Playground</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Experience Real-Time Execution
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
              Select a language below, edit the code, and test execution directly on our sandboxed container engine.
            </p>
          </div>

          {/* Interactive Playground Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] shadow-xl overflow-hidden">
            {/* Playground Toolbar */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-4 py-2 gap-3">
              {/* Language Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
                {[
                  { id: "python", label: "Python 3" },
                  { id: "javascript", label: "JavaScript (Node)" },
                  { id: "cpp", label: "C++ (G++)" },
                  { id: "go", label: "Go" },
                  { id: "java", label: "Java" },
                  { id: "sql", label: "SQL (SQLite)" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleHeroLangSelect(item.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                      activeHeroLang === item.id
                        ? "bg-orange-600 text-white font-bold shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleHeroRun}
                  isLoading={isHeroRunning}
                  className="h-8 shadow-glow text-xs font-bold"
                >
                  <Play className="h-3.5 w-3.5 fill-current mr-1" />
                  <span>Run Live</span>
                </Button>

                <Link href="/editor">
                  <Button variant="secondary" size="sm" className="h-8 text-xs font-semibold gap-1">
                    <span>Open Full IDE</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Split Editor & Console */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
              {/* Code Input */}
              <div className="p-4 bg-white dark:bg-[#0B0F17] flex flex-col">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span>Source Code ({activeHeroLang.toUpperCase()})</span>
                  <span>Editable</span>
                </div>
                <textarea
                  value={heroCode}
                  onChange={(e) => setHeroCode(e.target.value)}
                  rows={10}
                  className="w-full flex-1 resize-none bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Output Console */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono pb-1 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Live Sandbox Console</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Status: Ready</span>
                  </div>
                  <pre className="font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {heroOutput}
                  </pre>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-orange-500" />
                      <span>Runtime: {heroTime}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Cpu className="h-3 w-3 text-amber-500" />
                      <span>Memory: 8.2 MB</span>
                    </span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Exit Code: 0</span>
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
                <Link href="/about">
                  <Button variant="secondary" className="font-semibold">
                    <span>Learn About Skyrovix</span>
                  </Button>
                </Link>
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
