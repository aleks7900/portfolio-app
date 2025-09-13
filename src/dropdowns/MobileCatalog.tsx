import {useI18n} from "../shared/i18n/i18n.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ChevronDown} from "lucide-react";
import {CATS} from "../data/catalog/categories.ts";

export default function MobileCatalog({onDone}: { onDone: () => void }) {
    const {t} = useI18n();
    const navigate = useNavigate();
    const [open, setOpen] = useState<string | null>(null);
    return (
        <div className="rounded-xl bg-gray-50 dark:bg-white/5">
            {CATS.map(cat => (
                <div key={cat.key} className="border-b last:border-none border-black/5 dark:border-white/10">
                    <button onClick={() => setOpen(v => v === cat.key ? null : cat.key)}
                            className="flex w-full items-center justify-between px-4 py-3 text-base">
                        <span>{t(cat.labelKey)}</span>
                        <ChevronDown
                            className={`h-4 w-4 transition-transform ${open === cat.key ? "rotate-180" : ""}`}/>
                    </button>
                    {open === cat.key && (
                        <div className="p-2">
                            {cat.children?.map(sub => (
                                <button key={sub.key} onClick={() => {
                                    navigate(`/catalog/${cat.key}/${sub.key}`);
                                    onDone();
                                }}
                                        className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-black/5 dark:hover:bg-white/10">
                                    {t(sub.labelKey)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}