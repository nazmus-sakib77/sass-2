"use client";

import { MotionConfig } from "motion/react";

/**
 * Respects the visitor's OS "reduce motion" setting: all motion/react
 * animations automatically tone down for users who opted out of motion.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
