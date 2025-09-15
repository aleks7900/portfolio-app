import {useI18n} from "../shared/i18n/i18n.tsx";
import Section from "./components/Section.tsx";
import {createRequest} from "../shared/api/requestsRepo.ts";

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await createRequest({
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        subject: String(form.get("subject") || ""),
        message: String(form.get("message") || ""),
    });
    alert("Заявка отправлена!");
    e.currentTarget.reset();
}

export default function ContactsPage() {
    const {t} = useI18n();
    return (
        <Section titleKey="contacts_title" leadKey="contacts_lead">
            <form onSubmit={(e) => onSubmit(e)} className="max-w-xl space-y-4">
                <div><label className="block text-sm font-medium">{t("contacts_name")}</label><input
                    className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"
                    placeholder={t("contacts_name")}/></div>
                <div><label className="block text-sm font-medium">{t("contacts_email")}</label><input type="email"
                                                                                                      className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"
                                                                                                      placeholder="you@example.com"/>
                </div>
                <div><label className="block text-sm font-medium">{t("contacts_msg")}</label><textarea
                    className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"
                    placeholder={t("contacts_msg")} rows={4}/></div>
                <button type="submit"
                        className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90">{t("contacts_send")}</button>
            </form>
        </Section>
    );
}

