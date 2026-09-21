import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function PageTransition({
  children,
  className = "",
  id,
}: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: -8,
          transition: { duration: 0.15, ease: "easeInOut" },
        },
  };

  return (
    <motion.div
      id={id}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
