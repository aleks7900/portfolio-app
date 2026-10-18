import React from "react";
import { useScrollReveal, type ScrollRevealOptions } from "../../hooks/useScrollReveal";

export interface AnimeRevealProps extends ScrollRevealOptions {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
}

export function AnimeReveal({
  children,
  className = "",
  as: Component = "div",
  id,
  ...options
}: AnimeRevealProps) {
  const ref = useScrollReveal<HTMLDivElement>(options);

  // Cast Component to any to render dynamically with ref
  const DynamicTag = Component as any;

  return (
    <DynamicTag id={id} ref={ref} className={className}>
      {children}
    </DynamicTag>
  );
}

export default AnimeReveal;
