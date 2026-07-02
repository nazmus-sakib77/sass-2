"use client";

/**
 * ── Animation hub ──────────────────────────────────────────────────────────
 * Every scroll/entrance animation on the site is defined HERE, in one place.
 *
 * Want to change the feel? Tweak SPRING:
 *   - stiffness ↑ = snappier, stiffness ↓ = softer/slower
 *   - damping   ↑ = less bounce, damping ↓ = more bounce
 * Want more/less stagger between cards? Change `staggerChildren` below.
 *
 * Usage:
 *   <Reveal>…</Reveal>                        → single block fades/slides in
 *   <Stagger className="grid grid-3">         → children animate one-by-one
 *     <StaggerItem>…</StaggerItem>
 *   </Stagger>
 * ───────────────────────────────────────────────────────────────────────────
 */

import { motion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/** The site-wide spring. One knob to rule the whole feel. */
export const SPRING = {
  type: "spring",
  stiffness: 170,
  damping: 26,
  mass: 0.9,
} as const;

const HIDDEN = { opacity: 0, y: 26, filter: "blur(6px)" };
const SHOWN = { opacity: 1, y: 0, filter: "blur(0px)" };

export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ ...HIDDEN, y }}
      whileInView={SHOWN}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: HIDDEN,
  show: { ...SHOWN, transition: SPRING },
};

/** Wrap a grid/list; children (StaggerItem) reveal one after another. */
export function Stagger({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div variants={item} className={className} style={style}>
      {children}
    </motion.div>
  );
}
