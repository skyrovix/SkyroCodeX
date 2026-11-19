import React from "react";
import Link from "next/link";
import { Code2, Github, Twitter, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-8 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-violet-600">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-semibold text-white">SkyroCodeX</span>
              <p className="text-xs text-slate-400">
                Code. Run. Share. Instantly. Powered by <span className="text-blue-400 font-medium">Skyrovix</span>
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <Link href="/editor" className="hover:text-slate-200 transition-colors">
              Online IDE
            </Link>
            <Link href="/about" className="hover:text-slate-200 transition-colors">
              About Skyrovix
            </Link>
            <Link href="/privacy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Status & Copyright */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Systems Operational</span>
            </div>
            <span className="text-slate-400">© {new Date().getFullYear()} Skyrovix Inc.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
