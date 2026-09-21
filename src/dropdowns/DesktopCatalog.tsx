import { toLangHref, useI18n } from "../shared/i18n/i18n.tsx";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, LayoutGrid } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { CATS } from "../data/catalog/categories.ts";

function getCatalogHref(_catKey: string, subKey: string): string {
  if (subKey.includes("android")) return "/services/android";
  if (subKey.includes("landing")) return "/services/lending";
  if (subKey.includes("spa") || subKey.includes("pwa")) return "/services/spa";
  if (subKey.includes("non_standard")) return "/services/custom-orders";
  if (subKey.includes("site")) return "/services/site";
  if (subKey.includes("web_app")) return "/services/web";
  return "/service";
}

function useAnchorRect<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const update = React.useCallback(() => {
    if (!ref.current) return;
    setRect(ref.current.getBoundingClientRect());
  }, []);
  React.useLayoutEffect(() => {
    update();
    const on = () => update();
    window.addEventListener("resize", on);
    window.addEventListener("scroll", on, true);
    return () => {
      window.removeEventListener("resize", on);
      window.removeEventListener("scroll", on, true);
    };
  }, [update]);
  return { ref, rect, refresh: update };
}

export default function DesktopCatalog() {
  const { t, lang } = useI18n();
  const location = useLocation();

  const { ref: btnRef, rect } = useAnchorRect<HTMLButtonElement>();
  const [open, setOpen] = useState(false);

  React.useEffect(() => setOpen(false), [location.pathname]);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const menuStyle: React.CSSProperties | undefined = React.useMemo(() => {
    if (!rect) return undefined;

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    const maxSheetW = Math.min(1060, viewportW - 32);
    const sheetW = Math.max(720, Math.min(maxSheetW, Math.floor(viewportW * 0.72)));

    const left = Math.min(Math.max(16, Math.round(rect.left)), viewportW - sheetW - 16);

    const spaceBelow = viewportH - rect.bottom;
    const openUp = spaceBelow < 280 && rect.top > viewportH / 2;
    const maxH = Math.floor(viewportH * 0.8);

    const base: React.CSSProperties = {
      position: "fixed",
      left,
      width: sheetW,
      zIndex: 9999,
      maxHeight: maxH,
      overflowY: "auto",
      scrollbarGutter: "stable both-edges",
    };

    if (openUp) {
      return { ...base, bottom: Math.round(viewportH - rect.top + 10) };
    }
    return { ...base, top: Math.round(rect.bottom + 10) };
  }, [rect]);

  const sheetVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 380,
        damping: 28,
        mass: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.03,
      },
    },
    exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } },
  } as const;

  const colVariants = { hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } } as const;

  return (
    <div className="relative">
      <button
        ref={btnRef}
        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-150 outline-none select-none cursor-pointer border ${
          open
            ? "bg-primary text-primary-foreground border-primary shadow-sm"
            : "bg-secondary/70 hover:bg-secondary text-secondary-foreground border-border/80 hover:border-primary/40 shadow-xs"
        } active:scale-[0.98]`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <LayoutGrid className="h-4 w-4" />
        <span>{t("nav_catalog")}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {createPortal(
        <>
          <AnimatePresence>
            {open && (
              <motion.div
                key="backdrop"
                aria-hidden
                className="fixed inset-0 z-[9990] bg-black/30 backdrop-blur-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setOpen(false)}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {open && menuStyle && (
              <motion.div
                key="catalog-sheet"
                style={menuStyle}
                className="rounded-2xl border border-border/90 bg-card/95 backdrop-blur-xl p-6 shadow-2xl drop-shadow-2xl overscroll-contain"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={sheetVariants}
                role="menu"
              >
                <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                  {CATS.map((cat) => (
                    <motion.div
                      key={cat.key}
                      variants={colVariants}
                      className="flex flex-col min-w-0"
                    >
                      <div className="mb-3 pb-1.5 border-b border-border/60 text-xs font-bold uppercase tracking-wider text-primary">
                        {t(cat.labelKey)}
                      </div>

                      <div className="flex flex-col w-full gap-1.5">
                        {cat.children?.map((sub) => (
                          <Link
                            key={sub.key}
                            to={toLangHref(getCatalogHref(cat.key, sub.key), lang)}
                            role="menuitem"
                            title={t(sub.labelKey)}
                            onClick={() => setOpen(false)}
                            className="group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-foreground/80 hover:text-foreground bg-transparent hover:bg-accent transition-all duration-150 cursor-pointer outline-none active:scale-[0.99]"
                          >
                            <span className="leading-snug pr-2">
                              {t(sub.labelKey)}
                            </span>
                            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </div>
  );
}
