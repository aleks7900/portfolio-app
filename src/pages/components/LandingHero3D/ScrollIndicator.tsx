import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  hasScrolled: boolean;
  onScrollClick?: () => void;
}

export default function ScrollIndicator({
  hasScrolled,
  onScrollClick,
}: ScrollIndicatorProps) {
  return (
    <AnimatePresence>
      {!hasScrolled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35 }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-25 flex flex-col items-center gap-2 pointer-events-auto cursor-pointer select-none"
          onClick={onScrollClick}
          role="button"
          tabIndex={0}
          aria-label="Scroll to explore"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onScrollClick?.();
            }
          }}
        >
          <span className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground/80">
            Scroll
          </span>

          {/* Minimalist animated capsule */}
          <div className="w-5 h-8 rounded-full border border-border/80 bg-background/40 backdrop-blur-md p-1 flex justify-center shadow-xs">
            <motion.div
              animate={{
                y: [0, 10, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-2 rounded-full bg-primary"
            />
          </div>

          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/60 animate-bounce" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
