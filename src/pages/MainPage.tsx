import HomeSearch from "./home/HomeSearch.tsx";
import Slideshow from "../shared/Slideshow.tsx";
import PopularBlocks from "./home/PopularBlocks.tsx";
import {ADV} from "../data/data.ts";
import Hero from "./components/Hero.tsx";
import Section from "./components/Section.tsx";
import FeaturedCategories from "./home/FeaturedCategories.tsx";
import AdvantageCard from "./components/AdvantageCard.tsx";

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
            <FeaturedCategories/>
            {/* горизонтальный скролл под слайд-шоу */}
            {/*<FeaturedRow title="Популярное"/>*/}
            {/*/!* можно дополнительные ряды по категориям *!/*/}
            {/*<FeaturedRow title="Ноутбуки" category="electronics" subcategory="laptops"/>*/}
            <PopularBlocks/>
            <Section titleKey="service_title" leadKey="service_lead">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <AdvantageCard titleKey="adv_quality_title" descKey="adv_quality_desc" s={ADV[0]}/>
                    <AdvantageCard titleKey="adv_custom_title" descKey="adv_custom_desc" s={ADV[1]}/>
                    <AdvantageCard titleKey="adv_consult_title" descKey="adv_consult_desc" s={ADV[2]}/>
                </div>
            </Section>
        </>
    );
}