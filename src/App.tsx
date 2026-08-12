import { useState, Suspense, lazy } from "react";
import { Building2, Plane, MapPin, Shield, Clock, Euro, Leaf, Sparkles, CreditCard, Smartphone, PhoneCall, CheckCircle2, ArrowRight, Phone, } from 'lucide-react';
import SEO, { mainTaxiSchema } from "./components/SEO";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AnalyticsTracker from "./components/AnalyticsTracker";
import { LanguageProvider, useLanguage } from "./lib/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./lib/ThemeContext";
import HeroImage from "./assets/HeroImage.png";
import AboutImage from "./assets/AboutUs.png";
import AppStore from "./components/AppStore";
import ApplicationPage from "./pages/ApplicationPage";
import CookieConsent from "./components/CookieConsent";
import { TARIFFS } from './lib/pricing';

// Lazy-loaded pages — only downloaded when navigated to
const AppRedirectPage = lazy(() => import('./pages/AppRedirect'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// Fallback shown while a lazy page chunk is loading
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-500 dark:text-slate-400 font-medium">Зареждане...</span>
      </div>
    </div>
  );
}


function Hero() {
  const { t } = useLanguage();
  return (
    <section className="bg-gradient-to-br from-yellow-300 via-yellow to-yellow-600  flex items-center justify-center p-4 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-col md:flex-row md:gap-8 ">
        <div className="max-w-xl text-center md:text-left">
          <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase"> {t('heroBadge')}</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight text-blue-950"> {t('heroTitle1')} <br className="hidden md:inline" />
            <span className="">{t('heroTitle2')}</span></h1>
          <p className="mt-6 text-lg md:text-xl text-blue-950">{t('heroDesc')}</p>
          <AppStore />
        </div>
        <img
          src={HeroImage}
          alt="Ен Такси мобилно приложение"
          width={650}
          height={500}
          fetchPriority="high"
          decoding="async"
          className="w-full md:w-1/2 h-auto"
        />
      </div>
    </section>
  )
}

function Services() {
  const { t } = useLanguage();
  const services = [
    {
      title: t('srv1Title'),
      desc: t('srv1Desc'),
      icon: MapPin
    },
    {
      title: t('srv2Title'),
      desc: t('srv2Desc'),
      icon: Plane
    },
    {
      title: t('srv3Title'),
      desc: t('srv3Desc'),
      icon: Building2
    }
  ];

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between px-4 py-5 gap-4">
        <div>
          <span className="bg-accent dark:bg-slate-800 text-white dark:text-accent border border-emerald-200 dark:border-slate-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{t('servicesBadge')}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900 dark:text-slate-100 tracking-tight">{t('servicesTitle')}</h2>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-blue-900 dark:text-amber-400 font-bold hover:text-blue-700 dark:hover:text-amber-300 transition-colors group"
        >
          <span>{t('viewAllServices')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-5">
        {services.map((s, i) => (
          <div
            key={i}
            className="border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-yellow rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-900 dark:group-hover:bg-yellow group-hover:text-white dark:group-hover:text-slate-950 transition-colors duration-300">
                <s.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3 group-hover:text-blue-900 dark:group-hover:text-yellow transition-colors">{s.title}</h3>
              <p className="text-gray-600 dark:text-slate-300 text-base leading-relaxed">{s.desc}</p>
            </div>

            <Link
              to="/services"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-yellow hover:underline pt-4 border-t border-gray-100 dark:border-slate-800"
            >
              <span>{t('learnMore')}</span>
              <span>→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}


function AboutUs() {
  const { t } = useLanguage();

  const services = [
    {
      title: '30+',
      desc: t('statYearsLabel'),
    },
    {
      title: '350+',
      desc: t('statCarsLabel'),
    },
    {
      title: t('statClientsVal'),
      desc: t('statClientsLabel'),
    },
  ];

  return (
    <section className="flex items-center justify-center px-4 py-5 ">
      <div className="max-w-7xl grid grid-col md:grid-cols-2 gap-8 md:justify-center px-4 items-center">
        <div className="max-auto text-center md:text-left ">
          <span className="bg-accent dark:bg-slate-800 text-white dark:text-accent border border-emerald-200 dark:border-slate-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{t('aboutBadge')}</span>
          <h2 className="text-3xl md:text-3xl font-extrabold mt-4 leading-tight">{t('aboutTitle')}</h2>
          <p className="mt-6 text-lg md:text-xl">{t('aboutDesc')}</p>
          <div className="grid grid-cols-3 gap-8 w-fit mt-8">
            {services.map(({ title, desc }) => (
              <div key={title} className="card flex flex-col gap-2 font-bold items-center ">

                <h3 className="text-4xl text-brand pt-2">{title}</h3>
                <p>{desc}</p>
              </div>


            ))}
          </div>
        </div>
        <div className="relative mt-8 md:mt-0 md:items-right">
          <img
            src={AboutImage}
            alt="Ен Такси автопарк - повече от 350 автомобила"
            width={600}
            height={500}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const { t } = useLanguage();
  const [distance, setDistance] = useState(30);
  const [wait, setWait] = useState(0);
  const [tariff, setTariff] = useState<'daily' | 'night'>('daily');

  const dayPrice = (distance * TARIFFS.DAY_KM_EUR) + (wait * TARIFFS.DAY_WAIT_EUR) + TARIFFS.DAY_INITIAL_EUR;
  const nightPrice = (distance * TARIFFS.NIGHT_KM_EUR) + (wait * TARIFFS.NIGHT_WAIT_EUR) + TARIFFS.NIGHT_INITIAL_EUR;
  const price = tariff === 'daily' ? dayPrice : nightPrice;

  return (
    <section className="flex items-center justify-center p-4  transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <span className="bg-accent dark:bg-slate-800 text-white dark:text-accent border border-emerald-200 dark:border-slate-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{t('pricingBadge')}</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-8 text-gray-900 dark:text-slate-100 tracking-tight">{t('pricingTitle')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 dark:text-slate-100">{t('pricingTableTitle')}</h3>
            <div className="space-y-4">
              {[
                { label: t('pricePerKm'), daily: import.meta.env.VITE_DAY_PRICE_PER_KM_EUR + " EUR" , night: import.meta.env.VITE_NIGHT_PRICE_PER_KM_EUR + " EUR" },
                { label: t('initialFee'), daily: import.meta.env.VITE_DAY_INITIAL_FEE_EUR + " EUR", night: import.meta.env.VITE_NIGHT_INITIAL_FEE_EUR + " EUR" },
                { label: t('callFee'), daily: t('free'), night: t('free') },
                { label: t('waitTime'), daily: import.meta.env.VITE_DAY_WAIT_FEE_EUR + " EUR", night: import.meta.env.VITE_NIGHT_WAIT_FEE_EUR + " EUR" },
              ].map((item, idx) => (
                <div key={idx} className="border-b border-gray-100 dark:border-slate-800 pb-4">
                  <div className="font-semibold text-gray-700 dark:text-slate-200 mb-2">{item.label}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 dark:bg-slate-800 dark:text-slate-200 p-2.5 rounded-lg flex justify-between border border-gray-100 dark:border-slate-700">{t('dayTariff')}: <span className="font-bold text-gray-900 dark:text-amber-400">{item.daily}</span></div>
                    <div className="bg-gray-50 flex justify-between dark:bg-slate-800 dark:text-slate-200 p-2.5 rounded-lg border border-gray-100 dark:border-slate-700">{t('nightTariff')}: <span className="font-bold text-gray-900 dark:text-amber-400">{item.night}</span></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-sky-700 dark:text-sky-600 mt-6 bg-blue-50 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 p-4 rounded-lg">{t('tariffNotice')}</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 rounded-lg shadow-sm flex-grow">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 dark:text-slate-100">{t('calcTitle')}</h3>
              <label htmlFor="distance-input" className="block mb-2 font-medium text-gray-700 dark:text-slate-200">{t('distance')}: <span className="font-bold text-blue-900 dark:text-amber-400">{distance} {t('km')}</span></label>
              <input id="distance-input" aria-label={t('distance')} type="range" min="1" max="100" value={distance} onChange={e => setDistance(Number(e.target.value))} className="w-full mb-6 accent-blue-900 dark:accent-amber-400 cursor-pointer" />

              <label htmlFor="wait-input" className="block mb-2 font-medium text-gray-700 dark:text-slate-200">{t('stay')}: <span className="font-bold text-blue-900 dark:text-amber-400">{wait} {t('min')}</span></label>
              <input id="wait-input" aria-label={t('stay')} type="range" min="0" max="60" value={wait} onChange={e => setWait(Number(e.target.value))} className="w-full mb-6 accent-blue-900 dark:accent-amber-400 cursor-pointer" />

              <div className="flex bg-gray-200 dark:bg-slate-800 rounded-xl p-1 mb-6" role="group" aria-label="Tariff selection">
                <button aria-pressed={tariff === 'daily'} onClick={() => setTariff('daily')} className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all duration-200 ${tariff === 'daily' ? 'bg-white dark:bg-yellow text-gray-900 dark:text-slate-950 shadow' : 'text-gray-600 dark:text-slate-300 hover:text-gray-900'}`}>{t('dayTariff')}</button>
                <button aria-pressed={tariff === 'night'} onClick={() => setTariff('night')} className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all duration-200 ${tariff === 'night' ? 'bg-white dark:bg-yellow text-gray-900 dark:text-slate-950 shadow' : 'text-gray-600 dark:text-slate-300 hover:text-gray-900'}`}>{t('nightTariff')}</button>
              </div>

              <div className="bg-blue-900 dark:bg-slate-800 dark:border dark:border-yellow/30 text-white p-6 rounded-lg text-center shadow-lg">
                <div className="text-sm opacity-80 dark:text-slate-300">{t('approxPrice')}</div>
                <div className="text-3xl md:text-4xl font-black mt-1 text-yellow">{price.toFixed(2)} EUR</div>
                {/* <div className="text-sm opacity-90 mt-1 dark:text-slate-300 font-semibold">{(price * 1.95583).toFixed(2)} {lang === 'bg' ? 'лв.' : 'BGN'}</div> */}
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-4 italic">{t('calcDisclaimer')}</p>
            </div>
            <div className="text-sky-700 dark:text-sky-600 mt-6 bg-blue-50 dark:bg-slate-800/80 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 p-6 rounded-lg text-sm t">
              {t('muniNotice')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const { t } = useLanguage();

  const benefits = [
    {
      title: t('why1Title'),
      desc: t('why1Desc'),
      icon: Shield
    },
    {
      title: t('why2Title'),
      desc: t('why2Desc'),
      icon: Clock
    },
    {
      title: t('why3Title'),
      desc: t('why3Desc'),
      icon: Euro
    },
    {
      title: t('why4Title'),
      desc: t('why4Desc'),
      icon: Leaf
    },
    {
      title: t('why5Title'),
      desc: t('why5Desc'),
      icon: CreditCard
    },
    {
      title: t('why6Title'),
      desc: t('why6Desc'),
      icon: Sparkles
    }
  ];

  return (
    <section className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="bg-accent dark:bg-slate-800 text-white dark:text-accent border border-emerald-200 dark:border-slate-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {t('whyBadge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3 text-gray-900 dark:text-slate-100 tracking-tight">
            {t('whyTitle')}
          </h2>
          <p className="text-gray-600 dark:text-slate-300 mt-2 text-base md:text-lg">
            {t('whySubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-yellow rounded-lg flex items-center justify-center mb-5 group-hover:bg-blue-900 dark:group-hover:bg-yellow group-hover:text-white dark:group-hover:text-slate-950 transition-colors duration-300">
                <b.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2 group-hover:text-blue-900 dark:group-hover:text-yellow transition-colors">{b.title}</h3>
              <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  const { t, lang } = useLanguage();

  return (
    <section className="px-4 my-16">
      <div className="mb-12 max-w-7xl mx-auto ">
        <span className="bg-accent dark:bg-slate-800 text-white dark:text-accent border border-emerald-200 dark:border-slate-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {t('ctaBadge')}
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-3 text-gray-900 dark:text-slate-100 tracking-tight">
          {t('ctaTitle')}
        </h2>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="items-stretch">
          {/* LEFT COLUMN: Invitation to Download the Mobile Application */}
          <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-indigo-950 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-white rounded-lg p-8 md:p-10 shadow-xl border border-blue-800/40 dark:border-slate-800 flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle accent glow */}
            <div className="absolute -right-16 -top-16 w-60 h-60 bg-yellow/10 dark:bg-yellow/5 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 bg-accent dark:bg-slate-800 text-white dark:text-accent border border-emerald-200 dark:border-slate-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <Smartphone className="w-4 h-4" />
                <span>{t('ctaAppBadge')}</span>
              </div>

              {/* Headline & Description */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {t('ctaAppTitle')}
              </h2>
              <p className="text-blue-100 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                {t('ctaAppDesc')}
              </p>

              {/* Benefits Checklist */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-blue-50 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-yellow flex-shrink-0 mt-0.5" />
                  <span>{t('ctaAppFeat1')}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-blue-50 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-yellow flex-shrink-0 mt-0.5" />
                  <span>{t('ctaAppFeat2')}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-blue-50 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-yellow flex-shrink-0 mt-0.5" />
                  <span>{t('ctaAppFeat3')}</span>
                </li>
              </ul>
            </div>
            <AppStore />




          </div>
        </div>

        {/* RIGHT COLUMN: Call an Operator / Dispatcher */}
        <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 rounded-lg p-8 md:p-10 shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle green glow */}
          <div className="absolute -right-16 -bottom-16 w-60 h-60 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-accent dark:bg-slate-800 text-white dark:text-accent border border-emerald-200 dark:border-slate-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <PhoneCall className="w-4 h-4" />
              <span>{t('ctaCallBadge')}</span>
            </div>

            {/* Headline & Description */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight leading-tight mb-4">
              {t('ctaCallTitle')}
            </h2>
            <p className="text-gray-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6">
              {t('ctaCallDesc')}
            </p>

            {/* Benefits Checklist */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-yellow flex-shrink-0 mt-0.5" />
                <span>{t('ctaCallFeat1')}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-yellow flex-shrink-0 mt-0.5" />
                <span>{t('ctaCallFeat2')}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-yellow flex-shrink-0 mt-0.5" />
                <span>{t('ctaCallFeat3')}</span>
              </li>
            </ul>
          </div>

          {/* Action Area: Phone display & CTA buttons */}
          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-800">


            {/* Direct Call Button */}
            <a
              href="tel:+359426106"
              aria-label={t('ctaCallBtn')}
              className="w-full bg-blue-900 hover:bg-blue-800 dark:bg-yellow dark:hover:bg-yellow/80 text-white dark:text-slate-950 font-extrabold py-4 px-6 rounded-lg text-base flex items-center justify-center gap-3 transition-all duration-200 shadow-lg shadow-blue-900/20 dark:shadow-yellow/10 active:scale-95 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <Phone className="w-5 h-5 animate-bounce" />
              <span>{t('ctaCallBtn')}</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <div className="text-center">
              <span className="text-xs text-gray-500 dark:text-slate-400">
                {lang === 'en'
                  ? 'For mobile & international calls: +359 42 6106 / 24 hours a day'
                  : 'За обаждания от мобилен или чужбина: +359 42 6106 / 24 часа в денонощието'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const combinedSchema = [mainTaxiSchema];
  const { lang } = useLanguage();

  const seoTitle = lang === 'en'
    ? "En Taxi Stara Zagora 6106 | Fast and Reliable Taxi Services"
    : "Ен Такси Стара Загора 6106 | Бързи и надеждни таксиметрови услуги.";

  const seoDesc = lang === 'en'
    ? "Official website of En Taxi Stara Zagora 6106. Quick taxi request at 042 6106 or via mobile app. Day and night rates, airport transfers, and 24/7 service."
    : "Официален сайт на Ен Такси Стара Загора 6106. Бърза поръчка на такси на 042 6106 или през мобилно приложение. Дневна и нощна тарифа, трансфери до летища и 24/7 обслужване.";

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        keywords="такси Стара Загора, 6106 такси, поръчка на такси 042 6106, Ен Такси, taxi Stara Zagora, airport transfer Bulgaria"
        canonicalUrl="https://6106.bg/"
        schema={combinedSchema}
      />
      <Hero />
      <Services />
      <AboutUs />
      <Suspense fallback={<div className="h-64" />}>
        <Pricing />
        <WhyChooseUs />
        <CallToAction />
      </Suspense>
    </>
  );
}


function App() {


  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter basename="/">
          <div className="page min-h-screen bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50 translate-all duration-300">
            <AnalyticsTracker />
            <Header />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/application" element={<ApplicationPage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/download-app" element={<AppRedirectPage />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <Footer />
            <CookieConsent />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
