"use client";

import { GlassProjectBento } from "@/components/glass-project-bento";
import { TaxCalculator } from "@/components/tax-calculator";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function GlassProjectLanding() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Main App Shell / Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 w-full flex flex-col relative"
      >
        {/* Floating Capsule Header */}
        <div className="absolute top-6 md:top-8 left-0 w-full flex justify-center z-50 px-4">
          <header className="flex items-center justify-between px-6 py-3 rounded-full bg-black/10 backdrop-blur-xl border border-white/20 shadow-lg w-full max-w-3xl">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["Overview", "Interactions", "Motion", "FAQ"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-[14px] font-medium text-white/80 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button className="hidden md:block text-[14px] font-medium text-white/80 hover:text-white transition-colors">
                Log In
              </button>
              <button className="md:hidden text-white/80 hover:text-white transition-colors">
                <Menu size={20} />
              </button>
            </div>
          </header>
        </div>

        {/* Hero Section with Image Background (primary) */}
        <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-6 pb-12 pt-[25vh] text-center">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-[url('/Glass-Project.png')] bg-cover bg-center bg-no-repeat"
          />
          {/* Subtle gradient overlay to improve text contrast on light/bright areas */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

          {/* Top content: Title and Input */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto mt-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[48px] sm:text-[64px] lg:text-[84px] font-medium tracking-tight text-white leading-[1.05] drop-shadow-md font-serif"
            >
              Shape the web.<br />
              One interaction at a time.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-12 w-full max-w-md relative"
            >
              <div className="flex items-center p-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
                <input 
                  type="email" 
                  placeholder="Enter your email..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/70 px-5 text-[15px] font-medium"
                />
                <button className="bg-black text-white px-6 py-3 rounded-full text-[14px] font-medium hover:bg-black/80 transition-all flex items-center justify-center whitespace-nowrap shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  Get updates
                </button>
              </div>
            </motion.div>
          </div>

          {/* Bottom content: Description text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="relative z-10 mt-auto max-w-2xl mx-auto pt-20"
          >
            <p className="text-[14px] sm:text-[15px] text-white/80 leading-relaxed font-medium text-center drop-shadow-md">
              Glass Project is a design lab and test site for building interactive web
              <br className="hidden sm:block" />
              experiences—glass UI, motion, and full-bleed imagery you can touch, scroll,
              <br className="hidden sm:block" />
              and refine. A sandbox to prototype ideas before real product work.
            </p>
          </motion.div>
        </main>

        {/* Bento UI showcase (secondary — below hero; typography aligned with TaxCalculator header + design.md §2) */}
        <section
          aria-labelledby="bento-showcase-heading"
          className="relative z-[20] shrink-0 bg-[#ece8e6] pt-24 pb-10 md:pt-28 md:pb-12 lg:pb-10"
        >
          <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-[3rem]">
            <header className="mb-2 text-center md:mb-4">
              <motion.h2
                id="bento-showcase-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 text-[36px] font-medium leading-[1.05] tracking-tight text-gray-900 font-serif sm:text-[48px] md:text-[56px]"
              >
                Interactive glass UI.
                <br className="hidden sm:block" />
                <span className="text-[#898483]">Panels, depth, and motion.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-2xl text-[16px] font-medium leading-relaxed text-gray-600 md:text-[18px]"
              >
                A medical-imaging-inspired bento: frosted glass, dark panels, tactile toggles,
                and motion that ramps as you scroll into view—built on the site&rsquo;s single accent
                and warm light section wash.
              </motion.p>
            </header>

            <div className="-mx-6 overflow-x-auto px-6 pb-0 md:-mx-10 md:px-10 lg:-mx-[3rem] lg:px-[3rem]">
              <div className="mx-auto flex min-w-0 justify-center">
                <GlassProjectBento />
              </div>
            </div>
          </div>
        </section>

        <TaxCalculator />

        {/* Footer — photographic bg with refined glass typography */}
        <footer className="relative z-10 isolate overflow-hidden">
          {/* Full-bleed background image */}
          <div
            className="absolute inset-0 bg-[url('/Glass-project-footer.png')] bg-cover bg-center bg-no-repeat"
            aria-hidden
          />
          {/* Subtle dark overlay allowing the image to show through */}
          <div
            className="absolute inset-0 bg-[#1a1919]/40"
            aria-hidden
          />
          {/* Gradient to ground the bottom text and fade up naturally */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#1a1919] via-[#1a1919]/70 to-transparent"
            aria-hidden
          />
          {/* Crisp glass top border */}
          <div
            className="absolute top-0 w-full h-[1px] bg-white/20"
            aria-hidden
          />

          <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-10 lg:py-20">
            <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
              {/* Brand and Description */}
              <div className="flex max-w-sm flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)] ring-1 ring-white/30 backdrop-blur-md">
                    <div className="h-3 w-3 rounded-sm bg-[#FF5E3A] shadow-[0_0_12px_rgba(255,94,58,0.6)]" />
                  </div>
                  <span className="text-[22px] font-semibold leading-none tracking-tight text-white">
                    Glass Project
                  </span>
                </div>
                <p className="text-[15px] font-medium leading-relaxed text-white/70">
                  Shape the web. One interaction at a time. A sandbox to prototype ideas before real product work.
                </p>
              </div>

              {/* Navigation */}
              <div className="flex flex-col gap-10 md:items-end">
                <nav
                  aria-label="Footer"
                  className="flex flex-wrap items-center gap-x-8 gap-y-4"
                >
                  {["Overview", "Interactions", "Motion", "FAQ"].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="text-[15px] font-medium text-white/80 transition-colors hover:text-white"
                    >
                      {item}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="mt-16 flex flex-col-reverse items-center justify-between gap-6 border-t border-white/20 pt-8 md:flex-row">
              <p className="text-[13px] font-medium text-white/50">
                © {new Date().getFullYear()} Glass Project. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {["Twitter", "GitHub", "Discord"].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="text-[14px] font-medium text-white/50 transition-colors hover:text-white"
                  >
                    {social}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
