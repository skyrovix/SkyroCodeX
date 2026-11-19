import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto prose prose-invert prose-slate">
        <h1 className="text-3xl font-extrabold text-white mb-6">Terms of Service</h1>
        <p className="text-sm text-slate-400 mb-6">Last updated: November 2026</p>

        <section className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold text-slate-100">1. Acceptable Use Policy</h2>
          <p>
            Users must not attempt to execute malicious software, denial of service attacks, crypto-mining, port scanning,
            or unauthorized penetration testing via SkyroCodeX execution sandboxes.
          </p>

          <h2 className="text-lg font-semibold text-slate-100">2. Resource Quotas</h2>
          <p>
            Execution requests are subject to strict per-request and rate limits (5s execution time limit, 256MB memory limit,
            and 30 requests/minute per client).
          </p>

          <h2 className="text-lg font-semibold text-slate-100">3. Disclaimer</h2>
          <p>
            SkyroCodeX and Skyrovix provide the compiler service &ldquo;as is&rdquo; without warranties of any kind.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
