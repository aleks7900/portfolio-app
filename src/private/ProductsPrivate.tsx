import Container from "../shared/Container";

export default function ProductsPrivate() {
    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <Container>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Приватная продукция</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                    Эта страница видна только после входа. Здесь может быть список заказов/личных товаров и т.п.
                </p>
                <div className="mt-6 rounded-2xl border bg-white p-6 dark:bg-black dark:border-white/10">
                    Demo content…
                </div>
            </Container>
        </section>
    );
}