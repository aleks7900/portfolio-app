import { useEffect, useRef, useState } from "react";

export function useScrollProgress() {
  const scrollRef = useRef<{ progress: number; current: number }>({
    progress: 0,
    current: 0,
  });
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          const heroHeight = window.innerHeight * 0.9;
          const rawProgress = Math.min(Math.max(scrollY / heroHeight, 0), 1.5);

          scrollRef.current.progress = rawProgress;

          if (scrollY > 40 && !hasScrolled) {
            setHasScrolled(true);
          } else if (scrollY <= 40 && hasScrolled) {
            setHasScrolled(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  const update = (delta: number, dampingSpeed: number = 4) => {
    const ref = scrollRef.current;
    const factor = Math.min(delta * dampingSpeed, 1);
    ref.current += (ref.progress - ref.current) * factor;
    return ref.current;
  };

  return { scrollRef, hasScrolled, update };
}
