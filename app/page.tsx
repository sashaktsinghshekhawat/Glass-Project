"use client";

import { GlassProjectBento } from "@/components/glass-project-bento";
import { TaxCalculator } from "@/components/tax-calculator";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function GlassProjectLanding() {
  return (
    <div className="flex min-h-screen flex-col bg-[#b3a8a6] font-sans">
      {/* Main App Shell / Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex w-full flex-1 flex-col overflow-x-hidden"
      >
        {/* Floating Capsule Header */}
        <div className="absolute top-6 md:top-8 left-0 w-full flex justify-center z-50 px-4">
          <header className="flex w-full max-w-[calc(100vw-2rem)] items-center justify-between rounded-full border border-white/20 bg-black/10 px-4 py-3 shadow-lg backdrop-blur-xl sm:max-w-3xl sm:px-6">
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
        <main className="relative z-10 flex min-h-screen min-h-[100dvh] w-full flex-col items-center justify-between overflow-hidden px-4 pb-10 pt-[clamp(7rem,22vh,12rem)] text-center sm:px-6 sm:pb-12 sm:pt-[25vh]">
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
              className="text-[36px] font-medium leading-[1.06] tracking-tight text-white drop-shadow-md sm:text-[48px] md:text-[56px] lg:text-[84px]"
            >
              Shape the web.<br />
              One interaction at a time.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative mt-8 w-full max-w-md sm:mt-12"
            >
              <div className="flex flex-col gap-2 rounded-[1.75rem] border border-white/30 bg-white/20 p-1.5 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:rounded-full sm:gap-0">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full min-w-0 flex-1 rounded-full border-none bg-transparent px-4 py-3 text-[15px] font-medium text-white outline-none placeholder:text-white/70 sm:px-5 sm:py-2"
                />
                <button
                  type="button"
                  className="flex w-full shrink-0 items-center justify-center rounded-full bg-black px-6 py-3 text-[14px] font-medium text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all hover:bg-black/80 sm:w-auto sm:py-3"
                >
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
            className="relative z-10 mx-auto mt-auto max-w-2xl pt-12 sm:pt-20"
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
          className="relative z-[20] shrink-0 overflow-x-hidden bg-[#b3a8a6] py-16 sm:py-20 md:py-28 lg:pb-20"
        >
          <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-[3rem]">
            <header className="mb-2 text-center md:mb-4">
              <motion.h2
                id="bento-showcase-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4 text-[28px] font-medium leading-[1.08] tracking-tight text-[#151823] sm:mb-6 sm:text-[36px] sm:leading-[1.06] md:text-[44px] md:leading-[1.05] lg:text-[56px]"
              >
                Interactive glass UI.
                <br className="hidden sm:block" />
                <span className="text-white/80">Panels, depth, and motion.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-2xl text-[16px] font-medium leading-relaxed text-white/72 md:text-[18px]"
              >
                A medical-imaging-inspired bento: frosted glass, dark panels, tactile toggles,
                and motion that ramps as you scroll into view—built on the site&rsquo;s single accent
                and warm light section wash.
              </motion.p>
            </header>

            <div className="mx-auto w-full max-w-full px-0 pb-0 pt-5 sm:px-0 sm:pt-8 lg:max-w-none lg:pt-20">
              <div className="mx-auto flex w-full min-w-0 justify-center">
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
