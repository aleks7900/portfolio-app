import React from "react";
import { ChevronDown, ChevronRight, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { toLangHref, useI18n } from "../shared/i18n/i18n.tsx";
import { CATS } from "../data/catalog/categories.ts";
import { AnimatePresence, motion } from "framer-motion";

function getCatalogHref(_catKey: string, subKey: string): string {
  if (subKey.includes("android")) return "/services/android";
  if (subKey.includes("landing")) return "/services/lending";
  if (subKey.includes("spa") || subKey.includes("pwa")) return "/services/spa";
  if (subKey.includes("non_standard")) return "/services/custom-orders";
  if (subKey.includes("site")) return "/services/site";
  if (subKey.includes("web_app")) return "/services/web";
  return "/service";
}

type OpenMap = Record<string, boolean>;

interface MobileCatalogProps {
  onDone?: () => void;
}

export default function MobileCatalog({ onDone }: MobileCatalogProps) {
  const { t, lang } = useI18n();
  const [open, setOpen] = React.useState<OpenMap>({});

  const toggle = (key: string) =>
    setOpen((m) => ({ ...m, [key]: !m[key] }));

  const itemVariants = {
    hidden: { opacity: 0, x: -6 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3 px-1 text-xs font-bold uppercase tracking-wider text-primary">
        <Layers className="h-3.5 w-3.5" />
        <span>{t("nav_catalog")}</span>
      </div>

      <ul className="flex flex-col gap-2">
        {CATS.map((cat) => {
          const isOpen = !!open[cat.key];
          return (
            <li
              key={cat.key}
              className="rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent/60 transition-colors cursor-pointer select-none"
                onClick={() => toggle(cat.key)}
                aria-expanded={isOpen}
                aria-controls={`sec-${cat.key}`}
              >
                <span className="truncate">{t(cat.labelKey)}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`sec-${cat.key}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-border/60 bg-muted/30"
                  >
                    <motion.ul
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col p-2 gap-1"
                    >
                      {cat.children?.map((sub, idx) => (
                        <motion.li
                          key={sub.key}
                          variants={itemVariants}
                          transition={{ delay: idx * 0.02 }}
                        >
                          <Link
                            to={toLangHref(getCatalogHref(cat.key, sub.key), lang)}
                            className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-accent transition-colors text-left cursor-pointer"
                            onClick={() => {
                              if (onDone) onDone();
                            }}
                            title={t(sub.labelKey)}
                          >
                            <span className="pr-2">{t(sub.labelKey)}</span>
                            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
