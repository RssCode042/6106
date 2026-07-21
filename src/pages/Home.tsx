import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Services from '../components/Services';
import AboutUs from '../components/AboutUs';
import Prices from '../components/Prices';
import Benefits from '../components/Benefits';
import Cta from '../components/Cta';

export default function Home() {
    return (
        <>
            <Helmet>
                <title>Ен Такси Стара Загора | Бързи и надеждни таксиметрови услуги</title>
                <meta name="description" content="Ен Такси Стара Загора предлага бързи и надеждни таксиметрови услуги. Поръчай такси лесно чрез нашето мобилно приложение или на телефон." />
            </Helmet>
            <Hero />
            <Services />
            <AboutUs />
            <Prices />
            <Benefits />
            <Cta />
        </>
    );
}
