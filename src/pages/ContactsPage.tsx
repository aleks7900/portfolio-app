// src/pages/ContactsPage.tsx (фрагмент)
import React from "react";
import Container from "../shared/Container";
import {createRequest} from "../shared/api/requestsRepo.ts";

export default function ContactsPage() {
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);

        // ВАЖНО: имена точно совпадают с DTO на бэке
        const name = String(fd.get("name") || "").trim();
        const email = String(fd.get("email") || "").trim();
        const phone = String(fd.get("phone") || "").trim();
        const subject = String(fd.get("subject") || "").trim();
        const message = String(fd.get("message") || "").trim();

        // простая валидация до запроса
        if (!name || !message) {
            alert("Введите имя и сообщение.");
            return;
        }

        try {
            await createRequest({name, email, phone, subject, message});
            alert("Заявка отправлена!");
            e.currentTarget.reset(); // очистить форму
        } catch (err) {
            console.error(err);
            alert("Не удалось отправить заявку");
        }
    }

    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <Container>
                <h1 className="mb-6 text-3xl font-semibold">Связаться с нами</h1>

                <form onSubmit={onSubmit} className="grid max-w-2xl gap-4">
                    {/* ВАЖНО: у каждого поля есть name */}
                    <label className="block">
                        <div className="mb-1 text-sm font-medium">Ваше имя *</div>
                        <input
                            name="name"
                            required
                            autoComplete="name"
                            className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
                        />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                            <div className="mb-1 text-sm font-medium">Email</div>
                            <input
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
                            />
                        </label>

                        <label className="block">
                            <div className="mb-1 text-sm font-medium">Телефон</div>
                            <input
                                name="phone"
                                autoComplete="tel"
                                className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
                            />
                        </label>
                    </div>

                    <label className="block">
                        <div className="mb-1 text-sm font-medium">Тема</div>
                        <input
                            name="subject"
                            className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
                        />
                    </label>

                    <label className="block">
                        <div className="mb-1 text-sm font-medium">Сообщение *</div>
                        <textarea
                            name="message"
                            required
                            rows={5}
                            className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
                        />
                    </label>

                    <div className="pt-2">
                        {/* ВАЖНО: type="submit" */}
                        <button
                            type="submit"
                            className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
                        >
                            Отправить
                        </button>
                    </div>
                </form>
            </Container>
        </section>
    );
}

