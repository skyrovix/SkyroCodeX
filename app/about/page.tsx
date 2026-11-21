"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Terminal,
  Code2,
  FileCheck,
  QrCode,
  Award,
  ShieldCheck,
  Compass,
  Target,
  Quote,
  Linkedin,
  TrendingUp,
  HeartHandshake,
  Globe,
  Laptop,
  Cpu,
  Briefcase,
  GraduationCap,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function AboutPage() {
  const pillars = ["Learn.", "Build.", "Experience.", "Grow."];

  const heroStats = [
    {
      icon: <Terminal className="h-5 w-5 text-orange-500" />,
      title: "Practical Skills",
      desc: "Hands-on projects with modern tech stacks",
    },
    {
      icon: <FileCheck className="h-5 w-5 text-amber-500" />,
      title: "Mentor Reviews",
      desc: "Constructive feedback on every milestone",
    },
    {
      icon: <Code2 className="h-5 w-5 text-emerald-500" />,
      title: "Portfolio Ready",
      desc: "Production code shipped to your GitHub",
    },
    {
      icon: <QrCode className="h-5 w-5 text-blue-500" />,
      title: "MSME Certified",
      desc: "Tamper-proof verifiable QR credentials",
    },
  ];

  const focusPoints = [
    {
      icon: <Briefcase className="h-4 w-4 text-orange-500" />,
      title: "Virtual internship programs",
      desc: "Real-world engineering workflows delivered remotely.",
    },
    {
      icon: <GraduationCap className="h-4 w-4 text-amber-500" />,
      title: "Industry-focused training",
      desc: "Curriculums aligned with contemporary tech industry demands.",
    },
    {
      icon: <Laptop className="h-4 w-4 text-emerald-500" />,
      title: "Practical, project-based learning",
      desc: "Focus on writing production code rather than passive memorization.",
    },
    {
      icon: <Terminal className="h-4 w-4 text-blue-500" />,
      title: "Technical and professional skill development",
      desc: "Honing problem solving, software architecture, and communication.",
    },
    {
      icon: <Award className="h-4 w-4 text-purple-500" />,
      title: "Portfolio building and career readiness",
      desc: "Showcasing demonstrable proof-of-work to recruiters.",
    },
  ];

  const coreValues = [
    {
      icon: <Sparkles className="h-6 w-6 text-orange-500" />,
      title: "Innovation",
      description: "We explore new ideas, technologies, and better ways to make learning useful and engaging.",
      accent: "hover:border-orange-500/40",
    },
    {
      icon: <Terminal className="h-6 w-6 text-amber-500" />,
      title: "Practical Learning",
      description: "We encourage students to learn by doing, experimenting, solving problems, and building projects.",
      accent: "hover:border-amber-500/40",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
      title: "Integrity",
      description: "We aim to communicate clearly and act with honesty, transparency, and responsibility.",
      accent: "hover:border-emerald-500/40",
    },
    {
      icon: <Award className="h-6 w-6 text-blue-500" />,
      title: "Student Empowerment",
      description: "We want learners to build confidence, independence, and the skills to take ownership of their growth.",
      accent: "hover:border-blue-500/40",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      title: "Continuous Growth",
      description: "We value curiosity, lifelong learning, and adapting to changing technologies and industry needs.",
      accent: "hover:border-purple-500/40",
    },
  ];

  const commitments = [
    {
      icon: <Globe className="h-5 w-5 text-orange-500" />,
      title: "Accessible Opportunities",
      desc: "Virtual learning and internship opportunities designed to reach students in different locations across India.",
    },
    {
      icon: <Laptop className="h-5 w-5 text-amber-500" />,
      title: "Hands-on Experience",
      desc: "Assignments and project-based activities that encourage practical application with modern toolchains.",
    },
    {
      icon: <Cpu className="h-5 w-5 text-emerald-500" />,
      title: "Skill Development",
      desc: "Opportunities to strengthen technical knowledge, communication, and real-world problem-solving.",
    },
    {
      icon: <HeartHandshake className="h-5 w-5 text-blue-500" />,
      title: "Learning Support",
      desc: "Guidance, milestone code reviews, and a structured learning journey to help students make steady progress.",
    },
    {
      icon: <Briefcase className="h-5 w-5 text-purple-500" />,
      title: "Career Preparation",
      desc: "Encouragement to build portfolios, document projects, and develop professional confidence for interviews.",
    },
    {
      icon: <Rocket className="h-5 w-5 text-rose-500" />,
      title: "Continuous Improvement",
      desc: "A relentless commitment to improving the platform, compiler infrastructure, and learning experience based on student needs.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* HERO HEADER */}
        <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-orange-500/5 via-amber-500/5 to-transparent">
          {/* Subtle Ambient Light Gradients */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-orange-500/10 dark:bg-orange-500/15 blur-3xl rounded-full" />

          <div className="relative max-w-5xl mx-auto text-center space-y-6">
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span>SKYROVIX · ABOUT US</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Transforming Students Through{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
                Real-World Learning
              </span>{" "}
              and Internships.
            </h1>

            {/* Pillars Ribbon */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
              {pillars.map((pillar) => (
                <span
                  key={pillar}
                  className="px-3.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 shadow-sm"
                >
                  {pillar}
                </span>
              ))}
            </div>

            {/* Sub-headline description */}
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Connecting academic concepts with hands-on project implementation, mentor-guided milestone reviews, and verifiable career credentials.
            </p>

            {/* 4 Feature Stat Cards */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {heroStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-orange-500/40 transition-all group"
                >
                  <div className="mb-3 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit group-hover:scale-105 transition-transform">
                    {stat.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
          {/* SECTION 01: ABOUT SKYROVIX · WHO WE ARE */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-orange-600 text-white font-mono text-xs font-bold tracking-wider">
                01
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  Who We Are
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  About Skyrovix
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-slate-900 dark:text-white font-semibold">Skyrovix</strong> is a virtual internship and training platform focused on helping students develop practical skills, gain project-based experience, and prepare for future career opportunities.
                </p>
                <p>
                  We aim to connect academic knowledge with practical implementation through structured learning programs, hands-on projects, skill development, and virtual internship opportunities.
                </p>
                <p>
                  Our platform encourages students to explore technology, strengthen their abilities, build portfolios, and turn what they learn into practical outcomes.
                </p>

                <div className="pt-2">
                  <a
                    href="https://skyrovix.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    <span>Visit the Skyrovix Virtual Internship Portal (skyrovix.in)</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* What We Focus On Card */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Target className="h-4 w-4 text-orange-500" />
                  <span>What We Focus On</span>
                </h3>
                <ul className="space-y-3">
                  {focusPoints.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 p-1 rounded-md bg-slate-100 dark:bg-slate-800 shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-200">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {item.desc}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 02: OUR STORY · AN IDEA THAT BECAME AN OPPORTUNITY */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-orange-600 text-white font-mono text-xs font-bold tracking-wider">
                02
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  An Idea That Became an Opportunity
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Our Story
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Skyrovix started with a simple thought: <span className="font-semibold text-slate-900 dark:text-white">students need more than academic knowledge to prepare for the professional world.</span>
                </p>
                <p>
                  Through learning technology and experiencing internship opportunities, our founder recognised how valuable practical exposure, project development, and industry-oriented skills can be. That experience inspired the idea of creating a platform where students could move beyond theory and learn by building.
                </p>
                <p>
                  What began as an individual vision gradually developed into a virtual internship and training platform with a clear purpose: to make practical learning opportunities more accessible and help students take confident steps towards their goals.
                </p>
              </div>

              {/* Govt. MSME Certified Card */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/30 dark:border-amber-500/20 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Government of India Recognized</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    <span>Govt. MSME Certified</span>
                  </h3>
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                    <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Udyam Registration Number
                    </span>
                    <span className="font-mono text-sm sm:text-base font-bold text-orange-600 dark:text-orange-400">
                      UDYAM-TN-17-0076606
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Dedicated to democratizing practical computer science and software development education across India.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Tamper-proof verifiable credentials with dynamic QR code validation</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 03: OUR VISION & MISSION · THE PURPOSE THAT GUIDES OUR WORK */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-orange-600 text-white font-mono text-xs font-bold tracking-wider">
                03
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  The Purpose That Guides Our Work
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Our Vision &amp; Mission
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vision Card */}
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-orange-500/40 transition-colors group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 w-fit">
                      <Compass className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">
                      Our Vision
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Accessible Practical Learning for Every Student
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    To create a future where every student has access to practical learning, real-world experience, and opportunities to build a meaningful career.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="inline-block text-xs font-bold font-mono text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-3 py-1.5 rounded-lg border border-orange-500/20">
                    Learn · Build · Experience · Grow
                  </span>
                </div>
              </div>

              {/* Mission Card */}
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-amber-500/40 transition-colors group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 w-fit">
                      <Target className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                      Our Mission
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Connecting Academic Learning with Industry Needs
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    To empower students through industry-focused training, hands-on projects, virtual internships, and skill development that helps connect academic learning with industry expectations.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="inline-block text-xs font-bold font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/20">
                    Transforming Students Through Real-World Learning and Internships
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 04: FOUNDER STORY · FROM A STUDENT'S DREAM TO A PLATFORM FOR EVERY LEARNER */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-orange-600 text-white font-mono text-xs font-bold tracking-wider">
                04
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  Founder Story
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  From a Student&apos;s Dream to a Platform for Every Learner
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Founder Profile Card */}
              <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4">
                {/* Executive Founder Portrait */}
                <div className="relative mx-auto w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-2 border-orange-500/25 group">
                  <img
                    src="/founder.jpg"
                    alt="Hariharan S. - Founder & Lead Developer of Skyrovix"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold text-center">
                    Hariharan S. · Founder &amp; Lead Developer
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Hariharan S.
                  </h3>
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mt-0.5">
                    Founder &amp; Lead Developer
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                    Technology Enthusiast
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                    Full Stack Developer
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                    Entrepreneur
                  </span>
                </div>

                <div className="pt-2">
                  <a
                    href="https://www.linkedin.com/in/hariharan-s-92b566381"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077B5] hover:bg-[#006097] text-white text-xs font-bold shadow-sm transition-all group"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>Connect on LinkedIn</span>
                    <ExternalLink className="h-3 w-3 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Founder Narrative */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    Every meaningful journey begins with an idea. For Skyrovix, that idea came from a student who believed that education should go beyond textbooks, theory, and certificates.
                  </p>
                  <p>
                    As a technology enthusiast and aspiring entrepreneur, Hariharan began his journey with a passion for software development, innovation, and helping students build practical skills.
                  </p>
                  <p>
                    During his own learning and internship journey, he recognised a challenge: many students complete their academic studies but still need more opportunities to practise what they learn, develop projects, and gain exposure to professional workflows.
                  </p>
                  <p>
                    That realisation became a turning point. Instead of simply accepting the gap between academic learning and practical experience, he decided to build something that could help address it.
                  </p>
                  <p>
                    With that vision, <strong className="text-slate-900 dark:text-white font-semibold">Skyrovix</strong> was born. What started as an idea gradually developed into a virtual internship and training platform designed to give students opportunities to learn, build projects, develop technical confidence, and showcase their abilities.
                  </p>
                  <p>
                    As Founder and Lead Developer, Hariharan continues to focus on building the platform, improving its technology, and creating meaningful learning experiences for students.
                  </p>
                </div>

                {/* Message from the Founder Quote */}
                <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/25 shadow-sm space-y-3">
                  <Quote className="h-8 w-8 text-orange-500/40 absolute top-4 right-5" />
                  <div className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                    A Message from the Founder
                  </div>
                  <blockquote className="text-sm sm:text-base italic text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    &ldquo;I started Skyrovix not just to build a company, but to create opportunities for students who are looking for a chance to learn, build, and prove their abilities. I believe every student deserves an opportunity to gain practical experience and move forward with confidence.&rdquo;
                  </blockquote>
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs border-t border-orange-500/15">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="/founder.jpg"
                        alt="Hariharan S."
                        className="h-9 w-9 rounded-full object-cover object-top border-2 border-orange-500/40 shadow-sm"
                      />
                      <div>
                        <span className="block font-bold text-slate-900 dark:text-white">
                          Hariharan S.
                        </span>
                        <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                          Founder &amp; Lead Developer
                        </span>
                      </div>
                    </div>
                    <span className="text-orange-600 dark:text-orange-400 font-semibold font-mono text-[11px] bg-orange-500/10 px-2.5 py-1 rounded-md w-fit">
                      Learn. Build. Experience. Grow.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 05: OUR CORE VALUES · THE PRINCIPLES BEHIND EVERY DECISION */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-orange-600 text-white font-mono text-xs font-bold tracking-wider">
                05
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  The Principles Behind Every Decision
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Our Core Values
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md ${val.accent} ${
                    idx === 3 ? "lg:col-span-1" : ""
                  }`}
                >
                  <div className="mb-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit">
                    {val.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 06: OUR COMMITMENT TO STUDENTS · YOUR GROWTH IS OUR PRIORITY */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-orange-600 text-white font-mono text-xs font-bold tracking-wider">
                06
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  Your Growth Is Our Priority
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Our Commitment to Students
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              At Skyrovix, we are committed to creating a supportive learning environment where students can strengthen their abilities through practical experiences and structured opportunities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {commitments.map((com, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-orange-500/40 hover:shadow-md transition-all group"
                >
                  <div className="mb-3 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit group-hover:scale-105 transition-transform">
                    {com.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1.5">
                    {com.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {com.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ECOSYSTEM CTA BANNER */}
          <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent p-8 sm:p-12 text-center sm:text-left">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  Experience The Skyrovix Ecosystem
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Start Coding &amp; Building Today
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Join thousands of learners writing code in SkyroCodeX, enrolling in virtual internships, and earning MSME-certified credentials.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 shrink-0">
                <Link href="/editor">
                  <Button variant="primary" className="font-bold gap-2 shadow-glow">
                    <Terminal className="h-4 w-4" />
                    <span>Launch SkyroCodeX</span>
                  </Button>
                </Link>
                <a href="https://skyrovix.in" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="font-bold gap-2">
                    <Briefcase className="h-4 w-4 text-orange-500" />
                    <span>Apply for Internship</span>
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="font-bold">
                    <span>Contact Us</span>
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
