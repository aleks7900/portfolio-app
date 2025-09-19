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
                    <AdvantageCard titleKey="adv_quality_title" descKey="adv_quality_desc" s={ADV[0]}/>
                    <AdvantageCard titleKey="adv_custom_title" descKey="adv_custom_desc" s={ADV[1]}/>
                    <AdvantageCard titleKey="adv_consult_title" descKey="adv_consult_desc" s={ADV[2]}/>
                </div>
            </Section>
        </>
    );
}