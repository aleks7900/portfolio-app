import HomeSearch from "./home/HomeSearch.tsx";
import Slideshow from "../shared/Slideshow.tsx";
import {ADV} from "../data/data.ts";
import Hero from "./components/Hero.tsx";
import Section from "./components/Section.tsx";
import FeaturedCategories from "./home/FeaturedCategories.tsx";
import AdvantageCard from "./components/AdvantageCard.tsx";
import {ProductsBlock} from "./home/PopularBlocks.tsx";
import {useI18n} from "../shared/i18n/i18n.tsx";
import FeaturedRow from "./home/FeaturedRow.tsx";

export default function MainPage() {

    const {t} = useI18n();

    return (
        <>
            <div className="mt-12 min-h-[1rem]"></div>
            {/* 🔎 Строка поиска над слайд-шоу */}
            <HomeSearch/>
            <div className="mt-4"></div>
            {/* 🎞️ Твой слайдер (Keen-slider) */}
            <Slideshow/>
            <Hero/>

            <div className="hidden">
                "арка" = "arch"
                "бак" = "tank"
                "барбекю" = "barbecue"
                "бункер" = "hopper"
                "вешалка" = "hanger"
                "втулки" = "bushings"
                "вытяжка" = "exhaust_hood"
                "двойной шампур" = "double_skewer"
                "дымаход" = "smoke_channel"
                "дымоход" = "chimney"
                "елочка для тандыра" = "tandoor_rack"
                "елочка+крышка" = "tandoor_rack_with_lid"
                "када" = "cauldron"
                "каркас ( stati andrian )" = "frame_stati_andrian"
                "каркас для стола" = "table_frame"
                "каркас для стола 1" = "table_frame_1"
                "каркас для стола 2" = "table_frame_2"
                "кател" = "boiler"
                "колесо" = "wheel"
                "комплект изделиев" = "product_set"
                "комплект изделиье 2" = "product_set_2"
                "комплект шампуров" = "skewer_set"
                "кочерга для печки" = "stove_poker"
                "крышка для мусора" = "trash_can_lid"
                "крышка для муссора 2" = "trash_can_lid_2"
                "крышка для тандыра" = "tandoor_lid"
                "крышка колодца" = "well_lid"
                "лестница 4-х метровая" = "ladder_4m"
                "лестница 7-ми метровая" = "ladder_7m"
                "лопата для пицы" = "pizza_shovel"
                "лопатка" = "spatula"
                "лоток для золы" = "ash_tray"
                "лоток для тандыра" = "tandoor_tray"
                "мангал" = "grill"
                "мангал 1" = "grill_1"
                "мангал аргентина" = "argentinian_grill"
                "мойка" = "sink"
                "мойка 2-х секционная" = "double_sink"
                "мойка 2-х секционная 1" = "double_sink_1"
                "мойка с сушкой" = "sink_with_dryer"
                "направляющяя для стаканчиков" = "cup_holder_rail"
                "ножка для стола" = "table_leg"
                "обложка" = "cover"
                "обромление для мусорки" = "trash_bin_frame"
                "отвод д.80 мм" = "elbow_d80mm"
                "переход" = "adapter"
                "переходник для газовый ручке" = "gas_handle_adapter"
                "подставка monin" = "monin_stand"
                "подставка для весов" = "scale_stand"
                "подставка для гидроуравнивателя" = "water_level_stand"
                "подставка для параконвектомата 1" = "combi_oven_stand_1"
                "подставка для шампуров" = "skewer_stand"
                "подставка для шампуров ( паходная )" = "portable_skewer_stand"
                "подставка для шампуров+шампур" = "skewer_stand_with_skewer"
                "подстака" = "stand"
                "полотенцесушитель" = "towel_warmer"
                "полотенцесушитель 1" = "towel_warmer_1"
                "промежуточная подставка для тортов (1)" = "cake_intermediate_stand_1"
                "промежуточная подставка для тортов (2)" = "cake_intermediate_stand_2"
                "промежуточная подставка для тортов (3)" = "cake_intermediate_stand_3"
                "промежуточная подставка для тортов (4)" = "cake_intermediate_stand_4"
                "пятак" = "metal_disc"
                "решетка" = "grate"
                "решетка + шампура" = "grate_with_skewers"
                "решетка 1" = "grate_1"
                "решетка 3" = "grate_3"
                "решетка 4-х ярусная для тандыра" = "tandoor_4tier_grate"
                "решетка 4-х ярусная с нижней скавародой для тандыра" = "tandoor_4tier_grate_with_pan"
                "решетка ординарная" = "single_grate"
                "сетка" = "mesh"
                "совок" = "shovel"
                "стеллаж" = "rack"
                "стол специальный" = "special_table"
                "стул" = "chair"
                "сушка" = "dryer"
                "тележка" = "trolley"
                "тележка 1" = "trolley_1"
                "теплообменник" = "heat_exchanger"
                "токарные изделия" = "turned_parts"
                "трап" = "drain"
                "тумба с мойкой" = "sink_cabinet"
                "турка" = "cezve"
                "урна для муссора" = "trash_bin"
                "урна для муссора1" = "trash_bin_1"
                "форма пищевая" = "food_mold"
                "чан" = "vat"
                "шампур для тандыра" = "tandoor_skewer"
                "шампур для тандыра+крышка" = "tandoor_skewer_with_lid"
                "шампур с деревянной рукояткой" = "skewer_with_wooden_handle"
                "шампур с круглой рукояткой" = "skewer_with_round_handle"
                "элемент бункера" = "hopper_element"
                "ящик" = "box"
            </div>
            <div className="hidden">
                "Поручни опорные" = "Poruchni opornye"
                "Производственные мойки" = "Proizvodstvennye moyki"
                "Производственные стеллажы" = "Proizvodstvennye stellazhy"
                "Производственные столы" = "Proizvodstvennye stoly"
                "Производственые полки" = "Proizvodstvenye polki"
                "R.V.P. 1 Поручень опорный для ванны, туалета" = "R.V.P. 1 Poruchen opornyy dlya vanny, tualeta"
                "R.V.P. 10 Поручень для санузла ( ракавина, нитаз, писуар )" = "R.V.P. 10 Poruchen dlya sanuzla ( rakavina, nitaz, pisuar )"
                "R.V.P. 11 Поручень для унитаза ( стационарный)" = "R.V.P. 11 Poruchen dlya unitaza ( statsionarnyy)"
                "R.V.P. 12 Поручень для унитаза ( откидной с фиксатаром )" = "R.V.P. 12 Poruchen dlya unitaza ( otkidnoy s fiksatarom )"
                "R.V.P. 13 Поручень опорный наполный ( откидной с фиксатаром )" = "R.V.P. 13 Poruchen opornyy napolnyy ( otkidnoy s fiksatarom )"
                "R.V.P. 14 Поручень для санузла ( Ванна, унитаз, писуар)" = "R.V.P. 14 Poruchen dlya sanuzla ( Vanna, unitaz, pisuar)"
                "R.V.P. 15 Поручень для санузела ( ванна, унитаз, писуар)" = "R.V.P. 15 Poruchen dlya sanuzela ( vanna, unitaz, pisuar)"
                "R.V.P. 16 Поручень для санузела ( ванна, унитаз, писуар)" = "R.V.P. 16 Poruchen dlya sanuzela ( vanna, unitaz, pisuar)"
                "R.V.P. 17 Поручень для санузела ( ванна, унитаз, писуар)" = "R.V.P. 17 Poruchen dlya sanuzela ( vanna, unitaz, pisuar)"
                "R.V.P. 18 Поручень для писуара" = "R.V.P. 18 Poruchen dlya pisuara"
                "R.V.P. 19 Поручень настенный наполный" = "R.V.P. 19 Poruchen nastennyy napolnyy"
                "R.V.P. 2 Поручень опорный для ванны, туалета" = "R.V.P. 2 Poruchen opornyy dlya vanny, tualeta"
                "R.V.P. 20 Поручень для раковины троиной" = "R.V.P. 20 Poruchen dlya rakoviny troinoy"
                "R.V.P. 21 Поручень опорный для унитаза" = "R.V.P. 21 Poruchen opornyy dlya unitaza"
                "R.V.P. 22 Поручень стационарный П-образный" = "R.V.P. 22 Poruchen statsionarnyy P-obraznyy"
                "R.V.P. 23 Поручень для санитарно-гигиенических комнот" = "R.V.P. 23 Poruchen dlya sanitarno-gigienicheskikh komnot"
                "R.V.P. 24 Поручень опорный для раковины, 3 точки опоры" = "R.V.P. 24 Poruchen opornyy dlya rakoviny, 3 tochki opory"
                "R.V.P. 25 Углавой поручень для раковины 750х700х550" = "R.V.P. 25 Uglavoy poruchen dlya rakoviny 750kh700kh550"
                "R.V.P. 26 Поручень для углавой раковины с 4-мя точками опоры" = "R.V.P. 26 Poruchen dlya uglavoy rakoviny s 4-mya tochkami opory"
                "R.V.P. 27 Поручень для мини-раковины с 4-мя точками опоры" = "R.V.P. 27 Poruchen dlya mini-rakoviny s 4-mya tochkami opory"
                "R.V.P. 28 Поручень  для ванны 3-х опорный" = "R.V.P. 28 Poruchen  dlya vanny 3-kh opornyy"
                "R.V.P. 29 Опорное устройства с подднржкой спины с откидными поручнями" = "R.V.P. 29 Opornoe ustroystva s poddnrzhkoy spiny s otkidnymi poruchnyami"
                "R.V.P. 3 Поручень для ванны, туалета. Угловой Г-образный" = "R.V.P. 3 Poruchen dlya vanny, tualeta. Uglovoy G-obraznyy"
                "R.V.P. 30 Сидение откидное для инвалидов" = "R.V.P. 30 Sidenie otkidnoe dlya invalidov"
                "R.V.P. 31Пятаки для поручней" = "R.V.P. 31Pyataki dlya poruchney"
                "R.V.P. 32 Информация" = "R.V.P. 32 Informatsiya"
                "R.V.P. 4 Поручень для ванны, туалета. Угловой Г-образный" = "R.V.P. 4 Poruchen dlya vanny, tualeta. Uglovoy G-obraznyy"
                "R.V.P. 5 Поручень для ванны, туалета. Внутрений угол" = "R.V.P. 5 Poruchen dlya vanny, tualeta. Vnutreniy ugol"
                "R.V.P. 6 Поручень для ванны, туалета. Внешний угол" = "R.V.P. 6 Poruchen dlya vanny, tualeta. Vneshniy ugol"
                "R.V.P. 7 Поручень для мини-раковины" = "R.V.P. 7 Poruchen dlya mini-rakoviny"
                "R.V.P. 8 Поручень для раковины с креплением к стене и к полу" = "R.V.P. 8 Poruchen dlya rakoviny s krepleniem k stene i k polu"
                "R.V.P. 9 Поручень для раковины с опорой к стене" = "R.V.P. 9 Poruchen dlya rakoviny s oporoy k stene"
                "Подтоварники" = "Podtovarniki"
                "Визуализация R.V.P. 1" = "Vizualizatsiya R.V.P. 1"
                "Чертеж R.V.P. 1" = "Chertezh R.V.P. 1"
                "Визуализация R.V.P. 10" = "Vizualizatsiya R.V.P. 10"
                "Чертеж R.V.P. 10" = "Chertezh R.V.P. 10"
                "Визуализация R.V.P. 11" = "Vizualizatsiya R.V.P. 11"
                "Чертеж R.V.P. 11" = "Chertezh R.V.P. 11"
                "Визуализация R.V.P. 12" = "Vizualizatsiya R.V.P. 12"
                "Чертеж R.V.P. 12" = "Chertezh R.V.P. 12"
                "Визуализация R.V.P. 13" = "Vizualizatsiya R.V.P. 13"
                "Чертеж R.V.P. 13" = "Chertezh R.V.P. 13"
                "фейсбук" = "feysbuk"
                "Визуализация R.V.P. 14" = "Vizualizatsiya R.V.P. 14"
                "Чертеж R.V.P. 14" = "Chertezh R.V.P. 14"
                "Визуализация R.V.P. 15" = "Vizualizatsiya R.V.P. 15"
                "Чертеж R.V.P. 15" = "Chertezh R.V.P. 15"
                "Визуализация R.V.P. 16" = "Vizualizatsiya R.V.P. 16"
                "Чертеж R.V.P. 16" = "Chertezh R.V.P. 16"
                "Визуализация R.V.P. 17" = "Vizualizatsiya R.V.P. 17"
                "Чертеж R.V.P. 17" = "Chertezh R.V.P. 17"
                "Визуализация R.V.P. 18" = "Vizualizatsiya R.V.P. 18"
                "Чертеж R.V.P. 18" = "Chertezh R.V.P. 18"
                "Визуализация R.V.P. 19" = "Vizualizatsiya R.V.P. 19"
                "Чертеж R.V.P. 19" = "Chertezh R.V.P. 19"
                "Визуализация R.V.P. 2" = "Vizualizatsiya R.V.P. 2"
                "Чертеж R.V.P. 2" = "Chertezh R.V.P. 2"
                "Визуализация R.V.P. 20" = "Vizualizatsiya R.V.P. 20"
                "Чертеж R.V.P. 20" = "Chertezh R.V.P. 20"
                "Визуализация R.V.P. 21" = "Vizualizatsiya R.V.P. 21"
                "Чертеж R.V.P. 21" = "Chertezh R.V.P. 21"
                "Визуализация R.V.P. 22" = "Vizualizatsiya R.V.P. 22"
                "Чертеж R.V.P. 22" = "Chertezh R.V.P. 22"
                "Визуализация R.V.P.23" = "Vizualizatsiya R.V.P.23"
                "Чертеж R.V.P. 23" = "Chertezh R.V.P. 23"
                "Визуализация R.V.P. 24" = "Vizualizatsiya R.V.P. 24"
                "Чертеж R.V.P. 24" = "Chertezh R.V.P. 24"
                "Визуализация R.V.P. 25" = "Vizualizatsiya R.V.P. 25"
                "Чертеж R.V.P. 25" = "Chertezh R.V.P. 25"
                "Визуализация R.V.P.26" = "Vizualizatsiya R.V.P.26"
                "Чертеж R.V.P. 26" = "Chertezh R.V.P. 26"
                "Визуализация R.V.P. 27" = "Vizualizatsiya R.V.P. 27"
                "Чертеж R.V.P. 27" = "Chertezh R.V.P. 27"
                "Визуализация R.V.P. 28" = "Vizualizatsiya R.V.P. 28"
                "Чертеж R.V.P. 28" = "Chertezh R.V.P. 28"
                "Визуализация R.V.P. 3" = "Vizualizatsiya R.V.P. 3"
                "Чертеж R.V.P. 3" = "Chertezh R.V.P. 3"
                "R.V.P. 31-F1" = "R.V.P. 31-F1"
                "R.V.P. 31-F2" = "R.V.P. 31-F2"
                "R.V.P. 31-F3" = "R.V.P. 31-F3"
                "R.V.P. 31-F4" = "R.V.P. 31-F4"
                "Визуализация R.V.P. 4" = "Vizualizatsiya R.V.P. 4"
                "Чертеж R.V.P. 4" = "Chertezh R.V.P. 4"
                "Визуализация R.V.P. 5" = "Vizualizatsiya R.V.P. 5"
                "Чертеж R.V.P. 5" = "Chertezh R.V.P. 5"
                "Визуализация R.V.P. 6" = "Vizualizatsiya R.V.P. 6"
                "Чертеж R.V.P. 6" = "Chertezh R.V.P. 6"
                "Визуализация R.V.P. 7" = "Vizualizatsiya R.V.P. 7"
                "Чертеж R.V.P. 7" = "Chertezh R.V.P. 7"
                "Визуализация R.V.P. 8" = "Vizualizatsiya R.V.P. 8"
                "Чертеж R.V.P. 8" = "Chertezh R.V.P. 8"
                "R.V.P. 8" = "R.V.P. 8"
                "Визуализация R.V.P. 9" = "Vizualizatsiya R.V.P. 9"
                "Чертеж R.V.P. 9" = "Chertezh R.V.P. 9"
                "R.V.PD. 1" = "R.V.PD. 1"
                "R.V.PD. 2" = "R.V.PD. 2"
                "R.V.PD. 3 ( Усиленный )" = "R.V.PD. 3 ( Usilennyy )"
                "R.V.PD. 4 ( Усиленный )" = "R.V.PD. 4 ( Usilennyy )"
                "Визуализация R.V.PD. 1" = "Vizualizatsiya R.V.PD. 1"
                "Чертеж R.V.PD. 1" = "Chertezh R.V.PD. 1"
                "П-образный листавой профиль ( S =1.2 AISI 304 )" = "P-obraznyy listavoy profil ( S =1.2 AISI 304 )"
                "Профиль 20х20х1,2" = "Profil 20kh20kh1,2"
                "Визуализация R.V.PD. 2" = "Vizualizatsiya R.V.PD. 2"
                "Чертеж R.V.PD.2" = "Chertezh R.V.PD.2"
                "Визуализация R.V.PD. 3" = "Vizualizatsiya R.V.PD. 3"
                "Чертеж R.V.PD. 3" = "Chertezh R.V.PD. 3"
                "Визуализация R.V.PD. 4" = "Vizualizatsiya R.V.PD. 4"
                "Чертеж R.V.PD. 4" = "Chertezh R.V.PD. 4"
                "R.V.S. 1" = "R.V.S. 1"
                "R.V.S. 10" = "R.V.S. 10"
                "R.V.S. 11" = "R.V.S. 11"
                "R.V.S. 12" = "R.V.S. 12"
                "R.V.S. 13" = "R.V.S. 13"
                "R.V.S. 14" = "R.V.S. 14"
                "R.V.S. 15" = "R.V.S. 15"
                "R.V.S. 16" = "R.V.S. 16"
                "R.V.S. 17" = "R.V.S. 17"
                "R.V.S. 18" = "R.V.S. 18"
                "R.V.S. 19" = "R.V.S. 19"
                "R.V.S. 2" = "R.V.S. 2"
                "R.V.S. 20" = "R.V.S. 20"
                "R.V.S. 21" = "R.V.S. 21"
                "R.V.S. 22" = "R.V.S. 22"
                "R.V.S. 23" = "R.V.S. 23"
                "R.V.S. 24" = "R.V.S. 24"
                "R.V.S. 25" = "R.V.S. 25"
                "R.V.S. 26" = "R.V.S. 26"
                "R.V.S. 27" = "R.V.S. 27"
                "R.V.S. 3" = "R.V.S. 3"
                "R.V.S. 4" = "R.V.S. 4"
                "R.V.S. 5" = "R.V.S. 5"
                "R.V.S. 6" = "R.V.S. 6"
                "R.V.S. 7" = "R.V.S. 7"
                "R.V.S. 8" = "R.V.S. 8"
                "R.V.S. 9" = "R.V.S. 9"
                "Визуализаия R.V.S. 1" = "Vizualizaiya R.V.S. 1"
                "Чертеж R.V.S. 1" = "Chertezh R.V.S. 1"
                "Чертеж R.V.S 1 ( сварные углы )" = "Chertezh R.V.S 1 ( svarnye ugly )"
                "Визуализация R.V.S 10" = "Vizualizatsiya R.V.S 10"
                "Чертеж R.V.S 10" = "Chertezh R.V.S 10"
                "Чертеж R.V.S 10 ( сварные углы )" = "Chertezh R.V.S 10 ( svarnye ugly )"
                "Визуализация R.V.S 11" = "Vizualizatsiya R.V.S 11"
                "Чертеж R.V.S 11" = "Chertezh R.V.S 11"
                "Чертеж R.V.S 11 (Сварные углы )" = "Chertezh R.V.S 11 (Svarnye ugly )"
                "Визуализация R.V.S 12" = "Vizualizatsiya R.V.S 12"
                "Чертеж R.V.S 12" = "Chertezh R.V.S 12"
                "Чертеж R.V.S. 12" = "Chertezh R.V.S. 12"
                "Визуализция R.V.S 13" = "Vizualiztsiya R.V.S 13"
                "Чертеж R.V.S 13" = "Chertezh R.V.S 13"
                "Визуализация R.V.S. 14" = "Vizualizatsiya R.V.S. 14"
                "Чертеж R.V.S. 14" = "Chertezh R.V.S. 14"
                "Визуализация R.V.S. 15" = "Vizualizatsiya R.V.S. 15"
                "Чертеж R.V.S. 15" = "Chertezh R.V.S. 15"
                "Визуализация R.V.S. 16" = "Vizualizatsiya R.V.S. 16"
                "Чертеж R.V.S. 16" = "Chertezh R.V.S. 16"
                "Визуализация R.V.S. 17" = "Vizualizatsiya R.V.S. 17"
                "Чертеж R.V.S. 17" = "Chertezh R.V.S. 17"
                "Визуализация R.V.S. 18" = "Vizualizatsiya R.V.S. 18"
                "Чертеж R.V.S. 18" = "Chertezh R.V.S. 18"
                "Визуализация R.V.S. 19" = "Vizualizatsiya R.V.S. 19"
                "Чертеж R.V.S. 19" = "Chertezh R.V.S. 19"
                "Визуализация R.V.S. 2" = "Vizualizatsiya R.V.S. 2"
                "Чертеж R.V.S. 2" = "Chertezh R.V.S. 2"
                "R.V.S 2 (с  сварными углами)" = "R.V.S 2 (s  svarnymi uglami)"
                "Визуализация R.V.S. 20" = "Vizualizatsiya R.V.S. 20"
                "Чертеж R.V.S. 20" = "Chertezh R.V.S. 20"
                "Визуализация R.V.S. 21" = "Vizualizatsiya R.V.S. 21"
                "Чертеж R.V.S. 21" = "Chertezh R.V.S. 21"
                "Визуализация R.V.S. 22" = "Vizualizatsiya R.V.S. 22"
                "Чертеж R.V.S. 22" = "Chertezh R.V.S. 22"
                "Чертеж R.V.S 22 ( сварные углы )" = "Chertezh R.V.S 22 ( svarnye ugly )"
                "Визуализация R.V.S. 23" = "Vizualizatsiya R.V.S. 23"
                "Чертеж R.V.S. 23" = "Chertezh R.V.S. 23"
                "Чертеж R.V.S 23 ( сварные углы )" = "Chertezh R.V.S 23 ( svarnye ugly )"
                "Визуализация R.V.S. 24" = "Vizualizatsiya R.V.S. 24"
                "Чертеж R.V.S. 24" = "Chertezh R.V.S. 24"
                "Чертеж R.V.S 24 ( сварные углы )" = "Chertezh R.V.S 24 ( svarnye ugly )"
                "Визуализация R.V.S. 25" = "Vizualizatsiya R.V.S. 25"
                "Чертеж R.V.S. 25" = "Chertezh R.V.S. 25"
                "Визуализация R.V.S. 26" = "Vizualizatsiya R.V.S. 26"
                "Чертеж R.V.S. 26" = "Chertezh R.V.S. 26"
                "Визуализация R.V.S. 27" = "Vizualizatsiya R.V.S. 27"
                "Чертеж R.V.S. 27" = "Chertezh R.V.S. 27"
                "Визуализация R.V.S. 3" = "Vizualizatsiya R.V.S. 3"
                "Чртеж R.V.S. 3" = "Chrtezh R.V.S. 3"
                "Чертеж R.V.S 3 ( сварные углы )" = "Chertezh R.V.S 3 ( svarnye ugly )"
                "Визуализация R.V.S 4" = "Vizualizatsiya R.V.S 4"
                "Чертеж R.V.S 4" = "Chertezh R.V.S 4"
                "Визуализация R.V.S 5" = "Vizualizatsiya R.V.S 5"
                "Чертеж R.V.S 5" = "Chertezh R.V.S 5"
                "Визуализация R.V.S 6" = "Vizualizatsiya R.V.S 6"
                "Чертеж R.V.S 6" = "Chertezh R.V.S 6"
                "Визуализация R.V.S7" = "Vizualizatsiya R.V.S7"
                "Чертеж R.V.S 7" = "Chertezh R.V.S 7"
                "Визуализация R.V.S 8" = "Vizualizatsiya R.V.S 8"
                "Чертеж R.V.S 8" = "Chertezh R.V.S 8"
                "Визуализация R.V.S 9" = "Vizualizatsiya R.V.S 9"
                "Чертеж R.V.S 9" = "Chertezh R.V.S 9"
                "R.V.ST. 1" = "R.V.ST. 1"
                "R.V.ST. 10 ( Усиленный )" = "R.V.ST. 10 ( Usilennyy )"
                "R.V.ST. 11 ( Усиленный )" = "R.V.ST. 11 ( Usilennyy )"
                "R.V.ST. 12  ( Усиленный )" = "R.V.ST. 12  ( Usilennyy )"
                "R.V.ST. 13 ( Усиленный )" = "R.V.ST. 13 ( Usilennyy )"
                "R.V.ST. 14 ( Усиленный )" = "R.V.ST. 14 ( Usilennyy )"
                "R.V.ST. 15 ( Усиленный )" = "R.V.ST. 15 ( Usilennyy )"
                "R.V.ST. 16 ( Усиленный )" = "R.V.ST. 16 ( Usilennyy )"
                "R.V.ST. 17 ( Усиленный )" = "R.V.ST. 17 ( Usilennyy )"
                "R.V.ST. 18 ( Усиленный )" = "R.V.ST. 18 ( Usilennyy )"
                "R.V.ST. 2" = "R.V.ST. 2"
                "R.V.ST. 3" = "R.V.ST. 3"
                "R.V.ST. 4" = "R.V.ST. 4"
                "R.V.ST. 5" = "R.V.ST. 5"
                "R.V.ST. 6" = "R.V.ST. 6"
                "R.V.ST. 7" = "R.V.ST. 7"
                "R.V.ST. 8" = "R.V.ST. 8"
                "R.V.ST. 9" = "R.V.ST. 9"
                "Визуализация R.V.ST. 1" = "Vizualizatsiya R.V.ST. 1"
                "Чертеж R.V.ST. 1" = "Chertezh R.V.ST. 1"
                "Визуализация R.V.ST. 10" = "Vizualizatsiya R.V.ST. 10"
                "Чертеж R.V.ST. 10" = "Chertezh R.V.ST. 10"
                "Визуализация R.V.ST. 11" = "Vizualizatsiya R.V.ST. 11"
                "ЧертежR.V.ST. 11" = "ChertezhR.V.ST. 11"
                "Визуализация R.V.ST. 12" = "Vizualizatsiya R.V.ST. 12"
                "Чертеж R.V.ST. 12" = "Chertezh R.V.ST. 12"
                "П-образный листавой профиль S=1.2 AISI" = "P-obraznyy listavoy profil S=1.2 AISI"
                "Визуализация R.V.ST. 13" = "Vizualizatsiya R.V.ST. 13"
                "Чертеж R.V.ST. 13" = "Chertezh R.V.ST. 13"
                "Визуализация R.V.ST. 14" = "Vizualizatsiya R.V.ST. 14"
                "Чертеж R.V.ST. 14" = "Chertezh R.V.ST. 14"
                "Визуализация R.V.ST. 15" = "Vizualizatsiya R.V.ST. 15"
                "Чертеж R.V.ST. 15" = "Chertezh R.V.ST. 15"
                "Визуализация R.V.ST. 16" = "Vizualizatsiya R.V.ST. 16"
                "Чертеж R.V.ST. 16" = "Chertezh R.V.ST. 16"
                "Визуализация R.V.ST. 17" = "Vizualizatsiya R.V.ST. 17"
                "Чертеж R.V.ST. 17" = "Chertezh R.V.ST. 17"
                "Визуализация R.V.ST. 18" = "Vizualizatsiya R.V.ST. 18"
                "Чертеж R.V.ST. 18" = "Chertezh R.V.ST. 18"
                "Визуализация R.V.ST. 2" = "Vizualizatsiya R.V.ST. 2"
                "Чертеж R.V.ST. 2" = "Chertezh R.V.ST. 2"
                "Визуализация R.V.ST. 3" = "Vizualizatsiya R.V.ST. 3"
                "Чертеж R.V.ST. 3" = "Chertezh R.V.ST. 3"
                "Визуализация R.V.ST. 4" = "Vizualizatsiya R.V.ST. 4"
                "Чертеж R.V.ST. 4" = "Chertezh R.V.ST. 4"
                "Визуализация R.V.ST. 5" = "Vizualizatsiya R.V.ST. 5"
                "Чертеж R.V.ST. 5" = "Chertezh R.V.ST. 5"
                "Визуализация R.V.ST. 6" = "Vizualizatsiya R.V.ST. 6"
                "Чертеж R.V.ST. 6" = "Chertezh R.V.ST. 6"
                "Визуализация R.V.ST. 7" = "Vizualizatsiya R.V.ST. 7"
                "Чертеж R.V.ST. 7" = "Chertezh R.V.ST. 7"
                "Визуализация R.V.ST. 8" = "Vizualizatsiya R.V.ST. 8"
                "Чертеж R.V.ST. 8" = "Chertezh R.V.ST. 8"
                "Визуализация R.V.ST. 9" = "Vizualizatsiya R.V.ST. 9"
                "Чертеж R.V.ST. 9" = "Chertezh R.V.ST. 9"
                "1. Столы Каталог" = "1. Stoly Katalog"
                "2. Столы с раздвижными ясчиками Каталог" = "2. Stoly s razdvizhnymi yaschikami Katalog"
                "3. Стол-тумба на заказа" = "3. Stol-tumba na zakaza"
                "Комплексные решения ( Барная станция )" = "Kompleksnye resheniya ( Barnaya stantsiya )"
                "Разное" = "Raznoe"
                "R.V.1" = "R.V.1"
                "R.V.10" = "R.V.10"
                "R.V.11" = "R.V.11"
                "R.V.12" = "R.V.12"
                "R.V.13" = "R.V.13"
                "R.V.14" = "R.V.14"
                "R.V.15" = "R.V.15"
                "R.V.16" = "R.V.16"
                "R.V.17" = "R.V.17"
                "R.V.18" = "R.V.18"
                "R.V.19" = "R.V.19"
                "R.V.2" = "R.V.2"
                "R.V.20" = "R.V.20"
                "R.V.21" = "R.V.21"
                "R.V.22" = "R.V.22"
                "R.V.23" = "R.V.23"
                "R.V.24" = "R.V.24"
                "R.V.25" = "R.V.25"
                "R.V.26" = "R.V.26"
                "R.V.27" = "R.V.27"
                "R.V.28" = "R.V.28"
                "R.V.29" = "R.V.29"
                "R.V.3" = "R.V.3"
                "R.V.30" = "R.V.30"
                "R.V.31" = "R.V.31"
                "R.V.32" = "R.V.32"
                "R.V.4" = "R.V.4"
                "R.V.5" = "R.V.5"
                "R.V.6" = "R.V.6"
                "R.V.7" = "R.V.7"
                "R.V.8" = "R.V.8"
                "R.V.9" = "R.V.9"
                "Стандартные операцие ( расценки ) для изготовления стола" = "Standartnye operatsie ( rastsenki ) dlya izgotovleniya stola"
                "Визуализация R.V.1" = "Vizualizatsiya R.V.1"
                "Визуализация R.V.1 + R.V.31" = "Vizualizatsiya R.V.1 + R.V.31"
                "Визуализация R.V.1+R.V.32" = "Vizualizatsiya R.V.1+R.V.32"
                "Праис на операций для изготовления данного типа стола" = "Prais na operatsiy dlya izgotovleniya dannogo tipa stola"
                "Чертеж R.V.1" = "Chertezh R.V.1"
                "Боковое ребро жесткости" = "Bokovoe rebro zhestkosti"
                "Передняя + задняя панель" = "Perednyaya + zadnyaya panel"
                "Ребро жесткости для столешницы" = "Rebro zhestkosti dlya stoleshnitsy"
                "Визуализация R.V.10" = "Vizualizatsiya R.V.10"
                "Визуализация R.V.10+R.V.31" = "Vizualizatsiya R.V.10+R.V.31"
                "Визуализация R.V.10+R.V.32" = "Vizualizatsiya R.V.10+R.V.32"
                "Чертеж R.V.10" = "Chertezh R.V.10"
                "Визуализация R.V.11" = "Vizualizatsiya R.V.11"
                "Визуализация R.V.11+R.V.31" = "Vizualizatsiya R.V.11+R.V.31"
                "Визуализация R.V.11+R.V.32" = "Vizualizatsiya R.V.11+R.V.32"
                "Чертеж R.V.11" = "Chertezh R.V.11"
                "Визуализация R.V.12" = "Vizualizatsiya R.V.12"
                "Визуализация R.V.12+R.V.31" = "Vizualizatsiya R.V.12+R.V.31"
                "Визуализация R.V.12+R.V.32" = "Vizualizatsiya R.V.12+R.V.32"
                "Чертеж  R.V.12" = "Chertezh  R.V.12"
                "Визуализация R.V.13" = "Vizualizatsiya R.V.13"
                "Визуализация R.V.13+R.V.31" = "Vizualizatsiya R.V.13+R.V.31"
                "Визуализация R.V.13+R.V.32" = "Vizualizatsiya R.V.13+R.V.32"
                "Чертеж R.V.13" = "Chertezh R.V.13"
                "Визуализация R.V.14" = "Vizualizatsiya R.V.14"
                "Визуализация R.V.14+R.V.31" = "Vizualizatsiya R.V.14+R.V.31"
                "Визуализация R.V.14+R.V.32" = "Vizualizatsiya R.V.14+R.V.32"
                "Чертеж R.V.14" = "Chertezh R.V.14"
                "Визуализация R.V.15" = "Vizualizatsiya R.V.15"
                "Визуализация R.V.15+R.V.31" = "Vizualizatsiya R.V.15+R.V.31"
                "Визуализация R.V.15+R.V.32" = "Vizualizatsiya R.V.15+R.V.32"
                "Чертеж R.V.15" = "Chertezh R.V.15"
                "Визуализация R.V.16" = "Vizualizatsiya R.V.16"
                "Визуализация R.V.16+R.V.31" = "Vizualizatsiya R.V.16+R.V.31"
                "Визуализация R.V.16+R.V.32" = "Vizualizatsiya R.V.16+R.V.32"
                "Чертеж R.V.16" = "Chertezh R.V.16"
                "Визуализация R.V.17" = "Vizualizatsiya R.V.17"
                "Визуализация R.V.17+R.V.31" = "Vizualizatsiya R.V.17+R.V.31"
                "Визуализация R.V.17+R.V.32" = "Vizualizatsiya R.V.17+R.V.32"
                "Чертеж R.V.17" = "Chertezh R.V.17"
                "Визуализация R.V.18" = "Vizualizatsiya R.V.18"
                "Визуализация R.V.18+R.V.31" = "Vizualizatsiya R.V.18+R.V.31"
                "Визуализация R.V.18+R.V.32" = "Vizualizatsiya R.V.18+R.V.32"
                "Чертеж R.V.18" = "Chertezh R.V.18"
                "Визуализация R.V.19" = "Vizualizatsiya R.V.19"
                "Визуализация R.V.19+R.V.31" = "Vizualizatsiya R.V.19+R.V.31"
                "Визуализация R.V.19+R.V.32" = "Vizualizatsiya R.V.19+R.V.32"
                "Чертеж R.V.19" = "Chertezh R.V.19"
                "Визуализация R.V.2" = "Vizualizatsiya R.V.2"
                "Визуализация R.V.2+R.V.31" = "Vizualizatsiya R.V.2+R.V.31"
                "Визуализация R.V.2+R.V.32" = "Vizualizatsiya R.V.2+R.V.32"
                "Чертеж" = "Chertezh"
                "Визуализация R.V.20" = "Vizualizatsiya R.V.20"
                "Визуализация R.V.20+R.V.31" = "Vizualizatsiya R.V.20+R.V.31"
                "Визуализация R.V.20+R.V.32" = "Vizualizatsiya R.V.20+R.V.32"
                "Чертеж  R.V.20" = "Chertezh  R.V.20"
                "Визуализация R.V.21" = "Vizualizatsiya R.V.21"
                "Визуализация R.V.21+R.V.31" = "Vizualizatsiya R.V.21+R.V.31"
                "Визуализация R.V.21+R.V.32" = "Vizualizatsiya R.V.21+R.V.32"
                "Чертеж R.V.21" = "Chertezh R.V.21"
                "Визуализация R.V.22" = "Vizualizatsiya R.V.22"
                "Визуализация R.V.22+R.V.31" = "Vizualizatsiya R.V.22+R.V.31"
                "Визуализация R.V.22+R.V.32" = "Vizualizatsiya R.V.22+R.V.32"
                "Чертеж R.V.22" = "Chertezh R.V.22"
                "Визуализация R.V.23" = "Vizualizatsiya R.V.23"
                "Визуализация R.V.23+R.V.31" = "Vizualizatsiya R.V.23+R.V.31"
                "Визуализация R.V.23+R.V.32" = "Vizualizatsiya R.V.23+R.V.32"
                "Чертеж R.V.23" = "Chertezh R.V.23"
                "Визуализация R.V.24" = "Vizualizatsiya R.V.24"
                "Визуализация R.V.24+R.V.31" = "Vizualizatsiya R.V.24+R.V.31"
                "Визуализация R.V.24+R.V.32" = "Vizualizatsiya R.V.24+R.V.32"
                "Чертеж R.V.24" = "Chertezh R.V.24"
                "Визуализация R.V.25+R.V.31" = "Vizualizatsiya R.V.25+R.V.31"
                "Визуализация R.V.25+R.V.32" = "Vizualizatsiya R.V.25+R.V.32"
                "Визуализаця R.V.25" = "Vizualizatsya R.V.25"
                "Чертеж R.V.25" = "Chertezh R.V.25"
                "Визуализация R.V.26" = "Vizualizatsiya R.V.26"
                "Визуализация R.V.26+R.V.31" = "Vizualizatsiya R.V.26+R.V.31"
                "Визуализация R.V.26+R.V.32" = "Vizualizatsiya R.V.26+R.V.32"
                "Чертеж R.V.26" = "Chertezh R.V.26"
                "Визуализация R.V.27" = "Vizualizatsiya R.V.27"
                "Визуализация R.V.27+R.V.31" = "Vizualizatsiya R.V.27+R.V.31"
                "Визуализация R.V.27+R.V.32" = "Vizualizatsiya R.V.27+R.V.32"
                "Чертеж R.V.27" = "Chertezh R.V.27"
                "Визуализация R.V.28" = "Vizualizatsiya R.V.28"
                "Визуализация R.V.28+R.V.31" = "Vizualizatsiya R.V.28+R.V.31"
                "Визуализация R.V.28+R.V.32" = "Vizualizatsiya R.V.28+R.V.32"
                "Чертеж R.V.28" = "Chertezh R.V.28"
                "Визуализация R.V.29" = "Vizualizatsiya R.V.29"
                "Визуализация R.V.29+R.V.31" = "Vizualizatsiya R.V.29+R.V.31"
                "Визуализация R.V.29+R.V.32" = "Vizualizatsiya R.V.29+R.V.32"
                "Чертеж R.V.29" = "Chertezh R.V.29"
                "Визуализация R.V.3" = "Vizualizatsiya R.V.3"
                "Визуализация R.V.3+R.V.31" = "Vizualizatsiya R.V.3+R.V.31"
                "Визуализация R.V.3+R.V.32" = "Vizualizatsiya R.V.3+R.V.32"
                "Чертеж R.V.3" = "Chertezh R.V.3"
                "Решетка снизу" = "Reshetka snizu"
                "Визуализация R.V.30+R.V.31" = "Vizualizatsiya R.V.30+R.V.31"
                "Визуализация R.V.30+R.V.32" = "Vizualizatsiya R.V.30+R.V.32"
                "Визуализвция R.V.30" = "Vizualizvtsiya R.V.30"
                "Чертеж  R.V.30" = "Chertezh  R.V.30"
                "Визуализация R.V.31" = "Vizualizatsiya R.V.31"
                "Чертеж R.V.31 ( Дополнительная полка сверху)" = "Chertezh R.V.31 ( Dopolnitelnaya polka sverkhu)"
                "Визуализация R.V.32" = "Vizualizatsiya R.V.32"
                "Чертеж R.V.32 (Дополнительная полка на стол )" = "Chertezh R.V.32 (Dopolnitelnaya polka na stol )"
                "Визуализация R.V.4" = "Vizualizatsiya R.V.4"
                "Визуализация R.V.4+R.V.31" = "Vizualizatsiya R.V.4+R.V.31"
                "Визуализация R.V.4+R.V.32" = "Vizualizatsiya R.V.4+R.V.32"
                "Чертеж R.V.4" = "Chertezh R.V.4"
                "Визуализация R.V.5" = "Vizualizatsiya R.V.5"
                "Визуализация R.V.5+R.V.31" = "Vizualizatsiya R.V.5+R.V.31"
                "Визуализация R.V.5+R.V.32" = "Vizualizatsiya R.V.5+R.V.32"
                "Чертеж R.V.5" = "Chertezh R.V.5"
                "Визуализация R.V.6" = "Vizualizatsiya R.V.6"
                "Визуализация R.V.6+R.V.31" = "Vizualizatsiya R.V.6+R.V.31"
                "Визуализация R.V.6+R.V.32" = "Vizualizatsiya R.V.6+R.V.32"
                "Чертеж R.V.6" = "Chertezh R.V.6"
                "Визуализация R.V.7" = "Vizualizatsiya R.V.7"
                "Визуализация R.V.7+R.V.31" = "Vizualizatsiya R.V.7+R.V.31"
                "Визуализация R.V.7+R.V.32" = "Vizualizatsiya R.V.7+R.V.32"
                "Чертеж R.V.7" = "Chertezh R.V.7"
                "Визуализация R.V.8" = "Vizualizatsiya R.V.8"
                "Визуализация R.V.8+R.V.31" = "Vizualizatsiya R.V.8+R.V.31"
                "Визуализация R.V.8+R.V.32" = "Vizualizatsiya R.V.8+R.V.32"
                "Чертеж R.V.8" = "Chertezh R.V.8"
                "Визуализация R.V.9" = "Vizualizatsiya R.V.9"
                "Визуализация R.V.9+R.V.31" = "Vizualizatsiya R.V.9+R.V.31"
                "Визуализация R.V.9+R.V.32" = "Vizualizatsiya R.V.9+R.V.32"
                "Чертеж R.V.9" = "Chertezh R.V.9"
                "R.V.T.1" = "R.V.T.1"
                "R.V.T.10" = "R.V.T.10"
                "R.V.T.11" = "R.V.T.11"
                "R.V.T.12" = "R.V.T.12"
                "R.V.T.13" = "R.V.T.13"
                "R.V.T.14" = "R.V.T.14"
                "R.V.T.15" = "R.V.T.15"
                "R.V.T.16" = "R.V.T.16"
                "R.V.T.17" = "R.V.T.17"
                "R.V.T.18" = "R.V.T.18"
                "R.V.T.2" = "R.V.T.2"
                "R.V.T.3" = "R.V.T.3"
                "R.V.T.4" = "R.V.T.4"
                "R.V.T.5" = "R.V.T.5"
                "R.V.T.6" = "R.V.T.6"
                "R.V.T.7" = "R.V.T.7"
                "R.V.T.8" = "R.V.T.8"
                "R.V.T.9" = "R.V.T.9"
                "Визуализация R.V.T.1" = "Vizualizatsiya R.V.T.1"
                "Чертеж R.V.T.1" = "Chertezh R.V.T.1"
                "Визуализация R.V.T.10" = "Vizualizatsiya R.V.T.10"
                "Чертеж R.V.T.10" = "Chertezh R.V.T.10"
                "Визуализация R.V.T.11" = "Vizualizatsiya R.V.T.11"
                "Чертеж R.V.T.11" = "Chertezh R.V.T.11"
                "Визуализация R.V.T.12" = "Vizualizatsiya R.V.T.12"
                "Чертеж R.V.T.12" = "Chertezh R.V.T.12"
                "Визуализация R.V.T.13" = "Vizualizatsiya R.V.T.13"
                "Чертеж R.V.T.13" = "Chertezh R.V.T.13"
                "Визуализация R.V.T.14" = "Vizualizatsiya R.V.T.14"
                "Чертеж R.V.T.14" = "Chertezh R.V.T.14"
                "Визуализация R.V.T. 15" = "Vizualizatsiya R.V.T. 15"
                "Чертеж R.V.T.15" = "Chertezh R.V.T.15"
                "Визуализация R.V.T.16" = "Vizualizatsiya R.V.T.16"
                "Чертеж R.V.T.16" = "Chertezh R.V.T.16"
                "Визуализация R.V.T.17" = "Vizualizatsiya R.V.T.17"
                "Чертеж R.V.T.17" = "Chertezh R.V.T.17"
                "Визуализация R.V.T.18" = "Vizualizatsiya R.V.T.18"
                "Чертеж R.V.T.18" = "Chertezh R.V.T.18"
                "Визуализация R.V.T.2" = "Vizualizatsiya R.V.T.2"
                "Чертеж R.V.T.2" = "Chertezh R.V.T.2"
                "Визуализация R.V.T.3" = "Vizualizatsiya R.V.T.3"
                "Чертеж R.V.T.3" = "Chertezh R.V.T.3"
                "Визуализация R.V.T.4" = "Vizualizatsiya R.V.T.4"
                "Чертеж R.V.T.4" = "Chertezh R.V.T.4"
                "Визуализация R.V.T.5" = "Vizualizatsiya R.V.T.5"
                "Чертеж R.V.T.5" = "Chertezh R.V.T.5"
                "Визуализация R.V.T.6" = "Vizualizatsiya R.V.T.6"
                "Чертеж R.V.T.6" = "Chertezh R.V.T.6"
                "Визуализация R.V.T.7" = "Vizualizatsiya R.V.T.7"
                "Чертеж R.V.T.7" = "Chertezh R.V.T.7"
                "Визуализация R.V.T.8" = "Vizualizatsiya R.V.T.8"
                "Чертеж R.V.T.8" = "Chertezh R.V.T.8"
                "Визуализация R.V.T.9" = "Vizualizatsiya R.V.T.9"
                "Чертеж R.V.T.9" = "Chertezh R.V.T.9"
                "1" = "1"
                "2" = "2"
                "3" = "3"
                "4" = "4"
                "5" = "5"
                "6" = "6"
                "7" = "7"
                "8" = "8"
                "Визуализация Стол-тумба 1" = "Vizualizatsiya Stol-tumba 1"
                "Визуализация стол-тумба 2" = "Vizualizatsiya stol-tumba 2"
                "Визуализация стол-тумба 3" = "Vizualizatsiya stol-tumba 3"
                "Визуализация стол-тумба 4" = "Vizualizatsiya stol-tumba 4"
                "Чертеж стол-тумба 4" = "Chertezh stol-tumba 4"
                "Визуализация стол-тумба 5" = "Vizualizatsiya stol-tumba 5"
                "Чертеж стол-тумба 5" = "Chertezh stol-tumba 5"
                "Визуализация стол-тумба 6" = "Vizualizatsiya stol-tumba 6"
                "Чертеж стол-тумба 6" = "Chertezh stol-tumba 6"
                "Визуализация стол-тумба 7" = "Vizualizatsiya stol-tumba 7"
                "Визуализация стол-тумба 8" = "Vizualizatsiya stol-tumba 8"
                "Визуализация Барная станция 1" = "Vizualizatsiya Barnaya stantsiya 1"
                "Чертеж КР-Барная станция 1" = "Chertezh KR-Barnaya stantsiya 1"
                "taziblues" = "taziblues"
                "стол 2" = "stol 2"
                "Визуализация Брная станция в комплекте 2" = "Vizualizatsiya Brnaya stantsiya v komplekte 2"
                "Информация" = "Informatsiya"
                "Чертеж барная станция в комплекте 2" = "Chertezh barnaya stantsiya v komplekte 2"
                "Стол пройзводственный" = "Stol proyzvodstvennyy"
                "Стол пройзводственный с 2 полками" = "Stol proyzvodstvennyy s 2 polkami"
                "Стол пройзводственный с полкой" = "Stol proyzvodstvennyy s polkoy"
                "стол с выдвижным ящиком" = "stol s vydvizhnym yashchikom"
                "стол с выдвижным ящиком и полкой" = "stol s vydvizhnym yashchikom i polkoy"
                "Стол технологический" = "Stol tekhnologicheskiy"
                "Шкаф" = "Shkaf"
                "R.V.PL. 1" = "R.V.PL. 1"
                "R.V.PL. 2" = "R.V.PL. 2"
                "R.V.PL. 3" = "R.V.PL. 3"
                "R.V.PL. 4" = "R.V.PL. 4"
                "R.V.PL. 5" = "R.V.PL. 5"
                "R.V.PL. 6" = "R.V.PL. 6"
                "R.V.PL. 7" = "R.V.PL. 7"
                "R.V.PL. 8" = "R.V.PL. 8"
                "Ребро жесткость ( H = 30 мм ) Ласточка" = "Rebro zhestkost ( H = 30 mm ) Lastochka"
                "Визуализация R.V.PL. 1" = "Vizualizatsiya R.V.PL. 1"
                "Информация R.V.PL. 1" = "Informatsiya R.V.PL. 1"
                "Чертеж R.V.PL. 1" = "Chertezh R.V.PL. 1"
                "Без сварке" = "Bez svarke"
                "Сварной вариант" = "Svarnoy variant"
                "Estante Mensula Sup_ Upper bracket shelf on Behance_files" = "Estante Mensula Sup_ Upper bracket shelf on Behance_files"
                "Чертеж R.V.PL. 1 ( Без сварке )" = "Chertezh R.V.PL. 1 ( Bez svarke )"
                "Чертеж R.V.PL. 1 ( Сварной вариант )" = "Chertezh R.V.PL. 1 ( Svarnoy variant )"
                "Чертеж R.V.PL. 1 ( Ширина 200 мм )" = "Chertezh R.V.PL. 1 ( Shirina 200 mm )"
                "Чертеж R.V.PL. 1 ( Ширина 250 мм )" = "Chertezh R.V.PL. 1 ( Shirina 250 mm )"
                "Чертеж R.V.PL. 1 ( Ширина 300 мм )" = "Chertezh R.V.PL. 1 ( Shirina 300 mm )"
                "Чертеж R.V.PL. 1 ( Ширина 350 мм )" = "Chertezh R.V.PL. 1 ( Shirina 350 mm )"
                "Визуализация R.V.PL. 2" = "Vizualizatsiya R.V.PL. 2"
                "Чертеж R.V.PL. 2" = "Chertezh R.V.PL. 2"
                "R.V.PL. 2 ( S = 1,2 AISI 304 )" = "R.V.PL. 2 ( S = 1,2 AISI 304 )"
                "Визуализация R.V.PL. 3" = "Vizualizatsiya R.V.PL. 3"
                "Чертеж R.V.PL. 3" = "Chertezh R.V.PL. 3"
                "Визуализация R.V.PL.4" = "Vizualizatsiya R.V.PL.4"
                "Чертеж R.V.PL.4" = "Chertezh R.V.PL.4"
                "Визуализация R.V.PL. 5" = "Vizualizatsiya R.V.PL. 5"
                "Чертеж R.V.PL. 5" = "Chertezh R.V.PL. 5"
                "Визуализация R.V.PL. 6" = "Vizualizatsiya R.V.PL. 6"
                "Чертеж R.V.PL. 6" = "Chertezh R.V.PL. 6"
                "Визуализация R.V.PL. 7" = "Vizualizatsiya R.V.PL. 7"
                "Чертеж R.V.PL. 7" = "Chertezh R.V.PL. 7"
                "Визуализация R.V.PL. 8" = "Vizualizatsiya R.V.PL. 8"
                "Чертеж R.V.PL. 8" = "Chertezh R.V.PL. 8"
            </div>

            <FeaturedCategories/>

            <div className="hidden">
                cat_custom_orders: "Изделия на заказ",
                sub_balustrade_perila: "Балюстрады, перила",
                sub_boxes: "Боксы",
                sub_cafe: "Кафе",
                sub_carcase: "Каркасы",
                sub_caruciors: "Тележки",
                sub_cauldrons: "Котлы",
                sub_decor: "Декор",
                sub_furnitura: "Фурнитура",
                sub_ladder: "Лестницы",
                sub_mangal_and_grill: "Мангалы и гриль",
                sub_masa: "Столы",
                sub_melochi: "Мелкие детали",
                sub_mobila: "Мебель",
                sub_other: "Прочее",
                sub_podstavki: "Подставки",
                sub_prom: "Пром изделия",
                sub_reshetki: "Решётки",
                sub_sckaph: "Шкафы",
                sub_sinks: "Мойки",
                sub_tandoors: "Тандыры",
                sub_tanks: "Баки",
                sub_tavas: "Тавас",
                sub_towel: "Для душа",
                sub_trash_bins: "Корзины",
                sub_wheels: "Колеса",

                cat_standard_products: "Стандартная продукция",
                sub_0_podtovarniki: "Подтоварники",
                sub_1_proizvodstvennye_moyki: "Производственные мойки",
                sub_2_proizvodstvennye_stellazhy: "Производственные стеллажи",
                sub_3_poruchni_opornye: "Поручни опорные",
                sub_4_proizvodstvenye_polki: "Производственные полки",
                sub_5_kompleksnye_resheniya: "Комплексные решения",
                sub_6_stoli_tumba_na_zakaz: "Столы и тумбы",
                sub_7_proizvodstvennye_stoly_s_razdvizhnymi_yaschikami_katalog: "Производственные столы с ящиками",
                sub_8_proizvodstvennye_stoly_katalog: "Производственные столы",

                popular_products: "Популярные товары",
                laptops: "Ноутбуки",
                see_all: "Смотреть всё",
                in_stock: "в наличии",
                out_of_stock: "нет на складе",
                cat_custom_orders: "Produse la comandă",
                sub_balustrade_perila: "Balustrade, balustrade de sprijin",
                sub_boxes: "Cutii",
                sub_cafe: "Mobilier pentru cafenea",
                sub_carcase: "Carcase",
                sub_caruciors: "Cărucioare",
                sub_cauldrons: "Cazane",
                sub_decor: "Decor",
                sub_furnitura: "Accesorii",
                sub_ladder: "Scări",
                sub_mangal_and_grill: "Mangaluri și grătare",
                sub_masa: "Mese",
                sub_melochi: "Piese mici",
                sub_mobila: "Mobilier",
                sub_other: "Altele",
                sub_podstavki: "Suporturi",
                sub_prom: "Produse industriale",
                sub_reshetki: "Grătare / grile",
                sub_sckaph: "Dulapuri",
                sub_sinks: "Chiuvete",
                sub_tandoors: "Tandooruri",
                sub_tanks: "Rezervoare",
                sub_tavas: "Tăvi",
                sub_towel: "Accesorii pentru baie",
                sub_trash_bins: "Coșuri de gunoi",
                sub_wheels: "Roți",

                cat_standard_products: "Produse standard",
                sub_0_podtovarniki: "Suporturi pentru marfă",
                sub_1_proizvodstvennye_moyki: "Chiuvete industriale",
                sub_2_proizvodstvennye_stellazhy: "Rafturi industriale",
                sub_3_poruchni_opornye: "Bare de sprijin",
                sub_4_proizvodstvenye_polki: "Polițe industriale",
                sub_5_kompleksnye_resheniya: "Soluții complexe",
                sub_6_stoli_tumba_na_zakaz: "Mese și dulapuri",
                sub_7_proizvodstvennye_stoly_s_razdvizhnymi_yaschikami_katalog: "Mese industriale cu sertare",
                sub_8_proizvodstvennye_stoly_katalog: "Mese industriale",

                popular_products: "Produse populare",
                laptops: "Laptopuri",
                see_all: "Vezi toate",
                in_stock: "în stoc",
                out_of_stock: "nu este în stoc",
            </div>

            <ProductsBlock
                title={t("popular_products")}
                query={{ page: 0, size: 8, sort: "price,desc" }}
                seeAllLink="/catalog?sort=price,desc&page=0&size=12"
            />

            <FeaturedRow title={t("sub_balustrade_perila")} category="custom_orders" subcategory="balustrade_perila"/>

            <ProductsBlock
                title={t("sub_balustrade_perila")}
                query={{ page: 0, size: 8, sort: "title,asc", category: "custom_orders", subcategory: "balustrade_perila" }}
                seeAllLink="/catalog?category=custom_orders&subcategory=balustrade_perila&sort=title,asc&page=0&size=12"
            />

            <ProductsBlock
                title={t("sub_ladder")}
                query={{ page: 0, size: 8, sort: "title,asc", category: "custom_orders", subcategory: "ladder" }}
                seeAllLink="/catalog?category=custom_orders&subcategory=ladder&sort=title,asc&page=0&size=12"
            />
            <ProductsBlock
                title={t("sub_caruciors")}
                query={{ page: 0, size: 8, sort: "title,asc", category: "custom_orders", subcategory: "caruciors" }}
                seeAllLink="/catalog?category=custom_orders&subcategory=caruciors&sort=title,asc&page=0&size=12"
            />
            <ProductsBlock
                title={t("sub_mangal_and_grill")}
                query={{ page: 0, size: 8, sort: "title,asc", category: "custom_orders", subcategory: "mangal_and_grill" }}
                seeAllLink="/catalog?category=custom_orders&subcategory=mangal_and_grill&sort=title,asc&page=0&size=12"
            />
            <ProductsBlock
                title={t("sub_2_proizvodstvennye_stellazhy")}
                query={{ page: 0, size: 8, sort: "title,asc", category: "standard_products", subcategory: "2_proizvodstvennye_stellazhy" }}
                seeAllLink="/catalog?category=standard_products&subcategory=2_proizvodstvennye_stellazhy&sort=title,asc&page=0&size=12"
            />
            <ProductsBlock
                title={t("sub_6_stoli_tumba_na_zakaz")}
                query={{ page: 0, size: 8, sort: "title,asc", category: "standard_products", subcategory: "6_stoli_tumba_na_zakaz" }}
                seeAllLink="/catalog?category=standard_products&subcategory=6_stoli_tumba_na_zakaz&sort=title,asc&page=0&size=12"
            />
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