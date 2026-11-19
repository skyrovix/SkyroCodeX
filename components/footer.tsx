import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0B0F17] py-8 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex-shrink-0">
              <img
                src="/logo-icon.png"
                alt="SkyroCodeX Icon"
                className="h-full w-full object-contain filter drop-shadow-[0_0_6px_rgba(255,87,34,0.4)]"
              />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center">
                <span>Skyro</span>
                <span className="text-[#FF5722]">C</span>
                <span>ode</span>
                <span className="text-[#FF5722]">X</span>
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Code. Run. Share. Instantly. Powered by <span className="text-orange-600 dark:text-orange-400 font-semibold">Skyrovix</span>
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Online IDE
            </Link>
            <Link href="/about" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              About Skyrovix
            </Link>
            <Link href="/privacy" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Status & Copyright */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Systems Operational</span>
            </div>
            <span className="text-slate-500">© {new Date().getFullYear()} Skyrovix Inc.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
