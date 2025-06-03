"use client";

import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

export { motion };

export type AnimationProps = HTMLMotionProps<"div">;

export interface AnimatePresenceProps {
  children: React.ReactNode;
  mode?: "sync" | "wait" | "popLayout";
}

export const AnimatePresenceWrapper = ({ children, mode = "wait" }: AnimatePresenceProps) => {
  return <AnimatePresence mode={mode}>{children}</AnimatePresence>;
};