"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Code2,
  GraduationCap,
  Sparkles,
  Star,
  Users,
  Video,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
} from "lucide-react";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses = [
    {
      id: "python-mastery",
      title: "Python 3 & AI Automation Bootcamp",
      category: "python",
      level: "Beginner to Advanced",
      duration: "6 Weeks",
      lessons: "48 Lessons",
      rating: "4.9",
      students: "3,400+",
      desc: "From basic syntax to object-oriented programming, data science libraries, and building automated AI agent workflows.",
      highlights: [
        "Interactive SkyroCodeX coding exercises",
        "Build 6 real-world portfolio projects",
        "OpenAI & Claude API integrations",
        "Official Skyrovix Verified Certificate",
      ],
      tag: "Best Seller",
    },
    {
      id: "fullstack-nextjs",
      title: "Full-Stack Next.js 15 & TypeScript Engineering",
      category: "web",
      level: "Intermediate",
      duration: "8 Weeks",
      lessons: "64 Lessons",
      rating: "4.95",
      students: "2,850+",
      desc: "Architect modern, production-grade web applications with Next.js 15 App Router, React Server Components, Tailwind CSS, and Supabase.",
      highlights: [
        "End-to-end full-stack SaaS project",
        "Database modeling with PostgreSQL & RLS",
        "Authentication & Payment Webhooks",
        "CI/CD and Vercel edge deployment",
      ],
      tag: "Trending",
    },
    {
      id: "dsa-interview",
      title: "Data Structures & Algorithms in C++ & Java",
      category: "dsa",
      level: "All Levels",
      duration: "10 Weeks",
      lessons: "80 Lessons",
      rating: "4.92",
      students: "5,120+",
      desc: "Ace technical coding interviews at top tech companies. Master time complexity, graph traversals, dynamic programming, and binary search.",
      highlights: [
        "150+ Curated LeetCode/Codeforces problems",
        "Step-by-step video editorials",
        "Live execution benchmarks in browser",
        "Mock interview prep sessions",
      ],
      tag: "Career Essential",
    },
    {
      id: "cloud-containers",
      title: "Docker, Linux Containers & Sandboxed Execution",
      category: "systems",
      level: "Advanced",
      duration: "4 Weeks",
      lessons: "32 Lessons",
      rating: "4.88",
      students: "1,200+",
      desc: "Learn how platforms like SkyroCodeX, Judge0, and Piston run untrusted user code safely inside hardened Linux cgroups and namespaces.",
      highlights: [
        "Linux cgroups v2, namespaces & seccomp",
        "Build a custom Docker code execution API",
        "Resource isolation & security hardening",
        "System architecture deep dive",
      ],
      tag: "Advanced Systems",
    },
  ];

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 dark:text-orange-400 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-orange-500" />
              <span>Skyrovix Academy • Production-Ready Curriculum</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              Learn by Doing. <br />
              <span className="text-gradient">Code Directly in the Browser.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Industry-crafted courses with real-time browser compilers, automated test evaluations, and career-advancing certifications from Skyrovix.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://skyrovix.online"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="md" className="shadow-glow font-bold gap-2">
                  <span>Visit skyrovix.online Platform</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/editor">
                <Button variant="secondary" size="md" className="font-semibold gap-2">
                  <span>Open SkyroCodeX IDE</span>
                  <Code2 className="h-4 w-4 text-orange-500" />
                </Button>
              </Link>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {[
                { id: "all", label: "All Courses" },
                { id: "python", label: "Python & AI" },
                { id: "web", label: "Full-Stack Web" },
                { id: "dsa", label: "DSA & Problem Solving" },
                { id: "systems", label: "Systems & Containers" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === tab.id
                      ? "bg-orange-600 text-white shadow-glow"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-500/40"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Course Catalog Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-orange-500/40 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                      {course.tag}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{course.rating}</span>
                      <span className="text-slate-400 font-normal">({course.students})</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {course.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 dark:border-slate-800/80 mb-6 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-orange-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Video className="h-3.5 w-3.5 text-orange-500" />
                      <span>{course.lessons}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-orange-500" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-orange-500" />
                      <span>Browser IDE Enabled</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                      Curriculum Highlights:
                    </div>
                    {course.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link href="/editor" className="flex-1">
                    <Button variant="primary" size="md" className="w-full font-bold shadow-glow gap-1.5">
                      <span>Enroll & Start Coding</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="secondary" size="md" className="w-full sm:w-auto text-xs font-semibold">
                      Syllabus
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Learn With Skyrovix */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/30">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              The SkyroCodeX Integrated Learning Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Terminal className="h-7 w-7 text-orange-500 mb-3" />
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                  Zero Local Configuration
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every lesson links directly into SkyroCodeX with starter templates ready to run in one click.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <ShieldCheck className="h-7 w-7 text-emerald-500 mb-3" />
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                  Automated Code Validation
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Instant feedback on edge cases, syntax nuances, memory consumption, and runtime metrics.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <GraduationCap className="h-7 w-7 text-amber-500 mb-3" />
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                  Industry Direct Pathway
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Top performers in Skyrovix courses receive priority consideration for Skyrovix paid internships.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

