import { useLanguage } from "../lib/LanguageContext";
import SEO from '../components/SEO';
import AppStore from '../components/AppStore';
import homeScreen from '../assets/homeScreen.webp';
import searchScreen from '../assets/searchScreen.webp';
import HeroImage from '../assets/ContactHero.webp';
import travelScreen from '../assets/travelScreen.webp';
import orderScreen from '../assets/orderScreen.webp';
import ariveScreen from '../assets/ariveScreen.webp';
import { Clock, Euro, Gauge, ReceiptText, Smartphone, CheckCircle2, PhoneCall, Phone, ArrowRight } from "lucide-react";



export default function ApplicationPage() {

    function HeroApp() {
      const { t, lang } = useLanguage();
      return (
        <section className="bg-gradient-to-br from-yellow-300 via-yellow to-yellow-600  px-6 py-5 ">
         <SEO
            title={lang === 'en' ? 'Download En Taxi App | App Store & Google Play' : 'Свали Ен Такси Приложение | App Store & Google Play'}
            description={lang === 'en' ? 'Mobile application for En Taxi Stara Zagora for iOS and Android.' : 'Мобилното приложение на Ен Такси Стара Загора за iOS и Android.'}
            canonicalUrl={`${import.meta.env.VITE_DOMAIN}/application`}
          />
          <div className="max-w-7xl mx-auto flex flex-col items-center md:flex-row md:gap-8">
            <div className="text-center md:text-left md:basis-2/3 ">
              <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase"> {t('AppHeroBadge')}</span>
              <h1 className=" text-4xl md:text-6xl font-extrabold mt-4 leading-tight text-blue-950"> {t('AppHeroTitle1')} <br className="hidden md:inline" />
                <span className="">{t('AppHeroTitle2')}</span></h1>
              <p className="mt-6 text-lg md:text-xl text-blue-950">{t('AppHeroDesc')}</p>
              <AppStore />
            </div>
            <img
              src={HeroImage}
              alt="Ен Такси мобилно приложение"
              width={300}
              height={500}
              fetchPriority="high"
              decoding="async"
              className="max-w-lg justify-self-end h-auto md:basis-1/3 "
            />
          </div>
        </section>
      )
    }

    function Benefits() {
  const { t } = useLanguage();

  const benefits = [
    {
      title: t('App1Title'),
      desc: t('App1Desc'),
      icon: Gauge
    },
    {
      title: t('App2Title'),
      desc: t('App2Desc'),
      icon: Clock
    },
    {
      title: t('App3Title'),
      desc: t('App3Desc'),
      icon: Euro
    },
    {
      title: t('App4Title'),
      desc: t('App4Desc'),
      icon: ReceiptText
    }
  ];
  
  

  return (
    <section className="p-8 md:p-12 my-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
    function HowItWork() {
        const { t } = useLanguage();
        const steps = [
            {
                title: t('AppStep1Title'),
                desc: t('AppStep1Desc'),
                image: homeScreen,
            },
            {
                title: t('AppStep2Title'),
                desc: t('AppStep2Desc'),
                image: searchScreen,
            },
            {
                title: t('AppStep3Title'),
                desc: t('AppStep3Desc'),
                image: travelScreen,
            },
            {
                title: t('AppStep4Title'),
                desc: t('AppStep4Desc'),
                image: orderScreen,
            },
            {
                title: t('AppStep5Title'),
                desc: t('AppStep5Desc'),
                image: ariveScreen,
            },
        ];

        return (
            <section className="p-8 md:p-12 my-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-slate-100 mb-10 text-center">{t('AppHowItWorkTitle')}</h2>
                    <div className="grid grid-cols-1 gap-8">
                        {steps.map((s, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`p-7 flex flex-col md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center gap-6 md:gap-16 justify-center`}
                                >
                                 <div className="text max-w-[400px]">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2 ">{s.title}</h3>
                                    <p className="text-gray-600 dark:text-slate-300 text-base leading-relaxed">{s.desc}</p>
                                </div>
                                    <div className="image max-w-[350px] h-auto flex items-center justify-center">
                                        <img
                                            src={s.image}
                                            alt={s.title}
                                            className="max-w-[250px] h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            );
                        })}
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
    return (
        <>
            <HeroApp />
            <Benefits />
            <HowItWork />
            <CallToAction />
        </>
    );
}

