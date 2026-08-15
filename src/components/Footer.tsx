import { MapPin, Phone, Mail  } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';
import { useTheme } from '../lib/ThemeContext';
import Facebook from '../assets/Facebook.svg';
import TikTok from '../assets/TikTok.svg';
import YouTube from '../assets/YouTube.svg';
import Instagram from '../assets/Instagram.svg';
import logo from '../assets/logo.svg';
import logoDark from '../assets/logoDark.svg';



export default function Footer() {
    const { t } = useLanguage();
    const { theme } = useTheme();

    const socialLinks = [
        { name: 'facebook', url: import.meta.env.VITE_FACEBOOK_LINK, icon: Facebook, alt: 'Facebook' },
        { name: 'tiktok', url: import.meta.env.VITE_TIKTOK_LINK, icon: TikTok, alt: 'TikTok' },
        { name: 'youtube', url: import.meta.env.VITE_YOUTUBE_LINK, icon: YouTube, alt: 'YouTube' },
        { name: 'instagram', url: import.meta.env.VITE_INSTAGRAM_LINK, icon: Instagram, alt: 'Instagram' },
    ].filter(social => social.url);

    return (
        <footer id="contact" className="bg-white dark:bg-slate-900/90 pt-16  border-t border-gray-100 dark:border-slate-800 scroll-mt-20 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-6 py-2 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 ">
                <div className="col-span-1 md:col-span-1">
                    <img src={theme === 'dark' ? logoDark : logo} alt="Taxi 6106" width="178" height="48" className="h-8 w-auto mb-6 filter dark:brightness-110" loading="lazy" decoding="async" />
                    <p className="text-gray-600 dark:text-slate-300 mb-6">{t('footerDesc')}</p>
                    <div className="flex gap-4">
                        {socialLinks.map(social => (
                            <Link 
                                key={social.name}
                                to={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center hover:opacity-80 transition-opacity"
                                aria-label={social.alt}
                            >
                                <img 
                                    src={social.icon} 
                                    alt={social.alt} 
                                    width="24" 
                                    height="24" 
                                    className="h-6 w-auto inline" 
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-slate-100">{t('navContact')}</h3>
                    <div className="space-y-4 text-gray-600 dark:text-slate-300">
                        <div className="flex gap-3"><MapPin className="text-blue-900 dark:text-blue-700 w-5 h-5 flex-shrink-0" /> <span>{t('footerAddress')}</span></div>
                        <div className="flex gap-3"><Phone className="text-blue-900 dark:text-blue-700 w-5 h-5" /> <span>+359 42 6106</span></div>
                        <div className="flex gap-3"><Mail className="text-blue-900 dark:text-blue-700 w-5 h-5" /> <span>office@6106.bg</span></div>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-slate-100">{t('footerMenu')}</h3>
                    <ul className="space-y-4 text-gray-600 dark:text-slate-300">
                        <li><Link to="/application" className="flex items-center gap-2 hover:text-blue-900 dark:hover:text-blue-700">{t('navApp')} <span className="bg-teal-500 text-white text-[10px] px-2 py-0.5 rounded-full">{t('footerNewBadge')}</span></Link></li>
                        <li><Link to="/services" className="hover:text-blue-900 dark:hover:text-blue-700">{t('navServices')}</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-900 dark:hover:text-blue-700">{t('navContact')}</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-slate-100">{t('footerServices')}</h3>
                    <ul className="space-y-4 text-gray-600 dark:text-slate-300">
                        <li><Link to="/services" className="hover:text-blue-900 dark:hover:text-blue-700">{t('srv1Title')}</Link></li>
                        <li><Link to="/services" className="hover:text-blue-900 dark:hover:text-blue-700">{t('srv2Title')}</Link></li>
                        <li><Link to="/services" className="hover:text-blue-900 dark:hover:text-blue-700">{t('srv3Title')}</Link></li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-gray-100 dark:border-slate-800 p-4 mt-8 bg-[#1d1f2e] dark:bg-slate-950 text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-sm text-gray-400 dark:text-slate-400">
                    <p>{t('footerRights')}</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="/terms" className="hover:text-white transition-colors">{t('footerTerms')}</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">{t('footerPrivacy')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}