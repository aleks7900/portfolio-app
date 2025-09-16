import HomeSearch from "./home/HomeSearch.tsx";
import Slideshow from "../shared/Slideshow.tsx";
import PopularBlocks from "./home/PopularBlocks.tsx";
import {SERVICES} from "../data/data.ts";
import Hero from "./components/Hero.tsx";
import Section from "./components/Section.tsx";
import ServiceCard from "./components/ServiceCard.tsx";
import FeaturedCategories from "./home/FeaturedCategories.tsx";

export default function MainPage() {
    return (
        <>
            <div className="mt-12 min-h-[1rem]"></div>
            {/* 🔎 Строка поиска над слайд-шоу */}
            <HomeSearch/>
            <div className="mt-4"></div>
            {/* 🎞️ Твой слайдер (Keen-slider) */}
            <Slideshow/>
            <Hero/>
            <FeaturedCategories />
            {/* горизонтальный скролл под слайд-шоу */}
            {/*<FeaturedRow title="Популярное"/>*/}
            {/*/!* можно дополнительные ряды по категориям *!/*/}
            {/*<FeaturedRow title="Ноутбуки" category="electronics" subcategory="laptops"/>*/}
            <PopularBlocks/>
            <Section titleKey="service_title" leadKey="service_lead">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <ServiceCard titleKey="services_spa" descKey="services_spa_desc" s={SERVICES[0]}/>
                    <ServiceCard titleKey="services_opt" descKey="services_opt_desc" s={SERVICES[1]}/>
                    <ServiceCard titleKey="services_base" descKey="services_base_desc" s={SERVICES[2]}/>
                </div>
            </Section>
        </>
    );
}