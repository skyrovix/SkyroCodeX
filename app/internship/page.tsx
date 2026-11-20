"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Send,
  Users,
} from "lucide-react";

export default function InternshipPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    college: "",
    track: "fullstack",
    duration: "8-weeks",
    github: "",
    statement: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const tracks = [
    {
      id: "fullstack",
      title: "Full-Stack Web Engineering",
      icon: <Layers className="h-6 w-6 text-orange-500" />,
      tag: "Most Popular",
      desc: "Build scalable web applications using Next.js 15, TypeScript, Tailwind CSS, Node.js, and Supabase.",
      skills: ["Next.js App Router", "TypeScript", "PostgreSQL", "REST & GraphQL", "State Management"],
    },
    {
      id: "ai-ml",
      title: "AI & Intelligent Systems",
      icon: <Cpu className="h-6 w-6 text-amber-500" />,
      tag: "High Demand",
      desc: "Develop generative AI workflows, agentic tool chains, vector embeddings, and LLM integrations.",
      skills: ["Python 3.11", "LangChain & LlamaIndex", "Vector DBs", "Model Fine-Tuning", "API Deployment"],
    },
    {
      id: "cloud-devops",
      title: "Cloud & Sandboxed DevOps",
      icon: <Code2 className="h-6 w-6 text-emerald-500" />,
      tag: "Core Infrastructure",
      desc: "Design hardened Linux execution sandboxes, Docker isolation architectures, and automated CI/CD pipelines.",
      skills: ["Docker & Containers", "Linux Kernel Sandboxing", "Judge0 / Piston", "CI/CD Actions", "Kubernetes"],
    },
    {
      id: "dsa-algorithms",
      title: "Core Systems & Algorithms",
      icon: <Award className="h-6 w-6 text-blue-500" />,
      tag: "Competitive Edge",
      desc: "Master high-efficiency algorithmic problem-solving in C++ and Java with benchmark testing.",
      skills: ["C++20 & Java 17", "Advanced Graph Algorithms", "Dynamic Programming", "Memory Profiling"],
    },
  ];

  const benefits = [
    {
      icon: <Briefcase className="h-5 w-5 text-orange-500" />,
      title: "Real Production Codebase",
      desc: "Contribute to real applications like SkyroCodeX rather than hypothetical academic assignments.",
    },
    {
      icon: <Users className="h-5 w-5 text-amber-500" />,
      title: "1-on-1 Senior Mentorship",
      desc: "Weekly code reviews, system design syncs, and career coaching from Skyrovix tech leads.",
    },
    {
      icon: <Award className="h-5 w-5 text-emerald-500" />,
      title: "Verified Certificate & LoR",
      desc: "Globally verifiable digital credentials, Letter of Recommendation, and LinkedIn endorsements.",
    },
    {
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      title: "Flexible Remote Schedule",
      desc: "100% remote with asynchronous collaboration suited for university students and working learners.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 dark:text-orange-400 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-orange-500" />
              <span>Skyrovix Engineering Internship Cohort 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              Ship Real Software. <br />
              <span className="text-gradient">Accelerate Your Career.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Join the Skyrovix Engineering Internship program. Build production features, get reviewed by seasoned engineers, and leave with a standout portfolio.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="https://skyrovix.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="lg" className="shadow-glow font-bold gap-2">
                  <span>Go to skyrovix.in Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#apply">
                <Button variant="secondary" size="lg" className="font-semibold gap-2">
                  <span>Fast Apply on Page</span>
                </Button>
              </a>
              <Link href="/editor">
                <Button variant="ghost" size="lg" className="font-semibold gap-2 text-slate-700 dark:text-slate-300">
                  <span>Open IDE</span>
                  <Code2 className="h-4 w-4 text-orange-500" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Intern at Skyrovix?
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              A structured curriculum built by practitioners to transform theoretical knowledge into real engineering capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm hover:border-orange-500/40 transition-all group"
              >
                <div className="p-3 w-fit rounded-xl bg-orange-500/10 mb-4 group-hover:scale-110 transition-transform">
                  {b.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tracks Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100/60 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800/80">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Available Internship Tracks
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Choose the domain that matches your career trajectory. Each track is 4 to 12 weeks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tracks.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-orange-500/50 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                        {t.icon}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                        {t.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {t.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                      {t.desc}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider">
                        Core Competencies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {t.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a href="#apply" className="mt-4">
                    <Button variant="secondary" size="sm" className="w-full font-semibold group">
                      <span>Apply for this Track</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="apply" className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-8 sm:p-12 shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-2">
                <GraduationCap className="h-4 w-4" />
                <span>Application Form</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Apply for Skyrovix Internship
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Submit your details below. Our technical recruitment team reviews applications on a rolling basis.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 space-y-4">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold">Application Received!</h3>
                <p className="text-sm max-w-md mx-auto">
                  Thank you for applying to Skyrovix! Our engineering team will review your application and contact you at <span className="font-semibold underline">{formData.email}</span> within 2 business days.
                </p>
                <div className="pt-2">
                  <Link href="/editor">
                    <Button variant="primary" className="font-bold">
                      Open SkyroCodeX IDE in the Meantime
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      College / University *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Institute of Technology"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      GitHub or Portfolio URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Desired Track *
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="fullstack">Full-Stack Web Engineering</option>
                      <option value="ai-ml">AI & Intelligent Systems</option>
                      <option value="cloud-devops">Cloud & Sandboxed DevOps</option>
                      <option value="dsa-algorithms">Core Systems & Algorithms</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Internship Duration *
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="4-weeks">4 Weeks (Fast-track Sprint)</option>
                      <option value="8-weeks">8 Weeks (Standard Cohort)</option>
                      <option value="12-weeks">12 Weeks (Deep Industry Immersion)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Why do you want to join Skyrovix?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your programming interests and what you hope to build..."
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full font-bold shadow-glow"
                >
                  <Send className="h-4 w-4 mr-2" />
                  <span>Submit Internship Application</span>
                </Button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

