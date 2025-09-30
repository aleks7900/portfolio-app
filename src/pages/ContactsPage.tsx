import React from "react";
import Container from "../shared/Container";
import {createRequest} from "../shared/api/requestsRepo.ts";
import {useI18n} from "../shared/i18n/i18n.tsx";
import MapEmbed from "../shared/widgets/MapEmbed.tsx";
import {API_BASE} from "../shared/api/api.ts";
import ImageWithFallback from "../data/ImageWithFallback.tsx";
import placeholderImg from '@/assets/img/elementor-placeholder-image.png';
import img from '@/assets/img/14.jpg';

// Простейшие SVG-иконки (без внешних зависимостей)
const Icon = {
    Pin: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M12 22s7-5.33 7-12a7 7 0 10-14 0c0 6.67 7 12 7 12z"/>
            <circle cx="12" cy="10" r="3"/>
        </svg>
    ),
    Phone: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.1 4.18 2 2 0 014.1 2h3a2 2 0 012 1.72c.12.9.33 1.78.62 2.63a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.45-1.45a2 2 0 012.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0122 16.92z"/>
        </svg>
    ),
    Clock: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
        </svg>
    ),
    Mail: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M4 4h16v16H4z"/>
            <path d="M22 6l-10 7L2 6"/>
        </svg>
    ),
    Facebook: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path
                d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z"/>
        </svg>
    ),
    Instagram: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="3" y="3" width="18" height="18" rx="5"/>
            <circle cx="12" cy="12" r="3.5"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
    )
};


/**
 * ContactsPage
 * — форма связи с поддержкой загрузки до 3 изображений (image/*, ≤10MB каждое)
 * — если есть фото: отправляет multipart/form-data на /api/requests (ключ файлов — "photos")
 * — если фото нет: остаётся ваш прежний JSON-вызов createRequest(...)
 * — после успешной отправки очищает форму и выбранные файлы
 */
export default function ContactsPage() {
    const {t} = useI18n();

    const tf = (key: string, fallback: string) => {
        const v = t(key);
        return v === key || !v ? fallback : v;
    };

    // --- Добавлено: выбор/валидация фото (до 3 шт., image/*, ≤10MB) ---
    const [photos, setPhotos] = React.useState<File[]>([]);
    const fileRef = React.useRef<HTMLInputElement | null>(null);

    function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
        const picked = Array.from(e.target.files || []);
        const onlyImages = picked.filter(f => f.type.startsWith("image/"));
        if (picked.length !== onlyImages.length) {
            alert(tf("contacts_alert_images_only", "Допустимы только изображения (image/*)."));
        }

        let limited = onlyImages.slice(0, 3);
        if (onlyImages.length > 3) {
            alert(tf("contacts_alert_max3", "Вы можете прикрепить не более 3 изображений."));
        }
        const tooBig = limited.find(f => f.size > 10 * 1024 * 1024);
        if (tooBig) {
            alert(tf("contacts_alert_size", "Каждое изображение должно быть не более 10 МБ."));
            limited = limited.filter(f => f.size <= 10 * 1024 * 1024);
        }
        setPhotos(limited);
    }

    function removePhoto(idx: number) {
        setPhotos(prev => prev.filter((_, i) => i !== idx));
        if (fileRef.current) fileRef.current.value = "";
    }

    // --- Добавлено: отправка multipart, если прикреплены фото ---
    async function submitMultipart(payload: {
        name: string; email: string; phone: string; subject: string; message: string;
    }) {
        const fd = new FormData();
        fd.set("name", payload.name);
        if (payload.email) fd.set("email", payload.email);
        if (payload.phone) fd.set("phone", payload.phone);
        if (payload.subject) fd.set("subject", payload.subject);
        fd.set("message", payload.message);
        photos.forEach(f => fd.append("photos", f));

        const res = await fetch(API_BASE + "/requests", {method: "POST", body: fd});
        if (!res.ok) {
            const txt = await res.text().catch(() => "");
            throw new Error(`Request failed: ${res.status} ${txt}`);
        }
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const name = String(fd.get("name") || "").trim();
        const email = String(fd.get("email") || "").trim();
        const phone = String(fd.get("phone") || "").trim();
        const subject = String(fd.get("subject") || "").trim();
        const message = String(fd.get("message") || "").trim();

        if (!name || !message) {
            alert(tf("contacts_alert_fill", "Введите имя и сообщение."));
            return;
        }

        try {
            if (photos.length > 0) {
                // с фото — multipart
                await submitMultipart({name, email, phone, subject, message});
            } else {
                // без фото — ваш прежний JSON-эндпоинт
                await createRequest({name, email, phone, subject, message});
            }
            alert(tf("contacts_alert_sent", "Заявка отправлена!"));
            form.reset();
            setPhotos([]);
            if (fileRef.current) fileRef.current.value = "";
        } catch (err) {
            console.error(err);
            alert(tf("contacts_alert_failed", "Не удалось отправить заявку"));
        }
    }

    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <Container>
                {/* Заголовок страницы */}
                <h1 className="mb-10 text-3xl font-semibold">{t("contacts_ytitle")}</h1>

                {/* Три колонки */}
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Левая колонка: адрес/тел/часы/почта + соцсети */}
                    <div>
                        <h2 className="mb-6 text-2xl font-semibold">{t("contacts_company")}</h2>

                        <ul className="space-y-4 text-[15px] leading-relaxed">
                            <li className="flex items-start gap-3">
                                <Icon.Pin className="mt-0.5 h-5 w-5"/>
                                <span>{t("contacts_address")}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Icon.Phone className="mt-0.5 h-5 w-5"/>
                                <a className="text-3xl font-semibold hover:underline" href="tel:+37360174654">+373 60 174654</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Icon.Clock className="mt-0.5 h-5 w-5"/>
                                <span>{t("contacts_hours")}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Icon.Mail className="mt-0.5 h-5 w-5"/>
                                <a className="hover:underline" href="mailto:engineeringrvsteel@gmail.com">
                                    engineeringrvsteel@gmail.com
                                </a>
                            </li>
                        </ul>

                        <div className="mt-8">
                            <div className="mb-3 text-lg font-semibold">{t("contacts_socials")}</div>
                            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200">
                                <a
                                    href="#"
                                    aria-label="Facebook"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                                >
                                    <Icon.Facebook className="h-5 w-5"/>
                                </a>
                                <a
                                    href="#"
                                    aria-label="Instagram"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                                >
                                    <Icon.Instagram className="h-5 w-5"/>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Средняя колонка: реквизиты */}
                    <div>
                        <h3 className="mb-4 text-2xl font-semibold">{t("contacts_md_title")}</h3>
                        <div className="space-y-2 text-[15px] leading-relaxed">
                            <div className="font-semibold">{t("contacts_company")}</div>
                            <div>
                                <span
                                    className="font-medium">{tf("contacts_md_legal_address_label", "Юридический адрес:")}</span>{" "}
                                {tf("contacts_md_legal_address_value", "MD 2023, mun.Chisinau, Uzinelor 11/1")}
                            </div>
                            <div>
                                <span
                                    className="font-medium">{tf("contacts_md_fiscal_code_label", "Фискальный код:")}</span>{" "}
                                {tf("contacts_md_fiscal_code_value", "1020600017959")}
                            </div>
                            <div>
                                <span className="font-medium">{tf("contacts_md_vat_label", "НДС:")}</span>{" "}
                                {tf("contacts_md_vat_value", "0611069")}
                            </div>
                            <div>{tf("contacts_md_bank_name", "BC \"MOLDOVA-AGROINDBANK\" S.A.")}</div>
                            <div>
                                <span className="font-medium">{tf("contacts_md_bic_label", "BIC:")}</span>{" "}
                                {tf("contacts_md_bic_value", "AGRNMD2X710")}
                            </div>
                            <div>
                                <span className="font-medium">{tf("contacts_md_iban_label", "IBAN:")}</span>{" "}
                                {tf("contacts_md_iban_value", "MD65AG000000022513991091 (MDL)")}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Разделитель */}
                <div className="my-12 h-px w-full bg-gray-200 dark:bg-gray-800"/>

                {/* Форма */}
                <h2 className="mb-6 text-2xl font-semibold">{t("contacts_form_title")}</h2>
                <form onSubmit={onSubmit} className="grid w-auto gap-4">
                    <label className="block">
                        <div className="mb-1 text-sm font-medium">{t("contacts_yname")}</div>
                        <input
                            name="name"
                            required
                            placeholder={t('callback_form_name_placeholder')}
                            autoComplete="name"
                            className="w-full rounded-xl border px-3 py-2 !bg-white !text-black dark:!bg-gray-300 dark:!text-black"
                        />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                            <div className="mb-1 text-sm font-medium">{t("contacts_yemail")}</div>
                            <input
                                name="email"
                                type="email"
                                placeholder={t('callback_form_email_placeholder')}
                                autoComplete="email"
                                className="w-full rounded-xl border px-3 py-2 !bg-white !text-black dark:!bg-gray-300 dark:!text-black"
                            />
                        </label>
                        <label className="block">
                            <div className="mb-1 text-sm font-medium">{t("contacts_phone")}</div>
                            <input
                                name="phone"
                                autoComplete="tel"
                                placeholder={t('callback_form_phone_placeholder')}
                                className="w-full rounded-xl border px-3 py-2 !bg-white !text-black dark:!bg-gray-300 dark:!text-black"
                            />
                        </label>
                    </div>

                    <label className="block">
                        <div className="mb-1 text-sm font-medium">{t("contacts_subject")}</div>
                        <input
                            name="subject"
                            className="w-full rounded-xl border px-3 py-2 !bg-white !text-black dark:!bg-gray-300 dark:!text-black"
                        />
                    </label>

                    <label className="block">
                        <div className="mb-1 text-sm font-medium">{t("contacts_message")}</div>
                        <textarea
                            name="message"
                            required
                            rows={5}
                            placeholder={t('callback_form_comment_placeholder')}
                            className="w-full rounded-xl border px-3 py-2 !bg-white !text-black dark:!bg-gray-300 dark:!text-black"
                        />
                    </label>

                    {/* --- Новое поле: загрузка фото до 3 шт. с превью и удалением --- */}
                    <label className="block">
                        <div className="mb-1 text-sm font-medium">
                            {tf("contacts_photos_label", "Фото (до 3 изображений)")}
                        </div>
                        <input
                            ref={fileRef}
                            name="photos"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={onFilesChange}
                            className="w-full cursor-pointer rounded-xl border px-3 py-2 !bg-white !text-black file:mr-4 file:rounded-lg file:border file:bg-gray-50 file:px-3 file:py-1.5 file:text-sm hover:file:bg-gray-100 dark:!bg-gray-300 dark:!text-black"
                        />
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                            {tf("contacts_photos_hint", "Поддерживаются изображения (image/*) до 10 МБ. Не более 3 файлов.")}
                        </div>

                        {photos.length > 0 && (
                            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {photos.map((f, i) => {
                                    const url = URL.createObjectURL(f);
                                    return (
                                        <li key={`${f.name}-${i}`}
                                            className="group relative flex items-center gap-3 rounded-xl border p-2 pr-10 dark:border-gray-800">
                                            <img
                                                src={url}
                                                alt={f.name}
                                                className="h-14 w-14 rounded-lg object-cover"
                                                onLoad={() => URL.revokeObjectURL(url)}
                                            />
                                            <div className="min-w-0">
                                                <div className="truncate text-sm font-medium">{f.name}</div>
                                                <div className="text-xs text-gray-500">
                                                    {(f.size / 1024 / 1024).toFixed(2)} MB
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removePhoto(i)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border px-2 py-1 text-xs dark:text-black dark:hover:!bg-white dark:hover:!text-black hover:!bg-black hover:!text-white"
                                                aria-label={tf("contacts_remove_file", "Удалить файл")}
                                                title={tf("contacts_remove_file", "Удалить файл")}
                                            >
                                                {tf("contacts_remove", "Удалить")}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </label>
                    {/* --- конец нового блока --- */}

                    <div className="pt-2 mb-12">
                        <button
                            type="submit"
                            className="rounded-xl !bg-green-600 px-4 py-2 text-sm font-medium !text-white hover:!bg-green-700 hover:!shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 active:scale-[0.99] dark:!bg-green-500 dark:hover:!bg-green-400"
                        >
                            {t("contacts_ysend")}
                        </button>
                    </div>
                </form>

                <p className="text-2xl font-semibold mt-18">{t("contacts_map")}:</p>
                <ImageWithFallback src={img} alt="" className="mt-10 h-full w-full object-contain"
                                   fallback={placeholderImg}></ImageWithFallback>

                {/* Карта и кнопка маршрута */}
                <p className="text-2xl font-semibold mt-24">{t("contacts_maps")}:</p>
                <MapEmbed query="Chișinău, strada Pădurii 21/1" zoom={16}/>
                <div className="mt-4 text-sm">
                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                            "Chișinău, strada Pădurii 21/1"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-xl px-4 py-2 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                        {t("contacts_route")}
                    </a>
                </div>

                <div className="mt-8 w-full flex items-end gap-3 dark:text-white text-right">
                    <p className="text-3xl w-full font-semibold text-right">{t("street_address")}, +373 60 174654</p>
                </div>
            </Container>
        </section>
    );
}
