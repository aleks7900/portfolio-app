import {TransHTML, useI18n} from "../shared/i18n/i18n.tsx";
import MapEmbed from "../shared/widgets/MapEmbed.tsx";
import Section from "./components/Section.tsx";
import ImageWithFallback from "../data/ImageWithFallback.tsx";
import placeholderImg from '@/assets/img/elementor-placeholder-image.png';
import img from '@/assets/img/24.jpg';
import Container from "../shared/Container.tsx";

export default function AboutPage() {
    const {t} = useI18n();

    return (
        <Section titleKey="about_title" leadKey="about_lead">
            {/* Видимая секция — абзацы и списки с аккуратными отступами */}
            <div className="prose max-w-none dark:prose-invert space-y-6 prose-p:leading-relaxed">
                <p>
                    <TransHTML k="about_intro1"/>
                </p>
                <p>
                    <TransHTML k="about_intro2"/>
                </p>

                <h3 className="mt-8 mb-4">{t("about_strengths_title")}</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <TransHTML k="about_strengths_1"/>
                    </li>
                    <li>
                        <TransHTML k="about_strengths_2"/>
                    </li>
                    <li>
                        <TransHTML k="about_strengths_3"/>
                    </li>
                    <li>
                        <TransHTML k="about_strengths_4"/>
                    </li>
                    <li>
                        <TransHTML k="about_strengths_5"/>
                    </li>
                    <li>
                        <TransHTML k="about_strengths_6"/>
                    </li>
                    <li>
                        <TransHTML k="about_strengths_7"/>
                    </li>
                </ul>

                <h3 className="mt-8 mb-4">{t("about_services_title")}</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <TransHTML k="about_services_1"/>
                    </li>
                    <li>
                        <TransHTML k="about_services_2"/>
                    </li>
                    <li>
                        <TransHTML k="about_services_3"/>
                    </li>
                    <li>
                        <TransHTML k="about_services_4"/>
                    </li>
                    <li>
                        <TransHTML k="about_services_5"/>
                    </li>
                    <li>
                        <TransHTML k="about_services_6"/>
                    </li>
                    <li>
                        <TransHTML k="about_services_7"/>
                    </li>
                </ul>

                <h3 className="mt-8 mb-4">{t("about_clients_title")}</h3>
                <p>
                    <TransHTML k="about_clients"/>
                </p>

                <h3 className="mt-8 mb-4">{t("about_approach_title")}</h3>
                <p>
                    <TransHTML k="about_approach1"/>
                </p>
                <p>
                    <TransHTML k="about_approach2"/>
                </p>

                <h3 className="mt-8 mb-4">{t("about_why_title")}</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <TransHTML k="about_why_1"/>
                    </li>
                    <li>
                        <TransHTML k="about_why_2"/>
                    </li>
                    <li>
                        <TransHTML k="about_why_3"/>
                    </li>
                    <li>
                        <TransHTML k="about_why_4"/>
                    </li>
                    <li>
                        <TransHTML k="about_why_5"/>
                    </li>
                </ul>
            </div>

            {/* Скрытая русская версия — стили выровнены на будущее, оставлено hidden */}
            <div className="hidden mt-12 prose max-w-none dark:prose-invert space-y-6 prose-p:leading-relaxed">
                <p>
                    Мы — команда специалистов по обработке металла, которая превращает ваши идеи в готовые изделия. Наш
                    опыт и
                    современное оборудование позволяют выполнять широкий спектр работ — от простой резки до сложных
                    сварных
                    конструкций.
                </p>

                <p>
                    Наша компания специализируется на профессиональной обработке нержавеющей стали и металлоконструкций,
                    предлагая
                    полный цикл услуг — от раскроя листового металла до сборки готовых изделий. Мы помогаем клиентам
                    реализовать
                    как простые проекты, так и сложные конструкции, требующие высокой точности и надежности.
                </p>

                <h3 className="mt-8 mb-4">Наши сильные стороны</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Современное оборудование</strong> — используем гильотины, вальцовочные и гибочные
                        станки, ленточные
                        пилы и сварочные аппараты последнего поколения. Это позволяет выполнять операции быстро, точно и
                        с
                        минимальными потерями материала.
                    </li>
                    <li>
                        <strong>Широкий спектр услуг</strong> — резка, гибка, вальцовка, сверление, сварка, финишная
                        обработка и
                        многое другое. Все работы выполняются в одном месте.
                    </li>
                    <li>
                        <strong>Квалифицированные мастера</strong> — команда специалистов с многолетним опытом
                        гарантирует прочность
                        и аккуратность каждой детали.
                    </li>
                    <li>
                        <strong>Индивидуальный подход</strong> — работаем как с типовыми заказами, так и по вашим
                        чертежам, эскизам
                        и идеям.
                    </li>
                    <li>
                        <strong>Качество</strong> — каждый шов и изгиб проходят проверку, изделия выглядят безупречно
                        технически и
                        визуально.
                    </li>
                    <li>
                        <strong>Прозрачные цены</strong> — понятный прайс-лист без скрытых платежей.
                    </li>
                    <li>
                        <strong>Соблюдение сроков</strong> — оптимизированные процессы позволяют сдавать заказы вовремя.
                    </li>
                </ul>

                <h3 className="mt-8 mb-4">Наши услуги</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Резка металла</strong> — на гильотине, ленточной пиле и болгаркой, точная под ваши
                        размеры.
                    </li>
                    <li>
                        <strong>Гибка и вальцовка</strong> — создаём изгибы, цилиндры и конусы любой сложности.
                    </li>
                    <li>
                        <strong>Сверление и вырезка отверстий</strong> — в листовом металле, профильных и круглых
                        трубах.
                    </li>
                    <li>
                        <strong>Сварка</strong> — конструктивные, шлифованные и полированные швы, а также сварка
                        точками.
                    </li>
                    <li>
                        <strong>Изготовление соединений труб</strong> — врезка под углом 90° и 45°.
                    </li>
                    <li>
                        <strong>Финишная обработка</strong> — снятие заусенцев, шлифовка, полировка и кислотная
                        обработка.
                    </li>
                    <li>
                        <strong>Замеры на объекте</strong> — выезд специалистов в Кишинёве и за его пределами.
                    </li>
                </ul>

                <h3 className="mt-8 mb-4">Наши клиенты</h3>
                <p>
                    С нами сотрудничают частные заказчики, строительные компании, производственные предприятия и сфера
                    HoReCa. Мы
                    изготавливаем как отдельные элементы (столешницы, стойки, каркасы), так и целые конструкции для
                    объектов в
                    Кишинёве и по всей Молдове.
                </p>

                <h3 className="mt-8 mb-4">Наш подход</h3>
                <p>
                    Мы строим долгосрочные отношения с клиентами. Для нас важно, чтобы каждая выполненная работа
                    становилась
                    примером качества и профессионализма. Наша цель — не просто выполнить заказ, а предложить решение,
                    которое
                    будет служить долго и выгодно выделяться среди аналогов.
                </p>
                <p>
                    Мы ценим доверие клиентов и всегда стремимся предложить лучший результат — будь то изготовление
                    конструкций,
                    деталей или декоративных элементов. Для нас важно, чтобы каждая выполненная работа становилась
                    примером
                    качества и профессионализма.
                </p>

                <h3 className="mt-8 mb-4">Почему выбирают нас</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Точность и качество</strong> — используем профессиональное оборудование, выдерживаем
                        размеры до
                        миллиметра.
                    </li>
                    <li>
                        <strong>Комплексный подход</strong> — от подготовки материала до финальной сварки и полировки.
                    </li>
                    <li>
                        <strong>Индивидуальные решения</strong> — работаем как с типовыми заказами, так и по вашим
                        чертежам.
                    </li>
                    <li>
                        <strong>Прозрачные цены</strong> — понятный прайс-лист на все виды работ.
                    </li>
                    <li>
                        <strong>Скорость выполнения</strong> — оптимизированные процессы позволяют сдавать заказы в
                        срок.
                    </li>
                </ul>
            </div>

            {/* Скрытая румынская версия — аналогично стилизована, оставлена hidden */}
            <div className="hidden mt-12 prose max-w-none dark:prose-invert space-y-6 prose-p:leading-relaxed">
                <p>
                    Suntem o echipă de specialiști în prelucrarea metalului, care transformă ideile dvs. în produse
                    finite.
                    Experiența și <strong>echipamentele moderne</strong> ne permit să executăm o gamă largă de lucrări —
                    de la
                    tăiere simplă până la construcții sudate complexe.
                </p>
                <p>
                    Compania noastră este specializată în prelucrarea profesională a oțelului inoxidabil și a
                    construcțiilor
                    metalice, oferind un ciclu complet de servicii — de la debitare până la asamblare. Ajutăm clienții
                    să
                    realizeze atât proiecte simple, cât și construcții complexe, care necesită precizie și fiabilitate.
                </p>

                <h3 className="mt-8 mb-4">Punctele noastre forte</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Echipamente moderne</strong> — ghilotine, mașini de roluit și îndoit, fierăstraie cu
                        bandă și
                        aparate de sudură de ultimă generație. Acest lucru permite realizarea operațiunilor rapid,
                        precis și cu
                        pierderi minime de material.
                    </li>
                    <li>
                        <strong>Gamă largă de servicii</strong> — debitare, îndoire, roluire, găurire, sudură, finisare
                        și multe
                        altele. Toate lucrările se realizează într-un singur loc.
                    </li>
                    <li>
                        <strong>Meșteri calificați</strong> — echipa noastră cu mulți ani de experiență garantează
                        rezistența și
                        precizia fiecărui detaliu.
                    </li>
                    <li>
                        <strong>Abordare individuală</strong> — lucrăm atât cu comenzi tipice, cât și după schițele și
                        desenele
                        dvs.
                    </li>
                    <li>
                        <strong>Calitate</strong> — fiecare cusătură și fiecare îndoire sunt verificate, produsele arată
                        impecabil
                        atât tehnic, cât și vizual.
                    </li>
                    <li>
                        <strong>Prețuri transparente</strong> — listă de prețuri clară, fără costuri ascunse.
                    </li>
                    <li>
                        <strong>Respectarea termenelor</strong> — procese optimizate care permit livrarea comenzilor la
                        timp.
                    </li>
                </ul>

                <h3 className="mt-8 mb-4">Serviciile noastre</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Debitarea metalului</strong> — cu ghilotina, fierăstrăul cu bandă și polizorul, precis
                        conform
                        dimensiunilor dvs.
                    </li>
                    <li>
                        <strong>Îndoire și roluire</strong> — realizăm îndoiri, cilindri și conuri de orice
                        complexitate.
                    </li>
                    <li>
                        <strong>Găurire și decupare</strong> — în tablă, țevi profilate și țevi rotunde.
                    </li>
                    <li>
                        <strong>Sudură</strong> — cusături constructive, șlefuite și polisate, precum și sudură prin
                        puncte.
                    </li>
                    <li>
                        <strong>Îmbinări de țevi</strong> — decupare la unghi de 90° și 45°.
                    </li>
                    <li>
                        <strong>Finisare</strong> — îndepărtarea bavurilor, șlefuire, lustruire și tratare acidă.
                    </li>
                    <li>
                        <strong>Măsurători pe șantier</strong> — deplasarea specialiștilor în Chișinău și în afara
                        orașului.
                    </li>
                </ul>

                <h3 className="mt-8 mb-4">Clienții noștri</h3>
                <p>
                    Colaborăm cu clienți privați, companii de construcții, întreprinderi de producție și HoReCa.
                    Realizăm atât
                    elemente separate (blaturi, cadre, structuri), cât și construcții complete pentru obiective din
                    Chișinău și
                    din toată Moldova.
                </p>

                <h3 className="mt-8 mb-4">Abordarea noastră</h3>
                <p>
                    Construim relații pe termen lung cu clienții. Este important pentru noi ca fiecare lucrare realizată
                    să
                    devină un exemplu de calitate și profesionalism. Scopul nostru nu este doar să executăm o comandă,
                    ci să
                    oferim o soluție care să reziste mult timp și să se evidențieze prin valoare.
                </p>
                <p>
                    Prețuim încrederea clienților și oferim mereu cel mai bun rezultat — fie că este vorba de
                    construcții, piese
                    sau elemente decorative.
                </p>

                <h3 className="mt-8 mb-4">De ce să ne alegeți</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Precizie și calitate</strong> — folosim echipamente profesionale și respectăm
                        dimensiunile la
                        milimetru.
                    </li>
                    <li>
                        <strong>Abordare complexă</strong> — de la pregătirea materialului până la sudură și finisare.
                    </li>
                    <li>
                        <strong>Soluții individuale</strong> — lucrăm atât cu comenzi standard, cât și după desene
                        personalizate.
                    </li>
                    <li>
                        <strong>Prețuri transparente</strong> — listă clară pentru toate tipurile de lucrări.
                    </li>
                    <li>
                        <strong>Rapiditate</strong> — procese optimizate care permit predarea comenzilor la timp.
                    </li>
                </ul>
            </div>

            <p className="text-2xl font-semibold mt-18">{t("contacts_map")}:</p>
            <ImageWithFallback src={img} alt="" className="mt-10 h-full w-full object-contain"
                               fallback={placeholderImg}></ImageWithFallback>

            {/* Раздел с картой */}
            <p className="text-2xl font-semibold mt-24">{t("contacts_maps")}:</p>
            <div className="mt-8">
                <MapEmbed query="Chișinău, strada Pădurii 21/1" zoom={16}/>
            </div>
            <div className="mt-4 text-sm">
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        "Chișinău, strada Pădurii 21/1"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl px-4 py-2 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                    Открыть маршрут в Google Maps
                </a>
            </div>

            <Container>
                <div className="mt-8 mb-12 w-full flex items-end gap-3 dark:text-white text-right">
                    <p className="text-3xl w-full font-semibold text-right">{t("street_address")}, +373 60 174654</p>
                </div>
            </Container>
        </Section>
    );
}
