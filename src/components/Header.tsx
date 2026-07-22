import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.svg';

const APP_STORE_URL = 'tel:+359888666106';   // TODO: replace with real URL

const navItems = [
  { label: 'Начало', to: '/' },
  { label: 'Приложение', to: '/application' },
  { label: 'Услуги', to: '/services' },
  { label: 'За Нас', to: '/about' },
  { label: 'Контакт', to: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const navLink = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ease-in-out ${
      isActive
        ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20 scale-105'
        : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50/80 active:scale-95'
    }`;

  const mobileNavLink = ({ isActive }: { isActive: boolean }) =>
    `flex items-center w-full px-4 py-3 rounded-xl font-semibold text-base transition-all duration-200 ${
      isActive
        ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-900 active:bg-blue-100'
    }`;


  return (
    <header className="flex w-full items-center justify-center px-6 py-5 bg-white/95 shadow-sm sticky top-0 z-50 transition-all duration-300 backdrop-blur-sm">
      <div className="container flex items-center justify-between">
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Ен Такси Стара Загора" className="h-8 w-auto lg:h-10" />
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-6 text-sm text-gray-700 lg:text-base">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={navLink}
              onClick={(e) => handleAnchorClick(e, to)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Поръчай такси"
          className="hidden lg:flex bg-blue-900 text-white px-5 py-3 rounded-xl hover:bg-blue-800 transition-colors duration-200"
        >
          Поръчай сега
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          aria-label="Мобилно меню"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-lg p-4 flex flex-col gap-4 lg:hidden z-40">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={mobileNavLink}
              onClick={(e) => {
                handleAnchorClick(e, to);
                if (!to.includes('#')) close();
              }}
            >
              {label}
            </NavLink>
          ))}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Поръчай такси"
            className="bg-blue-900 text-white px-5 py-3 rounded-xl hover:bg-blue-800 transition-colors duration-200 text-center"
            onClick={close}
          >
            Поръчай сега
          </a>
        </nav>
      )}
    </header>
  );
}
