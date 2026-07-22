import { Helmet } from 'react-helmet-async';
import HeroImage from '../assets/HeroImage.png';
import { useSettings } from '../context/SettingsContext';
import { trackClick } from '../utils/api';

const features = [
  {
    emoji: '📍',
    title: 'Поръчай с едно докосване',
    desc: 'Отваряш приложението, натискаш един бутон и най-близкото такси тръгва към теб. Без чакане на свободна линия.',
  },
  {
    emoji: '📡',
    title: 'Следи таксито в реално време',
    desc: 'Виждаш движението на автомобила на живо и знаеш точно кога ще пристигне.',
  },
  {
    emoji: '💳',
    title: 'Плати с карта или в брой',
    desc: 'Избираш удобния за теб начин на плащане. Фактура при поискване.',
  },
  {
    emoji: '⭐',
    title: 'Оцени шофьора',
    desc: 'След всяко пътуване можеш да оставиш оценка и да помогнеш за поддържане на качеството.',
  },
];

export default function ApplicationPage() {
  const settings = useSettings();
  return (
    <div className="min-h-screen bg-bg">
      <Helmet>
        <title>Мобилно приложение | Ен Такси Стара Загора</title>
        <meta
          name="description"
          content="Свали приложението на Ен Такси за лесна и бърза поръчка на такси в Стара Загора. Достъпно за iOS и Android."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-yellow-400 flex items-center justify-center px-6 py-12">
        <div className="container flex flex-col md:flex-row items-center gap-10">
          <div className="max-w-xl text-center md:text-left">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
              Ново
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight">
              Такси в джоба ти
            </h1>
            <p className="mt-6 text-lg md:text-xl text-blue-950">
              Свали приложението на Ен Такси и поръчай такси бързо, лесно и
              надеждно директно от смартфона си.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center md:justify-start">
              {/* App Store */}
              <a
                href={settings.app_store_url || '#'}
                onClick={() => trackClick('app_store')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Свали от App Store"
                className="flex items-center justify-center w-full md:w-52 text-white bg-black h-14 rounded-xl hover:opacity-80 transition-opacity"
              >
                <div className="mr-3">
                  <svg viewBox="0 0 384 512" width="30">
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="-mt-1 font-sans text-xl font-semibold">App Store</div>
                </div>
              </a>

              {/* Google Play */}
              <a
                href={settings.google_play_url || '#'}
                onClick={() => trackClick('google_play')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Свали от Google Play"
                className="flex items-center justify-center w-full md:w-52 text-white bg-black rounded-xl h-14 hover:opacity-80 transition-opacity"
              >
                <div className="mr-3">
                  <svg viewBox="30 336.7 120.9 129.2" width="30">
                    <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z" />
                    <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z" />
                    <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z" />
                    <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="-mt-1 font-sans text-xl font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          <div className="relative mt-8 md:mt-0">
            <img
                src={HeroImage}
                alt="Ен Такси мобилно приложение"
                width={550}
                height={423}
                fetchPriority="high"
                decoding="async"
                className="w-full md:w-[550px] h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="flex items-center justify-center px-6 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
              Функции
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
              Всичко, от което се нуждаеш
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
              Приложението е проектирано да бъде максимално лесно за употреба.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="bg-white flex gap-5 p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl">{emoji}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand flex items-center justify-center px-6 py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Готов ли си да тръгнеш?
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-lg mx-auto">
            Свали приложението безплатно и поръчай първото си такси още сега.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={settings.app_store_url || '#'}
              onClick={() => trackClick('app_store')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Свали от App Store"
              className="flex items-center justify-center gap-3 bg-white text-brand font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors"
            >
              App Store
            </a>
            <a
              href={settings.google_play_url || '#'}
              onClick={() => trackClick('google_play')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Свали от Google Play"
              className="flex items-center justify-center gap-3 bg-yellow-400 text-blue-950 font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors"
            >
              Google Play
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
