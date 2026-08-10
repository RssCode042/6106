import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_TITLE = 'Ен Такси Стара Загора (N6106) | Бързи и сигурни таксиметрови услуги 24/7';
const DEFAULT_DESCRIPTION = 'Поръчайте такси в Стара Загора бързо и лесно на 042 6106 или през мобилното ни приложение. Комфортни автомобили, изгодни тарифи и 24/7 обслужване.';
const DEFAULT_KEYWORDS = 'такси Стара Загора, поръчка на такси 042 6106, Ен Такси, таксиметрови услуги, градски превоз, трансфер летище София, трансфер Бургас, евтино такси Стара Загора, такси приложение';
// Always read from env so staging builds and production never mix URLs
const SITE_URL = (import.meta.env.VITE_DOMAIN as string | undefined)?.replace(/;$/, '') || 'https://6106.bg';
// Use a raster image for og:image — SVG is not supported by Facebook / Twitter
const DEFAULT_OG_IMAGE = `${SITE_URL}/OG.png`;

// Main TaxiService & LocalBusiness JSON-LD Schema
export const mainTaxiSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TaxiService',
      '@id': `${SITE_URL}/#taxiservice`,
      'name': 'Ен Такси Стара Загора',
      'alternateName': ['N6106 Taxi', 'En Taxi Stara Zagora', 'Такси 6106'],
      'url': SITE_URL,
      'telephone': '+359426106',
      'image': DEFAULT_OG_IMAGE,
      'logo': DEFAULT_OG_IMAGE,
      'priceRange': '$$',
      'description': DEFAULT_DESCRIPTION,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Стара Загора',
        'addressRegion': 'Стара Загора',
        'postalCode': '6000',
        'addressCountry': 'BG'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 42.4258,
        'longitude': 25.6342
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Стара Загора' },
        { '@type': 'City', 'name': 'Казанлък' },
        { '@type': 'City', 'name': 'Раднево' },
        { '@type': 'City', 'name': 'Чирпан' },
        { '@type': 'City', 'name': 'София' },
        { '@type': 'City', 'name': 'Пловдив' },
        { '@type': 'City', 'name': 'Бургас' }
      ],
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ],
        'opens': '00:00',
        'closes': '23:59'
      },
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Такси Тарифи',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Дневна тарифа (06:00 - 22:00)'
            },
            'priceSpecification': {
              '@type': 'UnitPriceSpecification',
              'price': '0.85',
              'priceCurrency': 'EUR',
              'unitText': 'на километър'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Нощна тарифа (22:00 - 06:00)'
            },
            'priceSpecification': {
              '@type': 'UnitPriceSpecification',
              'price': '0.95',
              'priceCurrency': 'EUR',
              'unitText': 'на километър'
            }
          }
        ]
      }
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#organization`,
      'name': 'Ен Такси Стара Загора',
      'url': SITE_URL,
      'telephone': '+359426106',
      'image': DEFAULT_OG_IMAGE,
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Стара Загора',
        'addressCountry': 'BG'
      }
    }
  ]
};

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl = SITE_URL,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  schema = mainTaxiSchema
}: SEOProps) {
  const schemasToInject = Array.isArray(schema) ? schema : [schema];

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="language" content="Bulgarian" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Local Geo SEO Tags */}
      <meta name="geo.region" content="BG-24" />
      <meta name="geo.placename" content="Stara Zagora" />
      <meta name="geo.position" content="42.4258;25.6342" />
      <meta name="ICBM" content="42.4258, 25.6342" />

      {/* Open Graph Tags */}
      <meta property="og:site_name" content="Ен Такси Стара Загора (N6106)" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="bg_BG" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Injected Schema.org JSON-LD */}
      {schemasToInject.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}