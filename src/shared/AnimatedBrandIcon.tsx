import { motion } from "framer-motion";

export interface AnimatedBrandIconProps {
  className?: string;
  size?: number;
}

export function AnimatedBrandIcon({
  className = "",
  size = 36,
}: AnimatedBrandIconProps) {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      whileHover="hover"
      whileTap={{ scale: 0.94 }}
      initial="initial"
      aria-hidden="true"
    >
      {/* 1. Ambient Background Breathing Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-500/25 dark:bg-emerald-400/20 blur-md pointer-events-none"
        variants={{
          initial: { scale: 0.85, opacity: 0.4 },
          hover: { scale: 1.3, opacity: 0.85 },
        }}
        animate={{
          scale: [0.85, 1.12, 0.85],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      />

      {/* 2. Main Vector Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 overflow-visible"
      >
        <defs>
          {/* Brand Gradient */}
          <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          {/* Accent Linear Gradient */}
          <linearGradient id="accentGlow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
          </linearGradient>

          {/* Glow filter for tech nodes */}
          <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Orbit with Rotating Satellite (Clockwise) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
          style={{ transformOrigin: "24px 24px" }}
        >
          {/* Dashed circular orbit */}
          <circle
            cx="24"
            cy="24"
            r="21.5"
            stroke="url(#brandGradient)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            strokeOpacity="0.5"
          />
          {/* Orbiting glowing satellite */}
          <circle
            cx="24"
            cy="2.5"
            r="2.2"
            fill="#34d399"
            filter="url(#nodeGlow)"
          />
        </motion.g>

        {/* Counter-Rotating Inner Dashed Arc */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          style={{ transformOrigin: "24px 24px" }}
        >
          <circle
            cx="24"
            cy="24"
            r="16.5"
            stroke="url(#accentGlow)"
            strokeWidth="1"
            strokeDasharray="6 8"
            strokeOpacity="0.6"
          />
        </motion.g>

        {/* Central Geometric Hexagonal Shield */}
        <motion.path
          d="M24 8.5 L36.5 15.5 V29.5 L24 36.5 L11.5 29.5 V15.5 Z"
          className="fill-card/90 stroke-emerald-500/80 dark:stroke-emerald-400/90"
          strokeWidth="1.8"
          strokeLinejoin="round"
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.06 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{ transformOrigin: "24px 24px" }}
        />

        {/* Inner Code Bracket: Left `<` */}
        <motion.path
          d="M19.5 20.5 L16.5 23.5 L19.5 26.5"
          stroke="#10b981"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            initial: { x: 0 },
            hover: { x: -1.5 },
          }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
        />

        {/* Inner Code Bracket: Right `>` */}
        <motion.path
          d="M28.5 20.5 L31.5 23.5 L28.5 26.5"
          stroke="#06b6d4"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            initial: { x: 0 },
            hover: { x: 1.5 },
          }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
        />

        {/* Pulsing Core Energy Point */}
        <motion.circle
          cx="24"
          cy="23.5"
          r="2"
          fill="#34d399"
          filter="url(#nodeGlow)"
          animate={{
            scale: [0.8, 1.4, 0.8],
            opacity: [0.65, 1, 0.65],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "24px 23.5px" }}
        />
      </svg>
    </motion.div>
  );
}

export default AnimatedBrandIcon;
