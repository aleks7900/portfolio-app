import { useEffect, useRef, useState } from "react";

export interface ScrollDepthState {
  heroProgress: number;
  globalProgress: number;
  velocity: number;
  currentHero: number;
  currentGlobal: number;
  currentVelocity: number;
}

export function useScrollProgress() {
  const scrollRef = useRef<ScrollDepthState>({
    heroProgress: 0,
    globalProgress: 0,
    velocity: 0,
    currentHero: 0,
    currentGlobal: 0,
    currentVelocity: 0,
  });
  const [hasScrolled, setHasScrolled] = useState(false);
  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          const heroHeight = window.innerHeight * 0.95;
          const docHeight = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1
          );

          const heroProg = Math.min(Math.max(scrollY / heroHeight, 0), 1.5);
          const globalProg = Math.min(Math.max(scrollY / docHeight, 0), 1);

          // Calculate approximate scroll velocity
          const now = performance.now();
          const dt = Math.max(now - lastTimeRef.current, 16);
          const dy = Math.abs(scrollY - lastScrollYRef.current);
          const vel = Math.min((dy / dt) * 10, 5); // clamped velocity factor

          lastScrollYRef.current = scrollY;
          lastTimeRef.current = now;

          const ref = scrollRef.current;
          ref.heroProgress = heroProg;
          ref.globalProgress = globalProg;
          ref.velocity = vel;

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

    ref.currentHero += (ref.heroProgress - ref.currentHero) * factor;
    ref.currentGlobal += (ref.globalProgress - ref.currentGlobal) * factor;
    ref.currentVelocity += (ref.velocity - ref.currentVelocity) * Math.min(delta * 6, 1);
    ref.velocity *= Math.max(0, 1 - delta * 4); // naturally decay velocity

    return ref.currentHero;
  };

  return { scrollRef, hasScrolled, update };
}
