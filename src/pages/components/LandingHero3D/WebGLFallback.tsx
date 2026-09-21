import { motion } from "framer-motion";

interface WebGLFallbackProps {
  isDark: boolean;
}

export default function WebGLFallback({ isDark }: WebGLFallbackProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-10 flex items-center justify-center lg:justify-end lg:pr-16"
    >
      {/* Ambient background glow */}
      <div
        className={`absolute h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30 ${
          isDark ? "bg-indigo-600/30" : "bg-primary/20"
        }`}
      />

      {/* Stylized SVG Isometric Architecture Hologram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-72 h-72 sm:w-96 sm:h-96"
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-2xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#818cf8" : "#4f46e5"} />
              <stop offset="100%" stopColor={isDark ? "#06b6d4" : "#2563eb"} />
            </linearGradient>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? "#c084fc" : "#818cf8"} stopOpacity="0.8" />
              <stop offset="100%" stopColor={isDark ? "#38bdf8" : "#60a5fa"} stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Concentric Coordinate Rings */}
          <ellipse
            cx="200"
            cy="200"
            rx="160"
            ry="70"
            stroke="url(#ringGrad)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            className="animate-spin-slow origin-center"
            style={{ animationDuration: "35s" }}
          />
          <ellipse
            cx="200"
            cy="200"
            rx="130"
            ry="55"
            stroke={isDark ? "#6366f1" : "#4f46e5"}
            strokeWidth="1"
            opacity="0.4"
            transform="rotate(-25 200 200)"
          />

          {/* Outer Geodesic / Hexagonal Polyhedron */}
          <polygon
            points="200,80 300,140 300,260 200,320 100,260 100,140"
            stroke={isDark ? "#818cf8" : "#4f46e5"}
            strokeWidth="1.5"
            fill={isDark ? "rgba(99, 102, 241, 0.08)" : "rgba(79, 70, 229, 0.04)"}
          />
          {/* Inner Facet Lines */}
          <line x1="200" y1="80" x2="200" y2="320" stroke={isDark ? "#6366f1" : "#818cf8"} strokeWidth="1" opacity="0.4" />
          <line x1="100" y1="140" x2="300" y2="260" stroke={isDark ? "#6366f1" : "#818cf8"} strokeWidth="1" opacity="0.4" />
          <line x1="100" y1="260" x2="300" y2="140" stroke={isDark ? "#6366f1" : "#818cf8"} strokeWidth="1" opacity="0.4" />

          {/* Inner Glowing Crystal Core */}
          <polygon
            points="200,140 250,200 200,260 150,200"
            fill="url(#coreGrad)"
            opacity="0.85"
          />

          {/* Orbiting Satellite Data Nodes */}
          <circle cx="200" cy="80" r="5" fill="#38bdf8" />
          <circle cx="300" cy="140" r="6" fill="#818cf8" />
          <circle cx="300" cy="260" r="5" fill="#10b981" />
          <circle cx="100" cy="260" r="6" fill="#c084fc" />
          <circle cx="100" cy="140" r="4.5" fill="#f59e0b" />
        </svg>
      </motion.div>
    </div>
  );
}
