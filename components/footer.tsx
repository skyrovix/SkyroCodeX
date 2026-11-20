"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Send, Globe, Shield, Terminal, Code2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#080C14] text-slate-600 dark:text-slate-400 transition-colors">
      {/* Main Multi-Column Links Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/logo-wordmark-dark.png"
                alt="SkyroCodeX"
                className="hidden dark:block h-7 w-auto object-contain"
              />
              <img
                src="/logo-wordmark-light.png"
                alt="SkyroCodeX"
                className="block dark:hidden h-7 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              SkyroCodeX is the high-performance online IDE and sandboxed compiler platform by{" "}
              <strong className="text-slate-900 dark:text-slate-200 font-semibold">Skyrovix</strong>. Write, compile, debug,
              and share code with zero setup.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2 max-w-sm">
              <span className="block text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-2">
                Stay updated with compiler runtimes
              </span>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@skyrovix.com"
                  required
                  className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
                <Button type="submit" variant="primary" size="sm" className="h-9 px-3.5 shadow-glow text-xs font-bold">
                  {subscribed ? <Check className="h-4 w-4" /> : <Send className="h-3.5 w-3.5" />}
                  <span className="ml-1">{subscribed ? "Subscribed" : "Join"}</span>
                </Button>
              </form>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
                No spam. Unsubscribe anytime.
              </span>
            </div>
          </div>

          {/* Column 1: Online Compilers */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-orange-500" />
              <span>Compilers</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center justify-between">
                  <span>Python 3 Compiler</span>
                  <span className="text-[10px] font-mono text-slate-400">v3.10</span>
                </Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center justify-between">
                  <span>JavaScript / Node.js</span>
                  <span className="text-[10px] font-mono text-slate-400">v18</span>
                </Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center justify-between">
                  <span>C++ (G++) Compiler</span>
                  <span className="text-[10px] font-mono text-slate-400">GCC 10</span>
                </Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center justify-between">
                  <span>Java OpenJDK Runtime</span>
                  <span className="text-[10px] font-mono text-slate-400">v15</span>
                </Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center justify-between">
                  <span>C (GCC) Online</span>
                  <span className="text-[10px] font-mono text-slate-400">GCC 10</span>
                </Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center justify-between">
                  <span>Go (Golang) Runner</span>
                  <span className="text-[10px] font-mono text-slate-400">v1.16</span>
                </Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center justify-between">
                  <span>SQL SQLite Sandbox</span>
                  <span className="text-[10px] font-mono text-slate-400">v3.36</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform Features */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 text-amber-500" />
              <span>Features</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Monaco VS Code Editor
                </Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Web Live Preview (HTML/CSS/JS)
                </Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Standard Input (stdin) Console
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Saved Snippets Workspace
                </Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  One-Click Sharing & Forking
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Isolated Linux Containers
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Multi-Tab Code Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Skyrovix Ecosystem */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-orange-500" />
              <span>Skyrovix</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  About Skyrovix
                </Link>
              </li>
              <li>
                <a
                  href="https://skyrovix.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1 group"
                >
                  <span>Skyrovix Internship</span>
                  <ArrowUpRight className="h-3 w-3 text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://skyrovix.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1 group"
                >
                  <span>Skyrovix Courses</span>
                  <ArrowUpRight className="h-3 w-3 text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Security & Sandboxing
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Status, Copyright & Legal Badges */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              © {new Date().getFullYear()} SkyroCodeX by <span className="text-slate-800 dark:text-slate-200 font-bold">Skyrovix</span>. All rights reserved.
            </span>
          </div>

          {/* Live System Status Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>All 9+ Runtimes Operational</span>
            </div>
            <span className="text-slate-400 hidden md:inline">•</span>
            <span className="text-slate-500 hidden md:inline">Response Time: &lt; 25ms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
