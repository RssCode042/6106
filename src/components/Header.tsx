import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.svg';

import { useSettings } from '../context/SettingsContext';
import { trackClick } from '../utils/api';

const navItems = [
  { label: 'Начало', to: '/' },
  { label: 'Приложение', to: '/application' },
  { label: 'Услуги', to: '/#services' },
  { label: 'За Нас', to: '/#about' },
  { label: 'Контакт', to: '/#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const settings = useSettings();

  const close = () => setIsOpen(false);

  /**
   * For anchor links (/#section) we navigate to "/" first then scroll.
   * For regular routes we use NavLink's built-in active detection.
   */
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: string
  ) => {
    if (!to.includes('#')) return; // let NavLink handle normal routes
    e.preventDefault();
    close();
    const [path, hash] = to.split('#');
    const targetPath = path || '/';
    if (location.pathname !== targetPath) {
      navigate(targetPath);
      // give the page time to render, then scroll
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-blue-900 pb-2 border-b-4 transition-colors duration-200 ${
      isActive ? 'border-blue-900 text-blue-900' : 'border-transparent'
    }`;

  return (
    <header className="flex items-center justify-center px-6 py-5 bg-white shadow-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Ен Такси Стара Загора" className="h-10 w-auto" />
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-gray-700">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={linkClass}
              onClick={(e) => handleAnchorClick(e, to)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <a
          href={settings.app_store_url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Поръчай такси"
          onClick={() => trackClick('order_button')}
          className="hidden md:flex bg-blue-900 text-white px-5 py-3 rounded-xl hover:bg-blue-800 transition-colors duration-200"
        >
          Поръчай сега
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          aria-label="Мобилно меню"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-lg p-4 flex flex-col gap-4 md:hidden z-40">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={linkClass}
              onClick={(e) => {
                handleAnchorClick(e, to);
                if (!to.includes('#')) close();
              }}
            >
              {label}
            </NavLink>
          ))}
          <a
            href={settings.app_store_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Поръчай такси"
            className="bg-blue-900 text-white px-5 py-3 rounded-xl hover:bg-blue-800 transition-colors duration-200 text-center"
            onClick={() => {
              trackClick('order_button');
              close();
            }}
          >
            Поръчай сега
          </a>
        </nav>
      )}
    </header>
  );
}
