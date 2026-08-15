
import { Shield, Database, Lock, Eye, UserCheck } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../lib/LanguageContext';

export default function PrivacyPolicy() {
    const { t, lang } = useLanguage();

    const companyName = import.meta.env.VITE_COMPANY_NAME || '"Ен Такси Стара Загора" ЕООД';
    const companyEmail = import.meta.env.VITE_COMPANY_EMAIL || 'office@6106.bg';

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
            <SEO 
                title={lang === 'en' ? "Privacy Policy | En Taxi Stara Zagora" : "Политика за поверителност | Ен Такси Стара Загора"}
                description={lang === 'en' ? "Privacy and cookie policy for the En Taxi Stara Zagora website." : "Политика за поверителност и бисквитки на уебсайта на Ен Такси Стара Загора."}
                canonicalUrl={`${import.meta.env.VITE_DOMAIN}/privacy`}
            />

            <div className="bg-blue-900 dark:bg-slate-900 text-white rounded-lg p-10 md:p-16 mb-12 text-center relative overflow-hidden shadow-xl mt-4">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400 opacity-10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
                <div className="relative z-10">
                    <Shield className="w-12 h-12 text-amber-400 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{t('privacyPageTitle')}</h1>
                    <p className="text-xl md:text-2xl text-blue-100 dark:text-slate-300 max-w-2xl mx-auto opacity-90">{t('privacyPageSubtitle')}</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-12 px-4 md:px-0 text-gray-700 dark:text-slate-300">
                {/* Администратор на данни */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Database className="w-6 h-6 text-blue-900 dark:text-amber-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                            {lang === 'en' ? 'Data Controller' : 'Администратор на лични данни'}
                        </h2>
                    </div>
                    <p className="leading-relaxed">
                        {lang === 'en'
                            ? `The data controller for personal data collected through this website is ${companyName}. For any questions regarding your personal data, please contact us at `
                            : `Администратор на личните данни, събирани чрез този уебсайт, е ${companyName}. За въпроси относно обработката на Вашите данни, моля свържете се с нас на `}
                        <a href={`mailto:${companyEmail}`} className="text-blue-600 dark:text-amber-400 hover:underline">{companyEmail}</a>.
                    </p>
                </section>

                {/* Какви данни събираме */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Eye className="w-6 h-6 text-blue-900 dark:text-amber-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                            {lang === 'en' ? 'What Data We Collect' : 'Какви данни събираме'}
                        </h2>
                    </div>
                    <p className="leading-relaxed mb-4">
                        {lang === 'en'
                            ? 'When you use the contact form on this website, we may collect the following personal data:'
                            : 'При използване на контактната форма на уебсайта можем да събираме следните лични данни:'}
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                        {lang === 'en' ? (
                            <>
                                <li>Name (first and last)</li>
                                <li>Phone number or email address</li>
                                <li>The content of your message</li>
                            </>
                        ) : (
                            <>
                                <li>Имена (първо и фамилия)</li>
                                <li>Телефонен номер или имейл адрес</li>
                                <li>Съдържанието на изпратеното съобщение</li>
                            </>
                        )}
                    </ul>
                    <p className="mt-4 leading-relaxed">
                        {lang === 'en'
                            ? 'Additionally, our website may use Google Analytics to collect anonymous usage data (page views, session duration, etc.) to improve website performance. This data does not personally identify you.'
                            : 'Освен това уебсайтът може да използва Google Analytics за събиране на анонимни данни за използването (прегледани страници, продължителност на сесията и др.) с цел подобряване на работата на сайта. Тези данни не Ви идентифицират лично.'}
                    </p>
                </section>

                {/* За какво използваме данните */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="w-6 h-6 text-blue-900 dark:text-amber-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                            {lang === 'en' ? 'How We Use Your Data' : 'За какво използваме данните Ви'}
                        </h2>
                    </div>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                        {lang === 'en' ? (
                            <>
                                <li>To respond to your inquiry or request</li>
                                <li>To provide the requested taxi service information</li>
                                <li>To improve the quality of our services</li>
                                <li>We do not sell your data to third parties</li>
                            </>
                        ) : (
                            <>
                                <li>За отговор на Вашето запитване или заявка</li>
                                <li>За предоставяне на исканата информация за таксиметровите ни услуги</li>
                                <li>За подобряване качеството на нашите услуги</li>
                                <li>Не продаваме данните Ви на трети страни</li>
                            </>
                        )}
                    </ul>
                </section>

                {/* Бисквитки */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-6 h-6 text-blue-900 dark:text-amber-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                            {lang === 'en' ? 'Cookies' : 'Бисквитки (Cookies)'}
                        </h2>
                    </div>
                    <p className="leading-relaxed mb-4">
                        {lang === 'en'
                            ? 'This website uses essential cookies necessary for its operation and, with your consent, analytics cookies (Google Analytics). You can refuse non-essential cookies using the cookie consent banner displayed upon your first visit.'
                            : 'Уебсайтът използва технически необходими бисквитки за функционирането си и, с Ваше съгласие, аналитични бисквитки (Google Analytics). Можете да откажете нетехническите бисквитки чрез лентата за съгласие с бисквитки, която се появява при първото Ви посещение.'}
                    </p>
                    <div className="rounded-lg bg-blue-50 dark:bg-slate-800 p-4 text-sm">
                        <p className="font-semibold mb-2">{lang === 'en' ? 'Cookies we use:' : 'Видове бисквитки:'}</p>
                        <ul className="space-y-1 pl-2 list-disc list-inside">
                            {lang === 'en' ? (
                                <>
                                    <li><strong>Necessary:</strong> Language preference, theme settings</li>
                                    <li><strong>Analytics (optional):</strong> Google Analytics (_ga, _gid)</li>
                                </>
                            ) : (
                                <>
                                    <li><strong>Необходими:</strong> Предпочитан език, тема на дизайна</li>
                                    <li><strong>Аналитични (по избор):</strong> Google Analytics (_ga, _gid)</li>
                                </>
                            )}
                        </ul>
                    </div>
                </section>

                {/* Права на субектите */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <UserCheck className="w-6 h-6 text-blue-900 dark:text-amber-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                            {lang === 'en' ? 'Your Rights (GDPR)' : 'Вашите права (GDPR)'}
                        </h2>
                    </div>
                    <p className="leading-relaxed mb-4">
                        {lang === 'en'
                            ? 'You have the following rights regarding your personal data, pursuant to the General Data Protection Regulation (GDPR):'
                            : 'Съгласно Общия регламент за защита на данните (GDPR) имате следните права:'}
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                        {lang === 'en' ? (
                            <>
                                <li>Right of access to your personal data</li>
                                <li>Right to rectification of inaccurate data</li>
                                <li>Right to erasure ("right to be forgotten")</li>
                                <li>Right to restriction of processing</li>
                                <li>Right to data portability</li>
                                <li>Right to object to processing</li>
                            </>
                        ) : (
                            <>
                                <li>Право на достъп до личните Ви данни</li>
                                <li>Право на коригиране на неточни данни</li>
                                <li>Право на изтриване ("право да бъдеш забравен")</li>
                                <li>Право на ограничаване на обработването</li>
                                <li>Право на преносимост на данните</li>
                                <li>Право на възражение срещу обработването</li>
                            </>
                        )}
                    </ul>
                    <p className="mt-6 leading-relaxed text-sm">
                        {lang === 'en'
                            ? 'To exercise any of these rights, please contact us at '
                            : 'За упражняване на горните права се свържете с нас на '}
                        <a href={`mailto:${companyEmail}`} className="text-blue-600 dark:text-amber-400 hover:underline">{companyEmail}</a>.
                        {lang === 'en'
                            ? ' You also have the right to lodge a complaint with the Commission for Personal Data Protection (CPDP).'
                            : ' Имате и право да подадете жалба до Комисията за защита на личните данни (КЗЛД).'}
                    </p>

                    <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-800 text-sm">
                        <p className="font-semibold">{t('regulatorKZLD')}</p>
                        <p>
                            София 1592, бул. „Проф. Цветан Лазаров" № 2<br />
                            Тел: 02 915 35 18 | <a href="mailto:kzld@cpdp.bg" className="text-blue-600 dark:text-amber-400 hover:underline">kzld@cpdp.bg</a> | <a href="https://www.cpdp.bg/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-amber-400 hover:underline">cpdp.bg</a>
                        </p>
                    </div>
                </section>

                {/* Мобилно приложение */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="w-6 h-6 text-blue-900 dark:text-amber-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{t('appDisclaimerTitle')}</h2>
                    </div>
                    <p className="leading-relaxed">{t('appDisclaimerText')}</p>
                </section>

                <p className="text-sm text-gray-500 dark:text-slate-500 text-center">
                    {lang === 'en' ? 'Last updated: August 2026' : 'Последна актуализация: Август 2026 г.'}
                </p>
            </div>
        </div>
    );
}
