import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Privacy Policy</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Last updated: November 2026</p>

        <section className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">1. Information We Collect</h2>
          <p>
            When you use SkyroCodeX, we collect code inputs submitted for execution to proxy them to isolated sandbox
            containers. If you register an account, we store your profile details via Supabase Auth.
          </p>

          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">2. Code Execution & Data Retention</h2>
          <p>
            Executed code is treated in an ephemeral manner. Temporary execution containers are destroyed immediately
            following execution. Code saved as snippets is stored in encrypted databases protected by Row-Level Security.
          </p>

          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">3. Contact</h2>
          <p>If you have any questions regarding privacy, please contact contact@skyrovix.in.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
