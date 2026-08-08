import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';

export default function NotFoundPage() {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <h1 className="text-6xl font-black text-blue-900 dark:text-amber-400 mb-4">404</h1>
      <p className="text-xl text-gray-700 dark:text-slate-300 mb-8">
        {lang === 'en' ? 'The page you are looking for does not exist.' : 'Страницата, която търсите, не съществува.'}
      </p>
      <Link to="/" className="bg-blue-900 dark:bg-amber-500 hover:bg-blue-800 dark:hover:bg-amber-400 text-white dark:text-slate-950 px-6 py-3 rounded-full font-bold shadow-md transition-all duration-200 hover:scale-105 active:scale-95">
        {lang === 'en' ? 'Back to Home' : 'Назад към началото'}
      </Link>
    </div>
  );
}