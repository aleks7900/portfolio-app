import React, { useState, useRef, useMemo } from "react";
import Container from "../shared/Container";
import { createRequest } from "../shared/api/requestsRepo.ts";
import { useI18n } from "../shared/i18n/i18n.tsx";
import { API_BASE } from "../shared/api/api.ts";
import PageTransition from "../components/motion/PageTransition.tsx";
import { Input } from "../components/ui/input.tsx";
import { Textarea } from "../components/ui/textarea.tsx";
import { Button } from "../components/ui/button.tsx";
import {
  Phone,
  Clock,
  Mail,
  MapPin,
  Send,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

const GEO = { lat: 47.0207, lng: 28.8491 };
const OPENING_HOURS = [
  {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
];

export default function ContactsPage() {
  const { t } = useI18n();

  const tf = (key: string, fallback: string) => {
    const v = t(key);
    return v === key || !v ? fallback : v;
  };

  const origin = typeof window !== "undefined" ? window.location.origin : "https://example.com";
  const pageUrl = `${origin}/contacts`;
  const siteName = t("seo_site_name") ?? "Alex-lab";
  const orgName = t("seo_org_name") ?? "Alex-lab";
  const phone = "+37379449334";
  const email = "alex.lab.webdev@gmail.com";
  const street = t("street_address") || "Chișinău, strada Pădurii 21/1";
  const sameAs = [t("seo_facebook") || "", t("seo_instagram") || ""].filter(Boolean);

  const jsonld = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: origin,
        name: siteName,
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        url: origin,
        name: orgName,
        sameAs: sameAs,
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${origin}#business`,
        name: orgName,
        image: `${origin}/images/logo.png`,
        url: origin,
        email: email,
        telephone: phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: street,
          addressLocality: "Chișinău",
          addressCountry: "MD",
        },
        geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
        openingHoursSpecification: OPENING_HOURS,
        sameAs: sameAs,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: phone,
            contactType: "customer support",
            areaServed: "MD",
            availableLanguage: ["ru", "ro", "en"],
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: pageUrl,
        name: t("contacts_ytitle") || "Контакты",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: t("seo_breadcrumb_home_t") || "Главная",
              item: origin,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: t("seo_breadcrumb_contacts") || "Контакты",
              item: pageUrl,
            },
          ],
        },
      },
    ],
    [origin, pageUrl, siteName, orgName, street, sameAs, t]
  );

  // Form & upload state
  const [photos, setPhotos] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files || []);
    const onlyImages = picked.filter((f) => f.type.startsWith("image/"));
    if (picked.length !== onlyImages.length) {
      setFeedback({
        type: "error",
        message: tf("contacts_alert_images_only", "Допустимы только изображения (image/*)."),
      });
    }

    let limited = onlyImages.slice(0, 3);
    if (onlyImages.length > 3) {
      setFeedback({
        type: "error",
        message: tf("contacts_alert_max3", "Вы можете прикрепить не более 3 изображений."),
      });
    }
    const tooBig = limited.find((f) => f.size > 10 * 1024 * 1024);
    if (tooBig) {
      setFeedback({
        type: "error",
        message: tf("contacts_alert_size", "Каждое изображение должно быть не более 10 МБ."),
      });
      limited = limited.filter((f) => f.size <= 10 * 1024 * 1024);
    }
    setPhotos(limited);
  }

  function removePhoto(idx: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
    if (fileRef.current) fileRef.current.value = "";
  }

  async function submitMultipart(payload: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) {
    const fd = new FormData();
    fd.set("name", payload.name);
    if (payload.email) fd.set("email", payload.email);
    if (payload.phone) fd.set("phone", payload.phone);
    if (payload.subject) fd.set("subject", payload.subject);
    fd.set("message", payload.message);
    photos.forEach((f) => fd.append("photos", f));

    const res = await fetch(API_BASE + "/requests", { method: "POST", body: fd });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Request failed: ${res.status} ${txt}`);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setFeedback(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const emailVal = String(fd.get("email") || "").trim();
    const phoneVal = String(fd.get("phone") || "").trim();
    const subject = String(fd.get("subject") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !message) {
      setFeedback({
        type: "error",
        message: tf("contacts_alert_fill", "Введите имя и сообщение."),
      });
      setIsSubmitting(false);
      return;
    }

    try {
      if (photos.length > 0) {
        await submitMultipart({
          name,
          email: emailVal,
          phone: phoneVal,
          subject,
          message,
        });
      } else {
        await createRequest({
          name,
          email: emailVal,
          phone: phoneVal,
          subject,
          message,
        });
      }
      setFeedback({
        type: "success",
        message: tf("contacts_alert_sent", "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."),
      });
      form.reset();
      setPhotos([]);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err: unknown) {
      console.error(err);
      setFeedback({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : tf("contacts_alert_failed", "Не удалось отправить заявку"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageTransition>
      <section className="scroll-mt-24 py-12 sm:py-20">
        <Container>
          {/* Header */}
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              {t("contacts_ytitle")}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("seo_main_intro")}
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Phone Card */}
              <div className="group rounded-2xl border border-border/80 bg-card/70 dark:bg-card/50 p-6 shadow-xs hover:shadow-md hover:border-emerald-500/40 backdrop-blur-sm transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("contacts_phone") || "Телефон"}
                    </div>
                    <a
                      href="tel:+37379449334"
                      className="text-2xl font-bold tracking-tight text-foreground hover:text-emerald-600 transition-colors block mt-1"
                    >
                      +373 79 449334
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t("contacts_hours")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group rounded-2xl border border-border/80 bg-card/70 dark:bg-card/50 p-6 shadow-xs hover:shadow-md hover:border-primary/40 backdrop-blur-sm transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Email
                    </div>
                    <a
                      href="mailto:alex.lab.webdev@gmail.com"
                      className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors block mt-1"
                    >
                      alex.lab.webdev@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Location / Hours Card */}
              <div className="group rounded-2xl border border-border/80 bg-card/70 dark:bg-card/50 p-6 shadow-xs hover:shadow-md backdrop-blur-sm transition-all duration-200 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("street_address") || "Адрес"}
                    </div>
                    <p className="text-sm font-medium text-foreground mt-1">
                      {street}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center gap-4">
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    {t("contacts_hours")}
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="rounded-2xl border border-border/80 bg-card/70 dark:bg-card/50 p-6 shadow-xs backdrop-blur-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  {t("contacts_socials")}
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 hover:bg-primary hover:text-white transition-all active:scale-95"
                  >
                    <SiFacebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 hover:bg-rose-500 hover:text-white transition-all active:scale-95"
                  >
                    <SiInstagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Modern Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-border/80 bg-card/80 dark:bg-card/60 backdrop-blur-xl p-8 sm:p-10 shadow-lg">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
                  {t("contacts_form_title")}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {tf("contacts_form_subtitle", "Заполните форму ниже, и мы подготовим персональное предложение.")}
                </p>

                {/* Inline Feedback Alert */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={`mb-6 flex items-start gap-3 rounded-2xl p-4 border text-sm ${
                        feedback.type === "success"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {feedback.type === "success" ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 font-medium">{feedback.message}</div>
                      <button
                        type="button"
                        onClick={() => setFeedback(null)}
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      {t("contacts_yname")} *
                    </label>
                    <Input
                      name="name"
                      required
                      placeholder={t("callback_form_name_placeholder") || "Ваше имя"}
                      autoComplete="name"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        {t("contacts_yemail")}
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder={t("callback_form_email_placeholder") || "email@example.com"}
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        {t("contacts_phone")}
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder={t("callback_form_phone_placeholder") || "+373 79 ..."}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      {t("contacts_subject")}
                    </label>
                    <Input
                      name="subject"
                      placeholder={tf("contacts_subject_placeholder", "Тема или тип проекта (SPA, Web app, etc.)")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      {t("contacts_message")} *
                    </label>
                    <Textarea
                      name="message"
                      required
                      rows={5}
                      placeholder={t("callback_form_comment_placeholder") || "Опишите ваш проект или задачу..."}
                    />
                  </div>

                  {/* Photo Attachment Picker */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      {tf("contacts_photos_label", "Фото / ТЗ (до 3 изображений)")}
                    </label>

                    <div className="flex items-center gap-3">
                      <input
                        ref={fileRef}
                        name="photos"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={onFilesChange}
                        className="hidden"
                        id="contacts-photo-upload"
                      />
                      <label
                        htmlFor="contacts-photo-upload"
                        className="inline-flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-2.5 text-xs font-semibold text-foreground/80 hover:bg-accent/60 cursor-pointer transition-colors"
                      >
                        <Upload className="h-4 w-4 text-primary" />
                        <span>{tf("contacts_upload_btn", "Прикрепить файлы")}</span>
                      </label>
                      <span className="text-xs text-muted-foreground">
                        {tf("contacts_photos_hint", "Изображения (image/*) до 10 МБ. Не более 3 файлов.")}
                      </span>
                    </div>

                    {photos.length > 0 && (
                      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {photos.map((f, i) => {
                          const url = URL.createObjectURL(f);
                          return (
                            <li
                              key={`${f.name}-${i}`}
                              className="group relative flex items-center gap-3 rounded-xl border border-border bg-card/60 p-2 pr-10"
                            >
                              <img
                                src={url}
                                alt={f.name}
                                className="h-12 w-12 rounded-lg object-cover"
                                onLoad={() => URL.revokeObjectURL(url)}
                              />
                              <div className="min-w-0">
                                <div className="truncate text-xs font-medium text-foreground">
                                  {f.name}
                                </div>
                                <div className="text-[11px] text-muted-foreground">
                                  {(f.size / 1024 / 1024).toFixed(2)} MB
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removePhoto(i)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                                aria-label={tf("contacts_remove_file", "Удалить файл")}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      variant="emerald"
                      loading={isSubmitting}
                      className="w-full sm:w-auto px-8 gap-2 text-base"
                    >
                      <Send className="h-4 w-4" />
                      <span>
                        {isSubmitting
                          ? tf("contacts_sending", "Отправка...")
                          : t("contacts_ysend")}
                      </span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* SEO Block */}
          <div className="mt-20 border-t border-border/60 pt-12">
            <div className="prose max-w-none dark:prose-invert prose-p:leading-relaxed text-muted-foreground">
              <h2 className="!mt-0 text-2xl font-bold text-foreground">
                {t("seo_contacts_h1")}
              </h2>
              <p>{t("seo_contacts_p1")}</p>
              <h3 className="text-xl font-semibold text-foreground">
                {t("seo_contacts_h2")}
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t("seo_contacts_li1")}</li>
                <li>{t("seo_contacts_li2")}</li>
                <li>{t("seo_contacts_li3")}</li>
              </ul>
              <h3 className="text-xl font-semibold text-foreground">
                {t("seo_contacts_h3")}
              </h3>
              <p>{t("seo_contacts_p2")}</p>
            </div>
          </div>

          {/* JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
          />
        </Container>
      </section>
    </PageTransition>
  );
}
