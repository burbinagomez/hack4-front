"use client";

import { HTMLMotionProps, motion as framerMotion } from "framer-motion";

export const motion = framerMotion;

export type AnimationProps = HTMLMotionProps<"div">;

export interface AnimatePresenceProps {
  children: React.ReactNode;
  mode?: "sync" | "wait" | "popLayout";
}

export const AnimatePresence = ({ children, mode = "wait" }: AnimatePresenceProps) => {
  const { AnimatePresence: FramerAnimatePresence } = framerMotion;
  return <FramerAnimatePresence mode={mode}>{children}</FramerAnimatePresence>;
};