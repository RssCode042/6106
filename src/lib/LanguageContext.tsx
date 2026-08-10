import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'bg' | 'en';

// type Translations = Record<string, { bg: string; en: string }>;

export const translations = {
  // Navigation
  navHome: { bg: 'Начало', en: 'Home' },
  navApp: { bg: 'Приложение', en: 'App' },
  navServices: { bg: 'Услуги', en: 'Services' },
  navAbout: { bg: 'За Нас', en: 'About Us' },
  navContact: { bg: 'Контакти', en: 'Contacts' },
  navOrderNow: { bg: 'Поръчай сега', en: 'Order Now' },

  // Hero
  heroBadge: { bg: '24/7 Такси в Стара Загора', en: '24/7 Taxi in Stara Zagora' },
  heroTitle1: { bg: 'Свали и тръгни.', en: 'Download & Go.' },
  heroTitle2: { bg: 'Само с няколко клика.', en: 'In just a few clicks.' },
  heroDesc: { 
    bg: 'Поръчайте такси на момента през мобилното приложение или на централа 042 6106. Сигурност, застраховка и прозрачни тарифи.',
    en: 'Order a taxi instantly via our mobile app or dispatch central at 042 6106. Safety, insurance, and transparent fares.'
  },
  heroCallBtn: { bg: 'Обади се: 042 6106', en: 'Call: 042 6106' },
  heroAppBtn: { bg: 'Мобилно приложение', en: 'Mobile App' },
  heroCarAlt: { bg: 'Ен Такси Автомобил Стара Загора', en: 'N Taxi Vehicle Stara Zagora' },

  // Homepage Services Summary
  servicesBadge: { bg: 'Какво предлагаме', en: 'What We Offer' },
  servicesTitle: { bg: 'Нашите Услуги', en: 'Our Services' },
  viewAllServices: { bg: 'Вижте всички услуги', en: 'View All Services' },
  learnMore: { bg: 'Научи повече', en: 'Learn More' },
  srv1Title: { bg: 'Градски превози 24/7', en: '24/7 City Transport' },
  srv1Desc: { 
    bg: 'Денонощно покритие на цяла Стара Загора, кв. Железник, кв. Зора, кв. Самара и вилните зони с реакция до 3 минути.',
    en: 'Round-the-clock coverage across all districts of Stara Zagora with arrival times within 3 minutes.'
  },
  srv2Title: { bg: 'Междуградски трансфери', en: 'Intercity Transfers' },
  srv2Desc: { 
    bg: 'Удобни пътувания до Летище София, Летище Пловдив, Бургас, Казанлък и страната на прозрачни фиксирани цени.',
    en: 'Comfortable transfers to Sofia Airport, Plovdiv Airport, Burgas, Kazanlak, and nationwide at fixed prices.'
  },
  srv3Title: { bg: 'Корпоративни клиенти', en: 'Corporate Clients' },
  srv3Desc: { 
    bg: 'Договори за фирмено обслужване, превоз на служители, безкешово плащане и месечно фактуриране.',
    en: 'Custom business contracts, employee transportation, cashless payments, and monthly invoicing.'
  },

  // About Section
  aboutBadge: { bg: 'За Нас', en: 'About Us' },
  aboutTitle: { bg: '30 години традиция и сигурност по улиците на Стара Загора', en: '30 years of tradition and safety on the streets of Stara Zagora' },
  aboutDesc: { 
    bg: 'Основана в началото на 90-те години, Ен Такси започна своя път с една мисия – да предложи на жителите и гостите на Стара Загора сигурен, точен и достъпен транспорт. Днес, повече от три десетилетия по-късно, ние сме утвърден лидер с модерен автопарк и екип от професионалисти. За нас всяко пътуване не е просто дестинация, а отговорност към твоето доверие.',
    en: 'Founded in the early 1990s, N Taxi began its journey with a single mission – to offer the residents and visitors of Stara Zagora safe, punctual, and affordable transportation. Today, more than three decades later, we are an established leader with a modern fleet and a team of professionals. For us, every ride is not just a destination, but a responsibility to your trust.'
  },
  statYearsVal: { bg: '30+', en: '30+' },
  statYearsLabel: { bg: 'Години Опит', en: 'Years Experience' },
  statCarsVal: { bg: '350+', en: '350+' },
  statCarsLabel: { bg: 'Автомобила', en: 'Vehicles' },
  statClientsVal: { bg: '1 млн+', en: '1M+' },
  statClientsLabel: { bg: 'Доволни клиенти', en: 'Satisfied Clients' },

  // Pricing Section
  pricingBadge: { bg: 'Колко струва', en: 'How Much It Costs' },
  pricingTitle: { bg: 'Цени и тарифи', en: 'Fares & Rates' },
  pricingTableTitle: { bg: 'Тарифа за превоз', en: 'Transport Rates' },
  pricePerKm: { bg: 'Цена за 1км', en: 'Price per 1 km' },
  initialFee: { bg: 'Начална такса', en: 'Initial Fee' },
  callFee: { bg: 'Цена за повикване', en: 'Call Fee' },
  free: { bg: 'Безплатно', en: 'Free' },
  waitTime: { bg: 'Престой за 1 мин.', en: 'Wait time per min' },
  dayTariff: { bg: 'Дневна', en: 'Day' },
  nightTariff: { bg: 'Нощна', en: 'Night' },
  tariffNotice: { 
    bg: '* Дневната тарифа важи от 06:00 до 22:00 ч. Нощната тарифа важи от 22:00 до 06:00 ч.',
    en: '* Day rate applies 06:00 - 22:00. Night rate applies 22:00 - 06:00.'
  },
  calcTitle: { bg: 'Калкулатор на цена', en: 'Fare Calculator' },
  distance: { bg: 'Разстояние', en: 'Distance' },
  stay: { bg: 'Престой', en: 'Wait time' },
  km: { bg: 'км', en: 'km' },
  min: { bg: 'мин.', en: 'min' },
  approxPrice: { bg: 'Приблизителна цена', en: 'Estimated Fare' },
  calcDisclaimer: { 
    bg: '* Посочената цена е ориентировъчна и може да варира според трафика и точния маршрут.',
    en: '* Estimated fare; actual price may vary based on traffic and exact route.'
  },
  muniNotice: { 
    bg: 'Всички наши автомобили са оборудвани с изправни фискални апарати. Цените са фиксирани и одобрени от Община Стара Загора.',
    en: 'All our vehicles are equipped with certified fiscal taximeters. Fares are fixed and approved by the Municipality of Stara Zagora.'
  },

  // Why Choose Us Section
  whyBadge: { bg: 'Вашият доверен избор', en: 'Your Trusted Choice' },
  whyTitle: { bg: 'Защо да изберете Ен Такси Стара Загора', en: 'Why Choose N Taxi Stara Zagora' },
  whySubtitle: { 
    bg: 'Повече от 30 години осигуряваме сигурност, комфорт и коректност за нашите съграждани.',
    en: 'For over 30 years we have provided safety, comfort, and reliability to our citizens.'
  },
  why1Title: { bg: 'Сигурност и Безопасност', en: 'Safety & Security' },
  why1Desc: { 
    bg: 'Технически проверени автомобили, регулярна дезинфекция и лицензирани професионални шофьори с многогодишен опит.',
    en: 'Regularly inspected vehicles, routine sanitization, and experienced professional licensed drivers.'
  },
  why2Title: { bg: 'Точност и Бързина 24/7', en: '24/7 Punctuality & Speed' },
  why2Desc: { 
    bg: 'Уважаваме вашето време. GPS интелигентната ни система изпраща най-близкия наличен автомобил в рамките на 3 до 5 минути.',
    en: 'We value your time. Our smart GPS system dispatches the nearest available car within 3 to 5 minutes.'
  },
  why3Title: { bg: 'Прозрачни и фиксирани цени', en: 'Transparent & Fixed Prices' },
  why3Desc: { 
    bg: 'Без скрити такси. Одобрени тарифи от Община Стара Загора с касови бележки и прозрачна цена за всеки изминат километър.',
    en: 'No hidden charges. Approved fares by the Municipality of Stara Zagora with official fiscal receipts.'
  },
  why4Title: { bg: 'Комфортен и Екологичен автопарк', en: 'Comfortable & Eco Fleet' },
  why4Desc: { 
    bg: 'Модерни хибридни и гориво-ефективни автомобили за максимален комфорт и по-чист въздух в Стара Загора.',
    en: 'Modern hybrid and fuel-efficient vehicles for maximum comfort and cleaner air in Stara Zagora.'
  },
  why5Title: { bg: 'Безконтактно плащане с карта', en: 'Contactless Card Payment' },
  why5Desc: { 
    bg: 'Всички коли разполагат с POS терминали за лесно плащане с Visa, Mastercard, Apple Pay или Google Pay.',
    en: 'All vehicles feature POS terminals for effortless payments via Visa, Mastercard, Apple Pay, or Google Pay.'
  },
  why6Title: { bg: 'Мобилно приложение с карта', en: 'Mobile App with Live Map' },
  why6Desc: { 
    bg: 'Следете местоположението на шофьора в реално време, запазвайте адреси и поръчвайте без да чакате на линия.',
    en: 'Track your driver in real time, save favorite addresses, and order instantly without waiting.'
  },
  // Call To Action Section (After Why Choose Us)
  ctaAppBadge: { bg: 'Мобилно Приложение', en: 'Mobile Application' },
  ctaAppTitle: { bg: 'Поръчай такси с 2 клика на телефона си', en: 'Order a taxi in 2 clicks on your phone' },
  ctaAppDesc: { 
    bg: 'Следете колата в реално време на картата, запазвайте любими адреси и поръчвайте без да чакате свързване с диспечер.', 
    en: 'Track your taxi live on the map, save favorite locations, and order instantly without waiting for a dispatcher.' 
  },
  ctaAppFeat1: { bg: 'Реално време GPS проследяване на автомобила', en: 'Real-time GPS vehicle tracking' },
  ctaAppFeat2: { bg: 'Прозрачни цени и безконтактно плащане с карта', en: 'Transparent pricing & contactless card payment' },
  ctaAppFeat3: { bg: 'Бърз достъп за iOS и Android устройства', en: 'Instant access for iOS and Android devices' },
  ctaAppBtnMore: { bg: 'Виж QR код и подробности', en: 'See QR code & details' },

  ctaCallBadge: { bg: '24/7 Диспечерски център', en: '24/7 Dispatch Center' },
  ctaCallTitle: { bg: 'Предпочитате разговор? Обадете се на оператор', en: 'Prefer speaking? Call an operator directly' },
  ctaCallDesc: { 
    bg: 'Нашите диспечери са на линия денонощно — готови да приемат вашата поръчка за Стара Загора или извънградски трансфер.', 
    en: 'Our dispatchers are on duty 24/7 — ready to take your order for Stara Zagora or intercity transfers.' 
  },
  ctaCallFeat1: { bg: 'Свързване с оператор за секунди без изчакване', en: 'Connect with an operator in seconds without waiting' },
  ctaCallFeat2: { bg: 'Поръчка за точен час или специфичен автомобил', en: 'Advance booking for exact time or specific vehicle' },
  ctaCallFeat3: { bg: 'Информация за тарифи, трансфери и куриерски услуги', en: 'Information on tariffs, transfers, and courier services' },
  ctaCallPhoneLabel: { bg: 'Директен телефон за поръчки:', en: 'Direct order line:' },
  ctaCallBtn: { bg: 'Обади се на оператор', en: 'Call Operator Now' },
  ctaCopyPhone: { bg: 'Копирай номера', en: 'Copy Phone Number' },
  ctaPhoneCopied: { bg: 'Номерът е копиран!', en: 'Number Copied!' },

  // FAQ Section
  faqBadge: { bg: 'Въпроси и отговори', en: 'FAQ' },
  faqTitle: { bg: 'Често задавани въпроси', en: 'Frequently Asked Questions' },
  faqSubtitle: { 
    bg: 'Всичко, което трябва да знаете за поръчката на такси, цените и услугите на Н Такси Стара Загора.',
    en: 'Everything you need to know about ordering a taxi, fares, and services at N Taxi Stara Zagora.'
  },

  //CTA Section
  ctaBadge: { bg: 'Готови ли сте да поръчате?', en: 'Ready to Order?' },
  ctaTitle: { bg: 'Поръчайте такси сега', en: 'Order a Taxi Now' },

  // Application Page
  appPageBadge: { bg: 'Бързо, модерно и сигурно', en: 'Fast, Modern & Secure' },
  appPageTitle: { bg: 'Нашето Мобилно Приложение', en: 'Our Mobile Application' },
  appPageSubtitle: { 
    bg: 'Поръчайте такси в Стара Загора бързо и лесно без нужда от обаждане. Намерете най-близкия автомобил и проследете пристигането му в реално време.',
    en: 'Order a taxi in Stara Zagora quickly and effortlessly without calling. Find the nearest car and track its arrival live.'
  },
  downloadOn: { bg: 'Свали от', en: 'Download on' },
  qrCodeBadge: { bg: 'Универсален QR Код', en: 'Universal QR Code' },
  qrCodeTitle: { bg: 'Сканирай и свали директно', en: 'Scan & Download Instantly' },
  qrCodeDesc: { bg: 'Автоматично отваря App Store за iPhone или Google Play за Android според вашето устройство.', en: 'Automatically opens App Store for iPhone or Google Play for Android based on your device.' },
  scanWithPhone: { bg: 'Сканирай с камерата на телефона', en: 'Scan with your phone camera' },
  redirectingToStore: { bg: 'Пренасочване към магазина...', en: 'Redirecting to app store...' },
  iosDetected: { bg: 'Открит iOS (iPhone/iPad) — пренасочване към App Store', en: 'iOS detected (iPhone/iPad) — redirecting to App Store' },
  androidDetected: { bg: 'Открит Android — пренасочване към Google Play', en: 'Android detected — redirecting to Google Play' },
  desktopDetected: { bg: 'Открит компютър — изберете вашата платформа:', en: 'Desktop detected — choose your mobile store:' },
  openAppStore: { bg: 'Отвори в App Store', en: 'Open in App Store' },
  openGooglePlay: { bg: 'Отвори в Google Play', en: 'Open in Google Play' },
  inDevelopmentBadge: { bg: 'В процес на разработка', en: 'In Development' },
  inDevelopmentNotice: { bg: 'Мобилното приложение за тази платформа все още се разработва и предстои да бъде публикувано скоро.', en: 'The mobile application for this platform is currently under development and will be released soon.' },
  iosInDevelopment: { bg: 'Приложението за iOS (iPhone / iPad) все още се разработва. Очаквайте го скоро в App Store!', en: 'The iOS (iPhone / iPad) application is currently under development. Coming soon to App Store!' },
  androidInDevelopment: { bg: 'Приложението за Android все още се разработва. Очаквайте го скоро в Google Play!', en: 'The Android application is currently under development. Coming soon to Google Play!' },
  comingSoon: { bg: 'Очаквайте скоро', en: 'Coming Soon' },
  appFeat1Title: { bg: 'Бърза поръчка с 2 клика', en: 'Quick 2-Click Order' },
  appFeat1Desc: { 
    bg: 'Автоматично определяне на вашето местоположение чрез GPS и изпращане на най-близката колата.',
    en: 'Automatic GPS location detection and instant dispatch of the closest taxi.'
  },
  appFeat2Title: { bg: 'Проследяване в реално време', en: 'Real-Time Tracking' },
  appFeat2Desc: { 
    bg: 'Вижте движението на вашето такси върху интерактивна карта и точното време на пристигане.',
    en: 'Follow your taxi on an interactive map with estimated arrival time updates.'
  },
  appFeat3Title: { bg: 'История и любими адреси', en: 'History & Favorites' },
  appFeat3Desc: { 
    bg: 'Запазвайте любими дестинации и лесно преглеждайте историята на вашите пътувания.',
    en: 'Save your favorite destinations and easily review your ride history.'
  },
  appFeat4Title: { bg: 'Избор на предпочитания', en: 'Custom Preferences' },
  appFeat4Desc: { 
    bg: 'Заявете предварително детско столче, голям багажник или плащане с карта с един бутон.',
    en: 'Request a child seat, large trunk, or card payment option with a single tap.'
  },
  appFeat5Title: { bg: 'Безконтактно плащане', en: 'Contactless Payment' },
  appFeat5Desc: { 
    bg: 'Възможност за плащане в брой или директно с карта/POS през терминал в автомобила.',
    en: 'Pay in cash or directly by card via the in-car POS terminal.'
  },
  appFeat6Title: { bg: 'Денонощна поддръжка 24/7', en: '24/7 Dispatcher Support' },
  appFeat6Desc: { 
    bg: 'Директна връзка с нашата диспечерска централа по всяко време на денонощието.',
    en: 'Direct phone line to our dispatch team available 24 hours a day.'
  },

  // Services Page
  srvPageBadge: { bg: 'Професионален транспорт с 30г. опит', en: 'Professional Transport with 30 Years Experience' },
  srvPageTitle: { bg: 'Нашите Услуги', en: 'Our Services' },
  srvPageSubtitle: { 
    bg: 'Предлагаме пълен спектър от таксиметрови превози в град Стара Загора и междуградски трансфери из цяла България.',
    en: 'We provide a full range of taxi rides in Stara Zagora and intercity transfers across Bulgaria.'
  },
  srvP1Title: { bg: 'Градски превози в Стара Загора', bgBadge: '24/7 Денонощно', en: 'City Transport in Stara Zagora', enBadge: '24/7 Service' },
  srvP1Desc: { 
    bg: 'Денонощно покритие на цяла Стара Загора, кв. Железник, кв. Зора, кв. Самара, кв. Аязмото и околните вилни зони. Бърза реакция до 3-5 минути и опитни шофьори.',
    en: 'Round-the-clock coverage across all districts of Stara Zagora. Fast response within 3-5 minutes and experienced drivers.'
  },
  srvP2Title: { bg: 'Междуградски трансфери & Летища', bgBadge: 'Фиксирани цени', en: 'Intercity Transfers & Airports', enBadge: 'Fixed Rates' },
  srvP2Desc: { 
    bg: 'Удобни и сигурни пътувания до Летище София, Летище Пловдив, Летище Бургас, Варна, Казанлък, Раднево и всички населени места в България на прозрачни фиксирани цени.',
    en: 'Safe, comfortable rides to Sofia Airport, Plovdiv Airport, Burgas Airport, Varna, Kazanlak, and all Bulgarian cities at fixed transparent rates.'
  },
  srvP3Title: { bg: 'Корпоративно обслужване на фирми', bgBadge: 'Фирмени фактури', en: 'Corporate & Business Rides', enBadge: 'Invoicing Available' },
  srvP3Desc: { 
    bg: 'Специализирани договори за обслужване на ваши служители, гости, бизнес срещи и корпоративни събития. Възможност за безкешово плащане, подробни справки и месечни фактури.',
    en: 'Tailored contracts for employee travel, business guests, and corporate events with detailed reports and monthly invoicing.'
  },
  srvP4Title: { bg: 'Предварителни резервации за час', bgBadge: 'Точност до минута', en: 'Advance Scheduled Bookings', enBadge: 'Punctual Guarantee' },
  srvP4Desc: { 
    bg: 'Планирайте вашия превоз предварително за ранен сутрешен полет, влак, автобус или медицински преглед без да се притеснявате за закъснения.',
    en: 'Book your ride ahead of time for early morning flights, trains, or appointments without worrying about delays.'
  },
  srvP5Title: { bg: 'Транспорт за специални събития', bgBadge: 'Висока класа', en: 'Special Events Transportation', enBadge: 'Premium Comfort' },
  srvP5Desc: { 
    bg: 'Превоз за сватби, абитуриентски балове, празници и частни партита. Комфортни и чисти автомобили за вас и вашите гости.',
    en: 'Transportation for weddings, graduations, holidays, and private celebrations in clean, comfortable vehicles.'
  },
  srvP6Title: { bg: 'Сигурност и фискална изрядност', bgBadge: '100% Гаранция', en: 'Safety & Fiscal Compliance', enBadge: '100% Guaranteed' },
  srvP6Desc: { 
    bg: 'Всички автомобили са оборудвани с изправни касови апарати, GPS проследяване, застраховка за пътниците и POS терминали за банкови карти.',
    en: 'All vehicles carry certified fiscal meters, GPS tracking, passenger insurance, and card payment terminals.'
  },
  orderNowCall: { bg: 'Поръчай сега на 042 6106', en: 'Order now at 042 6106' },

  // Destinations Section
  destinationsTitle: { bg: 'Популярни дестинации', en: 'Popular Destinations' },
  destinationsSubtitle: { bg: 'Ориентировъчни цени за междуградски трансфери от Стара Загора', en: 'Estimated prices for intercity transfers from Stara Zagora' },
  destName: { bg: 'Дестинация', en: 'Destination' },
  destDistance: { bg: 'Разстояние', en: 'Distance' },
  destPriceBGN: { bg: 'Цена (лв)', en: 'Price (BGN)' },
  destPriceEUR: { bg: 'Цена (€)', en: 'Price (€)' },

   readMore: { bg: 'Прочети повече', en: 'Read more' },
  // About Page
  aboutPageTitle: { bg: 'За Нас', en: 'About Us' },
  aboutPageSubtitle: { bg: 'Надежден партньор за всяко пътуване', en: 'A reliable partner for every journey' },
  ourMissionTitle: { bg: 'Нашата Мисия', en: 'Our Mission' },
  ourMissionDesc: { bg: 'Да предоставяме най-сигурния, бърз и комфортен транспорт на територията на град Стара Загора и региона.', en: 'To provide the safest, fastest and most comfortable transport in Stara Zagora and the region.' },

  // Contact Page
  contactPageTitle: { bg: 'Свържете се с нас', en: 'Contact Us' },
  contactPageSubtitle: { bg: 'Ние сме на Ваше разположение 24 часа в денонощието, 7 дни в седмицата.', en: 'We are at your service 24 hours a day, 7 days a week.' },
  contactAddressLabel: { bg: 'Адрес / Централа', en: 'Address / Headquarters' },
  contactAddressVal: { bg: 'Стара Загора', en: 'Stara Zagora' },
  contactPhoneLabel: { bg: 'Телефон за поръчки', en: 'Phone for Orders' },
  contactPhoneVal: { bg: '042 6106', en: '042 6106' },
  contactEmailLabel: { bg: 'Имейл', en: 'Email' },
  contactEmailVal: { bg: 'info@entaxi.bg', en: 'info@entaxi.bg' },

  // Contact Form
  formNameLabel: { bg: 'Име', en: 'Name' },
  formNamePlaceholder: { bg: 'Въведете Вашето име', en: 'Enter your name' },
  formContactLabel: { bg: 'Телефон или Имейл', en: 'Phone or Email' },
  formContactPlaceholder: { bg: 'Въведете телефон или имейл', en: 'Enter phone or email' },
  formMessageLabel: { bg: 'Съобщение', en: 'Message' },
  formMessagePlaceholder: { bg: 'Как можем да Ви помогнем?', en: 'How can we help you?' },
  formSubmitButton: { bg: 'Изпрати запитване', en: 'Send Inquiry' },
  formSuccessMessage: { bg: 'Благодарим Ви! Вашето съобщение беше изпратено успешно.', en: 'Thank you! Your message has been sent successfully.' },

  // Footer
  footerDesc: { 
    bg: 'Повече от 30 години доверие, сигурност и комфорт по пътищата на Стара Загора. Твоят лицензиран таксиметров партньор.',
    en: 'Over 30 years of trust, safety, and comfort on the roads of Stara Zagora. Your licensed taxi partner.'
  },
  footerAddress: { 
    bg: '"бул. Цар Симеон Велики 1 Проектанска Организация ет.2 офис №21, 6000 гр. Стара Загора"',
    en: '"1 Tsar Simeon Veliki Blvd, Floor 2, Office 21, 6000 Stara Zagora, Bulgaria"'
  },
  footerMenu: { bg: 'Меню', en: 'Menu' },
  footerServices: { bg: 'Услуги', en: 'Services' },
  footerNewBadge: { bg: 'Ново', en: 'New' },
  footerTerms: { bg: 'Общи условия', en: 'Terms & Conditions' },
  footerPrivacy: { bg: 'Политика за поверителност и бисквитки', en: 'Privacy & Cookie Policy' },
  footerRights: { bg: '© 2026 „Ен Такси Стара Загора“ ЕООД. ЕИК: ' + import.meta.env.VITE_COMPANY_UIC + ' Всички права запазени.', en: '© 2026 "En Taxi Stara Zagora" Ltd. UIC: ' + import.meta.env.VITE_COMPANY_UIC + ' All rights reserved.' },

  // Cookie Consent & Call Widget
  cookieText: { 
    bg: 'Ние използваме бисквитки за да подобрим вашето преживяване и да анализираме трафика.',
    en: 'We use cookies to enhance your browsing experience and analyze traffic.'
  },
  acceptAll: { bg: 'Приемам всички', en: 'Accept All' },
  necessaryOnly: { bg: 'Само необходими', en: 'Necessary Only' },
  callNow: { bg: 'Обади се', en: 'Call Now' },
  dispatch247: { bg: '24/7 Диспечер', en: '24/7 Dispatch' },
  quickOrder247: { bg: 'Бърза поръчка 24/7', en: 'Quick Order 24/7' },
  copy: { bg: 'Копирай', en: 'Copy' },
  copied: { bg: 'Копирано', en: 'Copied' },
  phoneOrder: { bg: 'Поръчка по телефона', en: 'Phone Ordering' },
  phoneOrderDesc: { 
    bg: 'Обадете се на диспечер за моментална поръчка на такси в Стара Загора',
    en: 'Call dispatch for an instant taxi request in Stara Zagora'
  },
  callNowFull: { bg: 'Обади се сега', en: 'Call Now' },

  // Legal & Compliance
  privacyCheckbox: { 
    bg: 'Запознат съм с Политиката за поверителност и съм съгласен личните ми данни да бъдат обработени за целите на запитването.', 
    en: 'I have read the Privacy Policy and agree to have my personal data processed for the purpose of this inquiry.' 
  },
  regulatorsTitle: { bg: 'Надзорни органи', en: 'Supervisory Authorities' },
  regulatorDAI: { bg: 'ИА "Автомобилна администрация"', en: 'EA "Automobile Administration"' },
  regulatorKZP: { bg: 'Комисия за защита на потребителите (КЗП)', en: 'Commission for Consumer Protection (KZP)' },
  regulatorKZLD: { bg: 'Комисия за защита на личните данни (КЗЛД)', en: 'Commission for Personal Data Protection (KZLD)' },
  appDisclaimerTitle: { bg: 'Условия на мобилното приложение', en: 'Mobile App Terms' },
  appDisclaimerText: { 
    bg: 'Реалните условия за ползване на услугата, гео-локацията и обработката на поръчки се уреждат в самото мобилно приложение.', 
    en: 'The actual terms of service, geo-location, and order processing are governed within the mobile application itself.' 
  },
  externalLinksDisclaimerTitle: { bg: 'Външни препратки', en: 'External Links' },
  externalLinksDisclaimerText: { 
    bg: 'Този сайт предоставя връзки към платформи като Google Play и App Store. Ние не носим отговорност за техните политики за поверителност.', 
    en: 'This site provides links to platforms such as Google Play and App Store. We are not responsible for their privacy policies.' 
  },
  
  // Privacy Policy Page
  privacyPageTitle: { bg: 'Политика за поверителност', en: 'Privacy Policy' },
  privacyPageSubtitle: { bg: 'Вашите данни са важни за нас', en: 'Your data is important to us' },
  
  // Terms Page
  termsPageTitle: { bg: 'Общи условия', en: 'Terms & Conditions' },
  termsPageSubtitle: { bg: 'Правила за ползване на уебсайта', en: 'Rules for using the website' },
  companyIdentification: { bg: 'Идентификация на търговеца', en: 'Merchant Identification' },
  companyNameLabel: { bg: 'Търговско наименование:', en: 'Company Name:' },
  companyUICLabel: { bg: 'ЕИК / БУЛСТАТ:', en: 'UIC / BULSTAT:' },
  companyAddressLabel: { bg: 'Седалище и адрес на управление:', en: 'Registered Address:' },

  // Application Page
  AppHeroBadge: { bg: 'Бърза поръчка 24/7', en: 'Quick Order 24/7' },
  AppHeroTitle1: { bg: 'Мобилно приложение за такси', en: 'Mobile Taxi App' },
  AppHeroTitle2: { bg: 'Всеки момент, всяка дума', en: 'Any Moment, Any Word' },
  AppHeroDesc: { bg: 'Най-бързият начин да получите такси в Стара Загора', en: 'The fastest way to get a taxi in Stara Zagora' },

  App1Title: { bg: 'Бърза поръчка', en: 'Quick Order' },
  App1Desc: { bg: 'Поръчайте такси във веднага, когато ви е нужно', en: 'Order a taxi immediately when you need it' },

  App2Title: { bg: '24/7 Денонощно обслужване', en: '24/7 Round-the-Clock Service' },
  App2Desc: { bg: 'Ние сме налични всеки ден, във всяко време', en: 'We are available every day, at any time' },

  App3Title: { bg: 'Изгодни тарифи', en: 'Affordable Rates' },
  App3Desc: { bg: 'Получавайте такси по изгодни цени', en: 'Get taxis at affordable prices' },

  App4Title: { bg: 'Сигурност и комфорт', en: 'Safety and Comfort' },
  App4Desc: { bg: 'Нашите шофьори са професионални и обучени', en: 'Our drivers are professional and trained' },

  AppHowItWorkTitle: { bg: 'Как работи?', en: 'How It Works?' },
  AppStep1Title: { bg: 'Изтеглете приложението', en: 'Download the App' },
  AppStep1Desc: { bg: 'Наличен за iOS и Android устройства', en: 'Available for iOS and Android devices' },
  AppStep2Title: { bg: 'Регистрирайте се или влезте', en: 'Sign Up or Log In' },
  AppStep2Desc: { bg: 'Създайте профил или използвайте съществуващ', en: 'Create a profile or use an existing one' },
  AppStep3Title: { bg: 'Поръчайте такси с няколко клика', en: 'Order a Taxi in a Few Clicks' },
  AppStep3Desc: { bg: 'Изберете местоположение и потвърдете поръчката', en: 'Select your location and confirm the order' },
  AppStep4Title: { bg: 'Проследете пристигането на автомобила', en: 'Track Your Taxi Arrival' },
  AppStep4Desc: { bg: 'Вижте движението на автомобила в реално време', en: 'See the vehicle movement in real time' },
  AppStep5Title: { bg: 'Плащане и оценка на услугата', en: 'Payment and Service Rating' },
  AppStep5Desc: { bg: 'Платете с карта или в брой и оценете шофьора', en: 'Pay by card or cash and rate your driver' }
} as const;

export type TranslationKey = keyof typeof translations;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app-lang') as Language;
      if (saved === 'bg' || saved === 'en') return saved;
    }
    return 'bg';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-lang', newLang);
      document.documentElement.lang = newLang;
    }
  };

  const toggleLang = () => {
    setLang(lang === 'bg' ? 'en' : 'bg');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: TranslationKey): string => {
    const item = translations[key];
    if (!item) return key;
    return item[lang] || item.bg || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
