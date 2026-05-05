"use client";

/**
 * Bento showcase from `action-bento-ui.md`.
 * Inner layout grid width: 400 + gap + (266 + gap + 220) = **958px** with **36px** gaps; outer `zoom` scales the showcase
 * to cover more viewport without rewriting every pixel value (see below).
 * Colors aligned to `design.md` tokens (#282524, #363332, #1a1919, #FF5E3A, #898483, light wash `#ece8e6`).
 *
 * DOM ids (stable edit targets — see Project.md §8):
 * - `profile-card` — Endy Rasmussen profile + add scan + document tiles
 * - `ailab-card` — x-ray tracker / AILab
 * - `controls-card` — Invert / Flip / Area toggles + slider
 * - `dicom-card` — Dr. Johnson + DICOM images
 * - `chest-card` — bottom wide chest findings + image pane
 * - `popup-card` — centered glass KPI overlay + chart
 */

import { motion, useInView } from "framer-motion";
import { useCallback, useRef, useState } from "react";

/** Uniform viewport scale (`zoom`) — tweak before rewriting pixel geometry. Keep below ~1.2 if gutters should breathe. */
const BENTO_VIEWPORT_ZOOM = 1.1;
/** Inter-card rhythm: gap-[36px] on every outer flex row/column between major panels (was 24px). */

const CARD = "bg-[#282524]";
const SURFACE = "bg-[#363332]";
const DEEP = "bg-[#1a1919]";
const ACCENT = "#FF5E3A";

/** Cubic-bezier for entrances — smooth, slightly slow “premium” ease. */
const easingPremium: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Main card entrance length (in-view only). */
const ENTRANCE_MAIN = 1.05;
const ENTRANCE_SUB = 0.82;

const fadeUpReveal = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  transition: (delay: number) => ({
    duration: ENTRANCE_MAIN,
    ease: easingPremium,
    delay,
  }),
};

const hoverCard = {
  y: -6,
  boxShadow: "0 28px 60px -16px rgba(0,0,0,0.55)",
  transition: { duration: 0.22 },
};

/** Stagger offsets (seconds) — slower cadence once the bento is in view */
const DELAY_PROFILE = 0;
const DELAY_AILAB = 0.2;
const DELAY_CONTROLS = 0.34;
const DELAY_DICOM = 0.48;
const DELAY_CHEST = 0.62;
const DELAY_DOC_A = 0.76;
const DELAY_DOC_B = 0.88;
const DELAY_POPUP = 1.05;

export function GlassProjectBento() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bentoInView = useInView(rootRef, {
    once: true,
    amount: 0.22,
    margin: "0px 0px -48px 0px",
  });

  const [invertOn, setInvertOn] = useState(true);
  const [flipOn, setFlipOn] = useState(false);
  const [areaLevel, setAreaLevel] = useState(65);

  const cycleArea = useCallback(() => {
    setAreaLevel((prev) => (prev < 85 ? prev + 20 : 25));
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-0 min-w-[958px] items-start justify-center overflow-visible bg-[#ece8e6] px-8 pb-2 pt-2 font-sans"
      style={{ zoom: BENTO_VIEWPORT_ZOOM }}
    >
      {/* LAYER 1: BENTO GRID */}
      <div className="relative z-10 flex w-[958px] shrink-0 items-end gap-[36px]">
        <motion.div
          id="profile-card"
          className={`flex h-[600px] w-[400px] shrink-0 flex-col rounded-[36px] p-8 shadow-2xl ${CARD} mt-[48px]`}
          initial={fadeUpReveal.hidden}
          animate={
            bentoInView
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: fadeUpReveal.transition(DELAY_PROFILE),
                }
              : fadeUpReveal.hidden
          }
          whileHover={hoverCard}
          whileTap={{ scale: 0.993 }}
        >
          <div className="mb-8 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={
                bentoInView
                  ? {
                      opacity: 1,
                      transition: {
                        delay: DELAY_PROFILE + 0.24,
                        duration: ENTRANCE_SUB,
                        ease: easingPremium,
                      },
                    }
                  : { opacity: 0 }
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
                alt="Endy Rasmussen"
                width={52}
                height={52}
                className="h-[52px] w-[52px] rounded-full border border-[#363332] object-cover"
              />
              <div>
                <h2 className="text-[19px] font-semibold leading-tight tracking-tight text-white">
                  Endy Rasmussen
                </h2>
                <p className="mt-0.5 text-[13px] text-[#898483]">ID QZW2398</p>
              </div>
            </motion.div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF5E3A] shadow-lg shadow-[#FF5E3A]/20"
              aria-label="Edit profile"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden>
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </motion.button>
          </div>

          <div className={`mb-7 h-px w-full ${SURFACE}`} />

          <div className="mb-8 flex flex-col gap-4">
            {(
              [
                { k: "time", left: "Acq.date and time", right: "9 Nov, 2024 08:25:40 AM" },
                { k: "dem", left: "Sex and age", right: "Female, 56" },
                { k: "exp", left: "Exp.Index", right: "294" },
              ] as const
            ).map((row, i) => (
              <motion.div
                key={row.k}
                className="flex justify-between text-[13px]"
                initial={{ opacity: 0, x: -12 }}
                animate={
                  bentoInView
                    ? {
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: DELAY_PROFILE + 0.14 + i * 0.1,
                          duration: ENTRANCE_SUB,
                          ease: easingPremium,
                        },
                      }
                    : { opacity: 0, x: -12 }
                }
              >
                <span className="text-[#898483]">{row.left}</span>
                <span className="font-medium text-white">{row.right}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={`mb-6 rounded-[24px] p-4 ${SURFACE}`}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <h3 className="mb-3 text-[15px] font-semibold text-white">Add scan</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className={`relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-xl ${DEEP}`}>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-screen grayscale" />
              </div>
              <p className="text-[12px] leading-[1.4] text-white/70">
                Case 1 – normal
                <br />
                clavicle AP 20°
                <br />
                cephalic
              </p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[12px] text-[#898483]">Workspace</span>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex cursor-pointer items-center gap-2 rounded-full border border-[#363332] px-3 py-1.5 text-[11px] font-medium text-white ${DEEP}`}
              >
                Johnson 08C6
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          <div className="mt-auto flex gap-4">
            <DocumentTile label="Report .pdf" delay={DELAY_DOC_A} reveal={bentoInView} />
            <DocumentTile label="Bill .pdf" variant="bill" delay={DELAY_DOC_B} reveal={bentoInView} />
          </div>
        </motion.div>

        {/* RIGHT */}
        <div className="flex w-[522px] flex-col gap-[36px]">
          <div className="flex items-start gap-[36px]">
            <motion.div
              id="ailab-card"
              className={`relative z-20 -mt-[28px] h-[248px] w-[266px] shrink-0 overflow-hidden rounded-[36px] p-5 shadow-2xl ${CARD}`}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={
                bentoInView
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: ENTRANCE_MAIN, ease: easingPremium, delay: DELAY_AILAB },
                    }
                  : { opacity: 0, y: 32, scale: 0.96 }
              }
              whileHover={{
                scale: 1.02,
                boxShadow: "0 26px 55px -12px rgba(0,0,0,0.6)",
              }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <div className="relative z-20 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="5" cy="5" r="4" fill="#FFF" />
                    <circle cx="19" cy="5" r="4" fill="#898483" />
                    <circle cx="5" cy="19" r="4" fill="#898483" />
                    <circle cx="19" cy="19" r="4" fill="#FFF" />
                  </svg>
                  <span className="text-[17px] font-semibold tracking-tight text-white">AILab</span>
                </div>
                <motion.span
                  className="text-[11px] font-semibold text-[#FF5E3A]"
                  animate={bentoInView ? { opacity: [1, 0.65, 1] } : { opacity: 1 }}
                  transition={
                    bentoInView
                      ? { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: DELAY_AILAB + 0.4 }
                      : { duration: 0 }
                  }
                >
                  99.58 px
                </motion.span>
              </div>

              <motion.div
                className="pointer-events-none absolute inset-0 top-12 flex items-center justify-center opacity-70"
                initial={{ scale: 1.06, opacity: 0 }}
                animate={
                  bentoInView
                    ? {
                        scale: 1,
                        opacity: 0.7,
                        transition: {
                          delay: DELAY_AILAB + 0.38,
                          duration: ENTRANCE_MAIN,
                          ease: easingPremium,
                        },
                      }
                    : { scale: 1.06, opacity: 0 }
                }
              >
                <div className="h-[120%] w-[120%] -rotate-12 transform bg-[url('https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-screen grayscale" />
              </motion.div>

              <svg className="absolute inset-0 z-10 h-full w-full" pointerEvents="none" aria-hidden>
                <circle
                  cx="55%"
                  cy="50%"
                  r="45"
                  stroke={ACCENT}
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4 4"
                  opacity="0.8"
                />
                <line x1="55%" y1="50%" x2="40%" y2="90%" stroke={ACCENT} strokeWidth="1.5" opacity="0.8" />
                <line x1="55%" y1="50%" x2="15%" y2="55%" stroke={ACCENT} strokeWidth="1.5" opacity="0.8" />
                <circle cx="55%" cy="50%" r="3.5" fill={ACCENT} />
                <circle cx="40%" cy="90%" r="3.5" fill={ACCENT} />
                <circle cx="15%" cy="55%" r="3.5" fill={ACCENT} />
                <path
                  d="M 45% 75% A 40 40 0 0 1 35% 53%"
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="1.5"
                  opacity="0.8"
                />
              </svg>
            </motion.div>

            <div className="flex w-[220px] shrink-0 flex-col gap-[36px]">
              <motion.div
                id="controls-card"
                className={`relative z-30 -mt-[60px] flex h-[236px] flex-col justify-between rounded-[32px] p-6 shadow-2xl ${CARD}`}
                initial={{ opacity: 0, x: 26, scale: 0.96 }}
                animate={
                  bentoInView
                    ? {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: { duration: ENTRANCE_MAIN, ease: easingPremium, delay: DELAY_CONTROLS },
                      }
                    : { opacity: 0, x: 26, scale: 0.96 }
                }
                whileHover={hoverCard}
                whileTap={{ scale: 0.993 }}
              >
                <motion.div layout className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden>
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      <path d="M12 2.69v17.31a8 8 0 0 0 8-8c0-2.12-.83-4.16-2.34-5.66z" fill="white" fillOpacity="0.3" />
                    </svg>
                    <span className="text-[13px] font-medium text-white">Invert</span>
                  </div>
                  <ToggleSwitch on={invertOn} onToggle={() => setInvertOn((v) => !v)} activeTrackClass="bg-[#FF5E3A]" />
                </motion.div>

                <motion.div layout className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden>
                      <path d="M4 4h16c-.5 5-4 7-8 8 4 1 7.5 3 8 8H4c.5-5 4-7 8-8-4-1-7.5-3-8-8z" />
                    </svg>
                    <span className="text-[13px] font-medium text-white">Flip</span>
                  </div>
                  <ToggleSwitch on={flipOn} onToggle={() => setFlipOn((v) => !v)} activeTrackClass="bg-[#FF5E3A]" inactiveThumbClass="bg-[#898483]" />
                </motion.div>

                <div className="mb-1 mt-1 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden>
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="text-[13px] font-medium text-white">Area</span>
                </div>

                <motion.button
                  type="button"
                  onClick={cycleArea}
                  className="mt-1 w-full px-1 text-left"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative mb-2 h-[3px] w-full rounded-full bg-[#363332]">
                    <motion.div
                      className="absolute left-0 top-0 h-full rounded-full bg-[#FF5E3A]"
                      initial={false}
                      animate={{ width: `${areaLevel}%` }}
                      transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    />
                    <motion.div
                      className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#FF5E3A] bg-white shadow-md"
                      initial={false}
                      animate={{ left: `${areaLevel}%` }}
                      transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[8px] font-bold uppercase tracking-widest text-[#898483]">
                    <span>Low</span>
                    <span>Mod</span>
                    <span>High</span>
                  </div>
                </motion.button>
              </motion.div>

              <motion.div
                id="dicom-card"
                className="flex h-[220px] flex-col justify-between rounded-[32px] bg-white p-5 shadow-2xl"
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={
                  bentoInView
                    ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: ENTRANCE_MAIN, ease: easingPremium, delay: DELAY_DICOM },
                      }
                    : { opacity: 0, y: 28, scale: 0.97 }
                }
                whileHover={{
                  y: -5,
                  boxShadow: "0 24px 50px -18px rgba(0,0,0,0.28)",
                }}
                whileTap={{ scale: 0.992 }}
              >
                <div className="flex items-center justify-between">
                  <motion.div
                    whileHover={{ rotate: [0, -6, 6, 0] }}
                    transition={{ duration: 0.45 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#FF5E3A] shadow-md shadow-[#FF5E3A]/20"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden>
                      <rect width="16" height="16" x="4" y="4" rx="3" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </motion.div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-[12px] font-bold leading-tight text-gray-900">Dr. Johnson</p>
                      <p className="text-[9px] font-medium text-[#898483]">Radiologist</p>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format&fit=crop"
                      width={28}
                      height={28}
                      className="h-[28px] w-[28px] shrink-0 rounded-full object-cover"
                      alt="Dr. Johnson"
                    />
                  </div>
                </div>

                <h3 className="mb-2 mt-2 w-[90%] text-[16px] font-bold leading-[1.1] text-gray-900">
                  Added DICOM
                  <br />
                  images
                </h3>

                <div className="flex h-[64px] gap-2">
                  {[0, 1].map((i) => (
                    <motion.div
                      key={i}
                      className={`relative flex-1 cursor-pointer overflow-hidden rounded-[12px] shadow-inner ${CARD}`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0 }}
                      animate={
                        bentoInView
                          ? {
                              opacity: 1,
                              transition: {
                                delay: DELAY_DICOM + 0.22 + i * 0.12,
                                duration: ENTRANCE_SUB,
                                ease: easingPremium,
                              },
                            }
                          : { opacity: 0 }
                      }
                    >
                      <div
                        className={`absolute inset-0 bg-cover bg-center opacity-80 mix-blend-screen grayscale ${
                          i === 0
                            ? "bg-[url('https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=200&auto=format&fit=crop')]"
                            : "bg-[url('https://images.unsplash.com/photo-1559757175-9b22e1bafcb9?q=80&w=200&auto=format&fit=crop')]"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            id="chest-card"
            className={`relative flex h-[220px] justify-between overflow-hidden rounded-[36px] p-7 shadow-2xl ${CARD}`}
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={
              bentoInView
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: ENTRANCE_MAIN, ease: easingPremium, delay: DELAY_CHEST },
                  }
                : { opacity: 0, y: 36, scale: 0.97 }
            }
            whileHover={hoverCard}
            whileTap={{ scale: 0.994 }}
          >
            <motion.div
              className="relative z-10 flex max-w-[200px] flex-col justify-between"
              initial={{ opacity: 0, x: -14 }}
              animate={
                bentoInView
                  ? {
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: DELAY_CHEST + 0.26,
                        duration: ENTRANCE_SUB,
                        ease: easingPremium,
                      },
                    }
                  : { opacity: 0, x: -14 }
              }
            >
              <div>
                <h3 className="text-[18px] font-semibold tracking-tight text-white">Chest</h3>
                <p className="mb-3 mt-1 text-[13px] text-[#898483]">ADAMRAS-002</p>
                <p className="pr-2 text-[12px] leading-relaxed text-white/70">
                  No significant lung field abnormality detected. No blunting in CP angles is seen.
                </p>
              </div>
              <p className="mt-4 text-[12px] font-bold tracking-wider text-[#FF5E3A]">W:256 L: 128</p>
            </motion.div>

            <motion.div
              className={`relative flex h-full w-[224px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] border border-white/5 ${DEEP}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={
                bentoInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        delay: DELAY_CHEST + 0.34,
                        duration: ENTRANCE_MAIN * 0.72,
                        ease: easingPremium,
                      },
                    }
                  : { opacity: 0, scale: 0.94 }
              }
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757175-9b22e1bafcb9?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-screen grayscale" />

              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="absolute right-3 top-3 flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-[#FF5E3A] bg-black/20 backdrop-blur-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5E3A" strokeWidth="2.5" aria-hidden>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </motion.div>

              <div className="absolute bottom-3 flex gap-4 rounded-full bg-black/30 px-4 py-2 opacity-50 backdrop-blur-md">
                <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden className="cursor-pointer" whileHover={{ opacity: 1, scale: 1.15 }}>
                  <path d="M21 12H3M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4" />
                </motion.svg>
                <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden className="cursor-pointer" whileHover={{ opacity: 1, scale: 1.15 }}>
                  <path d="M12 8v4l3 3" />
                  <circle cx="12" cy="12" r="10" />
                </motion.svg>
                <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden className="cursor-pointer" whileHover={{ opacity: 1, scale: 1.15 }}>
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </motion.svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* LAYER 2: glass overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
        <motion.div
          id="popup-card"
          className="pointer-events-auto relative flex h-[260px] w-[464px] flex-row justify-between overflow-hidden rounded-[40px] border-[1.5px] border-white/40 bg-gradient-to-br from-white/50 via-white/20 to-white/5 p-8 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] backdrop-blur-[48px]"
          initial={{ opacity: 0, scale: 0.88, y: 52, rotateX: 10 }}
          animate={
            bentoInView
              ? {
                  opacity: 1,
                  scale: 1,
                  y: 36,
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                    mass: 0.9,
                    delay: DELAY_POPUP,
                  },
                }
              : { opacity: 0, scale: 0.88, y: 52, rotateX: 10 }
          }
          whileHover={{
            scale: 1.02,
            rotateX: -2,
            boxShadow: "0 52px 100px -20px rgba(0,0,0,0.45)",
            transition: { duration: 0.25 },
          }}
          whileTap={{ scale: 0.99 }}
        >
          <motion.div
            className="flex w-[55%] flex-col justify-between"
            initial={{ opacity: 0, x: -18 }}
            animate={
              bentoInView
                ? {
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: DELAY_POPUP + 0.2,
                      duration: ENTRANCE_SUB,
                      ease: easingPremium,
                    },
                  }
                : { opacity: 0, x: -18 }
            }
          >
            <h2 className="w-full text-[24px] font-semibold leading-[1.15] tracking-tight text-gray-900">
              AI cuts ER wait:
              <br />
              1h10 saved on visits
            </h2>

            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="6" r="4" fill="#374151" />
                <circle cx="6" cy="16" r="4" fill="#374151" />
                <circle cx="18" cy="16" r="4" fill="#374151" />
              </svg>
              <span className="text-[12px] font-bold text-gray-700">X-ray analysis</span>
            </div>
          </motion.div>

          <motion.div
            className="flex h-full items-end gap-5 pb-2 pr-2"
            initial={{ opacity: 0, x: 22 }}
            animate={
              bentoInView
                ? {
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: DELAY_POPUP + 0.3,
                      duration: ENTRANCE_SUB,
                      ease: easingPremium,
                    },
                  }
                : { opacity: 0, x: 22 }
            }
          >
            <motion.div className="flex flex-col items-center gap-2" whileHover={{ y: -3 }}>
              <span className="text-[11px] font-bold tracking-wide text-gray-500">3h35</span>
              <motion.div
                className="h-[80px] w-[48px] rounded-[12px] border-[2px] border-dashed border-gray-400 bg-white/40"
                initial={{ scaleY: 0.28, opacity: 0 }}
                animate={
                  bentoInView
                    ? {
                        scaleY: 1,
                        opacity: 1,
                        transition: {
                          delay: DELAY_POPUP + 0.42,
                          duration: ENTRANCE_MAIN * 0.72,
                          ease: easingPremium,
                        },
                      }
                    : { scaleY: 0.28, opacity: 0 }
                }
                style={{ transformOrigin: "bottom" }}
              />
              <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-gray-500">With AI</span>
            </motion.div>

            <motion.div className="flex flex-col items-center gap-2" whileHover={{ y: -3 }}>
              <span className="text-[11px] font-bold tracking-wide text-gray-900">4h45</span>
              <motion.div
                className="h-[130px] w-[48px] rounded-[12px] bg-[#FF5E3A] shadow-[0_12px_24px_-6px_rgba(255,94,58,0.5)]"
                initial={{ scaleY: 0.22, opacity: 0 }}
                animate={
                  bentoInView
                    ? {
                        scaleY: 1,
                        opacity: 1,
                        transition: {
                          delay: DELAY_POPUP + 0.52,
                          duration: ENTRANCE_MAIN * 0.78,
                          ease: easingPremium,
                        },
                      }
                    : { scaleY: 0.22, opacity: 0 }
                }
                style={{ transformOrigin: "bottom" }}
              />
              <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-gray-500">Without AI</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function ToggleSwitch({
  on,
  onToggle,
  activeTrackClass,
  inactiveThumbClass = "bg-white",
}: {
  on: boolean;
  onToggle: () => void;
  activeTrackClass: string;
  inactiveThumbClass?: string;
}) {
  return (
    <motion.button
      type="button"
      layout
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full p-[2px] ${on ? `${activeTrackClass} justify-end` : "justify-start bg-[#363332]"}`}
      whileTap={{ scale: 0.92 }}
      aria-pressed={on}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 550, damping: 32 }}
        className={`pointer-events-none block h-[16px] w-[16px] rounded-full shadow-sm ${on ? "bg-white" : inactiveThumbClass}`}
      />
    </motion.button>
  );
}

function DocumentTile({
  label,
  variant,
  delay,
  reveal,
}: {
  label: string;
  variant?: "bill";
  delay: number;
  reveal: boolean;
}) {
  return (
    <motion.div
      className={`group relative flex h-[100px] flex-1 cursor-pointer flex-col items-center justify-end overflow-hidden rounded-[24px] border border-white/5 p-4 ${SURFACE}`}
      initial={{ opacity: 0, y: 20, scale: 0.93 }}
      animate={
        reveal
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { delay, duration: ENTRANCE_SUB, ease: easingPremium },
            }
          : { opacity: 0, y: 20, scale: 0.93 }
      }
      whileHover={{ y: -4, scale: 1.02, borderColor: "rgba(255,255,255,0.18)" }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="absolute bottom-8 left-1/2 flex h-10 w-14 -translate-x-1/2 flex-col gap-1 rounded-t-md bg-white p-2 shadow-sm transition-transform group-hover:-translate-y-0.5">
        <div className="h-0.5 w-full rounded-full bg-[#D0D0D0]" />
        {variant === "bill" ? (
          <>
            <div className="h-0.5 w-full rounded-full bg-[#D0D0D0]" />
            <div className="h-0.5 w-2/3 rounded-full bg-[#D0D0D0]" />
          </>
        ) : (
          <>
            <div className="h-0.5 w-3/4 rounded-full bg-[#D0D0D0]" />
            <div className="h-0.5 w-1/2 rounded-full bg-[#D0D0D0]" />
          </>
        )}
      </div>
      <div className="absolute bottom-0 z-10 h-12 w-full bg-gradient-to-t from-[#363332] via-[#363332]/80 to-transparent" />
      <span className="relative z-20 mt-auto text-[12px] font-semibold text-white">{label}</span>
    </motion.div>
  );
}
