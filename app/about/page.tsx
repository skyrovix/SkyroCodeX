"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Zap,
  Globe,
  Award,
  Terminal,
  Cpu,
  Layers,
  Users,
  Code2,
  Sparkles,
  ArrowRight,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 dark:text-orange-400 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-orange-500" />
              <span>Engineering the Future of Cloud Compilers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              About <span className="text-gradient">SkyroCodeX</span> & <span className="text-slate-900 dark:text-white">Skyrovix</span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              SkyroCodeX was conceived and built by <span className="text-orange-600 dark:text-orange-400 font-bold">Skyrovix</span> with a singular objective: remove every obstacle between writing code and seeing it run.
            </p>
          </div>
        </section>

        {/* Our Mission & Philosophy */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                The Skyrovix Vision
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Empowering Developers Without Configuration Friction
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you are a university student learning Python and C++ for the first time, a full-stack engineer prototyping a React/Node component, or an interviewer grading algorithmic efficiency, you shouldn&apos;t have to wrestle with compiler flags, missing DLLs, or environment variables.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                SkyroCodeX brings the fidelity of VS Code directly into any web browser, powered by an isolated Linux container engine that executes code safely in milliseconds.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="text-3xl font-black text-orange-600 dark:text-orange-400 mb-1">9+</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Supported Languages</div>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="text-3xl font-black text-amber-500 mb-1">&lt; 50ms</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Execution Latency</div>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="text-3xl font-black text-emerald-500 mb-1">100%</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Container Sandboxed</div>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="text-3xl font-black text-blue-500 mb-1">0 Config</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Browser Ready</div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Architected on Three Non-Negotiables
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
                <Zap className="h-6 w-6 text-orange-500 mb-3" />
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Uncompromising Speed</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every runtime is pre-warmed in lightweight worker containers. Code compiles, executes, and streams output with minimal latency.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
                <Shield className="h-6 w-6 text-emerald-500 mb-3" />
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Zero-Trust Security</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  No user code ever touches host servers. Memory limits (256MB), CPU ceilings (5s), and network barriers protect infrastructure.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
                <Globe className="h-6 w-6 text-amber-500 mb-3" />
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Frictionless Collaboration</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Generate instant, immutable shortlinks for bug reproductions, tutorial code, and technical interviews.
                </p>
              </div>
            </div>
          </div>

          {/* Skyrovix Ecosystem Links */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-8 sm:p-12">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Part of the Skyrovix Developer Network
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                Skyrovix also provides industry engineering internships and self-paced certification courses designed to help developers build production skills.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="https://skyrovix.in" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" className="font-bold gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Skyrovix Internship (skyrovix.in)</span>
                  </Button>
                </a>
                <a href="https://skyrovix.online" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="font-bold gap-2">
                    <GraduationCap className="h-4 w-4 text-orange-500" />
                    <span>Skyrovix Courses (skyrovix.online)</span>
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="font-bold">
                    <span>Contact Us</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
