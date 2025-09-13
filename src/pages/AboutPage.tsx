import {useI18n} from "../shared/i18n/i18n.tsx";
import MapEmbed from "../shared/widgets/MapEmbed.tsx";
import Section from "./components/Section.tsx";

export default function AboutPage() {
    const {t} = useI18n();
    return (
        <Section titleKey="about_title" leadKey="about_lead">
            <div className="prose max-w-none prose-p:leading-relaxed dark:prose-invert"><p>{t("about_p1")}</p>
                <p>{t("about_p2")}</p></div>

            <div className="mt-8"><p></p><p></p></div>

            {/* Карта без ключа */}
            <MapEmbed query="Chișinău, strada Pădurii 21/1" zoom={16}/>

            <div className="mt-4 text-sm">
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Chișinău, strada Pădurii 21/1")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl px-4 py-2 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                    Открыть маршрут в Google Maps
                </a>
            </div>
        </Section>
    );
}