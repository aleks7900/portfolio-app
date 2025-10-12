import {useEffect, useState} from "react";
import {createPortal} from "react-dom";

type Props = {
    viber?: string;     // "37360000000"
    whatsapp?: string;  // "37360000000"
    telegram?: string;  // "@yourusername" или "yourusername"
};

export default function CallWidget({
                                       viber = "37379449334",
                                       whatsapp = "37379449334",
                                       telegram = "yourusername",
                                   }: Props) {
    const [open, setOpen] = useState(false); // ← по умолчанию закрыт

    useEffect(() => {
        const onPop = () => setOpen(false);
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, []);

    const items = [
        {
            key: "viber",
            href: `viber://chat?number=%2B${viber.replace(/[^\d]/g, "")}`,
            bg: "bg-purple-600 hover:bg-purple-700",
            label: "Viber",
            icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.67.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.521.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.521-.074-.149-.669-1.611-.916-2.209-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.521.074-.793.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.002 3C7.032 3 3 7.032 3 12.002 3 16.971 7.032 21 12.002 21 16.971 21 21 16.971 21 12.002 21 7.032 16.971 3 12.002 3zm0 16.363c-4.006 0-7.362-3.356-7.362-7.361 0-4.006 3.356-7.362 7.362-7.362 4.005 0 7.361 3.356 7.361 7.362 0 4.005-3.356 7.361-7.361 7.361z"/>
                </svg>
            ),
        },
        {
            key: "whatsapp",
            href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`,
            bg: "bg-green-500 hover:bg-green-600",
            label: "WhatsApp",
            icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path
                        d="M20.52 3.48A11.86 11.86 0 0012.06 0C5.44.04.06 5.42.1 12.04a11.86 11.86 0 001.77 6.19L0 24l5.92-1.86a11.9 11.9 0 006.1 1.66h.01c6.62 0 12-5.38 12-12 0-3.21-1.25-6.22-3.51-8.38zM12.03 21.5c-1.95 0-3.85-.52-5.52-1.5l-.4-.24-3.51 1.1 1.14-3.42-.26-.42a9.57 9.57 0 01-1.48-5.16C1.98 6.65 6.61 2 12.07 2c2.55 0 4.95.99 6.76 2.79a9.54 9.54 0 012.8 6.75c-.01 5.46-4.67 9.96-9.6 9.96zm5.53-7.16c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.16-.17.18-.35.2-.64.07-.3-.15-1.26-.46-2.39-1.47-1.03-.92-1.72-2.05-1.93-2.4-.2-.35-.02-.54.13-.72.13-.13.3-.34.45-.52.15-.18.2-.3.3-.49.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.45 1.06 2.85 1.22 3.05.15.2 2.1 3.21 5.08 4.51.71.31 1.27.49 1.7.63.72.23 1.36.19 1.87.12.57-.08 1.75-.71 2-1.4.25-.69.25-1.25.17-1.41-.08-.16-.28-.22-.58-.37z"/>
                </svg>
            ),
        },
        {
            key: "telegram",
            href: `https://t.me/${telegram.replace(/^@/, "")}`,
            bg: "bg-sky-500 hover:bg-sky-600",
            label: "Telegram",
            icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path
                        d="M9.036 15.803l-.375 5.287c.537 0 .77-.23 1.048-.505l2.516-2.414 5.215 3.814c.956.527 1.64.25 1.896-.886l3.437-16.138.001-.001c.305-1.42-.513-1.972-1.44-1.627L1.242 9.71c-1.38.536-1.36 1.31-.235 1.658l5.16 1.608 12.006-7.556c.564-.344 1.08-.154.657.19"/>
                </svg>
            ),
        },
    ];

    return createPortal(
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Глобальные keyframes для вибрации и появления; учитываем prefers-reduced-motion */}
            <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes call-wiggle {
            0%, 100% { transform: translate3d(0,0,0) rotate(0deg) scale(1); box-shadow: 0 8px 20px rgba(0,0,0,.25); }
            10% { transform: translate3d(0.6px, -0.6px, 0) rotate(1deg) scale(1.008); }
            20% { transform: translate3d(-0.6px, 0.6px, 0) rotate(-1deg) scale(1.006); }
            30% { transform: translate3d(0.5px, 0.8px, 0) rotate(1deg) scale(1.007); }
            40% { transform: translate3d(-0.5px, -0.6px, 0) rotate(-1deg) scale(1.005); }
            50% { transform: translate3d(0.4px, -0.3px, 0) rotate(1deg) scale(1.008); }
            60% { transform: translate3d(-0.4px, 0.4px, 0) rotate(-1deg) scale(1.006); }
            70% { transform: translate3d(0.3px, 0.2px, 0) rotate(1deg) scale(1.007); }
            80% { transform: translate3d(-0.3px, -0.4px, 0) rotate(-1deg) scale(1.005); }
            90% { transform: translate3d(0.2px, 0.3px, 0) rotate(1deg) scale(1.006); }
          }
          .call-wiggle { animation: call-wiggle 1.6s ease-in-out infinite; transform: translateZ(0); }
          .soc-appear { animation: soc-appear .28s cubic-bezier(.22,.61,.36,1) both; }
          @keyframes soc-appear { from { opacity: 0; transform: translateY(8px) scale(.96);} to { opacity: 1; transform: translateY(0) scale(1);} }
        }
        @media (prefers-reduced-motion: reduce) {
          .call-wiggle, .soc-appear { animation: none !important; }
        }
      `}</style>

            {/* Кнопки мессенджеров — монтируем ТОЛЬКО когда open=true */}
            {open && (
                <div className="mb-2 flex flex-col items-end space-y-3">
                    {items.map((it, idx) => {
                        const delay = idx * 60; // лёгкий каскад
                        return (
                            <a
                                key={it.key}
                                href={it.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={it.label}
                                className={[
                                    "soc-appear flex h-12 w-12 items-center justify-center rounded-full !text-white shadow-lg",
                                    "transform-gpu will-change-transform transition",
                                    it.bg,
                                ].join(" ")}
                                style={{animationDelay: `${delay}ms`}}
                            >
                                {it.icon}
                            </a>
                        );
                    })}
                </div>
            )}

            {/* Главная кнопка — переключатель, с постоянной вибрацией */}
            <button
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
                aria-label={open ? "Скрыть контакты" : "Показать контакты"}
                className={[
                    "call-wiggle hover:[animation-play-state:paused] focus:[animation-play-state:paused]",
                    "flex h-14 w-14 items-center justify-center rounded-full",
                    "!bg-green-500 !text-white shadow-xl transition-colors",
                    "hover:!bg-black focus:outline-none focus:ring-2",
                    "focus:ring-offset-2 focus:ring-green-400 dark:focus:ring-offset-black",
                ].join(" ")}
            >
                <svg viewBox="0 0 24 24" className="h-12 w-12" fill="currentColor" aria-hidden="true">
                    <path
                        d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.59a1 1 0 01-.25 1.01l-2.2 2.19z"/>
                </svg>
            </button>
        </div>,
        document.body
    );
}
