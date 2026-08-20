import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Shield, CheckCircle2, Send, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../lib/LanguageContext';
import FAQSection from "../components/FAQSection";




export default function ContactPage() {

    const { t, lang } = useLanguage();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${import.meta.env.VITE_DOMAIN}/contact`,
    'url': `${import.meta.env.VITE_DOMAIN}/contact`,
    'name': 'Контакти - Ен Такси Стара Загора',
    'mainEntity': {
        '@type': 'TaxiService',
        '@id': `${import.meta.env.VITE_DOMAIN}/#organization`,
        'name': 'Ен Такси Стара Загора',
        'telephone': '+359426106',
        'email': import.meta.env.VITE_CONTACT_EMAIL,
        'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'бул. Цар Симеон Велики 1',
        'addressLocality': 'Стара Загора',
        'postalCode': '6000',
        'addressCountry': 'BG'
        }
  }
};




    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
            <SEO 
                title={lang === 'en' ? "Contact & About Us | En Taxi Stara Zagora" : "Контакти и За Нас | Ен Такси Стара Загора"}
                description={lang === 'en' ? "Contact En Taxi Stara Zagora. Order a taxi at 042 6106. Learn more about our 30+ years of reliable services." : "Свържете се с Ен Такси Стара Загора. Поръчайте такси на 042 6106. Научете повече за нашите над 30 години опит."}
                canonicalUrl={`${import.meta.env.VITE_DOMAIN}/contact`}
                schema={contactSchema}
            />


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
                                        <a href="mailto:office@6106.bg" className="text-lg font-semibold text-gray-900 dark:text-slate-100 hover:text-blue-900 dark:hover:text-amber-400 transition-colors">
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
                            src="https://images.unsplash.com/random/" 
                            alt="Taxi fleet" 
                            className="rounded-lg shadow-xl border-4 border-white dark:border-slate-900 w-full object-cover h-[450px]"
                        />
                    </div>
                </section>
                
            </div>
        </div>
    );
}
