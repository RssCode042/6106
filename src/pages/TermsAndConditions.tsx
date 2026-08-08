
import { FileText, Building2, AlertCircle, Scale } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../lib/LanguageContext';

export default function TermsAndConditions() {
    const { t, lang } = useLanguage();

    const companyName = import.meta.env.VITE_COMPANY_NAME || '"Ен Такси Стара Загора" ЕООД';
    const companyUIC = import.meta.env.VITE_COMPANY_UIC || '123748541';
    const companyAddress = import.meta.env.VITE_COMPANY_ADDRESS || 'гр. Стара Загора';
    const companyPhone = import.meta.env.VITE_COMPANY_PHONE || '042 6106';
    const companyEmail = import.meta.env.VITE_COMPANY_EMAIL || 'office@6106.bg';

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
            <SEO 
                title={lang === 'en' ? "Terms & Conditions | En Taxi Stara Zagora" : "Общи условия | Ен Такси Стара Загора"}
                description={lang === 'en' ? "Terms and conditions for using the En Taxi Stara Zagora website and services." : "Общи условия за ползване на уебсайта и услугите на Ен Такси Стара Загора."}
            />

            <div className="bg-blue-900 dark:bg-slate-900 text-white rounded-lg p-10 md:p-16 mb-12 text-center relative overflow-hidden shadow-xl mt-4">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400 opacity-10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
                <div className="relative z-10">
                    <FileText className="w-12 h-12 text-amber-400 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{t('termsPageTitle')}</h1>
                    <p className="text-xl md:text-2xl text-blue-100 dark:text-slate-300 max-w-2xl mx-auto opacity-90">{t('termsPageSubtitle')}</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-12 px-4 md:px-0 text-gray-700 dark:text-slate-300">
                {/* 1. Идентификация на търговеца */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Building2 className="w-6 h-6 text-blue-900 dark:text-amber-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{t('companyIdentification')}</h2>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
                        {lang === 'en'
                            ? 'Pursuant to Art. 4 of the Electronic Commerce Act (ZET), the following information identifies the merchant:'
                            : 'На основание чл. 4 от Закона за електронната търговия (ЗЕТ), по-долу са публикувани задължителните данни за търговеца:'}
                    </p>
                    <ul className="space-y-4">
                        <li className="flex flex-col sm:flex-row sm:gap-2">
                            <span className="font-bold min-w-[200px]">{t('companyNameLabel')}</span>
                            <span>{companyName}</span>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-2">
                            <span className="font-bold min-w-[200px]">{t('companyUICLabel')}</span>
                            <span>{companyUIC}</span>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-2">
                            <span className="font-bold min-w-[200px]">{t('companyAddressLabel')}</span>
                            <span>{companyAddress}</span>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-2">
                            <span className="font-bold min-w-[200px]">{lang === 'en' ? 'Phone:' : 'Телефон:'}</span>
                            <a href="tel:0426106" className="text-blue-600 dark:text-amber-400 hover:underline">{companyPhone}</a>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-2">
                            <span className="font-bold min-w-[200px]">{lang === 'en' ? 'Email:' : 'Имейл:'}</span>
                            <a href={`mailto:${companyEmail}`} className="text-blue-600 dark:text-amber-400 hover:underline">{companyEmail}</a>
                        </li>
                    </ul>
                </section>

                {/* 2. Цени и тарифи */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <AlertCircle className="w-6 h-6 text-blue-900 dark:text-amber-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{lang === 'en' ? 'Fares & Prices' : 'Цени и Тарифи'}</h2>
                    </div>
                    <p className="leading-relaxed mb-4">
                        {lang === 'en'
                            ? 'All transport prices, including the initial boarding fee, price per kilometer, waiting time fee, and minimum trip charge, are publicly available in the "Pricing" section of the homepage. All vehicles are equipped with certified fiscal taximeters. Fares are fixed and approved by the Municipality of Stara Zagora.'
                            : 'Всички цени за превоз — включително начална такса, цена за 1 км пробег, цена за минута престой и минимална цена на пътуване — са публично достъпни в секция „Цени и тарифи" на началната страница. Автомобилите ни разполагат с изправни фискални апарати. Тарифите са фиксирани и одобрени от Община Стара Загора.'}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm pl-2">
                        {lang === 'en' ? (
                            <>
                                <li>Day tariff (06:00–22:00): initial fee, per-km rate, wait rate</li>
                                <li>Night tariff (22:00–06:00): initial fee, per-km rate, wait rate</li>
                                <li>Intercity transfers: fixed rates per destination</li>
                            </>
                        ) : (
                            <>
                                <li>Дневна тарифа (06:00–22:00): начална такса, цена/км, цена/мин престой</li>
                                <li>Нощна тарифа (22:00–06:00): начална такса, цена/км, цена/мин престой</li>
                                <li>Междуградски трансфери: фиксирани цени по дестинации</li>
                            </>
                        )}
                    </ul>
                </section>

                {/* 3. Мобилно приложение и Disclaimers */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <AlertCircle className="w-6 h-6 text-blue-900 dark:text-amber-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{t('appDisclaimerTitle')}</h2>
                    </div>
                    <p className="leading-relaxed mb-6">{t('appDisclaimerText')}</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">{t('externalLinksDisclaimerTitle')}</h3>
                    <p className="leading-relaxed">{t('externalLinksDisclaimerText')}</p>
                </section>

                {/* 4. Надзорни органи */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Scale className="w-6 h-6 text-blue-900 dark:text-amber-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{t('regulatorsTitle')}</h2>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-slate-200">{t('regulatorDAI')}</h4>
                            <p className="text-sm mt-1">
                                София 1000, ул. „Ген. Йосиф В. Гурко" № 5<br />
                                Тел: 02 930 88 40 | Имейл: <a href="mailto:avto_a@rta.government.bg" className="text-blue-600 dark:text-amber-400 hover:underline">avto_a@rta.government.bg</a><br />
                                <a href="https://rta.government.bg/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-amber-400 hover:underline">rta.government.bg</a>
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-slate-200">{t('regulatorKZP')}</h4>
                            <p className="text-sm mt-1">
                                София 1000, пл. „Славейков" № 4А<br />
                                Гореща линия: 0700 111 22 | Имейл: <a href="mailto:info@kzp.bg" className="text-blue-600 dark:text-amber-400 hover:underline">info@kzp.bg</a><br />
                                <a href="https://kzp.bg/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-amber-400 hover:underline">kzp.bg</a>
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-slate-200">{t('regulatorKZLD')}</h4>
                            <p className="text-sm mt-1">
                                София 1592, бул. „Проф. Цветан Лазаров" № 2<br />
                                Тел: 02 915 35 18 | Имейл: <a href="mailto:kzld@cpdp.bg" className="text-blue-600 dark:text-amber-400 hover:underline">kzld@cpdp.bg</a><br />
                                <a href="https://www.cpdp.bg/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-amber-400 hover:underline">cpdp.bg</a>
                            </p>
                        </div>
                    </div>
                </section>

                <p className="text-sm text-gray-500 dark:text-slate-500 text-center">
                    {lang === 'en' ? 'Last updated: August 2026' : 'Последна актуализация: Август 2026 г.'}
                </p>
            </div>
        </div>
    );
}
