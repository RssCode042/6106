import { useLanguage } from "../lib/LanguageContext";
import AppStore from '../components/AppStore';
import HeroImage from '../assets/ContactHero.png';
import { Clock, Euro, Shield, Leaf } from "lucide-react";



export default function ApplicationPage() {

    function HeroApp() {
      const { t } = useLanguage();
      return (
        <section className="bg-gradient-to-br from-yellow-300 via-yellow to-yellow-600  flex items-center justify-center px-6 py-5 ">
          <div className="max-w-7xl mx-auto flex justify-between flex-col md:flex-row md:gap-8">
            <div className="text-center md:text-left lg:mt-8">
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
              className="max-w-[300px] md:w-1/2 h-auto"
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
      icon: Shield
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
      icon: Leaf
    }
  ];
  

  return (
    <section className="p-8 md:p-12 my-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
                image: HeroImage,
            },
            {
                title: t('AppStep2Title'),
                desc: t('AppStep2Desc'),
                 image: HeroImage,
            },
            {
                title: t('AppStep3Title'),
                desc: t('AppStep3Desc'),
                image: HeroImage,
            },
            {
                title: t('AppStep4Title'),
                desc: t('AppStep4Desc'),
                image: HeroImage,
            },
            {
                title: t('AppStep5Title'),
                desc: t('AppStep5Desc'),
                 image: HeroImage,
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
                                 <div className="text w-[400px]">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2 ">{s.title}</h3>
                                    <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">{s.desc}</p>
                                </div>
                                    <div className="image w-[350px] h-auto flex items-center justify-center">
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
    return (
        <>
            <HeroApp />
            <Benefits />
            <HowItWork />
        </>
    );
}

