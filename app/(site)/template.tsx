"use client";

import { motion } from "motion/react";

/**
 * Page transition: every route change in the public site fades/slides in.
 * Runs on top of the per-section reveals for a layered, Framer-like feel.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
