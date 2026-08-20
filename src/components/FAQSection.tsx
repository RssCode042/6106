import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export interface FAQItem {
  question: { bg: string; en: string };
  answer: { bg: string; en: string };
}

export const defaultFAQs: FAQItem[] = [
  {
    question: {
      bg: 'Как мога бързо да поръчам такси в Стара Загора?',
      en: 'How can I quickly order a taxi in Stara Zagora?'
    },
    answer: {
      bg: 'Можете да поръчате такси за секунди с обаждане на централа 042 6106 (+359 42 6106) или директно през нашето мобилно приложение за iOS и Android с GPS следене в реално време.',
      en: 'You can order a taxi in seconds by calling dispatch at 042 6106 (+359 42 6106) or directly via our iOS and Android mobile app with live GPS tracking.'
    }
  },
  {
    question: {
      bg: 'Какви са актуалните тарифи за превоз на Ен Такси?',
      en: 'What are current taxi fares for En Taxi?'
    },
    answer: {
      bg: 'Дневната тарифа (06:00 - 22:00 ч.) е 0.85 EUR/км с първоначална такса 1.85 EUR. Нощната тарифа (22:00 - 06:00 ч.) е 0.95 EUR/км с първоначална такса 1.95 EUR. Без такса за повикване.',
      en: 'Day rate (06:00 - 22:00) is 0.85 EUR/km with an initial fee of 1.85 EUR. Night rate (22:00 - 06:00) is 0.95 EUR/km with 1.95 EUR initial fee. No call fee.'
    }
  },
  {
    question: {
      bg: 'Предлагате ли междуградски трансфери и превози до летища?',
      en: 'Do you offer intercity transfers and airport rides?'
    },
    answer: {
      bg: 'Да! Извършваме трансфери до Летище София, Летище Пловдив, Летище Бургас, Варна, както и до всички населени места в България на фиксирани и прозрачни цени.',
      en: 'Yes! We perform airport transfers to Sofia Airport, Plovdiv Airport, Burgas Airport, Varna, and all Bulgarian cities at fixed transparent rates.'
    }
  },
  {
    question: {
      bg: 'Възможно ли е плащане с банков терминал (POS / карта)?',
      en: 'Can I pay by card / POS terminal in the taxi?'
    },
    answer: {
      bg: 'Да, някои от нашите автомобили разполагат с POS терминали за безконтактно плащане с Visa, Mastercard и Apple Pay / Google Pay, както и плащане в брой.',
      en: 'Yes, all our taxis carry POS terminals for contactless payments via Visa, Mastercard, Apple Pay / Google Pay, as well as cash.'
    }
  },
  {
    question: {
      bg: 'Работи ли услугата 24 часа в денонощието, 7 дни в седмицата?',
      en: 'Is your service available 24 hours a day, 7 days a week?'
    },
    answer: {
      bg: 'Абсолютно! Нашата диспечерска централа и автомобилен парк са на разположение 24/7 без почивен ден, включително по време на празници.',
      en: 'Absolutely! Our dispatch center and taxi fleet operate 24/7, 365 days a year, including holidays.'
    }
  },
  {
    question: {
      bg: 'Имате ли опция за повече багаж?',
      en: 'Do you offer more luggage support?'
    },
    answer: {
      bg: 'Да, при поръчка през приложението или по телефона можете предварително да заявите автомобил с по-голям багажник за вашите нужди.',
      en: 'Yes, when ordering via the app or by phone, you can request a vehicle with a larger trunk in advance to suit your needs.'
    }
  }
];

export function getFAQSchema(faqs: FAQItem[] = defaultFAQs, lang: 'bg' | 'en' = 'bg') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question[lang] || faq.question.bg,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer[lang] || faq.answer.bg
      }
    }))
  };
}

export default function FAQSection() {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-accent text-white  px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <HelpCircle className="w-4 h-4 text-white" />
          <span>{t('faqBadge')}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight">
          {t('faqTitle')}
        </h2>
        <p className="mt-3 text-gray-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
          {t('faqSubtitle')}
        </p>
      </div>

      <div className="space-y-4">
        {defaultFAQs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const qText = faq.question[lang] || faq.question.bg;
          const aText = faq.answer[lang] || faq.answer.bg;

          return (
            <div
              key={idx}
              className={`border rounded-lg transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-blue-900 dark:border-yellow bg-blue-50/30 dark:bg-slate-800/80 shadow-md ring-1 ring-blue-900/20 dark:ring-amber-500/20'
                  : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-slate-700 hover:shadow-sm'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 dark:text-slate-100 hover:text-blue-900 dark:hover:text-yellow transition-colors gap-4"
                aria-expanded={isOpen}
              >
                <span className="text-base md:text-lg">{qText}</span>
                <div className={`p-1.5 rounded-full transition-transform duration-200 ${isOpen ? 'rotate-180 bg-blue-900 dark:bg-yellow text-white dark:text-slate-950' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-gray-700 dark:text-slate-300 leading-relaxed text-sm md:text-base border-t border-blue-100/60 dark:border-slate-800 pt-3 animate-in fade-in duration-150">
                  {aText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}