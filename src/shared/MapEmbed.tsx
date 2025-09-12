export default function MapEmbed({
                                     query = "Chișinău, strada Pădurii 21/1",
                                     zoom = 16,
                                     height = 420,
                                 }: {
    query?: string;
    zoom?: number;   // обычно 12–18
    height?: number; // px
}) {
    const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
    return (
        <div className="rounded-2xl border overflow-hidden dark:border-white/10">
            <iframe
                src={src}
                width="100%"
                height={height}
                style={{border: 0}}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google Map"
            />
        </div>
    );
}