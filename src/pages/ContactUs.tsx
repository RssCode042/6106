import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Shield, Users, Award, CheckCircle2, Send, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../lib/LanguageContext';
import AppStore from '../components/AppStore';
import HeroImage from '../assets/ContactHero.png';



export default function ContactPage() {

    const { t, lang } = useLanguage();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const stats = [
        { label: t('statYearsLabel'), value: t('statYearsVal'), icon: Clock },
        { label: t('statCarsLabel'), value: t('statCarsVal'), icon: Award },
        { label: t('statClientsLabel'), value: t('statClientsVal'), icon: Users }
    ];


function HeroContact() {
  const { t } = useLanguage();
  return (
    <section className="bg-gradient-to-br from-yellow-300 via-yellow to-yellow-600  flex items-center justify-center px-6 py-5 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-col md:flex-row md:gap-8">
        <div className="max-w-7xl text-center md:text-left">
          <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase"> {t('heroBadge')}</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight text-blue-950"> {t('heroTitle1')} <br className="hidden md:inline" />
            <span className="">{t('heroTitle2')}</span></h1>
          <p className="mt-6 text-lg md:text-xl text-blue-950">{t('heroDesc')}</p>
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

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
            <SEO 
                title={lang === 'en' ? "Contact & About Us | En Taxi Stara Zagora" : "Контакти и За Нас | Ен Такси Стара Загора"}
                description={lang === 'en' ? "Contact En Taxi Stara Zagora. Order a taxi at 042 6106. Learn more about our 30+ years of reliable services." : "Свържете се с Ен Такси Стара Загора. Поръчайте такси на 042 6106. Научете повече за нашите над 30 години опит."}
            />

            <HeroContact />

            <div className="max-w-7xl mx-auto space-y-20 px-4 py-8 md:px-8">
                {/* Contact Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-md border border-gray-100 dark:border-slate-800">
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 mb-8">{t('contactPageTitle')}</h2>
                            
                            <div className="space-y-8">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div className="w-full">
                                        <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">{t('contactPhoneLabel')}</h3>
                                        <div className="flex flex-col gap-2">
                                            <a href="tel:0426106" className="text-2xl font-black text-gray-900 dark:text-slate-100 hover:text-blue-900 dark:hover:text-amber-400 transition-colors">
                                                {t('contactPhoneVal')}
                                            </a>
                                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-1">
                                                {['0878 666106', '0895 666106', '0886 666106', '0884 666106', '0897 666106', '0898 666106'].map(phone => (
                                                    <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="text-lg font-semibold text-gray-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-amber-400 transition-colors">
                                                        {phone}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">{t('contactAddressLabel')}</h3>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                                            {t('contactAddressVal')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">{t('contactEmailLabel')}</h3>
                                        <a href="mailto:info@entaxi.bg" className="text-lg font-semibold text-gray-900 dark:text-slate-100 hover:text-blue-900 dark:hover:text-amber-400 transition-colors">
                                            {t('contactEmailVal')}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">{lang === 'en' ? 'Working Hours' : 'Работно време'}</h3>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                                            24/7
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Action Button */}
                            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-slate-800">
                                <a 
                                    href="tel:0426106"
                                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-lg active:scale-95 text-lg"
                                >
                                    <Phone className="w-5 h-5" />
                                    {lang === 'en' ? 'Call Now' : 'Обади се сега'}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md border border-gray-100 dark:border-slate-800 p-8 h-full flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">{lang === 'en' ? 'Send an Inquiry' : 'Изпратете запитване'}</h2>
                        
                        {isSubmitted ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/50 animate-in fade-in zoom-in duration-300">
                                <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                                <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">
                                    {t('formSuccessMessage')}
                                </h3>
                                <p className="text-emerald-600 dark:text-emerald-500">
                                    {lang === 'en' ? 'We will get back to you as soon as possible.' : 'Ще се свържем с Вас при първа възможност.'}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                                        {t('formNameLabel')}
                                    </label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        required
                                        placeholder={t('formNamePlaceholder')}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="contact" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                                        {t('formContactLabel')}
                                    </label>
                                    <input 
                                        type="text" 
                                        id="contact" 
                                        required
                                        placeholder={t('formContactPlaceholder')}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    />
                                </div>
                                
                                <div className="flex-1">
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                                        {t('formMessageLabel')}
                                    </label>
                                    <textarea 
                                        id="message" 
                                        required
                                        rows={4}
                                        placeholder={t('formMessagePlaceholder')}
                                        className="w-full h-32 px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                                    ></textarea>
                                </div>
                                
                                
                                <div className="flex items-start gap-3 mt-4 mb-2">
                                    <input 
                                        type="checkbox" 
                                        id="privacy" 
                                        required
                                        className="mt-1 w-4 h-4 text-blue-900 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-slate-400 leading-tight">
                                        {t('privacyCheckbox')}
                                    </label>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md active:scale-[0.98]"
                                >
                                    <Send className="w-4 h-4" />
                                    {t('formSubmitButton')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* About Content */}
                <section className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100">{t('aboutTitle')}</h2>
                        <p className="text-lg text-gray-700 dark:text-slate-300 leading-relaxed">{t('aboutDesc')}</p>
                        
                        <div className="space-y-4 pt-4">
                            {[
                                { bg: 'Над 30 години опит в бранша', en: 'Over 30 years of industry experience' },
                                { bg: 'Лицензирани и обучени водачи', en: 'Licensed and trained drivers' },
                                { bg: 'Стриктна поддръжка на автопарка', en: 'Strict fleet maintenance' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg border border-gray-100 dark:border-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                    <span className="font-semibold text-gray-800 dark:text-slate-200">{lang === 'en' ? item.en : item.bg}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 relative">
                        <div className="absolute inset-0 bg-blue-100 dark:bg-slate-800 rounded-lg transform translate-x-4 translate-y-4 -z-10"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1542385150-13f533a1e27c?auto=format&fit=crop&w=800&q=80" 
                            alt="Taxi fleet" 
                            className="rounded-lg shadow-xl border-4 border-white dark:border-slate-900 w-full object-cover h-[450px]"
                        />
                    </div>
                </section>
                {/* Mission */}
                <section className="text-center max-w-3xl mx-auto bg-gray-50 dark:bg-slate-900/60 p-12 rounded-lg border border-gray-100 dark:border-slate-800">
                    <Shield className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 mb-6">{t('ourMissionTitle')}</h2>
                    <p className="text-xl text-gray-600 dark:text-slate-300 leading-relaxed italic">
                        "{t('ourMissionDesc')}"
                    </p>
                </section>
            </div>
        </div>
    );
}
