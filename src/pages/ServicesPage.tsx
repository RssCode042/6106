import { ShieldCheck, MapPin, Building2, Car, Clock, Award } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../lib/LanguageContext';
import { TARIFFS } from '../lib/pricing';

export default function ServicesPage() {
    const { t, lang } = useLanguage();

    const servicesSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Таксиметрови и трансферни услуги Стара Загора',
        'provider': {
            '@type': 'LocalBusiness',
            'name': 'Ен Такси Стара Загора'
        },
        'areaServed': 'Стара Загора, България',
        'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Услуги на Ен Такси',
            'itemListElement': [
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Денонощни градски превози в Стара Загора' } },
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Междуградски трансфери до Летище София/Пловдив/Бургас' } },
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Корпоративно обслужване и фирмени договори' } }
            ]
        }
    };

    const services = [
        { 
            title: t('srvP1Title'), 
            desc: t('srvP1Desc'), 
            icon: Car,
            badge: lang === 'bg' ? '24/7 Денонощно' : '24/7 Available'
        },
        { 
            title: t('srvP2Title'), 
            desc: t('srvP2Desc'), 
            icon: MapPin,
            badge: lang === 'bg' ? 'Фиксирани цени' : 'Fixed Rates'
        },
        { 
            title: t('srvP3Title'), 
            desc: t('srvP3Desc'), 
            icon: Building2,
            badge: lang === 'bg' ? 'Фирмени фактури' : 'Business Invoices'
        },
        { 
            title: t('srvP4Title'), 
            desc: t('srvP4Desc'), 
            icon: Clock,
            badge: lang === 'bg' ? 'Точност до минута' : 'Punctual'
        },
        { 
            title: t('srvP5Title'), 
            desc: t('srvP5Desc'), 
            icon: Award,
            badge: lang === 'bg' ? 'Висока класа' : 'Premium'
        },
        { 
            title: t('srvP6Title'), 
            desc: t('srvP6Desc'), 
            icon: ShieldCheck,
            badge: lang === 'bg' ? '100% Гаранция' : 'Guaranteed'
        }
    ];

    const seoTitle = lang === 'en'
      ? "Taxi Services & Intercity Airport Transfers | En Taxi Stara Zagora"
      : "Такси Услуги и Междуградски Трансфери | Ен Такси Стара Загора";

    const seoDesc = lang === 'en'
      ? "Round-the-clock taxi rides in Stara Zagora, transfers to Sofia, Plovdiv & Burgas airports, corporate contracts at transparent rates."
      : "Денонощни градски превози в Стара Загора, междуградски трансфери до Летище София, Пловдив и Бургас, корпоративно обслужване с фактури на изгодни цени.";

    return (
        <div className="px-4 py-8 md:p-12">
            <SEO 
                title={seoTitle}
                description={seoDesc}
                keywords="такси услуги Стара Загора, трансфер летище София, taxi services Stara Zagora, airport transfer Bulgaria"
                canonicalUrl={`${import.meta.env.VITE_DOMAIN}/services`}
                schema={servicesSchema}
            />

            <section className=" mb-16 w-7xl mx-auto">
                <div className="inline-flex bg-accent dark:bg-slate-800 text-white dark:text-accent border border-emerald-200 dark:border-slate-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider gap-2">
                    <ShieldCheck className="w-4 h-4 text-white dark:text-accent" />
                    <span>{t('srvPageBadge')}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-blue-900 dark:text-white mb-6 leading-tight">
                    {t('srvPageTitle')}
                </h1>
                <p className="text-lg text-gray-700 dark:text-slate-300 leading-relaxed">
                    {t('srvPageSubtitle')}
                </p>
            </section>

            <section className="w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((s, i) => (
                    <div 
                        key={i} 
                        className="border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between group"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-amber-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-900 dark:group-hover:bg-amber-500 group-hover:text-white dark:group-hover:text-slate-950 transition-colors duration-300">
                                    <s.icon className="w-7 h-7" />
                                </div>
                                <span className="bg-accent dark:bg-slate-800 text-white dark:text-accent border border-emerald-200 dark:border-slate-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {s.badge}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3 group-hover:text-blue-900 dark:group-hover:text-amber-400 transition-colors">{s.title}</h3>
                            <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed mb-6">{s.desc}</p>
                        </div>

                        <a 
                            href="tel:+359426106" 
                            className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 dark:text-amber-400 hover:text-blue-700 dark:hover:text-amber-300 transition-colors pt-4 border-t border-gray-100 dark:border-slate-800"
                        >
                            <span>{t('orderNowCall')}</span>
                            <span>→</span>
                        </a>
                    </div>
                ))}
            </section>
            <section className="mt-20 max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-slate-100 mb-4">{t('destinationsTitle')}</h2>
                    <p className="text-lg text-gray-600 dark:text-slate-300">{t('destinationsSubtitle')}</p>
                </div>
                
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md border border-gray-100 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-slate-800/80 border-b border-gray-200 dark:border-slate-700">
                                    <th className="py-4 px-6 text-sm font-bold text-gray-900 dark:text-slate-200">{t('destName')}</th>
                                    <th className="py-4 px-6 text-sm font-bold text-gray-900 dark:text-slate-200">{t('destDistance')}</th>
                                    <th className="py-4 px-6 text-sm font-bold text-gray-900 dark:text-slate-200">{t('destPriceBGN')}</th>
                                    <th className="py-4 px-6 text-sm font-bold text-gray-900 dark:text-slate-200">{t('destPriceEUR')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { bg: 'Летище София', en: 'Sofia Airport', km: 230 },
                                    { bg: 'Летище Пловдив', en: 'Plovdiv Airport', km: 100 },
                                    { bg: 'Летище Бургас', en: 'Burgas Airport', km: 180 },
                                    { bg: 'Летище Варна', en: 'Varna Airport', km: 280 },
                                    { bg: 'Слънчев бряг', en: 'Sunny Beach', km: 200 },
                                    { bg: 'Банско', en: 'Bansko', km: 260 },
                                    { bg: 'Пампорово', en: 'Pamporovo', km: 140 },
                                    { bg: 'Боровец', en: 'Borovets', km: 200 },
                                    { bg: 'Русе', en: 'Ruse', km: 210 },
                                    { bg: 'Велико Търново', en: 'Veliko Tarnovo', km: 110 },
                                ].map((dest, i) => {
                                    const eurPrice = Math.round(dest.km * TARIFFS.INTERCITY_EUR + TARIFFS.DAY_INITIAL_EUR + TARIFFS.DAY_WAIT_EUR);
                                    const bgnPrice = Math.round(eurPrice * TARIFFS.EUR_TO_BGN);
                                    return (
                                        <tr key={i} className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="py-4 px-6 text-gray-800 dark:text-slate-300 font-semibold">{lang === 'en' ? dest.en : dest.bg}</td>
                                            <td className="py-4 px-6 text-gray-600 dark:text-slate-400">{dest.km} km</td>
                                            <td className="py-4 px-6 text-blue-900 dark:text-amber-400 font-bold">{bgnPrice} лв.</td>
                                            <td className="py-4 px-6 text-accent font-bold">~ €{eurPrice}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
