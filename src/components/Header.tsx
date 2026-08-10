import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useTheme } from '../lib/ThemeContext';
import logo from '../assets/logo.svg';
import logoDark from '../assets/logoDark.svg';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ease-in-out ${
      isActive
        ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20 scale-105 dark:bg-blue-100 dark:text-slate-950 dark:shadow-amber-500/20'
        : 'text-gray-700 dark:text-slate-200 hover:text-blue-900 dark:hover:text-blue-50 hover:bg-blue-50/80 dark:hover:bg-slate-800/80 active:scale-95'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center w-full px-4 py-3 rounded-xl font-semibold text-base transition-all duration-200 ${
      isActive
        ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20 dark:bg-amber-500 dark:text-slate-950'
        : 'text-gray-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-900 dark:hover:text-amber-400 active:bg-blue-100'
    }`;

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800 transition-colors duration-200">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto gap-2">
        <Link to="/" className="flex items-center transition-transform duration-200 hover:scale-105 active:scale-95">
          <img src={theme === 'dark' ? logoDark : logo} alt="6106 Logo" width="128" height="40" className="h-8 w-auto filter dark:brightness-110" decoding="async" />
        </Link>
    
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-1.5 text-gray-700 dark:text-slate-200 items-center  p-1.5 rounded-lg ">
          <NavLink to="/" className={navLinkClass}>{t('navHome')}</NavLink>
          <NavLink to="/application" className={navLinkClass}>{t('navApp')}</NavLink>
          <NavLink to="/services" className={navLinkClass}>{t('navServices')}</NavLink>
          <NavLink to="/contact" className={navLinkClass}>{t('navContact')}</NavLink>
          
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Language Toggle Switch */}
          <div className="flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700 text-sm font-bold text-gray-700 dark:text-slate-200 shadow-inner">
            <button
              onClick={() => setLang('bg')}
              className={`px-2.5 py-1 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                lang === 'bg'
                  ? 'bg-blue-900 text-white shadow-sm dark:bg-blue-100 dark:text-slate-950'
                  : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Български"
              aria-label="Превключи на Български"
            >
              <span>BG</span>
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                lang === 'en'
                  ? 'bg-blue-900 text-white shadow-sm dark:bg-blue-100 dark:text-slate-950'
                  : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="English"
              aria-label="Switch to English"
            >
              <span>EN</span>
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200 active:scale-90 flex items-center justify-center shadow-inner"
            title={theme === 'dark' ? 'Светла тема / Light theme' : 'Тъмна тема / Dark theme'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-blue-100 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-blue-950" />
            )}
          </button>

          <a href={import.meta.env.VITE_PHONE_LINK} className="hidden lg:block bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-600  text-white px-5 py-2 rounded-lg font-bold text-sm shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap">
            {t('navOrderNow')}
          </a>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden p-2 text-gray-700 dark:text-slate-200 hover:text-blue-900 dark:hover:text-amber-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 active:scale-90" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-gray-100 dark:border-slate-800 p-4 flex flex-col gap-2 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={mobileNavLinkClass}>{t('navHome')}</NavLink>
            <NavLink to="/application" onClick={() => setIsOpen(false)} className={mobileNavLinkClass}>{t('navApp')}</NavLink>
            <NavLink to="/services" onClick={() => setIsOpen(false)} className={mobileNavLinkClass}>{t('navServices')}</NavLink>
            <a href="#about" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-base text-gray-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-200">{t('navAbout')}</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-base text-gray-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-200">{t('navContact')}</a>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/80 rounded-xl mt-2 border border-gray-100 dark:border-slate-700">
              <span className="text-sm font-semibold text-gray-600 dark:text-slate-300 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-900 dark:text-amber-400" />
                <span>Език / Language</span>
              </span>
              <div className="flex bg-white dark:bg-slate-900 p-1 rounded-lg border border-gray-200 dark:border-slate-700 text-xs font-bold">
                <button
                  onClick={() => setLang('bg')}
                  className={`px-3 py-1 rounded-md transition-all ${lang === 'bg' ? 'bg-blue-900 dark:bg-amber-500 text-white dark:text-slate-950' : 'text-gray-600 dark:text-slate-300'}`}
                >
                  🇧🇬 BG
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-md transition-all ${lang === 'en' ? 'bg-blue-900 dark:bg-amber-500 text-white dark:text-slate-950' : 'text-gray-600 dark:text-slate-300'}`}
                >
                  🇬🇧 EN
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-700">
              <span className="text-sm font-semibold text-gray-600 dark:text-slate-300 flex items-center gap-1.5">
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-900" />}
                <span>{theme === 'dark' ? 'Тъмна тема / Dark theme' : 'Светла тема / Light theme'}</span>
              </span>
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-900 dark:bg-amber-500 text-white dark:text-slate-950 transition-all"
              >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>

            <a href="#contact" onClick={() => setIsOpen(false)} className="mt-2 w-full text-center bg-blue-900 dark:bg-amber-500 dark:text-slate-950 text-white py-3 rounded-xl font-bold shadow-md active:scale-98 transition-all duration-200">
              {t('navOrderNow')}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
