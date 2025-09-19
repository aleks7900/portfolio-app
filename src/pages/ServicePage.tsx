import Slideshow from "../shared/Slideshow.tsx";
import {SERVICES} from "../data/data.ts";
import HeroUpServices from "./components/Hero.tsx";
import Section from "./components/Section.tsx";
import ServiceCard from "./components/ServiceCard.tsx";
import HeroServicesMirrored from "./components/HeroMirrored.tsx";
import HeroDownServices from "./components/HeroDown.tsx";

export default function ServicePage() {
    return (
        <>
            <Slideshow/>
            <HeroUpServices/>
            <HeroServicesMirrored/>
            <HeroDownServices/>
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