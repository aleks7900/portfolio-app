import Container from "../../shared/Container.tsx";
import useMediaQuery from "../../shared/theme/mediaQuery.tsx";

export default function UsersPage() {

    const isMobile = useMediaQuery("(max-width: 1024px)");

    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <Container>
                <h2 className="mb-4 text-2xl font-semibold tracking-tight">Пользователи</h2>
                <div className="rounded-2xl border p-6 text-sm text-gray-600 dark:border-white/10 dark:text-gray-300">
                    Здесь будет таблица активных пользователей. Подключи свой эндпоинт и заполни список.
                </div>
            </Container>
        </section>
    );
}