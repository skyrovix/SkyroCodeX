"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  PhoneCall,
  Globe,
  HelpCircle,
  Briefcase,
  GraduationCap,
  Code2,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 dark:text-orange-400 text-xs font-semibold">
              <Mail className="h-3.5 w-3.5 text-orange-500" />
              <span>We&apos;re Here to Support You</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Contact <span className="text-gradient">Skyrovix</span>
            </h1>

            <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Have questions about SkyroCodeX, our engineering internships, online courses, or partnerships? Send us a message and our team will respond within 24 hours.
            </p>
          </div>
        </section>

        {/* Content Section: Form & Direct Cards */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left 2 Columns: Contact Form */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 sm:p-10 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Send a Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-8">
                  Fill out the form below and we will route your inquiry to the appropriate engineering or admissions lead.
                </p>

                {submitted ? (
                  <div className="p-8 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 space-y-3">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                    <h3 className="text-lg font-bold">Message Sent Successfully!</h3>
                    <p className="text-xs sm:text-sm">
                      Thank you for contacting Skyrovix, <span className="font-semibold">{formData.name}</span>. We will follow up at <span className="font-semibold">{formData.email}</span> shortly.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "general", message: "" });
                      }}
                      className="mt-3 text-xs"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Alex Morgan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                          placeholder="alex@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Inquiry Topic *
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="internship">Skyrovix Internship Application</option>
                        <option value="courses">Skyrovix Courses & Certifications</option>
                        <option value="compiler">SkyroCodeX Compiler Feedback / Bug</option>
                        <option value="enterprise">University & Enterprise Licensing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Write your message, questions, or feedback here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                      <span>Send Message to Skyrovix</span>
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Direct Info Cards */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-orange-500" />
                  <span>Direct Communication</span>
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">General & Support</div>
                    <a href="mailto:contact@skyrovix.com" className="font-medium text-orange-600 dark:text-orange-400 hover:underline">
                      contact@skyrovix.com
                    </a>
                  </div>

                  <div>
                    <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Internship Admissions</div>
                    <a href="mailto:internships@skyrovix.com" className="font-medium text-orange-600 dark:text-orange-400 hover:underline">
                      internships@skyrovix.com
                    </a>
                  </div>

                  <div>
                    <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Course Inquiries</div>
                    <a href="mailto:courses@skyrovix.com" className="font-medium text-orange-600 dark:text-orange-400 hover:underline">
                      courses@skyrovix.com
                    </a>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Average reply time: &lt; 24 hours</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-orange-500" />
                  <span>Explore Skyrovix</span>
                </h3>
                <div className="space-y-2 text-xs">
                  <a
                    href="https://skyrovix.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-orange-500" />
                      <span className="font-semibold">Skyrovix Internship (skyrovix.in)</span>
                    </div>
                    <span className="text-orange-500 font-bold">&rarr;</span>
                  </a>

                  <a
                    href="https://skyrovix.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-amber-500" />
                      <span className="font-semibold">Skyrovix Courses (skyrovix.online)</span>
                    </div>
                    <span className="text-orange-500 font-bold">&rarr;</span>
                  </a>

                  <Link
                    href="/editor"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-emerald-500" />
                      <span className="font-semibold">SkyroCodeX Compiler</span>
                    </div>
                    <span className="text-orange-500 font-bold">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
