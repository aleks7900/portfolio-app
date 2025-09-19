import Slideshow from "../shared/Slideshow.tsx";
import {ADV} from "../data/data.ts";
import HeroUpServices from "./components/Hero.tsx";
import Section from "./components/Section.tsx";
import HeroServicesMirrored from "./components/HeroMirrored.tsx";
import HeroDownServices from "./components/HeroDown.tsx";
import AdvantageCard from "./components/AdvantageCard.tsx";

export default function ServicePage() {
    return (
        <>
            <Slideshow/>
            <HeroUpServices/>
            <HeroServicesMirrored/>
            <HeroDownServices/>
            <Section titleKey="service_title" leadKey="service_lead">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <AdvantageCard titleKey="services_spa" descKey="services_spa_desc" s={ADV[0]}/>
                    <AdvantageCard titleKey="services_opt" descKey="services_opt_desc" s={ADV[1]}/>
                    <AdvantageCard titleKey="services_base" descKey="services_base_desc" s={ADV[2]}/>
                </div>
            </Section>
        </>
    );
}